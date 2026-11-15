export type SubscriptionCategory =
  | 'Entertainment'
  | 'AI & Tech'
  | 'Cloud & Storage'
  | 'Music'
  | 'Health & Fitness'
  | 'Productivity'
  | 'Utilities';

export type BillingCycle = 'Monthly' | 'Annual' | 'Weekly';

export interface Subscription {
  id: string;
  name: string;
  cost: number; // In Naira (₦)
  billingCycle: BillingCycle;
  nextRenewalDate: string; // e.g. "Nov 12, 2026"
  daysUntilRenewal: number;
  category: SubscriptionCategory;
  iconName: string;
  accentColor: string;
  isManagedByApp?: boolean;
}

export type PricingTier = 'free' | 'pro' | 'enterprise';

export interface UserSubscriptionState {
  currentTier: PricingTier;
  isSubscribedToApp: boolean;
  subscriptions: Subscription[];
}
