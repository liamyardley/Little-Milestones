# Google Drive backup — setup

Backup is **optional**. With nothing configured, Little Milestones works normally: the
Settings screen shows "Not configured in this build" and every other feature
behaves as usual. Nothing in the app asks the user to sign in to start.

Turning it on means creating Google OAuth client IDs and pasting them into
`app.json`. There is no server and no secret to protect — the app talks to the
Drive REST API directly with the token Google hands back.

## What the app asks for

One scope, and only one:

```
https://www.googleapis.com/auth/drive.appdata
```

That grants access to **appDataFolder** — a hidden per-app folder in the user's
own Drive. It cannot read, list or touch any other file in their Drive. The user
can see how much space it uses and delete it from Drive settings, but not browse
it.

Two kinds of object end up there:

| Name | What it is |
| --- | --- |
| `thread.json` | the whole state document — profile, levels, notes, results |
| `photo-<file>` | one file per milestone photo |

`thread.json` keeps the app's original working name on purpose. It is invisible to
the user, and renaming it would orphan any backup already sitting in someone's
Drive. The same goes for the local storage key.

## 1. Create the Google Cloud project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create
   a project (or reuse one).
2. **APIs & Services → Library →** enable **Google Drive API**.
3. **APIs & Services → OAuth consent screen:**
   - User type **External**, publishing status **Testing** is fine while you are
     the only user — add your own Google account under *Test users*.
   - Add the scope `.../auth/drive.appdata`. It is a
     [sensitive scope](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification),
     so publishing the app to all users later requires Google's verification.
     Testing mode does not.

## 2. Create the client IDs

Under **APIs & Services → Credentials → Create credentials → OAuth client ID**,
create one per platform you build for. The bundle/package name below must match
`app.json` (`ios.bundleIdentifier` and `android.package`), currently
`com.littlemilestones.app`.

| Platform | Application type | Fields |
| --- | --- | --- |
| **Web app (GitHub Pages)** | Web application | **Authorised JavaScript origins**, not a redirect URI — see below |
| Android | Android | Package name `com.littlemilestones.app`, plus the SHA-1 of your signing key |
| iOS | iOS | Bundle ID `com.littlemilestones.app` |
| Expo Go / dev | Web application | Redirect URI `https://auth.expo.io/@<your-expo-username>/little-milestones` |

### The web client, in detail

The web build signs in with **Google Identity Services**, which hands back an
access token in the page rather than redirecting. So the web client is
authorised by *origin*, and needs no redirect URI at all.

Under **Authorised JavaScript origins**, add:

```
https://liamyardley.github.io
http://localhost:8081
http://localhost:8083
```

The origin is the scheme and host only — no path. GitHub Pages serves the app
from `https://liamyardley.github.io/Little-Milestones/`, but the origin Google
checks is `https://liamyardley.github.io`. The localhost entries are for
testing the dev server and a local static build.

Put that client id in **both** `webClientId` and `expoClientId`.

For the Android SHA-1 from an EAS build:

```bash
npx eas credentials
```

## 3. Paste them into app.json

```json
"extra": {
  "googleDrive": {
    "expoClientId": "…apps.googleusercontent.com",
    "iosClientId": "…apps.googleusercontent.com",
    "androidClientId": "…apps.googleusercontent.com",
    "webClientId": "…apps.googleusercontent.com"
  }
}
```

Fill in only the platforms you need — the app treats Drive as configured as soon
as any one of them is set, and `expo-auth-session` picks the right one at
runtime. Restart the dev server after editing `app.json`.

## 4. Try it

On the phone app or the web app — the screens are the same. Tap the avatar
(top left) → **Google Drive backup**:

- **Connect** — opens Google's consent screen.
- **Back up now** — uploads the thread and any photos not already up there.
- **Back up after every change** — same thing, automatically, about four seconds
  after edits stop.
- **Restore from Drive** — pulls the backup down and replaces what is on the
  phone (it asks first).
- **Remove the backup from Drive** — deletes everything the app has stored there.

On a new phone, the onboarding screen also offers **Restore from a Google Drive
backup** so a thread can be brought across without setting the child up again.

## One backup, both platforms

A thread backed up from Android restores in the web app, and the other way
round. That is deliberate, and it is why the code is arranged the way it is:

- `src/lib/drive.js` is plain `fetch` plus calls into `photoStore`. It has no
  platform-specific code, so both builds write an identical `thread.json` and
  identical `photo-<file>` objects.
- `state.photos` records `{ file, addedAt, driveId }` on every platform. `file`
  is a *logical key*, never a path — `photoStore.js` resolves it to a file in
  the documents directory, `photoStore.web.js` to a Blob in IndexedDB.
- Only the OAuth step differs, and that is isolated in `useGoogleAuth.js` and
  `useGoogleAuth.web.js`, which both return nothing but a short-lived token.

If you ever change what goes into `thread.json`, bump `BACKUP_FORMAT` in
`drive.js` so a future version can tell which shape it is reading.

## Notes on how it behaves

- **Tokens are short-lived.** Google's native flow returns an access token good
  for about an hour and no refresh token. The app keeps it until it lapses, then
  reopens the consent screen the next time you back up. This is why "back up
  after every change" is best-effort rather than guaranteed — it works while the
  token is alive.
- **Photos upload once.** Each photo record keeps the Drive file id it was given,
  so repeat backups only move what is new.
- **A photo that fails to download during a restore is skipped**, not fatal — the
  milestone simply comes back without its photo.
- **Nothing is shared.** There is no server in the middle, no analytics, and no
  other account can see the appDataFolder.
- **Backup matters more on the web than on a phone.** Browser storage is
  evictable: Safari clears script-writable storage for sites not visited in
  about a week, and Chrome evicts under storage pressure. Installing the app to
  the home screen helps considerably, but Drive backup is the only real
  guarantee a web user has. The app asks for persistent storage on launch,
  which Chrome grants based on engagement; Safari does not honour it.
