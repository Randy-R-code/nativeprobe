// Extracted from the screen so the rounding/fallback behavior is unit
// testable without touching expo-location or react-native.
export function formatCoordinate(
  value: number | null | undefined,
  fallback: string,
  digits = 5
): string {
  return value == null ? fallback : value.toFixed(digits);
}
