import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { C, FONT, R } from '../theme';

/** Uppercase micro-label the design uses above every section. */
export const Kicker = ({ children, color = C.neutral600, style }) => (
  <Text style={[s.kicker, { color }, style]}>{children}</Text>
);

export const Body = ({ children, size = 12, color = C.neutral700, style }) => (
  <Text style={[{ fontFamily: FONT.regular, fontSize: size, lineHeight: size * 1.5, color }, style]}>
    {children}
  </Text>
);

export const Title = ({ children, size = 20, style }) => (
  <Text style={[{ fontFamily: FONT.medium, fontSize: size, lineHeight: size * 1.2, letterSpacing: -0.02 * size, color: C.text }, style]}>
    {children}
  </Text>
);

/** Rounded outline button used for filters, levels and outcomes. */
export const Pill = ({ label, active, onPress, style, textStyle, size = 10.5 }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      s.pill,
      {
        backgroundColor: active ? C.accent200 : 'transparent',
        borderColor: active ? C.accent400 : C.neutral300,
        opacity: pressed ? 0.65 : 1,
      },
      style,
    ]}
  >
    <Text style={[s.pillText, { fontSize: size, color: active ? C.accent900 : C.neutral600 }, textStyle]}>
      {label}
    </Text>
  </Pressable>
);

export const Chip = ({ chip }) => (
  <View style={[s.chip, { backgroundColor: chip.bg, borderColor: chip.bc }]}>
    <Text style={[s.chipText, { color: chip.fg }]}>{chip.label}</Text>
  </View>
);

export const Field = ({ value, onChangeText, placeholder, style, ...rest }) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={C.neutral500}
    style={[s.field, style]}
    {...rest}
  />
);

/** Full-width action button; dims itself when disabled. */
export const Button = ({ label, onPress, disabled, tone = 'primary', style }) => {
  const primary = tone === 'primary';
  const bg = disabled ? C.neutral200 : primary ? C.accent500 : 'transparent';
  const bc = disabled ? C.neutral300 : primary ? C.accent600 : C.neutral400;
  const fg = disabled ? C.neutral500 : primary ? C.text : C.neutral800;
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        s.button,
        { backgroundColor: bg, borderColor: bc, opacity: pressed && !disabled ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[s.buttonText, { color: fg, fontFamily: primary ? FONT.medium : FONT.regular }]}>
        {label}
      </Text>
    </Pressable>
  );
};

export const Divider = ({ style }) => <View style={[{ height: 1, backgroundColor: C.divider }, style]} />;

const s = StyleSheet.create({
  kicker: { fontFamily: FONT.regular, fontSize: 9, letterSpacing: 1.1, textTransform: 'uppercase' },
  pill: { borderRadius: R.pill, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' },
  pillText: { fontFamily: FONT.regular },
  chip: { borderRadius: R.pill, borderWidth: 1, paddingVertical: 2.5, paddingHorizontal: 7 },
  chipText: { fontFamily: FONT.regular, fontSize: 9, letterSpacing: 0.3 },
  field: {
    backgroundColor: C.tint,
    borderWidth: 1,
    borderColor: C.neutral300,
    borderRadius: R.sm,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontFamily: FONT.regular,
    fontSize: 12,
    color: C.text,
  },
  button: { borderWidth: 1, borderRadius: R.md, paddingVertical: 13, alignItems: 'center' },
  buttonText: { fontSize: 13.5 },
});
