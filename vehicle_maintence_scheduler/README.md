# Vehicle Maintenance Scheduler

## Problem
Select vehicles for maintenance such that:

- Total Duration does not exceed available Mechanic Hours
- Total Impact is maximized

## Approach

Used Dynamic Programming (0/1 Knapsack).

State:
dp[i][j]

i = vehicles considered

j = mechanic hours available

Transition:

dp[i][j] =
max(
    dp[i-1][j],
    impact + dp[i-1][j-duration]
)

## Complexity

Time Complexity: O(N × H)

Space Complexity: O(N × H)

Where:
N = Number of Vehicles
H = Mechanic Hours