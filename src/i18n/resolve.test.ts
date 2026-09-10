import { describe, expect, test } from 'bun:test';
import en from './locales/en.json';
import fr from './locales/fr.json';
import { interpolate, resolve } from './resolve';

describe('resolve', () => {
  test('looks up a nested dot-path key', () => {
    expect(resolve(en, 'probe.device.title')).toBe('Device');
  });

  test('returns undefined for a missing key instead of throwing', () => {
    expect(resolve(en, 'probe.does-not-exist.title')).toBeUndefined();
  });

  test('every EN key resolves in FR too (falls back to EN otherwise)', () => {
    const walk = (node: unknown, path: string[] = []): string[][] => {
      if (typeof node === 'string') return [path];
      if (node && typeof node === 'object') {
        return Object.entries(node).flatMap(([key, value]) => walk(value, [...path, key]));
      }
      return [];
    };

    for (const path of walk(en)) {
      const key = path.join('.');
      expect(typeof resolve(fr, key)).toBe('string');
    }
  });
});

describe('interpolate', () => {
  test('substitutes {placeholders} from the vars map', () => {
    expect(
      interpolate('{available} of {total} probes available', {
        available: 11,
        total: 14,
      })
    ).toBe('11 of 14 probes available');
  });

  test('leaves unknown placeholders untouched', () => {
    expect(interpolate('{missing} value')).toBe('{missing} value');
  });
});
