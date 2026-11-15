import React from 'react';
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
import { ConfettiOverlay } from '@/components/Confetti';

interface TwistSuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export function TwistSuccessModal({
  visible,
  onDismiss,
}: TwistSuccessModalProps) {
  const handleDismiss = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch {}
    onDismiss();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleDismiss}>
      <View style={styles.backdrop}>
        <ConfettiOverlay />

        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Success Icon */}
            <View style={styles.iconWrapper}>
              <Ionicons name="checkmark-circle" size={68} color="#10B981" />
            </View>

            {/* Title */}
            <Text style={styles.title}>Subscription Activated!</Text>
            <Text style={styles.subtitle}>
              Congratulations! You are now subscribed to manage your subscriptions.
            </Text>

            {/* The Extra Ridiculous Punchline Box */}
            <View style={styles.punchlineBox}>
              <View style={styles.punchlineTag}>
                <Ionicons name="sparkles" size={11} color="#000000" />
                <Text style={styles.punchlineTagText}>NEW SUBSCRIPTION UNLOCKED</Text>
              </View>

              <Text style={styles.punchlineHeader}>Your first subscription to manage is...</Text>
              <Text style={styles.appTitle}>Subscription Manager Pro</Text>
              <Text style={styles.appPrice}>₦2,999 / month</Text>

              <View style={styles.divider} />

              <Text style={styles.ironicExplanation}>
                You are now officially paying a recurring monthly subscription to track the subscription you just bought to track your other subscriptions.
              </Text>

              <View style={styles.cancellationNotice}>
                <Ionicons name="warning-outline" size={14} color="#F59E0B" />
                <Text style={styles.cancellationNoticeText}>
                  Notice: To cancel your Subscription Manager Pro subscription, you will need our upcoming Subscription Cancellation Subscription (₦3,500/mo).
                </Text>
              </View>
            </View>

            {/* Dismiss Button */}
            <Pressable
              accessibilityRole="button"
              onPress={handleDismiss}
              style={({ pressed }) => [
                styles.continueButton,
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}>
              <Text style={styles.continueButtonText}>
                Manage My Subscriptions (Including This One)
              </Text>
              <Ionicons name="arrow-forward" size={17} color="#000000" />
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
    backgroundColor: 'rgba(5, 6, 10, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxHeight: '88%',
    backgroundColor: Theme.colors.modalBackground,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#10B981',
    padding: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  scrollContent: {
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 20,
  },
  punchlineBox: {
    width: '100%',
    backgroundColor: '#161922',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262D3D',
    padding: 16,
    alignItems: 'center',
    marginBottom: 22,
  },
  punchlineTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 10,
  },
  punchlineTagText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  punchlineHeader: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 4,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    textAlign: 'center',
  },
  appPrice: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '900',
    fontFamily: Theme.typography.fontFamily,
    marginVertical: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#262D3D',
    marginVertical: 12,
  },
  ironicExplanation: {
    color: '#E2E8F0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 12,
  },
  cancellationNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    borderRadius: 10,
    padding: 10,
  },
  cancellationNoticeText: {
    color: '#FDE68A',
    fontSize: 10,
    lineHeight: 14,
    flex: 1,
    fontFamily: Theme.typography.fontFamily,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    textAlign: 'center',
  },
});
