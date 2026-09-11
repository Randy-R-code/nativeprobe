# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-11

### Added

- Initial release: 13 interactive probes across device info, live sensors,
  and system APIs — Device, Display, Battery, Network, Accelerometer,
  Gyroscope, Magnetometer, Permissions, Location, Haptics, Biometrics, and
  Deep Links.
- A typed probe registry driving the Overview screen and its "N of 13
  probes available" summary from each probe's live availability check.
- A local Capability Report with copy-JSON and share actions, excluding
  precise location, contacts, clipboard content, and tracking identifiers
  by default.
- English and French localization with device-locale detection and an
  English fallback.
- Light and dark mode, following the system by default.
- Accessibility labels/roles on every interactive control, and explicit
  error states for permission, network, and location failures instead of
  silent no-ops.
- README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue/PR templates, and
  a Bun-based GitHub Actions CI workflow (typecheck, lint, test).
- iOS bundle identifier and Android package (`com.randycode.nativeprobe`).
- App icon, Android adaptive icon (foreground/background/monochrome), and a
  matching splash screen.
- A README banner with a theme-aware wordmark.

### Fixed

- Missing `expo-font` peer dependency, duplicate native module installs, and
  a `@types/jest` version mismatch flagged by `expo-doctor`.
- Native stack headers (probe detail, report, about) rendering with a light
  background regardless of the active theme.
- Long field values (e.g. biometrics supported types) overflowing their
  card instead of wrapping.
- Device rotation locked to portrait, blocking the Display probe's live
  orientation tracking.
- Landscape content not reserving left/right safe area, letting Android's
  on-screen navigation buttons draw over the app instead of beside it.

[0.1.0]: https://github.com/Randy-R-code/nativeprobe/releases/tag/v0.1.0
