import { AppStateData, UserAccount } from '../types';
import { INITIAL_APP_DATA } from '../data/initialData';
import { saveLiveAppData, subscribeToLiveAppData } from './firebase';

const STORAGE_KEY = 'min4_kuningan_database_v3';
const AUTH_KEY = 'min4_kuningan_auth_session';

export function getStoredData(): AppStateData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Auto seed database if not available
      saveStoredData(INITIAL_APP_DATA);
      return INITIAL_APP_DATA;
    }
    const parsed = JSON.parse(raw) as AppStateData;
    // Merge defensively with initial data to ensure all keys exist
    return {
      ...INITIAL_APP_DATA,
      ...parsed,
      profile: { ...INITIAL_APP_DATA.profile, ...parsed.profile },
      settings: { ...INITIAL_APP_DATA.settings, ...parsed.settings },
      informations: { ...INITIAL_APP_DATA.informations, ...parsed.informations },
      about: { ...INITIAL_APP_DATA.about, ...parsed.about },
    };
  } catch (err) {
    console.error('Failed to read database from localStorage, initializing fresh data', err);
    saveStoredData(INITIAL_APP_DATA);
    return INITIAL_APP_DATA;
  }
}

export function saveStoredData(data: AppStateData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Asynchronously save and push to Firebase Firestore in real-time
    saveLiveAppData(data).catch((err) => {
      console.warn('Real-time sync to Firestore background update:', err);
    });
  } catch (err) {
    console.error('Failed to save data to localStorage', err);
  }
}

export function resetToInitialData(): AppStateData {
  saveStoredData(INITIAL_APP_DATA);
  return INITIAL_APP_DATA;
}

export function getActiveSession(): UserAccount | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserAccount;
  } catch {
    return null;
  }
}

export function saveActiveSession(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_KEY);
    } else {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to save auth session', err);
  }
}

// Aliases for clean imports
export const loadAppData = getStoredData;
export const saveAppData = saveStoredData;
export const getCurrentUser = getActiveSession;
export const setCurrentUser = saveActiveSession;
export const logoutUser = () => saveActiveSession(null);
export { subscribeToLiveAppData, saveLiveAppData };


