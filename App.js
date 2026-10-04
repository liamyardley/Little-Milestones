import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts,
} from '@expo-google-fonts/inter';
import Celebrate from './src/components/Celebrate';
import ChildForm from './src/screens/ChildForm';
import Main from './src/screens/Main';
import Onboarding from './src/screens/Onboarding';
import Settings from './src/screens/Settings';
import useDrive from './src/lib/useDrive';
import requestPersistentStorage from './src/lib/persistStorage';
import { ThreadProvider, useThread } from './src/store';
import { C } from './src/theme';

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator color={C.accent600} />
  </View>
);

// What "changed since the last backup" means. Backing up assigns Drive ids to
// newly uploaded photos, so the signature is always taken from the state the
// backup produced — otherwise that write would look like another change and the
// automatic backup would chase its own tail.
const signatureOf = s =>
  JSON.stringify([s.progress, s.notes, s.results, s.photos, s.profile]);

function Root() {
  const thread = useThread();
  const { ready, state, celebrate, setCelebrate } = thread;
  const drive = useDrive();

  const [editingProfile, setEditingProfile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const lastBackedUp = useRef(null);

  const hasProfile = !!state.profile;

  // Automatic backup, when the user has asked for it: wait for the edits to
  // settle rather than uploading on every keystroke.
  useEffect(() => {
    if (!ready || !hasProfile) return undefined;
    if (!state.settings.driveBackup || !drive.signedIn || drive.busy) return undefined;
    if (signatureOf(state) === lastBackedUp.current) return undefined;
    const timer = setTimeout(async () => {
      const result = await drive.backupNow(state);
      if (result && result.state) {
        lastBackedUp.current = signatureOf(result.state);
        thread.replaceState(result.state);
      }
    }, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, hasProfile, state, drive.signedIn, drive.busy, state.settings.driveBackup]);

  const runBackup = useCallback(async () => {
    const result = await drive.backupNow(state);
    if (!result) return;
    lastBackedUp.current = signatureOf(result.state);
    thread.replaceState(result.state);
    Alert.alert(
      'Backed up',
      result.uploadedPhotos
        ? `The thread and ${result.uploadedPhotos} photo${result.uploadedPhotos === 1 ? '' : 's'} are safe in your Drive.`
        : 'The thread is safe in your Drive.',
    );
  }, [drive, state, thread]);

  const runRestore = useCallback(async () => {
    const restored = await drive.restoreNow();
    if (restored === null) {
      Alert.alert('Nothing to restore', 'No Little Milestones backup was found in this Google account.');
      return;
    }
    if (!restored) return; // the hook surfaced an error
    thread.replaceState(restored);
    setSettingsOpen(false);
    Alert.alert('Restored', 'The thread from your Drive backup is now on this phone.');
  }, [drive, thread]);

  if (!ready) return <Loading />;

  if (!hasProfile && !editingProfile) {
    return (
      <Onboarding
        drive={drive}
        onStart={() => setEditingProfile(true)}
        onSample={thread.loadSample}
        onRestore={runRestore}
      />
    );
  }

  if (editingProfile) {
    return (
      <ChildForm
        initial={state.profile}
        onCancel={hasProfile ? () => setEditingProfile(false) : undefined}
        onSave={draft => {
          thread.saveProfile(draft);
          setEditingProfile(false);
        }}
      />
    );
  }

  return (
    <>
      <Main thread={thread} onOpenSettings={() => setSettingsOpen(true)} />

      <Settings
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        profile={state.profile}
        state={state}
        drive={drive}
        onEditProfile={() => {
          setSettingsOpen(false);
          setEditingProfile(true);
        }}
        onBackup={runBackup}
        onRestore={runRestore}
        onReset={async () => {
          await thread.resetAll();
          setSettingsOpen(false);
        }}
        onSetSetting={thread.setSetting}
      />

      <Celebrate celebrate={celebrate} onDismiss={() => setCelebrate(null)} />
    </>
  );
}

export default function App() {
  // on web, ask the browser not to evict the thread
  useEffect(() => { requestPersistentStorage(); }, []);

  const [fontsLoaded] = useFonts({
    Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={C.bg} />
      <View style={styles.app}>
        {fontsLoaded ? (
          <ThreadProvider>
            <Root />
          </ThreadProvider>
        ) : (
          <Loading />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.bg },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg },
});
