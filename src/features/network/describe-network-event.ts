import type { TranslationKey } from '@/types/i18n';

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

// Pure and native-import-free on purpose: expo-network (like most Expo
// native modules) transitively pulls in react-native, which `bun test`
// can't parse. The enum -> translation-key lookup stays in the screen,
// which already needs the real `Network` import anyway — this only takes
// the already-resolved primitives, so it's safe to unit test directly.
export function describeNetworkEvent(
  isConnected: boolean,
  typeLabel: string,
  t: Translate
): string {
  if (isConnected) {
    return t('probe.network.log.connected', { type: typeLabel });
  }
  return t('probe.network.log.disconnected');
}
