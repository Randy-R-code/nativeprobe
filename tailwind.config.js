/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo', 'monospace'],
      },
      // Colors resolve from CSS variables set at runtime by `ThemeProvider`
      // (src/lib/theme-context.tsx) from the single source of truth in
      // `src/lib/theme.ts`. `global.css` holds the light defaults for the
      // first paint. Do not hardcode hex here — edit `src/lib/theme.ts`.
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        destructive: 'var(--color-destructive)',
      },
    },
  },
  plugins: [],
};
