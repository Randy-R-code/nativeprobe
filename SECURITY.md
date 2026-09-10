# Security Policy

## Supported Versions

NativeProbe is a pre-1.0 open-source project. Only the latest commit on
`main` is supported — there are no maintained release branches yet.

## Reporting a Vulnerability

**Please do not open a public issue for a security vulnerability.**

Report it privately using GitHub's
[private vulnerability reporting](../../security/advisories/new) for this
repository. If that's not available, contact
[@Randy-R-code](https://github.com/Randy-R-code) directly.

Please include:

- A description of the issue and its potential impact
- Steps to reproduce it
- The affected commit or version

You should expect an initial response within a few days. Once a fix is
available, it will be released and the report disclosed with credit to you
(unless you'd prefer to stay anonymous).

## Scope

NativeProbe is local-first by design: no backend, no account system, no
server to compromise. Relevant reports are things like:

- A probe requesting or exposing more data than the spec calls for
- The Capability Report leaking data it's explicitly meant to exclude
  (precise location, contacts, clipboard content, tracking identifiers)
- A dependency with a known vulnerability affecting the app
- Deep link handling that could be abused (e.g. opening arbitrary content
  without user action)

General Expo/React Native platform vulnerabilities should be reported
upstream to the [Expo](https://github.com/expo/expo/security) or
[React Native](https://github.com/facebook/react-native/security) projects
instead.
