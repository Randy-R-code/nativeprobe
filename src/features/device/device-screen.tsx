import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { FieldList } from '@/components/ui/field-list';
import { useT } from '@/i18n';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import type { TranslationKey } from '@/types/i18n';

const deviceTypeKey: Record<Device.DeviceType, TranslationKey> = {
  [Device.DeviceType.PHONE]: 'probe.device.deviceType.phone',
  [Device.DeviceType.TABLET]: 'probe.device.deviceType.tablet',
  [Device.DeviceType.DESKTOP]: 'probe.device.deviceType.desktop',
  [Device.DeviceType.TV]: 'probe.device.deviceType.tv',
  [Device.DeviceType.UNKNOWN]: 'probe.device.deviceType.unknown',
};

export type DeviceScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function DeviceScreen({ probe, status }: DeviceScreenProps) {
  const t = useT();
  const [deviceType, setDeviceType] = useState<Device.DeviceType>(Device.DeviceType.UNKNOWN);

  useEffect(() => {
    let cancelled = false;
    Device.getDeviceTypeAsync().then((type) => {
      if (!cancelled) setDeviceType(type);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const notAvailable = t('common.notAvailable');

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-device">
      <FieldList
        fields={[
          {
            label: t('probe.device.field.platform'),
            value: Device.osName ?? notAvailable,
          },
          {
            label: t('probe.device.field.osVersion'),
            value: Device.osVersion ?? notAvailable,
          },
          {
            label: t('probe.device.field.model'),
            value: Device.modelName ?? notAvailable,
          },
          {
            label: t('probe.device.field.deviceName'),
            value: Device.deviceName ?? notAvailable,
          },
          {
            label: t('probe.device.field.manufacturer'),
            value: Device.manufacturer ?? notAvailable,
          },
          {
            label: t('probe.device.field.deviceType'),
            value: t(deviceTypeKey[deviceType]),
          },
          {
            label: t('probe.device.field.physicalDevice'),
            value: Device.isDevice ? t('common.yes') : t('common.no'),
          },
        ]}
      />
    </ProbeScreenShell>
  );
}
