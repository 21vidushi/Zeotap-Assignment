const Weather = require('../Models/wheatherSchema');
const DailySummary = require('../Models/dailySummarySchema');

const calculateDailySummary = async (req,res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  console.log(startOfDay)
    // Fetch weather data for the current day
    const weatherData = await Weather.find({ dt: { $gte: startOfDay } });
    // Ensure there is weather data to calculate the summary
    if (weatherData.length === 0) {
        return { success: false, message: 'No weather data available for today.' };
    }

    // Check if all temp values are numbers and filter out any invalid entries
    const validWeatherData = weatherData.filter(data => !isNaN(data.temp));

    if (validWeatherData.length === 0) {
        return { success: false, message: 'No valid temperature data available for today.' };
    }

    // Calculate the temperature stats
    const totalTemp = validWeatherData.reduce((acc, curr) => acc + curr.temp, 0);
    const maxTemp = Math.max(...validWeatherData.map(data => data.temp));
    const minTemp = Math.min(...validWeatherData.map(data => data.temp));

    // Calculate the dominant weather condition
    const conditionCounts = {};
    validWeatherData.forEach(data => {
        conditionCounts[data.main] = (conditionCounts[data.main] || 0) + 1;
    });

    const dominantCondition = Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

    // Create the daily summary
    const dailySummary = new DailySummary({
        date: startOfDay,
        avgTemp: totalTemp / validWeatherData.length,
        maxTemp: maxTemp,
        minTemp: minTemp,
        dominantCondition: dominantCondition
    });

    try {
        await dailySummary.save();
        return { success: true, message: 'Daily summary saved successfully.', summary: dailySummary };
    } catch (error) {
        return { success: false, message: 'Error saving daily summary.', error: error.message };
    }
};

module.exports = { calculateDailySummary };
