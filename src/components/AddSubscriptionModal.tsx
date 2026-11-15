import React, { useState } from 'react';
import {
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
import { BillingCycle, Subscription, SubscriptionCategory } from '@/types/subscription';
import { QUICK_TEMPLATES } from '@/constants/mockData';

interface AddSubscriptionModalProps {
  visible: boolean;
  canAddWithoutPaywall: boolean;
  onClose: () => void;
  onSave: (subscription: Omit<Subscription, 'id'>) => void;
  onTriggerPaywall: () => void;
}

const CATEGORIES: SubscriptionCategory[] = [
  'Entertainment',
  'AI & Tech',
  'Cloud & Storage',
  'Music',
  'Health & Fitness',
  'Productivity',
  'Utilities',
];

const BILLING_CYCLES: BillingCycle[] = ['Monthly', 'Annual', 'Weekly'];

export function AddSubscriptionModal({
  visible,
  canAddWithoutPaywall,
  onClose,
  onSave,
  onTriggerPaywall,
}: AddSubscriptionModalProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('Monthly');
  const [category, setCategory] = useState<SubscriptionCategory>('Entertainment');
  const [renewalDate, setRenewalDate] = useState('Nov 25, 2026');

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(style);
      }
    } catch {}
  };

  const handleSelectTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setName(template.name);
    setCost(template.cost.toString());
    setCategory(template.category as SubscriptionCategory);
  };

  const handleSavePress = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);

    // If user is on the Free tier and has hit the limit -> TRIGGER THE PAYWALL!
    if (!canAddWithoutPaywall) {
      onClose();
      setTimeout(() => {
        onTriggerPaywall();
      }, 250);
      return;
    }

    if (!name.trim()) return;

    const parsedCost = parseInt(cost.replace(/[^0-9]/g, ''), 10) || 2500;
    const templateMatch = QUICK_TEMPLATES.find((t) => t.name.toLowerCase() === name.trim().toLowerCase());

    onSave({
      name: name.trim(),
      cost: parsedCost,
      billingCycle,
      category,
      nextRenewalDate: renewalDate,
      daysUntilRenewal: 21,
      iconName: templateMatch ? templateMatch.iconName : 'card-outline',
      accentColor: templateMatch ? templateMatch.accentColor : '#6366F1',
    });

    // Reset fields
    setName('');
    setCost('');
    onClose();
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
            {/* Handle */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Add New Subscription</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color="#94A3B8" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              {/* Quick Template Suggestions */}
              <Text style={styles.sectionLabel}>POPULAR TEMPLATES</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.templatesRow}>
                {QUICK_TEMPLATES.map((tmpl) => (
                  <Pressable
                    key={tmpl.name}
                    onPress={() => handleSelectTemplate(tmpl)}
                    style={[
                      styles.templateChip,
                      name === tmpl.name && styles.templateChipActive,
                    ]}>
                    <Text
                      style={[
                        styles.templateChipText,
                        name === tmpl.name && styles.templateChipTextActive,
                      ]}>
                      {tmpl.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Subscription Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>SUBSCRIPTION NAME</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="bookmark-outline" size={17} color="#64748B" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Disney+, GitHub Copilot, Adobe"
                    placeholderTextColor="#475569"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Monthly Cost Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>MONTHLY COST (₦)</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.nairaPrefix}>₦</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="4,500"
                    placeholderTextColor="#475569"
                    keyboardType="numeric"
                    value={cost}
                    onChangeText={setCost}
                  />
                </View>
              </View>

              {/* Billing Cycle */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>BILLING CYCLE</Text>
                <View style={styles.pillsRow}>
                  {BILLING_CYCLES.map((cycle) => (
                    <Pressable
                      key={cycle}
                      onPress={() => setBillingCycle(cycle)}
                      style={[
                        styles.cyclePill,
                        billingCycle === cycle && styles.cyclePillActive,
                      ]}>
                      <Text
                        style={[
                          styles.cyclePillText,
                          billingCycle === cycle && styles.cyclePillTextActive,
                        ]}>
                        {cycle}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Category */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CATEGORY</Text>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={[
                        styles.categoryChip,
                        category === cat && styles.categoryChipActive,
                      ]}>
                      <Text
                        style={[
                          styles.categoryChipText,
                          category === cat && styles.categoryChipTextActive,
                        ]}>
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Next Renewal Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>NEXT RENEWAL DATE</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="calendar-outline" size={17} color="#64748B" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nov 25, 2026"
                    placeholderTextColor="#475569"
                    value={renewalDate}
                    onChangeText={setRenewalDate}
                  />
                </View>
              </View>

              {/* Save Button */}
              <Pressable
                accessibilityRole="button"
                onPress={handleSavePress}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && { opacity: 0.85 },
                ]}>
                <Ionicons name="checkmark" size={18} color="#000000" />
                <Text style={styles.saveButtonText}>Track Subscription</Text>
              </Pressable>
            </ScrollView>
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: Theme.colors.modalBorder,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
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
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
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
  sectionLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  templatesRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  templateChip: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  templateChipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
  },
  templateChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
  },
  templateChipTextActive: {
    color: '#10B981',
  },
  inputGroup: {
    marginBottom: 14,
    gap: 6,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Theme.typography.fontFamily,
    letterSpacing: 0.4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
    borderRadius: Theme.radius.md,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
  },
  nairaPrefix: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Theme.typography.fontFamily,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cyclePill: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
  },
  cyclePillActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
  },
  cyclePillText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
  },
  cyclePillTextActive: {
    color: '#10B981',
    fontWeight: '700',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderColor: '#6366F1',
  },
  categoryChipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Theme.typography.fontFamily,
  },
  categoryChipTextActive: {
    color: '#A5B4FC',
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: Theme.typography.fontFamily,
  },
});
