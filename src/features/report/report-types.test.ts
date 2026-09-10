import {
  type CapabilityReportV1,
  FORBIDDEN_REPORT_SUBSTRINGS,
  serializeReport,
} from './report-types';

const sampleReport: CapabilityReportV1 = {
  schemaVersion: 1,
  generatedAt: '2026-01-01T00:00:00.000Z',
  app: { name: 'NativeProbe', version: '1.0.0' },
  device: { platform: 'ios', osVersion: '17.0', model: 'iPhone' },
  capabilities: { device: 'available', location: 'permission-required' },
};

describe('serializeReport', () => {
  test('produces valid, re-parseable JSON', () => {
    const json = serializeReport(sampleReport);
    expect(JSON.parse(json)).toEqual(sampleReport);
  });

  test('never contains a forbidden privacy-sensitive substring', () => {
    const json = serializeReport(sampleReport).toLowerCase();
    for (const forbidden of FORBIDDEN_REPORT_SUBSTRINGS) {
      expect(json).not.toContain(forbidden);
    }
  });
});
