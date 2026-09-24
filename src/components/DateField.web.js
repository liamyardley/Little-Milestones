import React from 'react';
import { C, FONT, R } from '../theme';

// @react-native-community/datetimepicker ships no web implementation, so on web
// the field falls back to the browser's own date input. react-native-web renders
// through react-dom, so a plain <input> is valid here.
//
// Same contract as the native DateField: ISO `YYYY-MM-DD` in and out.

const iso = d => (d instanceof Date ? d.toISOString().slice(0, 10) : undefined);

export default function DateField({ value, onChange, minimumDate, maximumDate }) {
  return (
    <input
      type="date"
      value={value || ''}
      min={iso(minimumDate)}
      max={iso(maximumDate)}
      onChange={e => onChange(e.target.value)}
      style={{
        marginTop: 8,
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: C.surface,
        border: `1px solid ${C.neutral300}`,
        borderRadius: R.sm,
        padding: '12px',
        fontFamily: `${FONT.regular}, Inter, system-ui, sans-serif`,
        fontSize: 14,
        color: value ? C.text : C.neutral500,
        outline: 'none',
      }}
    />
  );
}
