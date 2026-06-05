const { fetchDepots, fetchVehicles } = require("./fetchData");
const scheduleVehicles = require("./scheduler");
const Log = require("../logging-middleware/logger");

async function run() {
    try {

        await Log(
            "backend",
            "info",
            "service",
            "Starting vehicle scheduling process"
        );

        const depotsData = await fetchDepots();

        await Log(
            "backend",
            "info",
            "service",
            "Depot data fetched successfully"
        );

        const vehiclesData = await fetchVehicles();

        await Log(
            "backend",
            "info",
            "service",
            "Vehicle data fetched successfully"
        );

        const depot = depotsData.depots[1];

        const result = scheduleVehicles(
            vehiclesData.vehicles,
            depot.MechanicHours
        );

        await Log(
            "backend",
            "info",
            "service",
            `Scheduling completed. Maximum impact: ${result.maxImpact}`
        );

        console.log("Depot:");
        console.log(depot);

        console.log("\nMaximum Impact:");
        console.log(result.maxImpact);

        console.log("\nSelected Vehicles:");
        console.table(result.selectedVehicles);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "service",
            error.message
        );

        console.error(error);
    }
}

run();