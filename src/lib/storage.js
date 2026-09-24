import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';

const KEY = 'thread.tracker.v4';
// The design shipped a v3 web build; read it once so an existing thread
// survives the move to the app.
const LEGACY_KEY = 'thread.tracker.v3';

// Photos live on the device filesystem, which only exists on iOS and Android.
// The directory is resolved on first use rather than at import, so nothing
// touches the native module while the module graph is still loading.
export const hasFileSystem = Platform.OS === 'ios' || Platform.OS === 'android';

let photoDir = null;
export const photoDirectory = () => {
  if (!hasFileSystem) return null;
  if (!photoDir) photoDir = new Directory(Paths.document, 'photos');
  return photoDir;
};

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
  // v3 stored photos as a truthy flag rather than a file record.
  Object.keys(s.photos).forEach(id => {
    if (typeof s.photos[id] !== 'object') delete s.photos[id];
  });
  return s;
};

export const ensurePhotoDir = () => {
  const dir = photoDirectory();
  if (!dir) return;
  try {
    if (!dir.exists) dir.create({ intermediates: true });
  } catch (e) {
    // a missing photo directory only costs us photos, not the thread
  }
};

export const photoFile = name => {
  const dir = photoDirectory();
  return dir ? new File(dir, name) : null;
};

export const photoUri = record => {
  if (!record || !record.file) return null;
  try {
    const f = photoFile(record.file);
    return f && f.exists ? f.uri : null;
  } catch (e) {
    return null;
  }
};

/** Copy a picked image into app storage so it survives the picker's cache. */
export const importPhoto = async (milestoneId, sourceUri) => {
  ensurePhotoDir();
  const ext = (sourceUri.split('.').pop() || 'jpg').split('?')[0].slice(0, 4);
  const name = `${milestoneId}-${Date.now()}.${ext}`;
  const dest = photoFile(name);
  if (!dest) return { file: null, uri: sourceUri, addedAt: new Date().toISOString() };
  await new File(sourceUri).copy(dest);
  return { file: name, addedAt: new Date().toISOString() };
};

export const removePhoto = record => {
  if (!record || !record.file) return;
  try {
    const f = photoFile(record.file);
    if (f && f.exists) f.delete();
  } catch (e) {
    // already gone
  }
};

export const loadState = async () => {
  ensurePhotoDir();
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
    // out of disk; the in-memory thread is still usable this session
  }
};

export const clearState = async () => {
  await AsyncStorage.multiRemove([KEY, LEGACY_KEY]);
  try {
    const dir = photoDirectory();
    if (dir && dir.exists) dir.delete();
    photoDir = null;
  } catch (e) {}
  ensurePhotoDir();
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
