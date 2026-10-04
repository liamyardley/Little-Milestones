import { useCallback, useEffect, useState } from 'react';
import * as Drive from './drive';
import useGoogleAuth from './useGoogleAuth';
import { loadAuth, saveAuth } from './storage';

const stillValid = auth => !!(auth && auth.token && auth.expiresAt > Date.now() + 60000);

/**
 * Google Drive backup, as a hook.
 *
 * Google's flow hands back an access token with about an hour on it and no
 * refresh token, on every platform. That suits a backup the user triggers: the
 * token is kept until it lapses, and any action taken after that opens the
 * consent screen first. The platform difference lives entirely in
 * useGoogleAuth; everything below is shared.
 */
export default function useDrive() {
  const [auth, setAuth] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);
  const google = useGoogleAuth();

  useEffect(() => {
    loadAuth().then(saved => {
      if (stillValid(saved)) setAuth(saved);
      setLoaded(true);
    });
  }, []);

  /** Returns a usable token, prompting if needed, or null if dismissed. */
  const getToken = useCallback(async () => {
    if (stillValid(auth)) return auth.token;
    if (!Drive.isConfigured()) {
      throw new Error('Google Drive backup is not configured in this build. See DRIVE_SETUP.md.');
    }
    const granted = await google.requestToken();
    if (!granted) return null;
    const next = { token: granted.token, expiresAt: Date.now() + granted.expiresIn * 1000 };
    setAuth(next);
    await saveAuth(next);
    return next.token;
  }, [auth, google]);

  const signIn = useCallback(async () => {
    setError(null);
    try {
      return !!(await getToken());
    } catch (e) {
      setError(e.message || String(e));
      return false;
    }
  }, [getToken]);

  const signOut = useCallback(async () => {
    setAuth(null);
    await saveAuth(null);
  }, []);

  const run = useCallback(async (job, label) => {
    setError(null);
    let token;
    try {
      token = await getToken();
    } catch (e) {
      setError(e.message || String(e));
      return null;
    }
    if (!token) return null;   // dismissed

    setBusy(label);
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
  }, [getToken]);

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
    ready: loaded && google.ready,
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
