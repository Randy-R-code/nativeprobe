import { BatteryState, useBatteryLevel, useBatteryState, useLowPowerMode } from 'expo-battery';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { FieldList } from '@/components/ui/field-list';
import { useT } from '@/i18n';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import type { TranslationKey } from '@/types/i18n';

const batteryStateKey: Record<BatteryState, TranslationKey> = {
  [BatteryState.UNKNOWN]: 'probe.battery.state.unknown',
  [BatteryState.UNPLUGGED]: 'probe.battery.state.unplugged',
  [BatteryState.CHARGING]: 'probe.battery.state.charging',
  [BatteryState.FULL]: 'probe.battery.state.full',
  [BatteryState.NOT_CHARGING]: 'probe.battery.state.notCharging',
};

export type BatteryScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function BatteryScreen({ probe, status }: BatteryScreenProps) {
  const t = useT();
  const level = useBatteryLevel();
  const state = useBatteryState();
  const lowPowerMode = useLowPowerMode();

  const levelLabel = level < 0 ? t('common.notAvailable') : `${Math.round(level * 100)}%`;

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-battery">
      <FieldList
        fields={[
          { label: t('probe.battery.field.level'), value: levelLabel },
          {
            label: t('probe.battery.field.state'),
            value: t(batteryStateKey[state ?? BatteryState.UNKNOWN]),
          },
          {
            label: t('probe.battery.field.lowPowerMode'),
            value: lowPowerMode ? t('common.yes') : t('common.no'),
          },
        ]}
      />
    </ProbeScreenShell>
  );
}
