import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from './Icon';
import Sheet from './Sheet';
import { Body, Button, Field, Kicker, Title } from './ui';
import { DOMAIN_NAMES } from '../data/content';
import { photoUri } from '../lib/storage';
import { C, FONT, R } from '../theme';

const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      'Photo access is off',
      'Little Milestones needs permission to your photos to attach one to a milestone. You can turn it on in Settings.',
    );
    return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
    allowsEditing: true,
  });
  if (result.canceled || !result.assets?.length) return null;
  return result.assets[0].uri;
};

export default function MilestoneSheet({
  milestone, count, note, photo, firstName,
  onClose, onSetLevel, onSetNote, onAddPhoto, onClearPhoto,
}) {
  if (!milestone) return null;
  const uri = photoUri(photo);

  const onPhotoPress = async () => {
    if (uri) {
      Alert.alert('Remove this photo?', 'It will be deleted from Little Milestones.', [
        { text: 'Keep it', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onClearPhoto },
      ]);
      return;
    }
    const picked = await pickImage();
    if (picked) onAddPhoto(picked);
  };

  return (
    <Sheet visible tall onClose={onClose}>
      <View style={styles.crumbs}>
        <Text style={styles.domain}>{(DOMAIN_NAMES[milestone.d] || milestone.d).toUpperCase()}</Text>
        <View style={styles.dot} />
        <Text style={styles.stage}>{milestone.stage.sub}</Text>
      </View>

      <Title size={21} style={{ marginTop: 8 }}>{milestone.t}</Title>
      <Body size={12} style={{ marginTop: 9 }}>{milestone.why}</Body>

      <Kicker style={styles.section}>Where {firstName} is</Kicker>
      <View style={{ gap: 6 }}>
        {milestone.lv.map((label, i) => {
          const on = i < count;
          return (
            <Pressable
              key={label}
              onPress={() => onSetLevel(i)}
              style={({ pressed }) => [
                styles.level,
                {
                  backgroundColor: on ? C.accent200 : C.tint,
                  borderColor: on ? C.accent400 : C.neutral300,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.levelDot,
                  { borderColor: on ? C.accent700 : C.neutral400, backgroundColor: on ? C.accent800 : 'transparent' },
                ]}
              >
                {on && <Icon name="check" size={9} color={C.accent100} fill />}
              </View>
              <Text style={[styles.levelLabel, { color: on ? C.text : C.neutral700 }]}>{label}</Text>
              {i === count - 1 && <Text style={styles.levelWhen}>current</Text>}
            </Pressable>
          );
        })}
      </View>
      <Body size={10} color={C.neutral600} style={{ marginTop: 8 }}>
        Tap a level to set it — tap the current one again to step back.
      </Body>

      <Kicker style={styles.section}>Try this to support it</Kicker>
      <View style={{ gap: 7 }}>
        {milestone.tips.map(tip => (
          <View key={tip} style={styles.tip}>
            <Icon name="hand-heart" size={12} color={C.accent700} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <Kicker style={styles.section}>Photo &amp; memory</Kicker>
      <Pressable onPress={onPhotoPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
        {uri ? (
          <View style={styles.photoWrap}>
            <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
            <View style={styles.photoBadge}>
              <Icon name="x" size={12} color={C.neutral800} />
            </View>
          </View>
        ) : (
          <View style={styles.photoEmpty}>
            <Icon name="camera" size={19} color={C.neutral600} />
            <Text style={styles.photoLabel}>Add a photo from the day</Text>
          </View>
        )}
      </Pressable>

      <Field
        value={note}
        onChangeText={onSetNote}
        placeholder="A line about the day it happened…"
        style={{ marginTop: 9, fontSize: 11.5 }}
        multiline
      />

      {!!milestone.range && (
        <View style={styles.source}>
          <Body size={11} color={C.neutral600}>{milestone.range}</Body>
          <Body size={9.5} color={C.neutral600} style={{ marginTop: 6 }}>
            Source: {milestone.src || 'Not sourced — general parenting guidance'}
          </Body>
        </View>
      )}

      <Button label="Close" tone="secondary" onPress={onClose} style={{ marginTop: 22 }} />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  crumbs: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  domain: { fontFamily: FONT.regular, fontSize: 8.5, letterSpacing: 0.95, color: C.accent700 },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: C.neutral400 },
  stage: { fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600 },
  section: { marginTop: 22, marginBottom: 9 },

  level: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderRadius: R.md, paddingHorizontal: 12, paddingVertical: 11,
  },
  levelDot: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  levelLabel: { flex: 1, fontFamily: FONT.regular, fontSize: 12.5, lineHeight: 16 },
  levelWhen: { fontFamily: FONT.regular, fontSize: 9.5, color: C.neutral600 },

  tip: {
    flexDirection: 'row', gap: 9, borderWidth: 1, borderColor: C.neutral300,
    borderRadius: R.md, paddingHorizontal: 11, paddingVertical: 10, backgroundColor: C.tint,
  },
  tipText: { flex: 1, fontFamily: FONT.regular, fontSize: 11.5, lineHeight: 17, color: C.neutral800 },

  photoEmpty: {
    height: 112, borderRadius: R.md, borderWidth: 1, borderStyle: 'dashed',
    borderColor: C.neutral300, alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  photoLabel: { fontFamily: FONT.regular, fontSize: 10.5, color: C.neutral600 },
  photoWrap: { borderRadius: R.md, overflow: 'hidden', borderWidth: 1, borderColor: C.neutral300 },
  photo: { width: '100%', height: 180, backgroundColor: C.neutral200 },
  photoBadge: {
    position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: 13,
    backgroundColor: 'rgba(255,253,248,0.9)', alignItems: 'center', justifyContent: 'center',
  },

  source: { marginTop: 22, borderLeftWidth: 2, borderLeftColor: C.accent300, paddingLeft: 11, paddingVertical: 2 },
});
