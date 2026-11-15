import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/theme';
import { PricingTier } from '@/types/subscription';

interface HeaderBarProps {
  currentTier: PricingTier;
  onUpgradePress: () => void;
  onResetPress: () => void;
  onNotificationPress: () => void;
}

export function HeaderBar({
  currentTier,
  onUpgradePress,
  onResetPress,
  onNotificationPress,
}: HeaderBarProps) {
  const isPro = currentTier !== 'free';

  return (
    <View style={styles.container}>
      {/* Brand & User Row */}
      <View style={styles.topRow}>
        <View style={styles.brandGroup}>
          <View style={styles.logoBadge}>
            <Ionicons name="repeat" size={18} color="#10B981" />
          </View>
          <View>
            <Text style={styles.brandName}>Subscription Manager</Text>
            <Text style={styles.brandSubtitle}>Pro Enterprise Edition</Text>
          </View>
        </View>

        <View style={styles.actionsGroup}>
          {/* Plan Badge / Upgrade Trigger */}
          <Pressable
            accessibilityRole="button"
            onPress={onUpgradePress}
            style={[
              styles.tierBadge,
              isPro ? styles.tierBadgePro : styles.tierBadgeFree,
            ]}>
            <Ionicons
              name={isPro ? 'sparkles' : 'lock-closed'}
              size={11}
              color={isPro ? '#000000' : '#F59E0B'}
            />
            <Text
              style={[
                styles.tierBadgeText,
                isPro ? styles.tierBadgeTextPro : styles.tierBadgeTextFree,
              ]}>
              {isPro ? 'PRO ACTIVE' : 'FREE TIER (3/3)'}
            </Text>
          </Pressable>

          {/* Notification Bell */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            onPress={onNotificationPress}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && { opacity: 0.6 },
            ]}>
            <Ionicons name="notifications-outline" size={20} color="#94A3B8" />
            <View style={styles.notificationDot} />
          </Pressable>

          {/* Quick Reset Tool for Content Creator Skits */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reset Skit for New Take"
            onPress={onResetPress}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && { opacity: 0.6 },
            ]}>
            <Ionicons name="refresh" size={18} color="#64748B" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 12,
    backgroundColor: Theme.colors.background,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tierBadgeFree: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  tierBadgePro: {
    backgroundColor: '#F59E0B',
  },
  tierBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: Theme.typography.fontFamily,
  },
  tierBadgeTextFree: {
    color: '#F59E0B',
  },
  tierBadgeTextPro: {
    color: '#000000',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
});
