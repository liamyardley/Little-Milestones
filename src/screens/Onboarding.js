import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { Body, Button } from '../components/ui';
import { C, FONT, G, R } from '../theme';

export default function Onboarding({ onStart, onSample, onRestore, drive }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={G.onboarding} locations={[0, 0.55]} style={styles.fill}>
      <View style={[styles.inner, { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 28 }]}>
        <View style={styles.mark}>
          <Icon name="path" size={24} color={C.accent800} />
        </View>

        <Text style={styles.wordmark}>Thread</Text>
        <Body size={13} style={styles.blurb}>
          Every milestone from the second trimester to three years, with something useful to do at each one.
        </Body>

        <View style={{ flex: 1 }} />

        <Button label="Start the thread" onPress={onStart} style={{ paddingVertical: 15 }} />
        <Body size={10.5} color={C.neutral600} style={styles.note}>
          Everything stays on this phone. No account, nothing shared.
        </Body>

        {drive.configured && (
          <>
            <Pressable
              onPress={onRestore}
              disabled={!!drive.busy}
              style={({ pressed }) => [styles.secondary, { opacity: pressed || drive.busy ? 0.6 : 1 }]}
            >
              {drive.busy ? (
                <ActivityIndicator size="small" color={C.neutral600} />
              ) : (
                <Icon name="cloud" size={16} color={C.neutral700} />
              )}
              <Text style={styles.secondaryText}>
                {drive.busy || 'Restore from a Google Drive backup'}
              </Text>
            </Pressable>
            <Body size={10.5} color={C.neutral600} style={styles.note}>
              Only if you backed up a thread from another phone.
            </Body>
          </>
        )}

        {!!drive.error && (
          <Body size={10.5} color={C.accent800} style={styles.note}>{drive.error}</Body>
        )}

        <View style={styles.sampleRow}>
          <Pressable onPress={onSample}>
            <Text style={styles.sample}>Have a look around with sample data</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 26 },
  mark: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: C.accent300, borderWidth: 1, borderColor: C.accent400,
    alignItems: 'center', justifyContent: 'center',
  },
  wordmark: {
    fontFamily: FONT.medium, fontSize: 30, letterSpacing: -0.9,
    lineHeight: 33, marginTop: 26, color: C.text,
  },
  blurb: { marginTop: 11, maxWidth: 280 },
  note: { marginTop: 9, textAlign: 'center' },
  secondary: {
    marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
    borderWidth: 1, borderColor: C.neutral300, borderRadius: R.md, paddingVertical: 13,
  },
  secondaryText: { fontFamily: FONT.regular, fontSize: 13, color: C.neutral700 },
  sampleRow: { alignItems: 'center', marginTop: 22 },
  sample: {
    fontFamily: FONT.regular, fontSize: 11, color: C.accent800,
    borderBottomWidth: 1, borderBottomColor: C.accent400, paddingBottom: 1,
  },
});
