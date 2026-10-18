// Q5. Weather Activity Planner
// Suggests an activity based on temperature, rain and wind speed.

const temperature = 12;   // in °C
const isRaining = false;
const windSpeed = 25;     // in km/h

// Basic input validation using || (invalid if not a number or negative wind)
if (typeof temperature !== "number" || typeof windSpeed !== "number" || windSpeed < 0) {
  console.log("Invalid weather data.");
} else if (isRaining) {
  console.log("Stay indoors with hot coffee.");
} else if (temperature > 35) {
  console.log("Go swimming.");
} else if (temperature < 15 && windSpeed > 20) {   // && : both must be true
  console.log("Too cold and windy — stay home.");
} else {
  console.log("Perfect day for a walk.");
}