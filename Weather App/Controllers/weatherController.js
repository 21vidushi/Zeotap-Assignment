const { fetchWeatherData, calculateDailySummary } = require('../Services/summaryService');

// Fetch daily summaries (API handler)
exports.getDailySummaries = async (req, res) => {
    try {
        const summaries = await calculateDailySummary();
        res.json(summaries);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// // Manually trigger summary calculation (API handler)
exports.triggerSummary = async (req, res) => {
    try {
     const result= await calculateDailySummary();
       return res.json({
            message: "Summary calculation triggered",
            result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
