import type { TranslationKey } from '@/types/i18n';
import type { Ionicons } from '@expo/vector-icons';

export type ProbeAvailability =
  'available' | 'permission-required' | 'denied' | 'restricted' | 'unsupported' | 'unknown';

export type ProbeCategory = 'device' | 'sensors' | 'system' | 'report';

export type ProbeId =
  | 'device'
  | 'display'
  | 'battery'
  | 'network'
  | 'accelerometer'
  | 'gyroscope'
  | 'magnetometer'
  | 'permissions'
  | 'location'
  | 'haptics'
  | 'biometrics'
  | 'deep-links'
  | 'report';

export type IconName = keyof typeof Ionicons.glyphMap;

export type ProbeDefinition = {
  id: ProbeId;
  category: ProbeCategory;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  platforms: ('ios' | 'android')[];
  icon: IconName;
  getAvailability: () => Promise<ProbeAvailability>;
};
