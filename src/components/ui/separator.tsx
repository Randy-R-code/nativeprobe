import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

export type SeparatorProps = ViewProps & { className?: string };

export function Separator({ className, ...props }: SeparatorProps) {
  return <View className={cn('h-px bg-border', className)} {...props} />;
}
