import CurrenciesCodeModel from "../models/currenciesCodeModel.js"; // importe the currency code data model

const getCurrenciesCode = async (req, res) => {
    try {
        const currenciesCodes = await CurrenciesCodeModel.findById("curenciesCode")
//            finds the currencies code in the db collection by its id currencies code
        res.status(200).json(currenciesCodes.currencies) // returns only the currency code, by filtering the returning object
    } catch (error) {
        res.status(500).json({
            message: `An error occured on my side ${error.message}`
        })
    }
};
export default getCurrenciesCode;