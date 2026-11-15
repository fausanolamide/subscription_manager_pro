import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Theme } from '@/constants/theme';
import { SPENDING_HISTORY, formatNaira } from '@/constants/mockData';

interface SpendingChartProps {
  currentMonthlyTotal: number;
}

export function SpendingChart({ currentMonthlyTotal }: SpendingChartProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>('Nov');

  // Update November data with live current total
  const chartData = SPENDING_HISTORY.map((item) => {
    if (item.month === 'Nov') {
      return {
        ...item,
        amount: currentMonthlyTotal,
        heightPct: 1.0,
      };
    }
    const heightPct = Math.min(1.0, Math.max(0.25, item.amount / currentMonthlyTotal));
    return { ...item, heightPct };
  });

  const activeItem = chartData.find((d) => d.month === selectedMonth) || chartData[chartData.length - 1];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monthly Expense Trajectory</Text>
          <Text style={styles.subtitle}>
            {activeItem.month} Expense: <Text style={styles.activeAmountText}>{formatNaira(activeItem.amount)}</Text>
          </Text>
        </View>
        <View style={styles.trendBadge}>
          <Text style={styles.trendText}>+27.6% YTD</Text>
        </View>
      </View>

      {/* Chart Bars Area */}
      <View style={styles.chartWrapper}>
        {/* Subtle Background Gridlines */}
        <View style={styles.gridLine} />
        <View style={[styles.gridLine, { bottom: '50%' }]} />

        <View style={styles.barsRow}>
          {chartData.map((item) => {
            const isSelected = item.month === selectedMonth;
            const barHeight = `${Math.round(item.heightPct * 88)}%` as `${number}%`;

            return (
              <Pressable
                key={item.month}
                onPress={() => setSelectedMonth(item.month)}
                style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: barHeight,
                        backgroundColor: item.isCurrent
                          ? '#10B981'
                          : isSelected
                          ? '#6366F1'
                          : '#25293A',
                        shadowColor: item.isCurrent ? '#10B981' : 'transparent',
                        shadowOpacity: item.isCurrent ? 0.6 : 0,
                        shadowRadius: 8,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.monthLabel,
                    isSelected && styles.monthLabelActive,
                    item.isCurrent && styles.monthLabelCurrent,
                  ]}>
                  {item.month}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: -0.2,
  },
  subtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: Theme.typography.fontFamily,
    marginTop: 2,
  },
  activeAmountText: {
    color: '#10B981',
    fontWeight: '700',
  },
  trendBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  trendText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  chartWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    position: 'relative',
    paddingTop: 10,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    zIndex: 1,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: 24,
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  monthLabel: {
    color: Theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
    marginTop: 6,
  },
  monthLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  monthLabelCurrent: {
    color: '#10B981',
    fontWeight: '800',
  },
});
