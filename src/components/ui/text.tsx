import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { cn } from '@/lib/cn';
import { cva, type VariantProps } from '@/lib/cva';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      title: 'font-sans font-bold text-[28px] leading-[34px] tracking-tight',
      subtitle: 'font-sans text-[15px] leading-5 text-muted-foreground',
      'section-label':
        'font-sans font-semibold text-[13px] uppercase tracking-wider text-muted-foreground',
      body: 'font-sans text-[15px] leading-[22px]',
      'body-sm': 'font-sans text-[13px] leading-[19px]',
      caption: 'font-sans text-[12px] text-muted-foreground',
      label: 'font-sans font-semibold text-[15px]',
      mono: 'font-mono text-[13px] leading-[19px]',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>;

export type TextProps = RNTextProps &
  VariantProps<typeof textVariants> & {
    className?: string;
  };

export function Text({ className, variant, ...props }: TextProps) {
  return <RNText className={cn(textVariants({ variant }), className)} {...props} />;
}
