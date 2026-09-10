import { Pressable, type PressableProps } from 'react-native';
import { cn } from '@/lib/cn';
import { cva, type VariantProps } from '@/lib/cva';
import { Text } from './text';

const buttonVariants = cva('items-center justify-center rounded-xl px-4 py-3 active:opacity-70', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-muted',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const labelColor: Record<NonNullable<VariantProps<typeof buttonVariants>['variant']>, string> = {
  primary: 'text-primary-foreground',
  secondary: 'text-foreground',
};

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    label: string;
    className?: string;
  };

export function Button({ label, variant, className, ...props }: ButtonProps) {
  const resolvedVariant = variant ?? 'primary';
  return (
    <Pressable className={cn(buttonVariants({ variant: resolvedVariant }), className)} {...props}>
      <Text variant="label" className={labelColor[resolvedVariant]}>
        {label}
      </Text>
    </Pressable>
  );
}
