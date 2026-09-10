import { VectorSensorScreen } from '@/features/sensors/vector-sensor-screen';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { Gyroscope } from 'expo-sensors';

export type GyroscopeScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function GyroscopeScreen({ probe, status }: GyroscopeScreenProps) {
  return (
    <VectorSensorScreen
      probe={probe}
      status={status}
      sensor={Gyroscope}
      unit="rad/s"
      maxMagnitude={10}
      builtWith="expo-sensors (Gyroscope)"
    />
  );
}
