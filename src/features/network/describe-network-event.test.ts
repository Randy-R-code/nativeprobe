import { describe, expect, test } from 'bun:test';
import { describeNetworkEvent, type Translate } from './describe-network-event';

const fakeT: Translate = (key, vars) => {
  if (key === 'probe.network.log.connected') return `${vars?.type} connected`;
  if (key === 'probe.network.log.disconnected') return 'disconnected';
  return key;
};

describe('describeNetworkEvent', () => {
  test('describes a connection with its type', () => {
    expect(describeNetworkEvent(true, 'Wi-Fi', fakeT)).toBe('Wi-Fi connected');
  });

  test('describes a disconnection regardless of type', () => {
    expect(describeNetworkEvent(false, 'Wi-Fi', fakeT)).toBe('disconnected');
  });
});
