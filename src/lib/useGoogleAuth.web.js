// Google OAuth, web: Google Identity Services.
//
// Same contract as useGoogleAuth.js — see there. GIS gives an access token
// directly, with no redirect and no server, which suits a static site: the
// whole app is files on GitHub Pages and there is nothing to keep a secret in.
//
// The only setup this needs is a *Web* OAuth client whose authorised
// JavaScript origin matches where the app is served from. See DRIVE_SETUP.md.

import { useCallback, useEffect, useState } from 'react';
import * as Drive from './drive';

const GIS_SRC = 'https://accounts.google.com/gsi/client';

let scriptPromise = null;

const loadGis = () => {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('No document'));
      return;
    }
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    const el = existing || document.createElement('script');
    el.addEventListener('load', () => resolve());
    el.addEventListener('error', () => {
      scriptPromise = null;
      reject(new Error('Could not reach Google to sign in. Check your connection.'));
    });
    if (!existing) {
      el.src = GIS_SRC;
      el.async = true;
      el.defer = true;
      document.head.appendChild(el);
    }
  });
  return scriptPromise;
};

export default function useGoogleAuth() {
  const [ready, setReady] = useState(false);
  const configured = !!Drive.clientIds().webClientId;

  useEffect(() => {
    let alive = true;
    if (!configured) return undefined;
    loadGis().then(() => { if (alive) setReady(true); }).catch(() => {});
    return () => { alive = false; };
  }, [configured]);

  const requestToken = useCallback(async () => {
    const clientId = Drive.clientIds().webClientId;
    if (!clientId) throw new Error('Google Drive backup is not configured in this build.');
    await loadGis();

    return new Promise((resolve, reject) => {
      let settled = false;
      const done = fn => (...args) => { if (!settled) { settled = true; fn(...args); } };

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: Drive.SCOPES.join(' '),
        callback: done(resp => {
          if (resp.error) {
            // the user closing the consent screen is a dismissal, not a failure
            if (resp.error === 'access_denied' || resp.error === 'popup_closed') resolve(null);
            else reject(new Error(resp.error_description || resp.error));
            return;
          }
          resolve({ token: resp.access_token, expiresIn: Number(resp.expires_in) || 3600 });
        }),
        error_callback: done(err => {
          if (err?.type === 'popup_closed' || err?.type === 'popup_failed_to_open') resolve(null);
          else reject(new Error(err?.message || 'Google sign-in failed.'));
        }),
      });

      client.requestAccessToken();
    });
  }, []);

  return { ready: ready || !configured, requestToken };
}
