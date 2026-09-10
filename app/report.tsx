import { Stack } from 'expo-router';
import { ReportScreen } from '@/features/report/report-screen';
import { useT } from '@/i18n';

export default function ReportRoute() {
  const t = useT();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('reportScreen.title') }} />
      <ReportScreen />
    </>
  );
}
