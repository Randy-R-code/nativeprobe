import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

export type IntervalPickerProps = {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  label: string;
};

export function IntervalPicker({ value, options, onChange, label }: IntervalPickerProps) {
  return (
    <View>
      <Text variant="caption">{label}</Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              accessibilityRole="button"
              accessibilityLabel={`${option}ms`}
              accessibilityState={{ selected }}
              hitSlop={4}
              className={cn(
                'rounded-full border px-3 py-1.5',
                selected ? 'border-primary bg-primary/10' : 'border-border'
              )}>
              <Text
                variant="body-sm"
                className={selected ? 'text-primary' : 'text-muted-foreground'}>
                {option}ms
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
