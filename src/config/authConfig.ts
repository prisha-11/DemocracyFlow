/**
 * @file authConfig.ts
 * @author Senior Cloud Architect
 * @purpose Centralized authentication configuration for Google Identity.
 */
export const AUTH_CONFIG = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID"
};
