import { useEffect, useState } from 'react';
import { photoUriFor } from './storage';

/**
 * Resolve a photo record to something <Image> can show.
 *
 * On native this is a file:// path and resolves almost instantly; on web it is
 * an object URL for a Blob read out of IndexedDB, which is genuinely async.
 * The hook keeps both the same from a component's point of view.
 */
export default function usePhotoUri(record) {
  const [uri, setUri] = useState(null);
  const file = record && record.file;
  const addedAt = record && record.addedAt;

  useEffect(() => {
    let alive = true;
    if (!file) {
      setUri(null);
      return undefined;
    }
    photoUriFor({ file })
      .then(u => { if (alive) setUri(u); })
      .catch(() => { if (alive) setUri(null); });
    return () => { alive = false; };
    // addedAt changes when the photo is replaced, which must re-resolve
  }, [file, addedAt]);

  return uri;
}
