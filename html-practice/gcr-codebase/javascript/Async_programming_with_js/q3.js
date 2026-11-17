// Q3: Bug Tracker - Callback to Promise Migration

// ---------- ORIGINAL callback-based function ----------
function fetchBugs(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}

// ---------- Promise-based version ----------
const SIMULATE_API_FAILURE = Math.random() < 0.3; // true ~30% of runs (set true/false to force)

function getBugs() {
  return new Promise((resolve, reject) => {
    // Wrap the old callback API: callback -> resolve, failure -> reject
    if (SIMULATE_API_FAILURE) {
      setTimeout(() => reject(new Error("API request failed")), 1000);
      return;
    }
    fetchBugs((bugs) => resolve(bugs));
  });
}

console.log("Fetching bugs...");
getBugs()
  .then((bugs) => {
    // console.table needs objects/arrays; map strings into rows with an ID
    const bugRows = bugs.map((bug, index) => ({ ID: index + 1, Bug: bug }));
    console.table(bugRows);
  })
  .catch((error) => {
    console.log(`Could not load bugs: ${error.message}`);
  });