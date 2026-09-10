import type { TranslationKey } from '@/types/i18n';
import * as Localization from 'expo-localization';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import en from './locales/en.json';
import fr from './locales/fr.json';
import { interpolate, resolve } from './resolve';

const dictionaries = { en, fr } as const;

export type Locale = keyof typeof dictionaries;

function detectLocale(): Locale {
  const [preferred] = Localization.getLocales();
  return preferred?.languageCode === 'fr' ? 'fr' : 'en';
}

type I18nState = {
  locale: Locale;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nState | null>(null);

// Detects the device locale once (EN fallback/default per spec). No manual
// language switcher in V1 — the translation structure just has to make one
// trivial to add later without touching feature code.
export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useMemo(() => detectLocale(), []);

  const value = useMemo<I18nState>(() => {
    const t: I18nState['t'] = (key, vars) => {
      const template = resolve(dictionaries[locale], key) ?? resolve(dictionaries.en, key) ?? key;
      return interpolate(template, vars);
    };
    return { locale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nState {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT/useLocale must be used within I18nProvider');
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function useLocale() {
  return useI18n().locale;
}
