import express from "express";
import getLatestRates from "../services/getLatestRates.js";
import getCurrenciesCode from  "../services/getCurrenciesCode.js";
import performCurrencyConversion from "../services/performCurrencyConversion.js";
import getHistory from "../services/getHistory.js";

const router = express.Router(); // Initialized express router instance

router.get("/latest.json", getLatestRates); // function gets and returns the latest rates available
router.get("/currencies.json", getCurrenciesCode) // function get the list of currency codes, includes the currency codes, and names
router.get("/convert", performCurrencyConversion) 
router.get("/history/:date.json",  getHistory)

// defined route paths for each services

export default router; // exported router for use.