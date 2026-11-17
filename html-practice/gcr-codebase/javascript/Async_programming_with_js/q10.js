// Q10: The Final Delivery - Async Pipeline Debugger
// Steps: takeOrder -> prepare -> pack -> dispatch -> deliver

const FAILURE_CHANCE = 0.15; // each step has a 15% chance to fail (set to 0 to always succeed)

// Generic async step: waits a random 1-2 s, then resolves or rejects
function runStep(stepName, successMessage) {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (Math.random() < FAILURE_CHANCE) reject(new Error(`${stepName} failed`));
      else resolve(successMessage);
    }, delay);
  });
}

const takeOrder = () => runStep("takeOrder", "Order taken");
const prepare = () => runStep("prepare", "Food prepared");
const pack = () => runStep("pack", "Package ready");
const dispatch = () => runStep("dispatch", "Out for delivery");
const deliver = () => runStep("deliver", "Delivery completed!");

async function runPipeline() {
  console.log("Start Pipeline");
  try {
    /*
     ASYNC / EVENT LOOP FLOW:
     - runPipeline() runs synchronously until the first `await`.
     - `await takeOrder()` suspends runPipeline and returns control to the caller;
       the call stack is freed, so the program is NOT blocked.
     - The timer (a macrotask) fires later; the promise resolves; the continuation
       of runPipeline is queued as a MICROTASK and resumes right after.
     - Each await therefore runs the steps strictly one after another (sequential).
     - If a promise rejects, `await` throws and execution jumps to catch.
    */
    console.log(`Step 1: ${await takeOrder()}`);
    console.log(`Step 2: ${await prepare()}`);
    console.log(`Step 3: ${await pack()}`);
    console.log(`Step 4: ${await dispatch()}`);
    console.log(await deliver());
  } catch (error) {
    console.log(`(${error.message})`);
    console.log("Pipeline failed!");
  }
}

runPipeline();
console.log("(Synchronous code after runPipeline() runs while the pipeline is still waiting)");