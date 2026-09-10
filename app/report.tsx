import { Stack } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n';

export default function ReportScreen() {
  const t = useT();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('reportScreen.title') }} />
      <Screen>
        <Text variant="title">{t('reportScreen.title')}</Text>
        <Text variant="body" className="mt-4 text-muted-foreground">
          {t('reportScreen.comingSoon')}
        </Text>
      </Screen>
    </>
  );
}
