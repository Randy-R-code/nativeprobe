import { StatusBar } from 'expo-status-bar';
import { colorScheme as nativewindColorScheme, vars } from 'nativewind';
import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';
import { useColorScheme, View } from 'react-native';
import { type ColorScheme, type ThemeColors, themes, toCssVars } from './theme';

type ThemeState = {
  colors: ThemeColors;
  scheme: ColorScheme;
};

const ThemeContext = createContext<ThemeState | null>(null);

// Milestone 1 follows the system appearance only (spec: "Use system theme by
// default"). A manual override toggle is a later addition, not a V1 requirement.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  // Keep NativeWind's own color scheme in sync so any `dark:` variants resolve too.
  useEffect(() => {
    nativewindColorScheme.set(scheme);
  }, [scheme]);

  const value = useMemo<ThemeState>(() => ({ colors: themes[scheme], scheme }), [scheme]);

  return (
    <ThemeContext.Provider value={value}>
      {/* `vars()` swaps every `var(--color-*)` Tailwind token for descendants. */}
      <View style={vars(toCssVars(scheme))} className="flex-1 bg-background">
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
