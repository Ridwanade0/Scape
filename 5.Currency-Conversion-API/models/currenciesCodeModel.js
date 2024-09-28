import {Schema, model} from "mongoose";

const currenciesCodeSchema = new Schema({
    _id: {type: String},
    currencies: {
        type: Object,
        required: true,
    }
})

const CurrenciesCodeModel = model("currencies-code", currenciesCodeSchema);

export default CurrenciesCodeModel;