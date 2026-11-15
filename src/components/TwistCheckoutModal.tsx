import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/theme';
import { PricingTier } from '@/types/subscription';

interface TwistCheckoutModalProps {
  visible: boolean;
  tier: PricingTier;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const AUTHORIZATION_STEPS = [
  'Connecting to Central Subscription Authority...',
  'Authorizing recurring management mandate...',
  'Establishing recursive subscription loop...',
  'Verifying that you are paying to manage your payments...',
];

export function TwistCheckoutModal({
  visible,
  tier,
  onClose,
  onPaymentSuccess,
}: TwistCheckoutModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStepIndex, setProcessStepIndex] = useState(0);

  const priceText = tier === 'enterprise' ? '₦14,999' : '₦2,999';

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(style);
      }
    } catch {}
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  const handleCvvChange = (text: string) => {
    setCvv(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  // Quick auto-fill button for fast video skit takes
  const handleAutoFillDemo = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setCardNumber('5399 4120 8831 9024');
    setCardHolder('CHIDERA OKONKWO');
    setExpiry('11/29');
    setCvv('782');
  };

  const handleSubscribePress = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    setIsProcessing(true);
    setProcessStepIndex(0);

    setTimeout(() => {
      setProcessStepIndex(1);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    }, 850);

    setTimeout(() => {
      setProcessStepIndex(2);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    }, 1750);

    setTimeout(() => {
      setProcessStepIndex(3);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    }, 2600);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 3500);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}>
          <View style={styles.sheet}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {isProcessing ? (
              <View style={styles.processingContainer}>
                <View style={styles.spinnerWrap}>
                  <ActivityIndicator size="large" color="#10B981" />
                </View>
                <Text style={styles.processingTitle}>Authorizing Subscription</Text>
                <Text style={styles.processingStepText}>
                  {AUTHORIZATION_STEPS[processStepIndex]}
                </Text>
                <View style={styles.securityPill}>
                  <Ionicons name="lock-closed" size={13} color="#94A3B8" />
                  <Text style={styles.securityPillText}>256-Bit Recursive Billing Protocol</Text>
                </View>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                {/* Header with Back and Demo Fill */}
                <View style={styles.navRow}>
                  <Pressable onPress={onClose} style={styles.navBack}>
                    <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                    <Text style={styles.navBackText}>Plans</Text>
                  </Pressable>
                  <Text style={styles.navTitle}>Management Mandate</Text>
                  <Pressable onPress={handleAutoFillDemo} style={styles.demoPill}>
                    <Ionicons name="flash" size={11} color="#000000" />
                    <Text style={styles.demoPillText}>Demo</Text>
                  </Pressable>
                </View>

                {/* The Extra Ridiculous Hook Title */}
                <View style={styles.ironicBox}>
                  <Ionicons name="information-circle" size={18} color="#F59E0B" />
                  <Text style={styles.ironicBoxText}>
                    Before managing your subscriptions, you must first subscribe to our subscription management subscription.
                  </Text>
                </View>

                {/* Plan Checkout Summary */}
                <View style={styles.planSummaryCard}>
                  <View style={styles.planSummaryInfo}>
                    <Text style={styles.planSummaryName}>
                      Subscription Manager Pro Subscription
                    </Text>
                    <Text style={styles.planSummarySub}>
                      Recurring monthly fee to track recurring monthly fees
                    </Text>
                  </View>
                  <View style={styles.planSummaryPriceWrap}>
                    <Text style={styles.planSummaryPrice}>{priceText}</Text>
                    <Text style={styles.planSummaryPeriod}>/month</Text>
                  </View>
                </View>

                {/* Virtual Metal Debit Card */}
                <View style={styles.cardPreview}>
                  <View style={styles.cardPreviewHeader}>
                    <View style={styles.cardChip} />
                    <Ionicons name="wifi" size={18} color="#94A3B8" style={{ transform: [{ rotate: '90deg' }] }} />
                  </View>

                  <Text style={styles.cardPreviewNumber}>
                    {cardNumber || '•••• •••• •••• ••••'}
                  </Text>

                  <View style={styles.cardPreviewFooter}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardLabel}>CARDHOLDER</Text>
                      <Text numberOfLines={1} style={styles.cardHolderText}>
                        {cardHolder.toUpperCase() || 'YOUR NAME'}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginLeft: 12 }}>
                      <Text style={styles.cardLabel}>EXPIRES</Text>
                      <Text style={styles.cardExpiryText}>{expiry || 'MM/YY'}</Text>
                    </View>
                    <View style={styles.mastercardGraphic}>
                      <View style={[styles.mcCircle, { backgroundColor: '#EB001B' }]} />
                      <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -8 }]} />
                    </View>
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.formGroup}>
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>CARD NUMBER</Text>
                    <View style={styles.inputField}>
                      <Ionicons name="card-outline" size={17} color="#64748B" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="5399 4120 8831 9024"
                        placeholderTextColor="#475569"
                        keyboardType="numeric"
                        value={cardNumber}
                        onChangeText={handleCardNumberChange}
                        maxLength={19}
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>CARDHOLDER NAME</Text>
                    <View style={styles.inputField}>
                      <Ionicons name="person-outline" size={17} color="#64748B" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Chidera Okonkwo"
                        placeholderTextColor="#475569"
                        autoCapitalize="words"
                        value={cardHolder}
                        onChangeText={setCardHolder}
                      />
                    </View>
                  </View>

                  <View style={styles.rowInputs}>
                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>EXPIRY DATE</Text>
                      <View style={styles.inputField}>
                        <Ionicons name="calendar-outline" size={17} color="#64748B" />
                        <TextInput
                          style={styles.textInput}
                          placeholder="MM/YY"
                          placeholderTextColor="#475569"
                          keyboardType="numeric"
                          value={expiry}
                          onChangeText={handleExpiryChange}
                          maxLength={5}
                        />
                      </View>
                    </View>

                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <View style={styles.inputField}>
                        <Ionicons name="lock-closed-outline" size={17} color="#64748B" />
                        <TextInput
                          style={styles.textInput}
                          placeholder="782"
                          placeholderTextColor="#475569"
                          keyboardType="numeric"
                          secureTextEntry
                          value={cvv}
                          onChangeText={handleCvvChange}
                          maxLength={3}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* The Big CTA Button */}
                <Pressable
                  accessibilityRole="button"
                  onPress={handleSubscribePress}
                  style={({ pressed }) => [
                    styles.submitButton,
                    pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                  ]}>
                  <Ionicons name="lock-closed" size={16} color="#000000" />
                  <Text style={styles.submitButtonText}>
                    Subscribe to Manage My Subscriptions
                  </Text>
                </Pressable>

                <View style={styles.securityFooter}>
                  <View style={styles.securityTag}>
                    <Ionicons name="shield-checkmark" size={12} color="#10B981" />
                    <Text style={styles.securityTagText}>256-Bit SSL</Text>
                  </View>
                  <View style={styles.securityTag}>
                    <Ionicons name="checkmark-circle" size={12} color="#94A3B8" />
                    <Text style={styles.securityTagText}>Cancel Anytime via Sub</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    width: '100%',
  },
  sheet: {
    backgroundColor: Theme.colors.modalBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navBackText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  navTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demoPillText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
  },
  ironicBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  ironicBoxText: {
    color: '#FDE68A',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    flex: 1,
    fontFamily: Theme.typography.fontFamily,
  },
  planSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    padding: 14,
    marginBottom: 14,
  },
  planSummaryInfo: {
    flex: 1,
    paddingRight: 10,
  },
  planSummaryName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
  },
  planSummarySub: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
    fontFamily: Theme.typography.fontFamily,
  },
  planSummaryPriceWrap: {
    alignItems: 'flex-end',
  },
  planSummaryPrice: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  planSummaryPeriod: {
    color: '#64748B',
    fontSize: 10,
  },
  cardPreview: {
    width: '100%',
    height: 140,
    backgroundColor: '#171B26',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2A3146',
    padding: 14,
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardChip: {
    width: 28,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#D97706',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  cardPreviewNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: Theme.typography.fontFamily,
  },
  cardPreviewFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#64748B',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  cardHolderText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  cardExpiryText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  mastercardGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  mcCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.9,
  },
  formGroup: {
    gap: 10,
    marginBottom: 14,
  },
  inputWrap: {
    gap: 4,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: Theme.typography.fontFamily,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 15,
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
  submitButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  securityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  securityTagText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  processingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  spinnerWrap: {
    marginBottom: 20,
    transform: [{ scale: 1.3 }],
  },
  processingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
    marginBottom: 8,
  },
  processingStepText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    fontFamily: Theme.typography.fontFamily,
  },
  securityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#171B26',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  securityPillText: {
    color: '#94A3B8',
    fontSize: 11,
  },
});
