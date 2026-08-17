import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

let adminApp: App;
let adminDb: Firestore;

export function getAdminFirestore(): Firestore {
  // Return existing instance
  if (adminDb) return adminDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Debug (safe)
  console.log("[FirebaseAdmin] Environment Check:", {
    projectId: !!projectId,
    clientEmail: !!clientEmail,
    privateKey: !!privateKey,
  });

  if (!projectId) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID environment variable."
    );
  }

  if (!clientEmail) {
    throw new Error(
      "Missing FIREBASE_CLIENT_EMAIL environment variable."
    );
  }

  if (!privateKey) {
    throw new Error(
      "Missing FIREBASE_PRIVATE_KEY environment variable."
    );
  }

  try {
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });

      console.log(
        "[FirebaseAdmin] Successfully initialized using Service Account."
      );
    } else {
      adminApp = getApps()[0];
      console.log("[FirebaseAdmin] Reusing existing Firebase Admin app.");
    }

    adminDb = getFirestore(adminApp);

    console.log("[FirebaseAdmin] Firestore connected.");

    return adminDb;
  } catch (error) {
    console.error("[FirebaseAdmin] Initialization Failed:", error);
    throw error;
  }
}
