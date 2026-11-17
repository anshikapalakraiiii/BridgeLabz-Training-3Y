// Q2: Task Scheduler - Micro vs Macro Challenge

console.log("Start");                                   // 1. synchronous

setTimeout(() => {                                      // macrotask (Task Queue)
  console.log("setTimeout callback (macrotask)");
}, 0);

Promise.resolve().then(() => {                          // microtask (Microtask Queue)
  console.log("Promise.then callback (microtask)");
});

console.log("Synchronous log in the middle");           // 2. synchronous

console.log("End");                                     // 3. synchronous

/*
 OUTPUT ORDER:
   Start
   Synchronous log in the middle
   End
   Promise.then callback (microtask)
   setTimeout callback (macrotask)

 WHY DO MICROTASKS RUN BEFORE MACROTASKS?
 1. The Call Stack runs all synchronous code first (Start, sync log, End).
 2. setTimeout hands its callback to the Web API / timer system; when the timer
    expires the callback is placed in the MACROTASK (task) queue.
 3. A resolved Promise's .then() callback is placed in the MICROTASK queue.
 4. The Event Loop rule: after the current script/task finishes and the call stack
    is empty, it drains the ENTIRE microtask queue first. Only then does it pick
    the next macrotask.
 So even with a 0 ms delay, the timeout callback has to wait for every microtask.
*/