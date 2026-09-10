import { I18nProvider } from '@/i18n/i18n-provider';
import { ThemeProvider } from '@/lib/theme-context';
import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SafeAreaProvider only measures real insets after a native layout event,
// which never fires under the test renderer — without `initialMetrics` it
// renders nothing at all. Values are an arbitrary but reasonable phone frame.
const TEST_SAFE_AREA_METRICS = {
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
  frame: { x: 0, y: 0, width: 390, height: 844 },
};

// Wraps a component with the same provider tree app/_layout.tsx mounts, so
// component tests exercise real i18n/theme resolution instead of mocking
// useT()/useTheme() individually.
function AllProviders({ children }: { children: ReactElement }) {
  return (
    <SafeAreaProvider initialMetrics={TEST_SAFE_AREA_METRICS}>
      <I18nProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}

export async function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react-native';
