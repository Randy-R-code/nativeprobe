import * as Haptics from 'expo-haptics';
import { View } from 'react-native';
import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/i18n-provider';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';

export type HapticsScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function HapticsScreen({ probe, status }: HapticsScreenProps) {
  const t = useT();

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-haptics">
      <View className="flex-row flex-wrap gap-2">
        <Button
          label={t('probe.haptics.style.light')}
          variant="secondary"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />
        <Button
          label={t('probe.haptics.style.medium')}
          variant="secondary"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        />
        <Button
          label={t('probe.haptics.style.heavy')}
          variant="secondary"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
        <Button
          label={t('probe.haptics.style.success')}
          variant="secondary"
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
        />
        <Button
          label={t('probe.haptics.style.warning')}
          variant="secondary"
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
        />
        <Button
          label={t('probe.haptics.style.error')}
          variant="secondary"
          onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
        />
        <Button
          label={t('probe.haptics.style.selection')}
          variant="secondary"
          onPress={() => Haptics.selectionAsync()}
        />
      </View>
    </ProbeScreenShell>
  );
}
