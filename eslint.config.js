const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    // Generated/native output: `expo prebuild` and `expo run:ios/android`
    // create these, and linting them makes `bun run lint` fail after any
    // native build.
    ignores: ['dist/*', '.expo/**', 'ios/**', 'android/**'],
  },
]);
