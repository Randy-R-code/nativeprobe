import { cn } from '@/lib/cn';
import { ScrollView, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ScreenProps = ViewProps & {
  className?: string;
  scroll?: boolean;
};

export function Screen({ className, scroll = true, children, ...props }: ScreenProps) {
  const Container = scroll ? ScrollView : View;
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom', 'left', 'right']}>
      <Container
        className={cn('flex-1', className)}
        contentContainerClassName={scroll ? 'px-4 pb-8 pt-2' : undefined}
        {...props}>
        {children}
      </Container>
    </SafeAreaView>
  );
}
