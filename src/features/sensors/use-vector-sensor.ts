import { useEffect, useState } from 'react';

export type ThreeAxisMeasurement = {
  x: number;
  y: number;
  z: number;
};

export type VectorSensorModule = {
  addListener: (listener: (measurement: ThreeAxisMeasurement) => void) => {
    remove: () => void;
  };
  setUpdateInterval: (intervalMs: number) => void;
};

export function useVectorSensor(sensor: VectorSensorModule, intervalMs: number) {
  const [vector, setVector] = useState<ThreeAxisMeasurement>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [active, setActive] = useState(false);

  useEffect(() => {
    sensor.setUpdateInterval(intervalMs);
  }, [sensor, intervalMs]);

  useEffect(() => {
    if (!active) return;
    const subscription = sensor.addListener(setVector);
    return () => subscription.remove();
  }, [sensor, active]);

  return {
    vector,
    active,
    start: () => setActive(true),
    stop: () => setActive(false),
  };
}
