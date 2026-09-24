
const L2 = ['Noticed once', 'Happens often'];
const L3 = ['First time', 'With help', 'On their own'];
const L3D = ['First time', 'Some days', 'Every day'];

const STAGES = [
  { id: 'p2', label: 'Second trimester', short: 'T2', sub: '14–27 weeks', ms: [
      { id: 'p2a', d: 'Talk', t: 'Turns toward your voice', lv: L2, why: 'Hearing is working from around 18 weeks — your voice is the sound they already know at birth.', tips: ['Read the same short book aloud each evening; the rhythm is what carries.', 'Talk through ordinary things — the commentary habit starts now, not at birth.'], range: 'Fetal hearing works from around 18 weeks; clear responses to sound are usually reported from about 24 weeks. Feeling a specific response yourself is common but not universal.', src: 'General obstetric guidance — the least firmly evidenced part of this app' },
      { id: 'p2b', d: 'Motor', t: 'Movement you can feel', lv: ['First flutter', 'Daily movement', 'A pattern you know'], why: 'Kicks become a rhythm you learn — most people can name their baby\u2019s busy hours by the third trimester.', tips: ['Note the busiest hour of the day for a week and see if it holds.', 'Lie on your side after a cold drink if you want a livelier stretch.'], range: 'First movements are commonly felt between 16 and 24 weeks, later in a first pregnancy.', src: 'NHS pregnancy guidance' } ],
    acts: [
      { id: 'p2x', k: 'exp', t: 'Which sound gets a kick?', src: 'Fetal sound-response research works at group level; a test at home is a ritual, not a measurement.', dur: '10 min', body: 'A gentle test of what your baby already responds to, and a nice way to start the reading habit early.', steps: ['Lie down somewhere quiet and settled for five minutes first.', 'Try three sounds in turn: your voice, a partner\u2019s voice, a song.', 'Note which one brought movement. Repeat next week and see if it holds.'], link: 'p2a' },
      { id: 'p2p1', k: 'play', t: 'One book, every night', dur: '5 min · daily', body: 'Choosing one book now and reading it aloud through pregnancy gives a newborn something familiar to settle to.', steps: ['Pick a short rhyming book you can stand hearing a hundred times.', 'Read it at roughly the same time each evening.', 'Keep it out for the first weeks after birth and use it at wind-down.'], src: 'Prenatal familiarity research (DeCasper & Spence)' },
      { id: 'p2p2', k: 'play', t: 'Prepare a yes space', dur: 'An afternoon', body: 'Montessori and Pikler both start from the same idea: one small area where nothing needs to be forbidden. Build it before the baby arrives and you will use it for two years.', steps: ['Choose a corner with a firm floor mat, not a cot or a bouncer.', 'Keep it low: a mirror at floor level, a shelf they will eventually reach.', 'Leave it almost empty. The point is space to move, not things to look at.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] },

  { id: 'p3', label: 'Third trimester', short: 'T3', sub: '28–40 weeks', ms: [
      { id: 'p3a', d: 'Social', t: 'Startles at a loud sound', lv: L2, why: 'A whole-body startle to a door slam shows the hearing and reflex systems are wired together.', tips: ['No need to seek loud noises — just notice when one happens.'], range: 'Startle responses to loud sound are commonly reported from about 28 weeks.', src: 'General obstetric guidance' },
      { id: 'p3b', d: 'Social', t: 'Settles to a familiar song', lv: L2, why: 'Repetition is already doing something: babies show preference at birth for music heard in the last trimester.', tips: ['Pick two songs for the wind-down and keep them for after birth.'], range: 'Newborns show a preference for music and speech heard in the third trimester — a real but modest effect.', src: 'Prenatal learning research (DeCasper & Spence and successors)' } ],
    acts: [
      { id: 'p3x', k: 'exp', t: 'Torchlight tracking', src: 'Fetal responses to light are reported but weakly evidenced — treat this as play, not science.', dur: '5 min', body: 'From around 30 weeks light passes through, and many babies move toward or away from a bright spot.', steps: ['In a dim room, shine a phone torch slowly across your bump.', 'Wait — responses lag by several seconds.', 'Note whether movement follows the light or retreats from it.'] },
      { id: 'p3p1', k: 'play', t: 'Build the two-song wind-down', dur: '10 min · nightly', body: 'The routine you set now is the one you can lean on at 3am in six weeks\u2019 time.', steps: ['Choose two songs, same order every night.', 'Dim lights as they play.', 'Use the identical sequence in the first weeks after birth.'], link: 'p3b' },
      { id: 'p3p2', k: 'play', t: 'Make the first mobile', dur: '1 hour', body: 'The Montessori Munari mobile is black and white, geometric and deliberately dull to adults — which is exactly why a newborn will stare at it.', steps: ['Cut simple black-and-white shapes from card; hang one glass bead if you have one.', 'Balance them on light dowels so the whole thing turns in a draught.', 'Hang it 30cm above where the baby will lie, and nowhere near the cot.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] },

  { id: 'm0', label: 'First month', short: '0–1m', sub: 'Birth to 4 weeks', ms: [
      { id: 'm0a', d: 'Social', t: 'Calms when held or spoken to', lv: L2, why: 'Being soothed by you rather than by feeding alone is the first evidence of a relationship doing work.', tips: ['Skin to skin, low voice, slow movement. In that order.', 'You cannot spoil a newborn by responding. Responsiveness is the intervention.'], range: 'CDC lists calming when spoken to or picked up at 2 months; it often shows in the first weeks.', src: 'CDC Learn the Signs, 2022 revision — 2 months' },
      { id: 'm0b', d: 'Think', t: 'Looks at your face', lv: L3, why: 'Newborn focus sits at roughly 20–30cm — about the distance to your face while feeding. That is not a coincidence.', tips: ['Hold still and let them find you rather than moving to catch their gaze.', 'Bright daylight makes newborns squint and look away; try a shaded room.'], range: 'CDC lists looking at your face at 2 months. Brief fixation is usual within days.', src: 'CDC Learn the Signs, 2022 revision — 2 months' },
      { id: 'm0c', d: 'Motor', t: 'Turns head on your chest', lv: L2, why: 'Every head turn is neck work, and neck work is the base of everything that follows.', tips: ['Reclined chest-to-chest counts as tummy time and is far less protested.'], range: 'Present from birth as a reflex; deliberate lifting comes over the following weeks.', src: 'CDC Learn the Signs, 2022 revision — 2 months' } ],
    acts: [
      { id: 'm0x', k: 'exp', t: 'Your face, or a pattern?', src: 'Newborn face preference: Fantz 1961; Johnson & Morton 1991.', dur: '6 min', body: 'Newborns are drawn to face-like arrangements over almost anything else. See how strong it is in your house.', steps: ['Offer a high-contrast card on one side, your still face on the other.', 'Hold both at the same distance for 20 seconds.', 'Note which held the gaze. Swap sides and repeat to rule out a side preference.'], link: 'm0b' },
      { id: 'm0p1', k: 'play', t: 'Chest-to-chest tummy time', dur: '3 min · a few times a day', body: 'The version newborns tolerate: they get the head-lifting work, you get the face.', steps: ['Recline at about 45 degrees, baby chest-down on you.', 'Talk so they lift to find your face.', 'Stop before the protest, not after.'], link: 'm0c' },
      { id: 'm0p2', k: 'play', t: 'Hang the Munari mobile', dur: '5 min · daily', body: 'Lie them under a slowly turning black-and-white mobile and do nothing. Uninterrupted looking is the activity.', steps: ['Hang it about 30cm above their chest, slightly toward their feet.', 'Ten minutes maximum, while they are calm and alert.', 'Resist narrating. This one is for concentration, not conversation.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm0p3', k: 'play', t: 'Answer every sound', dur: 'All day · free', body: 'Serve and return: they make a noise, you answer it. Done thousands of times, this is the best-evidenced thing you can do for a developing brain.', steps: ['Treat any sound — a grunt, a squeak — as a turn in a conversation.', 'Answer with your face and voice, then wait.', 'The waiting is the part everyone skips.'], src: 'Serve-and-return, Harvard Center on the Developing Child' } ] },

  { id: 'm1', label: 'One to two months', short: '1–2m', sub: '4–8 weeks', ms: [
      { id: 'm1a', d: 'Social', t: 'Smiles at you', lv: L3D, why: 'The social smile is aimed at you, not wind — the first clear two-way exchange.', tips: ['Smile, then wait. The pause gives them room to answer.'], range: 'CDC lists smiling when you talk or smile at them at 2 months. Typically 6–8 weeks, sometimes as late as 12.', src: 'CDC Learn the Signs, 2022 revision — 2 months' },
      { id: 'm1b', d: 'Talk', t: 'Coos', lv: L3D, why: 'Open vowel sounds made for their own sake are the raw material of speech.', tips: ['Copy the sound back exactly, then add one of your own.', 'Leave a five-second gap. It feels far too long. It is not.'], range: 'CDC lists cooing sounds at 2 months.', src: 'CDC Learn the Signs, 2022 revision — 2 months' },
      { id: 'm1c', d: 'Motor', t: 'Holds head up in tummy time', lv: L3, why: 'Head control on the floor, not on you, is a real strength marker.', tips: ['Little and often: three one-minute goes beats one long battle.'], range: 'CDC lists holding the head up when on the tummy at 2 months.', src: 'CDC Learn the Signs, 2022 revision — 2 months' } ],
    acts: [
      { id: 'm1x', k: 'exp', t: 'Will they copy your mouth?', src: 'Neonatal imitation: Meltzoff & Moore 1977 — a famous finding that later replications have disputed. Enjoy it either way.', dur: '4 min', body: 'Stick your tongue out slowly and see what comes back. Some babies mirror it; many do not.', steps: ['Get close, about 25cm, when they are calm and alert.', 'Open your mouth wide, hold, then relax. Repeat slowly four times.', 'Wait a good ten seconds between tries — any answer will be slow.'] },
      { id: 'm1p1', k: 'play', t: 'Octahedron mobile', dur: '10 min', body: 'The second Montessori mobile: three shiny paper solids in primary colours. Colour vision is arriving and this is built for exactly that.', steps: ['Fold three octahedra from red, blue and yellow foil paper.', 'Hang at chest height above the mat, one slightly higher than the others.', 'Swap out the black-and-white mobile rather than adding to it.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm1p2', k: 'play', t: 'The floor mirror', dur: '10 min', body: 'A safety mirror on the wall at floor level gives a baby in tummy time a reason to lift their head — and their first long look at a face doing what they do.', steps: ['Fix an acrylic mirror flat against the wall at floor level.', 'Lay them on their tummy facing it, close.', 'Say nothing. Let them work.'], link: 'm1c', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm1p3', k: 'play', t: 'Sing the same five songs', dur: '5 min · daily', body: 'A tiny fixed repertoire beats variety at this age: they learn the shape of each one and start to anticipate.', steps: ['Choose five songs with actions and stick to them for a month.', 'Sing the same one in the same situation — nappy change, car, bath.', 'Watch for stilling or brightening when a familiar one starts.'] } ] },

  { id: 'm2', label: 'Two to three months', short: '2–3m', sub: '8–13 weeks', ms: [
      { id: 'm2a', d: 'Think', t: 'Follows a moving thing past the middle', lv: L3, why: 'Following something all the way across means both eyes and both sides of the brain are coordinating.', tips: ['Move slowly and pause when they lose you.'], range: 'CDC lists watching you as you move and looking at a toy for several seconds at 2 months.', src: 'CDC Learn the Signs, 2022 revision — 2 months' },
      { id: 'm2b', d: 'Fine', t: 'Hands open and come to mouth', lv: L2, why: 'Hands unclenching is what makes grasping possible; hand-to-mouth is early self-soothing.', tips: ['Let them, even mid-feed — it is practice, not a bad habit.'], range: 'CDC lists bringing hands to mouth at 4 months.', src: 'CDC Learn the Signs, 2022 revision — 4 months' } ],
    acts: [
      { id: 'm2x', k: 'exp', t: 'The still face, briefly', src: 'Still-face paradigm, Tronick 1978. Keep it to fifteen seconds and repair warmly afterwards — the point is to see how much they expect from you, not to distress them.', dur: '3 min', body: 'Play warmly, then go blank-faced for fifteen seconds. Most babies work visibly hard to get you back. It is a startling demonstration of how much they already expect.', steps: ['Play face to face for a minute until they are engaged.', 'Go still and expressionless for fifteen seconds — no longer.', 'Return, smile, and repair straight away. Note what they did to call you back.'] },
      { id: 'm2p1', k: 'play', t: 'Gobbi mobile', dur: '10 min', body: 'Five balls in one colour, shaded light to dark. It trains the eye on shades rather than sharp contrast — the third mobile in the Montessori sequence.', steps: ['Hang it low, over the chest, well within focus.', 'Ten quiet minutes at a time.', 'Retire it when batting starts and swap to something they can reach.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm2p2', k: 'play', t: 'Batting distance', dur: '8 min', body: 'Hang one light object at exactly arm\u2019s length. The first accidental hit is the beginning of aiming.', steps: ['A ribbon with a bell or a light wooden ring, just touching their fist when the arm extends.', 'Let the accidents happen — do not put it in the hand.', 'Raise it slightly each week as reach improves.'], link: 'm2b', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm2p3', k: 'play', t: 'Narrate the nappy change', dur: '2 min · every change', body: 'Pikler\u2019s idea: care moments are the lesson, not the interruption. Tell them what you are about to do and pause for a response.', steps: ['Say what comes next before you do it: "I am going to lift your legs".', 'Pause for a beat as though waiting for permission.', 'Keep the same words each time so the sequence becomes predictable.'], src: 'Emmi Pikler / RIE respectful-care practice' } ] },

  { id: 'm3', label: 'Three to four months', short: '3–4m', sub: '3–4 months', ms: [
      { id: 'm3a', d: 'Social', t: 'Laughs out loud', lv: L2, why: 'A proper belly laugh means they can anticipate — they know what is coming next.', tips: ['Build suspense before the tickle. The pause is the joke.'], range: 'CDC lists laughing at 4 months.', src: 'CDC Learn the Signs, 2022 revision — 4 months' },
      { id: 'm3b', d: 'Talk', t: 'Long vowel sounds, back and forth', lv: L3D, why: 'Squeals and drawn-out "aaah" taking turns with you: conversation before the consonants arrive.', tips: ['Copy their sound back, then add one of your own.', 'Name what they are looking at, every time.'], range: 'CDC lists making sounds like "oooo" and "aahh" at 4 months.', src: 'CDC Learn the Signs, 2022 revision — 4 months' },
      { id: 'm3c', d: 'Motor', t: 'Pushes up on elbows in tummy time', lv: L3, why: 'Weight through the forearms opens the chest and frees the head — rolling comes from here.', tips: ['A rolled towel under the chest helps at first, then take it away.'], range: 'CDC lists pushing up onto elbows in tummy time at 4 months.', src: 'CDC Learn the Signs, 2022 revision — 4 months' } ],
    acts: [
      { id: 'm3x', k: 'exp', t: 'Which texture wins?', src: 'Early tactile preference — an observation exercise rather than a formal test.', dur: '6 min', body: 'Offer three very different surfaces and watch which one the hand stays on.', steps: ['Choose three safe textures: silk, wood, knitted wool.', 'Brush each lightly across the open palm for ten seconds.', 'Note which brought grasping rather than withdrawal. Repeat in a month.'] },
      { id: 'm3p1', k: 'play', t: 'Grasping ring on a ribbon', dur: '8 min', body: 'The fourth Montessori mobile is one they may actually hit and hold. A wooden ring on elastic rewards a swipe with movement and sound.', steps: ['Hang a light wooden ring on elastic just above the open hand.', 'Let the first contacts be accidental.', 'Once they grab reliably, hand it over as a held toy instead.'], link: 'm3c', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm3p2', k: 'play', t: 'One object at a time', dur: '10 min', body: 'The single most Montessori thing in this app: offer one carefully chosen object rather than a pile. Concentration is a skill and clutter prevents it.', steps: ['Choose one object with real weight and texture — a wooden egg, a metal spoon.', 'Place it within reach and step back.', 'Do not swap it the moment interest dips. The dip is where the work happens.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm3p3', k: 'play', t: 'Anticipation games', dur: '5 min', body: 'Round and round the garden, with a long pause before the tickle. You are teaching prediction, and the laugh proves it worked.', steps: ['Use the same rhyme with the same ending every time.', 'Stretch the pause before the ending a little longer each round.', 'Stop while they still want more.'], link: 'm3a' } ] },

  { id: 'm4', label: 'Four to five months', short: '4–5m', sub: '4–5 months', ms: [
      { id: 'm4a', d: 'Fine', t: 'Reaches for a toy', lv: L3, why: 'Deliberate reaching means they can see a thing, want it, and send a hand there.', tips: ['Hold toys just within reach, not in the hand.', 'Thin handles are easier to catch than fat ones.'], range: 'CDC lists reaching for a toy they want at 6 months.', src: 'CDC Learn the Signs, 2022 revision — 6 months' },
      { id: 'm4b', d: 'Motor', t: 'Rolls tummy to back', lv: ['First time', 'Both directions', 'Consistently'], why: 'The first way they move themselves somewhere — and the moment the changing table stops being safe.', tips: ['Lay them on their side with a toy just out of reach to invite the turn.', 'Floor time on a firm surface does more than any equipment.'], range: 'CDC lists rolling from tummy to back at 6 months. Back-to-front usually follows later.', src: 'CDC Learn the Signs, 2022 revision — 6 months' } ],
    acts: [
      { id: 'm4x', k: 'exp', t: 'Reach in dim light', src: 'Early on they reach by sight; later they reach by feel. This shows which one is leading.', dur: '5 min', body: 'A sounding toy in a dimmed room: can they still find it without seeing their own hand?', steps: ['Dim the room so the hand is barely visible.', 'Shake a bell just within reach and hold it still.', 'Note whether the hand goes straight there or hunts. Repeat monthly.'], link: 'm4a' },
      { id: 'm4p1', k: 'play', t: 'Free movement, no props', dur: '20 min · daily', body: 'Pikler\u2019s central claim: babies left on a firm floor with nothing strapping them in learn to move sooner and more safely than babies placed in seats and walkers.', steps: ['Firm mat, light clothes, bare feet, no bouncer or nest.', 'Put two objects at the edge of reach and leave them to it.', 'Intervene only for real distress, not for effort.'], link: 'm4b', src: 'Emmi Pikler; Institute for Motor Development research' },
      { id: 'm4p2', k: 'play', t: 'Interlocking discs and rattles', dur: '10 min', body: 'Montessori\u2019s first hand-held materials: light, wooden, awkwardly shaped so that two hands are needed.', steps: ['Offer one at a time, presented into the open hand.', 'Let them mouth it — that is how it gets examined.', 'Rotate three objects across the week rather than offering all three.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm4p3', k: 'play', t: 'Side-lying invitation', dur: '5 min', body: 'Roll them onto their side and put something interesting just beyond the shoulder. Most first rolls happen from here, not from flat.', steps: ['Lay them on one side, hips stacked.', 'Place a wanted object a hand\u2019s width beyond the top shoulder.', 'Swap sides so both directions get practice.'], link: 'm4b' } ] },

  { id: 'm5', label: 'Five to six months', short: '5–6m', sub: '5–6 months', ms: [
      { id: 'm5a', d: 'Think', t: 'Puts things in their mouth to explore', lv: L2, why: 'The mouth is the best-mapped part of the body at this age — mouthing is examination, not habit.', tips: ['Curate what is in reach rather than fighting the mouthing.'], range: 'CDC lists putting things in the mouth to explore at 6 months.', src: 'CDC Learn the Signs, 2022 revision — 6 months' },
      { id: 'm5b', d: 'Social', t: 'Knows familiar people', lv: L2, why: 'Sorting the world into known and unknown faces is the groundwork for attachment — and for stranger wariness later.', tips: ['Let new people approach slowly and let the baby set the pace.'], range: 'CDC lists knowing familiar people at 6 months.', src: 'CDC Learn the Signs, 2022 revision — 6 months' },
      { id: 'm5c', d: 'Motor', t: 'Rolls back to tummy', lv: L3, why: 'Harder than the other direction: they have to twist their whole body.', tips: ['Encourage from the side rather than from flat on the back.'], range: 'Usually a little after tummy-to-back rolling, commonly 5–7 months.', src: 'General paediatric guidance; WHO Motor Development Study, 2006 (windows of achievement) for later motor items' } ],
    acts: [
      { id: 'm5x', k: 'exp', t: 'Where did that sound come from?', src: 'Sound localisation develops steeply across the first year — the accuracy of the turn is the thing to watch.', dur: '5 min', body: 'Test how precisely they can place a sound they cannot see.', steps: ['Sit behind them, out of sight, in a quiet room.', 'Make a soft sound to one side, at head height.', 'Note whether the head turns to the right side, and how directly. Try above and below too.'] },
      { id: 'm5p1', k: 'play', t: 'The first treasure basket', dur: '15 min', body: 'A low basket of ordinary household objects, no toys, no plastic. The variety of weight, temperature and texture is the whole curriculum.', steps: ['Fill a shallow basket with 8–10 safe real objects: wooden spoon, metal whisk, pine cone, fabric scrap, small tin.', 'Sit nearby, say nothing, and let them empty it.', 'Change a few objects each week; check every one for choking risk first.'], src: 'Elinor Goldschmied, treasure basket / heuristic play' },
      { id: 'm5p2', k: 'play', t: 'Two hands, one object', dur: '8 min', body: 'Offer things too big for one hand. Bringing both hands to the middle is the coordination step that hand-to-hand passing needs.', steps: ['Choose a light object needing two hands — a small cardboard box, a large ring.', 'Present it centrally so neither hand has the advantage.', 'Let them lose it and retrieve it repeatedly.'] },
      { id: 'm5p3', k: 'play', t: 'Sit and topple safely', dur: '10 min', body: 'Sitting practice is really falling practice. A soft floor and cushions behind means the recovery gets learned rather than feared.', steps: ['Sit them between your legs, then loosen your support gradually.', 'Move to a cushion nest with toys in a ring around them.', 'Let the topples happen. Recovering is the skill.'] } ] },

  { id: 'm6', label: 'Six to seven months', short: '6–7m', sub: '6–7 months', ms: [
      { id: 'm6a', d: 'Motor', t: 'Sits propped, then on hands', lv: ['Propped up', 'Tripod, on hands', 'Briefly hands-free'], why: 'Sitting frees both hands for the first time, which changes what play can be.', tips: ['Cushions behind, toys in a ring, and a soft floor.'], range: 'WHO windows: sitting without support between 3.8 and 9.2 months across healthy children.', src: 'WHO Motor Development Study, 2006 (windows of achievement)' },
      { id: 'm6b', d: 'Talk', t: 'Takes turns making sounds', lv: L3D, why: 'Waiting for you to finish before answering is the structure of dialogue arriving before the words do.', tips: ['Answer every sound as though it meant something. Then wait.'], range: 'CDC lists taking turns making sounds with you at 6 months.', src: 'CDC Learn the Signs, 2022 revision — 6 months' } ],
    acts: [
      { id: 'm6x', k: 'exp', t: 'Half-hidden, fully hidden', src: 'Object permanence and the search error: Piaget, and a large later literature.', dur: '6 min', body: 'Knowing that things still exist when hidden arrives in stages. Cover a toy halfway, then completely, and see where your baby is on that road.', steps: ['Let them reach for a favourite toy, then cover half of it with a cloth.', 'If they take it, cover it completely and watch.', 'Retrieving a half-hidden toy usually comes months before a fully hidden one. Repeat monthly.'] },
      { id: 'm6p1', k: 'play', t: 'Peekaboo, escalated', dur: '5 min', body: 'The oldest game there is, and a real workout for \u201cit still exists\u201d — vary it and it keeps teaching.', steps: ['Hide behind hands, then a cloth, then the door frame.', 'Vary how long you stay hidden so the reappearance stays a surprise.', 'Let them pull the cloth off you.'] },
      { id: 'm6p2', k: 'play', t: 'One container, five objects', dur: '10 min', body: 'Fill and dump. A box and a handful of chunky objects will outlast any toy you buy this year.', steps: ['Give a box and five safe, chunky objects.', 'Show one drop in, then hand over.', 'Say "in" and "out" as it happens — words land better attached to the action.'] },
      { id: 'm6p3', k: 'play', t: 'Mealtime as language time', dur: '15 min · daily', body: 'A weaning table or high chair at your level turns eating into twenty minutes of face-to-face turn-taking.', steps: ['Sit facing them, at their height, and eat something yourself.', 'Name each food as it is offered, then pause.', 'Let them touch, squash and refuse. Exploration is part of eating.'], link: 'm6b', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] },

  { id: 'm7', label: 'Seven to eight months', short: '7–8m', sub: '7–8 months', ms: [
      { id: 'm7a', d: 'Motor', t: 'Sits without support', lv: ['Tripod, on hands', 'A minute unaided', 'Sits and plays', 'Gets into sitting alone'], why: 'Hands-free sitting is the platform the next six months of fine-motor work happens on.', tips: ['Getting themselves into sitting matters more than being placed there.'], range: 'WHO windows: sitting without support 3.8–9.2 months. CDC lists it at 9 months.', src: 'WHO Motor Development Study, 2006 (windows of achievement); CDC Learn the Signs, 2022 revision — 9 months' },
      { id: 'm7b', d: 'Fine', t: 'Passes a toy hand to hand', lv: L3, why: 'Passing a toy across their body is real coordination, and it doubles what they can hold.', tips: ['Offer a second toy while the first is held and watch the shuffle.'], range: 'CDC lists moving things from one hand to the other at 9 months.', src: 'CDC Learn the Signs, 2022 revision — 9 months' } ],
    acts: [
      { id: 'm7x', k: 'exp', t: 'Two cups, one toy', src: 'A-not-B and delayed-search tasks — a standard measure of early working memory.', dur: '5 min', body: 'Watch memory and intention working together in a baby who cannot yet tell you about either.', steps: ['Hide a small toy under one of two identical cups while they watch.', 'Wait five seconds, then let them reach.', 'Increase the wait each week and note how long the memory holds.'] },
      { id: 'm7p1', k: 'play', t: 'Object permanence box', dur: '8 min', body: 'The classic Montessori material: a ball goes in a hole, disappears, and rolls out of a tray below. Cause, effect and \u201cit\u2019s still there\u201d in one loop they can run a hundred times.', steps: ['Offer the box with one ball, placed on a low tray.', 'Demonstrate once, slowly, then hand it over.', 'Say nothing while they work. Repetition is the point.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm7p2', k: 'play', t: 'A tray of noisy things', dur: '10 min', body: 'Banging two objects together is cause and effect discovered, loudly. Give it good materials.', steps: ['Offer wooden spoons, an upturned metal pan, a small drum.', 'Let them find the different sounds of each surface.', 'Accept the consequences.'] },
      { id: 'm7p3', k: 'play', t: 'Books they can wreck', dur: '5 min · daily', body: 'At this age a book is an object first and a story second. Board books they can chew build the habit that survives to two.', steps: ['Choose sturdy board books with one clear image per page.', 'Let them hold and turn, even badly.', 'Name what they point at rather than reading the text.'] } ] },

  { id: 'm8', label: 'Eight to nine months', short: '8–9m', sub: '8–9 months', ms: [
      { id: 'm8a', d: 'Motor', t: 'Gets moving somehow', lv: ['First movement', 'Across a room', 'Fast and confident'], why: 'Self-propelled travel — crawl, shuffle or commando roll — changes their whole relationship to the room.', tips: ['Put a wanted toy just out of reach and leave the gap.', 'Bum-shuffling counts. Some babies skip crawling entirely.'], range: 'WHO windows: hands-and-knees crawling 5.2–13.5 months. About 4% of healthy children never crawl on hands and knees at all.', src: 'WHO Motor Development Study, 2006 (windows of achievement)' },
      { id: 'm8b', d: 'Talk', t: 'Babbles with consonants', lv: L3D, why: '"Mamamama", "babababa" — testing what lips and tongue can do to a vowel.', tips: ['Repeat their babble back and add a syllable.', 'Leave a gap afterwards so they can take another turn.'], range: 'CDC moved consonant babbling to the 9-month checklist in the 2022 revision. Not babbling is a 9-month flag, not a 6-month one.', src: 'CDC Learn the Signs, 2022 revision — 9 months' },
      { id: 'm8c', d: 'Social', t: 'Wary of strangers', lv: L2, why: 'Not a setback — it means they have a clear sense of who their people are.', tips: ['Let new people approach slowly; hold them while they decide.'], range: 'CDC lists shyness or fear around strangers at 9 months.', src: 'CDC Learn the Signs, 2022 revision — 9 months' } ],
    acts: [
      { id: 'm8x', k: 'exp', t: 'The A-not-B error', src: 'A-not-B error, Piaget; later work by Diamond on the maturing prefrontal cortex.', dur: '6 min', body: 'Hide a toy under cloth A a few times, then switch to B in full view. Most babies at this age reach for A anyway. It is the most reliable trick in developmental psychology.', steps: ['Hide and let them find it under cloth A, three times.', 'Now hide it under cloth B while they watch closely.', 'Note where they reach. Reaching for A is exactly right for eight months — retry monthly.'] },
      { id: 'm8p1', k: 'play', t: 'Crawling obstacles', dur: '15 min', body: 'Cushions, a tunnel and a low ramp turn a flat room into something worth crossing.', steps: ['Build a short route with one thing to climb and one to go through.', 'Sit at the far end with something they want.', 'Make it slightly harder each week rather than easier.'], link: 'm8a' },
      { id: 'm8p2', k: 'play', t: 'Name and pause', dur: 'All day · free', body: 'Name the thing they are looking at — not the one you chose — and then stop talking. Following their attention is what makes vocabulary stick.', steps: ['Watch where their eyes go.', 'Name that thing, once, clearly.', 'Pause for five seconds before saying anything else.'], link: 'm8b', src: 'Serve-and-return, Harvard Center on the Developing Child' },
      { id: 'm8p3', k: 'play', t: 'Low shelf, four things', dur: 'Set-up · 20 min', body: 'Montessori shelf work: a small number of visible, complete activities at their height, chosen by them rather than handed to them.', steps: ['Put four activities on a low open shelf, spaced out, each in its own tray or basket.', 'Rotate one item a week; store the rest out of sight.', 'Let them choose. Choosing is the skill being built.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] },

  { id: 'm9', label: 'Nine to ten months', short: '9–10m', sub: '9–10 months', ms: [
      { id: 'm9a', d: 'Think', t: 'Looks for a dropped thing', lv: L2, why: 'Looking down after a drop means the object still exists to them once out of sight.', tips: ['Drop something noisy from the highchair on purpose and wait.'], range: 'CDC lists looking for objects when dropped out of sight at 9 months.', src: 'CDC Learn the Signs, 2022 revision — 9 months' },
      { id: 'm9b', d: 'Motor', t: 'Pulls up to standing', lv: ['Pulls to knees', 'Pulls to stand', 'Lowers down safely', 'Stands alone'], why: 'Standing trains balance months before the first step — and lowering back down safely is half the skill.', tips: ['Set favourite things on the sofa seat to invite the pull-up.', 'Barefoot gives better feedback than shoes.'], range: 'WHO windows: standing with assistance 4.8–11.4 months; standing alone 6.9–16.9 months.', src: 'WHO Motor Development Study, 2006 (windows of achievement)' },
      { id: 'm9c', d: 'Talk', t: 'Turns to their own name', lv: L3D, why: 'Their name is probably the first word they recognise as meaning something specific.', tips: ['Use the name at the start of sentences, not tacked on the end.'], range: 'CDC lists looking when you call their name at 9 months.', src: 'CDC Learn the Signs, 2022 revision — 9 months' } ],
    acts: [
      { id: 'm9x', k: 'exp', t: 'Does your point get followed?', src: 'Joint attention research (Tomasello, Mundy) — among the better-evidenced early predictors of language.', dur: '5 min', body: 'Shared attention — both of you deliberately looking at the same thing — underpins nearly all language learning.', steps: ['Point at something interesting across the room and say "look".', 'Note whether they follow your finger, or just look at your hand.', 'Try again in a few weeks; the shift from hand to object is the milestone.'], link: 'm9a' },
      { id: 'm9p1', k: 'play', t: 'A bar to pull up on', dur: 'Set-up · 15 min', body: 'A fixed low bar or a heavy sofa gives safe, repeatable pull-to-stand practice — and unlike a walker, they set the pace.', steps: ['Use a wall-fixed bar or a stable heavy piece of furniture at chest height.', 'Put something wanted on top of it.', 'Teach lowering by guiding one knee down. Do not lift them out.'], link: 'm9b', src: 'Emmi Pikler / Montessori movement practice' },
      { id: 'm9p2', k: 'play', t: 'Drop and retrieve', dur: '8 min', body: 'They drop it, you return it, they drop it again. Tedious for you, and precisely the experiment they need to run.', steps: ['Offer objects that make different sounds when they land.', 'Return them without comment, twenty times if needed.', 'Add a bucket to drop into once the aim improves.'], link: 'm9a' },
      { id: 'm9p3', k: 'play', t: 'Songs with actions', dur: '5 min · daily', body: 'Row your boat and pat-a-cake: gesture attached to a fixed phrase is how first words often arrive.', steps: ['Use three songs with clear hand actions.', 'Do the action for them, hand over hand, at first.', 'Pause before the action and see if they start it.'], link: 'm9c' } ] },

  { id: 'm10', label: 'Ten to eleven months', short: '10–11m', sub: '10–11 months', ms: [
      { id: 'm10a', d: 'Fine', t: 'Pincer grip', lv: L3, why: 'Thumb and forefinger together is the grip that eventually holds a pencil.', tips: ['Small soft food pieces on the tray beat any toy for practice.'], range: 'CDC lists picking things up between thumb and finger at 12 months.', src: 'CDC Learn the Signs, 2022 revision — 12 months' },
      { id: 'm10b', d: 'Social', t: 'Plays give-and-take', lv: L2, why: 'Handing something over and expecting it back is a social contract, not just a motor skill.', tips: ['Always give it back, immediately, the first hundred times.'], range: 'CDC lists playing games like pat-a-cake at 12 months.', src: 'CDC Learn the Signs, 2022 revision — 12 months' } ],
    acts: [
      { id: 'm10x', k: 'exp', t: 'Which one fits?', src: 'Early means-end reasoning and the "control of error" idea in Montessori materials.', dur: '6 min', body: 'Three objects, one container with one opening. Watch whether they test or just force.', steps: ['Offer a tin with a round hole and three objects: one fits, two do not.', 'Say nothing and do not correct.', 'Note whether they try alternatives or persist with the same one. Persistence with the wrong one is expected here.'] },
      { id: 'm10p1', k: 'play', t: 'Self-serve snack', dur: '10 min · daily', body: 'A small plate, two pieces of food and a tiny jug. Montessori practical life starts far earlier than most people expect, and thumb-and-finger practice comes free.', steps: ['Put two small pieces of food on a real, small plate at their table.', 'Offer a tiny jug with a mouthful of water in it.', 'Accept spills silently and hand them a cloth.'], link: 'm10a', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm10p2', k: 'play', t: 'Rolling a ball back', dur: '8 min', body: 'Turn-taking with an object, no words needed. It is the structural rehearsal for conversation.', steps: ['Sit facing them, legs apart, and roll a ball across.', 'Wait — do not fetch it back yourself.', 'Say "my turn, your turn" every single time.'], link: 'm10b' },
      { id: 'm10p3', k: 'play', t: 'Tearing and posting paper', dur: '8 min', body: 'Tearing tissue paper is two-handed opposition work, and posting the pieces through a slot is precision. Cheap, endless, satisfying.', steps: ['Offer squares of tissue paper to tear.', 'Cut a wide slot in a box lid for posting the pieces.', 'Narrow the slot as aim improves.'], link: 'm10a' } ] },

  { id: 'm11', label: 'Eleven to twelve months', short: '11–12m', sub: '11–12 months', ms: [
      { id: 'm11a', d: 'Talk', t: 'First word with meaning', lv: ['First time', 'Uses it often', 'Uses it deliberately'], why: 'A sound used consistently for one thing counts — it does not have to be clear to a stranger.', tips: ['Respond to the attempt as though it were perfect, then model it back.'], range: 'CDC lists saying one or two words besides "mama" and "dada" at 12 months. Later first words are common and usually fine.', src: 'CDC Learn the Signs, 2022 revision — 12 months' },
      { id: 'm11b', d: 'Motor', t: 'Cruises the furniture', lv: L3, why: 'Sideways stepping while holding on is where the weight-shift for walking gets learned.', tips: ['Arrange furniture with small gaps and widen them weekly.'], range: 'Commonly 9–13 months, immediately before independent walking.', src: 'WHO Motor Development Study, 2006 (windows of achievement)' },
      { id: 'm11c', d: 'Social', t: 'Waves bye-bye', lv: L2, why: 'A gesture used socially, on cue — copying with intent.', tips: ['Wave every single time someone leaves, even the postman.'], range: 'CDC lists waving bye-bye at 12 months.', src: 'CDC Learn the Signs, 2022 revision — 12 months' } ],
    acts: [
      { id: 'm11x', k: 'exp', t: 'Do they check your face?', src: 'Social referencing, Sorce & Emde / the visual cliff studies.', dur: '5 min', body: 'Faced with something new, babies this age look at you to decide how to feel about it. Watch it happen.', steps: ['Introduce an unfamiliar but harmless object across the room.', 'Stay neutral and see whether they glance at your face before approaching.', 'Try again smiling warmly, then again looking uncertain. The difference in their approach is the finding.'] },
      { id: 'm11p1', k: 'play', t: 'Build a cruising route', dur: '10 min', body: 'A furniture circuit at hand height gives hours of balance practice without you holding anything.', steps: ['Arrange sofa, boxes and a low table with small gaps between.', 'Place a toy at each stop.', 'Widen the gaps by a few centimetres each week.'], link: 'm11b' },
      { id: 'm11p2', k: 'play', t: 'The naming pause', dur: 'All day', body: 'Ask, then wait. The silence is where the language gets built.', steps: ['Hold up two things and ask which they want.', 'Wait a full five seconds.', 'Accept any sound or gesture as the answer and name it aloud.'], link: 'm11a', src: 'Serve-and-return, Harvard Center on the Developing Child' },
      { id: 'm11p3', k: 'play', t: 'Real jobs, badly done', dur: '10 min · daily', body: 'Wiping a table, carrying a cloth to the basket, putting a spoon in a drawer. Montessori calls it practical life; children treat it as the best game in the house.', steps: ['Give one real task with a real, child-sized tool.', 'Demonstrate in slow motion, once, without talking over it.', 'Let the result be poor and do not redo it in front of them.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] },

  { id: 'm12', label: 'Twelve to fifteen months', short: '12–15m', sub: '12–15 months', ms: [
      { id: 'm12a', d: 'Motor', t: 'Walks unaided', lv: ['Cruising', 'First steps', 'Across a room', 'Confident on uneven ground'], why: 'The headline one — and the range is enormous, which almost no app tells you plainly.', tips: ['Weighted push toys beat baby walkers by a distance.', 'Let them walk on grass and gravel once steady; uneven ground trains balance.'], range: 'WHO windows: walking alone between 8.2 and 17.6 months, median about 12. CDC lists walking without holding on at 18 months.', src: 'WHO Motor Development Study, 2006 (windows of achievement); CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm12b', d: 'Fine', t: 'Stacks two blocks', lv: L3, why: 'Stacking needs a controlled release — harder than the grab.', tips: ['Big light blocks first; heavy ones topple and discourage.'], range: 'CDC lists stacking at least two small objects at 15 months.', src: 'CDC Learn the Signs, 2022 revision — 15 months' },
      { id: 'm12c', d: 'Talk', t: 'Three or more words', lv: ['One word', 'Three words', 'Five or more'], why: 'Words come slowly and then all at once. Understanding runs far ahead of speaking, and both count.', tips: ['Count only words used spontaneously, not repeats.'], range: 'CDC lists three or more words besides "mama"/"dada" at 15 months.', src: 'CDC Learn the Signs, 2022 revision — 15 months' },
      { id: 'm12d', d: 'Social', t: 'Brings things to show you', lv: L2, why: 'Sharing an interest with no other purpose is a genuinely social act.', tips: ['React with real interest — this is the reward loop for communication.'], range: 'CDC lists pointing out something interesting to you at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' } ],
    acts: [
      { id: 'm12x', k: 'exp', t: 'Will they bring the named thing?', src: 'Receptive vocabulary far exceeds spoken vocabulary at this age — this is a rough home probe of it.', dur: '5 min', body: 'Tests instruction-following and the wish to cooperate at the same time.', steps: ['Put three known objects across the room.', 'Ask for one by name, hands still, no pointing.', 'Note which words are truly understood. Repeat with different objects weekly.'] },
      { id: 'm12p1', k: 'play', t: 'Push-toy corridor', dur: '10 min', body: 'A weighted push toy in a clear run gives independent walking practice with a built-in handrail.', steps: ['Clear a straight run of floor.', 'Use a push toy heavy enough not to shoot away.', 'Stand at the far end and let them come to you.'], link: 'm12a' },
      { id: 'm12p2', k: 'play', t: 'Posting box', dur: '8 min', body: 'A slot in a lid and a handful of coin-sized discs: precision practice they will repeat endlessly.', steps: ['Cut a slot in a box lid.', 'Offer chunky discs that fit through easily at first.', 'Narrow the slot as their aim improves.'], link: 'm12b', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm12p3', k: 'play', t: 'Follow the schema', dur: 'Observation · a week', body: 'Toddlers run repeated patterns — throwing everything, wrapping everything, filling and carrying. Spot the current one and feed it instead of fighting it.', steps: ['Watch for a week and name the pattern: trajectory, enveloping, transporting, rotation.', 'Set up a safe version — a ball drop for throwing, scarves and boxes for wrapping.', 'Expect it to run for weeks, then vanish.'], src: 'Schema theory: Piaget; Chris Athey, Extending Thought in Young Children' } ] },

  { id: 'm15', label: 'Fifteen to eighteen months', short: '15–18m', sub: '15–18 months', ms: [
      { id: 'm15a', d: 'Fine', t: 'Feeds self with a spoon', lv: ['Holds it', 'Scoops with help', 'Gets it to mouth', 'Mostly clean'], why: 'A full-body coordination task disguised as lunch.', tips: ['Thick food — yoghurt, porridge — clings to the spoon and rewards the attempt.', 'Two spoons: one for them, one for you.'], range: 'CDC lists trying to use a spoon at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm15b', d: 'Think', t: 'Follows a one-step instruction', lv: L3, why: '"Bring me your shoe" without you pointing shows they really understood the words, not just your hands.', tips: ['Try it once without pointing to see what they truly understood.'], range: 'CDC lists following a one-step direction without gestures at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm15c', d: 'Talk', t: 'Points to ask or show', lv: L3D, why: 'Pointing to share something is one of the strongest early signs of communication developing well.', tips: ['Always follow the point and name what they found.'], range: 'CDC lists pointing to show you something at 18 months; many children point well before that.', src: 'CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm15d', d: 'Social', t: 'Copies your chores', lv: L2, why: 'Imitation of real work is how most practical skills arrive, and it is a strong social signal too.', tips: ['Give them a cloth of their own and let them join in badly.'], range: 'CDC lists helping you dress and copying you doing chores at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' } ],
    acts: [
      { id: 'm15x', k: 'exp', t: 'Point, or show?', src: 'Declarative vs imperative pointing — Tomasello and colleagues.', dur: '5 min', body: 'There are two kinds of pointing: "give me that" and "look at that". The second one matters more, and appears later.', steps: ['Over a day, note each point and which kind it was.', 'For the "look at that" ones, respond with interest but do not fetch anything.', 'Count the ratio this week and again in a month.'], link: 'm15c' },
      { id: 'm15p1', k: 'play', t: 'Transferring, spoon to bowl', dur: '10 min', body: 'Two bowls, a spoon, and dried beans or oats. The purest Montessori practical-life exercise, and a wrist workout that pays off in handwriting years later.', steps: ['Set two small bowls on a tray, contents on the left.', 'Demonstrate one slow scoop, in silence, then hand the spoon over.', 'Provide a small brush for the spills so tidying is part of the work.'], link: 'm15a', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm15p2', k: 'play', t: 'A basket of real tools', dur: '10 min', body: 'A dustpan, a small jug, a cloth, a brush — all child-sized and all real. Toy versions get abandoned; working ones do not.', steps: ['Keep the basket somewhere they can reach without asking.', 'Show each tool once, slowly, with no commentary.', 'Let them choose which job to do, including none.'], link: 'm15d', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm15p3', k: 'play', t: 'Expand what they say', dur: 'All day · free', body: 'They say "dog". You say "a big dog". One word added, handed back. This is the most evidence-backed language technique there is.', steps: ['Repeat their word so they know they were understood.', 'Add exactly one word.', 'Do not ask them to say it back.'], src: 'Serve-and-return, Harvard Center on the Developing Child' } ] },

  { id: 'm18', label: 'Eighteen to twenty-one months', short: '18–21m', sub: '18–21 months', ms: [
      { id: 'm18a', d: 'Fine', t: 'Scribbles with purpose', lv: L3, why: 'Deliberate marks, not accidental ones — the start of the long road to writing.', tips: ['Chunky crayons and paper taped down so it does not slide.'], range: 'CDC lists scribbling at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm18b', d: 'Think', t: 'Pretends — feeds a doll', lv: L3, why: 'Pretend play means one thing can stand for another. It is a big jump in their thinking.', tips: ['Model it once, then hand over and let them lead.'], range: 'CDC lists pretending to feed a doll at 18 months.', src: 'CDC Learn the Signs, 2022 revision — 18 months' },
      { id: 'm18c', d: 'Motor', t: 'Climbs on and off things', lv: L2, why: 'Climbing is the age-appropriate way to train balance and judgement — including learning where the limit is.', tips: ['Give them something safe to climb or they will use the bookcase.'], range: 'CDC lists climbing on and off a sofa or chair without help at 24 months.', src: 'CDC Learn the Signs, 2022 revision — 24 months' } ],
    acts: [
      { id: 'm18x', k: 'exp', t: 'The mirror mark test', src: 'Mirror self-recognition, Amsterdam 1972. Most children pass between 18 and 24 months.', dur: '5 min', body: 'The classic self-recognition experiment, and startling to watch land.', steps: ['Discreetly put a small sticker on their forehead.', 'Bring them to a mirror and say nothing.', 'Do they touch the mirror, or their own head? Touching their own head is self-recognition.'] },
      { id: 'm18p1', k: 'play', t: 'Water at the sink', dur: '15 min', body: 'A step, a bowl, a jug, a sponge. Pouring and mopping is Montessori practical life at its most absorbing, and it buys you twenty quiet minutes.', steps: ['Set a low step at a sink or use a bowl on the floor.', 'Give a small jug, a sponge and a cloth. Nothing else.', 'Let them decide when it is finished.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm18p2', k: 'play', t: 'Cushion obstacle course', dur: '15 min', body: 'Climbing, stepping down and balancing in one loop — rebuilt differently every day.', steps: ['Lay cushions, a low step and a blanket "river" in a circuit.', 'Walk it once yourself, slowly.', 'Add one harder element each time.'], link: 'm18c' },
      { id: 'm18p3', k: 'play', t: 'A small world tray', dur: '12 min', body: 'A tray with a few real-looking animals or figures and one loose material. Pretend play needs props that suggest rather than dictate.', steps: ['Offer a shallow tray with sand or dry oats and three figures.', 'Join in only if invited, and follow their storyline.', 'Keep the props few — too many stops the story.'], link: 'm18b' } ] },

  { id: 'm21', label: 'Twenty-one to twenty-four months', short: '21–24m', sub: '21–24 months', ms: [
      { id: 'm21a', d: 'Motor', t: 'Runs', lv: L3, why: 'Running needs a moment of both feet off the ground — a real balance leap from walking.', tips: ['Open space and a reason to chase is the whole method.'], range: 'CDC lists running at 24 months.', src: 'CDC Learn the Signs, 2022 revision — 24 months' },
      { id: 'm21b', d: 'Talk', t: 'Puts two words together', lv: ['First phrase', 'A few each day', 'Constantly'], why: '"More milk", "daddy gone" — grammar begins here.', tips: ['Expand what they say: they offer "more milk", you say "you want more milk".'], range: 'CDC lists saying at least two words together at 24 months.', src: 'CDC Learn the Signs, 2022 revision — 24 months' },
      { id: 'm21c', d: 'Social', t: 'Plays alongside another child', lv: L2, why: 'Playing near another child, not with them, is the normal form at this age.', tips: ['Two of the same toy prevents most of the drama.'], range: 'CDC lists playing beside other children at 24 months. Playing together properly comes nearer three.', src: 'CDC Learn the Signs, 2022 revision — 24 months' },
      { id: 'm21d', d: 'Fine', t: 'Turns pages one at a time', lv: L2, why: 'Single-page turning is fine finger control on thin paper.', tips: ['Move from board books to paper books when they are ready to be gentle.'], range: 'CDC lists turning book pages one at a time at 24 months.', src: 'CDC Learn the Signs, 2022 revision — 24 months' } ],
    acts: [
      { id: 'm21x', k: 'exp', t: 'Does naming the feeling shorten it?', src: 'Emotion labelling and affect regulation research — plausible and widely recommended, but this is a single-child home observation, not evidence.', dur: 'A fortnight', body: 'A real experiment on yourself as much as on them: does putting words to the feeling actually shorten the storm?', steps: ['For one week, name the feeling first and fix nothing: "you are furious, that is hard".', 'The next week, respond as you normally would.', 'Note rough durations. Expect noise in the data and a slow effect.'], link: 'm21c' },
      { id: 'm21p1', k: 'play', t: 'Name the feeling', dur: 'All day', body: 'Naming emotions as they happen gives a two-year-old something to use instead of a scream. It takes months. It works.', steps: ['Name what you see: "you are frustrated, that is hard".', 'Name your own feelings out loud too.', 'Do not rush to fix it before the naming.'], link: 'm21c' },
      { id: 'm21p2', k: 'play', t: 'Matching real pairs', dur: '10 min', body: 'Two of each of five real objects, muddled in a basket. Matching identical things comes before sorting by category and is far more satisfying at two.', steps: ['Use five pairs of real objects: two spoons, two corks, two pegs.', 'Muddle them and match one pair yourself, slowly.', 'Move to matching object-to-photograph once pairs are easy.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm21p3', k: 'play', t: 'The repeated line', dur: '10 min', body: 'Stop before a line they know and let them fill it in — participation instead of listening.', steps: ['Choose a book with a strong repeating phrase.', 'Pause before the phrase and look at them expectantly.', 'Let the pause run long.'], link: 'm21b' } ] },

  { id: 'm24', label: 'Two to two and a half', short: '2–2½y', sub: '24–30 months', ms: [
      { id: 'm24a', d: 'Motor', t: 'Jumps with both feet', lv: L3, why: 'Two feet leaving the ground together needs power and symmetry.', tips: ['Jump off a low step holding hands first.'], range: 'CDC lists jumping off the ground with both feet at 30 months.', src: 'CDC Learn the Signs, 2022 revision — 30 months' },
      { id: 'm24b', d: 'Talk', t: 'Around fifty words', lv: ['Twenty or so', 'Around fifty', 'Too many to count'], why: 'The vocabulary explosion. Counting stops being possible somewhere in here, which is the point.', tips: ['Stop counting once it gets hard. That is the milestone.'], range: 'CDC lists about 50 words and two-word action phrases at 30 months.', src: 'CDC Learn the Signs, 2022 revision — 30 months' },
      { id: 'm24c', d: 'Think', t: 'Sorts by colour or shape', lv: L3, why: 'Sorting means holding a rule in mind while acting on it.', tips: ['Sort real things — socks, spoons — before buying sorting toys.'], range: 'Commonly placed between 30 and 36 months. Not on the CDC checklists.', src: 'Ages & Stages Questionnaire and general paediatric guidance' },
      { id: 'm24d', d: 'Social', t: 'Says no and makes a choice', lv: L2, why: 'Refusal is a developmental achievement, however it feels at 5pm.', tips: ['Offer two acceptable options rather than an open question.'], range: 'Asserting choices runs right through the second and third year.', src: 'CDC Learn the Signs, 2022 revision — 24 months' } ],
    acts: [
      { id: 'm24x', k: 'exp', t: 'The waiting game', src: 'Delay of gratification, Mischel 1972 — the original studies used 3 to 5 year olds, so at two this is a curiosity, not a test.', dur: '5 min', body: 'A very gentle nod to the marshmallow studies — expect a two-year-old not to wait at all. That is the finding, not a failure.', steps: ['Offer one treat now, or two if they can wait while you count to twenty.', 'Sit with them and do not coach.', 'Note any strategy they invent — looking away, singing, sitting on their hands. The strategy is the skill.'] },
      { id: 'm24p1', k: 'play', t: 'Colour hunt', dur: '10 min', body: 'A rule-holding game that also drains energy, which is the ideal combination at two.', steps: ['Name a colour and hunt the house for it together.', 'Line up what you find and count it.', 'Switch colours mid-game to make it harder.'], link: 'm24c' },
      { id: 'm24p2', k: 'play', t: 'Lay the table', dur: '10 min · daily', body: 'A real sequence with a real outcome: mat, plate, cup, spoon, in that order. Montessori sequencing work that the household actually needs done.', steps: ['Draw or photograph the layout and leave it on the table as a guide.', 'Give them one place setting to do, not four.', 'Use real crockery. Breakage is part of the lesson.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm24p3', k: 'play', t: 'Playdough and tools', dur: '15 min', body: 'Rolling, pinching and cutting builds exactly the hand strength that pencil control needs — and it holds attention longer than most things at two.', steps: ['Offer dough with a blunt knife, a roller and a garlic press.', 'Make nothing in particular yourself.', 'Name what they make only after they have named it.'] } ] },

  { id: 'm30', label: 'Two and a half to three', short: '2½–3y', sub: '30–36 months', ms: [
      { id: 'm30a', d: 'Talk', t: 'Uses I, me and you', lv: L3D, why: 'Pronouns that shift meaning depending on who is talking are genuinely hard. Getting them right is a leap.', tips: ['Model rather than correct: "yes, you want it — I will get it".'], range: 'CDC lists saying words like I, me and we at 30 months.', src: 'CDC Learn the Signs, 2022 revision — 30 months' },
      { id: 'm30b', d: 'Fine', t: 'Draws a closed circle', lv: L3, why: 'A circle that meets itself is real pre-writing control.', tips: ['Draw one and ask them to copy rather than tracing.'], range: 'CDC lists drawing a circle when shown how at 36 months.', src: 'CDC Learn the Signs, 2022 revision — 36 months' },
      { id: 'm30c', d: 'Motor', t: 'Pedals a trike', lv: L3, why: 'Pedalling is alternating leg movement plus steering — two things at once.', tips: ['Start on a slight downhill so the pedals move for them once.'], range: 'Usually nearer three years. Not on the CDC checklists.', src: 'Ages & Stages Questionnaire and general paediatric guidance' },
      { id: 'm30d', d: 'Social', t: 'Plays with another child', lv: L3, why: 'Cooperative play — a shared game with roles — moves past playing side by side.', tips: ['Games with obvious turns give the structure to hang it on.'], range: 'CDC lists joining in with other children to play at 36 months.', src: 'CDC Learn the Signs, 2022 revision — 36 months' },
      { id: 'm30e', d: 'Think', t: 'Asks and answers "why"', lv: L2, why: 'Causal reasoning arrives, and does not leave.', tips: ['Turn some back: "I don\u2019t know — why do you think?"'], range: 'CDC lists asking who, what, where and why questions at 36 months.', src: 'CDC Learn the Signs, 2022 revision — 36 months' },
      { id: 'm30f', d: 'Fine', t: 'Dresses with help', lv: ['Pulls off socks', 'Arms in a sleeve', 'A whole garment', 'Dresses alone'], why: 'Dressing bundles fine motor, sequencing and patience into one daily task.', tips: ['Start with taking off, which is far easier than putting on.', 'Build in ten extra minutes and let them do it.'], range: 'CDC lists putting on some clothes without help at 36 months.', src: 'CDC Learn the Signs, 2022 revision — 36 months' } ],
    acts: [
      { id: 'm30x', k: 'exp', t: 'Switch the sorting rule', src: 'Dimensional Change Card Sort, Zelazo 2006. Most 3-year-olds stick to the old rule; switching usually arrives at 4 to 5.', dur: '8 min', body: 'Sorting by colour, then suddenly by shape. Rule-switching is one of the last executive-function skills to arrive.', steps: ['Sort a set of cards by colour together, several times.', 'Announce that now you are sorting by shape instead.', 'Sticking to the old rule is exactly what is expected at three.'], link: 'm30e' },
      { id: 'm30p1', k: 'play', t: 'A game with real turns', dur: '15 min', body: 'A simple board or card game teaches waiting, rules and losing — in that order of difficulty.', steps: ['Pick a game with under two minutes per round.', 'Say "my turn, your turn" out loud every time.', 'Let them lose sometimes and name the feeling.'], link: 'm30d' },
      { id: 'm30p2', k: 'play', t: 'Why-question walks', dur: '20 min', body: 'A walk with no destination where every question gets taken seriously.', steps: ['Follow their interest, not your route.', 'Answer simply, then ask one back.', 'Stop when they stop, not when you planned.'], link: 'm30e' },
      { id: 'm30p3', k: 'play', t: 'Dressing frames, or just buttons', dur: '10 min', body: 'Buttons, zips and buckles practised off the body are far easier than on it. Montessori built frames for this; an old cardigan on a cushion works too.', steps: ['Offer one fastening type at a time, mounted flat.', 'Demonstrate slowly with no talking over the action.', 'Move to real clothes once the flat version is easy.'], link: 'm30f', src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' },
      { id: 'm30p4', k: 'play', t: 'Cooking one real step', dur: '15 min', body: 'Spreading, peeling a banana, tearing lettuce, stirring. One genuine step in a real meal, done with a real tool.', steps: ['Choose one step they can complete alone.', 'Use a real but child-safe tool, not a toy one.', 'Serve the result to the family and say who made it.'], src: 'Montessori infant practice (Gerber/Pikler-aligned) — pedagogy with long practical use, not trial evidence' } ] }
];

const DOM_CHIP = {
  Motor: { label: 'Gross motor', bg: '#e9efe4', bc: '#c9d6c1', fg: '#4a5f44' },
  Fine: { label: 'Fine motor', bg: '#ece7f0', bc: '#d4cbdb', fg: '#584c63' },
  Talk: { label: 'Speech', bg: '#e4ecf1', bc: '#c5d5df', fg: '#3f5567' },
  Social: { label: 'Social', bg: '#f7e8e2', bc: '#e3cbc1', fg: '#754b42' },
  Think: { label: 'Cognitive', bg: '#f6eeda', bc: '#e3d5ae', fg: '#6a5a2c' },
};

const ACT_META = {
  p2x: { ds: ['Talk'], dev: 'Their hearing already works. Sounds they hear often now are the ones they\u2019ll know at birth.' },
  p2p1: { ds: ['Talk'], dev: 'Hearing the same rhythms and voice over and over is the first step towards talking.' },
  p2p2: { ds: ['Motor'], dev: 'A safe bit of floor is what lets them roll, sit and crawl in their own time.' },
  p3x: { ds: ['Think'], dev: 'Noticing something change is the start of looking on purpose instead of by accident.' },
  p3p1: { ds: ['Social'], dev: 'Doing things in the same order teaches them that they can trust what comes next.' },
  p3p2: { ds: ['Think'], dev: 'Newborns can only see strong black-and-white. Looking hard at it builds their focus.' },
  m0x: { ds: ['Think', 'Social'], dev: 'Faces are the first thing they learn to pick out. This is how they get to know you.' },
  m0p1: { ds: ['Motor'], dev: 'Neck and shoulder strength here is what rolling, sitting and crawling are built on.' },
  m0p2: { ds: ['Think'], dev: 'Long, uninterrupted looking is their first go at concentrating.' },
  m0p3: { ds: ['Talk', 'Social'], dev: 'They make a sound, you answer. This back-and-forth is the single best thing for their brain.' },
  m1x: { ds: ['Social'], dev: 'Watching your mouth and trying to copy it is their earliest way of learning from you.' },
  m1p1: { ds: ['Think'], dev: 'Colour vision is arriving. Following something that moves teaches both eyes to work together.' },
  m1p2: { ds: ['Motor', 'Think'], dev: 'Gives them a reason to lift their head, so tummy time becomes strength work they choose.' },
  m1p3: { ds: ['Talk'], dev: 'Tunes and repeats let them guess what comes next — the same skill words will need.' },
  m2x: { ds: ['Social'], dev: 'Shows how much they already expect back from you. That expectation is a big step.' },
  m2p1: { ds: ['Think'], dev: 'Shades of one colour are harder to tell apart than black and white. Good practice for their eyes.' },
  m2p2: { ds: ['Fine', 'Motor'], dev: 'Accidental swipes turn into proper reaching. That\u2019s hand-eye coordination starting.' },
  m2p3: { ds: ['Talk', 'Social'], dev: 'Talking through nappy changes gives words a job and treats them as part of it.' },
  m3x: { ds: ['Fine', 'Think'], dev: 'Touch is one of their main senses now. Comparing surfaces sharpens what their hands can tell.' },
  m3p1: { ds: ['Fine'], dev: 'When a swipe makes something move, they learn their hands can change things.' },
  m3p2: { ds: ['Think'], dev: 'Fewer things out means longer attention on each one. That\u2019s how concentration grows.' },
  m3p3: { ds: ['Social', 'Think'], dev: 'Building up to a tickle teaches them what\u2019s coming next — and gets the first proper laughs.' },
  m4x: { ds: ['Fine'], dev: 'Reaching without seeing clearly shows their hand is working from sound and memory.' },
  m4p1: { ds: ['Motor'], dev: 'Time on the floor with nothing in the way is how rolling and crawling actually get practised.' },
  m4p2: { ds: ['Fine'], dev: 'Using two hands and passing things over is the hand skill of this stage.' },
  m4p3: { ds: ['Motor'], dev: 'Lying on their side is halfway to rolling — it\u2019s what makes the full roll possible.' },
  m5x: { ds: ['Think'], dev: 'Working out where a sound came from links their ears to their head and eyes.' },
  m5p1: { ds: ['Fine', 'Think'], dev: 'Real objects with different weights and textures teach their hands far more than plastic toys.' },
  m5p2: { ds: ['Fine'], dev: 'Bringing both hands to one thing across their middle is a real coordination step.' },
  m5p3: { ds: ['Motor'], dev: 'Sitting practice builds tummy and back strength, and teaches them how to topple safely.' },
  m6x: { ds: ['Think'], dev: 'Half-hidden things are the way in to knowing that something still exists when you can\u2019t see it.' },
  m6p1: { ds: ['Social', 'Think'], dev: 'A surprise they can predict builds memory, anticipation and a shared laugh all at once.' },
  m6p2: { ds: ['Fine', 'Think'], dev: 'Putting things in and taking them out is how they start working out how space works.' },
  m6p3: { ds: ['Talk'], dev: 'Meals give them the same useful words again and again, attached to things they can touch.' },
  m7x: { ds: ['Think'], dev: 'Looking under a cover shows they can hold a thing in mind after it\u2019s gone.' },
  m7p1: { ds: ['Think', 'Fine'], dev: 'The classic wooden toy for \u2019it still exists\u2019 — plus practice at letting go on purpose.' },
  m7p2: { ds: ['Fine', 'Think'], dev: 'When their own action makes a noise, they learn they\u2019re the one causing it.' },
  m7p3: { ds: ['Fine', 'Talk'], dev: 'Turning pages is hand work, and sharing books is the strongest thing there is for talking.' },
  m8x: { ds: ['Think'], dev: 'A famous little mistake that shows habit and memory competing in their head.' },
  m8p1: { ds: ['Motor'], dev: 'Climbing over and around builds strength and makes them work out a route.' },
  m8p2: { ds: ['Talk'], dev: 'Leaving a gap after you name something invites the babble that turns into words.' },
  m8p3: { ds: ['Think', 'Motor'], dev: 'Picking from a few things they can reach builds decisions and playing on their own.' },
  m9x: { ds: ['Social', 'Think'], dev: 'Following your point means sharing attention with you — the best sign of words to come.' },
  m9p1: { ds: ['Motor'], dev: 'Pulling up to stand loads the legs and hips that walking will need.' },
  m9p2: { ds: ['Fine', 'Think'], dev: 'Dropping things on purpose is an experiment with gravity, and letting go is a hand skill.' },
  m9p3: { ds: ['Talk', 'Motor'], dev: 'Words joined to actions stick better, and hand gestures come before speech.' },
  m10x: { ds: ['Think', 'Fine'], dev: 'Matching a shape to a hole is problem solving where the toy tells them if they\u2019re right.' },
  m10p1: { ds: ['Fine'], dev: 'Practises the thumb-and-finger pinch, aiming for their mouth, and feeding themselves.' },
  m10p2: { ds: ['Social'], dev: 'Passing something to and fro is conversation, done with hands instead of words.' },
  m10p3: { ds: ['Fine'], dev: 'Tearing needs two hands pulling opposite ways — hard work, and good for both hands.' },
  m11x: { ds: ['Social'], dev: 'Checking your face to decide how to feel is real emotional learning.' },
  m11p1: { ds: ['Motor'], dev: 'Cruising along furniture is where balance and shifting weight for walking get rehearsed.' },
  m11p2: { ds: ['Talk'], dev: 'A pause after your question leaves the gap a first word can appear in.' },
  m11p3: { ds: ['Social', 'Fine'], dev: 'Real jobs build the feeling of being capable, plus the hand control to do them.' },
  m12x: { ds: ['Talk', 'Think'], dev: 'Fetching something you named shows they understand far more words than they can say.' },
  m12p1: { ds: ['Motor'], dev: 'Something steady to push gives them the nerve to step before balance is reliable.' },
  m12p2: { ds: ['Fine', 'Think'], dev: 'Posting needs aim, a twist of the wrist and a plan — hands and thinking together.' },
  m12p3: { ds: ['Think'], dev: 'Whatever they keep doing over and over is what their brain is chasing. Feed it.' },
  m15x: { ds: ['Social', 'Talk'], dev: 'Pointing to show you something, not just to ask for it, is a big jump in communicating.' },
  m15p1: { ds: ['Fine'], dev: 'Tipping and scooping builds wrist control and the sort of patience writing will need.' },
  m15p2: { ds: ['Fine', 'Social'], dev: 'Real tools, treated properly, build both hand skill and self-belief.' },
  m15p3: { ds: ['Talk'], dev: 'Turning their one word into two or three is the best-proven way to grow their talking.' },
  m18x: { ds: ['Think', 'Social'], dev: 'Spotting the mark on their own face means they know that reflection is them.' },
  m18p1: { ds: ['Fine', 'Think'], dev: 'Pouring and scooping teach how much fits where, plus control and repetition.' },
  m18p2: { ds: ['Motor'], dev: 'Wobbly surfaces train balance, and they get better at planning each move.' },
  m18p3: { ds: ['Think', 'Talk'], dev: 'Little worlds are where pretending starts — and pretending brings lots of new words.' },
  m21x: { ds: ['Social'], dev: 'Putting a name to a feeling is the first step in learning to calm down.' },
  m21p1: { ds: ['Social', 'Talk'], dev: 'Words for feelings are what make big feelings manageable instead of overwhelming.' },
  m21p2: { ds: ['Think'], dev: 'Matching identical pairs is early sorting, and good practice at spotting small differences.' },
  m21p3: { ds: ['Talk'], dev: 'Filling in the missing word from a favourite book shows memory and phrasing clicking together.' },
  m24x: { ds: ['Social', 'Think'], dev: 'Waiting means holding on to what you want while resisting it — the root of self-control.' },
  m24p1: { ds: ['Think'], dev: 'Hunting for one colour means sorting by a single feature. That\u2019s abstract thinking.' },
  m24p2: { ds: ['Think', 'Social'], dev: 'One plate per person is early maths, and being needed makes them feel they belong.' },
  m24p3: { ds: ['Fine'], dev: 'Rolling, pinching and cutting build the hand strength handwriting will need later.' },
  m30x: { ds: ['Think'], dev: 'Changing the rule halfway is about switching between ideas — hard, and worth practising.' },
  m30p1: { ds: ['Social'], dev: 'Rules, waiting and losing get learned in that order, and only by doing it.' },
  m30p2: { ds: ['Talk', 'Think'], dev: 'Taking their questions seriously is how their reasoning and their words grow together.' },
  m30p3: { ds: ['Fine'], dev: 'Buttons and zips off the body are much easier, and they can see themselves getting it.' },
  m30p4: { ds: ['Fine', 'Social'], dev: 'A real tool and a real result: careful hands, plus pride at feeding the family.' },
};

const EXTRA_ACTS = {
  p2: [
    { id: 'p2p3', k: 'play', d: 'Social', dev: 'A daily quiet moment trains your own noticing — the skill this whole first year runs on.', t: 'Ten quiet minutes, hand on bump', dur: '10 min · daily', body: 'Not a test, a habit. Sitting still once a day is how you learn their pattern of movement and rest.', steps: ['Same time each day, phone down.', 'Notice what wakes them and what settles them.', 'Say something out loud before you finish.'], link: 'p2b' },
    { id: 'p2p4', k: 'play', d: 'Talk', dev: 'Hearing two languages before birth helps a newborn tell both of them apart.', t: 'Speak your own language', dur: 'All day · free', body: 'If a language other than English is yours, use it now and keep using it. Bilingual exposure starts before birth.', steps: ['Pick the language you are most yourself in.', 'Use it for songs and for the daily book.', 'Do not alternate mid-sentence if you can help it.'], src: 'Prenatal language discrimination: Moon, Lagercrantz & Kuhl 2013' },
  ],
  p3: [
    { id: 'p3p3', k: 'play', d: 'Social', dev: 'Practising a calm routine now means you\u2019ll actually have it when you\u2019re exhausted.', t: 'Practise the five soothes', dur: '15 min', body: 'Learn the five before you need them at 3am: hold, side-lying, shushing, swinging, sucking. Rehearse on a doll if it feels odd.', steps: ['Read or watch the sequence once through.', 'Say the five out loud in order until they stick.', 'Agree with your partner who does which.'], src: 'The 5 S\u2019s, Karp 2002 — widely used clinically, evidence is mixed but harmless' },
    { id: 'p3p4', k: 'play', d: 'Think', dev: 'A calm, simple space supports the long looking that builds concentration.', t: 'Set the movement area up properly', dur: '1 hour', body: 'A firm mat, a mirror at floor level, a mobile hook, and nothing else. Pikler\u2019s point: the environment does the teaching.', steps: ['Firm surface — not a soft cushion or a bouncer.', 'Mirror low on the wall, fixed safely.', 'One hook in the ceiling for mobiles.'], link: 'p3b' },
  ],
  m0: [
    { id: 'm0p4', k: 'play', d: 'Social', dev: 'Skin contact steadies temperature, heart rate and stress — for both of you.', t: 'Skin to skin, no agenda', dur: '20 min · daily', body: 'The most evidenced thing you can do in the first weeks, and it asks nothing of you but stillness.', steps: ['Bare chest, baby in just a nappy, blanket over both.', 'No phone, no visitors, no timer.', 'Works for either parent.'], src: 'Kangaroo care: Cochrane review 2016 — strong evidence for stability and feeding', link: 'm0a' },
    { id: 'm0p5', k: 'play', d: 'Fine', dev: 'The automatic grip they\u2019re born with is what real, chosen grabbing grows out of.', t: 'Offer a finger to hold', dur: '2 min · often', body: 'Press lightly into the palm and their fingers close. Reflexive now, but the pathway is being used.', steps: ['Stroke the palm from the little-finger side.', 'Let them grip; do not pull away first.', 'Try a wooden ring for a different weight.'], link: 'm0b' },
    { id: 'm0p6', k: 'play', d: 'Talk', dev: 'Slow, singsong, exaggerated talk is exactly what babies listen to and learn from.', t: 'Talk in parentese, unashamed', dur: 'All day · free', body: 'The sing-song voice you feel silly using is the one their brain is tuned for. Slower, higher, longer vowels.', steps: ['Stretch the vowels: "heeelloooo".', 'Real words and real sentences, just exaggerated.', 'Face them so they see your mouth.'], src: 'Infant-directed speech and vocabulary: Ramirez-Esparza et al. 2014' },
  ],
  m1: [
    { id: 'm1p4', k: 'play', d: 'Social', dev: 'Copying their face back completes the first back-and-forth of any conversation.', t: 'Mirror their face', dur: '5 min', body: 'Whatever they do with their face, do it back, slightly bigger, then wait. This is the shape of every conversation they will ever have.', steps: ['Get to about 30cm — their focal distance.', 'Copy, then pause and hold their gaze.', 'Stop the moment they look away.'], link: 'm1a' },
    { id: 'm1p5', k: 'play', d: 'Motor', dev: 'Gentle movement teaches their body where it is in space, which balance is built on.', t: 'Slow rocking in three directions', dur: '5 min', body: 'Up and down, side to side, and a slow tilt. Different movements, different information about where their body is.', steps: ['Support the head throughout, movements slow.', 'Watch their face and stop at the first grizzle.', 'Never fast or jolting.'] },
  ],
  m2: [
    { id: 'm2p4', k: 'play', d: 'Motor', dev: 'Kicking against something builds the hip and leg strength rolling will use.', t: 'Something to kick', dur: '6 min', body: 'A cushion or your hands at their feet turns aimless kicking into kicking that does something.', steps: ['Hold a firm pillow lightly against their soles.', 'Let them push; give a little back.', 'Name it: "big push!"'], link: 'm2b' },
    { id: 'm2p5', k: 'play', d: 'Talk', dev: 'Taking turns with sounds teaches the rhythm every conversation runs on.', t: 'Coo, then wait five seconds', dur: '5 min', body: 'The waiting is the activity. Five silent seconds is much longer than it feels, and it is where their turn happens.', steps: ['Make one sound, then count to five in your head.', 'Copy exactly what they give back.', 'Add one new sound only when they repeat yours.'], link: 'm2a' },
  ],
  m3: [
    { id: 'm3p4', k: 'play', d: 'Motor', dev: 'Twisting the body is how a roll happens. A small nudge shows them the feeling.', t: 'Help the roll, do not do it', dur: '5 min', body: 'Guide one knee across the body and stop. Let them finish the rotation themselves, however long it takes.', steps: ['Bend one knee and bring it gently across.', 'Take your hands off and wait.', 'Both sides, equally often.'], link: 'm3c' },
    { id: 'm3p5', k: 'play', d: 'Social', dev: 'Tickle, then pause, and they learn they can get you to do it again.', t: 'Tickle, pause, wait for the ask', dur: '5 min', body: 'Tickle once, then stop and look at them. Any move that means "again" gets you doing it again.', steps: ['One round of whatever makes them laugh.', 'Freeze with an expectant face.', 'Respond to a kick, a squeal, a smile — anything.'], link: 'm3a' },
  ],
  m4: [
    { id: 'm4p4', k: 'play', d: 'Fine', dev: 'Hands finding feet joins up the top and bottom halves of their body.', t: 'Find your feet', dur: '6 min', body: 'Hands to feet is a coordination milestone in disguise. Socks with something to look at make it obvious.', steps: ['Nappy off or loose clothing so feet are reachable.', 'Put bright or crinkly socks on.', 'Bring feet gently to their hands once, then leave them to it.'], link: 'm4a' },
    { id: 'm4p5', k: 'play', d: 'Think', dev: 'The same sound every time they kick one leg is their first taste of \u2019I did that\u2019.', t: 'A bell on one ankle', dur: '8 min', body: 'Ribbon-tied bell on one ankle only. Watch them work out which leg makes the sound — that realisation is the whole point.', steps: ['Loosely tie a soft bell to one ankle.', 'Stay and watch; never leave it on unattended.', 'Swap legs the next time.'] },
  ],
  m5: [
    { id: 'm5p4', k: 'play', d: 'Talk', dev: 'Naming what they\u2019re chewing links the word to the thing while they\u2019re interested in it.', t: 'Name what is in their mouth', dur: 'All day · free', body: 'Mouthing is their main investigation tool now. Label whatever they are exploring, once, calmly.', steps: ['Wait until they are already holding it.', 'Name it plainly: "wooden spoon".', 'Add one property: "cold", "smooth".'], link: 'm5a' },
    { id: 'm5p5', k: 'play', d: 'Motor', dev: 'Wriggling towards something they want is what turns into crawling.', t: 'Just out of reach', dur: '8 min', body: 'One interesting object placed slightly beyond the fingertips. The wriggle towards it is the work.', steps: ['Tummy time, object 20cm past their hands.', 'Do not slide it closer.', 'Let them have it after any real attempt.'], link: 'm5c' },
  ],
  m6: [
    { id: 'm6p4', k: 'play', d: 'Fine', dev: 'Feeding themselves builds grip, aim and knowing when they\u2019re full.', t: 'First finger foods', dur: '15 min · mealtimes', body: 'Soft strips they can hold in a fist with a bit sticking out. Mess is the method, not the failure.', steps: ['Finger-length soft strips, not small rounds.', 'Let them lead; never put it in their mouth.', 'Sit and eat something yourself alongside.'], src: 'Baby-led weaning: NHS/AAP guidance on responsive feeding' },
    { id: 'm6p5', k: 'play', d: 'Think', dev: 'Comparing their reflection with your face is the start of \u2019me\u2019 and \u2019you\u2019.', t: 'Two faces in the mirror', dur: '6 min', body: 'Hold them at a mirror with your face next to theirs and name both. They will look longer at yours.', steps: ['Sit close to a large mirror.', 'Name "that\u2019s you" and "that\u2019s me".', 'Wave and watch them find the movement.'], link: 'm6a' },
  ],
  m7: [
    { id: 'm7p4', k: 'play', d: 'Fine', dev: 'Unwrapping needs thumb and finger pushing against each other — pre-pinch strength.', t: 'Wrap something loosely', dur: '8 min', body: 'A favourite object in a scarf or a paper bag. Getting it out needs both hands and a plan.', steps: ['Wrap loosely enough to succeed in seconds.', 'No tape, no small pieces.', 'Let them see you wrap it.'], link: 'm7b' },
    { id: 'm7p5', k: 'play', d: 'Motor', dev: 'Sitting steadily frees their hands, and free hands are what let them explore.', t: 'Sit and reach sideways', dur: '8 min', body: 'Once sitting is steady, put things to the side rather than the front. Reaching across trains balance.', steps: ['Sit them on a firm surface with space around.', 'Place one object at nine o\u2019clock, one at three.', 'Stay close for the topple.'], link: 'm7a' },
  ],
  m8: [
    { id: 'm8p4', k: 'play', d: 'Talk', dev: 'Copying their babble back rewards the effort and keeps them practising sounds.', t: 'Babble tennis', dur: '5 min', body: 'They say "bababa", you say "bababa". Then you say "ba-BA" and see if the rhythm comes back changed.', steps: ['Copy the exact syllable first.', 'Then change stress or add one syllable.', 'Keep going as long as they serve.'], link: 'm8b' },
    { id: 'm8p5', k: 'play', d: 'Social', dev: 'Small goodbyes that always end in you coming back are how they learn leaving is temporary.', t: 'Leave the room, announced', dur: '2 min · daily', body: 'Stranger wariness is a sign of attachment working. Small announced departures build the trust that you come back.', steps: ['Say "back in a minute" and go.', 'Call out from the other room.', 'Return before the grizzle turns to crying.'], link: 'm8c' },
  ],
  m9: [
    { id: 'm9p4', k: 'play', d: 'Fine', dev: 'Banging two things together means both hands working as a pair, with a noisy reward.', t: 'Two blocks, one bang', dur: '6 min', body: 'Bringing two things together in front of them is harder than it looks, and it is a listed milestone in itself.', steps: ['Hand them one object, then another.', 'Demonstrate the bang once.', 'Wooden on wooden sounds best.'], link: 'm9a' },
    { id: 'm9p6', k: 'play', d: 'Motor', dev: 'Getting down is a different skill from getting up, and it saves a lot of falls.', t: 'Practise sitting back down', dur: '6 min', body: 'Most babies pull up weeks before they can lower themselves. Teaching the way down saves a lot of crying.', steps: ['Once standing, guide their hips to bend.', 'Hands still on the support as they go down.', 'Repeat on the same piece of furniture.'], link: 'm9b' },
  ],
  m10: [
    { id: 'm10p4', k: 'play', d: 'Fine', dev: 'Picking up tiny things with thumb and finger is the exact grip writing needs.', t: 'A line of small things', dur: '8 min', body: 'Peas, blueberry halves, cooked pasta shells in a row on the tray. Nothing else, so the picking up is the whole task.', steps: ['Six small soft items in a line.', 'Sit opposite and stay for the whole time.', 'No plate — the tray is easier to grip on.'], link: 'm10a' },
    { id: 'm10p5', k: 'play', d: 'Social', dev: 'Handing something to a named person is communicating on purpose, before words.', t: 'Give it to Dad', dur: '5 min', body: 'Three people in a triangle and one object. Passing it around is early social routine plus a lot of laughing.', steps: ['Name who it goes to each time.', 'Hold your hand out and wait.', 'Thank them properly every time.'], link: 'm10b' },
  ],
  m11: [
    { id: 'm11p4', k: 'play', d: 'Talk', dev: 'Hand signs come before speech, and a few of them cut a lot of frustration.', t: 'Four signs, used every day', dur: '2 min · daily', body: 'More, all done, milk, up. Say the word and make the sign together, every time, for weeks.', steps: ['Choose four you will actually need.', 'Always say the word with the sign.', 'Accept any rough version of the sign.'], src: 'Gesture precedes speech: Iverson & Goldin-Meadow 2005', link: 'm11a' },
    { id: 'm11p5', k: 'play', d: 'Motor', dev: 'Carrying something while walking is balance with their attention split.', t: 'Carry it across the room', dur: '6 min', body: 'Ask them to bring you something light using both hands. Full hands make balance harder, which is the training.', steps: ['A light basket or a soft toy in both hands.', 'A short, clear route with things to hold on to.', 'Applaud the delivery, not the speed.'], link: 'm11b' },
  ],
  m12: [
    { id: 'm12p4', k: 'play', d: 'Fine', dev: 'Stacking means opening the hand at exactly the right moment — harder than picking up.', t: 'Two blocks, then three', dur: '8 min', body: 'Building needs the hand to open exactly when the block is in place. Knocking it down is legitimate and important.', steps: ['Large light blocks, on a firm surface.', 'Demonstrate two, then hand over.', 'Rebuild without comment when it falls.'], link: 'm12b' },
    { id: 'm12p5', k: 'play', d: 'Talk', dev: 'Choosing between two named things gives their new words something real to do.', t: 'This one or that one?', dur: 'All day · free', body: 'Hold up two things, name both, and honour whatever they reach for or say. Vocabulary with consequences.', steps: ['Two real options, both acceptable to you.', 'Name each as you hold it up.', 'Follow their choice exactly.'], link: 'm12c' },
    { id: 'm12p6', k: 'play', d: 'Motor', dev: 'Bumpy, sloping ground asks things of their balance that a flat floor never does.', t: 'Walk on something uneven', dur: '15 min', body: 'Grass, sand, a gentle slope, a low kerb. Different surfaces retrain their balance in a way flat floors cannot.', steps: ['Bare feet where it is safe.', 'One hand available, not held.', 'Let them stop and study the ground.'], link: 'm12a' },
  ],
  m15: [
    { id: 'm15p4', k: 'play', d: 'Think', dev: 'Doing what one instruction says shows words are starting to steer what they do.', t: 'One-step errands', dur: 'All day · free', body: 'Short, single, real instructions given once. "Put the sock in the basket." Then wait, without repeating.', steps: ['One step only, no chaining.', 'Say it once and pause a full five seconds.', 'Help physically rather than repeating louder.'], link: 'm15b' },
    { id: 'm15p5', k: 'play', d: 'Fine', dev: 'Threading needs care, patience and each hand doing a different job.', t: 'Threading on a shoelace', dur: '10 min', body: 'Large wooden beads and a stiff lace. Start with one bead already on so the idea is visible.', steps: ['Stiffen the lace end with tape.', 'Beads big enough to be safe if mouthed.', 'Sit beside, not opposite, so they see your hands.'], link: 'm15a' },
    { id: 'm15p6', k: 'play', d: 'Social', dev: 'Copying your housework is how toddlers practise being useful and part of things.', t: 'A cloth of their own', dur: '10 min', body: 'A small damp cloth and their own low table to wipe. Repetition, not results — Montessori practical life.', steps: ['Keep the cloth somewhere they can reach it.', 'Show the movement without narrating over it.', 'Do not re-clean it in front of them.'], link: 'm15d' },
  ],
  m18: [
    { id: 'm18p4', k: 'play', d: 'Fine', dev: 'A taped-down page and a fat crayon build the grip and shoulder strength drawing needs.', t: 'Chunky crayons, taped paper', dur: '10 min', body: 'Tape the paper down so it cannot slide, and use short fat crayons that force a whole-hand grip.', steps: ['Tape all four corners.', 'Short crayons — broken ones are ideal.', 'No instructions and no drawing for them.'], link: 'm18a' },
    { id: 'm18p5', k: 'play', d: 'Think', dev: 'Using one thing to stand for another is the same trick words rely on.', t: 'A block becomes a phone', dur: '8 min', body: 'Pretend play starts with real-object stand-ins. Hold a block to your ear and talk into it, then pass it over.', steps: ['Use an obviously wrong object on purpose.', 'Commit fully — sound effects included.', 'Accept whatever they turn it into next.'], link: 'm18b' },
    { id: 'm18p6', k: 'play', d: 'Motor', dev: 'Climbing they\u2019re allowed to do builds strength and a sensible sense of what\u2019s too high.', t: 'Something safe to climb', dur: '20 min', body: 'A Pikler triangle, sofa cushions or two stairs supervised. Climbing that is allowed happens with better judgement.', steps: ['One height they can manage alone.', 'Stand near but do not lift them up.', 'Teach the way down as much as the way up.'], link: 'm18c' },
  ],
  m21: [
    { id: 'm21p4', k: 'play', d: 'Talk', dev: 'Two words together is grammar arriving. Hearing you do it is how it spreads.', t: 'Say it back, plus one', dur: 'All day · free', body: 'They say "dog". You say "big dog" or "dog running". Always one step above them, never five.', steps: ['Repeat their word so they know they were heard.', 'Add exactly one word.', 'Never make them repeat it back.'], link: 'm21b' },
    { id: 'm21p5', k: 'play', d: 'Motor', dev: 'Stopping and turning are separate skills from running, and they need space to practise.', t: 'Stop and go', dur: '15 min', body: 'Run when the music plays, freeze when it stops. Braking is the harder half of running.', steps: ['Open space, no furniture corners.', 'Exaggerate your own freeze.', 'Add a slow-motion version once they get it.'], link: 'm21a' },
    { id: 'm21p6', k: 'play', d: 'Social', dev: 'Playing next to another child, not with them, is exactly right at this age.', t: 'Two of the same toy', dur: '30 min', body: 'When another child visits, duplicate the popular thing. Sharing comes much later than we expect.', steps: ['Two identical items, not one to share.', 'Sit close and narrate rather than intervening.', 'Keep it short and end before it sours.'], link: 'm21c' },
  ],
  m24: [
    { id: 'm24p4', k: 'play', d: 'Motor', dev: 'Jumping with both feet needs a push-off and a landing timed together. A real milestone.', t: 'Jump off something low', dur: '10 min', body: 'A book-height step, both feet, landing on a soft mat. Then a line on the floor to jump over.', steps: ['Start from ground level, over a line.', 'Hold both hands, then one, then none.', 'Say "bend your knees" and show it.'], link: 'm24a' },
    { id: 'm24p5', k: 'play', d: 'Talk', dev: 'Naming everything in one room grows words in bunches rather than one at a time.', t: 'Fifty-word treasure hunt', dur: '15 min', body: 'Pick a room and name everything in it, together. Categories make words stick better than random labels.', steps: ['One room, one category — kitchen things, clothes.', 'Let them lead the pointing.', 'Come back to the same room another day.'], link: 'm24b' },
    { id: 'm24p6', k: 'play', d: 'Social', dev: 'Real choices give their need to decide somewhere safe to go, so fewer fights.', t: 'Two real choices, all day', dur: 'All day · free', body: 'Not "shall we go out?" but "coat or jumper?". Their need to decide has to go somewhere.', steps: ['Offer two options you are happy with.', 'Accept the answer without renegotiating.', 'Save choices for the moments that usually flare.'], link: 'm24d' },
  ],
  m30: [
    { id: 'm30p5', k: 'play', d: 'Fine', dev: 'A closed loop is the first shape they can really draw, and it comes before letters.', t: 'Draw round things', dur: '10 min', body: 'Trace round a cup, a lid, a hand. Closing a loop is the skill; tracing teaches the movement.', steps: ['Offer three round objects to trace.', 'Draw one yourself, slowly, then stop.', 'Ask what it is rather than telling them.'], link: 'm30b' },
    { id: 'm30p6', k: 'play', d: 'Talk', dev: 'Retelling what happened, in order, builds the storytelling that reading later needs.', t: 'Tell it back to Grandma', dur: '10 min', body: 'After something happened, help them tell it to someone who was not there. First, then, at the end.', steps: ['Prompt with "what happened first?"', 'Fill only the gaps they leave.', 'Let them tell it badly and do not correct.'], link: 'm30a' },
    { id: 'm30p7', k: 'play', d: 'Motor', dev: 'Pedalling is a round-and-round leg motion, quite different from walking or running.', t: 'Pedals, on the flat', dur: '20 min', body: 'Pushing with feet on the ground comes first; pedalling needs a slight downhill to feel the motion once.', steps: ['Saddle low enough for flat feet.', 'Push their feet through one full rotation.', 'A gentle slope makes the penny drop.'], link: 'm30c' },
    { id: 'm30p8', k: 'play', d: 'Think', dev: 'Sorting one way, then another way, is the flexible thinking school will ask for.', t: 'Sort the socks twice', dur: '10 min', body: 'Sort the laundry by colour. Then mix it up and sort the same pile by size. The second sort is the hard one.', steps: ['Finish sorting one way first.', 'Mix it up and name the new rule.', 'Ask them to say the rule out loud.'], link: 'm30e' },
  ],
};

const DOMAINS = ['Motor', 'Fine', 'Talk', 'Social', 'Think'];
const DOMAIN_NAMES = { Motor: 'Gross motor', Fine: 'Fine motor', Talk: 'Speech & language', Social: 'Social & emotional', Think: 'Cognitive & play' };
const OUTCOMES = [{ id: 'loved', label: 'Loved it' }, { id: 'nearly', label: 'Nearly' }, { id: 'notyet', label: 'Not yet' }];
const PLAY_OUTCOMES = [{ id: 'loved', label: 'Loved it' }, { id: 'tried', label: 'Tried it' }, { id: 'notyet', label: 'Not for us' }];
const outcomesFor = a => (a.k === 'exp' ? OUTCOMES : PLAY_OUTCOMES);
const domsOf = a => (a.ds || (ACT_META[a.id] && ACT_META[a.id].ds) || (a.d ? [a.d] : []));
const devOf = a => (a.dev || (ACT_META[a.id] && ACT_META[a.id].dev) || '');
const domChips = a => domsOf(a).map(k => Object.assign({ key: k }, DOM_CHIP[k] || { label: k, bg: 'transparent', bc: 'var(--color-neutral-300)', fg: 'var(--color-neutral-700)' }));
const STAGE_MONTHS = { p2: -4.5, p3: -1.5, m0: 0, m1: 1, m2: 2, m3: 3, m4: 4, m5: 5, m6: 6, m7: 7, m8: 8, m9: 9, m10: 10, m11: 11, m12: 12, m15: 15, m18: 18, m21: 21, m24: 24, m30: 30 };
const GENDERS = [{ id: 'girl', label: 'Girl' }, { id: 'boy', label: 'Boy' }, { id: 'na', label: 'Rather not say' }];
const STATUSES = [{ id: 'born', label: 'Born' }, { id: 'expecting', label: 'Expecting' }];
const fmtDate = iso => { if (!iso) return ''; const d = new Date(iso + 'T00:00:00'); return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); };
const monthsSince = iso => { const d = new Date(iso + 'T00:00:00'), n = new Date(); return (n.getFullYear() - d.getFullYear()) * 12 + (n.getMonth() - d.getMonth()) + (n.getDate() - d.getDate()) / 30.4; };
const KEY = 'thread.tracker.v3';

class Component extends DCLogic {
  state = {
    tab: 'timeline', progress: {}, notes: {}, photos: {}, results: {},
    sheetId: null, actId: null, celebrate: null, filter: 'all',
    profile: null, screen: 'auth', draft: { name: '', status: 'born', date: '', gender: 'na' },
  };
  stageEls = {};

  componentDidMount() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
    if (saved && saved.profile) { this.setState(Object.assign({ screen: 'app' }, saved)); return; }
    const progress = { p2a: 2, p2b: 3, p3a: 2, p3b: 1, m0a: 2, m0b: 3, m0c: 2, m1a: 3, m1b: 3, m1c: 3, m2a: 3, m2b: 2, m3a: 2, m3b: 3, m3c: 3, m4a: 3, m4b: 3, m5a: 2, m5b: 2, m5c: 3, m6a: 3, m6b: 3, m7a: 4, m7b: 3, m8a: 3, m8b: 3, m8c: 1, m9a: 2, m9b: 4, m9c: 3, m10a: 3, m10b: 2, m11a: 3, m11b: 3, m11c: 2, m12a: 2, m12b: 1, m12c: 2, m12d: 1 };
    const results = { m9x: { o: 'loved', note: 'Followed my finger to the window — every time.', when: 'last week' }, m7x: { o: 'nearly', note: 'Found it under one cup, gave up on two.', when: 'a month ago' }, m8x: { o: 'loved', note: 'Went straight back to cloth A. Textbook.', when: 'March' } };
    const photos = { m12a: 1, m1a: 1, m9b: 1, m11a: 1 };
    this.sample = { progress: progress, results: results, photos: photos, notes: { m12a: 'Straight for the dog bowl.' } };
  }

  loadSample() {
    const dob = new Date(); dob.setMonth(dob.getMonth() - 14);
    this.save(Object.assign({ screen: 'app', profile: { name: 'Marlowe', gender: 'girl', status: 'born', date: dob.toISOString().slice(0, 10), account: 'sample' } }, this.sample || {}));
  }

  save(patch) {
    this.setState(patch, () => {
      const s = this.state;
      try { localStorage.setItem(KEY, JSON.stringify({ progress: s.progress, notes: s.notes, photos: s.photos, results: s.results, profile: s.profile })); } catch (e) {}
    });
  }

  allMs() { const out = []; STAGES.forEach(st => st.ms.forEach(m => out.push(Object.assign({ stage: st }, m)))); return out; }
  findMs(id) { return this.allMs().find(m => m.id === id); }
  actsOf(st) { return st.acts.concat(EXTRA_ACTS[st.id] || []); }
  allActs() { const out = []; STAGES.forEach(st => this.actsOf(st).forEach(a => out.push(Object.assign({ stage: st }, a)))); return out; }

  setLevel(m, idx) {
    const cur = this.state.progress[m.id] || 0;
    const next = cur === idx + 1 ? idx : idx + 1;
    const progress = Object.assign({}, this.state.progress, { [m.id]: next });
    const celebrate = (this.props.celebrations !== false && next === m.lv.length && cur !== next)
      ? { kicker: 'Milestone complete', title: m.t, blurb: (this.props.childName || 'Marlowe').split(' ')[0] + ' can do it on their own now — logged to the thread.' } : null;
    this.save({ progress: progress });
    if (celebrate) setTimeout(() => this.setState({ celebrate: celebrate }), 160);
  }

  beginProfile(account) {
    const p = this.state.profile;
    this.setState({ screen: 'child', draft: p ? { name: p.name, status: p.status, date: p.date, gender: p.gender } : { name: '', status: 'born', date: '', gender: 'na' }, pendingAccount: account || (p && p.account) || 'local' });
  }

  commitProfile() {
    const d = this.state.draft;
    if (!d.name.trim() || !d.date) return;
    this.save({ screen: 'app', profile: { name: d.name.trim(), status: d.status, date: d.date, gender: d.gender, account: this.state.pendingAccount || 'local' } });
  }

  setResult(a, oid) {
    const cur = this.state.results[a.id];
    const results = Object.assign({}, this.state.results);
    if (cur && cur.o === oid) delete results[a.id];
    else results[a.id] = { o: oid, note: cur ? cur.note : '', when: 'today' };
    this.save({ results: results });
  }

  renderVals() {
    const s = this.state;
    const p = s.profile;
    const childName = (p && p.name) || this.props.childName || 'Marlowe';
    const firstName = childName.split(' ')[0];
    const ageMonths = p ? monthsSince(p.date) : 14;
    let ageLine = '14 months';
    if (p && p.status === 'born') {
      const mo = Math.max(0, Math.floor(ageMonths));
      ageLine = (mo < 1 ? 'Newborn' : mo < 24 ? mo + (mo === 1 ? ' month' : ' months') : Math.floor(mo / 12) + 'y ' + (mo % 12) + 'm') + ' · born ' + fmtDate(p.date);
    } else if (p) {
      const weeks = Math.round(40 + ageMonths * 4.35);
      ageLine = Math.min(42, Math.max(4, weeks)) + ' weeks · due ' + fmtDate(p.date);
    }
    let currentStage = 'm0';
    STAGES.forEach(st => { if (STAGE_MONTHS[st.id] <= ageMonths) currentStage = st.id; });
    if (p && p.status === 'expecting') currentStage = ageMonths < -3 ? 'p2' : 'p3';
    const canSave = !!(s.draft.name.trim() && s.draft.date);
    const all = this.allMs();
    const started = all.filter(m => (s.progress[m.id] || 0) > 0).length;

    const pipBg = (on, done) => on ? (done ? 'var(--color-accent)' : 'var(--color-accent-500)') : 'var(--color-neutral-300)';

    const msVm = (m, st) => {
      const c = s.progress[m.id] || 0;
      const done = c === m.lv.length;
      return {
        id: m.id, d: m.d.toUpperCase(), t: m.t, done: done,
        pips: m.lv.map((_, i) => ({ bg: pipBg(i < c, done) })),
        status: c === 0 ? 'Not logged' : m.lv[c - 1],
        statusFg: c === 0 ? 'var(--color-neutral-600)' : (done ? 'var(--color-accent-800)' : 'var(--color-neutral-700)'),
        bc: done ? 'var(--color-accent-400)' : (c > 0 ? 'var(--color-neutral-400)' : 'var(--color-neutral-300)'),
        bg: done ? 'linear-gradient(145deg,#fdf4d8,#fffdf7)' : 'var(--color-surface)',
        fg: c > 0 ? 'var(--color-text)' : 'var(--color-neutral-800)',
        open: () => this.setState({ sheetId: m.id }),
      };
    };

    const actVm = (a, st) => {
      const exp = a.k === 'exp';
      const r = s.results[a.id];
      return {
        id: a.id, t: a.t, body: a.body, kind: exp ? 'Experiment' : 'Play',
        icon: exp ? 'ph ph-flask' : 'ph ph-hand-heart',
        iconFg: exp ? 'var(--color-accent-700)' : 'var(--color-neutral-600)',
        kindFg: exp ? 'var(--color-accent-700)' : 'var(--color-neutral-600)',
        bc: r ? 'var(--color-accent-400)' : 'var(--color-neutral-300)',
        bg: r ? '#fdf8ea' : 'transparent',
        meta: r ? (outcomesFor(a).find(o => o.id === r.o) || {}).label + ' · logged' : a.dur,
        stageLabel: st.sub,
        chips: domChips(a), dev: devOf(a), hasDev: !!devOf(a),
        outcomes: outcomesFor(a).map(o => {
          const on = r && r.o === o.id;
          return { label: o.label, pick: () => this.setResult(a, o.id), bg: on ? 'var(--color-accent-200)' : 'transparent', bc: on ? 'var(--color-accent-500)' : 'var(--color-neutral-300)', fg: on ? 'var(--color-accent-900)' : 'var(--color-neutral-600)' };
        }),
        open: () => this.setState({ actId: a.id }),
      };
    };

    const stages = STAGES.map(st => ({
      id: st.id, label: st.label, sub: st.sub,
      dot: st.id === currentStage ? 'var(--color-accent)' : 'var(--color-neutral-400)',
      dotGlow: st.id === currentStage ? '0 0 0 4px rgba(196,150,40,.16)' : 'none',
      subFg: st.id === currentStage ? 'var(--color-accent-700)' : 'var(--color-neutral-600)',
      ref: el => { this.stageEls[st.id] = el; },
      milestones: st.ms.map(m => msVm(m, st)),
      activities: this.actsOf(st).map(a => actVm(a, st)),
    }));

    const jump = id => () => {
      const el = this.stageEls[id], sc = this.scrollEl;
      if (el && sc) sc.scrollTo({ top: sc.scrollTop + el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8, behavior: 'smooth' });
    };
    const scrubber = STAGES.map(st => ({
      short: st.short, go: jump(st.id),
      bg: st.id === currentStage ? 'var(--color-accent-200)' : 'transparent',
      bc: st.id === currentStage ? 'var(--color-accent-400)' : 'var(--color-neutral-300)',
      fg: st.id === currentStage ? 'var(--color-accent-900)' : 'var(--color-neutral-600)',
    }));

    const acts = this.allActs();
    const today = acts.find(a => a.id === 'm12p3');
    const todayLink = today && today.link ? this.findMs(today.link) : null;
    const filters = [{ id: 'all', short: 'All ages' }].concat(STAGES.map(st => ({ id: st.id, short: st.short })));
    const playFilters = filters.map(f => ({
      short: f.short, go: () => this.setState({ filter: f.id }),
      bg: s.filter === f.id ? 'var(--color-accent-200)' : 'transparent',
      bc: s.filter === f.id ? 'var(--color-accent-400)' : 'var(--color-neutral-300)',
      fg: s.filter === f.id ? 'var(--color-accent-900)' : 'var(--color-neutral-600)',
    }));
    const playList = acts.filter(a => s.filter === 'all' || a.stage.id === s.filter).map(a => actVm(a, a.stage));

    const expList = acts.filter(a => a.k === 'exp').map(a => {
      const r = s.results[a.id];
      return {
        t: a.t, stageLabel: a.stage.sub, hasResult: !!r, note: r ? r.note : '', when: r ? r.when : '',
        bc: r ? 'var(--color-accent-300)' : 'var(--color-neutral-300)',
        open: () => this.setState({ actId: a.id }),
        setNote: e => { const v = e.target.value; const results = Object.assign({}, s.results); results[a.id] = Object.assign({}, results[a.id], { note: v }); this.save({ results: results }); },
        outcomes: OUTCOMES.map(o => {
          const on = r && r.o === o.id;
          return { label: o.label, pick: () => this.setResult(a, o.id), bg: on ? 'var(--color-accent-300)' : 'transparent', bc: on ? 'var(--color-accent-500)' : 'var(--color-neutral-300)', fg: on ? 'var(--color-accent-900)' : 'var(--color-neutral-600)' };
        }),
      };
    });

    let totalLevels = 0, doneLevels = 0;
    all.forEach(m => { totalLevels += m.lv.length; doneLevels += Math.min(s.progress[m.id] || 0, m.lv.length); });
    const pct = totalLevels ? doneLevels / totalLevels : 0;
    const domainStats = DOMAINS.map(d => {
      const set = all.filter(m => m.d === d);
      const c = set.filter(m => (s.progress[m.id] || 0) > 0).length;
      return { key: d, name: DOMAIN_NAMES[d], count: c + ' of ' + set.length, ratio: c / set.length, pct: Math.round((c / set.length) * 100) + '%' };
    });
    const weakest = domainStats.slice().sort((a, b) => a.ratio - b.ratio)[0];
    const weakIds = all.filter(m => m.d === weakest.key).map(m => m.id);
    const weakActs = this.allActs().filter(a => a.link && weakIds.indexOf(a.link) > -1).length;
    const winList = all.filter(m => (s.progress[m.id] || 0) === m.lv.length).slice(-4).reverse();
    const wins = winList.map(m => ({ t: m.t, sub: m.lv[m.lv.length - 1] + ' · ' + m.stage.sub, open: () => this.setState({ sheetId: m.id, tab: 'timeline' }) }));

    const photoIds = Object.keys(s.photos);
    const memories = [0, 1, 2, 3, 4, 5].map(i => {
      const id = photoIds[i];
      const m = id ? this.findMs(id) : null;
      return m
        ? { style: 'solid', bg: 'linear-gradient(150deg,#fdf1cf,#f6f1e4)', icon: 'ph-fill ph-image', label: m.t }
        : { style: 'dashed', bg: 'transparent', icon: 'ph ph-plus', label: 'Add' };
    });

    const tabs = [
      { id: 'timeline', label: 'Thread', icon: 'ph ph-path' },
      { id: 'play', label: 'Play', icon: 'ph ph-hand-heart' },
      { id: 'log', label: 'Experiments', icon: 'ph ph-flask' },
      { id: 'progress', label: 'Progress', icon: 'ph ph-chart-line-up' },
    ].map(t => ({ label: t.label, icon: s.tab === t.id ? t.icon.replace('ph ph-', 'ph-fill ph-') : t.icon, fg: s.tab === t.id ? 'var(--color-accent-800)' : 'var(--color-neutral-600)', go: () => this.setState({ tab: t.id }) }));

    let sheet = null;
    const sm = s.sheetId ? this.findMs(s.sheetId) : null;
    if (sm) {
      const c = s.progress[sm.id] || 0;
      sheet = {
        d: DOMAIN_NAMES[sm.d], t: sm.t, why: sm.why, stageLabel: sm.stage.sub, tips: sm.tips,
        hasRange: !!sm.range, range: sm.range, src: sm.src || 'Not sourced — general parenting guidance',
        levels: sm.lv.map((label, i) => {
          const on = i < c;
          return {
            label: label, when: i === c - 1 ? 'current' : '',
            pick: () => this.setLevel(sm, i),
            bg: on ? '#fdf4d8' : '#fbf9f4', bc: on ? 'var(--color-accent-400)' : 'var(--color-neutral-300)',
            fg: on ? 'var(--color-text)' : 'var(--color-neutral-700)',
            dotBc: on ? 'var(--color-accent-700)' : 'var(--color-neutral-400)',
            dotBg: on ? 'var(--color-accent-800)' : 'transparent',
            dotIcon: on ? 'ph-fill ph-check' : '',
          };
        }),
        note: s.notes[sm.id] || '',
        setNote: e => { const v = e.target.value; this.save({ notes: Object.assign({}, s.notes, { [sm.id]: v }) }); },
        photoLabel: s.photos[sm.id] ? 'Photo added · tap to remove' : 'Add a photo from the day',
        photoIcon: s.photos[sm.id] ? 'ph-fill ph-image' : 'ph ph-camera',
        photoBorder: s.photos[sm.id] ? 'solid' : 'dashed',
        photoBg: s.photos[sm.id] ? 'linear-gradient(150deg,#fdf1cf,#f6f1e4)' : 'transparent',
        togglePhoto: () => { const p = Object.assign({}, s.photos); if (p[sm.id]) delete p[sm.id]; else p[sm.id] = 1; this.save({ photos: p }); },
      };
    }

    let act = null;
    const sa = s.actId ? acts.find(a => a.id === s.actId) : null;
    if (sa) {
      const exp = sa.k === 'exp';
      const r = s.results[sa.id];
      const linked = sa.link ? this.findMs(sa.link) : null;
      act = {
        t: sa.t, body: sa.body, meta: sa.dur, kind: exp ? 'Experiment' : 'Play technique',
        chips: domChips(sa), dev: devOf(sa), hasDev: !!devOf(sa),
        icon: exp ? 'ph ph-flask' : 'ph ph-hand-heart',
        iconFg: exp ? 'var(--color-accent-700)' : 'var(--color-neutral-600)',
        kindFg: exp ? 'var(--color-accent-700)' : 'var(--color-neutral-600)',
        steps: sa.steps.map((text, i) => ({ n: i + 1, text: text })),
        isExp: exp, hasOutcomes: true, note: r ? r.note : '',
        outcomeLabel: exp ? 'What happened?' : 'Did you try it?',
        notePlaceholder: exp ? 'What happened?' : 'How did it go?',
        setNote: e => { const v = e.target.value; const results = Object.assign({}, s.results); results[sa.id] = Object.assign({ o: 'loved', when: 'today' }, results[sa.id], { note: v }); this.save({ results: results }); },
        outcomes: outcomesFor(sa).map(o => {
          const on = r && r.o === o.id;
          return { label: o.label, pick: () => this.setResult(sa, o.id), bg: on ? 'var(--color-accent-300)' : 'transparent', bc: on ? 'var(--color-accent-500)' : 'var(--color-neutral-300)', fg: on ? 'var(--color-accent-900)' : 'var(--color-neutral-600)' };
        }),
        hasSrc: !!sa.src, src: sa.src || '',
        hasLink: !!linked, linkTitle: linked ? linked.t : '',
        openLink: () => this.setState({ actId: null, sheetId: linked.id, tab: 'timeline' }),
      };
    }

    const confetti = s.celebrate ? Array.from({ length: 18 }, (_, i) => ({
      left: (4 + (i * 5.4) % 92).toFixed(1) + '%',
      size: (5 + (i % 3) * 3) + 'px',
      radius: i % 3 === 0 ? '50%' : '1px',
      color: ['#efd171', '#dfb44a', '#f6e3a8', '#cfc7b5'][i % 4],
      dur: (1.5 + (i % 5) * 0.28).toFixed(2) + 's',
      delay: ((i % 7) * 0.13).toFixed(2) + 's',
    })) : [];

    return {
      childName: childName, firstName: firstName, initial: firstName.slice(0, 1).toUpperCase(),
      ageLine: ageLine,
      isAuth: s.screen === 'auth', isChildForm: s.screen === 'child',
      signInGoogle: () => this.beginProfile('google'),
      signInLocal: () => this.beginProfile('local'),
      loadSample: () => this.loadSample(),
      openProfile: () => this.beginProfile(),
      cancelProfile: () => this.setState({ screen: 'app' }),
      canCancel: !!p,
      accountLine: this.state.pendingAccount === 'google' ? 'Signed in with Google' : 'Stored on this phone',
      formTitle: p ? 'Edit ' + firstName + '\u2019s details' : 'Who are we following?',
      draftName: s.draft.name, setDraftName: e => this.setState({ draft: Object.assign({}, s.draft, { name: e.target.value }) }),
      draftDate: s.draft.date, setDraftDate: e => this.setState({ draft: Object.assign({}, s.draft, { date: e.target.value }) }),
      dateLabel: s.draft.status === 'expecting' ? 'Due date' : 'Date of birth',
      dateHint: s.draft.status === 'expecting' ? 'The thread starts in the second trimester and follows the pregnancy along.' : 'This sets where the thread opens. You can change it later.',
      statusOpts: STATUSES.map(o => {
        const on = s.draft.status === o.id;
        return { label: o.label, pick: () => this.setState({ draft: Object.assign({}, s.draft, { status: o.id }) }), bg: on ? 'var(--color-accent-200)' : 'var(--color-surface)', bc: on ? 'var(--color-accent-500)' : 'var(--color-neutral-300)', fg: on ? 'var(--color-accent-900)' : 'var(--color-neutral-700)' };
      }),
      genderOpts: GENDERS.map(o => {
        const on = s.draft.gender === o.id;
        return { label: o.label, pick: () => this.setState({ draft: Object.assign({}, s.draft, { gender: o.id }) }), bg: on ? 'var(--color-accent-200)' : 'var(--color-surface)', bc: on ? 'var(--color-accent-500)' : 'var(--color-neutral-300)', fg: on ? 'var(--color-accent-900)' : 'var(--color-neutral-700)' };
      }),
      saveProfile: () => this.commitProfile(),
      saveLabel: p ? 'Save' : 'Start the thread',
      saveBg: canSave ? 'var(--color-accent-500)' : 'var(--color-neutral-200)',
      saveBc: canSave ? 'var(--color-accent-600)' : 'var(--color-neutral-300)',
      saveFg: canSave ? '#332e23' : 'var(--color-neutral-500)',
      saveCursor: canSave ? 'pointer' : 'default',
      startedCount: started, totalCount: all.length,
      isTimeline: s.tab === 'timeline', isPlay: s.tab === 'play', isLog: s.tab === 'log', isProgress: s.tab === 'progress',
      stages: stages, scrubber: scrubber, tabs: tabs, playFilters: playFilters, playList: playList, expList: expList,
      todayKicker: today ? 'Today · ' + today.dur.split(' · ')[0] : 'Today',
      todayTitle: today ? today.t : '',
      todayMeta: today ? (todayLink ? 'Supports: ' + todayLink.t : today.dur) : '',
      openToday: () => this.setState({ actId: today ? today.id : null }),
      scrollRef: el => { this.scrollEl = el; },
      ringDash: (Math.round(pct * 270)) + ' 270', ringPct: Math.round(pct * 100) + '%',
      progressHeadline: firstName + ' is in the ' + ((STAGES.find(st => st.id === currentStage) || {}).sub || '') + ' stretch',
      progressBlurb: doneLevels + ' levels logged across ' + started + ' milestones. ' + weakest.name + ' has the most still open' + (weakActs ? ' — the play tab has ' + weakActs + ' things for it.' : '.'),
      domainStats: domainStats, wins: wins, hasWins: wins.length > 0, noWins: wins.length === 0, memories: memories,
      sheet: sheet, act: act, celebrate: s.celebrate, confetti: confetti,
      closeSheet: () => this.setState({ sheetId: null }),
      closeAct: () => this.setState({ actId: null }),
      dismissCelebrate: () => this.setState({ celebrate: null }),
    };
  }
}

