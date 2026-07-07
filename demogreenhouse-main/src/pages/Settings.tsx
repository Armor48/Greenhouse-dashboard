import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [mqttConfig, setMqttConfig] = useState({
    broker: "broker.hivemq.com",
    port: "8884",
    username: "",
    password: "",
    clientId: "greenhouse-monitor-01",
  });

  const [notifications, setNotifications] = useState({
    enableAlerts: true,
    soundAlerts: false,
    criticalOnly: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your greenhouse monitoring system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>MQTT Configuration</CardTitle>
            <CardDescription>
              Configure connection to your MQTT broker
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="broker">Broker URL</Label>
                <Input
                  id="broker"
                  value={mqttConfig.broker}
                  onChange={(e) => setMqttConfig({ ...mqttConfig, broker: e.target.value })}
                  placeholder="broker.hivemq.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port (WebSocket)</Label>
                <Input
                  id="port"
                  value={mqttConfig.port}
                  onChange={(e) => setMqttConfig({ ...mqttConfig, port: e.target.value })}
                  placeholder="8884"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username (optional)</Label>
                <Input
                  id="username"
                  value={mqttConfig.username}
                  onChange={(e) => setMqttConfig({ ...mqttConfig, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password (optional)</Label>
                <Input
                  id="password"
                  type="password"
                  value={mqttConfig.password}
                  onChange={(e) => setMqttConfig({ ...mqttConfig, password: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={mqttConfig.clientId}
                onChange={(e) => setMqttConfig({ ...mqttConfig, clientId: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Show on-screen notifications for sensor alerts
                </p>
              </div>
              <Switch
                checked={notifications.enableAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, enableAlerts: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Play sound when critical alerts occur
                </p>
              </div>
              <Switch
                checked={notifications.soundAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, soundAlerts: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Critical Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only show notifications for critical alerts
                </p>
              </div>
              <Switch
                checked={notifications.criticalOnly}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, criticalOnly: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
