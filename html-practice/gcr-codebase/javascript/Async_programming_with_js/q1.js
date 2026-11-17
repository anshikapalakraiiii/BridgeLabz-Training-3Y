// Q1: The Startup Morning - Async Coffee Maker (Promise chaining)

const FAILURE_CHANCE = 0.2; // 20% chance that any step fails (change to 0 to always succeed)

// Helper: random delay between 1000 ms and 2000 ms
const randomDelay = () => 1000 + Math.random() * 1000;

// Each step returns a Promise that resolves (or randomly rejects) after 1-2 seconds
function boilWater() {
  return new Promise((resolve, reject) => {
    console.log("Step 1: Boiling water...");
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) reject(new Error("Kettle stopped working"));
      else resolve("Water boiled");
    }, randomDelay());
  });
}

function brewCoffee(previousResult) {
  return new Promise((resolve, reject) => {
    console.log(`  ✔ ${previousResult}`);
    console.log("Step 2: Brewing coffee...");
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) reject(new Error("Coffee machine jammed"));
      else resolve("Coffee brewed");
    }, randomDelay());
  });
}

function pourIntoCup(previousResult) {
  return new Promise((resolve, reject) => {
    console.log(`  ✔ ${previousResult}`);
    console.log("Step 3: Pouring into cup...");
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) reject(new Error("Cup slipped and broke"));
      else resolve("Coffee poured");
    }, randomDelay());
  });
}

// Promise chain: each .then() starts only after the previous Promise resolves.
// If ANY step rejects, the remaining .then() calls are skipped and .catch() runs.
boilWater()
  .then(brewCoffee)
  .then(pourIntoCup)
  .then((result) => {
    console.log(`  ✔ ${result}`);
    console.log("Coffee ready for the team!");
  })
  .catch((error) => {
    console.log(`✖ Coffee process failed: ${error.message}`);
  });