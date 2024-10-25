const express = require("express");
const app = express();
const wheatherRoutes = require("./Routes/wheatherRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron");
const dotenv = require("dotenv");
const { connect } = require("./DB/dbconfig");
const { fetchWeatherData } = require("./Services/weatherService");
const { calculateDailySummary } = require("./Services/summaryService");
dotenv.config();
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
connect();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/wheather", wheatherRoutes);
cron.schedule("*/1 * * * *", fetchWeatherData);
cron.schedule("59 23 * * *", calculateDailySummary);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
