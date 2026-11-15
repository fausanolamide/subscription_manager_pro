import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/theme';
import { PricingTier, Subscription, SubscriptionCategory } from '@/types/subscription';
import {
  APP_PRO_SUBSCRIPTION,
  INITIAL_SUBSCRIPTIONS,
  formatNaira,
} from '@/constants/mockData';
import { HeaderBar } from '@/components/HeaderBar';
import { MetricCard } from '@/components/MetricCard';
import { SpendingChart } from '@/components/SpendingChart';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { AddSubscriptionModal } from '@/components/AddSubscriptionModal';
import { AnalyticsModal } from '@/components/AnalyticsModal';
import { PaywallModal } from '@/components/PaywallModal';
import { TwistCheckoutModal } from '@/components/TwistCheckoutModal';
import { TwistSuccessModal } from '@/components/TwistSuccessModal';
import { WelcomeScreen } from '@/components/WelcomeScreen';

const STORAGE_KEY = '@subscription_manager_pro_v1';

const CATEGORIES: ('All' | SubscriptionCategory)[] = [
  'All',
  'AI & Tech',
  'Entertainment',
  'Health & Fitness',
  'Productivity',
  'Cloud & Storage',
  'Music',
];

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [currentTier, setCurrentTier] = useState<PricingTier>('free');
  const [selectedCategory, setSelectedCategory] = useState<'All' | SubscriptionCategory>('All');

  // Modal Visibility States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [showTwistCheckoutModal, setShowTwistCheckoutModal] = useState(false);
  const [showTwistSuccessModal, setShowTwistSuccessModal] = useState(false);
  const [targetCheckoutTier, setTargetCheckoutTier] = useState<PricingTier>('pro');

  // Load saved state if any
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.subscriptions) setSubscriptions(parsed.subscriptions);
          if (parsed.currentTier) setCurrentTier(parsed.currentTier);
          if (typeof parsed.hasCompletedOnboarding === 'boolean') {
            setHasCompletedOnboarding(parsed.hasCompletedOnboarding);
          }
        }
      } catch { }
    })();
  }, []);

  // Save changes
  const persistState = async (
    newSubs: Subscription[],
    newTier: PricingTier,
    onboarding: boolean
  ) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          subscriptions: newSubs,
          currentTier: newTier,
          hasCompletedOnboarding: onboarding,
        })
      );
    } catch { }
  };

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(style);
      }
    } catch { }
  };

  // Calculations
  const totalMonthly = subscriptions.reduce((acc, curr) => acc + curr.cost, 0);
  const activeCount = subscriptions.length;
  const upcomingCount = subscriptions.filter((s) => s.daysUntilRenewal <= 7).length;
  const potentialSavings = 12000;

  // Filtered subscriptions
  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (selectedCategory === 'All') return true;
    return sub.category === selectedCategory;
  });

  // Handler: Get Started from Welcome Screen
  const handleGetStarted = () => {
    setHasCompletedOnboarding(true);
    persistState(subscriptions, currentTier, true);
  };

  // Handler: Adding a subscription
  const handleSaveSubscription = (newSub: Omit<Subscription, 'id'>) => {
    const created: Subscription = {
      ...newSub,
      id: `sub-custom-${Date.now()}`,
    };
    const updated = [created, ...subscriptions];
    setSubscriptions(updated);
    persistState(updated, currentTier, hasCompletedOnboarding);
  };

  // Handler: Removing a subscription
  const handleDeleteSubscription = (id: string) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
    persistState(updated, currentTier, hasCompletedOnboarding);
  };

  // Handler: Export Report (Triggers Paywall)
  const handleExportPress = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setShowPaywallModal(true);
  };

  // Handler: Reset Skit (Content Creator Tool)
  const handleResetSkit = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      'Reset Skit for New Take',
      'Reset subscriptions back to Free tier and initial 8 items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setCurrentTier('free');
            setSubscriptions(INITIAL_SUBSCRIPTIONS);
            persistState(INITIAL_SUBSCRIPTIONS, 'free', true);
          },
        },
      ]
    );
  };

  // Handler: Notifications icon
  const handleNotificationsPress = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Subscription Advisory',
      `You have ${activeCount} active recurring services totaling ${formatNaira(
        totalMonthly
      )}/month. 3 renewals are due this week.`
    );
  };

  // Free tier allows up to 3 subscriptions. Since initial list has 8, trying to add another on Free tier triggers paywall!
  const canAddWithoutPaywall = currentTier !== 'free' || subscriptions.length < 3;

  // Transition from Paywall -> Twist Checkout
  const handleSelectPaywallTier = (tier: PricingTier) => {
    setShowPaywallModal(false);
    if (tier === 'free') return;
    setTargetCheckoutTier(tier);
    setTimeout(() => {
      setShowTwistCheckoutModal(true);
    }, 200);
  };

  // Transition from Twist Checkout -> Twist Success
  const handlePaymentSuccess = () => {
    setShowTwistCheckoutModal(false);
    setTimeout(() => {
      setShowTwistSuccessModal(true);
    }, 200);
  };

  // Dismiss Success -> Add the app's own subscription to their list!
  const handleDismissSuccess = () => {
    setShowTwistSuccessModal(false);
    setCurrentTier('pro');

    // Add Subscription Manager Pro to their active subscriptions if not already added!
    const alreadyAdded = subscriptions.some((s) => s.id === APP_PRO_SUBSCRIPTION.id);
    const updated = alreadyAdded
      ? subscriptions
      : [APP_PRO_SUBSCRIPTION, ...subscriptions];

    setSubscriptions(updated);
    persistState(updated, 'pro', true);
  };

  if (!hasCompletedOnboarding) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WelcomeScreen onGetStarted={handleGetStarted} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header Bar */}
        <HeaderBar
          currentTier={currentTier}
          onUpgradePress={() => setShowPaywallModal(true)}
          onResetPress={handleResetSkit}
          onNotificationPress={handleNotificationsPress}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Section: Financial KPIs */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricsRow}>
              <MetricCard
                title="Total Monthly"
                value={formatNaira(totalMonthly)}
                changeText="+12% MoM"
                isPositiveChange={false}
                iconName="wallet-outline"
                accentColor="#10B981"
                onPress={() => setShowAnalyticsModal(true)}
              />
              <MetricCard
                title="Active Subs"
                value={activeCount.toString()}
                changeText={`${upcomingCount} due soon`}
                isPositiveChange={true}
                iconName="repeat-outline"
                accentColor="#6366F1"
                onPress={() => setSelectedCategory('All')}
              />
            </View>

            <View style={styles.metricsRow}>
              <MetricCard
                title="Upcoming Renewals"
                value={upcomingCount.toString()}
                changeText="In next 7 days"
                isPositiveChange={false}
                iconName="calendar-outline"
                accentColor="#F59E0B"
                onPress={() => setShowAnalyticsModal(true)}
              />
              <MetricCard
                title="Potential Savings"
                value={formatNaira(potentialSavings)}
                changeText="2 redundant"
                isPositiveChange={true}
                iconName="trending-down-outline"
                accentColor="#EC4899"
                onPress={() => setShowAnalyticsModal(true)}
              />
            </View>
          </View>

          {/* Section: Spending History Trend */}
          <SpendingChart currentMonthlyTotal={totalMonthly} />

          {/* Quick Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAddModal(true)}
              style={({ pressed }) => [
                styles.primaryActionButton,
                pressed && { opacity: 0.88, transform: [{ scale: 0.99 }] },
              ]}>
              <Ionicons name="add-circle" size={18} color="#000000" />
              <Text style={styles.primaryActionText}>Add Subscription</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAnalyticsModal(true)}
              style={({ pressed }) => [
                styles.secondaryActionButton,
                pressed && { opacity: 0.8 },
              ]}>
              <Ionicons name="pie-chart-outline" size={16} color="#94A3B8" />
              <Text style={styles.secondaryActionText}>Analytics</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={handleExportPress}
              style={({ pressed }) => [
                styles.secondaryActionButton,
                pressed && { opacity: 0.8 },
              ]}>
              <Ionicons name="download-outline" size={16} color="#94A3B8" />
              <Text style={styles.secondaryActionText}>Export</Text>
            </Pressable>
          </View>

          {/* Subscriptions List Header */}
          <View style={styles.listHeaderRow}>
            <View>
              <Text style={styles.listTitle}>Recurring Outflows</Text>
              <Text style={styles.listSubtitle}>
                {filteredSubscriptions.length} subscriptions tracked
              </Text>
            </View>
            {currentTier === 'free' && (
              <View style={styles.limitBadge}>
                <Ionicons name="lock-closed" size={10} color="#F59E0B" />
                <Text style={styles.limitBadgeText}>Limit: 3 Subs</Text>
              </View>
            )}
          </View>

          {/* Category Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilterRow}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.filterChip,
                  selectedCategory === cat && styles.filterChipActive,
                ]}>
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === cat && styles.filterChipTextActive,
                  ]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Subscriptions Cards List */}
          <View style={styles.cardsContainer}>
            {filteredSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onDelete={handleDeleteSubscription}
                onPress={() => {
                  Alert.alert(
                    sub.name,
                    `${sub.name} is billed ${sub.billingCycle.toLowerCase()} at ${formatNaira(
                      sub.cost
                    )}.\nNext renewal date: ${sub.nextRenewalDate}.`
                  );
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Modals */}
      <AddSubscriptionModal
        visible={showAddModal}
        canAddWithoutPaywall={canAddWithoutPaywall}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveSubscription}
        onTriggerPaywall={() => setShowPaywallModal(true)}
      />

      <AnalyticsModal
        visible={showAnalyticsModal}
        totalMonthly={totalMonthly}
        onClose={() => setShowAnalyticsModal(false)}
        onTriggerPaywall={() => setShowPaywallModal(true)}
      />

      <PaywallModal
        visible={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onSelectTier={handleSelectPaywallTier}
      />

      <TwistCheckoutModal
        visible={showTwistCheckoutModal}
        tier={targetCheckoutTier}
        onClose={() => setShowTwistCheckoutModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <TwistSuccessModal
        visible={showTwistSuccessModal}
        onDismiss={handleDismissSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  metricsGrid: {
    gap: 10,
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  primaryActionButton: {
    flex: 1.6,
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryActionText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: -0.3,
  },
  listSubtitle: {
    color: Theme.colors.textMuted,
    fontSize: 11,
    fontFamily: Theme.typography.fontFamily,
    marginTop: 1,
  },
  limitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  limitBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '800',
  },
  categoryFilterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  filterChip: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterChipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
  },
  filterChipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
  },
  filterChipTextActive: {
    color: '#10B981',
    fontWeight: '700',
  },
  cardsContainer: {
    paddingBottom: 20,
  },
});
