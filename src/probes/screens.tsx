import { AccelerometerScreen } from '@/features/accelerometer/accelerometer-screen';
import { BatteryScreen } from '@/features/battery/battery-screen';
import { BiometricsScreen } from '@/features/biometrics/biometrics-screen';
import { DeepLinksScreen } from '@/features/deep-links/deep-links-screen';
import { DeviceScreen } from '@/features/device/device-screen';
import { DisplayScreen } from '@/features/display/display-screen';
import { GyroscopeScreen } from '@/features/gyroscope/gyroscope-screen';
import { HapticsScreen } from '@/features/haptics/haptics-screen';
import { LocationScreen } from '@/features/location/location-screen';
import { MagnetometerScreen } from '@/features/magnetometer/magnetometer-screen';
import { NetworkScreen } from '@/features/network/network-screen';
import { PermissionsScreen } from '@/features/permissions/permissions-screen';
import type { ComponentType } from 'react';
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
  permissions: PermissionsScreen,
  location: LocationScreen,
  haptics: HapticsScreen,
  biometrics: BiometricsScreen,
  'deep-links': DeepLinksScreen,
};
