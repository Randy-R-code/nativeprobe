import '../global.css';

import { I18nProvider } from '@/i18n/i18n-provider';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Native stack headers (headerShown: true screens like probe detail, report,
// about) don't pick up NativeWind classes — they need explicit RN Navigation
// header options, sourced from the same theme so they don't render the
// native default (light) header when the app is in dark mode.
function RootStack() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerTitleStyle: { color: colors.foreground },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nProvider>
          <ThemeProvider>
            <RootStack />
          </ThemeProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
