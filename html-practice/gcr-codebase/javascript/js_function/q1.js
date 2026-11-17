// Q1: Callback flow - greetUser(name, callback)

// Callback function: runs AFTER the greeting is printed
function showEndMessage() {
  console.log("Welcome to the course!");
}

// Higher-order function: accepts another function as an argument
function greetUser(name, callback) {
  console.log(`Hello ${name}`);   // Step 1: greet the user
  callback();                     // Step 2: execute the callback
}

// Demonstration of the flow
console.log("--- Start ---");
greetUser("Aman", showEndMessage);  // pass the function itself, NOT showEndMessage()
console.log("--- End ---");

/* Expected output:
--- Start ---
Hello Aman
Welcome to the course!
--- End ---
*/