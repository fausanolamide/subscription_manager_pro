import React from 'react';
import {
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

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const handlePress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    } catch {}
    onGetStarted();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Glow Ring & Logo */}
        <View style={styles.heroLogoSection}>
          <View style={styles.glowRing}>
            <View style={styles.logoCard}>
              <Ionicons name="repeat" size={38} color="#10B981" />
            </View>
          </View>
        </View>

        {/* Brand Name & Tagline */}
        <View style={styles.brandBadge}>
          <Ionicons name="shield-checkmark" size={12} color="#10B981" />
          <Text style={styles.brandBadgeText}>ENTERPRISE FINANCIAL INTELLIGENCE</Text>
        </View>

        <Text style={styles.title}>Subscription Manager Pro</Text>
        <Text style={styles.tagline}>
          Take control of your subscriptions.{'\n'}One subscription at a time.
        </Text>

        <Text style={styles.description}>
          One intelligent platform for managing all your recurring expenses.
        </Text>

        {/* Feature Highlights */}
        <View style={styles.featuresCard}>
          <View style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <Ionicons name="pulse" size={18} color="#10B981" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Automated Expense Tracking</Text>
              <Text style={styles.featureDesc}>
                Real-time monitoring across 120+ digital subscription providers.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <Ionicons name="sparkles" size={18} color="#6366F1" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>AI Waste Optimization</Text>
              <Text style={styles.featureDesc}>
                Identify and eliminate forgotten recurring charges.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <Ionicons name="lock-closed" size={18} color="#F59E0B" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Centralized Control</Text>
              <Text style={styles.featureDesc}>
                All renewal dates and invoices consolidated in one secure dashboard.
              </Text>
            </View>
          </View>
        </View>

        {/* Live Sample Ticker */}
        <View style={styles.tickerRow}>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>Netflix</Text>
          </View>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>Spotify</Text>
          </View>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>ChatGPT</Text>
          </View>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>iCloud</Text>
          </View>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>YouTube</Text>
          </View>
        </View>

        {/* Prominent Get Started CTA */}
        <Pressable
          accessibilityRole="button"
          onPress={handlePress}
          style={({ pressed }) => [
            styles.getStartedButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}>
          <Text style={styles.getStartedText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#000000" />
        </Pressable>

        <Text style={styles.trustFooter}>
          Trusted by 250,000+ budget optimizers globally
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroLogoSection: {
    marginVertical: 20,
    alignItems: 'center',
  },
  glowRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  logoCard: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#12151F',
    borderWidth: 1,
    borderColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  brandBadgeText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  description: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: Theme.typography.fontFamily,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  featuresCard: {
    width: '100%',
    backgroundColor: Theme.colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 18,
    gap: 16,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 2,
  },
  featureDesc: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 15,
    fontFamily: Theme.typography.fontFamily,
  },
  tickerRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  tickerPill: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tickerText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  getStartedText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  trustFooter: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 14,
  },
});
