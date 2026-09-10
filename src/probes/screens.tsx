import type { ComponentType } from 'react';
import { AccelerometerScreen } from '@/features/accelerometer/accelerometer-screen';
import { BatteryScreen } from '@/features/battery/battery-screen';
import { DeviceScreen } from '@/features/device/device-screen';
import { DisplayScreen } from '@/features/display/display-screen';
import { GyroscopeScreen } from '@/features/gyroscope/gyroscope-screen';
import { MagnetometerScreen } from '@/features/magnetometer/magnetometer-screen';
import { NetworkScreen } from '@/features/network/network-screen';
import type { ProbeAvailability, ProbeDefinition, ProbeId } from './types';

export type ProbeScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export type ProbeScreenComponent = ComponentType<ProbeScreenProps>;

// Probes without an entry here fall back to a generic "not implemented yet"
// placeholder in app/probe/[id].tsx — they get one as their milestone lands.
export const probeScreens: Partial<Record<ProbeId, ProbeScreenComponent>> = {
  device: DeviceScreen,
  display: DisplayScreen,
  battery: BatteryScreen,
  network: NetworkScreen,
  accelerometer: AccelerometerScreen,
  gyroscope: GyroscopeScreen,
  magnetometer: MagnetometerScreen,
};
