const Log = require("./logger");

async function testLogger() {
    try {
        const result = await Log(
            "backend",
            "info",
            "service",
            "Logger test successful"
        );

        console.log(result);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

testLogger();