import { useCallback, useEffect, useRef, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Drive from './drive';
import { loadAuth, saveAuth } from './storage';

WebBrowser.maybeCompleteAuthSession();

const stillValid = auth => !!(auth && auth.token && auth.expiresAt > Date.now() + 60000);

/**
 * Google Drive backup, as a hook.
 *
 * Google's native flow hands back an access token with about an hour on it and
 * no refresh token, which suits a backup that the user triggers: the token is
 * kept until it lapses, and any action taken after that re-opens the consent
 * screen first.
 */
export default function useDrive() {
  const [auth, setAuth] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);
  const queued = useRef(null);

  const [request, response, promptAsync] = Google.useAuthRequest(Drive.authConfig());

  useEffect(() => {
    loadAuth().then(saved => {
      if (stillValid(saved)) setAuth(saved);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!response) return;
    if (response.type === 'success' && response.authentication?.accessToken) {
      const next = {
        token: response.authentication.accessToken,
        expiresAt: Date.now() + (response.authentication.expiresIn || 3600) * 1000,
      };
      setAuth(next);
      saveAuth(next);
      setError(null);
      const job = queued.current;
      queued.current = null;
      if (job) job(next.token);
    } else if (response.type === 'error') {
      setError(response.error?.message || 'Google sign-in failed.');
      queued.current = null;
    } else {
      // dismissed or cancelled — not an error worth showing
      queued.current = null;
    }
  }, [response]);

  const signIn = useCallback(() => {
    if (!Drive.isConfigured()) {
      setError('Google Drive backup is not configured in this build. See DRIVE_SETUP.md.');
      return Promise.resolve(false);
    }
    setError(null);
    return promptAsync();
  }, [promptAsync]);

  const signOut = useCallback(async () => {
    setAuth(null);
    await saveAuth(null);
  }, []);

  /** Run `job(token)`, opening the consent screen first if we have no token. */
  const withToken = useCallback(job => {
    if (stillValid(auth)) return job(auth.token);
    queued.current = job;
    return signIn();
  }, [auth, signIn]);

  const run = useCallback((job, label) => withToken(async token => {
    setBusy(label);
    setError(null);
    try {
      return await job(token);
    } catch (e) {
      if (e instanceof Drive.DriveError && /expired/i.test(e.message)) {
        setAuth(null);
        await saveAuth(null);
      }
      setError(e.message || String(e));
      return null;
    } finally {
      setBusy(null);
    }
  }), [withToken]);

  const backupNow = useCallback(
    state => run(token => Drive.backup(token, state, setBusy), 'Backing up…'),
    [run],
  );

  const restoreNow = useCallback(
    () => run(token => Drive.restore(token, setBusy), 'Restoring…'),
    [run],
  );

  const wipeNow = useCallback(
    () => run(token => Drive.wipe(token), 'Removing the backup…'),
    [run],
  );

  return {
    configured: Drive.isConfigured(),
    ready: loaded && !!request,
    signedIn: stillValid(auth),
    busy,
    error,
    clearError: () => setError(null),
    signIn,
    signOut,
    backupNow,
    restoreNow,
    wipeNow,
  };
}
