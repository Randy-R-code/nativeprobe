import { VectorSensorScreen } from '@/features/sensors/vector-sensor-screen';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { Magnetometer } from 'expo-sensors';

export type MagnetometerScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function MagnetometerScreen({ probe, status }: MagnetometerScreenProps) {
  return (
    <VectorSensorScreen
      probe={probe}
      status={status}
      sensor={Magnetometer}
      unit="µT"
      maxMagnitude={100}
      builtWith="expo-sensors (Magnetometer)"
    />
  );
}
