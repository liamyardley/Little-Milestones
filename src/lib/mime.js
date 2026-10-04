// Photo file names carry their own type, and both platforms read it the same
// way, so a backup written by one restores cleanly on the other.

export const mimeForName = name => {
  const ext = (name || '').split('.').pop().toLowerCase();
  if (ext === 'png') return 'image/png';
  if (ext === 'heic' || ext === 'heif') return 'image/heic';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'image/jpeg';
};

const EXT_FOR_MIME = {
  'image/png': 'png',
  'image/heic': 'heic',
  'image/heif': 'heic',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

/** Work out a sane extension from the picker's asset, falling back to jpg. */
export const extForAsset = asset => {
  if (!asset) return 'jpg';
  if (asset.mimeType && EXT_FOR_MIME[asset.mimeType.toLowerCase()]) {
    return EXT_FOR_MIME[asset.mimeType.toLowerCase()];
  }
  const fromUri = (asset.uri || '').split('?')[0].split('#')[0].split('.').pop().toLowerCase();
  if (fromUri && fromUri.length <= 4 && /^[a-z0-9]+$/.test(fromUri)) {
    return fromUri === 'jpeg' ? 'jpg' : fromUri;
  }
  return 'jpg';
};

/** Name a milestone's photo. The shape is part of the cross-platform format. */
export const photoName = (milestoneId, asset) =>
  `${milestoneId}-${Date.now()}.${extForAsset(asset)}`;
