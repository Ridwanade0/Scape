import RatesModel from "../models/ratesModel.js";

// Function to perform currency conversion based on query parameters
const performCurrencyConversion = async (req, res) => {
    try {
        // Extract query parameters for 'from' currency, 'to' currency, and 'amount' to be converted
        const { from, to, amount } = req.query;

        // Find the exchange rates for the 'from' currency in the database
        const fromRates = await RatesModel.findOne({ base: from.toUpperCase() });

        // Extract the exchange rate value for the 'to' currency from the rates object
        const toValue = fromRates.rates[to.toUpperCase()];

        // Calculate the converted amount by multiplying the 'to' currency rate with the amount
        const total = toValue * amount;

        // Respond with the original 'from' currency, 'to' currency, amount, and the converted value
        res.status(200).json({
            from: from,
            to: to,
            amount: amount,
            value: total
        });
    } catch (error) {
        // Handle any errors that occur during the process and respond with a 500 status code and an error message
        res.status(500).json({
            message: `An error occurred on our server: ${error.message}`
        });
    }
};

export default performCurrencyConversion;