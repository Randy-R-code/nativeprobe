# NativeProbe

> Explore what your device can actually do.

NativeProbe is an open-source React Native playground for exploring, testing, and understanding real device capabilities. It's not a generic "device info" app or a benchmark tool — every probe lets you _do_ something: trigger a sensor, request a permission, watch a value change live, and see the Expo API behind it.

Screenshots and a demo GIF are coming once the app is closer to a store release.

## Key features

- **13 interactive probes** across device info, live sensors, and system APIs — see the list below.
- **Real-time state**, not static dumps: network changes, live sensor streams, live location tracking.
- **Honest cross-platform behavior**: unsupported capabilities are shown as a normal state, not hidden or faked.
- **A local capability report**: a versioned JSON summary of what this device supports, copyable and shareable, with sensitive data excluded by default.
- **English and French** out of the box, with a translation structure that makes adding another language a data change, not a code change.
- **Light and dark mode**, following the system by default.

### Probes

| Category    | Probes                                                 |
| ----------- | ------------------------------------------------------ |
| Device      | Device, Display, Battery, Network                      |
| Sensors     | Accelerometer, Gyroscope, Magnetometer                 |
| System APIs | Permissions, Location, Haptics, Biometrics, Deep Links |
| Report      | Capability Report                                      |

## Why NativeProbe exists

Most "device info" apps just dump raw values. NativeProbe is meant to answer a more useful question for developers, QA engineers, and people learning React Native / Expo: _is this capability available on this device right now, what's its current state, and what does the code that reads it actually look like?_ Every probe screen names the Expo API it's built on, so the app doubles as a live reference.

## Supported platforms

- iOS (physical device recommended for sensors, location, biometrics, and haptics)
- Android (physical device recommended for the same reasons)
- Some probes behave differently — or aren't meaningful — in a simulator/emulator; the app says so rather than pretending.

## Installation / local development

This project uses [Bun](https://bun.sh) — not npm or yarn.

```bash
bun install
bun start
```

Then open the project in Expo Go, an iOS simulator, or an Android emulator from the Expo CLI output.

Other scripts:

```bash
bun run lint       # eslint + prettier -c
bun run format     # eslint --fix + prettier --write
bun run typecheck  # tsc --noEmit
bun run test       # jest + jest-expo + react native testing library
```

### Development build requirements

Most probes (sensors, location, haptics, biometrics, deep links) need a **physical device** to be meaningful — a simulator/emulator will generally report them as unsupported or return placeholder values. Expo Go works for most probes; a development build isn't required for V1 functionality.

## Project architecture

```text
app/            # expo-router routes (thin — they render a feature screen)
src/
  components/   # shared UI primitives (Text, Card, Button, StatusChip, ...)
  features/     # one folder per probe (+ a shared `sensors/` folder for the
                # three motion sensors, which share one screen and hook)
  probes/       # the typed probe registry, availability logic, and the
                # id -> screen component map
  i18n/         # translation provider + en/fr dictionaries
  lib/          # theme tokens, cva/cn helpers
  types/        # cross-cutting types (e.g. the translation key union)
```

Every probe registers its metadata (title, description, icon, platforms, an
`getAvailability()` check) in `src/probes/registry.ts`, so the Overview
screen is generated from data instead of repeated UI. See [Adding a
probe](CONTRIBUTING.md#adding-a-probe) for the exact steps to add a new one.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions, and how to add a new probe.

## Roadmap

Explicitly out of scope for V1, tracked as future issues:

- Camera playground
- Notifications playground
- NFC capability detection
- Barometer probe
- Pedometer probe
- Clipboard playground
- Background location
- Contacts
- Media library
- Bluetooth
- Additional translations

## Privacy

No account. No backend. No cloud sync. No telemetry. Your device data stays
on your device unless you explicitly copy or share a generated Capability
Report — and even then, the report never includes precise location
coordinates, contacts, clipboard content, or tracking identifiers. See
[SECURITY.md](SECURITY.md) for how to report a vulnerability.

## License

[MIT](LICENSE)
