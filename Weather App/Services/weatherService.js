const axios = require("axios");
const Weather = require("../Models/wheatherSchema");
const { sendAlertEmail } = require("../Utils/emailService");
const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];
const alertThresholds = {
  temp: 35, // Alert if temperature exceeds 35°C
  condition: "Rain", // Alert if the weather condition is 'Rain'
};
const fetchWeatherData = async (req, res) => {
  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OpenWeatherApiKey}&units=metric`
      );
      const output = response.data;
      const weatherData = new Weather({
        main: output.weather[0].main,
        temp: output.main.temp,
        feels_like: output.main.feels_like,
        dt: new Date(output.dt * 1000),
        city: city,
      });

      await weatherData.save();

      if (output.main.temp > alertThresholds.temp) {
        sendAlertEmail(city, output.main.temp);
      }

      if (response.data.weather[0].main === alertThresholds.condition) {
        // You can also send an email alert for weather conditions if needed
        console.log(
          `Alert: Weather condition in ${city} is ${alertThresholds.condition}!`
        );
        
      }
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  }
};

module.exports = { fetchWeatherData };
