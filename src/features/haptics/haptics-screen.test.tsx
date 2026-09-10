import { getProbe } from '@/probes/registry';
import { fireEvent, renderWithProviders } from '@/test-utils/render';
import * as Haptics from 'expo-haptics';
import { HapticsScreen } from './haptics-screen';

const probe = getProbe('haptics');
if (!probe) throw new Error('haptics probe missing from the registry');

describe('HapticsScreen', () => {
  test('renders a button for every haptic style the spec lists', async () => {
    const { getByText } = await renderWithProviders(
      <HapticsScreen probe={probe} status="available" />
    );
    for (const label of [
      'Light impact',
      'Medium impact',
      'Heavy impact',
      'Success',
      'Warning',
      'Error',
      'Selection',
    ]) {
      expect(getByText(label)).toBeTruthy();
    }
  });

  test('pressing "Light impact" triggers the matching expo-haptics call', async () => {
    const impactSpy = jest.spyOn(Haptics, 'impactAsync').mockResolvedValue();
    const { getByText } = await renderWithProviders(
      <HapticsScreen probe={probe} status="available" />
    );

    fireEvent.press(getByText('Light impact'));

    expect(impactSpy).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  test('pressing "Selection" triggers selectionAsync', async () => {
    const selectionSpy = jest.spyOn(Haptics, 'selectionAsync').mockResolvedValue();
    const { getByText } = await renderWithProviders(
      <HapticsScreen probe={probe} status="available" />
    );

    fireEvent.press(getByText('Selection'));

    expect(selectionSpy).toHaveBeenCalledTimes(1);
  });
});
