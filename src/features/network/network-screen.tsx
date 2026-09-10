import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Card } from '@/components/ui/card';
import { FieldList } from '@/components/ui/field-list';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import type { TranslationKey } from '@/types/i18n';

const MAX_LOG_ENTRIES = 20;

const networkTypeKey: Record<Network.NetworkStateType, TranslationKey> = {
  [Network.NetworkStateType.BLUETOOTH]: 'probe.network.type.bluetooth',
  [Network.NetworkStateType.CELLULAR]: 'probe.network.type.cellular',
  [Network.NetworkStateType.ETHERNET]: 'probe.network.type.ethernet',
  [Network.NetworkStateType.NONE]: 'probe.network.type.none',
  [Network.NetworkStateType.OTHER]: 'probe.network.type.other',
  [Network.NetworkStateType.UNKNOWN]: 'probe.network.type.unknown',
  [Network.NetworkStateType.VPN]: 'probe.network.type.vpn',
  [Network.NetworkStateType.WIFI]: 'probe.network.type.wifi',
  [Network.NetworkStateType.WIMAX]: 'probe.network.type.wimax',
};

type LogEntry = {
  id: string;
  time: string;
  message: string;
};

export type NetworkScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function NetworkScreen({ probe, status }: NetworkScreenProps) {
  const t = useT();
  const [state, setState] = useState<Network.NetworkState | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    let cancelled = false;

    Network.getNetworkStateAsync().then((initial) => {
      if (!cancelled) setState(initial);
    });
    Network.getIpAddressAsync()
      .then((ip) => {
        if (!cancelled) setIpAddress(ip);
      })
      .catch(() => {});

    const describe = (next: Network.NetworkState) =>
      next.isConnected
        ? t('probe.network.log.connected', {
            type: t(networkTypeKey[next.type ?? Network.NetworkStateType.UNKNOWN]),
          })
        : t('probe.network.log.disconnected');

    const subscription = Network.addNetworkStateListener((next) => {
      setState(next);
      setLog((prev) =>
        [
          {
            id: `${Date.now()}`,
            time: new Date().toLocaleTimeString(),
            message: describe(next),
          },
          ...prev,
        ].slice(0, MAX_LOG_ENTRIES)
      );
    });

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, [t]);

  const notAvailable = t('common.notAvailable');

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-network">
      <FieldList
        fields={[
          {
            label: t('probe.network.field.connected'),
            value: state ? (state.isConnected ? t('common.yes') : t('common.no')) : notAvailable,
          },
          {
            label: t('probe.network.field.type'),
            value: state
              ? t(networkTypeKey[state.type ?? Network.NetworkStateType.UNKNOWN])
              : notAvailable,
          },
          {
            label: t('probe.network.field.internetReachable'),
            value:
              state?.isInternetReachable == null
                ? notAvailable
                : state.isInternetReachable
                  ? t('common.yes')
                  : t('common.no'),
          },
          {
            label: t('probe.network.field.ipAddress'),
            value: ipAddress ?? notAvailable,
          },
        ]}
      />

      <View>
        <Text variant="section-label">{t('probe.network.log.title')}</Text>
        <Card className="mt-2 p-0">
          {log.length === 0 ? (
            <Text variant="body-sm" className="p-4 text-muted-foreground">
              {t('probe.network.log.empty')}
            </Text>
          ) : (
            log.map((entry, index) => (
              <View key={entry.id} className="px-4">
                {index > 0 && <Separator />}
                <View className="flex-row items-center justify-between gap-3 py-2">
                  <Text variant="mono" className="text-muted-foreground">
                    {entry.time}
                  </Text>
                  <Text variant="body-sm">{entry.message}</Text>
                </View>
              </View>
            ))
          )}
        </Card>
      </View>
    </ProbeScreenShell>
  );
}
