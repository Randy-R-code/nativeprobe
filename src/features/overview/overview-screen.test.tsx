import { renderWithProviders } from '@/test-utils/render';
import { OverviewScreen } from './overview-screen';

describe('OverviewScreen', () => {
  test('renders all four category sections from the probe registry', async () => {
    const { getByText } = await renderWithProviders(<OverviewScreen />);
    expect(getByText('DEVICE')).toBeTruthy();
    expect(getByText('SENSORS')).toBeTruthy();
    expect(getByText('SYSTEM APIs')).toBeTruthy();
    expect(getByText('REPORT')).toBeTruthy();
  });

  test('renders every probe title from the registry', async () => {
    const { getByText } = await renderWithProviders(<OverviewScreen />);
    expect(getByText('Device')).toBeTruthy();
    expect(getByText('Accelerometer')).toBeTruthy();
    expect(getByText('Capability Report')).toBeTruthy();
  });
});
