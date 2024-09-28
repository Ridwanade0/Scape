import HistoryModel from "../models/historyModel.js"; // Import the HistoryModel for database operations

// Function to retrieve historical exchange rates for a specified date and base currency
const getHistory = async (req, res) => {
    try {
        // Extract the date parameter from the request URL
        const requestDate = req.params.date;

        // Extract the base currency from the query parameters
        const { base } = req.query;

        // Check if the base currency is not specified or is 'USD' (case insensitive)
        if (!base || base.toUpperCase() === "USD") {
            // Query the database for the exchange rate of USD on the specified date
            const usdRate = await HistoryModel.findOne({ base: "USD", date: requestDate });

            // Respond with the date, base currency (USD), and exchange rates for USD
            res.status(200).json({
                date: usdRate.date,
                base: usdRate.base,
                rates: usdRate.rates
            });
            return; // Exit the function after responding
        }

        // Query the database for the exchange rate of the specified base currency on the specified date
        const specifiedBaseRate = await HistoryModel.findOne({ base: base.toUpperCase(), date: requestDate });

        // Respond with the date, base currency, and exchange rates for the specified base currency
        res.status(200).json({
            date: specifiedBaseRate.date,
            base: specifiedBaseRate.base,
            rates: specifiedBaseRate.rates
        });

    } catch (error) {
        // Handle any errors that occur during the process and respond with a 500 status code and an error message
        res.status(500).json({
            message: `An error occurred: ${error.message}`
        });
    }
};

export default getHistory; // Export the getHistory function as the default export