import { Ionicons } from '@expo/vector-icons';
import { type Href, Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { StatusChip } from '@/components/ui/status-chip';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { useTheme } from '@/lib/theme-context';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';

export type ProbeRowProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

// The Capability Report probe is the one entry that opens the dedicated
// `/report` route (spec §8 lists Report as its own top-level destination)
// instead of the generic `/probe/[id]` detail screen.
function probeHref(probe: ProbeDefinition): Href {
  if (probe.id === 'report') return '/report';
  return { pathname: '/probe/[id]', params: { id: probe.id } };
}

export function ProbeRow({ probe, status }: ProbeRowProps) {
  const t = useT();
  const { colors } = useTheme();

  const title = t(probe.titleKey);

  return (
    <Link href={probeHref(probe)} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${t(`status.${status}`)}`}
        accessibilityHint={t(probe.descriptionKey)}
        className="flex-row items-center gap-3 py-3 active:opacity-60">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-muted">
          <Ionicons name={probe.icon} size={18} color={colors.foreground} />
        </View>
        <View className="flex-1">
          <Text variant="label">{title}</Text>
          <Text variant="caption" numberOfLines={1}>
            {t(probe.descriptionKey)}
          </Text>
        </View>
        <StatusChip status={status} />
      </Pressable>
    </Link>
  );
}
