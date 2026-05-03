/**
 * @file firebaseConfig.ts
 * @author Senior Cloud Architect
 * @purpose Initializes the Firebase SDK.
 */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "MOCK_API_KEY",
  authDomain: "mock.firebaseapp.com",
  projectId: "mock-project",
  storageBucket: "mock.appspot.com",
  messagingSenderId: "MOCK_SENDER",
  appId: "MOCK_APP_ID",
  measurementId: "G-MOCKMEASUREMENT"
};

export const firebaseApp = initializeApp(firebaseConfig);
