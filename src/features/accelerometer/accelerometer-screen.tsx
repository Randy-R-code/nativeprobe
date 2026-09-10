import { Accelerometer } from 'expo-sensors';
import { VectorSensorScreen } from '@/features/sensors/vector-sensor-screen';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';

export type AccelerometerScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function AccelerometerScreen({ probe, status }: AccelerometerScreenProps) {
  return (
    <VectorSensorScreen
      probe={probe}
      status={status}
      sensor={Accelerometer}
      unit="g"
      maxMagnitude={2}
      builtWith="expo-sensors (Accelerometer)"
    />
  );
}
