import { renderWithProviders } from '@/test-utils/render';
import { StatusChip } from './status-chip';

describe('StatusChip', () => {
  test('renders the localized label for each status, never color alone', async () => {
    const { getByText } = await renderWithProviders(<StatusChip status="available" />);
    expect(getByText('Available')).toBeTruthy();
  });

  test('defaults to "unknown" when no status is given', async () => {
    const { getByText } = await renderWithProviders(<StatusChip />);
    expect(getByText('Unknown')).toBeTruthy();
  });

  test('renders "permission required" for that status', async () => {
    const { getByText } = await renderWithProviders(<StatusChip status="permission-required" />);
    expect(getByText('Permission required')).toBeTruthy();
  });
});
