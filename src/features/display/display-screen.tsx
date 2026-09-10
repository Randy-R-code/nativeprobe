import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { FieldList } from '@/components/ui/field-list';
import { useT } from '@/i18n/i18n-provider';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DisplayScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function DisplayScreen({ probe, status }: DisplayScreenProps) {
  const t = useT();
  const { width, height, scale, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const orientation = width >= height ? t('common.landscape') : t('common.portrait');

  return (
    <ProbeScreenShell
      probe={probe}
      status={status}
      builtWith="react-native (useWindowDimensions, useSafeAreaInsets)">
      <FieldList
        fields={[
          {
            label: t('probe.display.field.width'),
            value: `${Math.round(width)}`,
          },
          {
            label: t('probe.display.field.height'),
            value: `${Math.round(height)}`,
          },
          {
            label: t('probe.display.field.pixelRatio'),
            value: scale.toFixed(2),
          },
          {
            label: t('probe.display.field.fontScale'),
            value: fontScale.toFixed(2),
          },
          { label: t('probe.display.field.orientation'), value: orientation },
          {
            label: t('probe.display.field.safeAreaTop'),
            value: `${Math.round(insets.top)}`,
          },
          {
            label: t('probe.display.field.safeAreaBottom'),
            value: `${Math.round(insets.bottom)}`,
          },
          {
            label: t('probe.display.field.safeAreaLeft'),
            value: `${Math.round(insets.left)}`,
          },
          {
            label: t('probe.display.field.safeAreaRight'),
            value: `${Math.round(insets.right)}`,
          },
        ]}
      />
    </ProbeScreenShell>
  );
}
