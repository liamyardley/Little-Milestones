import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, shadowLg } from '../theme';

/**
 * Bottom sheet with a scrim. `tall` fills the screen bar a strip at the top
 * (the milestone sheet); otherwise it grows to at most 82% (the activity sheet).
 */
export default function Sheet({ visible, onClose, tall = false, children }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.fill}>
        <Pressable style={styles.scrim} onPress={onClose} />
        <View
          style={[
            styles.sheet,
            shadowLg,
            tall ? { top: insets.top + 24, bottom: 0 } : { maxHeight: '82%' },
          ]}
        >
          <View style={styles.grabberRow}>
            <View style={styles.grabber} />
          </View>
          <ScrollView
            contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 28 }]}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: C.scrim },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: C.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  grabberRow: { paddingTop: 9, alignItems: 'center' },
  grabber: { width: 36, height: 4, borderRadius: 3, backgroundColor: C.neutral400 },
  body: { paddingHorizontal: 18, paddingTop: 14 },
});
