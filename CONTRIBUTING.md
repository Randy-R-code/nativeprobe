# Contributing to NativeProbe

Thanks for considering a contribution. NativeProbe is a small, focused
project — please read this before opening a PR so your change fits its
scope and conventions.

## Setup

```bash
bun install
bun start
```

Most probes only make sense on a **physical device** (sensors, location,
haptics, biometrics, deep links) — a simulator/emulator is fine for
reviewing UI, but verify device-touching changes on real hardware before
opening a PR.

## Before opening a PR

```bash
bun run lint       # eslint + prettier -c
bun run typecheck  # tsc --noEmit
bun run test       # jest + jest-expo + react native testing library
```

All three must pass. CI runs the same checks.

## Code conventions

- TypeScript strict mode, no unnecessary `any`.
- ESLint (`eslint-config-expo`) lints, Prettier formats — don't hand-format, run `bun run format`.
- No premature abstraction: a pattern gets extracted once two probes actually share it, not before.
- User-visible strings live in `src/i18n/locales/*.json`, never hardcoded in a component.
- Keep native subscriptions (sensors, location, network listeners) cleaned up in a `useEffect` return — this is the kind of bug that's easy to miss and annoying to debug.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), English, lowercase:

```
feat: add barometer probe
fix: clean up accelerometer listener on unmount
docs: clarify location permission flow
```

## Adding a probe

A probe is three pieces wired together:

1. **Metadata** — add an entry to `probes` in `src/probes/registry.ts`: `id`,
   `category`, `titleKey`/`descriptionKey` (i18n keys), `platforms`, an
   `icon` (any [Ionicons](https://icons.expo.fyi) name), and a
   `getAvailability()` function returning a `ProbeAvailability`
   (`"available" | "permission-required" | "denied" | "restricted" |
"unsupported" | "unknown"`). A normal top-level import of the Expo module
   it needs is fine — Jest (via `jest-expo`) parses React Native's source
   without issue.
2. **Translations** — add `probe.<id>.title` / `probe.<id>.description` (and
   any field labels the screen needs) to **both**
   `src/i18n/locales/en.json` and `src/i18n/locales/fr.json`. English is the
   fallback, so it must always be complete; keep French in sync in the same
   PR.
3. **Screen** — create `src/features/<id>/<id>-screen.tsx` following the
   pattern in `src/features/battery/battery-screen.tsx` (a simple probe) or
   `src/features/sensors/` (a probe family sharing one screen/hook). Wrap it
   in `ProbeScreenShell` for the standard title/status/description/"Built
   with" chrome, then register the component in `src/probes/screens.tsx`'s
   `probeScreens` map.

That's it — the Overview screen, routing, and status counting all pick up
the new probe automatically from the registry.

Add a `<id>-screen.test.tsx` alongside the screen using
`renderWithProviders` from `src/test-utils/render.tsx` — see
`src/features/haptics/haptics-screen.test.tsx` for a screen with button
interactions, or `src/features/overview/overview-screen.test.tsx` for a
plain render assertion. Mock the native module's specific function with
`jest.spyOn` rather than mocking the whole package.

## Reporting a security issue

See [SECURITY.md](SECURITY.md) — please don't open a public issue for a
vulnerability.
