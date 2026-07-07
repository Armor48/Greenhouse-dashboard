import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DeviceConfig } from "@/lib/greenhouse-config";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DeviceControlProps {
  device: DeviceConfig;
  isOn: boolean;
  pending: boolean;
  lastChanged: Date;
  onToggle: () => void;
}

export function DeviceControl({ device, isOn, pending, lastChanged, onToggle }: DeviceControlProps) {
  const Icon = device.icon;

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      isOn ? "border-primary/30 bg-primary/5" : "border-muted"
    )}>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            isOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            {pending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="font-medium">{device.name}</p>
            <p className="text-xs text-muted-foreground">{device.description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <Switch
            checked={isOn}
            onCheckedChange={onToggle}
            disabled={pending}
          />
          <span className="text-xs text-muted-foreground">
            {isOn ? "ON" : "OFF"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
