// Browser storage is evictable. Chrome will exempt a site from eviction if it
// looks like something the user actually uses — installed to the home screen,
// bookmarked, high engagement — and this is how you ask. Safari does not
// honour it, which is why the app leans on Drive backup instead of pretending
// local-only is safe on the web.
export default function requestPersistentStorage() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persisted().then(already => {
        if (!already) navigator.storage.persist().catch(() => {});
      }).catch(() => {});
    }
  } catch (e) {
    // not supported; the app is unaffected
  }
}
