import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from './Icon';
import { Button } from './ui';
import { fmtDate } from '../lib/format';
import { C, FONT, R } from '../theme';

/**
 * Date field backed by the platform picker. Metro swaps in `DateField.web.js`
 * for web, where this package has no implementation.
 *
 * `value` and `onChange` speak ISO `YYYY-MM-DD`, the shape the profile stores.
 */
export default function DateField({ value, onChange, minimumDate, maximumDate }) {
  const [picking, setPicking] = useState(false);

  const handle = (event, selected) => {
    // Android's dialog closes itself; iOS's inline picker stays until dismissed.
    if (Platform.OS !== 'ios') setPicking(false);
    if (event.type === 'dismissed') return;
    if (selected) onChange(selected.toISOString().slice(0, 10));
  };

  return (
    <View>
      <Pressable onPress={() => setPicking(true)} style={styles.field}>
        <Text style={[styles.text, { color: value ? C.text : C.neutral500 }]}>
          {value ? fmtDate(value) : 'Choose a date'}
        </Text>
        <Icon name="caret-right" size={14} color={C.neutral500} />
      </Pressable>

      {picking && (
        <DateTimePicker
          value={value ? new Date(`${value}T00:00:00`) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handle}
        />
      )}
      {picking && Platform.OS === 'ios' && (
        <Button label="Done" tone="secondary" onPress={() => setPicking(false)} style={{ marginTop: 8 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginTop: 8,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.neutral300,
    borderRadius: R.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: { fontFamily: FONT.regular, fontSize: 14 },
});
