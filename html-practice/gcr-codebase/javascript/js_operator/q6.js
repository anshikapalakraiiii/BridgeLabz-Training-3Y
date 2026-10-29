// Q6. Event-Based Counter Simulation

let count = 0;

function increment() {
  count++;

  // Nested function: can read/update `count` from the outer scope (closure)
  function logCount() {
    console.log(`Incremented -> count = ${count}`);
  }
  logCount();
}

function decrement() {
  count--;

  function logCount() {
    console.log(`Decremented -> count = ${count}`);
  }
  logCount();
}

// Simulate click events
console.log("Initial count:", count);
increment(); // click +
increment(); // click +
increment(); // click +
decrement(); // click -
decrement(); // click -
console.log("Final count:", count);