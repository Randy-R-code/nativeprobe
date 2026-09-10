import { ProbeScreenShell } from '@/components/probe/probe-screen-shell';
import { Button } from '@/components/ui/button';
import { FieldList } from '@/components/ui/field-list';
import { Text } from '@/components/ui/text';
import { useT } from '@/i18n/i18n-provider';
import type { ProbeAvailability, ProbeDefinition } from '@/probes/types';
import type { TranslationKey } from '@/types/i18n';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const typeKey: Record<LocalAuthentication.AuthenticationType, TranslationKey> = {
  [LocalAuthentication.AuthenticationType.FINGERPRINT]: 'probe.biometrics.type.fingerprint',
  [LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION]: 'probe.biometrics.type.facial',
  [LocalAuthentication.AuthenticationType.IRIS]: 'probe.biometrics.type.iris',
};

export type BiometricsScreenProps = {
  probe: ProbeDefinition;
  status: ProbeAvailability;
};

export function BiometricsScreen({ probe, status }: BiometricsScreenProps) {
  const t = useT();
  const [hardware, setHardware] = useState<boolean | null>(null);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [types, setTypes] = useState<LocalAuthentication.AuthenticationType[]>([]);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
    ]).then(([hw, enr, supported]) => {
      if (cancelled) return;
      setHardware(hw);
      setEnrolled(enr);
      setTypes(supported);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleTest = async () => {
    const response = await LocalAuthentication.authenticateAsync({
      promptMessage: t('probe.biometrics.action.test'),
    });
    setResult(
      response.success
        ? t('probe.biometrics.result.success')
        : t('probe.biometrics.result.failed', { error: response.error })
    );
  };

  const notAvailable = t('common.notAvailable');
  const typesLabel =
    types.length > 0
      ? types.map((type) => t(typeKey[type])).join(', ')
      : t('probe.biometrics.none');

  return (
    <ProbeScreenShell probe={probe} status={status} builtWith="expo-local-authentication">
      <FieldList
        fields={[
          {
            label: t('probe.biometrics.field.hardware'),
            value: hardware == null ? notAvailable : hardware ? t('common.yes') : t('common.no'),
          },
          {
            label: t('probe.biometrics.field.enrolled'),
            value: enrolled == null ? notAvailable : enrolled ? t('common.yes') : t('common.no'),
          },
          { label: t('probe.biometrics.field.types'), value: typesLabel },
        ]}
      />
      <View className="flex-row">
        <Button label={t('probe.biometrics.action.test')} onPress={handleTest} />
      </View>
      {result ? (
        <Text variant="body-sm" className="text-muted-foreground">
          {result}
        </Text>
      ) : null}
    </ProbeScreenShell>
  );
}
