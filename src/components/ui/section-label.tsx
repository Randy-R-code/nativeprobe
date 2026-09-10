import { Text } from './text';

export type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <Text variant="section-label" className={className}>
      {children}
    </Text>
  );
}
