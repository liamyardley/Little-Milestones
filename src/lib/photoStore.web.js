// Photo storage, web: Blobs in IndexedDB, keyed by the same file name the
// native store uses. See photoStore.js for the shared contract.
//
// IndexedDB rather than localStorage because localStorage is a ~5MB string
// store, and a handful of phone photos would blow through that immediately.

import { mimeForName } from './mime';

const DB_NAME = 'little-milestones';
const DB_VERSION = 1;
const STORE = 'photos';

let dbPromise = null;

const open = () => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('This browser has no IndexedDB, so photos cannot be saved.'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
};

const tx = async (mode, fn) => {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    let result;
    try {
      result = fn(store);
    } catch (e) {
      reject(e);
      return;
    }
    t.oncomplete = () => resolve(result && result.result !== undefined ? result.result : result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
};

// Object URLs are per-document and must be released, so each one is cached and
// revoked when its photo is replaced or removed.
const urls = new Map();
const releaseUrl = name => {
  const u = urls.get(name);
  if (u) {
    try { URL.revokeObjectURL(u); } catch (e) {}
    urls.delete(name);
  }
};

export const ready = async () => {
  try {
    await open();
  } catch (e) {
    // private mode or blocked storage: the thread still works, photos do not
  }
};

export const has = async name => {
  if (!name) return false;
  try {
    const v = await tx('readonly', s => s.get(name));
    return !!v;
  } catch (e) {
    return false;
  }
};

export const putFromPicker = async (name, uri, mimeType) => {
  // the picker hands back a blob: or data: URL, which fetch can read
  const res = await fetch(uri);
  const raw = await res.blob();
  const blob = raw.type ? raw : new Blob([raw], { type: mimeType || mimeForName(name) });
  releaseUrl(name);
  await tx('readwrite', s => s.put(blob, name));
};

export const putBytes = async (name, bytes, mimeType) => {
  const blob = new Blob([bytes], { type: mimeType || mimeForName(name) });
  releaseUrl(name);
  await tx('readwrite', s => s.put(blob, name));
};

const BASE64_CHUNK = 0x8000;

export const getBase64 = async name => {
  try {
    const blob = await tx('readonly', s => s.get(name));
    if (!blob) return null;
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    // chunked, because String.fromCharCode(...hugeArray) overflows the stack
    for (let i = 0; i < bytes.length; i += BASE64_CHUNK) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + BASE64_CHUNK));
    }
    return btoa(binary);
  } catch (e) {
    return null;
  }
};

export const getDisplayUri = async name => {
  if (!name) return null;
  if (urls.has(name)) return urls.get(name);
  try {
    const blob = await tx('readonly', s => s.get(name));
    if (!blob) return null;
    const url = URL.createObjectURL(blob);
    urls.set(name, url);
    return url;
  } catch (e) {
    return null;
  }
};

export const remove = async name => {
  releaseUrl(name);
  try {
    await tx('readwrite', s => s.delete(name));
  } catch (e) {
    // already gone
  }
};

export const clearAll = async () => {
  urls.forEach((_, name) => releaseUrl(name));
  try {
    await tx('readwrite', s => s.clear());
  } catch (e) {
    // nothing to clear
  }
};
