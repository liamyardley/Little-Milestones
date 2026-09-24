import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PlayCard } from '../../components/cards';
import { Pill } from '../../components/ui';
import { STAGES, allActivities } from '../../data/content';

const FILTERS = [{ id: 'all', short: 'All ages' }].concat(
  STAGES.map(st => ({ id: st.id, short: st.short })),
);

export default function Play({ filter, onFilter, results, onOpenActivity, onOutcome }) {
  const list = allActivities().filter(a => filter === 'all' || a.stage.id === filter);
  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {FILTERS.map(f => (
          <Pill key={f.id} label={f.short} active={filter === f.id} onPress={() => onFilter(f.id)} />
        ))}
      </ScrollView>

      <View style={{ gap: 10 }}>
        {list.map(a => (
          <PlayCard
            key={a.id}
            activity={a}
            result={results[a.id]}
            onPress={() => onOpenActivity(a.id)}
            onOutcome={oid => onOutcome(a, oid)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 14 },
  filters: { gap: 6, paddingBottom: 12 },
});
