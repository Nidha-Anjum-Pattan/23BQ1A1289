const axios = require("axios");
require("dotenv").config();

const Log = require("../logging-middleware/logger");

const BASE_URL = "http://4.224.186.213/evaluation-service";

async function fetchDepots() {
    try {
        const response = await axios.get(
            `${BASE_URL}/depots`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`
                }
            }
        );

        await Log(
            "backend",
            "info",
            "service",
            "Fetched depots successfully"
        );

        return response.data;
    } catch (error) {
        await Log(
            "backend",
            "error",
            "service",
            "Failed to fetch depots"
        );

        throw error;
    }
}

async function fetchVehicles() {
    try {
        const response = await axios.get(
            `${BASE_URL}/vehicles`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`
                }
            }
        );

        await Log(
            "backend",
            "info",
            "service",
            "Fetched vehicles successfully"
        );

        return response.data;
    } catch (error) {
        await Log(
            "backend",
            "error",
            "service",
            "Failed to fetch vehicles"
        );

        throw error;
    }
}

module.exports = {
    fetchDepots,
    fetchVehicles
};