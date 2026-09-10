import type { ProbeAvailability, ProbeId } from '@/probes/types';

// Versioned so a later schema change can be detected by consumers of a
// saved/shared report (spec §11.13: "strongly typed and versionable").
export type CapabilityReportV1 = {
  schemaVersion: 1;
  generatedAt: string;
  app: {
    name: string;
    version: string;
  };
  device: {
    platform: string;
    osVersion: string | null;
    model: string | null;
  };
  capabilities: Partial<Record<ProbeId, ProbeAvailability>>;
};

// Substrings that must never appear in a serialized report — a regression
// guard for spec §11.13/§17's "exclude by default" list (precise location,
// clipboard, contacts, tracking identifiers, secrets). The schema simply
// never carries these fields, so this only fires if a future field addition
// slips past review.
export const FORBIDDEN_REPORT_SUBSTRINGS = [
  'latitude',
  'longitude',
  'coords',
  'clipboard',
  'contact',
  'token',
  'secret',
  'password',
];

export function serializeReport(report: CapabilityReportV1): string {
  return JSON.stringify(report, null, 2);
}
