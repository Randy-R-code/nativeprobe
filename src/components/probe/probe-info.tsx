import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import { View } from 'react-native';

export type ProbeInfoProps = {
  text: string;
};

export function ProbeInfo({ text }: ProbeInfoProps) {
  const t = useT();

  return (
    <View className="mt-6 gap-1">
      <Text variant="section-label">{t('probeDetail.whatIsThisFor')}</Text>
      <Text variant="body-sm" className="text-muted-foreground">
        {text}
      </Text>
    </View>
  );
}
