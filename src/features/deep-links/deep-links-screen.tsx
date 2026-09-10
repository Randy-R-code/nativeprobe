import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FieldList } from '@/components/ui/field-list';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { useTheme } from '@/lib/theme-context';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

export type DeepLinksScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function DeepLinksScreen({ probe, status }: DeepLinksScreenProps) {
  const t = useT();
  const { colors } = useTheme();
  const scheme = Linking.createURL('/');
  const [incomingUrl, setIncomingUrl] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<ReturnType<typeof Linking.parse> | null>(null);
  const [openError, setOpenError] = useState<string | null>(null);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) setIncomingUrl(url);
    });
    const subscription = Linking.addEventListener('url', (event) => {
      setIncomingUrl(event.url);
    });
    return () => subscription.remove();
  }, []);

  const handleValidate = () => {
    if (!input) return;
    setOpenError(null);
    setParsed(Linking.parse(input));
  };

  const handleOpen = () => {
    if (!input) return;
    setOpenError(null);
    Linking.openURL(input).catch(() => {
      setOpenError(t('probe.deep-links.openFailed'));
    });
  };

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-linking">
      <FieldList
        fields={[
          { label: t('probe.deep-links.field.scheme'), value: scheme },
          {
            label: t('probe.deep-links.field.incomingUrl'),
            value: incomingUrl ?? t('probe.deep-links.none'),
          },
        ]}
      />

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder={t('probe.deep-links.placeholder')}
        placeholderTextColor={colors['muted-foreground']}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel={t('probe.deep-links.placeholder')}
        className="rounded-xl border border-border bg-card px-3 py-3 text-foreground"
      />

      <View className="flex-row gap-2">
        <Button
          label={t('probe.deep-links.action.validate')}
          variant="secondary"
          onPress={handleValidate}
        />
        <Button label={t('probe.deep-links.action.open')} onPress={handleOpen} />
      </View>

      {openError ? (
        <Text variant="body-sm" className="text-destructive">
          {openError}
        </Text>
      ) : null}

      {parsed ? (
        <Card>
          <Text variant="section-label">{t('probe.deep-links.parsed.title')}</Text>
          <View className="mt-2 gap-1">
            <Text variant="mono">
              {t('probe.deep-links.parsed.scheme')}: {parsed.scheme ?? '—'}
            </Text>
            <Text variant="mono">
              {t('probe.deep-links.parsed.hostname')}: {parsed.hostname ?? '—'}
            </Text>
            <Text variant="mono">
              {t('probe.deep-links.parsed.path')}: {parsed.path ?? '—'}
            </Text>
            <Text variant="mono">
              {t('probe.deep-links.parsed.queryParams')}: {JSON.stringify(parsed.queryParams ?? {})}
            </Text>
          </View>
        </Card>
      ) : null}
    </ProbeScreenShell>
  );
}
