#include <ArduinoBLE.h>

// === BLE Service & Characteristics ===
BLEService myoService("1c745c9a-166a-4b6c-8055-5529dc6a36a1");

BLECharacteristic emgDataChar("2A37",  // EMG Data (Notify)
                              BLERead | BLENotify,
                              2);       // 2 bytes for 10-bit ADC

BLECharacteristic controlChar("2A38",  // Control characteristic
                              BLEWrite,
                              20);      // Accepts up to 20 bytes

// === State Control ===
bool isRecording = false;
unsigned long lastSample = 0;
const unsigned long sampleInterval = 5;  // ms

// === EMG Input Pin ===
#define SIG_PIN A3

// === Flags ===
bool wasConnected = false;

void setup() {
  Serial.begin(115200);

  Serial.println("🔋 Booting MyoWare BLE Peripheral...");

  if (!BLE.begin()) {
    Serial.println("❌ BLE initialization failed!");
    while (1);
  }

  startBLEAdvertising();
}

void loop() {
  BLEDevice central = BLE.central();

  if (central && !wasConnected) {
    Serial.print("🔗 Connected to Central: ");
    Serial.println(central.address());
    wasConnected = true;
  }

  if (central && central.connected()) {
    unsigned long now = millis();

    if (isRecording && now - lastSample >= sampleInterval) {
      lastSample = now;

      int emgValue = analogRead(SIG_PIN);  // Read EMG signal

      // Convert EMG value to 2-byte packet
      byte packet[2];
      packet[0] = (emgValue >> 8) & 0xFF;
      packet[1] = emgValue & 0xFF;

      emgDataChar.writeValue(packet, 2);

      static int printCount = 0;
      if (++printCount >= 20) {
        Serial.print("📈 EMG: ");
        Serial.println(emgValue);
        printCount = 0;
      }
    }
  } else if (wasConnected) {
    // Central disconnected
    Serial.println("🔌 Disconnected from Central");
    isRecording = false;
    wasConnected = false;

    // Restart BLE advertising automatically
    BLE.stopAdvertise();
    delay(200);
    startBLEAdvertising();
  }
}

// === BLE Setup Helper ===
void startBLEAdvertising() {
  BLE.setLocalName("MyoWare Shield");
  BLE.setAdvertisedService(myoService);

  myoService.addCharacteristic(emgDataChar);
  myoService.addCharacteristic(controlChar);
  BLE.addService(myoService);

  emgDataChar.setValue((byte[]){0x00, 0x00}, 2); // Initial value
  controlChar.setEventHandler(BLEWritten, onControlCommand);

  BLE.advertise();
  Serial.println("✅ BLE Advertising Started (Always)");
}

// === BLE Write Handler ===
void onControlCommand(BLEDevice central, BLECharacteristic characteristic) {
  String command = "";

  const uint8_t* raw = characteristic.value();
  int len = characteristic.valueLength();

  for (int i = 0; i < len; i++) {
    command += (char)raw[i];
  }
  command.trim();

  Serial.print("🛰️ Command: ");
  Serial.println(command);

  if (command == "start") {
    isRecording = true;
    Serial.println("🟢 Recording started");
  } else if (command == "stop") {
    isRecording = false;
    Serial.println("🔴 Recording stopped");
  } else {
    Serial.println("❓ Unknown command");
  }
}
