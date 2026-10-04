// Google OAuth, native: expo-auth-session's Google provider.
//
// `useGoogleAuth.web.js` implements the same tiny contract over Google
// Identity Services. Both return a short-lived access token and nothing else,
// so useDrive and drive.js stay platform-agnostic.
//
//   { ready, requestToken() -> { token, expiresIn } | null }
//
// null means the user dismissed the prompt; a throw means it actually failed.

import { useCallback } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Drive from './drive';

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth() {
  const [request, , promptAsync] = Google.useAuthRequest(Drive.authConfig());

  const requestToken = useCallback(async () => {
    const res = await promptAsync();
    if (res?.type === 'success' && res.authentication?.accessToken) {
      return {
        token: res.authentication.accessToken,
        expiresIn: res.authentication.expiresIn || 3600,
      };
    }
    if (res?.type === 'error') {
      throw new Error(res.error?.message || 'Google sign-in failed.');
    }
    return null;
  }, [promptAsync]);

  return { ready: !!request, requestToken };
}
