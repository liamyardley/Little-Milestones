import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../components/Icon';
import { ActivityCard, MilestoneCard } from '../../components/cards';
import { Body, Kicker } from '../../components/ui';
import { STAGES, actsOf, findMilestone } from '../../data/content';
import { C, FONT, G, R } from '../../theme';

const TodayCard = ({ activity, onPress }) => {
  if (!activity) return null;
  const linked = activity.link ? findMilestone(activity.link) : null;
  return (
    <View style={{ paddingHorizontal: 18, paddingTop: 4 }}>
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
        <LinearGradient
          colors={G.todayCard}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.today}
        >
          <View style={styles.todayIcon}>
            <Icon name="sparkle" size={16} color={C.accent800} />
          </View>
          <View style={{ flex: 1 }}>
            <Kicker color={C.accent700}>Today · {activity.dur.split(' · ')[0]}</Kicker>
            <Text style={styles.todayTitle}>{activity.t}</Text>
            <Text style={styles.todayMeta}>
              {linked ? `Supports: ${linked.t}` : activity.dur}
            </Text>
          </View>
          <Icon name="caret-right" size={14} color={C.neutral600} />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default function Timeline({
  progress, results, currentStage, todayActivity,
  onOpenMilestone, onOpenActivity, onStageLayout,
}) {
  return (
    <View>
      <TodayCard activity={todayActivity} onPress={() => todayActivity && onOpenActivity(todayActivity.id)} />

      <View style={styles.thread}>
        <View style={styles.spine} pointerEvents="none" />

        {STAGES.map(stage => {
          const current = stage.id === currentStage;
          return (
            <View
              key={stage.id}
              onLayout={e => onStageLayout(stage.id, e.nativeEvent.layout.y)}
              style={styles.stage}
            >
              <View style={styles.stageHeader}>
                <View style={styles.stageHeaderInner}>
                  <View style={styles.stageTitleRow}>
                    <View
                      style={[
                        styles.stageDot,
                        current && styles.stageDotCurrent,
                        { backgroundColor: current ? C.accent : C.neutral400 },
                      ]}
                    />
                    <Text style={styles.stageLabel}>{stage.label}</Text>
                  </View>
                  <Text style={[styles.stageSub, { color: current ? C.accent700 : C.neutral600 }]}>
                    {stage.sub}
                  </Text>
                </View>
              </View>

              <View style={styles.columns}>
                <View style={styles.column}>
                  {stage.ms.map(m => (
                    <MilestoneCard
                      key={m.id}
                      milestone={m}
                      count={progress[m.id] || 0}
                      onPress={() => onOpenMilestone(m.id)}
                      align="right"
                    />
                  ))}
                </View>
                <View style={styles.column}>
                  {actsOf(stage).map(a => (
                    <ActivityCard
                      key={a.id}
                      activity={a}
                      result={results[a.id]}
                      onPress={() => onOpenActivity(a.id)}
                    />
                  ))}
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.footnote}>
          <Body size={10.5} color={C.neutral600} style={{ textAlign: 'center' }}>
            Every range here is wide on purpose. Children arrive at these in their own order — the
            thread is a map, not a schedule.
          </Body>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  today: {
    borderWidth: 1,
    borderColor: C.accent300,
    borderRadius: R.lg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  todayIcon: {
    width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: C.accent400,
    alignItems: 'center', justifyContent: 'center',
  },
  todayTitle: { fontFamily: FONT.medium, fontSize: 13.5, lineHeight: 17, marginTop: 3, color: C.text },
  todayMeta: { fontFamily: FONT.regular, fontSize: 10.5, color: C.neutral600, marginTop: 3 },

  thread: { paddingTop: 22, position: 'relative' },
  spine: {
    position: 'absolute', left: '50%', top: 60, bottom: 120,
    width: 1, backgroundColor: C.neutral300,
  },
  stage: { paddingBottom: 26 },
  stageHeader: { alignItems: 'center', paddingTop: 14, paddingBottom: 16 },
  stageHeaderInner: { alignItems: 'center', gap: 4, backgroundColor: C.bg, paddingHorizontal: 12 },
  stageTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  stageDot: { width: 7, height: 7, borderRadius: 4 },
  stageDotCurrent: {
    shadowColor: C.accent600, shadowOpacity: 0.45, shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 }, elevation: 3,
  },
  stageLabel: { fontFamily: FONT.medium, fontSize: 12.5, letterSpacing: -0.1, color: C.text },
  stageSub: { fontFamily: FONT.regular, fontSize: 9, letterSpacing: 0.9, textTransform: 'uppercase' },

  columns: { flexDirection: 'row', paddingHorizontal: 14, gap: 26, alignItems: 'flex-start' },
  column: { flex: 1, gap: 8 },

  footnote: { paddingHorizontal: 40, paddingTop: 6, paddingBottom: 20 },
});
