import { describe, expect, test } from 'bun:test';
import { themes, themeTokens, toCssVars } from './theme';

describe('theme tokens', () => {
  test('light and dark palettes expose the exact same token set', () => {
    expect(Object.keys(themes.dark).sort()).toEqual(Object.keys(themes.light).sort());
  });

  test('toCssVars produces one --color-* entry per token, matching the palette', () => {
    const vars = toCssVars('light');
    for (const token of themeTokens) {
      expect(vars[`--color-${token}`]).toBe(themes.light[token]);
    }
  });
});
