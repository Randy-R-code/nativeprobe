import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { probes } from '@/probes/registry';
import type { ProbeAvailability, ProbeId } from '@/probes/types';
import type { CapabilityReportV1 } from './report-types';

export async function buildCapabilitiesMap(): Promise<Partial<Record<ProbeId, ProbeAvailability>>> {
  const entries = await Promise.all(
    probes
      .filter((probe) => probe.id !== 'report')
      .map(async (probe) => [probe.id, await probe.getAvailability()] as const)
  );
  return Object.fromEntries(entries);
}

export async function buildCapabilityReport(): Promise<CapabilityReportV1> {
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
