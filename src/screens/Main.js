import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import ActivitySheet from '../components/ActivitySheet';
import MilestoneSheet from '../components/MilestoneSheet';
import { Pill } from '../components/ui';
import Timeline from './tabs/Timeline';
import Play from './tabs/Play';
import Experiments from './tabs/Experiments';
import Progress from './tabs/Progress';
import {
  STAGES, allActivities, allMilestones, findActivity, findMilestone,
} from '../data/content';
import { ageLineFor, currentStageFor } from '../lib/format';
import { C, FONT, G } from '../theme';

const TABS = [
  { id: 'timeline', label: 'Thread', icon: 'path' },
  { id: 'play', label: 'Play', icon: 'hand-heart' },
  { id: 'log', label: 'Experiments', icon: 'flask' },
  { id: 'progress', label: 'Progress', icon: 'chart-line-up' },
];

export default function Main({ thread, onOpenSettings }) {
  const {
    state, setLevel, setResult, setResultNote, setNote, addPhoto, clearPhoto,
  } = thread;
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState('timeline');
  const [filter, setFilter] = useState('all');
  const [sheetId, setSheetId] = useState(null);
  const [actId, setActId] = useState(null);

  const scrollRef = useRef(null);
  const stageTops = useRef({});
  const threadTop = useRef(0);

  const profile = state.profile;
  const childName = profile ? profile.name : 'Your child';
  const firstName = childName.split(' ')[0];
  const currentStage = useMemo(() => currentStageFor(profile), [profile]);
  const ageLine = useMemo(() => ageLineFor(profile), [profile]);

  const milestones = useMemo(() => allMilestones(), []);
  const started = milestones.filter(m => (state.progress[m.id] || 0) > 0).length;

  // The design pins one activity as "today"; keep that anchor.
  const todayActivity = useMemo(() => findActivity('m12p3'), []);

  const jumpToStage = useCallback(id => {
    const y = stageTops.current[id];
    if (y == null || !scrollRef.current) return;
    scrollRef.current.scrollTo({ y: Math.max(0, threadTop.current + y - 8), animated: true });
  }, []);

  const openMilestone = useCallback(id => {
    setActId(null);
    setSheetId(id);
  }, []);

  const sheetMilestone = sheetId ? findMilestone(sheetId) : null;
  const sheetActivity = actId ? allActivities().find(a => a.id === actId) : null;

  return (
    <View style={styles.fill}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={onOpenSettings} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
          <LinearGradient colors={G.avatar} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName.slice(0, 1).toUpperCase()}</Text>
          </LinearGradient>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{childName}</Text>
          <Text style={styles.age}>{ageLine}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.count}>{started}</Text>
          <Text style={styles.countLabel}>OF {milestones.length} LOGGED</Text>
        </View>
      </View>

      {tab === 'timeline' && (
        <View style={styles.scrubberWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrubber}>
            {STAGES.map(st => (
              <Pill
                key={st.id}
                label={st.short}
                active={st.id === currentStage}
                onPress={() => jumpToStage(st.id)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        keyboardShouldPersistTaps="handled"
      >
        {tab === 'timeline' && (
          <View onLayout={e => { threadTop.current = e.nativeEvent.layout.y; }}>
            <Timeline
              progress={state.progress}
              results={state.results}
              currentStage={currentStage}
              todayActivity={todayActivity}
              onOpenMilestone={openMilestone}
              onOpenActivity={setActId}
              onStageLayout={(id, y) => { stageTops.current[id] = y; }}
            />
          </View>
        )}

        {tab === 'play' && (
          <Play
            filter={filter}
            onFilter={setFilter}
            results={state.results}
            onOpenActivity={setActId}
            onOutcome={setResult}
          />
        )}

        {tab === 'log' && (
          <Experiments
            results={state.results}
            onOpenActivity={setActId}
            onOutcome={setResult}
            onNote={setResultNote}
          />
        )}

        {tab === 'progress' && (
          <Progress
            progress={state.progress}
            photos={state.photos}
            currentStage={currentStage}
            firstName={firstName}
            onOpenMilestone={id => { setTab('timeline'); openMilestone(id); }}
          />
        )}
      </ScrollView>

      <LinearGradient
        colors={['rgba(250,247,239,0)', 'rgba(250,247,239,0.92)', C.bg]}
        locations={[0, 0.32, 0.62]}
        style={[styles.tabBar, { height: 82 + insets.bottom, paddingBottom: insets.bottom }]}
        pointerEvents="box-none"
      >
        {TABS.map(t => {
          const on = tab === t.id;
          return (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={styles.tab}>
              <Icon name={t.icon} size={19} color={on ? C.accent800 : C.neutral600} fill={on} />
              <Text style={[styles.tabLabel, { color: on ? C.accent800 : C.neutral600 }]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </LinearGradient>

      {!!sheetMilestone && (
        <MilestoneSheet
          milestone={sheetMilestone}
          count={state.progress[sheetMilestone.id] || 0}
          note={state.notes[sheetMilestone.id] || ''}
          photo={state.photos[sheetMilestone.id]}
          firstName={firstName}
          onClose={() => setSheetId(null)}
          onSetLevel={i => setLevel(sheetMilestone, i)}
          onSetNote={v => setNote(sheetMilestone.id, v)}
          onAddPhoto={uri => addPhoto(sheetMilestone.id, uri)}
          onClearPhoto={() => clearPhoto(sheetMilestone.id)}
        />
      )}

      {!!sheetActivity && (
        <ActivitySheet
          activity={sheetActivity}
          result={state.results[sheetActivity.id]}
          onClose={() => setActId(null)}
          onOutcome={oid => setResult(sheetActivity, oid)}
          onSetNote={v => setResultNote(sheetActivity.id, v)}
          onOpenMilestone={id => { setTab('timeline'); openMilestone(id); }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 18 },
  avatar: {
    width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: C.accent400,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: FONT.medium, fontSize: 13, color: C.accent800 },
  name: { fontFamily: FONT.medium, fontSize: 15, letterSpacing: -0.15, color: C.text },
  age: { fontFamily: FONT.regular, fontSize: 10.5, color: C.neutral600, marginTop: 2 },
  count: { fontFamily: FONT.medium, fontSize: 15, color: C.accent800 },
  countLabel: { fontFamily: FONT.regular, fontSize: 9, letterSpacing: 0.7, color: C.neutral600, marginTop: 2 },

  scrubberWrap: { marginTop: 12 },
  scrubber: { gap: 6, paddingHorizontal: 18, paddingBottom: 10 },

  tabBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    flexDirection: 'row', alignItems: 'flex-start', paddingTop: 16, paddingHorizontal: 14, gap: 2,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 6 },
  tabLabel: { fontFamily: FONT.regular, fontSize: 9, letterSpacing: 0.2 },
});
