import {model, Schema} from "mongoose";

const historyModelSchema = new Schema({
    date: {type: String, required: true},
    base: {type: String, required: true},
    rates: {type: Object, required: true},
})

const HistoryModel = model("Histories", historyModelSchema)

export default HistoryModel