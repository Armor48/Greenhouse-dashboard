import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  Waves, 
  Gauge,
  FlaskConical,
  ThermometerSun,
  Container
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SensorConfig {
  id: string;
  name: string;
  unit: string;
  icon: LucideIcon;
  colorClass: string;
  min: number;
  max: number;
  warningMin?: number;
  warningMax?: number;
  criticalMin?: number;
  criticalMax?: number;
}

export interface DeviceConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export const SENSORS: SensorConfig[] = [
  {
    id: "temperature",
    name: "Temperature",
    unit: "°C",
    icon: Thermometer,
    colorClass: "sensor-temperature",
    min: 0,
    max: 50,
    warningMin: 15,
    warningMax: 35,
    criticalMin: 10,
    criticalMax: 40,
  },
  {
    id: "humidity",
    name: "Humidity",
    unit: "%",
    icon: Droplets,
    colorClass: "sensor-humidity",
    min: 0,
    max: 100,
    warningMin: 40,
    warningMax: 80,
    criticalMin: 30,
    criticalMax: 90,
  },
  {
    id: "soil_moisture",
    name: "Soil Moisture",
    unit: "%",
    icon: Droplets,
    colorClass: "sensor-soil",
    min: 0,
    max: 100,
    warningMin: 30,
    warningMax: 80,
    criticalMin: 20,
    criticalMax: 90,
  },
  {
    id: "light",
    name: "Light Level",
    unit: "lux",
    icon: Sun,
    colorClass: "sensor-light",
    min: 0,
    max: 100000,
    warningMin: 5000,
    warningMax: 80000,
  },
  {
    id: "co2",
    name: "CO₂",
    unit: "ppm",
    icon: Wind,
    colorClass: "sensor-co2",
    min: 0,
    max: 5000,
    warningMax: 1500,
    criticalMax: 2500,
  },
  {
    id: "ph",
    name: "pH Level",
    unit: "pH",
    icon: FlaskConical,
    colorClass: "sensor-ph",
    min: 0,
    max: 14,
    warningMin: 5.5,
    warningMax: 7.5,
    criticalMin: 5.0,
    criticalMax: 8.0,
  },
  {
    id: "tds",
    name: "TDS",
    unit: "ppm",
    icon: Gauge,
    colorClass: "sensor-tds",
    min: 0,
    max: 3000,
    warningMax: 2000,
    criticalMax: 2500,
  },
  {
    id: "water_temperature",
    name: "Water Temp",
    unit: "°C",
    icon: ThermometerSun,
    colorClass: "sensor-water-temp",
    min: 0,
    max: 40,
    warningMin: 18,
    warningMax: 28,
    criticalMin: 15,
    criticalMax: 32,
  },
  {
    id: "water_level",
    name: "Water Level",
    unit: "%",
    icon: Container,
    colorClass: "sensor-water-level",
    min: 0,
    max: 100,
    warningMin: 20,
    criticalMin: 10,
  },
];

export const DEVICES: DeviceConfig[] = [
  { id: "fan", name: "Fan", icon: Wind, description: "Circulation fan" },
  { id: "vent", name: "Vent", icon: Wind, description: "Ventilation system" },
  { id: "base_pump", name: "Base Pump", icon: Waves, description: "pH base solution pump" },
  { id: "acid_pump", name: "Acid Pump", icon: FlaskConical, description: "pH acid solution pump" },
  { id: "irrigation_pump", name: "Irrigation", icon: Droplets, description: "Main irrigation pump" },
  { id: "mist_pump", name: "Mist Pump", icon: Droplets, description: "Humidity misting system" },
  { id: "heater", name: "Heater", icon: Thermometer, description: "Heating element" },
  { id: "nutrient_pump", name: "Nutrient Pump", icon: FlaskConical, description: "Nutrient solution pump" },
  { id: "grow_light", name: "Grow Light", icon: Sun, description: "LED grow lights" },
];

export type SensorStatus = "normal" | "warning" | "critical";

export function getSensorStatus(sensor: SensorConfig, value: number): SensorStatus {
  if (sensor.criticalMin !== undefined && value < sensor.criticalMin) return "critical";
  if (sensor.criticalMax !== undefined && value > sensor.criticalMax) return "critical";
  if (sensor.warningMin !== undefined && value < sensor.warningMin) return "warning";
  if (sensor.warningMax !== undefined && value > sensor.warningMax) return "warning";
  return "normal";
}
