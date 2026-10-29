"use strict";
// ============================================================
// Q4 – Debugging Mystery
// Run: node q4_debugging_mystery.js
// ============================================================

// ---- 1. The broken code (wrapped in try/catch so the file keeps running) ----
function showMessage() {
  greeting = "Welcome"; // undeclared!
  console.log(greeting);
}

console.log("--- Broken version ---");
try {
  showMessage();
} catch (err) {
  console.log(`${err.name}: ${err.message}`);
}

// WHY IT FAILS:
//  An assignment to a name that was never declared (no var/let/const) is, in
//  sloppy mode, silently turned into a property on the global object
//  (an "implicit global"). Strict mode removes that fallback: the engine looks
//  up `greeting`, finds no binding in any scope, and throws
//  ReferenceError: greeting is not defined.

// ---- 2. The fix ----
function showMessageFixed() {
  const greeting = "Welcome"; // declared -> scoped to this function only
  console.log(greeting);
}

console.log("\n--- Fixed version ---");
showMessageFixed();

console.log("Does 'greeting' leak outside? ->", typeof greeting); // "undefined"

// HOW SCOPE RULES CHANGED THE BEHAVIOUR:
//  Before: greeting became a GLOBAL (visible everywhere, easy to clobber).
//  After : `const` creates a block/function-scoped binding. It exists only
//          inside showMessageFixed, so nothing leaks and typos are caught early.

// ---- 3. Debugger exercise (VS Code) ----
//  a) Click the gutter next to `const greeting = ...` in showMessageFixed.
//  b) Press F5 -> add Watch expression: greeting
//     (before the line runs it shows <TDZ / uninitialized>; after -> "Welcome")
//  c) CALL STACK panel while paused:
//        showMessageFixed   <- current frame
//        (anonymous)        <- module wrapper, runs this file
//        Module._compile ... <- Node internals
//  d) Step Over (F10) to execute console.log; Step Out (Shift+F11) to return.