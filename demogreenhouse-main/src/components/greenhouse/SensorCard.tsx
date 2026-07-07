import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorConfig, SensorStatus } from "@/lib/greenhouse-config";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  sensor: SensorConfig;
  value: number;
  status: SensorStatus;
  timestamp: Date;
}

export function SensorCard({ sensor, value, status, timestamp }: SensorCardProps) {
  const Icon = sensor.icon;

  const statusColors = {
    normal: "border-success/30 bg-success/5",
    warning: "border-warning/50 bg-warning/10",
    critical: "border-destructive/50 bg-destructive/10 animate-pulse",
  };

  const statusBadgeColors = {
    normal: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    critical: "bg-destructive text-destructive-foreground",
  };

  const formatValue = (val: number) => {
    if (sensor.unit === "lux") {
      return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0);
    }
    if (sensor.unit === "ppm") {
      return val.toFixed(0);
    }
    return val.toFixed(1);
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg", statusColors[status])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {sensor.name}
        </CardTitle>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            `bg-${sensor.colorClass}/20`
          )}
          style={{ backgroundColor: `hsl(var(--${sensor.colorClass}) / 0.2)` }}
        >
          <Icon 
            className="h-4 w-4" 
            style={{ color: `hsl(var(--${sensor.colorClass}))` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight">
            {formatValue(value)}
          </span>
          <span className="text-sm text-muted-foreground">{sensor.unit}</span>
        </div>
        
        {/* Progress bar showing range */}
        <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, ((value - sensor.min) / (sensor.max - sensor.min)) * 100)}%`,
              backgroundColor: `hsl(var(--${sensor.colorClass}))`,
            }}
          />
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {sensor.min} - {sensor.max} {sensor.unit}
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", statusBadgeColors[status])}>
            {status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
