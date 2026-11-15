import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/theme';
import { CATEGORY_BREAKDOWN, formatNaira } from '@/constants/mockData';
import { SpendingChart } from '@/components/SpendingChart';

interface AnalyticsModalProps {
  visible: boolean;
  totalMonthly: number;
  onClose: () => void;
  onTriggerPaywall: () => void;
}

const AUDIT_STEPS = [
  'Analyzing your recurring subscriptions...',
  'Calculating annualized expenditure impact...',
  'Optimizing your financial ecosystem...',
  'Your subscription management experience is now being upgraded...',
];

export function AnalyticsModal({
  visible,
  totalMonthly,
  onClose,
  onTriggerPaywall,
}: AnalyticsModalProps) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStepIndex, setAuditStepIndex] = useState(0);

  const annualProjected = totalMonthly * 12;

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(style);
      }
    } catch {}
  };

  const handleRunAiAudit = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    setIsAuditing(true);
    setAuditStepIndex(0);

    // Sequence through the 4 comedic loading steps
    setTimeout(() => {
      setAuditStepIndex(1);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    }, 850);

    setTimeout(() => {
      setAuditStepIndex(2);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    }, 1700);

    setTimeout(() => {
      setAuditStepIndex(3);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    }, 2550);

    setTimeout(() => {
      setIsAuditing(false);
      onClose();
      // Trigger the Paywall!
      setTimeout(() => {
        onTriggerPaywall();
      }, 200);
    }, 3400);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Subscription Analytics</Text>
              <Text style={styles.subtitle}>Deep Dive Portfolio Intelligence</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#94A3B8" />
            </Pressable>
          </View>

          {isAuditing ? (
            <View style={styles.auditingContainer}>
              <View style={styles.auditingSpinner}>
                <ActivityIndicator size="large" color="#10B981" />
              </View>
              <Text style={styles.auditingTitle}>AI Portfolio Optimization</Text>
              <Text style={styles.auditingStepText}>
                {AUDIT_STEPS[auditStepIndex]}
              </Text>
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles" size={13} color="#F59E0B" />
                <Text style={styles.aiBadgeText}>Neural Expense Engine v4.2</Text>
              </View>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              {/* Summary KPIs */}
              <View style={styles.kpiRow}>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>MONTHLY SPEND</Text>
                  <Text style={styles.kpiValue}>{formatNaira(totalMonthly)}</Text>
                  <Text style={styles.kpiSub}>Across active services</Text>
                </View>

                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>ANNUAL PROJECTED</Text>
                  <Text style={[styles.kpiValue, { color: '#6366F1' }]}>
                    {formatNaira(annualProjected)}
                  </Text>
                  <Text style={styles.kpiSub}>12-month commitment</Text>
                </View>
              </View>

              {/* Most Expensive Item Spotlight */}
              <View style={styles.spotlightCard}>
                <View style={styles.spotlightHeader}>
                  <View style={styles.spotlightTag}>
                    <Ionicons name="flame" size={12} color="#EF4444" />
                    <Text style={styles.spotlightTagText}>LARGEST OUTFLOW</Text>
                  </View>
                  <Text style={styles.spotlightPct}>61.8% of Total</Text>
                </View>
                <Text style={styles.spotlightName}>ChatGPT Plus</Text>
                <Text style={styles.spotlightCost}>₦30,000 / month</Text>
                <Text style={styles.spotlightDesc}>
                  Consumes over 60% of your recurring software budget.
                </Text>
              </View>

              {/* Monthly Spending History Chart */}
              <SpendingChart currentMonthlyTotal={totalMonthly} />

              {/* Category Breakdown Progress Bars */}
              <View style={styles.categoryCard}>
                <Text style={styles.categoryCardTitle}>Spending by Category</Text>
                <View style={styles.categoryList}>
                  {CATEGORY_BREAKDOWN.map((cat) => (
                    <View key={cat.name} style={styles.categoryRow}>
                      <View style={styles.categoryHeader}>
                        <View style={styles.categoryNameGroup}>
                          <View
                            style={[
                              styles.catDot,
                              { backgroundColor: cat.color },
                            ]}
                          />
                          <Text style={styles.catName}>{cat.name}</Text>
                        </View>
                        <Text style={styles.catAmount}>
                          {formatNaira(cat.amount)}{' '}
                          <Text style={styles.catPct}>({cat.percentage}%)</Text>
                        </Text>
                      </View>
                      <View style={styles.progressBarTrack}>
                        <View
                          style={[
                            styles.progressBarFill,
                            {
                              width: `${cat.percentage}%`,
                              backgroundColor: cat.color,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Comedic AI Financial Audit CTA */}
              <Pressable
                accessibilityRole="button"
                onPress={handleRunAiAudit}
                style={({ pressed }) => [
                  styles.aiAuditButton,
                  pressed && { opacity: 0.9 },
                ]}>
                <Ionicons name="sparkles" size={17} color="#000000" />
                <Text style={styles.aiAuditButtonText}>
                  Run AI Waste Optimization Audit
                </Text>
              </Pressable>

              <Text style={styles.disclaimerText}>
                Proprietary algorithmic recommendations powered by Subscription Manager Pro neural network.
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Theme.colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Theme.colors.modalBackground,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: Theme.colors.modalBorder,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '92%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 12,
  },
  kpiLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  kpiValue: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    marginVertical: 4,
  },
  kpiSub: {
    color: Theme.colors.textSecondary,
    fontSize: 10,
  },
  spotlightCard: {
    backgroundColor: '#1E1719',
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    padding: 14,
    marginBottom: 14,
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  spotlightTagText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '800',
  },
  spotlightPct: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '700',
  },
  spotlightName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
  },
  spotlightCost: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  spotlightDesc: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },
  categoryCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 16,
    marginBottom: 16,
  },
  categoryCardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 14,
  },
  categoryList: {
    gap: 12,
  },
  categoryRow: {
    gap: 6,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  catName: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  catAmount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  catPct: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '500',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  aiAuditButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  aiAuditButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  disclaimerText: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 14,
  },

  // Auditing animation view
  auditingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  auditingSpinner: {
    marginBottom: 20,
    transform: [{ scale: 1.3 }],
  },
  auditingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 8,
  },
  auditingStepText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    fontFamily: Theme.typography.fontFamily,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E1E24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aiBadgeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: Theme.typography.fontFamily,
  },
});
