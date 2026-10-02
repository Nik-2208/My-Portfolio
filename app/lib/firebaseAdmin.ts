import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

/**
 * Normalizes and formats the Firebase Private Key from environment variables.
 * Handles surrounding quotes, literal escaped \n strings, \r sequences, and whitespace.
 */
function formatPrivateKey(key: string): string {
  let cleaned = key.trim();

  // Strip surrounding double or single quotes if present (standard in Vercel or .env configs)
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }

  // Replace literal '\n' sequences with actual newline characters
  cleaned = cleaned.replace(/\\n/g, "\n").replace(/\\r/g, "");

  return cleaned;
}

/**
 * Validates if the service account client email is a placeholder rather than a real IAM email.
 */
function isPlaceholderEmail(email: string): boolean {
  const lower = email.toLowerCase().trim();
  return (
    lower.includes("xxxxx") ||
    lower.includes("example.com") ||
    lower.includes("your_") ||
    !lower.includes("@")
  );
}

/**
 * Initializes and returns the Firebase Admin Firestore instance.
 * Strictly uses explicit Service Account credentials (no insecure ADC fallback).
 * Fails soft by returning null if credentials are not configured, placeholder, or invalid.
 */
export function getAdminFirestore(): Firestore | null {
  // Return cached Firestore instance if already initialized
  if (adminDb) return adminDb;

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Validate presence of required service-account parameters
  if (!projectId || !clientEmail || !rawPrivateKey) {
    console.warn(
      "[FirebaseAdmin] Service Account credentials missing (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY). Firestore operations disabled (fail-soft)."
    );
    return null;
  }

  // Guard against placeholder emails (e.g. firebase-adminsdk-xxxxx@...) to prevent UNAUTHENTICATED IAM errors
  if (isPlaceholderEmail(clientEmail)) {
    console.warn(
      `[FirebaseAdmin] Placeholder client email detected ('${clientEmail}'). Firestore operations skipped to prevent UNAUTHENTICATED error. Configure real Service Account in Vercel or .env.local.`
    );
    return null;
  }

  try {
    const privateKey = formatPrivateKey(rawPrivateKey);

    // Validate private key structure
    if (!privateKey.includes("BEGIN PRIVATE KEY")) {
      console.warn(
        "[FirebaseAdmin] FIREBASE_PRIVATE_KEY does not contain standard PEM header ('-----BEGIN PRIVATE KEY-----'). Please verify Vercel environment variables."
      );
      return null;
    }

    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

      console.log(
        `[FirebaseAdmin] Successfully initialized Firebase Admin for project: ${projectId}`
      );
    } else {
      adminApp = getApps()[0];
    }

    adminDb = getFirestore(adminApp);
    return adminDb;
  } catch (error) {
    console.error(
      "[FirebaseAdmin] Failed to initialize Firebase Admin with Service Account credentials:",
      error
    );
    return null;
  }
}
