import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Default config for external deployments when env vars / local config are missing
const defaultFirebaseConfig = {
  projectId: "deft-vista-207pf",
  appId: "1:204919087418:web:981346f498c194f5a6b003",
  apiKey: "AIzaSyB6jqXjRouclwAe3MY5ipQ3Y0rTjmGiXhY",
  authDomain: "deft-vista-207pf.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-bc6ca53a-c386-4e99-834d-03afbe770e98",
  storageBucket: "deft-vista-207pf.firebasestorage.app",
  messagingSenderId: "204919087418"
};

const metaEnv = (import.meta as any).env || {};

// Merge local config (if any) with environment variables for external deployment support (like Netlify)
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: metaEnv.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  firestoreDatabaseId: metaEnv.VITE_FIRESTORE_DATABASE_ID || defaultFirebaseConfig.firestoreDatabaseId
};

// Only initialize if we have at least an API key to prevent crashing (e.g. during Netlify deploy with missing env vars)
let app;
let db: ReturnType<typeof getFirestore>;
let auth: ReturnType<typeof getAuth>;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
} else {
  console.warn("Firebase configuration is missing! Please set the VITE_FIREBASE_* environment variables.");
  // Export dummy objects or the app will crash if users try to use DB features without setup
  db = {} as any;
  auth = { currentUser: null } as any;
}

export { app, db, auth };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
