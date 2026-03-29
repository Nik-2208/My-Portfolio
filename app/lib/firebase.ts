import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, FieldValue, Firestore } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const getFirebaseConfig = (): FirebaseConfig => {
  const config: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
  };

  // Log all config keys for debug (remove in prod)
  console.log('[Firebase DEBUG] Keys loaded:', {
    hasApiKey: !!config.apiKey,
    hasProjectId: !!config.projectId,
    projectIdPrefix: config.projectId?.slice(0,5),
    totalKeys: Object.keys(process.env).filter(k => k.includes('FIREBASE')).length
  });
  
  // Validation - more lenient for real projects
  const missing = Object.entries(config)
    .filter(([k, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0) {
    console.warn('[Firebase] Missing config:', missing.join(', '));
  }

  return config;
};

const firebaseConfig = getFirebaseConfig();

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let firebaseInitialized = false;

try {
  if (typeof window !== "undefined") {
    const config = getFirebaseConfig();
    if (config.projectId && !config.projectId.startsWith('demo')) {
      app = initializeApp(config);
      db = getFirestore(app);
      firebaseInitialized = true;
      console.log('[Firebase] Initialized successfully');
    } else {
      console.log('[Firebase] Skipped - invalid projectId');
    }
  }
} catch (error) {
  console.warn("[Firebase] Initialization error - fallback mode:", error);
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp?: FieldValue;
}

export const saveContactMessage = async (data: Omit<ContactMessage, "timestamp">): Promise<DocumentReference | null> => {
  if (!firebaseInitialized || !db) {
    console.log("[Firebase] Fallback mode - message logged locally:", data);
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, "contacters"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    console.log("[Firebase] Message saved successfully:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("[Firebase] Error saving message:", error);
    return null;
  }
};

export const isFirebaseAvailable = () => firebaseInitialized;
