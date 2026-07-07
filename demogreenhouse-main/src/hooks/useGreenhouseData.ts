import { useState, useCallback } from "react";
import { SENSORS, DEVICES, SensorConfig, DeviceConfig, getSensorStatus, SensorStatus } from "@/lib/greenhouse-config";

export interface SensorReading {
  sensorId: string;
  value: number;
  timestamp: Date;
  status: SensorStatus;
}

export interface DeviceState {
  deviceId: string;
  isOn: boolean;
  lastChanged: Date;
  pending: boolean;
}

export interface Alert {
  id: string;
  sensorId: string;
  type: "warning" | "critical";
  message: string;
  value: number;
  timestamp: Date;
  acknowledged: boolean;
}

// Generate mock data for demo
function generateMockSensorValue(sensor: SensorConfig): number {
  const range = sensor.max - sensor.min;
  const midpoint = sensor.min + range * 0.5;
  const variance = range * 0.3;
  return Math.max(sensor.min, Math.min(sensor.max, midpoint + (Math.random() - 0.5) * variance));
}

export function useGreenhouseData() {
  const [sensorReadings, setSensorReadings] = useState<Record<string, SensorReading>>(() => {
    const initial: Record<string, SensorReading> = {};
    SENSORS.forEach((sensor) => {
      const value = generateMockSensorValue(sensor);
      initial[sensor.id] = {
        sensorId: sensor.id,
        value,
        timestamp: new Date(),
        status: getSensorStatus(sensor, value),
      };
    });
    return initial;
  });

  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>(() => {
    const initial: Record<string, DeviceState> = {};
    DEVICES.forEach((device) => {
      initial[device.id] = {
        deviceId: device.id,
        isOn: Math.random() > 0.5,
        lastChanged: new Date(),
        pending: false,
      };
    });
    return initial;
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      sensorId: "temperature",
      type: "warning",
      message: "Temperature above optimal range",
      value: 36.5,
      timestamp: new Date(Date.now() - 3600000),
      acknowledged: false,
    },
    {
      id: "2",
      sensorId: "water_level",
      type: "critical",
      message: "Water level critically low",
      value: 8,
      timestamp: new Date(Date.now() - 7200000),
      acknowledged: true,
    },
  ]);

  const toggleDevice = useCallback((deviceId: string) => {
    setDeviceStates((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        pending: true,
      },
    }));

    // Simulate MQTT callback delay
    setTimeout(() => {
      setDeviceStates((prev) => ({
        ...prev,
        [deviceId]: {
          ...prev[deviceId],
          isOn: !prev[deviceId].isOn,
          lastChanged: new Date(),
          pending: false,
        },
      }));
    }, 500 + Math.random() * 500);
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  const refreshSensorData = useCallback(() => {
    const newReadings: Record<string, SensorReading> = {};
    SENSORS.forEach((sensor) => {
      const value = generateMockSensorValue(sensor);
      const status = getSensorStatus(sensor, value);
      newReadings[sensor.id] = {
        sensorId: sensor.id,
        value,
        timestamp: new Date(),
        status,
      };

      // Generate alerts for abnormal readings
      if (status !== "normal") {
        const existingAlert = alerts.find(
          (a) => a.sensorId === sensor.id && !a.acknowledged
        );
        if (!existingAlert) {
          setAlerts((prev) => [
            {
              id: Date.now().toString(),
              sensorId: sensor.id,
              type: status,
              message: `${sensor.name} is ${status === "critical" ? "critically" : ""} out of range`,
              value,
              timestamp: new Date(),
              acknowledged: false,
            },
            ...prev,
          ]);
        }
      }
    });
    setSensorReadings(newReadings);
  }, [alerts]);

  return {
    sensors: SENSORS,
    devices: DEVICES,
    sensorReadings,
    deviceStates,
    alerts,
    toggleDevice,
    acknowledgeAlert,
    refreshSensorData,
  };
}
