import { useState } from 'react';
import { View } from 'react-native';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { IntervalPicker } from './interval-picker';
import { useVectorSensor, type VectorSensorModule } from './use-vector-sensor';
import { VectorBars } from './vector-bars';

const INTERVAL_OPTIONS_MS = [100, 250, 500, 1000];
const DEFAULT_INTERVAL_MS = 250;

export type VectorSensorScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
  sensor: VectorSensorModule;
  unit: string;
  maxMagnitude: number;
  builtWith: string;
};

// Shared by Accelerometer, Gyroscope, and Magnetometer — they only differ by
// which native sensor module they wrap, the unit label, and the bar scale.
export function VectorSensorScreen({
  probe,
  status,
  sensor,
  unit,
  maxMagnitude,
  builtWith,
}: VectorSensorScreenProps) {
  const t = useT();
  const [intervalMs, setIntervalMs] = useState(DEFAULT_INTERVAL_MS);
  const { vector, active, start, stop } = useVectorSensor(sensor, intervalMs);

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith={builtWith}>
      <View className="flex-row">
        <Button
          label={active ? t('sensor.stop') : t('sensor.start')}
          variant={active ? 'secondary' : 'primary'}
          onPress={active ? stop : start}
        />
      </View>
      <IntervalPicker
        label={t('sensor.interval')}
        value={intervalMs}
        options={INTERVAL_OPTIONS_MS}
        onChange={setIntervalMs}
      />
      <VectorBars vector={vector} unit={unit} maxMagnitude={maxMagnitude} />
    </ProbeScreenShell>
  );
}
