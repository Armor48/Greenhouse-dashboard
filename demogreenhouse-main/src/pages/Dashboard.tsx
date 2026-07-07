import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { SensorCard } from "@/components/greenhouse/SensorCard";
import { DeviceControl } from "@/components/greenhouse/DeviceControl";
import { AlertsPanel } from "@/components/greenhouse/AlertsPanel";
import { SensorChart } from "@/components/greenhouse/SensorChart";
import { useGreenhouseData } from "@/hooks/useGreenhouseData";
import { Button } from "@/components/ui/button";
import { RefreshCw, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const {
    sensors,
    devices,
    sensorReadings,
    deviceStates,
    alerts,
    toggleDevice,
    acknowledgeAlert,
    refreshSensorData,
  } = useGreenhouseData();

  const onlineDevices = Object.values(deviceStates).filter((d) => d.isOn).length;
  const totalDevices = devices.length;
  const warningCount = Object.values(sensorReadings).filter((r) => r.status === "warning").length;
  const criticalCount = Object.values(sensorReadings).filter((r) => r.status === "critical").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Sensors
              </CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensors.length}</div>
              <p className="text-xs text-muted-foreground">All sensors online</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Devices Running
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onlineDevices} / {totalDevices}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((onlineDevices / totalDevices) * 100)}% active
              </p>
            </CardContent>
          </Card>

          <Card className={warningCount > 0 ? "border-warning/30 bg-warning/5" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{warningCount}</div>
              <p className="text-xs text-muted-foreground">Sensors in warning state</p>
            </CardContent>
          </Card>

          <Card className={criticalCount > 0 ? "border-destructive/30 bg-destructive/5" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalCount}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={refreshSensorData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Sensor Cards */}
        <section>
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Sensor Readings
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </section>

        {/* Charts and Alerts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SensorChart sensorReadings={sensorReadings} />
          </div>
          <div>
            <AlertsPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        </div>

        {/* Device Controls */}
        <section>
          <h3 className="mb-4 text-lg font-semibold">Device Controls</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => {
              const state = deviceStates[device.id];
              return (
                <DeviceControl
                  key={device.id}
                  device={device}
                  isOn={state?.isOn ?? false}
                  pending={state?.pending ?? false}
                  lastChanged={state?.lastChanged ?? new Date()}
                  onToggle={() => toggleDevice(device.id)}
                />
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
