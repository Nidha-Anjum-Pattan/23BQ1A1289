function scheduleVehicles(vehicles, maxHours) {
    const n = vehicles.length;

    const dp = Array(n + 1)
        .fill()
        .map(() => Array(maxHours + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const duration = vehicles[i - 1].Duration;
        const impact = vehicles[i - 1].Impact;

        for (let h = 0; h <= maxHours; h++) {
            if (duration <= h) {
                dp[i][h] = Math.max(
                    dp[i - 1][h],
                    impact + dp[i - 1][h - duration]
                );
            } else {
                dp[i][h] = dp[i - 1][h];
            }
        }
    }

    let selected = [];
    let h = maxHours;

    for (let i = n; i > 0; i--) {
        if (dp[i][h] !== dp[i - 1][h]) {
            selected.push(vehicles[i - 1]);
            h -= vehicles[i - 1].Duration;
        }
    }

    return {
        maxImpact: dp[n][maxHours],
        selectedVehicles: selected.reverse()
    };
}

module.exports = scheduleVehicles;