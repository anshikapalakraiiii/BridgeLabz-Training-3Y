// Q1. Personalized Login Greeting
// Greets the user based on the current hour of the day.

const userName = "Aarav";               // test user name
const currentHour = new Date().getHours(); // 0 - 23

let greeting;

if (currentHour < 12) {
  greeting = "Good Morning";            // before 12:00
} else if (currentHour >= 12 && currentHour <= 17) {
  greeting = "Good Afternoon";          // 12:00 - 17:59
} else {
  greeting = "Good Evening";            // 18:00 onwards
}

// Template literal for the final message
console.log(`${greeting} ${userName}!`);
console.log(`(Current hour: ${currentHour})`);