import { DashboardLayout } from "@/components/greenhouse/DashboardLayout";
import { AlertsPanel } from "@/components/greenhouse/AlertsPanel";
import { useGreenhouseData } from "@/hooks/useGreenhouseData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle, Bell } from "lucide-react";

const Alerts = () => {
  const { alerts, acknowledgeAlert } = useGreenhouseData();

  const criticalCount = alerts.filter((a) => a.type === "critical" && !a.acknowledged).length;
  const warningCount = alerts.filter((a) => a.type === "warning" && !a.acknowledged).length;
  const acknowledgedCount = alerts.filter((a) => a.acknowledged).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Alert History</h1>
          <p className="text-muted-foreground">
            View and manage all system alerts
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Alerts
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            </CardContent>
          </Card>

          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Warnings
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{warningCount}</div>
            </CardContent>
          </Card>

          <Card className="border-success/30 bg-success/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Acknowledged
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{acknowledgedCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl">
          <AlertsPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
