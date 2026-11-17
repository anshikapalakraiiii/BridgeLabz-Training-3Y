// Q5: Frontend Rush - Avoiding Callback Hell
// Pipeline: design -> build -> test -> deploy -> celebrate (1 second each)

// =====================================================
// PART 1: Nested callbacks  ("callback hell" / pyramid of doom)
// =====================================================
function stepWithCallback(stageName, callback) {
  setTimeout(() => {
    console.log(`[callback] ${stageName} done`);
    callback();
  }, 1000);
}

function runWithCallbacks(done) {
  stepWithCallback("Design", () => {
    stepWithCallback("Build", () => {
      stepWithCallback("Test", () => {
        stepWithCallback("Deploy", () => {
          stepWithCallback("Celebrate", () => {
            console.log("[callback] Pipeline finished\n");
            done();
          });
        });
      });
    });
  });
}

// =====================================================
// PART 2: async/await version
// =====================================================
function stepWithPromise(stageName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[async/await] ${stageName} done`);
      resolve();
    }, 1000);
  });
}

async function runWithAsyncAwait() {
  try {
    await stepWithPromise("Design");
    await stepWithPromise("Build");
    await stepWithPromise("Test");
    await stepWithPromise("Deploy");
    await stepWithPromise("Celebrate");
    console.log("[async/await] Pipeline finished");
  } catch (error) {
    console.log(`Pipeline error: ${error.message}`); // ONE place for all errors
  }
}

// Run callback version first, then the async/await version
runWithCallbacks(runWithAsyncAwait);

/*
 WHY async/await IMPROVES READABILITY:
 - Flat, top-to-bottom code that reads like synchronous steps; no deepening
   indentation as stages are added.
 - Execution order is obvious: each `await` pauses THIS function (not the whole
   program) until the stage finishes.
 - Error handling is centralised in a single try/catch instead of checking errors
   in every nested callback.
 - Adding, removing or reordering stages is a one-line change.
 - Easier to debug (clean stack traces, breakpoints step line by line).
*/