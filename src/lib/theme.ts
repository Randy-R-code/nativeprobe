// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for every color in the app.
//
// These tokens feed BOTH:
//   1. Tailwind/NativeWind classes (`bg-background`, `text-foreground`, …)
//      via the CSS variables wired in `tailwind.config.js` + `global.css`.
//   2. Native APIs that cannot take a className (StatusBar style, activity
//      indicators, …) via the `useTheme()` hook in `./theme-context.tsx`.
//
// To change a color: edit the value here — nowhere else. Never inline a hex
// in a screen or component; read it from `useTheme().colors` or a Tailwind
// token.
// ─────────────────────────────────────────────────────────────────────────

export type ColorScheme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  muted: string;
  'muted-foreground': string;
  border: string;
  primary: string;
  'primary-foreground': string;
  success: string;
  warning: string;
  destructive: string;
};

export const themes: Record<ColorScheme, ThemeColors> = {
  light: {
    background: '#FFFFFF',
    foreground: '#0B0F14',
    card: '#FFFFFF',
    'card-foreground': '#0B0F14',
    muted: '#F1F4F7',
    'muted-foreground': '#64748B',
    border: '#E2E8F0',
    primary: '#2563EB',
    'primary-foreground': '#FFFFFF',
    success: '#16A34A',
    warning: '#D97706',
    destructive: '#DC2626',
  },
  dark: {
    background: '#0B0F14',
    foreground: '#F1F5F9',
    card: '#121821',
    'card-foreground': '#F1F5F9',
    muted: '#1C2430',
    'muted-foreground': '#94A3B8',
    border: '#263241',
    primary: '#3B82F6',
    'primary-foreground': '#0B0F14',
    success: '#22C55E',
    warning: '#F59E0B',
    destructive: '#EF4444',
  },
};

export const themeTokens = Object.keys(themes.light) as (keyof ThemeColors)[];

/**
 * Build the NativeWind `vars()` payload for a scheme: `{ '--color-background': '#…' }`.
 * Applied on a wrapping View, it reskins every `var(--color-*)` Tailwind token above.
 * Keep these keys in sync with `tailwind.config.js` and the `:root` block in `global.css`.
 */
export function toCssVars(scheme: ColorScheme): Record<string, string> {
  const palette = themes[scheme];
  const out: Record<string, string> = {};
  for (const token of themeTokens) {
    out[`--color-${token}`] = palette[token];
  }
  return out;
}
