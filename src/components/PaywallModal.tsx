import React, { useState } from 'react';
import {
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
import { PricingTier } from '@/types/subscription';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTier: (tier: PricingTier) => void;
}

export function PaywallModal({
  visible,
  onClose,
  onSelectTier,
}: PaywallModalProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('pro');

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(style);
      }
    } catch {}
  };

  const handleTierSelect = (tier: PricingTier) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTier(tier);
  };

  const handleContinue = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    onSelectTier(selectedTier);
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
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#94A3B8" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Crown Badge */}
            <View style={styles.badgeRow}>
              <View style={styles.crownBadge}>
                <Ionicons name="sparkles" size={13} color="#000000" />
                <Text style={styles.crownBadgeText}>MANAGEMENT LIMIT REACHED</Text>
              </View>
            </View>

            {/* Headline & Subtitle */}
            <Text style={styles.title}>Your subscriptions deserve premium management.</Text>
            <Text style={styles.subtitle}>
              You&apos;ve reached your free management limit. Upgrade to Subscription Manager Pro to continue managing your subscriptions.
            </Text>

            {/* Plan 1: FREE */}
            <Pressable
              onPress={() => handleTierSelect('free')}
              style={[
                styles.planCard,
                selectedTier === 'free' && styles.planCardSelected,
              ]}>
              <View style={styles.planCardHeader}>
                <View>
                  <Text style={styles.planName}>FREE</Text>
                  <Text style={styles.planPrice}>
                    ₦0<Text style={styles.planPeriod}>/month</Text>
                  </Text>
                </View>
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                </View>
              </View>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark" size={14} color="#64748B" />
                  <Text style={styles.featureTextDisabled}>Manage up to 3 subscriptions</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark" size={14} color="#64748B" />
                  <Text style={styles.featureTextDisabled}>Basic dashboard</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark" size={14} color="#64748B" />
                  <Text style={styles.featureTextDisabled}>Limited insights</Text>
                </View>
              </View>
            </Pressable>

            {/* Plan 2: PRO (MOST POPULAR) */}
            <Pressable
              onPress={() => handleTierSelect('pro')}
              style={[
                styles.planCard,
                styles.proPlanCard,
                selectedTier === 'pro' && styles.proPlanCardSelected,
              ]}>
              <View style={styles.popularBadge}>
                <Ionicons name="flame" size={12} color="#000000" />
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>

              <View style={styles.planCardHeader}>
                <View>
                  <Text style={styles.proPlanName}>PRO</Text>
                  <Text style={styles.proPlanPrice}>
                    ₦2,999<Text style={styles.proPlanPeriod}>/month</Text>
                  </Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedTier === 'pro' && <View style={styles.radioButtonInner} />}
                </View>
              </View>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Unlimited subscriptions</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Advanced analytics & spending trends</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Automatic renewal tracking & alerts</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Comprehensive spending reports</Text>
                </View>
              </View>
            </Pressable>

            {/* Plan 3: ENTERPRISE (RIDICULOUSLY OVERPOWERED) */}
            <Pressable
              onPress={() => handleTierSelect('enterprise')}
              style={[
                styles.planCard,
                styles.enterprisePlanCard,
                selectedTier === 'enterprise' && styles.enterprisePlanCardSelected,
              ]}>
              <View style={styles.overpoweredBadge}>
                <Ionicons name="flash" size={11} color="#000000" />
                <Text style={styles.overpoweredBadgeText}>OVERPOWERED</Text>
              </View>

              <View style={styles.planCardHeader}>
                <View>
                  <Text style={styles.enterprisePlanName}>ENTERPRISE</Text>
                  <Text style={styles.enterprisePlanPrice}>
                    ₦14,999<Text style={styles.enterprisePlanPeriod}>/month</Text>
                  </Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedTier === 'enterprise' && <View style={styles.radioButtonInner} />}
                </View>
              </View>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="shield-checkmark" size={16} color="#F59E0B" />
                  <Text style={styles.featureText}>Everything in Pro</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="infinite" size={16} color="#F59E0B" />
                  <Text style={styles.featureText}>Unlimited financial insights</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="headset" size={16} color="#F59E0B" />
                  <Text style={styles.featureText}>24/7 Priority Emergency Support</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="person" size={16} color="#F59E0B" />
                  <Text style={[styles.featureText, { color: '#FCD34D', fontWeight: '700' }]}>
                    Dedicated Personal Subscription Manager (comes to your home to manually cancel subscriptions)
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="planet" size={16} color="#F59E0B" />
                  <Text style={styles.featureText}>Satellite Renewal Surveillance</Text>
                </View>
              </View>
            </Pressable>

            {/* CTA Button */}
            <Pressable
              accessibilityRole="button"
              onPress={handleContinue}
              style={({ pressed }) => [
                styles.upgradeButton,
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}>
              <Text style={styles.upgradeButtonText}>
                {selectedTier === 'free'
                  ? 'Stay on Free (Locked)'
                  : selectedTier === 'enterprise'
                  ? 'Upgrade to Enterprise (₦14,999/mo)'
                  : 'Upgrade to Pro (₦2,999/mo)'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#000000" />
            </Pressable>

            <Pressable onPress={onClose} style={styles.maybeLaterButton}>
              <Text style={styles.maybeLaterText}>Maybe later (keep subscriptions unmanaged)</Text>
            </Pressable>
          </ScrollView>
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: Theme.colors.modalBorder,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '94%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 4,
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
    alignItems: 'center',
    paddingBottom: 20,
  },
  badgeRow: {
    marginBottom: 8,
  },
  crownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  crownBadgeText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: Theme.typography.fontFamily,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  planCard: {
    width: '100%',
    backgroundColor: Theme.colors.card,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Theme.colors.cardBorder,
    padding: 16,
    marginBottom: 14,
  },
  planCardSelected: {
    borderColor: '#64748B',
  },
  proPlanCard: {
    borderColor: '#10B981',
    backgroundColor: '#121E19',
    position: 'relative',
  },
  proPlanCardSelected: {
    borderColor: '#10B981',
    borderWidth: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  popularBadgeText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  enterprisePlanCard: {
    borderColor: '#F59E0B',
    backgroundColor: '#1E1A14',
    position: 'relative',
  },
  enterprisePlanCardSelected: {
    borderColor: '#F59E0B',
    borderWidth: 2,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  overpoweredBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  overpoweredBadgeText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  planPeriod: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  proPlanName: {
    color: '#34D399',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  proPlanPrice: {
    color: '#10B981',
    fontSize: 24,
    fontWeight: '900',
  },
  proPlanPeriod: {
    color: '#A7F3D0',
    fontSize: 13,
    fontWeight: '500',
  },
  enterprisePlanName: {
    color: '#FBBF24',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  enterprisePlanPrice: {
    color: '#F59E0B',
    fontSize: 24,
    fontWeight: '900',
  },
  enterprisePlanPeriod: {
    color: '#FDE68A',
    fontSize: 13,
    fontWeight: '500',
  },
  currentBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  currentBadgeText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
    fontFamily: Theme.typography.fontFamily,
  },
  featureTextDisabled: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
    fontFamily: Theme.typography.fontFamily,
  },
  upgradeButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  upgradeButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  maybeLaterButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 2,
  },
  maybeLaterText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
});
