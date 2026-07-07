import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { DeviceControl } from "@/components/greenhouse/DeviceControl";
import { useGreenhouseData } from "@/hooks/useGreenhouseData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Controls = () => {
  const { devices, deviceStates, toggleDevice } = useGreenhouseData();

  const onlineDevices = Object.values(deviceStates).filter((d) => d.isOn).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Device Controls</h1>
          <p className="text-muted-foreground">
            Manage all greenhouse devices and equipment
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
            </CardContent>
          </Card>
          <Card className="border-success/30 bg-success/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{onlineDevices}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Inactive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length - onlineDevices}</div>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </DashboardLayout>
  );
};

export default Controls;
