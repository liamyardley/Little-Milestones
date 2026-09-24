import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import Sheet from './Sheet';
import { OutcomeRow } from './cards';
import { Body, Button, Chip, Field, Kicker, Title } from './ui';
import { devOf, domChips, findMilestone } from '../data/content';
import { C, FONT, R } from '../theme';

export default function ActivitySheet({
  activity, result, onClose, onOutcome, onSetNote, onOpenMilestone,
}) {
  if (!activity) return null;
  const exp = activity.k === 'exp';
  const dev = devOf(activity);
  const linked = activity.link ? findMilestone(activity.link) : null;
  const tone = exp ? C.accent700 : C.neutral600;

  return (
    <Sheet visible onClose={onClose}>
      <View style={styles.rowCenter}>
        <Icon name={exp ? 'flask' : 'hand-heart'} size={12} color={tone} />
        <Text style={[styles.kind, { color: tone }]}>{exp ? 'Experiment' : 'Play technique'}</Text>
        <Text style={styles.meta}>{activity.dur}</Text>
      </View>

      <Title size={20} style={{ marginTop: 8 }}>{activity.t}</Title>

      <View style={styles.chipWrap}>
        {domChips(activity).map(c => <Chip key={c.key} chip={c} />)}
      </View>

      <Body size={12} style={{ marginTop: 10 }}>{activity.body}</Body>

      {!!dev && (
        <View style={styles.devBox}>
          <Kicker color={C.accent800}>What it helps with</Kicker>
          <Body size={11.5} color={C.neutral800} style={{ marginTop: 5 }}>{dev}</Body>
        </View>
      )}

      <Kicker style={styles.section}>How</Kicker>
      <View style={{ gap: 8 }}>
        {activity.steps.map((text, i) => (
          <View key={text} style={styles.step}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{text}</Text>
          </View>
        ))}
      </View>

      <Kicker style={styles.section}>{exp ? 'What happened?' : 'Did you try it?'}</Kicker>
      <OutcomeRow
        activity={activity}
        result={result}
        onPick={onOutcome}
        size={11}
        style={{ marginTop: 0 }}
      />
      <Field
        value={result ? result.note : ''}
        onChangeText={onSetNote}
        placeholder={exp ? 'What happened?' : 'How did it go?'}
        style={{ marginTop: 9, fontSize: 11.5 }}
        multiline
      />

      {!!linked && (
        <>
          <Kicker style={styles.section}>Supports</Kicker>
          <Pressable
            onPress={() => onOpenMilestone(linked.id)}
            style={({ pressed }) => [styles.link, { opacity: pressed ? 0.8 : 1 }]}
          >
            <Icon name="path" size={12} color={C.accent800} />
            <Text style={styles.linkText}>{linked.t}</Text>
            <Icon name="caret-right" size={12} color={C.neutral600} />
          </Pressable>
        </>
      )}

      {!!activity.src && (
        <View style={styles.source}>
          <Body size={10.5} color={C.neutral600}>Basis: {activity.src}</Body>
        </View>
      )}

      <Button label="Close" tone="secondary" onPress={onClose} style={{ marginTop: 20 }} />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  kind: { fontFamily: FONT.regular, fontSize: 8.5, letterSpacing: 0.95, textTransform: 'uppercase' },
  meta: { marginLeft: 'auto', fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 9 },
  section: { marginTop: 20, marginBottom: 9 },

  devBox: {
    marginTop: 12, paddingHorizontal: 12, paddingVertical: 11, borderRadius: R.md,
    backgroundColor: C.tintWarm, borderWidth: 1, borderColor: C.accent200,
  },

  step: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  stepNum: {
    width: 19, height: 19, borderRadius: 10, borderWidth: 1, borderColor: C.neutral400,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumText: { fontFamily: FONT.regular, fontSize: 10, color: C.neutral700 },
  stepText: { flex: 1, fontFamily: FONT.regular, fontSize: 11.5, lineHeight: 17, color: C.neutral800 },

  link: {
    flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1,
    borderColor: C.accent300, borderRadius: R.md, paddingHorizontal: 12,
    paddingVertical: 11, backgroundColor: '#fdf6e2',
  },
  linkText: { flex: 1, fontFamily: FONT.regular, fontSize: 12, lineHeight: 16, color: C.text },

  source: {
    marginTop: 20, borderLeftWidth: 2, borderLeftColor: C.accent300,
    paddingLeft: 11, paddingVertical: 2,
  },
});
