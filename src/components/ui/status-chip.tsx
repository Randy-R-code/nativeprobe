import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useT } from '@/i18n/i18n-provider';
import { cn } from '@/lib/cn';
import { cva, type VariantProps } from '@/lib/cva';
import type { ThemeColors } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import type { ProbeAvailability } from '@/probes/types';
import { Text } from './text';

// Spec: "Do not rely only on color; include iconography and/or labels." Every
// chip always renders an icon + the localized status label, color is a
// secondary reinforcement only.
const chipVariants = cva('flex-row items-center gap-1 self-start rounded-full px-2 py-1', {
  variants: {
    status: {
      available: 'bg-success/15',
      'permission-required': 'bg-warning/15',
      denied: 'bg-destructive/15',
      restricted: 'bg-destructive/15',
      unsupported: 'bg-muted',
      unknown: 'bg-muted',
    } satisfies Record<ProbeAvailability, string>,
  },
  defaultVariants: {
    status: 'unknown',
  },
});

const textColorClass: Record<ProbeAvailability, string> = {
  available: 'text-success',
  'permission-required': 'text-warning',
  denied: 'text-destructive',
  restricted: 'text-destructive',
  unsupported: 'text-muted-foreground',
  unknown: 'text-muted-foreground',
};

// Ionicons renders its glyph via a `color` prop rather than a NativeWind
// className, so it needs a resolved theme value directly (same bucket as
// the "native APIs that cannot take a className" tokens in lib/theme.ts).
const colorToken: Record<ProbeAvailability, keyof ThemeColors> = {
  available: 'success',
  'permission-required': 'warning',
  denied: 'destructive',
  restricted: 'destructive',
  unsupported: 'muted-foreground',
  unknown: 'muted-foreground',
};

const statusIcon: Record<ProbeAvailability, keyof typeof Ionicons.glyphMap> = {
  available: 'checkmark-circle',
  'permission-required': 'lock-closed',
  denied: 'close-circle',
  restricted: 'ban',
  unsupported: 'remove-circle-outline',
  unknown: 'help-circle-outline',
};

export type StatusChipProps = VariantProps<typeof chipVariants> & {
  className?: string;
};

export function StatusChip({ status = 'unknown', className }: StatusChipProps) {
  const t = useT();
  const { colors } = useTheme();
  const resolved = status ?? 'unknown';

  return (
    <View className={cn(chipVariants({ status: resolved }), className)}>
      <Ionicons name={statusIcon[resolved]} size={12} color={colors[colorToken[resolved]]} />
      <Text variant="caption" className={cn('leading-none', textColorClass[resolved])}>
        {t(`status.${resolved}` as const)}
      </Text>
    </View>
  );
}
