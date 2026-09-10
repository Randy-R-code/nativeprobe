import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { useTheme } from '@/lib/theme-context';
import { probeCategories, probes, probesByCategory } from '@/probes/registry';
import type { ProbeCategory } from '@/probes/types';
import { useProbeStatuses } from '@/probes/use-probe-statuses';
import { ProbeRow } from './probe-row';

const categoryLabelKey: Record<ProbeCategory, `overview.categories.${ProbeCategory}`> = {
  device: 'overview.categories.device',
  sensors: 'overview.categories.sensors',
  system: 'overview.categories.system',
  report: 'overview.categories.report',
};

export function OverviewScreen() {
  const t = useT();
  const { colors } = useTheme();
  const statuses = useProbeStatuses(probes);
  const availableCount = Object.values(statuses).filter((status) => status === 'available').length;

  return (
    <Screen>
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text variant="title">{t('app.name')}</Text>
          <Text variant="subtitle" className="mt-1">
            {t('app.tagline')}
          </Text>
        </View>
        <Link href="/about" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('nav.about')}
            className="mt-1 p-1"
            hitSlop={8}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors['muted-foreground']}
            />
          </Pressable>
        </Link>
      </View>

      <Text variant="caption" className="mt-3">
        {t('overview.summary', {
          available: availableCount,
          total: probes.length,
        })}
      </Text>

      {probeCategories.map((category) => {
        const items = probesByCategory(category);
        return (
          <View key={category} className="mt-6">
            <SectionLabel>{t(categoryLabelKey[category])}</SectionLabel>
            <Card className="mt-2 p-0">
              {items.map((probe, index) => (
                <View key={probe.id} className="px-4">
                  {index > 0 && <Separator />}
                  <ProbeRow probe={probe} status={statuses[probe.id]} />
                </View>
              ))}
            </Card>
          </View>
        );
      })}
    </Screen>
  );
}
