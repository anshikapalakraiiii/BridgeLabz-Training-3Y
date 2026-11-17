// Q8: Order Processing Flow - Async Retry Mechanism

// Returns a Promise that fails 50% of the time
function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve("Order submitted");
      else reject(new Error("Server error"));
    }, 500);
  });
}

async function processOrder() {
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await submitOrder();                       // pauses here until the promise settles
      console.log(`Attempt ${attempt}: Success`);
      return;                                    // success -> stop retrying
    } catch (error) {
      console.log(`Attempt ${attempt}: Failed`); // failure -> loop continues
    }
  }

  // Reached only if every attempt failed
  throw new Error("Order could not be processed");
}

// Final failure is handled gracefully by the caller
(async () => {
  try {
    await processOrder();
    console.log("Order completed successfully!");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
})();