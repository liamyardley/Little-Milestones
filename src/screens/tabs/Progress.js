import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import Icon from '../../components/Icon';
import { Body, Kicker } from '../../components/ui';
import {
  DOMAINS, DOMAIN_NAMES, STAGES, allActivities, allMilestones,
} from '../../data/content';
import { photoUri } from '../../lib/storage';
import { C, FONT, G, R } from '../../theme';

const RING = 78;
const RADIUS = 43;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// The design draws a 270-unit arc on a 100-unit viewBox circle.
const ARC = 270;

const Ring = ({ pct }) => (
  <View style={{ width: RING, height: RING }}>
    <Svg width={RING} height={RING} viewBox="0 0 100 100" style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle cx="50" cy="50" r={RADIUS} fill="none" stroke={C.ringTrack} strokeWidth="7" />
      <Circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke={C.ringFill}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${(pct * ARC).toFixed(1)} ${CIRCUMFERENCE}`}
      />
    </Svg>
    <View style={styles.ringLabel}>
      <Text style={styles.ringPct}>{Math.round(pct * 100)}%</Text>
      <Text style={styles.ringSub}>TO DATE</Text>
    </View>
  </View>
);

export default function Progress({
  progress, photos, currentStage, firstName, onOpenMilestone,
}) {
  const all = allMilestones();

  let totalLevels = 0;
  let doneLevels = 0;
  all.forEach(m => {
    totalLevels += m.lv.length;
    doneLevels += Math.min(progress[m.id] || 0, m.lv.length);
  });
  const pct = totalLevels ? doneLevels / totalLevels : 0;
  const started = all.filter(m => (progress[m.id] || 0) > 0).length;

  const domainStats = DOMAINS.map(d => {
    const set = all.filter(m => m.d === d);
    const count = set.filter(m => (progress[m.id] || 0) > 0).length;
    return {
      key: d,
      name: DOMAIN_NAMES[d],
      label: `${count} of ${set.length}`,
      ratio: set.length ? count / set.length : 0,
    };
  });
  const weakest = domainStats.slice().sort((a, b) => a.ratio - b.ratio)[0];
  const weakIds = all.filter(m => m.d === weakest.key).map(m => m.id);
  const weakActs = allActivities().filter(a => a.link && weakIds.includes(a.link)).length;

  const wins = all
    .filter(m => (progress[m.id] || 0) === m.lv.length)
    .slice(-4)
    .reverse();

  const photoIds = Object.keys(photos);
  const memories = [0, 1, 2, 3, 4, 5].map(i => {
    const id = photoIds[i];
    const milestone = id ? all.find(m => m.id === id) : null;
    return milestone ? { id, milestone, uri: photoUri(photos[id]) } : null;
  });

  const stageSub = (STAGES.find(st => st.id === currentStage) || {}).sub || '';

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={G.progressCard}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.hero}
      >
        <Ring pct={pct} />
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>{firstName} is in the {stageSub} stretch</Text>
          <Body size={11} color={C.neutral600} style={{ marginTop: 5 }}>
            {doneLevels} levels logged across {started} milestones. {weakest.name} has the most still
            open{weakActs ? ` — the play tab has ${weakActs} things for it.` : '.'}
          </Body>
        </View>
      </LinearGradient>

      <Kicker style={styles.section}>By area</Kicker>
      <View style={{ gap: 11 }}>
        {domainStats.map(d => (
          <View key={d.key}>
            <View style={styles.barHead}>
              <Text style={styles.barName}>{d.name}</Text>
              <Text style={styles.barCount}>{d.label}</Text>
            </View>
            <View style={styles.barTrack}>
              <LinearGradient
                colors={G.domainBar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.barFill, { width: `${Math.round(d.ratio * 100)}%` }]}
              />
            </View>
          </View>
        ))}
      </View>

      <Kicker style={styles.section}>Recent wins</Kicker>
      {wins.length > 0 ? (
        <View style={{ gap: 8 }}>
          {wins.map(m => (
            <Pressable
              key={m.id}
              onPress={() => onOpenMilestone(m.id)}
              style={({ pressed }) => [styles.win, { opacity: pressed ? 0.8 : 1 }]}
            >
              <View style={styles.winMark}>
                <Icon name="check" size={10} color={C.accent800} fill />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.winTitle}>{m.t}</Text>
                <Text style={styles.winSub}>{m.lv[m.lv.length - 1]} · {m.stage.sub}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <Body size={11} color={C.neutral600}>
          Nothing marked off yet. Tap any milestone on the thread to log a first.
        </Body>
      )}

      <Kicker style={styles.section}>Memories</Kicker>
      <View style={styles.memoryGrid}>
        {memories.map((mem, i) => (
          <Pressable
            key={mem ? mem.id : `empty-${i}`}
            onPress={() => mem && onOpenMilestone(mem.id)}
            style={styles.memoryCell}
          >
            {mem && mem.uri ? (
              <Image source={{ uri: mem.uri }} style={styles.memoryImage} resizeMode="cover" />
            ) : (
              <View style={[styles.memoryEmpty, mem && styles.memorySolid]}>
                <Icon name={mem ? 'image' : 'plus'} size={13} color={C.neutral600} fill={!!mem} />
                <Text style={styles.memoryLabel} numberOfLines={2}>
                  {mem ? mem.milestone.t : 'Add'}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.provenance}>
        <Kicker>Where this content comes from</Kicker>
        <Body size={11} color={C.neutral700} style={{ marginTop: 8 }}>
          Milestone ages follow the CDC <Text style={styles.em}>Learn the Signs. Act Early.</Text>{' '}
          checklists as revised with the AAP in 2022 — each listed age is what about 75% of children
          do by then, not a deadline. Gross-motor ranges use the WHO Motor Development Study windows
          of achievement (2006). Experiments name the research they come from. Play ideas draw on
          Montessori, Pikler and treasure-basket practice, and on serve-and-return work from the
          Harvard Center on the Developing Child. Where something is long-established practice rather
          than tested evidence, the card says so.
        </Body>
        <Body size={10.5} color={C.neutral600} style={{ marginTop: 9 }}>
          Not medical advice. If something worries you, speak to your health visitor or GP — and
          expect development screening at around 9, 18 and 30 months.
        </Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 18 },
  hero: {
    borderWidth: 1, borderColor: C.neutral300, borderRadius: R.lg,
    padding: 18, flexDirection: 'row', gap: 16, alignItems: 'center',
  },
  ringLabel: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  ringPct: { fontFamily: FONT.medium, fontSize: 19, letterSpacing: -0.4, color: C.text },
  ringSub: { fontFamily: FONT.regular, fontSize: 8, letterSpacing: 0.8, color: C.neutral600 },
  heroTitle: { fontFamily: FONT.medium, fontSize: 13, lineHeight: 17, color: C.text },

  section: { marginTop: 22, marginBottom: 10 },
  barHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barName: { fontFamily: FONT.regular, fontSize: 11, color: C.text },
  barCount: { fontFamily: FONT.regular, fontSize: 11, color: C.neutral600 },
  barTrack: { height: 4, borderRadius: 3, backgroundColor: C.neutral200, overflow: 'hidden' },
  barFill: { height: 4, borderRadius: 3 },

  win: {
    flexDirection: 'row', gap: 10, alignItems: 'center', borderWidth: 1,
    borderColor: C.neutral300, borderRadius: R.md, paddingHorizontal: 11,
    paddingVertical: 10, backgroundColor: C.surface,
  },
  winMark: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: C.accent200,
    borderWidth: 1, borderColor: C.accent400, alignItems: 'center', justifyContent: 'center',
  },
  winTitle: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 15, color: C.text },
  winSub: { fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600, marginTop: 2 },

  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  memoryCell: { width: '31.5%', aspectRatio: 1, borderRadius: R.md, overflow: 'hidden' },
  memoryImage: { width: '100%', height: '100%', backgroundColor: C.neutral200 },
  memoryEmpty: {
    flex: 1, borderRadius: R.md, borderWidth: 1, borderStyle: 'dashed',
    borderColor: C.neutral300, alignItems: 'center', justifyContent: 'center',
    gap: 4, padding: 6,
  },
  memorySolid: { borderStyle: 'solid', backgroundColor: C.accent200 },
  memoryLabel: { fontFamily: FONT.regular, fontSize: 8.5, lineHeight: 10, color: C.neutral600, textAlign: 'center' },

  provenance: {
    marginTop: 26, borderWidth: 1, borderColor: C.neutral300, borderRadius: R.md,
    padding: 13, backgroundColor: C.surface,
  },
  em: { fontStyle: 'italic' },
});
