# Manual Test Matrix

Automated tests (`bun run test`, Jest + jest-expo + React Native Testing
Library) cover pure logic (probe registry shape, i18n key resolution, theme
token conversion, report serialization) and component rendering/interaction
against jest-expo's mocked native modules. What they can't cover is real
hardware/OS behavior — an actual sensor reading, a real permission dialog,
physical haptic feedback, GPS accuracy. Every probe needs to be verified by
hand on a real device before a release.

**Status: not yet run.** This table is the checklist to fill in — replace
"Not yet tested" with a date, build (Expo Go / dev build), and pass/fail per
probe as real-device QA happens.

## Minimum matrix (spec requirement)

| Target                                                | Status         |
| ----------------------------------------------------- | -------------- |
| Android — physical device                             | Not yet tested |
| iOS — physical device                                 | Not yet tested |
| Android emulator (for unsupported/different behavior) | Not yet tested |
| iOS simulator (for unsupported/different behavior)    | Not yet tested |

## Per-probe checklist

For each probe below: does it report the right availability state, do its
live values update, and — where relevant — is unsupported/permission-denied
behavior handled gracefully instead of crashing?

- [x] Device — Android physical, 2026-09-11: platform/OS/model/manufacturer fields correct
- [x] Display (including rotating the device) — Android physical, 2026-09-11: live orientation tracking confirmed; rotating surfaced the landscape safe-area bug (fixed, see CHANGELOG)
- [ ] Battery (including plugging/unplugging if possible)
- [ ] Network (toggling Wi-Fi/cellular/airplane mode) — Android physical, 2026-09-11: Wi-Fi-connected state, live event log, and IP address confirmed working; airplane mode / cellular switch not yet tried
- [ ] Accelerometer
- [ ] Gyroscope
- [x] Magnetometer — Android physical, 2026-09-11: live X/Y/Z values confirmed
- [ ] Permissions (request, deny, then "open settings")
- [ ] Location (one-shot + live tracking, permission denied path)
- [ ] Haptics (all 7 styles, and with Low Power Mode on iOS)
- [x] Biometrics (enrolled + not-enrolled device if available) — Android physical, 2026-09-11: enrolled device, hardware/enrolled detection and live auth test both confirmed; no unenrolled device available to test that path
- [ ] Deep Links (cold-launch via a `nativeprobe://` link, and while running)
- [ ] Capability Report (copy, share, and confirm no sensitive data appears)

## Recording results

Once tested, replace the status table with the actual devices/OS versions
used, e.g.:

```markdown
| Target                         | Result        |
| ------------------------------ | ------------- |
| iPhone 13, iOS 18.1 (physical) | ✅ 2026-09-15 |
| Pixel 7, Android 15 (physical) | ✅ 2026-09-15 |
```
