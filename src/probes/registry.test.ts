import { probeCategories, probes, probesByCategory } from './registry';

describe('probe registry', () => {
  test('matches the 13 registry entries from the V1 spec (Overview itself is not a row)', () => {
    expect(probes.length).toBe(13);
  });

  test('every probe id is unique', () => {
    const ids = probes.map((probe) => probe.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every probe belongs to one of the known categories', () => {
    for (const probe of probes) {
      expect(probeCategories).toContain(probe.category);
    }
  });

  test('category groups match the Home/Overview UX breakdown (spec §9)', () => {
    expect(probesByCategory('device')).toHaveLength(4);
    expect(probesByCategory('sensors')).toHaveLength(3);
    expect(probesByCategory('system')).toHaveLength(5);
    expect(probesByCategory('report')).toHaveLength(1);
  });

  test('every probe declares a getAvailability function', () => {
    // Not invoked here: several probes call into native modules (expo-battery,
    // expo-device, ...) that only exist inside the Expo/React Native runtime,
    // not under `bun test`. Real device behavior belongs to the manual test
    // matrix (spec §22), not this suite.
    for (const probe of probes) {
      expect(typeof probe.getAvailability).toBe('function');
    }
  });
});
