import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { SensorChart } from "@/components/greenhouse/SensorChart";
import { useGreenhouseData } from "@/hooks/useGreenhouseData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Analytics = () => {
  const { sensorReadings } = useGreenhouseData();

  // Mock trend data
  const trends = [
    { sensor: "Temperature", change: 2.3, direction: "up" },
    { sensor: "Humidity", change: -1.5, direction: "down" },
    { sensor: "Soil Moisture", change: 0.2, direction: "stable" },
    { sensor: "Light Level", change: 15, direction: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Historical data and trends analysis
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trends.map((trend) => (
            <Card key={trend.sensor}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {trend.sensor}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {trend.direction === "up" && (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                  {trend.direction === "down" && (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  {trend.direction === "stable" && (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-lg font-bold">
                    {trend.change > 0 ? "+" : ""}
                    {trend.change}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">vs last 24h</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <SensorChart sensorReadings={sensorReadings} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
