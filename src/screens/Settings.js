import React from 'react';
import {
  ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { Body, Button, Kicker, Title } from '../components/ui';
import { relativeWhen } from '../lib/format';
import { C, FONT, R } from '../theme';

const Row = ({ icon, title, subtitle, onPress, disabled, danger, right }) => (
  <Pressable
    onPress={disabled ? undefined : onPress}
    style={({ pressed }) => [styles.row, { opacity: disabled ? 0.45 : pressed ? 0.7 : 1 }]}
  >
    {!!icon && <Icon name={icon} size={16} color={danger ? '#8c3b2f' : C.neutral700} />}
    <View style={{ flex: 1 }}>
      <Text style={[styles.rowTitle, danger && { color: '#8c3b2f' }]}>{title}</Text>
      {!!subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
    </View>
    {right}
  </Pressable>
);

export default function Settings({
  visible, onClose, profile, state, drive, onEditProfile, onBackup, onRestore, onReset, onSetSetting,
}) {
  const insets = useSafeAreaInsets();
  const busy = !!drive.busy;

  const confirmRestore = () => {
    Alert.alert(
      'Replace this thread?',
      'Restoring pulls the backup down from Drive and overwrites what is on this phone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restore', style: 'destructive', onPress: onRestore },
      ],
    );
  };

  const confirmForget = () => {
    Alert.alert(
      'Remove the Drive backup?',
      'Thread deletes everything it has stored in your Drive. What is on this phone is untouched.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => drive.wipeNow() },
      ],
    );
  };

  const confirmReset = () => {
    Alert.alert(
      'Delete everything?',
      'The whole thread — every level, note and photo — is removed from this phone. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onReset },
      ],
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.fill, { paddingTop: insets.top + 12 }]}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={10}>
            <Icon name="arrow-left" size={18} color={C.neutral600} />
          </Pressable>
          <Title size={17}>Settings</Title>
        </View>

        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 40 }]}>
          <Kicker>Child</Kicker>
          <View style={styles.group}>
            <Row
              icon="pencil"
              title={profile ? profile.name : 'Add a child'}
              subtitle={profile ? 'Name, date and how the app refers to them' : undefined}
              onPress={onEditProfile}
              right={<Icon name="caret-right" size={14} color={C.neutral500} />}
            />
          </View>

          <Kicker style={styles.section}>Google Drive backup</Kicker>
          {drive.configured ? (
            <>
              <View style={styles.group}>
                <Row
                  icon={drive.signedIn ? 'cloud-check' : 'cloud'}
                  title={drive.signedIn ? 'Connected to Google Drive' : 'Not connected'}
                  subtitle={
                    state.backedUpAt
                      ? `Last backed up ${relativeWhen(state.backedUpAt)}`
                      : 'Nothing backed up yet'
                  }
                  onPress={drive.signedIn ? drive.signOut : drive.signIn}
                  disabled={busy}
                  right={
                    <Text style={styles.action}>{drive.signedIn ? 'Disconnect' : 'Connect'}</Text>
                  }
                />
                <View style={styles.divider} />
                <Row
                  title="Back up after every change"
                  subtitle="Uploads quietly in the background when something changes."
                  right={
                    <Switch
                      value={!!state.settings.driveBackup}
                      onValueChange={v => onSetSetting('driveBackup', v)}
                      trackColor={{ true: C.accent400, false: C.neutral300 }}
                      thumbColor={C.surface}
                    />
                  }
                />
              </View>

              <View style={[styles.group, { marginTop: 10 }]}>
                <Row
                  icon="cloud"
                  title="Back up now"
                  onPress={onBackup}
                  disabled={busy}
                  right={busy ? <ActivityIndicator size="small" color={C.neutral600} /> : null}
                />
                <View style={styles.divider} />
                <Row icon="download" title="Restore from Drive" onPress={confirmRestore} disabled={busy} />
                <View style={styles.divider} />
                <Row
                  icon="trash"
                  title="Remove the backup from Drive"
                  onPress={confirmForget}
                  disabled={busy || !drive.signedIn}
                  danger
                />
              </View>

              {!!drive.busy && (
                <Body size={11} color={C.neutral600} style={{ marginTop: 10 }}>{drive.busy}</Body>
              )}
              {!!drive.error && (
                <View style={styles.error}>
                  <Icon name="warning" size={14} color="#8c3b2f" />
                  <Body size={11} color="#8c3b2f" style={{ flex: 1 }}>{drive.error}</Body>
                </View>
              )}

              <Body size={10.5} color={C.neutral600} style={{ marginTop: 10 }}>
                Thread writes to a private app folder in your Drive that nothing else can read, and
                it never asks for the rest of your files. Backup is entirely optional — the app works
                the same without it.
              </Body>
            </>
          ) : (
            <View style={styles.group}>
              <Row
                icon="warning"
                title="Not configured in this build"
                subtitle="Add a Google OAuth client id to app.json — see DRIVE_SETUP.md."
              />
            </View>
          )}

          <Kicker style={styles.section}>Behaviour</Kicker>
          <View style={styles.group}>
            <Row
              title="Celebrate completed milestones"
              subtitle="The full-screen moment when a milestone is finished."
              right={
                <Switch
                  value={!!state.settings.celebrations}
                  onValueChange={v => onSetSetting('celebrations', v)}
                  trackColor={{ true: C.accent400, false: C.neutral300 }}
                  thumbColor={C.surface}
                />
              }
            />
          </View>

          <Kicker style={styles.section}>Data</Kicker>
          <View style={styles.group}>
            <Row icon="trash" title="Delete everything on this phone" onPress={confirmReset} danger />
          </View>

          <Button label="Done" tone="secondary" onPress={onClose} style={{ marginTop: 26 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingBottom: 6 },
  body: { paddingHorizontal: 18, paddingTop: 18 },
  section: { marginTop: 26 },
  group: {
    marginTop: 9, borderWidth: 1, borderColor: C.neutral300,
    borderRadius: R.md, backgroundColor: C.surface, overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 13 },
  rowTitle: { fontFamily: FONT.regular, fontSize: 13, color: C.text },
  rowSub: { fontFamily: FONT.regular, fontSize: 10.5, lineHeight: 15, color: C.neutral600, marginTop: 2 },
  action: { fontFamily: FONT.regular, fontSize: 11.5, color: C.accent800 },
  divider: { height: 1, backgroundColor: C.neutral200, marginLeft: 13 },
  error: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 10,
    borderWidth: 1, borderColor: '#e0c4bb', backgroundColor: '#fbf0ec',
    borderRadius: R.sm, padding: 10,
  },
});
