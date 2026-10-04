import AsyncStorage from '@react-native-async-storage/async-storage';
import * as photoStore from './photoStore';
import { photoName } from './mime';

// AsyncStorage is the device keychain-ish store on native and localStorage on
// web. The thread is small enough for either; photos go to photoStore instead.
const KEY = 'thread.tracker.v4';
// The design shipped a v3 web build; read it once so an existing thread
// survives the move to the app.
const LEGACY_KEY = 'thread.tracker.v3';

export const emptyState = () => ({
  version: 4,
  profile: null,
  progress: {},
  notes: {},
  photos: {},
  results: {},
  settings: { celebrations: true, driveBackup: false },
});

const normalise = raw => {
  const s = { ...emptyState(), ...(raw || {}) };
  s.settings = { ...emptyState().settings, ...(raw && raw.settings) };
  // v3 stored photos as a truthy flag rather than a file record; and an early
  // web build could record a photo with no file name, which nothing can resolve.
  Object.keys(s.photos).forEach(id => {
    const rec = s.photos[id];
    if (typeof rec !== 'object' || !rec || !rec.file) delete s.photos[id];
  });
  return s;
};

/**
 * Import a picked image. Returns the record that goes in `state.photos`, which
 * is deliberately identical on native and web:
 *
 *   { file: "<milestoneId>-<timestamp>.<ext>", addedAt, driveId? }
 *
 * `file` is a logical key, not a path — native resolves it to a file in the
 * documents directory, web to a Blob in IndexedDB.
 */
export const importPhoto = async (milestoneId, asset) => {
  const name = photoName(milestoneId, asset);
  await photoStore.putFromPicker(name, asset.uri, asset.mimeType);
  return { file: name, addedAt: new Date().toISOString() };
};

export const removePhoto = async record => {
  if (record && record.file) await photoStore.remove(record.file);
};

export const photoUriFor = async record =>
  (record && record.file ? photoStore.getDisplayUri(record.file) : null);

export const loadState = async () => {
  await photoStore.ready();
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) return normalise(JSON.parse(raw));
    const legacy = await AsyncStorage.getItem(LEGACY_KEY);
    if (legacy) return normalise(JSON.parse(legacy));
  } catch (e) {
    // corrupt storage: start clean rather than crash on launch
  }
  return emptyState();
};

export const saveState = async state => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    // out of space; the in-memory thread is still usable this session
  }
};

export const clearState = async () => {
  await AsyncStorage.multiRemove([KEY, LEGACY_KEY]);
  await photoStore.clearAll();
};

// Drive auth lives outside the backed-up state — it is device-specific.
const AUTH_KEY = 'thread.drive.auth.v1';
export const loadAuth = async () => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};
export const saveAuth = async auth => {
  if (auth) await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  else await AsyncStorage.removeItem(AUTH_KEY);
};
