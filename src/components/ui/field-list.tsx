import { View } from 'react-native';
import { Card } from './card';
import { Separator } from './separator';
import { Text } from './text';

export type Field = {
  label: string;
  value: string;
};

export type FieldListProps = {
  fields: Field[];
};

export function FieldList({ fields }: FieldListProps) {
  return (
    <Card className="p-0">
      {fields.map((field, index) => (
        <View key={field.label} className="px-4">
          {index > 0 && <Separator />}
          <View className="flex-row items-center justify-between gap-3 py-3">
            <Text variant="body-sm" className="text-muted-foreground">
              {field.label}
            </Text>
            <Text variant="mono">{field.value}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}
