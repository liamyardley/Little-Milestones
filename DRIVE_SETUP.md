# Setting up Google Drive backup

A step-by-step guide. No prior Google Cloud experience assumed.

**Time:** about 30 minutes for the web app. Add 15 minutes for Android.
**Cost:** free.
**Checked:** 5 October 2026. Google moves these screens around — where a button
has moved, each section says what to look for instead.

---

## Contents

1. [What you are actually building](#1-what-you-are-actually-building)
2. [Decide this first: who is it for?](#2-decide-this-first-who-is-it-for)
3. [Create the Google Cloud project](#3-create-the-google-cloud-project)
4. [Turn on the Drive API](#4-turn-on-the-drive-api)
5. [Fill in the consent screen](#5-fill-in-the-consent-screen)
6. [Create the web client](#6-create-the-web-client-for-the-pwa)
7. [Create the Android client](#7-create-the-android-client)
8. [Put the IDs in the app](#8-put-the-ids-in-the-app)
9. [Test it](#9-test-it)
10. [Going public](#10-going-public)
11. [Troubleshooting](#11-troubleshooting)
12. [Reference](#12-reference)

---

## 1. What you are actually building

Backup is **optional**. With nothing set up, the app works normally and Settings
shows "Not configured in this build". Nobody is asked to sign in to anything.

When it is set up, a user can connect their own Google account and the app writes
their thread into **their** Drive — specifically into a hidden per-app folder
called `appDataFolder`.

What you are creating in Google Cloud is a **client ID**: a public string that
identifies your app when it asks a user for permission. You are not creating a
server, a database, or anything that costs money, and you are not giving yourself
access to anyone's Drive.

> **Client IDs are not secrets.** They ship inside the app, anyone can extract
> them, and that is fine — it is how OAuth is designed. They are safe to commit
> to a public repository. There is no *client secret* anywhere in this app.

### What ends up in the user's Drive

| Name | What it is |
|---|---|
| `thread.json` | the whole state document — profile, levels, notes, results |
| `photo-<file>` | one file per milestone photo |

`appDataFolder` is invisible in the normal Drive interface. A user can see how
much space it takes and delete it from Drive settings, but cannot browse it, and
no other app can read it.

> `thread.json` keeps the app's original working name on purpose. It is invisible
> to users, and renaming it would orphan backups already sitting in people's
> Drives. The same goes for the local storage key.

---

## 2. Decide this first: who is it for?

**This is the most important decision in the guide**, and it changes how much
work you do. The app asks for `drive.appdata`, which Google classes as a
**sensitive scope**. So you have two routes:

### Option A — Just you, family and friends (start here)

Leave the app in **Testing** mode. You add people's Google addresses to a test
user list, up to **100 of them**.

- No Google review, no waiting
- Works the moment you save
- Testers see an "unverified app" warning once and click past it
- Anyone not on the list cannot connect at all

**Start here.** You can move to Option B later without redoing any of this.

### Option B — Anyone can use it

Publish the app and submit for **OAuth verification**. Google reviews it.

- Needs a privacy policy at a public URL, a homepage, and a verified domain
- Usually needs a demo video showing what you do with the data
- Takes **days to weeks**, and they often come back with questions
- Until it passes, anyone who is not a test user is hard-blocked

If you are launching publicly, start this early. It has a long lead time and
cannot be rushed at the end.

> **A middle path:** ship with backup working for your test users and leave the
> feature visible but honest for everyone else. The app is fully functional
> without backup, and the opening screen says so.

---

## 3. Create the Google Cloud project

1. Go to **[console.cloud.google.com](https://console.cloud.google.com/)** and
   sign in with the account you want to **own** this app. Use one you will keep —
   moving a project later is a nuisance.
2. At the top of the page, click the **project dropdown**, just right of the
   "Google Cloud" logo. It may say "Select a project".
3. Click **New project**, top right of the dialog.
4. **Project name:** `Little Milestones`. Leave Location as "No organisation".
5. Click **Create** and wait a few seconds.
6. **Check the project dropdown now says "Little Milestones."** Everything that
   follows applies to whichever project is selected, and picking the wrong one is
   the most common way to lose an hour.

✅ **Checkpoint:** the top bar reads `Google Cloud ▸ Little Milestones`.

---

## 4. Turn on the Drive API

Without this, every call fails with a confusing permission error.

1. In the search bar at the top, type **Google Drive API** and pick it from the
   results.
2. Click **Enable**.
3. Wait for the page to turn into the API's dashboard.

✅ **Checkpoint:** the button now reads **Manage**, not Enable.

---

## 5. Fill in the consent screen

This is what users see when they connect their account.

> **Where is it?** Google is midway through renaming this area. Look for
> **Google Auth Platform** in the left menu (newer), or **APIs & Services →
> OAuth consent screen** (older). Both reach the same settings.

1. Open **Google Auth Platform** (or **APIs & Services → OAuth consent screen**).
2. If it offers **Get started**, take it.
3. **App name:** `Little Milestones` — users see this, so spell it how you want.
4. **User support email:** your own address.
5. **Audience / User type:** choose **External**. *Internal* only exists for
   Google Workspace organisations and would restrict it to your own company.
6. **Developer contact information:** your email again. Google uses it to warn
   you about problems.
7. Save.

### Add the scope

1. Go to the **Data access** tab (older UI: **Scopes**).
2. Click **Add or remove scopes**.
3. Paste this into the filter box:
   ```
   https://www.googleapis.com/auth/drive.appdata
   ```
4. Tick it, click **Update**, then **Save**.

This should be the **only** scope listed. If anything else is there, remove it —
extra scopes make verification harder and ask users for more than you need.

### Add your test users (Option A)

1. Go to the **Audience** tab (older UI: a panel on the consent screen page).
2. Confirm **Publishing status** is **Testing**.
3. Under **Test users**, click **Add users**.
4. Add your own Gmail address, plus anyone else who will use the app.
5. Save.

✅ **Checkpoint:** publishing status **Testing**, exactly one scope, and your own
address under Test users.

> Only addresses on this list can connect. When a friend later reports "access
> blocked", this list is the first thing to check.

---

## 6. Create the web client (for the PWA)

The web app signs in with **Google Identity Services**, which hands a token
straight back into the page instead of redirecting. So this client is authorised
by **origin**, and needs no redirect URI at all.

1. Go to **Google Auth Platform → Clients** (older UI: **APIs & Services →
   Credentials**).
2. Click **Create client** (older UI: **+ Create credentials → OAuth client ID**).
3. **Application type:** `Web application`
4. **Name:** `Little Milestones web` — internal only, users never see it.
5. Under **Authorised JavaScript origins**, click **+ Add URI** and add these one
   at a time:

   ```
   https://liamyardley.github.io
   http://localhost:8081
   http://localhost:8082
   http://localhost:8083
   ```

6. **Leave "Authorised redirect URIs" completely empty.** This client type does
   not use one.
7. Click **Create**.
8. Copy the **Client ID** — the long string ending
   `.apps.googleusercontent.com`. Ignore the client secret; this app never uses it.

### Why those four

| Origin | Covers |
|---|---|
| `https://liamyardley.github.io` | the live app on GitHub Pages |
| `http://localhost:8081` | Expo's default web port |
| `http://localhost:8082` | the port in this repo's `.claude/launch.json` |
| `http://localhost:8083` | a local static build, for testing the real thing |

The two localhost ports are both listed because Expo picks the next free port if
8081 is busy. Adding both saves a confusing failure later; localhost origins are
harmless in production since nobody else can serve from your machine.

> **An origin is scheme + host only — never a path.** The app lives at
> `https://liamyardley.github.io/Little-Milestones/`, but the origin Google checks
> is `https://liamyardley.github.io`. Including the path makes Google either
> reject the entry or silently fail to match it.

✅ **Checkpoint:** you have a client ID, and the client's page lists three origins
and zero redirect URIs.

---

## 7. Create the Android client

Skip this if you are only shipping the web app.

Android clients are matched by **package name plus the SHA-1 fingerprint of the
signing key** — not by a redirect URI.

1. **Clients → Create client**
2. **Application type:** `Android`
3. **Name:** `Little Milestones Android`
4. **Package name:** `com.littlemilestones.app`
   (must match `android.package` in `app.json`)
5. **SHA-1 certificate fingerprint:** see below — getting this wrong is the
   single most common cause of Android sign-in failing.
6. **Create**, then copy the client ID.

### Getting the right SHA-1

⚠️ **The trap that catches nearly everyone.** When you upload an AAB to Google
Play, **Play re-signs your app with a key you do not hold**. The certificate your
users' installed app presents is Google's *app signing key*, not your *upload
key*. Register the wrong one and sign-in works perfectly in testing, then fails
the moment it is live, with an unhelpful `DEVELOPER_ERROR`.

Register **both**:

**a) Your upload / development key**, for builds you install directly:

```bash
npx eas credentials
```

Choose Android → your build profile → read the SHA-1 from the keystore.

**b) The Play app signing key**, for anything installed from the Play Store:

> Play Console → your app → **Test and release → Setup → App integrity** →
> **App signing key certificate** → copy the **SHA-1**.
>
> Take it from the *App signing key certificate* section, **not** the *Upload key
> certificate* section directly below it on the same page.

One Android client accepts several fingerprints, so add both and the problem
disappears in every environment.

> **If you opted into Play's "quantum-ready app signing" beta**, the SHA-1 shown
> on that page is not the certificate that actually signs your app — use the one
> from the `deployment_cert.der` download instead.

### iOS

Not needed; this app is not going on the App Store. If that changes: application
type **iOS**, bundle ID `com.littlemilestones.app`.

---

## 8. Put the IDs in the app

Open `app.json` and find the `extra.googleDrive` block near the bottom:

```json
"extra": {
  "googleDrive": {
    "expoClientId": "",
    "iosClientId": "",
    "androidClientId": "",
    "webClientId": ""
  }
}
```

Paste your IDs in, keeping the quotes:

```json
"extra": {
  "googleDrive": {
    "expoClientId": "1234567890-abcdef.apps.googleusercontent.com",
    "iosClientId": "",
    "androidClientId": "1234567890-ghijkl.apps.googleusercontent.com",
    "webClientId": "1234567890-abcdef.apps.googleusercontent.com"
  }
}
```

**Which field needs what:**

| Field | Used by | Set it to |
|---|---|---|
| `webClientId` | the web app / PWA | your **web** client ID |
| `androidClientId` | the Android app | your **Android** client ID |
| `expoClientId` | a generic fallback | the same as `webClientId` |
| `iosClientId` | iOS only | leave empty |

Leave anything you do not need as an empty string — do not delete the line.

Then **restart the dev server**. `app.json` is read at build time and does not
hot-reload.

> **Heads up:** the app shows the backup UI if *any* of these fields is filled. So
> if you set only `webClientId` and then run the Android build, Settings will
> offer backup and fail when you tap Connect. Set the ID for every platform you
> actually ship.

✅ **Checkpoint:** run `npx expo start --web`, open Settings, and the Google Drive
section shows **Not connected** with a **Connect** button — rather than "Not
configured in this build".

---

## 9. Test it

1. Run the web app:
   ```bash
   npx expo start --web
   ```
2. Open it and tap the **avatar**, top left.
3. Scroll to **Google Drive backup** and tap **Connect**.
4. A Google popup appears. Sign in with an account that is **on your test user
   list**.
5. You will see **"Google hasn't verified this app"**. That is expected in
   Testing mode. Click **Advanced**, then **Go to Little Milestones (unsafe)**. It
   says unsafe because Google has not reviewed it — it is your own app.
6. The consent screen asks to *"See, edit, create and delete only the specific
   Google Drive files you use with this app."* That is Google's wording for
   `appDataFolder`. Click **Continue**.
7. The popup closes and Settings should show **Connected to Google Drive**.
8. Tap **Back up now**. You should get a "Backed up" confirmation.

### Confirm it really happened

Go to **[drive.google.com](https://drive.google.com/)** → gear icon →
**Settings** → **Manage apps**. "Little Milestones" should be listed with a small
amount of hidden app data. You cannot open it — that is the point.

### Test a restore

The real proof is a round trip:

1. Settings → **Delete everything on this phone**, and confirm.
2. You land back on the opening screen. Tap **Restore from a Google Drive
   backup**.
3. Your thread comes back, photos included.

✅ If that works, you are done.

---

## 10. Going public

Only needed for Option B. In **Google Auth Platform → Audience**, click **Publish
app**, then work through verification. You will need:

- A **privacy policy** at a public URL
- A **homepage** for the app
- **Domain ownership verification** in Google Search Console
- Often a **demo video** showing exactly what the app does with Drive data

Google reviews sensitive-scope apps properly, so allow weeks rather than days.
See [Google's sensitive scope
guidance](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification).

One point in your favour: `drive.appdata` is the narrowest Drive scope there is.
You cannot read the user's files, and that is easy to demonstrate.

---

## 11. Troubleshooting

| What you see | What it means | Fix |
|---|---|---|
| Settings says **"Not configured in this build"** | No client ID reached the app | Check the spelling in `app.json`, then restart the dev server — it does not hot-reload |
| **"The given origin is not allowed for the given client ID"** | Web origin mismatch | Add the exact origin (scheme + host, **no path, no trailing slash**) to Authorised JavaScript origins. Changes can take a few minutes to apply |
| **Access blocked: app has not completed verification** | That account is not a test user | Add the address under Audience → Test users, or publish and verify |
| **"Google hasn't verified this app"** | Normal in Testing mode | Advanced → Go to Little Milestones (unsafe) |
| Android **`DEVELOPER_ERROR`**, or the popup closes instantly | SHA-1 or package mismatch | Register **both** the upload key and the **Play app signing key** SHA-1 (section 7) |
| Works in dev, **fails from the Play Store** | The Play App Signing trap | Add the Play **app signing key** SHA-1 |
| **403 insufficient permissions** | Drive API not switched on | Section 4 — and check the correct project is selected |
| **"Sign-in has expired"** after about an hour | Working as designed | Tokens last ~1 hour with no refresh token. Tap Connect again |
| The popup never opens | The browser blocked it | Allow popups for the site; sign-in must be triggered by a real tap |
| Nothing happens on **Back up now** | Usually a dismissed popup | Look for the error line underneath the button in Settings |

### Still stuck?

Open the browser console (F12) while tapping Connect. Google's errors are
normally explicit about which of client ID, origin or scope is wrong.

---

## 12. Reference

### How the token lifecycle works

Google's flow returns an access token good for about **an hour**, with **no
refresh token**, on every platform. That suits a backup the user triggers: the
app keeps the token until it lapses, and the next action after that reopens the
consent screen. It is also why "back up after every change" is best-effort — it
works while the token is alive.

### One backup, both platforms

A thread backed up from Android restores in the web app, and the other way round.
That is deliberate:

- **`src/lib/drive.js`** is plain `fetch` plus calls into `photoStore`, with no
  platform-specific code, so both builds write identical `thread.json` and
  `photo-<file>` objects.
- **`state.photos`** records `{ file, addedAt, driveId }` everywhere. `file` is a
  *logical key*, never a path — `photoStore.js` resolves it to a file in the
  documents directory, `photoStore.web.js` to a Blob in IndexedDB.
- Only OAuth differs, and that is isolated in `useGoogleAuth.js` and
  `useGoogleAuth.web.js`, which both return nothing but a short-lived token.

If you change what goes into `thread.json`, bump `BACKUP_FORMAT` in `drive.js` so
a later version can tell which shape it is reading.

### Other behaviour worth knowing

- **Photos upload once.** Each record keeps the Drive file id it was given, so a
  repeat backup only moves what is new.
- **A photo that fails to download during a restore is skipped**, not fatal — the
  milestone simply comes back without its photo.
- **Nothing is shared.** No server in the middle, no analytics, and no other
  account can see the appDataFolder.
- **Backup matters more on the web than on a phone.** Browser storage is
  evictable: Safari clears script-writable storage for sites not visited in about
  a week, and Chrome evicts under storage pressure. Installing to the home screen
  helps considerably, and the app requests persistent storage on launch (Chrome
  grants it based on engagement; Safari does not honour it) — but Drive backup is
  the only real guarantee a web user has.
