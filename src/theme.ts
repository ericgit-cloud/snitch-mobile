import { useColorScheme } from 'react-native';
import type { ReportStatus } from './data/mockReports';

const light = {
  background: '#F4F5F7',
  card: '#FFFFFF',
  text: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  accent: '#E11D48',
  chip: '#E5E7EB',
  chipText: '#374151',
};

const dark: typeof light = {
  background: '#0B0D12',
  card: '#161A22',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  border: '#262B36',
  accent: '#F43F5E',
  chip: '#262B36',
  chipText: '#D1D5DB',
};

export type Theme = typeof light;

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}

export const statusStyles: Record<
  ReportStatus,
  { label: string; color: string; background: string }
> = {
  pending: { label: 'Pending', color: '#B45309', background: '#FEF3C7' },
  under_review: {
    label: 'Under review',
    color: '#1D4ED8',
    background: '#DBEAFE',
  },
  verified: { label: 'Verified', color: '#047857', background: '#D1FAE5' },
  resolved: { label: 'Resolved', color: '#4B5563', background: '#E5E7EB' },
};
