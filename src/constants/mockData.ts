import { Subscription } from '@/types/subscription';

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-chatgpt',
    name: 'ChatGPT Plus',
    cost: 30000,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 28, 2026',
    daysUntilRenewal: 25,
    category: 'AI & Tech',
    iconName: 'hardware-chip-outline',
    accentColor: '#10B981',
  },
  {
    id: 'sub-gym',
    name: 'Fitness Pro Gym',
    cost: 6500,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 8, 2026',
    daysUntilRenewal: 5,
    category: 'Health & Fitness',
    iconName: 'barbell-outline',
    accentColor: '#F97316',
  },
  {
    id: 'sub-netflix',
    name: 'Netflix Premium',
    cost: 4400,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 7, 2026',
    daysUntilRenewal: 4,
    category: 'Entertainment',
    iconName: 'film-outline',
    accentColor: '#E50914',
  },
  {
    id: 'sub-duolingo',
    name: 'Duolingo Super',
    cost: 2100,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 6, 2026',
    daysUntilRenewal: 3,
    category: 'Productivity',
    iconName: 'school-outline',
    accentColor: '#84CC16',
  },
  {
    id: 'sub-youtube',
    name: 'YouTube Premium',
    cost: 1700,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 18, 2026',
    daysUntilRenewal: 15,
    category: 'Entertainment',
    iconName: 'logo-youtube',
    accentColor: '#FF0000',
  },
  {
    id: 'sub-icloud',
    name: 'iCloud+ 2TB',
    cost: 1500,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 22, 2026',
    daysUntilRenewal: 19,
    category: 'Cloud & Storage',
    iconName: 'cloud-outline',
    accentColor: '#0284C7',
  },
  {
    id: 'sub-spotify',
    name: 'Spotify Family',
    cost: 1300,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Nov 14, 2026',
    daysUntilRenewal: 11,
    category: 'Music',
    iconName: 'musical-notes-outline',
    accentColor: '#22C55E',
  },
  {
    id: 'sub-notion',
    name: 'Notion Plus',
    cost: 1000,
    billingCycle: 'Monthly',
    nextRenewalDate: 'Dec 1, 2026',
    daysUntilRenewal: 28,
    category: 'Productivity',
    iconName: 'document-text-outline',
    accentColor: '#6366F1',
  },
];

// The Ironic App Subscription that gets added to their list!
export const APP_PRO_SUBSCRIPTION: Subscription = {
  id: 'sub-app-pro',
  name: 'Subscription Manager Pro',
  cost: 2999,
  billingCycle: 'Monthly',
  nextRenewalDate: 'Dec 3, 2026',
  daysUntilRenewal: 30,
  category: 'Productivity',
  iconName: 'shield-checkmark',
  accentColor: '#F59E0B',
  isManagedByApp: true,
};

export const SPENDING_HISTORY = [
  { month: 'Jun', amount: 38000, heightPct: 0.65 },
  { month: 'Jul', amount: 41000, heightPct: 0.72 },
  { month: 'Aug', amount: 43500, heightPct: 0.78 },
  { month: 'Sep', amount: 45000, heightPct: 0.83 },
  { month: 'Oct', amount: 46500, heightPct: 0.88 },
  { month: 'Nov', amount: 48500, heightPct: 1.0, isCurrent: true },
];

export const CATEGORY_BREAKDOWN = [
  { name: 'AI & Tech', amount: 30000, percentage: 61.8, color: '#10B981' },
  { name: 'Health & Fitness', amount: 6500, percentage: 13.4, color: '#F97316' },
  { name: 'Entertainment', amount: 6100, percentage: 12.6, color: '#E50914' },
  { name: 'Productivity', amount: 3100, percentage: 6.4, color: '#6366F1' },
  { name: 'Cloud & Storage', amount: 1500, percentage: 3.1, color: '#0284C7' },
  { name: 'Music', amount: 1300, percentage: 2.7, color: '#22C55E' },
];

export const QUICK_TEMPLATES = [
  { name: 'Netflix', cost: 4400, category: 'Entertainment', iconName: 'film-outline', accentColor: '#E50914' },
  { name: 'Spotify', cost: 1300, category: 'Music', iconName: 'musical-notes-outline', accentColor: '#22C55E' },
  { name: 'ChatGPT Plus', cost: 30000, category: 'AI & Tech', iconName: 'hardware-chip-outline', accentColor: '#10B981' },
  { name: 'Amazon Prime', cost: 2300, category: 'Entertainment', iconName: 'cart-outline', accentColor: '#F59E0B' },
  { name: 'Apple Music', cost: 1200, category: 'Music', iconName: 'musical-notes-outline', accentColor: '#EC4899' },
  { name: 'Google One', cost: 1400, category: 'Cloud & Storage', iconName: 'cloud-outline', accentColor: '#3B82F6' },
  { name: 'Adobe Creative Cloud', cost: 25000, category: 'Productivity', iconName: 'color-palette-outline', accentColor: '#EF4444' },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}
