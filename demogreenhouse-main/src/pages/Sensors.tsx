import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { SensorCard } from "@/components/greenhouse/SensorCard";
import { useGreenhouseData } from "@/hooks/useGreenhouseData";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Sensors = () => {
  const { sensors, sensorReadings, refreshSensorData } = useGreenhouseData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sensor Readings</h1>
            <p className="text-muted-foreground">
              Monitor all greenhouse sensors in real-time
            </p>
          </div>
          <Button variant="outline" onClick={refreshSensorData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sensors.map((sensor) => {
            const reading = sensorReadings[sensor.id];
            return (
              <SensorCard
                key={sensor.id}
                sensor={sensor}
                value={reading?.value ?? 0}
                status={reading?.status ?? "normal"}
                timestamp={reading?.timestamp ?? new Date()}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;
