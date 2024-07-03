const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/map_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema and model for locations
const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  }
});

const Location = mongoose.model('Location', locationSchema);

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to get locations
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find({}, '-_id name coordinates');
    res.json(locations);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
