import RatesModel from "../models/ratesModel.js";
import HistoryModel from "../models/historyModel.js";
import connectMongoDB from "../lib/connectMongoDB.js";

const saveHistory = async () => {
    try {
        await connectMongoDB();
        const rates = await RatesModel.find({});
        for (const rate of rates) {
            const historyRate = new HistoryModel({
                date: rate.date,
                base: rate.base,
                rates: rate.rates,
            })
            await historyRate.save();
        }
        console.log("History saved")
    } catch (error) {
        console.log(error.message)
    } finally {
        process.exit(0)
    }
}

saveHistory()