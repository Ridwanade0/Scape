import express from "express";
import "dotenv/config"
import connectMongoDB from "./lib/connectMongoDB.js";
import currencyRatesRoutes from "./routes/currencyRoutes.js";

const app = express(); // An express app instance initalization
const PORT = process.env.PORT; // PORT string been fecthed from the enviroment

// sartServer function acts as a central function for the application it outputs all the logics
const startServer = async () => {
//    Uses try and catch block to catch server/internal error.
    try {
        await connectMongoDB();
//        connect Mongodb helper function facilitates connection to mongodb
        app.set('json spaces', 2);
//        json spaces = 2, add pretty format to all the json response
        app.use("/api/v1", currencyRatesRoutes)
//        used api versioning, as other version might me needed to be implemented later on,
        app.get("/", (req, res) => {
            res.send("Welcome to Currency Conversion API.")
        })
        app.listen(PORT, () => {
            console.log(`Server started and available at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Error starting the server:", error.message)
    }
}

startServer();
