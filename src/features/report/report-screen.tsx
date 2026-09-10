import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Share, View } from 'react-native';
import { buildCapabilityReport } from './build-report';
import { type CapabilityReportV1, serializeReport } from './report-types';

export function ReportScreen() {
  const t = useT();
  const [report, setReport] = useState<CapabilityReportV1 | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    buildCapabilityReport()
      .then((next) => {
        if (!cancelled) setReport(next);
      })
      .catch(() => {
        if (!cancelled) setError(t('reportScreen.buildFailed'));
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  const json = report ? serializeReport(report) : null;

  const handleCopy = async () => {
    if (!json) return;
    await Clipboard.setStringAsync(json);
    setCopied(true);
  };

  const handleShare = () => {
    if (!json) return;
    Share.share({ message: json });
  };

  return (
    <Screen>
      <Text variant="title">{t('reportScreen.title')}</Text>
      <Text variant="body" className="mt-2 text-muted-foreground">
        {t('reportScreen.privacyNote')}
      </Text>

      <View className="mt-4 flex-row flex-wrap gap-2">
        <Button
          label={copied ? t('reportScreen.copied') : t('reportScreen.copy')}
          variant="secondary"
          onPress={handleCopy}
        />
        <Button label={t('reportScreen.share')} onPress={handleShare} />
      </View>

      <Card className="mt-4">
        {json ? (
          <Text variant="mono">{json}</Text>
        ) : (
          <Text variant="body-sm" className={error ? 'text-destructive' : 'text-muted-foreground'}>
            {error ?? t('reportScreen.building')}
          </Text>
        )}
      </Card>
    </Screen>
  );
}
