import { connect } from "mongoose";
// directly imported connect method from mongoose
// connect mongodb function as a asynchrounous function
const connectMongoDB = async () => {
  try {
    await connect("mongodb://localhost:27017/currency-api");
//    awaited conection, and logged a success message to the console
    console.log("Connection to the MongoDB database succesfull")
  } catch (error) {
    console.error("Error trying to conect to MongoDB", error.message);
//    catched and logged any error
  }
};

export default connectMongoDB; // exported connect mongodb functions
