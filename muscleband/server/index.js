require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// === Import Routes ===
const authRoutes = require('./routes/authRoutes');
const emgRoutes = require('./routes/emgRoutes'); // Optional if you're using it

const app = express();
const PORT = process.env.PORT || 5002;

// === Middleware ===
app.use(cors({
  origin: ['http://localhost:3000'], // ✅ allow React frontend
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === MongoDB Connection ===
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/emg', emgRoutes); // Optional if you have EMG data

// === Health Check ===
app.get('/', (req, res) => {
  res.send('💡 MuscleBand API is up!');
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.stack);
  res.status(500).json({
    message: 'Server error occurred.',
    error: err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend listening on http://0.0.0.0:${PORT}`);
});
