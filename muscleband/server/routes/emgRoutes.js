const express = require('express');
const router = express.Router();
const EMGData = require('../models/EMGData');

// === POST: Store EMG Data ===
router.post('/store', async (req, res) => {
  try {
    const { userId, left_bicep, right_bicep, percentage_difference, severity_grade } = req.body;

    if (!userId || typeof left_bicep !== 'number' || typeof right_bicep !== 'number') {
      return res.status(400).json({
        message: "Missing or invalid required fields",
        required: ["userId", "left_bicep", "right_bicep"],
      });
    }

    const newEntry = new EMGData({
      userId,
      left_bicep,
      right_bicep,
      percentage_difference,
      severity_grade,
    });

    const savedEntry = await newEntry.save();
    console.log(`✅ EMG data saved for user: ${userId}`);
    res.status(201).json({
      message: "EMG data stored successfully",
      data: savedEntry,
    });
  } catch (err) {
    console.error("❌ Error saving EMG data:", err.message);
    res.status(500).json({ error: "Server error saving EMG data" });
  }
});

// === GET: Retrieve Last 10 EMG Records for User ===
router.get('/fetch/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required in params" });
    }

    const records = await EMGData.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(records);
  } catch (err) {
    console.error("❌ Error retrieving EMG data:", err.message);
    res.status(500).json({ error: "Failed to fetch EMG data" });
  }
});

module.exports = router;