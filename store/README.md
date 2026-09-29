# Store listing assets

Generated from the live app (sample data) and the app icon. Regenerate any time
the UI changes — these are captures, so they go stale.

## What goes where

### Apple App Store Connect

| File | Size | Notes |
|---|---|---|
| `ios/01–05-*.png` | 1320 × 2868 | The 6.9" iPhone display size. Up to 10 allowed |

Because `ios.supportsTablet` is `false`, **no iPad screenshots are required**.

### Google Play Console

| File | Size | Notes |
|---|---|---|
| `android/01–05-*.png` | 1080 × 1920 | Phone screenshots. Minimum 2, maximum 8 |
| `feature-graphic.png` | 1024 × 500 | **Mandatory.** Play will not publish without it |
| `play-icon-512.png` | 512 × 512 | The listing icon, uploaded separately from the in-app icon |

Play caps screenshots at a **2:1 aspect ratio**, which is why the Android set is
1080 × 1920 (1.78:1) rather than reusing Apple's 1320 × 2868 (2.17:1) — that
would be rejected.

Every file here is a 24-bit PNG with **no alpha channel**, which both stores
require.

## The five frames

| # | Screen | Caption |
|---|---|---|
| 01 | Thread timeline, at 11–12 months | A map, not a schedule |
| 02 | "Walks unaided" milestone sheet | Levels, not ticks |
| 03 | Play tab | An idea for every milestone |
| 04 | Experiments tab | Run a little experiment |
| 05 | Progress tab | See how far you have come |

Frame 02 is the strongest and should go **first or second** in both listings: it
shows four levels with two filled, a real note, and the WHO range of 8.2–17.6
months for walking — which makes the app's whole argument in one image.

## Regenerating

The scripts live in this session's scratchpad rather than the repo, since they
pull in Puppeteer and a headless Chrome (~200 MB) that the app itself does not
need. The method, if you want to rebuild them:

1. Run the app on web: `npx expo start --web`
2. Drive it with Puppeteer at a 440 × 956 viewport, `deviceScaleFactor: 3`,
   which lands exactly on Apple's 1320 × 2868
3. Load the sample data, jump the thread to `11–12m`, open "Walks unaided"
4. Reset the scroll between tab captures — the app shares one scroll position
   across all four tabs, so switching tabs otherwise lands you mid-list
5. Compose the captures into captioned frames in HTML, then screenshot those at
   each store's size

## Caveat worth knowing

These are captured from the **web build**, not a native device. It is the same
React Native component tree, so the layout is representative, and neither store
requires device-origin captures. But before final submission it is worth
building for a real device and confirming nothing shifts — particularly the safe
area insets at the top and bottom, which are zero on web and non-zero on a
notched phone.
