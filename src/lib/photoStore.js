// Photo storage, native (iOS / Android): one file per photo in the app's own
// documents directory.
//
// `photoStore.web.js` implements this same interface over IndexedDB. Both are
// keyed by the identical file name, so the `photos` map in a backup means the
// same thing on either platform and a Drive backup restores across them.

import { Directory, File, Paths } from 'expo-file-system';

let dir = null;
const directory = () => {
  if (!dir) dir = new Directory(Paths.document, 'photos');
  return dir;
};

const fileFor = name => new File(directory(), name);

export const ready = async () => {
  try {
    const d = directory();
    if (!d.exists) d.create({ intermediates: true });
  } catch (e) {
    // a missing photo directory costs photos, not the thread
  }
};

export const has = async name => {
  try {
    return !!name && fileFor(name).exists;
  } catch (e) {
    return false;
  }
};

/** Copy an image chosen in the picker into our own storage. */
export const putFromPicker = async (name, uri) => {
  await ready();
  await new File(uri).copy(fileFor(name));
};

/** Write raw bytes — used when pulling a photo back down from Drive. */
export const putBytes = async (name, bytes) => {
  await ready();
  const f = fileFor(name);
  if (f.exists) f.delete();
  f.create();
  f.write(bytes);
};

/** Base64 of the stored photo, for upload. */
export const getBase64 = async name => {
  try {
    const f = fileFor(name);
    return f.exists ? await f.base64() : null;
  } catch (e) {
    return null;
  }
};

/** Something an <Image source={{ uri }}> can render. */
export const getDisplayUri = async name => {
  try {
    const f = fileFor(name);
    return f.exists ? f.uri : null;
  } catch (e) {
    return null;
  }
};

export const remove = async name => {
  try {
    const f = fileFor(name);
    if (f.exists) f.delete();
  } catch (e) {
    // already gone
  }
};

export const clearAll = async () => {
  try {
    const d = directory();
    if (d.exists) d.delete();
    dir = null;
  } catch (e) {
    // ignore
  }
  await ready();
};
