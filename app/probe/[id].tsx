import { Screen } from '@/components/ui/screen';
import { StatusChip } from '@/components/ui/status-chip';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { useTheme } from '@/lib/theme-context';
import { getProbe } from '@/probes/registry';
import { probeScreens } from '@/probes/screens';
import type { ProbeAvailability, ProbeDefinition, ProbeId } from '@/probes/types';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

function PlaceholderScreen({
  probe,
  status,
}: {
  probe: ProbeDefinition;
  status: ProbeAvailability;
}) {
  const t = useT();
  const { colors } = useTheme();

  return (
    <Screen>
      <View className="flex-row items-center gap-3">
        <Ionicons name={probe.icon} size={28} color={colors.foreground} />
        <Text variant="title">{t(probe.titleKey)}</Text>
      </View>
      <StatusChip status={status} className="mt-3" />
      <Text variant="body" className="mt-4 text-muted-foreground">
        {t(probe.descriptionKey)}
      </Text>
      <View className="mt-8 items-center rounded-2xl border border-dashed border-border p-6">
        <Text variant="body-sm" className="text-center text-muted-foreground">
          {t('probeDetail.notImplemented')}
        </Text>
      </View>
    </Screen>
  );
}

export default function ProbeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const probe = getProbe(id as ProbeId);
  const t = useT();
  const [status, setStatus] = useState<ProbeAvailability>('unknown');

  useEffect(() => {
    if (!probe) return;
    let cancelled = false;
    probe
      .getAvailability()
      .then((next) => {
        if (!cancelled) setStatus(next);
      })
      .catch(() => {
        if (!cancelled) setStatus('unknown');
      });
    return () => {
      cancelled = true;
    };
  }, [probe]);

  if (!probe) {
    return (
      <Screen>
        <Text variant="body">{t('probeDetail.notImplemented')}</Text>
      </Screen>
    );
  }

  const ProbeScreenComponent = probeScreens[probe.id];

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t(probe.titleKey) }} />
      {ProbeScreenComponent ? (
        <ProbeScreenComponent probe={probe} status={status} />
      ) : (
        <PlaceholderScreen probe={probe} status={status} />
      )}
    </>
  );
}
