// Q4: DevOps Delay - Async Timeout Race (Promise.all + Promise.race)

const FAILURE_CHANCE = 0.2; // 20% chance a server fails (set to 0 to always succeed)

// Creates a "server" that responds after `seconds`, randomly failing
function deployToServer(name, seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) reject(new Error(`${name} failed to respond`));
      else resolve(`${name} responded in ${seconds}s`);
    }, seconds * 1000);
  });
}

// Note: each Promise is created fresh for each combinator so timers start separately.
// ---- Promise.all: waits for BOTH; rejects as soon as ANY one rejects ----
Promise.all([deployToServer("Server A", 2), deployToServer("Server B", 3)])
  .then((results) => {
    console.log("Deployment completed for all servers");
    console.log(results);
  })
  .catch((error) => console.log(`[all] Deployment error: ${error.message}`));

// ---- Promise.race: settles with the FIRST promise to settle (win or fail) ----
Promise.race([deployToServer("Server A", 2), deployToServer("Server B", 3)])
  .then((fastest) => console.log("Fastest response:", fastest))
  .catch((error) => console.log(`[race] Deployment error: ${error.message}`));

/*
 Expected (no failures):
   Fastest response: Server A responded in 2s      (after ~2 s)
   Deployment completed for all servers            (after ~3 s)
   [ 'Server A responded in 2s', 'Server B responded in 3s' ]
*/