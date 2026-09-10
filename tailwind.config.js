/** @type {import('tailwindcss').Config} */

// The CSS variables hold "R G B" channel numbers (see src/lib/theme.ts), so
// opacity modifiers like `bg-primary/10` resolve correctly through rgb(... / <alpha-value>).
function withOpacity(variableName) {
  return `rgb(var(${variableName}) / <alpha-value>)`;
}

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
        background: withOpacity('--color-background'),
        foreground: withOpacity('--color-foreground'),
        card: withOpacity('--color-card'),
        'card-foreground': withOpacity('--color-card-foreground'),
        muted: withOpacity('--color-muted'),
        'muted-foreground': withOpacity('--color-muted-foreground'),
        border: withOpacity('--color-border'),
        primary: withOpacity('--color-primary'),
        'primary-foreground': withOpacity('--color-primary-foreground'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        destructive: withOpacity('--color-destructive'),
      },
    },
  },
  plugins: [],
};
