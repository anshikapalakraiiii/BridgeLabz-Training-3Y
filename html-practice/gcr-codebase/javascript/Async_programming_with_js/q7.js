// Q7: The Lazy Loader - Promise.allSettled()

function loadProfile() { return new Promise(r => setTimeout(() => r("Profile Loaded"), 2000)); }
function loadPosts() { return new Promise(r => setTimeout(() => r("Posts Loaded"), 1500)); }
function loadMessages() { return new Promise(r => setTimeout(() => r("Messages Loaded"), 1000)); }

// Wraps a loader so that it randomly rejects after its normal delay
function makeFailing(loader, moduleName, delay) {
  return () => new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`${moduleName} failed to load`)), delay));
}

async function loadDashboard() {
  const startTime = Date.now();

  // Each entry: [module name, loader function, its delay]
  const modules = [
    ["Profile", loadProfile, 2000],
    ["Posts", loadPosts, 1500],
    ["Messages", loadMessages, 1000],
  ];

  // Randomly pick ONE module to reject
  const failingIndex = Math.floor(Math.random() * modules.length);
  const [failName, failLoader, failDelay] = modules[failingIndex];
  modules[failingIndex][1] = makeFailing(failLoader, failName, failDelay);
  console.log(`(Simulating a failure in: ${failName})\n`);

  // Start all loaders at once; allSettled NEVER rejects - it waits for all of them
  const results = await Promise.allSettled(modules.map(([, loader]) => loader()));

  results.forEach((result, index) => {
    const moduleName = modules[index][0];
    if (result.status === "fulfilled") {
      console.log(`✔ ${moduleName}: ${result.value}`);
    } else {
      console.log(`✖ ${moduleName}: ${result.reason.message}`);
    }
  });

  const totalTime = Date.now() - startTime;
  // Tasks run in parallel, so total ≈ slowest module (~2000 ms), not the sum (4500 ms)
  console.log(`\nTotal time taken: ${totalTime} ms`);
}

loadDashboard();