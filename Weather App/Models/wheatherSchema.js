const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  main: String,
  temp: Number,
  feels_like: Number,
  dt: Date,
  city: String,
});

module.exports = mongoose.model("Weather", weatherSchema);
