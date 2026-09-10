import { describe, expect, test } from 'bun:test';
import { themes, themeTokens, toCssVars } from './theme';

describe('theme tokens', () => {
  test('light and dark palettes expose the exact same token set', () => {
    expect(Object.keys(themes.dark).sort()).toEqual(Object.keys(themes.light).sort());
  });

  test('toCssVars produces one --color-* entry per token, as space-separated RGB channels', () => {
    const vars = toCssVars('light');
    // "background" is #FFFFFF — pinning one known conversion catches a
    // broken hex parser, not just a matching token count.
    expect(vars['--color-background']).toBe('255 255 255');
    for (const token of themeTokens) {
      expect(vars[`--color-${token}`]).toMatch(/^\d{1,3} \d{1,3} \d{1,3}$/);
    }
  });
});
