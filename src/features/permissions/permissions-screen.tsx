import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import type { TranslationKey } from '@/types/i18n';
import { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

type PermissionResponse = {
  status: PermissionStatus;
  granted: boolean;
  canAskAgain: boolean;
};

type PermissionDescriptor = {
  id: string;
  labelKey: TranslationKey;
  getStatus: () => Promise<PermissionResponse>;
  request: () => Promise<PermissionResponse>;
};

// Only permissions NativeProbe's V1 features actually use (spec §11.5: "Do
// not attempt to request every possible device permission just for
// demonstration").
const permissionDescriptors: PermissionDescriptor[] = [
  {
    id: 'location',
    labelKey: 'probe.permissions.item.location',
    getStatus: async () => {
      const Location = await import('expo-location');
      return Location.getForegroundPermissionsAsync();
    },
    request: async () => {
      const Location = await import('expo-location');
      return Location.requestForegroundPermissionsAsync();
    },
  },
  {
    id: 'motion',
    labelKey: 'probe.permissions.item.motion',
    getStatus: async () => {
      const { Accelerometer } = await import('expo-sensors');
      return Accelerometer.getPermissionsAsync();
    },
    request: async () => {
      const { Accelerometer } = await import('expo-sensors');
      return Accelerometer.requestPermissionsAsync();
    },
  },
];

const statusKey: Record<PermissionStatus, TranslationKey> = {
  granted: 'probe.permissions.status.granted',
  denied: 'probe.permissions.status.denied',
  undetermined: 'probe.permissions.status.undetermined',
};

function PermissionCard({ descriptor }: { descriptor: PermissionDescriptor }) {
  const t = useT();
  const [response, setResponse] = useState<PermissionResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    descriptor.getStatus().then((next) => {
      if (!cancelled) setResponse(next);
    });
    return () => {
      cancelled = true;
    };
  }, [descriptor]);

  const handleRequest = async () => {
    const next = await descriptor.request();
    setResponse(next);
  };

  return (
    <Card>
      <View className="flex-row items-center justify-between">
        <Text variant="label">{t(descriptor.labelKey)}</Text>
        <Text variant="body-sm" className="text-muted-foreground">
          {response ? t(statusKey[response.status]) : '…'}
        </Text>
      </View>
      {response && !response.granted ? (
        <View className="mt-3 flex-row">
          {response.canAskAgain ? (
            <Button
              label={t('probe.permissions.action.request')}
              variant="secondary"
              onPress={handleRequest}
            />
          ) : (
            <Button
              label={t('probe.permissions.action.openSettings')}
              variant="secondary"
              onPress={() => Linking.openSettings()}
            />
          )}
        </View>
      ) : null}
    </Card>
  );
}

export type PermissionsScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function PermissionsScreen({ probe, status }: PermissionsScreenProps) {
  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-location, expo-sensors">
      <View className="gap-3">
        {permissionDescriptors.map((descriptor) => (
          <PermissionCard key={descriptor.id} descriptor={descriptor} />
        ))}
      </View>
    </ProbeScreenShell>
  );
}
