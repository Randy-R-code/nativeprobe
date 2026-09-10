import { Stack } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';

export default function AboutScreen() {
  const t = useT();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('about.title') }} />
      <Screen>
        <Text variant="title">{t('app.name')}</Text>
        <Text variant="subtitle" className="mt-1">
          {t('app.tagline')}
        </Text>
        <Text variant="body" className="mt-6">
          {t('about.body')}
        </Text>
      </Screen>
    </>
  );
}
