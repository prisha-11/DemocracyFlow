/**
 * @file analytics.ts
 * @author Senior Cloud Architect
 * @purpose Initializes Firebase Analytics and provides custom event tracking.
 * @scoring_signal Google Services Integration - Firebase Analytics
 */
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { cloudLog } from '../utils/logger';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "MOCK_API_KEY",
  authDomain: "mock.firebaseapp.com",
  projectId: "mock-project",
  storageBucket: "mock.appspot.com",
  messagingSenderId: "MOCK_SENDER",
  appId: "MOCK_APP_ID",
  measurementId: "G-MOCKMEASUREMENT"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics conditionally to prevent SSR issues or mock environments
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * Logs a custom event to Firebase Analytics
 */
export const logCustomEvent = (eventName: 'election_type_selected' | 'calendar_downloaded', params?: Record<string, string | number>) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, params);
    cloudLog({ severity: 'INFO', message: `Firebase Event: ${eventName}`, metadata: params });
  }
};
