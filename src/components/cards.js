import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { Chip } from './ui';
import { domChips, devOf, outcomesFor } from '../data/content';
import { relativeWhen } from '../lib/format';
import { C, FONT, G, R } from '../theme';

const kindOf = a => (a.k === 'exp'
  ? { label: 'Experiment', icon: 'flask', color: C.accent700 }
  : { label: 'Play', icon: 'hand-heart', color: C.neutral600 });

/** Thin bar per level, filled up to the level logged. */
const Pips = ({ levels, count, done }) => (
  <View style={styles.pips}>
    {levels.map((_, i) => (
      <View
        key={i}
        style={[
          styles.pip,
          { backgroundColor: i < count ? (done ? C.accent : C.accent500) : C.neutral300 },
        ]}
      />
    ))}
  </View>
);

export const MilestoneCard = ({ milestone, count, onPress, align = 'right' }) => {
  const done = count === milestone.lv.length;
  const right = align === 'right';
  const Wrapper = done ? LinearGradient : View;
  const wrapperProps = done
    ? { colors: G.milestoneDone, start: { x: 0.1, y: 0 }, end: { x: 0.9, y: 1 } }
    : {};

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
      <Wrapper
        {...wrapperProps}
        style={[
          styles.msCard,
          {
            borderColor: done ? C.accent400 : count > 0 ? C.neutral400 : C.neutral300,
            backgroundColor: done ? undefined : C.surface,
          },
        ]}
      >
        <Text style={[styles.msDomain, right && styles.right]}>{milestone.d.toUpperCase()}</Text>
        <Text style={[styles.msTitle, right && styles.right, { color: count > 0 ? C.text : C.neutral800 }]}>
          {milestone.t}
        </Text>
        <Pips levels={milestone.lv} count={count} done={done} />
        <Text
          style={[
            styles.msStatus,
            right && styles.right,
            { color: count === 0 ? C.neutral600 : done ? C.accent800 : C.neutral700 },
          ]}
        >
          {count === 0 ? 'Not logged' : milestone.lv[count - 1]}
        </Text>
        {done && (
          <View style={styles.doneBadge}>
            <Icon name="check" size={9} color={C.accent900} fill />
          </View>
        )}
      </Wrapper>
    </Pressable>
  );
};

/** Compact activity card, as it appears alongside the thread. */
export const ActivityCard = ({ activity, result, onPress }) => {
  const kind = kindOf(activity);
  const chips = domChips(activity);
  const outcome = result && (outcomesFor(activity).find(o => o.id === result.o) || {}).label;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
      <View
        style={[
          styles.actCard,
          {
            borderColor: result ? C.accent400 : C.neutral300,
            backgroundColor: result ? '#fdf8ea' : 'transparent',
          },
        ]}
      >
        <View style={styles.rowCenter}>
          <Icon name={kind.icon} size={10} color={kind.color} />
          <Text style={[styles.kindLabel, { color: kind.color }]}>{kind.label}</Text>
        </View>
        <Text style={styles.actTitle}>{activity.t}</Text>
        <View style={styles.chipWrap}>
          {chips.map(c => <Chip key={c.key} chip={c} />)}
        </View>
        <Text style={styles.actMeta}>{outcome ? `${outcome} · logged` : activity.dur}</Text>
      </View>
    </Pressable>
  );
};

/** Full-width activity card used on the Play tab, with inline outcome pills. */
export const PlayCard = ({ activity, result, onPress, onOutcome }) => {
  const kind = kindOf(activity);
  const chips = domChips(activity);
  const dev = devOf(activity);
  const outcome = result && (outcomesFor(activity).find(o => o.id === result.o) || {}).label;
  return (
    <View style={styles.playCard}>
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
        <View style={styles.rowCenter}>
          <Icon name={kind.icon} size={11} color={kind.color} />
          <Text style={[styles.kindLabel, { color: kind.color }]}>{kind.label}</Text>
          <Text style={styles.stageLabel}>{activity.stage.sub}</Text>
        </View>
        <Text style={styles.playTitle}>{activity.t}</Text>
        <View style={styles.chipWrap}>
          {chips.map(c => <Chip key={c.key} chip={c} />)}
        </View>
        <Text style={styles.playBody}>{activity.body}</Text>
        {!!dev && (
          <View style={styles.devBox}>
            <Icon name="sparkle" size={10} color={C.accent800} />
            <Text style={styles.devText}>{dev}</Text>
          </View>
        )}
        <Text style={styles.actMeta}>
          {outcome ? `${outcome} · ${relativeWhen(result.at)}` : activity.dur}
        </Text>
      </Pressable>
      <OutcomeRow activity={activity} result={result} onPick={onOutcome} />
    </View>
  );
};

export const OutcomeRow = ({ activity, result, onPick, size = 10, style }) => (
  <View style={[styles.outcomeRow, style]}>
    {outcomesFor(activity).map(o => {
      const on = result && result.o === o.id;
      return (
        <Pressable
          key={o.id}
          onPress={() => onPick(o.id)}
          style={({ pressed }) => [
            styles.outcome,
            {
              backgroundColor: on ? C.accent300 : 'transparent',
              borderColor: on ? C.accent500 : C.neutral300,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={{ fontFamily: FONT.regular, fontSize: size, color: on ? C.accent900 : C.neutral600 }}>
            {o.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);


const styles = StyleSheet.create({
  right: { textAlign: 'right' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 5 },

  msCard: {
    borderWidth: 1,
    borderRadius: R.md,
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 8,
  },
  msDomain: { fontFamily: FONT.regular, fontSize: 8.5, letterSpacing: 0.95, color: C.neutral600 },
  msTitle: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 15.6, marginTop: 3 },
  msStatus: { fontFamily: FONT.regular, fontSize: 9.5, marginTop: 5 },
  pips: { flexDirection: 'row', gap: 3, marginTop: 7 },
  pip: { flex: 1, height: 3, borderRadius: 2 },
  doneBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.accent300,
    borderWidth: 1,
    borderColor: C.accent500,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: R.md,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  kindLabel: { fontFamily: FONT.regular, fontSize: 8.5, letterSpacing: 0.95, textTransform: 'uppercase' },
  actTitle: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 15.6, marginTop: 4, color: C.text },
  actMeta: { fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600, marginTop: 6 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 5 },

  playCard: {
    borderWidth: 1,
    borderColor: C.neutral300,
    borderRadius: R.md,
    padding: 13,
    backgroundColor: C.surface,
  },
  stageLabel: { marginLeft: 'auto', fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600 },
  playTitle: { fontFamily: FONT.medium, fontSize: 13.5, lineHeight: 17, marginTop: 6, color: C.text },
  playBody: { fontFamily: FONT.regular, fontSize: 11, lineHeight: 16, color: C.neutral700, marginTop: 7 },
  devBox: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: R.sm,
    backgroundColor: C.tintWarm,
    borderWidth: 1,
    borderColor: C.accent200,
  },
  devText: { flex: 1, fontFamily: FONT.regular, fontSize: 10.5, lineHeight: 15, color: C.neutral800 },

  outcomeRow: { flexDirection: 'row', gap: 6, marginTop: 9 },
  outcome: { flex: 1, borderWidth: 1, borderRadius: R.pill, paddingVertical: 6, alignItems: 'center' },
});
