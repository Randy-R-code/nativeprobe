import { describe, expect, test } from 'bun:test';
import { formatCoordinate } from './format-coordinate';

describe('formatCoordinate', () => {
  test('formats a number to the given digit count', () => {
    expect(formatCoordinate(48.856614, 'n/a', 2)).toBe('48.86');
  });

  test('defaults to 5 digits', () => {
    expect(formatCoordinate(2.352222, 'n/a')).toBe('2.35222');
  });

  test('falls back for null or undefined', () => {
    expect(formatCoordinate(null, 'n/a')).toBe('n/a');
    expect(formatCoordinate(undefined, 'n/a')).toBe('n/a');
  });

  test('handles zero without falling back (0 is a valid coordinate)', () => {
    expect(formatCoordinate(0, 'n/a', 1)).toBe('0.0');
  });
});
