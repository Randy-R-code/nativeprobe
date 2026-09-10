import Constants from 'expo-constants';
import { probes } from '@/probes/registry';
import type { ProbeAvailability, ProbeId } from '@/probes/types';
import type { CapabilityReportV1 } from './report-types';

// Not unit-tested by invoking it: several probes' getAvailability functions
// dynamic-import expo-battery/expo-sensors/expo-location/expo-local-authentication,
// which pull in react-native's Flow-typed source `bun test` can't parse.
// That's fine — real per-probe behavior belongs to the manual device test
// matrix (spec §22), same reasoning as src/probes/registry.test.ts.
export async function buildCapabilitiesMap(): Promise<Partial<Record<ProbeId, ProbeAvailability>>> {
  const entries = await Promise.all(
    probes
      .filter((probe) => probe.id !== 'report')
      .map(async (probe) => [probe.id, await probe.getAvailability()] as const)
  );
  return Object.fromEntries(entries);
}

export async function buildCapabilityReport(): Promise<CapabilityReportV1> {
  const Device = await import('expo-device');
  const { Platform } = await import('react-native');
  const capabilities = await buildCapabilitiesMap();

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    app: {
      name: Constants.expoConfig?.name ?? 'NativeProbe',
      version: Constants.expoConfig?.version ?? '0.0.0',
    },
    device: {
      platform: Platform.OS,
      osVersion: Device.osVersion,
      model: Device.modelName,
    },
    capabilities,
  };
}
