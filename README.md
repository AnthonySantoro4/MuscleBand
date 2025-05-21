# 💪 MuscleBand

MuscleBand is a web-connected EMG monitoring system that records and compares muscle activation between the left and right biceps using the MyoWare 2.0 Wireless Shield/Sensor and the MyoWare ESP32 lot Redboard. It determines imbalance severity and stores user trials to MongoDB Atlas.

## 🚀 Features
- BLE-connected MyoWare wireless shield and ESP32
- RMS filtering & peak analysis across 3 reps
- Web interface for live trial feedback
- MongoDB Atlas for trial/user storage
- Severity grading and imbalance detection

## 🛠️ Technologies
- Arduino (ESP32, MyoWare)
- React, JavaScript
- Express + MongoDB Atlas

## 📸 Screenshots
![Start Screenshot](images/MuscleBand_Start_Screen.png)
![Start Screenshot](images/MuscleBand_Home_Screen.png)
![Example Trial Screenshot](images/MuscleBand_ExampleTrial.png)
![Example Previous Trackings Screenshot](images/MuscleBand_Example_PreviousTrackings_Screen)
![About Screenshot](images/MuscleBand_About_Screen.png)
![Account Information Screenshot](images/MuscleBand_AccountInformation_Screen.png)

## 📦 Getting Started
1. Clone repo
2. Run `npm install` in `/` and `/server`
3. Set up `.env` with your variables
4. Run `npm start` (frontend) and `node server/index.js` (backend)

## 📚 License
MIT

##  Start
Run "npm install" to install node modules.

Run "npm run dev" to initiate server and then run web app.
