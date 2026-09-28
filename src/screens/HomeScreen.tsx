import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReportCard } from '../components/ReportCard';
import { mockReports, ReportStatus } from '../data/mockReports';
import { statusStyles, useTheme } from '../theme';

type Filter = 'all' | ReportStatus;

const filters: Filter[] = [
  'all',
  'pending',
  'under_review',
  'verified',
  'resolved',
];

export function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('all');

  const reports = useMemo(
    () =>
      filter === 'all'
        ? mockReports
        : mockReports.filter(r => r.status === filter),
    [filter],
  );

  const onNewReport = () =>
    Alert.alert('New report', 'Camera capture is coming soon.');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={reports}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ReportCard report={item} />}
        contentContainerStyle={[
          styles.list,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 96 },
        ]}
        ListHeaderComponent={
          <View>
            <Text style={[styles.brand, { color: theme.text }]}>
              Snitch<Text style={{ color: theme.accent }}>.</Text>
            </Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              Recent reports near you
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {filters.map(f => {
                const active = f === filter;
                return (
                  <Pressable
                    key={f}
                    onPress={() => setFilter(f)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: active ? theme.accent : theme.chip,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        active
                          ? styles.chipTextActive
                          : { color: theme.chipText },
                      ]}
                    >
                      {f === 'all' ? 'All' : statusStyles[f].label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textMuted }]}>
            No reports here yet.
          </Text>
        }
      />

      <Pressable
        onPress={onNewReport}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.accent, bottom: insets.bottom + 20 },
          pressed && styles.fabPressed,
        ]}
      >
        <Text style={styles.fabText}>📷 Report</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
  },
  chips: {
    gap: 8,
    paddingVertical: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  empty: {
    textAlign: 'center',
    marginTop: 48,
    fontSize: 15,
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabPressed: {
    transform: [{ scale: 0.97 }],
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
