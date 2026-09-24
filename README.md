# Thread

**A map of your child's first three years — and something to do at every point on it.**

Thread tracks the milestones that matter, from the second trimester to age three,
and pairs every single one with play ideas and small experiments that help you
support it. Not a checklist that makes you anxious. A thread you follow together.

---

## Why this exists

Most milestone trackers do one of two things. They hand you a checklist with
hard ages attached — which turns a wide, normal range into a deadline you feel
you're failing — or they tell you what's coming and leave you there, with no
answer to the only question that actually matters:

> Okay. So what do I *do* about it?

Thread answers that question on every card.

Two design decisions follow from it:

**Ranges, not deadlines.** Every age here is a window, not a due date. The CDC
milestones Thread uses describe what about *75% of children* do by a given age —
they were never meant to be a pass mark. Thread says so on the card, shows the
range, and names its source. Children arrive at these things in their own order.
The thread is a map, not a schedule.

**Levels, not ticks.** A milestone isn't binary. "Rolls back to tummy" goes
*first time → with help → on their own*. "Walks unaided" goes *cruising → first
steps → across a room → confident on uneven ground*. You can step back down as easily as
up. What you get is a picture of movement over months, rather than a box that was
either ticked or accusingly empty.

And the part that turns tracking into something worth doing: **every milestone
comes with things to try.** Not filler. A specific, five-minute, do-it-tonight
suggestion that supports the exact skill you were just reading about — and that
mostly amounts to paying close attention to your child, which is the thing that
builds the bond as much as it builds the skill.

---

## What's in it

| What | How much |
|---|---|
| **Stages** | 20, second trimester through to 36 months |
| **Milestones** | 60, across 5 developmental areas |
| **Levels** | 165 — because "rolls back to tummy" isn't yes or no |
| **Play ideas** | 107, each tied to the milestone it supports |
| **Experiments** | 20 small, genuinely interesting things to try |

Five areas, tracked separately so one strong area doesn't hide a quiet one:
gross motor, fine motor, speech & language, social & emotional, and cognitive
& play.

### Track

The **Thread** is a timeline. Milestones run down one side, things to do down the
other, grouped by stage from the second trimester onward. Tap any milestone to
set where your child is, read why it matters, see the real age range and where it
comes from, attach a photo from the day, and write a line you'll want back in ten
years.

Finish a milestone and the app stops to mark it. That moment is the point.

### Play

**107 play ideas**, each one attached to the milestone it supports and tagged
with the area it develops. Filter by age, or browse the lot. Every card says what
it helps with and how long it takes — most are five to fifteen minutes, and most
need nothing you don't already own.

Chest-to-chest tummy time. Answer every sound. Narrate the nappy change. The
floor mirror. Coo, then wait five seconds. Two real choices, all day.

These are bonding activities that happen to be developmental, which is the honest
way round: the reason "serve and return" works is that it's just paying close
attention to your child and answering them.

### Experiment

**20 small experiments** — the most fun part of the app. Which sound gets a kick?
Your face, or a pattern? The still face, briefly. Half-hidden, fully hidden.
Switch the sorting rule.

Each one is a real developmental paradigm, named and sourced, shrunk to something
you can do on a rug in five minutes. Log what happened. There is no failing here —
"not yet" is data too, and trying the same thing a month later is how you actually
see your child change.

### Progress

Completion ring, a bar per developmental area, your recent wins, and a grid of the
photos you've attached. It'll tell you which area has the most still open, and
point you at the play ideas for it.

---

## Where the content comes from

This is the part most apps are vague about, so Thread is specific — in the app
itself, on the cards, not just here.

- **Milestone ages** follow the CDC's *Learn the Signs. Act Early.* checklists as
  revised with the AAP in 2022. Each listed age is what about 75% of children do
  by then.
- **Gross-motor ranges** use the WHO Motor Development Study windows of
  achievement (2006).
- **Experiments** name the research paradigm they come from.
- **Play ideas** draw on Montessori, Pikler and treasure-basket practice, and on
  serve-and-return work from the Harvard Center on the Developing Child.
- Where something is long-established practice rather than tested evidence,
  **the card says so.** 59 of the 127 activities carry an explicit source line;
  the rest are presented as practice, not findings.

> **Not medical advice.** If something worries you, speak to your health visitor
> or GP — and expect development screening at around 9, 18 and 30 months.

---

## Your data stays yours

There is **no account and no sign-up.** The app opens, you name your child, and
you're in. Everything lives on your phone: the thread in local storage, photos as
files in the app's own directory. Nothing is transmitted anywhere. There's no
analytics, no server, and no third party in the middle.

**Google Drive backup is optional and off by default.** Turn it on and Thread
writes to `appDataFolder` — a private per-app folder in *your* Drive that no other
app can read and that Thread can't use to see the rest of your files. It asks for
exactly one scope, `drive.appdata`, and nothing else. Set it up in
[DRIVE_SETUP.md](DRIVE_SETUP.md).

Without it the app is fully functional — a lost phone loses the thread, which the
opening screen tells you plainly rather than burying.

---

## Running it

```bash
npm install
```

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

`npx expo start --web` runs the whole thing in a browser for quick testing — the
date field falls back to the browser's native date input. The photo picker is the
one feature that needs a real device.

There's a **"Have a look around with sample data"** link on the opening screen
that loads a lived-in thread for a 14-month-old, if you want to see the app full
before committing to it.

---

## Built with

Expo (SDK 57) and React Native, targeting iOS and Android. No backend, because
there's nothing to put on one.

```
App.js                     root: fonts, provider, which screen is showing
src/
  store.js                 state + persistence, exposed as useThread()
  theme.js                 palette, radii and gradients
  data/content.js          milestones, play ideas, experiments
  lib/
    storage.js             local storage + on-device photo files
    drive.js               Drive appDataFolder REST calls
    useDrive.js            OAuth + backup/restore, as a hook
    format.js              dates, ages, current stage
  components/              icons, primitives, cards, sheets, celebration
  screens/
    Onboarding.js          first run
    ChildForm.js           name, born/expecting, date
    Main.js                header, stage scrubber, tabs, sheets
    Settings.js            profile, Drive backup, celebrations, reset
    tabs/                  Timeline, Play, Experiments, Progress
design-src/                the original design canvas, kept for reference
```

The interface is a port of a Claude Design canvas; the milestone and activity
content is carried across verbatim in `src/data/content.js`, which is the single
file to edit if you want to change what the app teaches.
