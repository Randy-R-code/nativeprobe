import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { FieldList } from '@/components/ui/field-list';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { formatCoordinate } from './format-coordinate';

export type LocationScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function LocationScreen({ probe, status }: LocationScreenProps) {
  const t = useT();
  const [position, setPosition] = useState<Location.LocationObject | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
    };
  }, []);

  const ensurePermission = async () => {
    const current = await Location.getForegroundPermissionsAsync();
    if (current.granted) return true;
    const requested = await Location.requestForegroundPermissionsAsync();
    if (!requested.granted) {
      setError(t('probe.location.permissionDenied'));
    }
    return requested.granted;
  };

  const getCurrent = async () => {
    setError(null);
    if (!(await ensurePermission())) return;
    try {
      const next = await Location.getCurrentPositionAsync();
      setPosition(next);
    } catch {
      setError(t('probe.location.unavailable'));
    }
  };

  const startTracking = async () => {
    setError(null);
    if (!(await ensurePermission())) return;
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (next) => setPosition(next)
      );
      subscriptionRef.current = subscription;
      setTracking(true);
    } catch {
      setError(t('probe.location.unavailable'));
    }
  };

  const stopTracking = () => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setTracking(false);
  };

  const notAvailable = t('common.notAvailable');
  const format = (value: number | null | undefined, digits = 5) =>
    formatCoordinate(value, notAvailable, digits);

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-location">
      <View className="flex-row flex-wrap gap-2">
        <Button label={t('probe.location.action.getCurrent')} onPress={getCurrent} />
        <Button
          label={
            tracking
              ? t('probe.location.action.stopTracking')
              : t('probe.location.action.startTracking')
          }
          variant={tracking ? 'secondary' : 'primary'}
          onPress={tracking ? stopTracking : startTracking}
        />
      </View>

      {error ? (
        <Text variant="body-sm" className="text-destructive">
          {error}
        </Text>
      ) : null}

      {position ? (
        <FieldList
          fields={[
            {
              label: t('probe.location.field.latitude'),
              value: format(position.coords.latitude),
            },
            {
              label: t('probe.location.field.longitude'),
              value: format(position.coords.longitude),
            },
            {
              label: t('probe.location.field.accuracy'),
              value: format(position.coords.accuracy, 1),
            },
            {
              label: t('probe.location.field.altitude'),
              value: format(position.coords.altitude, 1),
            },
            {
              label: t('probe.location.field.heading'),
              value: format(position.coords.heading, 1),
            },
            {
              label: t('probe.location.field.speed'),
              value: format(position.coords.speed, 2),
            },
          ]}
        />
      ) : (
        <Text variant="body-sm" className="text-muted-foreground">
          {t('probe.location.noPosition')}
        </Text>
      )}
    </ProbeScreenShell>
  );
}
