import { model, Schema } from "mongoose";

const ratesSchema = new Schema({
  _id: {
    required: true,
    type: String,
  },
  base: {
    required: true,
    type: String,
  },
  date: { type: String, required: true },
  rates: {
    type: Object,
    required: true,
  },
});

const RatesModel = model("rates", ratesSchema);
export default RatesModel;
