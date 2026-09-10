import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import type { ThreeAxisMeasurement } from './use-vector-sensor';

export type VectorBarsProps = {
  vector: ThreeAxisMeasurement;
  unit: string;
  maxMagnitude: number;
};

function Axis({
  label,
  value,
  unit,
  maxMagnitude,
}: {
  label: string;
  value: number;
  unit: string;
  maxMagnitude: number;
}) {
  const percent = Math.min(100, (Math.abs(value) / maxMagnitude) * 100);
  const positive = value >= 0;

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Text variant="body-sm" className="text-muted-foreground">
          {label}
        </Text>
        <Text variant="mono">
          {value.toFixed(3)} {unit}
        </Text>
      </View>
      <View className="h-2 flex-row overflow-hidden rounded-full bg-muted">
        <View className="w-1/2 flex-row justify-end">
          {!positive && (
            <View className="h-full rounded-l-full bg-primary" style={{ width: `${percent}%` }} />
          )}
        </View>
        <View className="w-1/2">
          {positive && (
            <View className="h-full rounded-r-full bg-primary" style={{ width: `${percent}%` }} />
          )}
        </View>
      </View>
    </View>
  );
}

// Always paired with the numeric readout above (spec §19: sensor
// visualizations must have a textual/numeric equivalent, never rely on the
// bar alone).
export function VectorBars({ vector, unit, maxMagnitude }: VectorBarsProps) {
  const t = useT();
  return (
    <View className="gap-3">
      <Axis label={t('sensor.axisX')} value={vector.x} unit={unit} maxMagnitude={maxMagnitude} />
      <Axis label={t('sensor.axisY')} value={vector.y} unit={unit} maxMagnitude={maxMagnitude} />
      <Axis label={t('sensor.axisZ')} value={vector.z} unit={unit} maxMagnitude={maxMagnitude} />
    </View>
  );
}
