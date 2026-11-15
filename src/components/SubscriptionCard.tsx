import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/theme';
import { Subscription } from '@/types/subscription';
import { formatNaira } from '@/constants/mockData';

interface SubscriptionCardProps {
  subscription: Subscription;
  onPress?: () => void;
  onDelete?: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  onPress,
  onDelete,
}: SubscriptionCardProps) {
  const isUrgent = subscription.daysUntilRenewal <= 5;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        subscription.isManagedByApp && styles.cardSelfManaged,
        pressed && styles.cardPressed,
      ]}>
      {/* Self-Managed App Ribbon */}
      {subscription.isManagedByApp && (
        <View style={styles.ironicBadge}>
          <Ionicons name="sparkles" size={10} color="#000000" />
          <Text style={styles.ironicBadgeText}>THIS APP&apos;S OWN SUBSCRIPTION</Text>
        </View>
      )}

      <View style={styles.mainRow}>
        {/* Category Icon */}
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: `${subscription.accentColor}18`,
              borderColor: `${subscription.accentColor}40`,
            },
          ]}>
          <Ionicons
            name={subscription.iconName as keyof typeof Ionicons.glyphMap}
            size={22}
            color={subscription.accentColor}
          />
        </View>

        {/* Info Column */}
        <View style={styles.infoCol}>
          <Text numberOfLines={1} style={styles.name}>
            {subscription.name}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{subscription.category}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.cycle}>{subscription.billingCycle}</Text>
          </View>
        </View>

        {/* Cost & Renewal Column */}
        <View style={styles.costCol}>
          <Text style={styles.cost}>
            {formatNaira(subscription.cost)}
            <Text style={styles.perMonth}>/mo</Text>
          </Text>

          <View
            style={[
              styles.renewalPill,
              isUrgent ? styles.renewalPillUrgent : styles.renewalPillNormal,
            ]}>
            <Ionicons
              name="time-outline"
              size={10}
              color={isUrgent ? '#EF4444' : '#94A3B8'}
            />
            <Text
              style={[
                styles.renewalText,
                isUrgent ? styles.renewalTextUrgent : styles.renewalTextNormal,
              ]}>
              in {subscription.daysUntilRenewal}d
            </Text>
          </View>
        </View>

        {/* Delete / Manage action if provided */}
        {onDelete && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Remove subscription"
            onPress={() => onDelete(subscription.id)}
            style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={15} color="#64748B" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  cardSelfManaged: {
    borderColor: '#F59E0B',
    backgroundColor: '#191A24',
    borderWidth: 1.5,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  ironicBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderBottomLeftRadius: 8,
  },
  ironicBadgeText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    color: Theme.colors.textMuted,
    fontSize: 11,
    fontFamily: Theme.typography.fontFamily,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Theme.colors.textMuted,
    marginHorizontal: 6,
  },
  cycle: {
    color: Theme.colors.textMuted,
    fontSize: 11,
    fontFamily: Theme.typography.fontFamily,
  },
  costCol: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  cost: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  perMonth: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.colors.textMuted,
  },
  renewalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  renewalPillNormal: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  renewalPillUrgent: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  renewalText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
  },
  renewalTextNormal: {
    color: Theme.colors.textSecondary,
  },
  renewalTextUrgent: {
    color: '#EF4444',
  },
  deleteButton: {
    padding: 6,
    marginLeft: 4,
  },
});
