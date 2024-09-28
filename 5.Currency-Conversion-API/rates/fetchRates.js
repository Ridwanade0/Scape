import "dotenv/config";
import connectMongoDB from "../lib/connectMongoDB.js";
import RatesModel from "../models/ratesModel.js";
import CurrenciesCode from "../models/currenciesCode.js";

const convertBaseCurrency = async (rates, targetBase) => {
    const targetBaseRate = rates[targetBase];
    let targetRates = {};
    for (const currency in rates) {
        targetRates[currency] = (1 / targetBaseRate) * rates[currency];
    }
    return targetRates;
};

const fetchAndStoreRates = async () => {
    try {
        const rawLatestRates = await fetch(
            `${process.env.OER_BASE_ROUTE}/latest.json?app_id=${process.env.OER_API_KEY}`
        );
        const rawCurrencies = await fetch(
            `${process.env.OER_BASE_ROUTE}/currencies.json`
        );
        const latestRates = await rawLatestRates.json();
        const currencies = await rawCurrencies.json();
        await connectMongoDB();
        const creationDate = new Date().toISOString().split('T')[0];
        await CurrenciesCode.findOneAndUpdate({_id: "curenciesCode"}, {
                $set: {
                    currencies
                }
            },
            {
                upsert: true
            }
        )
        for (const base in currencies) {
            const convertedRates = await convertBaseCurrency(latestRates.rates, base);
            await RatesModel.findOneAndUpdate(
                {base},
                {
                    $set: {
                        base,
                        date: creationDate,
                        rates: convertedRates,
                    },
                },
                {
                    upsert: true,
                }
            );
        }
        console.log("Rates saved succefully")
    } catch (error) {
        console.error(
            `An error occured while fetching the and saving the data :${error.message}`
        );
    } finally {
        process.exit(0);
    }
};

fetchAndStoreRates();
