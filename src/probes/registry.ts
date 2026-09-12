import * as Battery from 'expo-battery';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Location from 'expo-location';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import type { ProbeAvailability, ProbeCategory, ProbeDefinition, ProbeId } from './types';

// Every V1 probe registers here with its metadata so the Overview screen is
// generated from data instead of hardcoded repeated UI (spec §7).

// expo-device fields are always readable (an individual value being null
// isn't an unsupported state) — the probe itself is always available.
async function deviceAvailability() {
  return 'available' as const;
}

// Core React Native APIs, always available.
async function displayAvailability() {
  return 'available' as const;
}

async function batteryAvailability() {
  const available = await Battery.isAvailableAsync();
  return available ? ('available' as const) : ('unsupported' as const);
}

// Core network status querying needs no permission and always works.
async function networkAvailability() {
  return 'available' as const;
}

type PermissionAwareSensor = {
  isAvailableAsync: () => Promise<boolean>;
  getPermissionsAsync?: () => Promise<{
    granted: boolean;
    canAskAgain: boolean;
  }>;
};

async function vectorSensorAvailability(sensor: PermissionAwareSensor): Promise<ProbeAvailability> {
  const available = await sensor.isAvailableAsync();
  if (!available) return 'unsupported';
  if (sensor.getPermissionsAsync) {
    const permission = await sensor.getPermissionsAsync();
    if (!permission.granted) return permission.canAskAgain ? 'permission-required' : 'denied';
  }
  return 'available';
}

async function accelerometerAvailability() {
  return vectorSensorAvailability(Accelerometer);
}

async function gyroscopeAvailability() {
  return vectorSensorAvailability(Gyroscope);
}

async function magnetometerAvailability() {
  return vectorSensorAvailability(Magnetometer);
}

// The permission explorer itself needs no permission — it only reads status.
async function permissionsAvailability() {
  return 'available' as const;
}

async function locationAvailability(): Promise<ProbeAvailability> {
  const permission = await Location.getForegroundPermissionsAsync();
  if (permission.granted) return 'available';
  return permission.canAskAgain ? 'permission-required' : 'denied';
}

// Haptics degrade gracefully (silent no-op) on unsupported hardware, no
// permission or hardware check to gate the probe itself on.
async function hapticsAvailability() {
  return 'available' as const;
}

async function biometricsAvailability(): Promise<ProbeAvailability> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  return hasHardware ? 'available' : 'unsupported';
}

// URL-scheme handling is always available as a capability.
async function deepLinksAvailability() {
  return 'available' as const;
}

// Report generation itself needs no capability check — it only reads other
// probes' already-computed availability.
async function reportAvailability() {
  return 'available' as const;
}

export const probes: ProbeDefinition[] = [
  {
    id: 'device',
    category: 'device',
    titleKey: 'probe.device.title',
    descriptionKey: 'probe.device.description',
    infoKey: 'probe.device.info',
    platforms: ['ios', 'android'],
    icon: 'hardware-chip-outline',
    getAvailability: deviceAvailability,
  },
  {
    id: 'display',
    category: 'device',
    titleKey: 'probe.display.title',
    descriptionKey: 'probe.display.description',
    infoKey: 'probe.display.info',
    platforms: ['ios', 'android'],
    icon: 'phone-portrait-outline',
    getAvailability: displayAvailability,
  },
  {
    id: 'battery',
    category: 'device',
    titleKey: 'probe.battery.title',
    descriptionKey: 'probe.battery.description',
    infoKey: 'probe.battery.info',
    platforms: ['ios', 'android'],
    icon: 'battery-half-outline',
    getAvailability: batteryAvailability,
  },
  {
    id: 'network',
    category: 'device',
    titleKey: 'probe.network.title',
    descriptionKey: 'probe.network.description',
    infoKey: 'probe.network.info',
    platforms: ['ios', 'android'],
    icon: 'wifi-outline',
    getAvailability: networkAvailability,
  },
  {
    id: 'accelerometer',
    category: 'sensors',
    titleKey: 'probe.accelerometer.title',
    descriptionKey: 'probe.accelerometer.description',
    infoKey: 'probe.accelerometer.info',
    platforms: ['ios', 'android'],
    icon: 'speedometer-outline',
    getAvailability: accelerometerAvailability,
  },
  {
    id: 'gyroscope',
    category: 'sensors',
    titleKey: 'probe.gyroscope.title',
    descriptionKey: 'probe.gyroscope.description',
    infoKey: 'probe.gyroscope.info',
    platforms: ['ios', 'android'],
    icon: 'sync-outline',
    getAvailability: gyroscopeAvailability,
  },
  {
    id: 'magnetometer',
    category: 'sensors',
    titleKey: 'probe.magnetometer.title',
    descriptionKey: 'probe.magnetometer.description',
    infoKey: 'probe.magnetometer.info',
    platforms: ['ios', 'android'],
    icon: 'compass-outline',
    getAvailability: magnetometerAvailability,
  },
  {
    id: 'permissions',
    category: 'system',
    titleKey: 'probe.permissions.title',
    descriptionKey: 'probe.permissions.description',
    infoKey: 'probe.permissions.info',
    platforms: ['ios', 'android'],
    icon: 'key-outline',
    getAvailability: permissionsAvailability,
  },
  {
    id: 'location',
    category: 'system',
    titleKey: 'probe.location.title',
    descriptionKey: 'probe.location.description',
    infoKey: 'probe.location.info',
    platforms: ['ios', 'android'],
    icon: 'location-outline',
    getAvailability: locationAvailability,
  },
  {
    id: 'haptics',
    category: 'system',
    titleKey: 'probe.haptics.title',
    descriptionKey: 'probe.haptics.description',
    infoKey: 'probe.haptics.info',
    platforms: ['ios', 'android'],
    icon: 'pulse-outline',
    getAvailability: hapticsAvailability,
  },
  {
    id: 'biometrics',
    category: 'system',
    titleKey: 'probe.biometrics.title',
    descriptionKey: 'probe.biometrics.description',
    infoKey: 'probe.biometrics.info',
    platforms: ['ios', 'android'],
    icon: 'finger-print-outline',
    getAvailability: biometricsAvailability,
  },
  {
    id: 'deep-links',
    category: 'system',
    titleKey: 'probe.deep-links.title',
    descriptionKey: 'probe.deep-links.description',
    infoKey: 'probe.deep-links.info',
    platforms: ['ios', 'android'],
    icon: 'link-outline',
    getAvailability: deepLinksAvailability,
  },
  {
    id: 'report',
    category: 'report',
    titleKey: 'probe.report.title',
    descriptionKey: 'probe.report.description',
    infoKey: 'probe.report.info',
    platforms: ['ios', 'android'],
    icon: 'document-text-outline',
    getAvailability: reportAvailability,
  },
];

export const probeCategories: ProbeCategory[] = ['device', 'sensors', 'system', 'report'];

export function probesByCategory(category: ProbeCategory): ProbeDefinition[] {
  return probes.filter((probe) => probe.category === category);
}

export function getProbe(id: ProbeId): ProbeDefinition | undefined {
  return probes.find((probe) => probe.id === id);
}
