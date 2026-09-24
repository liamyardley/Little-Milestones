import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../components/Icon';
import { OutcomeRow } from '../../components/cards';
import { Body, Field } from '../../components/ui';
import { allActivities } from '../../data/content';
import { relativeWhen } from '../../lib/format';
import { C, FONT, R } from '../../theme';

export default function Experiments({ results, onOpenActivity, onOutcome, onNote }) {
  const list = allActivities().filter(a => a.k === 'exp');
  return (
    <View style={styles.wrap}>
      <Body size={11} color={C.neutral600} style={{ marginBottom: 14 }}>
        Little experiments, and what happened when you tried them. There is no failing — “not yet”
        is data too.
      </Body>

      <View style={{ gap: 10 }}>
        {list.map(a => {
          const r = results[a.id];
          return (
            <View key={a.id} style={[styles.card, { borderColor: r ? C.accent300 : C.neutral300 }]}>
              <Pressable
                onPress={() => onOpenActivity(a.id)}
                style={({ pressed }) => [styles.head, { opacity: pressed ? 0.8 : 1 }]}
              >
                <View style={styles.rowCenter}>
                  <Icon name="flask" size={11} color={C.accent700} />
                  <Text style={styles.kind}>Experiment</Text>
                  <Text style={styles.stage}>{a.stage.sub}</Text>
                </View>
                <Text style={styles.title}>{a.t}</Text>
              </Pressable>

              <View style={styles.foot}>
                <OutcomeRow
                  activity={a}
                  result={r}
                  onPick={oid => onOutcome(a, oid)}
                  style={{ marginTop: 0 }}
                />
                {!!r && (
                  <>
                    <Field
                      value={r.note}
                      onChangeText={v => onNote(a.id, v)}
                      placeholder="What happened?"
                      style={{ marginTop: 9, fontSize: 11 }}
                      multiline
                    />
                    <Body size={9.5} color={C.neutral600} style={{ marginTop: 6 }}>
                      Logged {relativeWhen(r.at)}
                    </Body>
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 16 },
  card: { borderWidth: 1, borderRadius: R.md, backgroundColor: C.surface, overflow: 'hidden' },
  head: { paddingHorizontal: 13, paddingTop: 12, paddingBottom: 11 },
  foot: { paddingHorizontal: 13, paddingBottom: 12 },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  kind: {
    fontFamily: FONT.regular, fontSize: 8.5, letterSpacing: 0.95,
    textTransform: 'uppercase', color: C.accent700,
  },
  stage: { marginLeft: 'auto', fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600 },
  title: { fontFamily: FONT.medium, fontSize: 13.5, lineHeight: 17, marginTop: 6, color: C.text },
});
