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
      probe
        .getAvailability()
        .then((availability) => {
          if (!cancelled) {
            setStatuses((prev) => ({ ...prev, [probe.id]: availability }));
          }
        })
        .catch(() => {
          // A probe's availability check threw (an unexpected native error) —
          // leave it at "unknown" rather than an unhandled rejection that
          // silently stops updating this row forever.
          if (!cancelled) {
            setStatuses((prev) => ({ ...prev, [probe.id]: 'unknown' }));
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [probes]);

  return statuses;
}
