// Q9: Fitness App Analytics

class FitnessAnalytics {
  constructor(workoutData) {
    // Throw an error if the dataset is empty (or not an array)
    if (!Array.isArray(workoutData) || workoutData.length === 0) {
      throw new Error("Dataset is empty. Cannot perform analytics.");
    }
    this.workoutData = workoutData;
  }

  // filter(): users with more than 7000 steps
  getActiveUsers() {
    return this.workoutData.filter((entry) => entry.steps > 7000);
  }

  // reduce(): sum of calories divided by number of users
  getAverageCalories() {
    const totalCalories = this.workoutData.reduce((sum, entry) => sum + entry.calories, 0);
    return totalCalories / this.workoutData.length;
  }

  // map(): format every record as a readable message
  getUserSummary() {
    return this.workoutData.map(
      (entry) => `User ${entry.user} walked ${entry.steps} steps and burned ${entry.calories} calories.`
    );
  }
}

const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 },
];

const analytics = new FitnessAnalytics(workoutData);

console.log("Active users (steps > 7000):", analytics.getActiveUsers().map((entry) => entry.user));
console.log("Average calories:", analytics.getAverageCalories().toFixed(2));
console.log("User summary:");
analytics.getUserSummary().forEach((message) => console.log("  " + message));

// Empty dataset -> error
try {
  new FitnessAnalytics([]);
} catch (error) {
  console.log(`\nError: ${error.message}`);
}