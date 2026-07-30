import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/app/lib/firebaseAdmin";
import { sendContactNotificationEmail } from "@/app/lib/emailService";
import { FieldValue } from "firebase-admin/firestore";

// Simple in-memory rate limiter: Map of IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the current 15-min window
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

function sanitizeText(str: string): string {
  return str
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Extraction & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { success: false, error: "All fields (name, email, message) are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100 || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds maximum length restrictions." },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeText(trimmedName);
    const sanitizedMessage = sanitizeText(trimmedMessage);
    const createdAtISO = new Date().toISOString();

    // 3. Save to Firestore (Collection: contacts)
    let docId: string | null = null;
    const db = getAdminFirestore();

    if (db) {
      try {
        const docRef = await db.collection("contacts").add({
          name: sanitizedName,
          email: trimmedEmail,
          message: sanitizedMessage,
          createdAt: FieldValue.serverTimestamp(),
          createdAtISO,
          ip,
          userAgent,
          status: "pending_email",
          emailSent: false,
          deliveryAttempts: 1,
        });
        docId = docRef.id;
        console.log(`[Contact API] Message stored in Firestore with ID: ${docId}`);
      } catch (dbErr) {
        console.error("[Contact API] Firestore save error:", dbErr);
      }
    } else {
      console.warn("[Contact API] Firestore Admin DB not available. Skipping DB write.");
    }

    // 4. Attempt Email Dispatch (Resend -> Nodemailer fallback)
    const emailSent = await sendContactNotificationEmail({
      name: sanitizedName,
      email: trimmedEmail,
      message: sanitizedMessage,
      ip,
      userAgent,
      createdAt: createdAtISO,
    });

    // 5. Update Firestore record with final status if doc was created
    if (db && docId) {
      try {
        await db.collection("contacts").doc(docId).update({
          emailSent,
          status: emailSent ? "delivered" : "pending_email",
          updatedAt: FieldValue.serverTimestamp(),
        });
      } catch (updateErr) {
        console.error("[Contact API] Firestore status update error:", updateErr);
      }
    }

    // 6. Return Success Response to Visitor
    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your message has been received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);

    // Failsafe: Never expose internal server errors to visitor
    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your message has been received.",
      },
      { status: 200 }
    );
  }
}
