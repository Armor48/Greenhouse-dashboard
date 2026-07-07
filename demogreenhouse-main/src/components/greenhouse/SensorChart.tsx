import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SENSORS, SensorConfig } from "@/lib/greenhouse-config";
import { SensorReading } from "@/hooks/useGreenhouseData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SensorChartProps {
  sensorReadings: Record<string, SensorReading>;
}

// Generate mock historical data
function generateHistoricalData(sensor: SensorConfig, hours: number = 24) {
  const data = [];
  const now = Date.now();
  const interval = (hours * 60 * 60 * 1000) / 48; // 48 data points

  for (let i = 48; i >= 0; i--) {
    const timestamp = new Date(now - i * interval);
    const baseValue = (sensor.max + sensor.min) / 2;
    const variation = (sensor.max - sensor.min) * 0.25;
    const value = baseValue + (Math.sin(i / 8) + Math.random() - 0.5) * variation;

    data.push({
      time: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      [sensor.id]: Math.max(sensor.min, Math.min(sensor.max, value)),
    });
  }

  return data;
}

export function SensorChart({ sensorReadings }: SensorChartProps) {
  const [selectedSensor, setSelectedSensor] = useState<string>("temperature");
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "24h" | "7d">("24h");

  const sensor = SENSORS.find((s) => s.id === selectedSensor)!;

  const chartData = useMemo(() => {
    const hours =
      timeRange === "1h" ? 1 : timeRange === "6h" ? 6 : timeRange === "24h" ? 24 : 168;
    return generateHistoricalData(sensor, hours);
  }, [sensor, timeRange]);

  const getLineColor = (sensorId: string) => {
    const sensorConfig = SENSORS.find((s) => s.id === sensorId);
    return `hsl(var(--${sensorConfig?.colorClass}))`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg">Sensor History</CardTitle>
          <div className="flex gap-1">
            {(["1h", "6h", "24h", "7d"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-7 px-2 text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 pt-2">
          {SENSORS.slice(0, 6).map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSensor(s.id)}
              className={cn(
                "h-7 px-2 text-xs",
                selectedSensor === s.id && "bg-primary/10 text-primary"
              )}
            >
              {s.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                className="text-muted-foreground"
                tickLine={false}
              />
              <YAxis
                domain={[sensor.min, sensor.max]}
                tick={{ fontSize: 10 }}
                className="text-muted-foreground"
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line
                type="monotone"
                dataKey={selectedSensor}
                stroke={getLineColor(selectedSensor)}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
