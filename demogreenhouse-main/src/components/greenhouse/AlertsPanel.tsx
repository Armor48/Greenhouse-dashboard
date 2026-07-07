import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert } from "@/hooks/useGreenhouseData";
import { SENSORS } from "@/lib/greenhouse-config";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Check, Bell } from "lucide-react";

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onAcknowledge }: AlertsPanelProps) {
  const getSensorName = (sensorId: string) => {
    return SENSORS.find((s) => s.id === sensorId)?.name ?? sensorId;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Alerts</CardTitle>
          {unacknowledgedCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {unacknowledgedCount}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Check className="mb-2 h-8 w-8 text-success" />
              <p>All systems normal</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "rounded-lg border p-3 transition-all",
                    alert.acknowledged
                      ? "border-muted bg-muted/30 opacity-60"
                      : alert.type === "critical"
                      ? "border-destructive/50 bg-destructive/10"
                      : "border-warning/50 bg-warning/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {alert.type === "critical" ? (
                        <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
                      ) : (
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {getSensorName(alert.sensorId)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.message}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Value: {alert.value.toFixed(1)} • {formatTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAcknowledge(alert.id)}
                        className="h-7 px-2"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
