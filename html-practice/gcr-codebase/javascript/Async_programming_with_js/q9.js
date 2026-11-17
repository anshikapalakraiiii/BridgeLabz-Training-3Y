// Q9: Debugging the Event Loop

/*
 PREDICTED OUTPUT (written BEFORE running):
   1. Script start
   2. Script end
   3. Promise callback
   4. Timeout callback
*/

console.log("Script start");
setTimeout(() => console.log("Timeout callback"), 0);
Promise.resolve().then(() => console.log("Promise callback"));
console.log("Script end");

/*
 ACTUAL OUTPUT (after running):
   Script start
   Script end
   Promise callback
   Timeout callback
 -> Matches the prediction.

 WHY PROMISES (MICROTASKS) RUN BEFORE setTimeout (MACROTASKS):
 - "Script start" and "Script end" are synchronous, so they run immediately on the call stack.
 - setTimeout's callback goes to the macrotask queue (after the timer, even 0 ms).
 - The resolved Promise's .then() callback goes to the microtask queue.
 - When the call stack empties, the Event Loop ALWAYS drains the whole microtask
   queue before taking the next macrotask. So "Promise callback" prints first.
*/