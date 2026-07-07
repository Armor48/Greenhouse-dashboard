# 🌿 Greenhouse Dashboard - IoT Monitoring System

🌐 **Live Demo:** [https://armortech5.netlify.app/](https://armortech5.netlify.app/)  
📂 **Repository:** [Armor48/Greenhouse-dashboard](https://github.com/Armor48/Greenhouse-dashboard)

![Greenhouse Dashboard Preview](https://raw.githubusercontent.com/Armor48/Greenhouse-dashboard/main/demogreenhouse-main/assets/preview.png)

## 📖 About This Project

**Greenhouse Dashboard** is a comprehensive IoT-based monitoring and control system designed for smart greenhouse agriculture. This project provides real-time visualization of environmental parameters including temperature, humidity, soil moisture, and light intensity, with remote control capabilities for irrigation and ventilation systems.

Built with modern web technologies and IoT hardware, this dashboard enables farmers and gardeners to monitor their greenhouse conditions from anywhere in the world.

## ✨ Features

### 📊 Real-Time Monitoring
- 🌡️ Temperature monitoring (°C/°F)
- 💧 Humidity tracking (%)
- 🌱 Soil moisture levels (%)
- ☀️ Light intensity detection (Lux)
- 📈 Historical data charts

### 🎛️ Control Systems
- 💧 Automatic/Manual irrigation control
- 🌀 Fan/ventilation control
- 💡 Grow light management
- ⏰ Scheduled automation

### 🌐 Connectivity
- 📡 Wi-Fi enabled (ESP32)
- ☁️ Arduino IoT Cloud integration
- 📱 Mobile-responsive dashboard
- 🔔 Real-time alerts and notifications

### 🖥️ Dashboard Features
- 📊 Interactive charts (Chart.js)
- 🎨 Modern UI with dark/light mode
- 📱 Responsive design for all devices
- 🔐 Secure access control

## 🛠️ Hardware Requirements

| Component | Quantity | Specification |
|-----------|----------|---------------|
| ESP32 Dev Board | 1 | ESP-WROOM-32 |
| DHT22/DHT11 Sensor | 1 | Temperature & Humidity |
| Soil Moisture Sensor | 1-4 | Capacitive type recommended |
| LDR/Photoresistor | 1 | Light intensity |
| Relay Module | 2-4 | 5V, 10A |
| Water Pump | 1 | 5V/12V DC |
| DC Fan | 1 | 5V/12V |
| OLED Display | 1 | 0.96" SSD1306 (optional) |
| Jumper Wires | Multiple | Male-to-Female |
| Breadboard/PCB | 1 | For prototyping |

## 💻 Software Requirements

- **Arduino IDE** 2.0+ or PlatformIO
- **ESP32 Board Package**
- **Node.js** 16+ (for dashboard server)
- **Python** 3.8+ (optional, for data processing)

## 📦 Project Structure

```
demogreenhouse-main/
├── index.html                 # Main dashboard HTML
├── css/
│   ├── style.css              # Main styles
│   ├── dashboard.css          # Dashboard specific styles
│   └── responsive.css         # Mobile responsive styles
├── js/
│   ├── main.js                # Main JavaScript
│   ├── charts.js              # Chart.js configuration
│   ├── mqtt.js                # MQTT/WebSocket handler
│   └── api.js                 # API calls
├── assets/
│   ├── images/                # Dashboard images
│   ├── icons/                 # SVG/PNG icons
│   └── fonts/                 # Custom fonts
├── firmware/
│   ├── greenhouse.ino         # ESP32 Arduino code
│   ├── thingProperties.h      # Arduino IoT Cloud config
│   └── secrets.h              # WiFi credentials (template)
├── server/
│   ├── app.js                 # Node.js server
│   ├── package.json           # Dependencies
│   └── routes/                # API routes
├── docs/
│   ├── wiring_diagram.png     # Hardware connections
│   └── user_manual.pdf        # Documentation
├── .gitignore
├── README.md
└── LICENSE
```

## 🔌 Hardware Wiring Diagram

### ESP32 Pin Connections

| Component | Pin | ESP32 GPIO |
|-----------|-----|------------|
| DHT22 Data | DATA | GPIO 4 |
| Soil Moisture 1 | A0 | GPIO 35 (VP) |
| Soil Moisture 2 | A0 | GPIO 34 (VN) |
| LDR | A0 | GPIO 39 (VN) |
| Relay 1 (Pump) | IN | GPIO 2 |
| Relay 2 (Fan) | IN | GPIO 15 |
| Relay 3 (Light) | IN | GPIO 13 |
| OLED SDA | SDA | GPIO 21 |
| OLED SCL | SCL | GPIO 22 |
| Buzzer | + | GPIO 25 |

```
┌─────────────────────────────────────────────────────────────┐
│                    GREENHOUSE SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│  ESP32          │  Sensors        │  Actuators              │
│  ─────          │  ───────        │  ─────────                │
│  GPIO 4  ───────│── DHT22         │                           │
│  GPIO 35 ───────│── Soil Moist 1  │                           │
│  GPIO 34 ───────│── Soil Moist 2  │                           │
│  GPIO 39 ───────│── LDR           │                           │
│  GPIO 2  ───────│─────────────────│── Relay 1 (Pump)         │
│  GPIO 15 ───────│─────────────────│── Relay 2 (Fan)          │
│  GPIO 13 ───────│─────────────────│── Relay 3 (Light)        │
│  GPIO 21 ───────│── OLED SDA      │                           │
│  GPIO 22 ───────│── OLED SCL      │                           │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Armor48/Greenhouse-dashboard.git
cd Greenhouse-dashboard/demogreenhouse-main
```

### 2. Firmware Setup (ESP32)

1. Open `firmware/greenhouse.ino` in Arduino IDE
2. Install required libraries:
   - `DHT sensor library` by Adafruit
   - `Adafruit SSD1306`
   - `Adafruit GFX`
   - `ArduinoIoTCloud`
   - `Arduino_ConnectionHandler`

3. Configure WiFi credentials in `secrets.h`:
```cpp
const char SECRET_SSID[] = "your_wifi_name";
const char SECRET_PASS[] = "your_wifi_password";
```

4. Upload firmware to ESP32

### 3. Dashboard Setup

```bash
# Install dependencies
cd server
npm install

# Start development server
npm run dev

# Or build for production
npm run build
```

### 4. Configure Arduino IoT Cloud

1. Visit [Arduino IoT Cloud](https://cloud.arduino.cc/)
2. Create a new "Thing"
3. Add variables:
   - `temperature` (float)
   - `humidity` (float)
   - `soilMoisture` (int)
   - `lightIntensity` (int)
   - `pumpStatus` (boolean)
   - `fanStatus` (boolean)

4. Download `thingProperties.h` and place in `firmware/`

## 📊 Dashboard Features

### Real-Time Monitoring Panel
```
┌─────────────────────────────────────────────────────────────┐
│  🌡️ Temperature    💧 Humidity    🌱 Soil Moist    ☀️ Light │
│     24.5°C           65%             45%           850 Lux │
│     ──────           ────            ────          ───────  │
│    [Chart]          [Chart]         [Chart]        [Chart] │
└─────────────────────────────────────────────────────────────┘
```

### Control Panel
| Device | Status | Action |
|--------|--------|--------|
| Water Pump | 🟢 ON | [Toggle] |
| Exhaust Fan | 🔴 OFF | [Toggle] |
| Grow Lights | 🟢 ON | [Toggle] |
| Auto Mode | 🟢 Enabled | [Toggle] |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MQTT_BROKER=mqtt.arduino.cc
MQTT_PORT=8883
MQTT_USER=your_user
MQTT_PASS=your_pass
DEVICE_ID=your_device_id
```

### Dashboard Settings

Edit `js/config.js`:

```javascript
const CONFIG = {
  refreshInterval: 5000,      // Update every 5 seconds
  chartHistory: 100,          // Keep 100 data points
  thresholds: {
    temperature: { min: 18, max: 30 },
    humidity: { min: 40, max: 80 },
    soilMoisture: { min: 30, max: 70 },
    light: { min: 200, max: 1000 }
  }
};
```

## 📱 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sensors` | Get all sensor readings |
| GET | `/api/sensors/temperature` | Get temperature only |
| POST | `/api/control/pump` | Toggle water pump |
| POST | `/api/control/fan` | Toggle exhaust fan |
| GET | `/api/history` | Get historical data |
| POST | `/api/alerts` | Configure alert thresholds |

## 🎨 Customization

### Change Theme Colors

Edit `css/style.css`:

```css
:root {
  --primary-color: #2ecc71;
  --secondary-color: #27ae60;
  --accent-color: #f39c12;
  --bg-dark: #1a1a2e;
  --bg-light: #16213e;
  --text-primary: #ffffff;
  --text-secondary: #b8b8b8;
}
```

### Add New Sensors

1. Update `firmware/greenhouse.ino`:
```cpp
#define NEW_SENSOR_PIN 36
int newSensorValue = analogRead(NEW_SENSOR_PIN);
```

2. Add to Arduino IoT Cloud dashboard

3. Update `js/main.js` to display new data

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| ESP32 not connecting | Check WiFi credentials, ensure 2.4GHz network |
| Sensor readings incorrect | Calibrate sensors, check wiring |
| Dashboard not updating | Check MQTT connection, verify API endpoints |
| Relay not switching | Verify GPIO pin, check relay module voltage |
| OLED not displaying | Check I2C address (0x3C or 0x3D) |

### Serial Debug Output

Enable debug mode in firmware:
```cpp
#define DEBUG true
```

View output in Arduino IDE Serial Monitor at 115200 baud.

## 📈 Data Visualization

The dashboard uses **Chart.js** for real-time data visualization:

- 📊 Line charts for temperature/humidity trends
- 🥧 Pie charts for daily averages
- 📉 Gauge charts for current values
- 🗓️ Historical data export (CSV/JSON)

## 🔒 Security Considerations

1. **Change default credentials** in `secrets.h`
2. **Enable HTTPS** for production deployment
3. **Use environment variables** for sensitive data
4. **Implement rate limiting** on API endpoints
5. **Add authentication** for dashboard access

## 🚀 Deployment

### Netlify (Frontend)

```bash
# Build the dashboard
npm run build

# Deploy to Netlify
netlify deploy --prod
```

### Heroku (Backend)

```bash
# Login to Heroku
heroku login

# Create app
heroku create greenhouse-dashboard

# Deploy
git push heroku main
```

### Docker

```bash
# Build image
docker build -t greenhouse-dashboard .

# Run container
docker run -p 3000:3000 greenhouse-dashboard
```

## 📸 Screenshots

| Dashboard View | Mobile View |
|----------------|-------------|
| ![Dashboard](assets/images/dashboard.png) | ![Mobile](assets/images/mobile.png) |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍ Author

**Armor48** - [GitHub](https://github.com/Armor48) | [Website](https://armortech5.netlify.app/)

## 🙏 Acknowledgments

- [Arduino IoT Cloud](https://cloud.arduino.cc/)
- [Chart.js](https://www.chartjs.org/)
- [ESP32 Community](https://github.com/espressif/arduino-esp32)
- [Netlify](https://www.netlify.com/)

## 📞 Support

For issues, questions, or suggestions:

- 📧 Email: contact@armortech.com
- 💬 GitHub Issues: [Create an issue](https://github.com/Armor48/Greenhouse-dashboard/issues)
- 🌐 Website: [https://armortech5.netlify.app/](https://armortech5.netlify.app/)

---

<div align="center">

**🌱 Growing Smarter, One Sensor at a Time 🌱**

Made with ❤️ by Armor48

[⬆ Back to Top](#greenhouse-dashboard---iot-monitoring-system)

</div>
```

This README file is comprehensive and includes:

1. **Project Overview** - Clear description of the greenhouse monitoring system
2. **Features** - Detailed list of monitoring and control capabilities
3. **Hardware Requirements** - Complete component list with specifications
4. **Wiring Diagram** - Visual representation of connections
5. **Installation Guide** - Step-by-step setup instructions
6. **Project Structure** - Complete file organization
7. **Configuration** - Environment variables and settings
8. **API Documentation** - Available endpoints
9. **Troubleshooting** - Common issues and solutions
10. **Deployment** - Multiple deployment options (Netlify, Heroku, Docker)
11. **Contributing Guidelines** - How others can help
12. **License & Author** - Proper attribution

You can customize the screenshots section by adding actual images from your project to the `assets/images/` folder and updating the paths accordingly.
