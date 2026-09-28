import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Report, timeAgo } from '../data/mockReports';
import { statusStyles, useTheme } from '../theme';

type Props = {
  report: Report;
  onPress?: (report: Report) => void;
};

export function ReportCard({ report, onPress }: Props) {
  const theme = useTheme();
  const status = statusStyles[report.status];

  return (
    <Pressable
      onPress={() => onPress?.(report)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Image source={{ uri: report.mediaUrl }} style={styles.media} />
        {report.mediaType === 'video' && (
          <>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <View style={styles.duration}>
              <Text style={styles.durationText}>{report.videoDuration}</Text>
            </View>
          </>
        )}
        <View style={[styles.status, { backgroundColor: status.background }]}>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.category, { color: theme.accent }]}>
          {report.category.toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {report.title}
        </Text>
        <Text
          style={[styles.description, { color: theme.textMuted }]}
          numberOfLines={2}
        >
          {report.description}
        </Text>

        <Text style={[styles.meta, { color: theme.textMuted }]}>
          📍 {report.location} · {timeAgo(report.createdAt)}
        </Text>

        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          <Text style={[styles.footerText, { color: theme.textMuted }]}>
            {report.anonymous ? '🕶 Anonymous' : `@${report.reporter}`}
          </Text>
          <View style={styles.stats}>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              ▲ {report.upvotes}
            </Text>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              💬 {report.comments}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  media: {
    width: '100%',
    aspectRatio: 3 / 2,
    backgroundColor: '#9CA3AF',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 56,
    height: 56,
    marginTop: -28,
    marginLeft: -28,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 4,
  },
  duration: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  status: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  meta: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    gap: 14,
  },
});
