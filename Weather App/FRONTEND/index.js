document.addEventListener("DOMContentLoaded", function () {
    const dailySummariesDiv = document.getElementById('dailySummaries');
    const alertsDiv = document.getElementById('alerts');
    const latestSummaryDiv = document.getElementById('latestSummary');
    const triggerSummaryBtn = document.getElementById('triggerSummaryBtn');

    // Function to fetch daily summaries
    const fetchDailySummaries = async () => {
        try {
            const response = await fetch('http://localhost:5000/wheather/daily-summaries');
            const summaries = await response.json();
            displayLatestSummary(summaries.summary);
        } catch (error) {
            console.error("Error fetching daily summaries:", error);
        }
    };

    // Function to display daily summaries
    // const displayDailySummaries = (summaries) => {
    //     dailySummariesDiv.innerHTML = ""; // Clear previous data

    //     if (summaries.length === 0) {
    //         dailySummariesDiv.innerHTML = '<p>No summaries available</p>';
    //     } else {
    //         summaries.forEach(summary => {
    //             const summaryDiv = document.createElement('div');
    //             summaryDiv.className = 'summary';
    //             summaryDiv.innerHTML = `
    //                 <h3>Date: ${new Date(summary.date).toLocaleDateString()}</h3>
    //                 <p>Average Temperature: ${summary.avgTemp.toFixed(2)} °C</p>
    //                 <p>Max Temperature: ${summary.maxTemp.toFixed(2)} °C</p>
    //                 <p>Min Temperature: ${summary.minTemp.toFixed(2)} °C</p>
    //                 <p>Dominant Weather Condition: ${summary.dominantCondition}</p>
    //             `;
    //             dailySummariesDiv.appendChild(summaryDiv);
    //         });
    //     }
    // };

    // Function to fetch alerts (you can modify this as per how alerts are stored/processed in your backend)
    const fetchAlerts = async () => {
        try {
            const response = await fetch('http://localhost:3000/alerts'); // Add alerts route in the backend
            const alerts = await response.json();
            displayAlerts(alerts);
        } catch (error) {
            console.error("Error fetching alerts:", error);
        }
    };

    // Function to display alerts
    const displayAlerts = (alerts) => {
        alertsDiv.innerHTML = ""; // Clear previous alerts

        if (alerts.length === 0) {
            alertsDiv.innerHTML = '<p>No alerts triggered</p>';
        } else {
            alerts.forEach(alert => {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert';
                alertDiv.innerHTML = `<p>${alert.message}</p>`;
                alertsDiv.appendChild(alertDiv);
            });
        }
    };

    // Trigger daily summary calculation
    triggerSummaryBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/wheather/trigger-summary', {
                method: 'POST'
            });
            const result = await response.json();
            alert(result.message);
           
            // Display the latest summary on success
            if (result.result.success) {
                console.log(result.result.summary)
                displayLatestSummary(result.result.summary);
            }

            fetchDailySummaries(); // Refresh the daily summaries after trigger
        } catch (error) {
            console.error("Error triggering daily summary:", error);
        }
    });

    // Function to display the latest summary
    const displayLatestSummary = (summary) => {
        latestSummaryDiv.innerHTML = `
            <h3>Date: ${new Date(summary.date).toLocaleDateString()}</h3>
            <p>Average Temperature: ${summary.avgTemp.toFixed(2)} °C</p>
            <p>Max Temperature: ${summary.maxTemp.toFixed(2)} °C</p>
            <p>Min Temperature: ${summary.minTemp.toFixed(2)} °C</p>
            <p>Dominant Weather Condition: ${summary.dominantCondition}</p>
        `;
    };

    // Initial fetches when the page loads
    fetchDailySummaries();
    // displayDailySummaries()
    displayLatestSummary()
    // fetchAlerts();
});
