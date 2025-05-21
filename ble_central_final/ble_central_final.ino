#include <ArduinoBLE.h>
#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <vector>
#include "data_processing.h"

// ==== WiFi Credentials ====
const char* ssid = "CDC wizzler";
const char* password = "Glenhead2020";

// ==== MongoDB API Endpoint ====
const char* serverUrl = "http://192.168.4.38:5002/api/emg/store";

// ==== BLE Target UUID ====
const char* targetServiceUUID = "1c745c9a-166a-4b6c-8055-5529dc6a36a1";

// ==== BLE ====
BLEDevice myoWareDevice;
BLECharacteristic myoWareDataChar;
BLECharacteristic controlChar;

// ==== Web Server ====
WebServer server(80);

// ==== Data Buffers ====
std::vector<double> leftBicepData;
std::vector<double> rightBicepData;

// ==== Timing and Flags ====
const unsigned long samplingInterval = 5;
unsigned long previousMillis = 0;
bool isRecording = false;
String currentRecordingSide = "";
bool wasPreviouslyConnected = false;
bool leftRecorded = false;
bool rightRecorded = false;
String storedUserId = "";

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Serial.println("🔌 Booting Central Device...");

  WiFi.begin(ssid, password);
  Serial.print("📶 Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("✅ WiFi Connected. IP: ");
  Serial.println(WiFi.localIP());

  if (!BLE.begin()) {
    Serial.println("❌ BLE init failed!");
    while (1);
  }

  Serial.println("🔍 Scanning for BLE devices...");
  BLE.scan();

  bool deviceConnected = false;
  unsigned long scanStart = millis();

  while (millis() - scanStart < 15000) {
    BLEDevice found = BLE.available();

    if (found && found.localName() == "MyoWare Shield") {
      Serial.print("📡 Found MyoWare Shield at ");
      Serial.println(found.address());

      if (found.connect()) {
        Serial.println("✅ Connected! Discovering services...");

        if (found.discoverAttributes()) {
          for (int i = 0; i < found.serviceCount(); i++) {
            BLEService svc = found.service(i);
            if (strcasecmp(svc.uuid(), targetServiceUUID) == 0) {
              Serial.println("🎯 Matched MyoWare service!");
              myoWareDevice = found;
              myoWareDataChar = found.characteristic("2A37");
              controlChar = found.characteristic("2A38");
              wasPreviouslyConnected = true;
              deviceConnected = true;
              break;
            }
          }
        }
      }

      if (deviceConnected) break;
    }
  }

  if (!deviceConnected) {
    Serial.println("❌ Could not find/connect to MyoWare Shield.");
    return;
  }

  Serial.println("✅ BLE Device ready.");

  // ==== Web Routes ====
  server.on("/", HTTP_GET, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", "Central ESP32 is running.");
  });

  server.on("/start", HTTP_GET, []() {
    String side = server.arg("side");
    String userId = server.arg("userId");
    currentRecordingSide = side;
    storedUserId = userId;

    Serial.printf("🟢 /start for %s (User: %s)\n", side.c_str(), storedUserId.c_str());

    isRecording = true;
    previousMillis = millis();

    if (side == "left") {
      leftBicepData.clear();
      leftRecorded = false;
    } else if (side == "right") {
      rightBicepData.clear();
      rightRecorded = false;
    }

    if (controlChar && controlChar.canWrite()) {
      controlChar.writeValue("start");
    }

    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", "Recording started for " + side);
  });

  server.on("/stop", HTTP_GET, []() {
    Serial.printf("🔴 /stop triggered for side: %s\n", currentRecordingSide.c_str());

    if (controlChar && controlChar.canWrite()) {
      controlChar.writeValue("stop");
    }

    isRecording = false;

    processEMGData(leftBicepData, rightBicepData);

    if (currentRecordingSide == "left") leftRecorded = true;
    if (currentRecordingSide == "right") rightRecorded = true;

    bool sendNow = (leftRecorded && rightRecorded && storedUserId != "");

    String jsonResponse = "{";
    jsonResponse += "\"left_bicep\":" + String(getLeftStrength(), 2) + ",";
    jsonResponse += "\"right_bicep\":" + String(getRightStrength(), 2) + ",";
    jsonResponse += "\"percentage_difference\":" + String(getPercentageDifference(), 2) + ",";
    jsonResponse += String("\"severity_grade\":\"") + getSeverityGrade().c_str() + "\"";
    jsonResponse += "}";

    server.sendHeader("Access-Control-Allow-Origin", "*");

    if (sendNow) {
      sendDataToMongoDB();
      server.send(200, "application/json", jsonResponse);
      leftRecorded = false;
      rightRecorded = false;
      storedUserId = "";
    } else {
      server.send(200, "application/json", jsonResponse);
    }

    currentRecordingSide = "";
  });

  // ==== CORS Handling ====
  server.onNotFound([]() {
    if (server.method() == HTTP_OPTIONS) {
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
      server.send(204); // No content
    } else {
      server.send(404, "text/plain", "Not found");
    }
  });

  server.begin();
  Serial.println("🌐 Web Server running");
}

void loop() {
  server.handleClient();

  if (!myoWareDevice.connected() && wasPreviouslyConnected) {
    Serial.println("⚠️ BLE disconnected! Restarting ESP...");
    delay(1000);
    ESP.restart();
  }

  if (isRecording && myoWareDataChar.canRead()) {
    unsigned long now = millis();
    if (now - previousMillis >= samplingInterval) {
      previousMillis = now;

      byte buf[2];
      myoWareDataChar.readValue(buf, 2);
      double emgValue = (buf[0] << 8) | buf[1];

      if (currentRecordingSide == "left") {
        leftBicepData.push_back(emgValue);
      } else if (currentRecordingSide == "right") {
        rightBicepData.push_back(emgValue);
      }

      static int count = 0;
      if (++count >= 20) {
        Serial.printf("📈 EMG (%s): %.2f\n", currentRecordingSide.c_str(), emgValue);
        count = 0;
      }
    }
  }
}

void sendDataToMongoDB() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("🚫 WiFi not connected. Skipping upload.");
    return;
  }

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"userId\":\"" + storedUserId + "\",";
  payload += "\"left_bicep\":" + String(getLeftStrength(), 2) + ",";
  payload += "\"right_bicep\":" + String(getRightStrength(), 2) + ",";
  payload += "\"percentage_difference\":" + String(getPercentageDifference(), 2) + ",";
  payload += "\"severity_grade\":\"" + String(getSeverityGrade().c_str()) + "\"";
  payload += "}";

  Serial.println("📤 Sending payload to MongoDB:");
  Serial.println(payload);

  int code = http.POST(payload);
  Serial.printf("📡 HTTP Response: %d\n", code);

  String response = http.getString();
  Serial.println("📬 Server says:");
  Serial.println(response);

  http.end();
}
