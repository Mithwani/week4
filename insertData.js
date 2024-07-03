const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/map_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  }
});

const Location = mongoose.model('Location', locationSchema);

const sampleData = [
  { name: 'Nairobi', coordinates: { lat: -1.286389,  lon: 36.817223 } },
  { name: 'Mombasa', coordinates: { lat: -4.04, lon: 39.65} },
  { name: 'Nakuru', coordinates: { lat: -0.3, lon: 36.08 } },
  { name: 'Kisumu', coordinates: { lat: -0.09, lon: 34.76 } }
];

Location.insertMany(sampleData)
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });
