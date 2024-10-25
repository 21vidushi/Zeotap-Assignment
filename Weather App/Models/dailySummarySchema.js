const mongoose = require("mongoose");

const dailySummarySchema = new mongoose.Schema({
  date: Date,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DailySummary", dailySummarySchema);
