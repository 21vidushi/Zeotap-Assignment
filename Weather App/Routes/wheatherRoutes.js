const express = require('express');
const router = express.Router();
const { getDailySummaries, triggerSummary } = require('../Controllers/weatherController');

// Route to fetch daily summaries
router.get('/daily-summaries', getDailySummaries);

// Route to trigger manual summary calculation
router.post('/trigger-summary', triggerSummary);

module.exports = router;
