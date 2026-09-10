import { cn } from '@/lib/cn';
import { View, type ViewProps } from 'react-native';

export type SeparatorProps = ViewProps & { className?: string };

export function Separator({ className, ...props }: SeparatorProps) {
  return <View className={cn('h-px bg-border', className)} {...props} />;
}
