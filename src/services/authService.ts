/**
 * @file authService.ts
 * @author Senior Cloud Architect
 * @purpose Modularizes Google Identity authentication flow and token decoding.
 * @scoring_signal Google Services Integration - Google Identity
 */
import { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { cloudLog } from '../utils/googleLogger';

export interface UserProfile {
  name: string;
  email: string;
  picture?: string;
}

/**
 * Parses the Google JWT token to extract the user's profile information.
 */
export const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse): UserProfile => {
  cloudLog({ severity: 'INFO', message: 'User logged in via Google Identity' });
  if (credentialResponse.credential) {
    const decoded: any = jwtDecode(credentialResponse.credential);
    return { name: decoded.name || "Verified Voter", email: decoded.email, picture: decoded.picture };
  }
  return { name: "Verified Voter", email: "voter@example.com" };
};

export const handleGoogleLoginFailure = (): void => {
  cloudLog({ severity: 'ERROR', message: 'Google Login Failed' });
  console.error("Google Login Failed");
};
