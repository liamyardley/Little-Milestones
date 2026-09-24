import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateField from '../components/DateField';
import Icon from '../components/Icon';
import { Body, Button, Field, Kicker, Title } from '../components/ui';
import { GENDERS, STATUSES } from '../data/content';
import { C, FONT, R } from '../theme';

const Choice = ({ options, value, onPick, fontSize = 12.5 }) => (
  <View style={styles.choiceRow}>
    {options.map(o => {
      const on = value === o.id;
      return (
        <Pressable
          key={o.id}
          onPress={() => onPick(o.id)}
          style={({ pressed }) => [
            styles.choice,
            {
              backgroundColor: on ? C.accent200 : C.surface,
              borderColor: on ? C.accent500 : C.neutral300,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={{ fontFamily: FONT.regular, fontSize, color: on ? C.accent900 : C.neutral700 }}>
            {o.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export default function ChildForm({ initial, onSave, onCancel }) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState(
    initial
      ? { name: initial.name, status: initial.status, date: initial.date, gender: initial.gender }
      : { name: '', status: 'born', date: '', gender: 'na' },
  );
  const set = (key, value) => setDraft(d => ({ ...d, [key]: value }));
  const expecting = draft.status === 'expecting';
  const canSave = !!(draft.name.trim() && draft.date);

  return (
    <View style={[styles.fill, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {!!onCancel && (
            <Pressable onPress={onCancel} hitSlop={10}>
              <Icon name="arrow-left" size={18} color={C.neutral600} />
            </Pressable>
          )}
          <Kicker>Stored on this phone</Kicker>
        </View>
        <Title size={24} style={{ marginTop: 14 }}>
          {initial ? `Edit ${initial.name.split(' ')[0]}’s details` : 'Who are we following?'}
        </Title>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Kicker>Name</Kicker>
        <Field
          value={draft.name}
          onChangeText={v => set('name', v)}
          placeholder="What do you call them?"
          style={styles.input}
        />

        <Kicker style={styles.label}>Born yet?</Kicker>
        <Choice options={STATUSES} value={draft.status} onPick={v => set('status', v)} />

        <Kicker style={styles.label}>{expecting ? 'Due date' : 'Date of birth'}</Kicker>
        <DateField
          value={draft.date}
          onChange={v => set('date', v)}
          minimumDate={expecting ? new Date() : undefined}
          maximumDate={expecting ? undefined : new Date()}
        />
        <Body size={10.5} color={C.neutral600} style={{ marginTop: 7 }}>
          {expecting
            ? 'The thread starts in the second trimester and follows the pregnancy along.'
            : 'This sets where the thread opens. You can change it later.'}
        </Body>

        <Kicker style={styles.label}>Gender</Kicker>
        <Choice options={GENDERS} value={draft.gender} onPick={v => set('gender', v)} fontSize={12} />
        <Body size={10.5} color={C.neutral600} style={{ marginTop: 7 }}>
          Only used for how the app refers to them. Milestones are identical.
        </Body>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Button
          label={initial ? 'Save' : 'Start the thread'}
          disabled={!canSave}
          onPress={() => onSave(draft)}
          style={{ paddingVertical: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 22, paddingTop: 34 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  body: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 30 },
  label: { marginTop: 22 },
  input: {
    marginTop: 8, backgroundColor: C.surface, borderColor: C.neutral300,
    borderWidth: 1, borderRadius: R.sm, paddingHorizontal: 12, paddingVertical: 12, fontSize: 14,
  },
  choiceRow: { flexDirection: 'row', gap: 7, marginTop: 8 },
  choice: { flex: 1, borderWidth: 1, borderRadius: R.sm, paddingVertical: 11, alignItems: 'center' },
  footer: { paddingHorizontal: 22, paddingTop: 8 },
});
