// Optional Google Drive backup.
//
// The thread is written to Drive's appDataFolder — a private, per-app folder
// the user can see the size of but not browse, and which nothing else on
// their Drive can read. Two kinds of object live there:
//
//   thread.json          the whole state document
//   photo-<file>         one file per milestone photo
//
// Backup is off until the user turns it on, and the app is fully usable
// without ever signing in.

import Constants from 'expo-constants';
import { File } from 'expo-file-system';
import { ensurePhotoDir, photoFile } from './storage';

export const STATE_FILE = 'thread.json';
export const SCOPES = ['https://www.googleapis.com/auth/drive.appdata'];

const API = 'https://www.googleapis.com/drive/v3';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3';
const BOUNDARY = 'thread-boundary-9f2c1a';

export const clientIds = () => {
  const cfg = (Constants.expoConfig?.extra?.googleDrive) || {};
  return {
    clientId: cfg.expoClientId || undefined,
    iosClientId: cfg.iosClientId || undefined,
    androidClientId: cfg.androidClientId || undefined,
    webClientId: cfg.webClientId || undefined,
  };
};

export const isConfigured = () => Object.values(clientIds()).some(Boolean);

// expo-auth-session's Google provider throws during render if the current
// platform has no client id, so an unconfigured build gets placeholders and is
// stopped at the point of prompting instead.
const PLACEHOLDER = 'unconfigured.apps.googleusercontent.com';

export const authConfig = () => {
  const ids = clientIds();
  return {
    clientId: ids.clientId || PLACEHOLDER,
    iosClientId: ids.iosClientId || PLACEHOLDER,
    androidClientId: ids.androidClientId || PLACEHOLDER,
    webClientId: ids.webClientId || PLACEHOLDER,
    scopes: SCOPES,
  };
};

export class DriveError extends Error {}

const authHeaders = token => ({ Authorization: `Bearer ${token}` });

const check = async (res, what) => {
  if (res.ok) return res;
  let detail = '';
  try {
    detail = (await res.json())?.error?.message || '';
  } catch (e) {}
  if (res.status === 401 || res.status === 403) {
    throw new DriveError('Google sign-in has expired. Sign in again to back up.');
  }
  throw new DriveError(`${what} failed (${res.status})${detail ? `: ${detail}` : ''}`);
};

/** Id of a file in appDataFolder by exact name, or null. */
export const findFile = async (token, name) => {
  const q = encodeURIComponent(`name = '${name}' and trashed = false`);
  const url = `${API}/files?spaces=appDataFolder&q=${q}&fields=files(id,name,modifiedTime)&pageSize=1`;
  const res = await check(await fetch(url, { headers: authHeaders(token) }), 'Looking up the backup');
  const json = await res.json();
  return json.files && json.files[0] ? json.files[0] : null;
};

const multipartBody = (metadata, data, mimeType, base64) => {
  const encoding = base64 ? '\r\nContent-Transfer-Encoding: base64' : '';
  return (
    `--${BOUNDARY}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${BOUNDARY}\r\nContent-Type: ${mimeType}${encoding}\r\n\r\n` +
    `${data}\r\n--${BOUNDARY}--`
  );
};

/** Create or overwrite a file in appDataFolder. Returns its id. */
export const putFile = async (token, { id, name, mimeType, data, base64 = false }) => {
  const metadata = id ? { name } : { name, parents: ['appDataFolder'] };
  const url = id
    ? `${UPLOAD}/files/${id}?uploadType=multipart&fields=id`
    : `${UPLOAD}/files?uploadType=multipart&fields=id`;
  const res = await check(
    await fetch(url, {
      method: id ? 'PATCH' : 'POST',
      headers: {
        ...authHeaders(token),
        'Content-Type': `multipart/related; boundary=${BOUNDARY}`,
      },
      body: multipartBody(metadata, data, mimeType, base64),
    }),
    'Uploading to Drive',
  );
  return (await res.json()).id;
};

export const getFileText = async (token, id) => {
  const res = await check(
    await fetch(`${API}/files/${id}?alt=media`, { headers: authHeaders(token) }),
    'Downloading the backup',
  );
  return res.text();
};

export const deleteFile = async (token, id) => {
  const res = await fetch(`${API}/files/${id}`, { method: 'DELETE', headers: authHeaders(token) });
  if (!res.ok && res.status !== 404) await check(res, 'Deleting from Drive');
};

const mimeForFile = name => {
  const ext = (name.split('.').pop() || '').toLowerCase();
  if (ext === 'png') return 'image/png';
  if (ext === 'heic') return 'image/heic';
  if (ext === 'webp') return 'image/webp';
  return 'image/jpeg';
};

/**
 * Push the thread to Drive. Photos already carrying a driveId are skipped, so
 * a repeat backup only moves what changed.
 *
 * Returns { state, uploadedPhotos } — state carries the new photo driveIds and
 * must be persisted by the caller.
 */
export const backup = async (token, state, onProgress = () => {}) => {
  const photos = { ...state.photos };
  const ids = Object.keys(photos);
  let uploadedPhotos = 0;

  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i];
    const rec = photos[id];
    if (!rec || !rec.file || rec.driveId) continue;
    const f = photoFile(rec.file);
    if (!f || !f.exists) continue;
    onProgress(`Uploading photo ${i + 1} of ${ids.length}…`);
    const driveId = await putFile(token, {
      name: `photo-${rec.file}`,
      mimeType: mimeForFile(rec.file),
      data: await f.base64(),
      base64: true,
    });
    photos[id] = { ...rec, driveId };
    uploadedPhotos += 1;
  }

  onProgress('Saving the thread…');
  const next = { ...state, photos, backedUpAt: new Date().toISOString() };
  const existing = await findFile(token, STATE_FILE);
  await putFile(token, {
    id: existing && existing.id,
    name: STATE_FILE,
    mimeType: 'application/json',
    data: JSON.stringify(next),
  });

  return { state: next, uploadedPhotos };
};

/** Read the thread back from Drive, pulling down any photos we do not hold. */
export const restore = async (token, onProgress = () => {}) => {
  onProgress('Looking for a backup…');
  const meta = await findFile(token, STATE_FILE);
  if (!meta) return null;

  onProgress('Downloading the thread…');
  const state = JSON.parse(await getFileText(token, meta.id));

  ensurePhotoDir();
  const photos = { ...(state.photos || {}) };
  const ids = Object.keys(photos);
  for (let i = 0; i < ids.length; i += 1) {
    const rec = photos[ids[i]];
    if (!rec || !rec.file || !rec.driveId) continue;
    const dest = photoFile(rec.file);
    if (!dest || dest.exists) continue;
    onProgress(`Downloading photo ${i + 1} of ${ids.length}…`);
    try {
      await File.downloadFileAsync(`${API}/files/${rec.driveId}?alt=media`, dest, {
        headers: authHeaders(token),
        idempotent: true,
      });
    } catch (e) {
      // A photo that will not come down should not sink the whole restore —
      // drop the reference so the milestone simply shows no photo.
      delete photos[ids[i]].driveId;
    }
  }

  return { ...state, photos, restoredAt: new Date().toISOString() };
};

/** Remove everything Thread has put in the user's Drive. */
export const wipe = async token => {
  const res = await check(
    await fetch(`${API}/files?spaces=appDataFolder&fields=files(id)&pageSize=1000`, {
      headers: authHeaders(token),
    }),
    'Listing the backup',
  );
  const { files = [] } = await res.json();
  for (const f of files) await deleteFile(token, f.id);
  return files.length;
};
