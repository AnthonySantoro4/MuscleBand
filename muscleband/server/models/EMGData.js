// models/EMGData.js
const mongoose = require('mongoose');

const EMGDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  left_bicep: Number,
  right_bicep: Number,
  percentage_difference: Number,
  severity_grade: String,
  timestamp: { type: Date, default: Date.now }
});

// 💡 Force collection name:
module.exports = mongoose.model('EMGData', EMGDataSchema, 'User Trials');