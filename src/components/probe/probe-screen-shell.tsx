import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { StatusChip } from '@/components/ui/status-chip';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { useTheme } from '@/lib/theme-context';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { View } from 'react-native';

export type ProbeScreenShellProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
  builtWith: string;
  notes?: string;
  children?: ReactNode;
};

// The common chrome every probe screen shares (spec §10's pattern: title,
// status, description, then probe-specific content, notes, "Built with").
// Extracted once Device/Display/Battery needed the exact same shape.
export function ProbeScreenShell({
  probe,
  status,
  builtWith,
  notes,
  children,
}: ProbeScreenShellProps) {
  const t = useT();
  const { colors } = useTheme();

  return (
    <Screen>
      <View className="flex-row items-center gap-3">
        <Ionicons name={probe.icon} size={28} color={colors.foreground} />
        <Text variant="title">{t(probe.titleKey)}</Text>
      </View>
      <StatusChip status={status} className="mt-3" />
      <Text variant="body" className="mt-3 text-muted-foreground">
        {t(probe.descriptionKey)}
      </Text>

      {children ? <View className="mt-6 gap-4">{children}</View> : null}

      {notes ? (
        <Text variant="caption" className="mt-6">
          {notes}
        </Text>
      ) : null}

      <Card className="mt-6">
        <Text variant="section-label">{t('probeDetail.builtWith')}</Text>
        <Text variant="mono" className="mt-2">
          {builtWith}
        </Text>
      </Card>
    </Screen>
  );
}
