import RatesModel from "../models/ratesModel.js"; // imported rates data model

const getLatestRate = async (req, res) => {
//    getLatestRate function fetch the latest rates from the db and respond back with the json of the requested rates
    try {
        const {base} = req.query; // base contains currencycode for the currency base if required
        if (!base || (base === "USD" || "usd")) {
//            if base is not provided or the base provided is USD this coditon if executed, becuase the default latestRate to be returned is USD
            const USDRates = await RatesModel.findOne({"base": "USD"});
            return res.status(200).json({
                date: USDRates.date,
                base: USDRates.base,
                rates: USDRates.rates,
            });
//            returns with a status code of 200 and the formated json response for the latest rates, also terminates the code
        }
//      if the upper coditon is not meant the code continues and excute this.
        const specifiedBase = await RatesModel.findOne({"base": base.toUpperCase()}) // fetches latest rates in the base provided.


        return res.status(200).json({
            date: specifiedBase.date,
            base: specifiedBase.base,
            rates: specifiedBase.rates,
        });
    } catch (error) {
        res.status(500).json({
            message: `An error occured while fetching the the rates: ${error.message}`
        });
//        returns server error if any error occurence
    }
}
export default getLatestRate;