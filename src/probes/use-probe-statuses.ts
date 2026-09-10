import { useEffect, useState } from 'react';
import type { ProbeAvailability, ProbeDefinition, ProbeId } from './types';

function initialStatuses(probes: ProbeDefinition[]): Record<ProbeId, ProbeAvailability> {
  return Object.fromEntries(probes.map((probe) => [probe.id, 'unknown'])) as Record<
    ProbeId,
    ProbeAvailability
  >;
}

export function useProbeStatuses(probes: ProbeDefinition[]): Record<ProbeId, ProbeAvailability> {
  const [statuses, setStatuses] = useState(() => initialStatuses(probes));

  useEffect(() => {
    let cancelled = false;

    for (const probe of probes) {
      probe.getAvailability().then((availability) => {
        if (!cancelled) {
          setStatuses((prev) => ({ ...prev, [probe.id]: availability }));
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [probes]);

  return statuses;
}
