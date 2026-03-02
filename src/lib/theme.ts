/**
 * Centralized theme constants
 *
 * Single source of truth for colors, spacing, and styling values
 * used throughout the application.
 */

export const colors = {
  // Primary brand color
  primary: '#5E8B7E',
  primaryHover: '#4A7A6D',
  primaryLight: 'rgba(94, 139, 126, 0.06)',
  primaryBorder: 'rgba(94, 139, 126, 0.15)',

  // Text colors
  text: {
    primary: '#2D2D2D',
    secondary: '#5A5550',
    muted: '#8A8580',
  },

  // Background colors
  background: {
    page: '#FAF9F7',
    card: '#FFFFFF',
  },

  // Border colors
  border: {
    default: '#E8E4DF',
    light: '#D4CFC7',
  },

  // Accent colors for alerts and badges
  accent: {
    // Gold/premium - for clinical IPL, premium features
    gold: '#B8964E',
    goldLight: 'rgba(184, 150, 78, 0.08)',
    goldBorder: 'rgba(184, 150, 78, 0.15)',

    // Amber - for warnings, clinical IPL notices
    amber: '#B48C3C',
    amberLight: 'rgba(180, 140, 60, 0.08)',
    amberBorder: 'rgba(180, 140, 60, 0.15)',

    // Coral/red - for errors, verification needed
    coral: '#C46B5C',
    coralLight: 'rgba(196, 107, 92, 0.08)',
    coralBorder: 'rgba(196, 107, 92, 0.15)',

    // Blue - for info
    blue: '#4A7CB0',
    blueLight: 'rgba(74, 124, 176, 0.08)',
    blueBorder: 'rgba(74, 124, 176, 0.15)',

    // Teal - for success
    teal: '#4A9E94',
    tealLight: 'rgba(74, 158, 148, 0.08)',
    tealBorder: 'rgba(74, 158, 148, 0.15)',
  },
} as const;

export const typography = {
  fontFamily: {
    heading: 'var(--font-dm-sans), system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.7rem',
    sm: '0.875rem',
    base: '0.9375rem',
    md: '1rem',
    lg: '1.0625rem',
    xl: '1.125rem',
    '2xl': '1.25rem',
    '3xl': 'clamp(1.75rem, 5vw, 2.5rem)',
    '4xl': 'clamp(2rem, 6vw, 3.5rem)',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.1em',
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.4,
    normal: 1.6,
    relaxed: 1.7,
    loose: 1.8,
  },
} as const;

export const spacing = {
  section: {
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
  },
} as const;

export const borderRadius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  full: '9999px',
} as const;
