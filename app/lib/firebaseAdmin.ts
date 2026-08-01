import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

export function getAdminFirestore(): Firestore | null {
  if (adminDb) return adminDb;

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId) {
    console.warn("[FirebaseAdmin] Warning: FIREBASE_PROJECT_ID is not configured.");
    return null;
  }

  try {
    if (getApps().length === 0) {
      if (clientEmail && privateKey) {
        // Replace escaped line breaks in private key
        privateKey = privateKey.replace(/\\n/g, "\n");
        adminApp = initializeApp({
          credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          }),
        });
        console.log("[FirebaseAdmin] Initialized with Service Account");
      } else {
        // Fallback initialization for GCP / default credential environment if applicable
        adminApp = initializeApp({ projectId });
        console.log("[FirebaseAdmin] Initialized with Project ID default credentials");
      }
    } else {
      adminApp = getApps()[0];
    }

    adminDb = getFirestore(adminApp);
    return adminDb;
  } catch (error) {
    console.error("[FirebaseAdmin] Initialization error:", error);
    return null;
  }
}
