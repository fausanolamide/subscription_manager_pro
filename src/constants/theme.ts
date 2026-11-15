import { Platform } from 'react-native';

export const Theme = {
  colors: {
    // Backgrounds
    background: '#090A0F',
    surface: '#11131B',
    surfaceSubtle: '#171A24',
    card: '#151822',
    cardBorder: '#232736',
    cardBorderHighlight: '#3B82F6',

    // Accents & Status
    primary: '#10B981', // Crisp Emerald FinTech green
    primaryDark: '#059669',
    primaryLight: '#34D399',
    secondary: '#6366F1', // Indigo
    gold: '#F59E0B', // Pro Amber/Gold
    goldLight: '#FDE68A',
    danger: '#EF4444',
    info: '#3B82F6',

    // Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',

    // Overlays
    overlay: 'rgba(5, 6, 10, 0.85)',
    modalBackground: '#12141D',
    modalBorder: '#23283A',
  },
  typography: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
};
