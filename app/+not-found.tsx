import { Link, Stack } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <Screen className="items-center justify-center gap-2">
        <Text variant="title">404</Text>
        <Link href="/">
          <Text variant="label" className="text-primary">
            Go to Overview
          </Text>
        </Link>
      </Screen>
    </>
  );
}
