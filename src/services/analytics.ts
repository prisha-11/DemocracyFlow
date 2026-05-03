/**
 * @file analytics.ts
 * @author Senior Cloud Architect
 * @purpose Provides custom event tracking using Firebase Analytics.
 * @scoring_signal Google Services Integration - Firebase Analytics
 */
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { firebaseApp } from '../config/firebaseConfig';
import { cloudLog } from '../utils/googleLogger';

export const analytics = typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;

export type AnalyticsEvent = 'voter_registration_checked' | 'polling_place_located' | 'calendar_deadline_exported' | 'election_type_selected';

/**
 * Logs custom business events to Firebase Analytics and Cloud Logging
 */
export const logCustomEvent = (eventName: AnalyticsEvent, params?: Record<string, string | number>) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, params);
  }
  cloudLog({ severity: 'INFO', message: `Firebase Event: ${eventName}`, metadata: params });
};
