import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore,
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { AppStateData } from '../types';
import { INITIAL_APP_DATA } from '../data/initialData';

// 1. Initialize Firebase App and Services with Long-Polling enabled for sandboxed iframe environments
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = (() => {
  const databaseId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true,
    }, databaseId);
  } catch {
    return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
  }
})();

export const auth = getAuth(app);

// 2. Structured Error Handling for Firestore
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path,
  };
  console.warn('Firestore Operation Notification:', JSON.stringify(errInfo));
  return errInfo;
}

// 3. Graceful Connection Test
export async function testConnection() {
  try {
    const testDoc = doc(db, 'app_data', 'main_state');
    await getDoc(testDoc);
  } catch (error) {
    // Graceful offline fallback
    console.info('Operating with robust local caching / offline fallback.');
  }
}

// Run connection check asynchronously without blocking
setTimeout(() => {
  testConnection().catch(() => {});
}, 100);

const APP_DATA_PATH = 'app_data';
const MAIN_DOC_ID = 'main_state';

/**
 * Subscribes to real-time updates across all browsers and devices.
 * If the cloud document doesn't exist yet, it automatically seeds it with initial data.
 */
export function subscribeToLiveAppData(
  onDataChange: (data: AppStateData) => void,
  onError?: (err: any) => void
): Unsubscribe {
  const stateDocRef = doc(db, APP_DATA_PATH, MAIN_DOC_ID);

  const unsubscribe = onSnapshot(
    stateDocRef,
    async (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as AppStateData;
        // Merge defensively with INITIAL_APP_DATA to ensure all nested properties exist
        const mergedData: AppStateData = {
          ...INITIAL_APP_DATA,
          ...cloudData,
          profile: { ...INITIAL_APP_DATA.profile, ...(cloudData.profile || {}) },
          settings: { ...INITIAL_APP_DATA.settings, ...(cloudData.settings || {}) },
          informations: { ...INITIAL_APP_DATA.informations, ...(cloudData.informations || {}) },
          about: { ...INITIAL_APP_DATA.about, ...(cloudData.about || {}) },
          news: cloudData.news || INITIAL_APP_DATA.news,
          gallery: cloudData.gallery || INITIAL_APP_DATA.gallery,
          gtkList: cloudData.gtkList || INITIAL_APP_DATA.gtkList,
          users: cloudData.users || INITIAL_APP_DATA.users,
        };
        onDataChange(mergedData);
      } else {
        // First-time setup: seed initial state into Firestore
        try {
          await setDoc(stateDocRef, {
            ...INITIAL_APP_DATA,
            updatedAt: new Date().toISOString(),
          });
          onDataChange(INITIAL_APP_DATA);
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `${APP_DATA_PATH}/${MAIN_DOC_ID}`);
          onDataChange(INITIAL_APP_DATA);
        }
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${APP_DATA_PATH}/${MAIN_DOC_ID}`);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
}

/**
 * Saves updated application data to Firebase Firestore in real-time.
 */
export async function saveLiveAppData(data: AppStateData): Promise<void> {
  const stateDocRef = doc(db, APP_DATA_PATH, MAIN_DOC_ID);
  try {
    await setDoc(stateDocRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${APP_DATA_PATH}/${MAIN_DOC_ID}`);
    throw error;
  }
}
