# Releasing Little Milestones to the App Store and Google Play

A roadmap, not a to-do list for today. Nothing here needs doing until you decide
to ship.

**Store policies change.** Everything below was accurate on 29 September 2026;
re-check the linked pages before you rely on any specific number or rule.

---

## Read this first

Two items have lead times you cannot compress, and they run **in parallel**, not
in sequence. Start both on day one of a real push:

1. **Google Play's closed-testing rule** — 12 testers, 14 continuous days. A
   two-week floor before you can ship to production at all.
2. **Google OAuth verification** for Drive backup — `drive.appdata` is a
   sensitive scope, so backup only works for your own test accounts until Google
   verifies the app. Often the real bottleneck, and it has nothing to do with
   either app store.

Everything else is a few days of work. **Realistic total: 3–6 weeks.**

---

## What is already in your favour

Worth knowing, because it removes work other apps have to do:

- **No data collection.** Nothing leaves the device except to the user's own
  Drive. You can legitimately answer "no data collected" on both stores' privacy
  forms — rare, and a genuine marketing asset.
- **No accounts, no login, no backend.** Nothing to secure, nothing to run, and
  no third-party login (which matters — see [Trap 2](#trap-2-sign-in-with-apple)).
- **The medical disclaimer already exists**, in the Progress tab.
- **The name is free.** "Little Milestones" wasn't taken in either store as of
  late September 2026. Reserve it early anyway — names are first-come.
- **No Mac required.** EAS builds iOS in the cloud.

---

## Phase 0 — Blockers already in the project

These are real gaps in the current codebase, not hypotheticals.

- [ ] **App icon — hard blocker.** `app.json` has no `icon`, no `splash.image`,
      and `android.adaptiveIcon` has only a `backgroundColor`. There is no
      `assets/` directory. Both stores reject without an icon.
      - iOS: 1024×1024 PNG, no transparency, no rounded corners
      - Android adaptive icon: a foreground image plus the background colour you
        already have
      - [Expo: app icons and splash screens](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)
      - [Apple: app icon guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
      - [Android: adaptive icons](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)

- [ ] **Decide on iPad.** `ios.supportsTablet` is currently `true`, which means
      Apple reviews on iPad *and* you must supply iPad screenshots. The layout is
      a 402pt phone design with nothing tablet-specific. **Recommended: set it to
      `false` for v1** — it removes a screenshot set and an entire review surface.

- [ ] **Create `eas.json`** via `eas build:configure`.
      [EAS Build setup](https://docs.expo.dev/build/setup/)

- [ ] **Version numbers.** No `ios.buildNumber` or `android.versionCode`. Let EAS
      auto-increment them.
      [App version management](https://docs.expo.dev/build-reference/app-versions/)

- [ ] **Type scale — worth a pass.** UI font sizes go down to **8px**. Not a
      rejection risk, but your users are sleep-deprived parents, often
      one-handed, often in a dim room. Small labels will cost you review stars
      faster than any missing feature. Consider a floor of 11–12px for anything
      that carries meaning.

---

## Phase 1 — Accounts

Do these first; identity verification alone can take days.

| | Cost | Notes |
|---|---|---|
| [Apple Developer Program](https://developer.apple.com/programs/) | $99/year | Individual enrolment is quick. A **company** account needs a [D-U-N-S number](https://developer.apple.com/support/D-U-N-S/), which can add weeks |
| [Google Play Console](https://play.google.com/console/) | $25 one-time | Plus identity verification |

**Choose individual vs company deliberately.** An individual account publishes
under your own legal name, visible on both store listings. A company account
hides that behind an entity but costs you the D-U-N-S wait.

---

## Phase 2 — The two long-lead items

### Google Play: 12 testers, 14 days

If your Play account is **personal and was created after 13 November 2023**, you
cannot publish to production until you have run a closed test with **at least 12
testers opted in for 14 continuous days**. Production and pre-registration stay
switched off until you meet it. As of 2026, Google also checks that those testers
genuinely used the app — not just that they accepted the invite.

Organisation accounts, and personal accounts older than that date, are exempt.

- [ ] Confirm whether the rule applies to your account
- [ ] Recruit 12 testers (real people with Google accounts, on Android)
- [ ] Run the closed test — the 14 days are **continuous**, so a tester dropping
      out mid-window can reset your clock
- [ ] Ask testers to actually open and use the app

Links: [official requirements](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
· [how the clock works](https://ontest.app/blog/google-play-12-testers-14-days-requirement-explained)

### Google OAuth verification for Drive backup

`https://www.googleapis.com/auth/drive.appdata` is a **sensitive scope**. In
Testing mode it works only for accounts you add as test users. Public release
needs Google's verification.

- [ ] Privacy policy at a public URL (also needed by both stores — see Phase 3)
- [ ] A homepage for the app
- [ ] Verify domain ownership in Google Search Console
- [ ] Complete the OAuth consent screen, including a demo video if asked
- [ ] Submit for verification and expect weeks, not days

Links: [sensitive scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)
· [Google Cloud Console](https://console.cloud.google.com/)
· your own [DRIVE_SETUP.md](DRIVE_SETUP.md)

> **Fallback worth considering:** the app is fully functional without Drive
> backup, and says so on the opening screen. If verification drags, you can ship
> v1 with backup disabled and turn it on in v1.1. Do not let this block launch.

---

## Phase 3 — Documents and declarations

- [ ] **Privacy policy at a public URL.** Mandatory for both stores. Yours is
      unusually simple: no collection, no analytics, no server, no third parties;
      photos and data stay on the device; optional backup goes to the user's own
      Google Drive under a single scope.

- [ ] **Apple App Privacy questionnaire** — you can answer "no data collected".
      [App privacy details](https://developer.apple.com/app-store/app-privacy-details/)

- [ ] **Google Play Data Safety form** — same answer, same caveat: it must be
      exactly accurate about the Drive path. Data going to the *user's own*
      Drive is not developer collection, but describe it plainly rather than
      omitting it.

- [ ] **Content rating questionnaire** (IARC on Play, age rating on Apple). This
      app is a 4+/3+ — which does **not** mean it belongs in a kids category.
      See [Trap 1](#trap-1-declare-your-audience-as-adults).

- [ ] **Surface the medical disclaimer earlier.** It currently sits at the bottom
      of the Progress tab. Given the app cites the CDC and AAP, put it in
      onboarding too. Apple scrutinises anything that reads as diagnostic.
      [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) §1.4.1

- [ ] **Content licensing diligence.** *(Not legal advice — but here is the
      actual position, which is better than most apps know about their own
      content.)*

      **CDC — no issue.** US federal work, effectively public domain.
      [Learn the Signs. Act Early.](https://www.cdc.gov/act-early/milestones-app/index.html)

      **WHO — worth understanding properly.** WHO publications are released under
      **CC BY-NC-SA 3.0 IGO**: attribution required, **non-commercial**, and
      share-alike on adaptations. Commercial use needs written permission.
      [WHO copyright policy](https://www.who.int/about/policies/publishing/copyright)

      The good news is how your content actually uses WHO. There are **8
      references**, all of them numerical windows restated in the app's own
      prose — for example *"WHO windows: sitting without support between 3.8 and
      9.2 months across healthy children"* — attributed as *"WHO Motor
      Development Study, 2006 (windows of achievement)"*. No WHO text is
      reproduced verbatim, no tables or figures are copied, and the WHO logo is
      not used.

      That matters because copyright protects **expression, not facts**. Stating
      a published age range in your own words is very likely outside the licence
      altogether, so the non-commercial clause probably never bites. Two caveats:

      - Don't ever paste a WHO **table or figure** into the app — that is the
        licensed expression, and it would pull you squarely under CC BY-NC-SA.
      - UK/EU **database right** can protect a compilation even when individual
        facts aren't protected. Eight data points is very unlikely to be a
        substantial extraction, but it's the reason to keep it at eight rather
        than transcribing the whole study.

      If the app becomes **paid** rather than free, a short email to WHO
      permissions is cheap insurance for total certainty.

      **Montessori / Pikler.** "Montessori" is generic in most jurisdictions.
      "Pikler" is tied to a specific institute — you reference the *practice*,
      not the brand or any trademark, which is the safer side of the line.

---

## Phase 4 — Two review traps specific to this app

### Trap 1: declare your audience as adults

Your app is **about babies but for parents**. That distinction decides which
policy regime you fall under, and getting it wrong means a slow, confusing
rejection.

- On Play, complete **Target Audience and Content** with adults only. Google's
  guidance is to select child age groups only if you have genuinely designed and
  vetted the app for them.
- **Do not opt into Designed for Families** (Play) or the **Kids Category**
  (Apple). Both impose far stricter rules — parental gates, no third-party
  analytics, ad restrictions, restricted external links — and buy you nothing
  here.

Links: [Play Families policies](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)
· [Apple Kids Category](https://developer.apple.com/app-store/kids-apps/)

### Trap 2: Sign in with Apple

Apple's **Guideline 4.8** requires offering Sign in with Apple wherever you offer
third-party *login*. Removing Google Sign-In already dodged this — but the app
still shows a Google OAuth consent screen for Drive backup, and reviewers
sometimes misread that as third-party authentication.

- [ ] Put this in your App Review notes, more or less verbatim:

> Little Milestones has no user accounts and no authentication. Google sign-in is
> used solely to back up the user's own data to their own Google Drive, under the
> single `drive.appdata` scope, and is entirely optional — the app is fully
> functional without it. No third-party login service is offered.

One paragraph, one saved rejection cycle.

---

## Phase 5 — Listing assets and positioning

- [ ] **Reserve the name** in [App Store Connect](https://appstoreconnect.apple.com/)
      early. First-come, and you're currently clear.
- [ ] **Screenshots** per device class. If you set `supportsTablet: false`, you
      only need iPhone sizes.
      [Play listing assets](https://support.google.com/googleplay/android-developer/answer/9866151)
- [ ] **Category: Health & Fitness, or Education.** **Avoid "Medical"** — it
      invites the strictest review for no benefit.
- [ ] Description, keywords, subtitle. Your README is a good source: lead on
      *ranges not deadlines*, *levels not ticks*, and *something to do at every
      milestone*.
- [ ] Consider a short preview video. Optional, but it converts.

### One content decision to make first

The app's copy is **British** — "nappy", "health visitor", "GP", screening at 9,
18 and 30 months — while the milestone data is sourced from the **US CDC**. That
is coherent for a UK launch, a little odd for a US one, and actively wrong-sounding
if you list US-first without changing the vocabulary.

Pick your primary market before writing the listing, because it drives your
keywords too. If you want both, the vocabulary needs localising, not just the
store text.

---

## Phase 6 — Build and submit

```bash
npx eas build:configure
```

```bash
npx eas build --platform all --profile production
```

```bash
npx eas submit --platform all
```

Then distribute to testers: **TestFlight** on Apple, **Internal** then **Closed**
testing on Play — the closed track doubles as your 12-tester run from Phase 2.

Links: [EAS Build](https://docs.expo.dev/build/introduction/)
· [EAS Submit](https://docs.expo.dev/submit/introduction/)
· [Expo's submission guide](https://docs.expo.dev/deploy/submit-to-app-stores/)
· [TestFlight](https://developer.apple.com/testflight/)

**Export compliance:** the app uses only standard HTTPS, so it qualifies for the
usual exemption — but you still have to answer the question during submission.

---

## Suggested order

| When | What |
|---|---|
| Day 1 | Open both developer accounts. Start OAuth verification. Start recruiting testers. |
| Week 1 | Icon and splash. `supportsTablet` decision. `eas.json`. Privacy policy hosted. |
| Week 1–2 | First EAS builds. TestFlight and Play internal testing. Reserve the name. |
| Week 2–4 | The 14-day closed test runs. Write listings and take screenshots meanwhile. |
| Week 4+ | Submit to both stores. Apple review is typically 24–48h; Play can be longer for a first app. |

The two Google items gate everything, so they go first even though they feel like
paperwork.

---

## If you only do five things

1. Make an app icon — nothing ships without it.
2. Set `supportsTablet: false`.
3. Start the Google Play 12-tester clock.
4. Start Google OAuth verification, and be willing to ship v1 without Drive
   backup if it drags.
5. Declare your audience as adults, and put the Guideline 4.8 note in your review
   submission.
