import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/theme';

interface MetricCardProps {
  title: string;
  value: string;
  changeText?: string;
  isPositiveChange?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  onPress?: () => void;
}

export function MetricCard({
  title,
  value,
  changeText,
  isPositiveChange = true,
  iconName,
  accentColor,
  onPress,
}: MetricCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}>
      <View style={styles.headerRow}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: `${accentColor}18`, borderColor: `${accentColor}40` },
          ]}>
          <Ionicons name={iconName} size={15} color={accentColor} />
        </View>
      </View>

      <Text numberOfLines={1} style={styles.value}>
        {value}
      </Text>

      {changeText && (
        <View style={styles.footerRow}>
          <View
            style={[
              styles.changePill,
              {
                backgroundColor: isPositiveChange
                  ? 'rgba(16, 185, 129, 0.12)'
                  : 'rgba(239, 68, 68, 0.12)',
              },
            ]}>
            <Ionicons
              name={isPositiveChange ? 'trending-up' : 'trending-down'}
              size={11}
              color={isPositiveChange ? '#10B981' : '#EF4444'}
            />
            <Text
              style={[
                styles.changeText,
                { color: isPositiveChange ? '#10B981' : '#EF4444' },
              ]}>
              {changeText}
            </Text>
          </View>
        </View>
      )}
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
    flex: 1,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: Theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: 0.2,
    flex: 1,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
  },
});
