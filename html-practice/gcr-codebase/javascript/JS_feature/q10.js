"use strict";
// ============================================================
// Q10 – Nested Hoisting and Closures
// Run: node q10_nested_hoisting_closures.js
// ============================================================

// ---------- ORIGINAL ----------
function outer() {
  console.log(count);   // ?
  var count = 5;
  function inner() {
    console.log(count); // ?
    var count = 10;
  }
  inner();
}
console.log("--- Original ---");
outer();

// ---------- 1. PREDICTION ----------
//  Output:  undefined
//           undefined
//  - outer():  `var count` is hoisted to the top of outer and set to
//    undefined, so the first log prints undefined (not 5, not an error).
//  - inner():  inner has its OWN `var count`, hoisted to the top of inner
//    as undefined. It SHADOWS outer's count (which is 5 by then), so the
//    log prints undefined, not 5 and not 10.

// ---------- 2. SEPARATE MEMORY CONTEXTS ----------
//  Each function call creates its own execution context:
//
//   Global EC     : outer -> function
//   outer() EC    : count = undefined (creation) -> 5 (execution); inner -> function
//   inner() EC    : count = undefined (creation) -> 10 (execution)
//
//  Two different variables, both named `count`. The inner one shadows the
//  outer one, so the scope-chain lookup stops at inner's own count.

// ---------- Closure contrast: remove inner's `var count` ----------
function outerClosure() {
  var count = 5;
  function inner() {
    console.log(count);   // no local count -> walks the scope chain -> outer's 5
  }
  inner();
}
console.log("\n--- Closure: inner has no own count ---");
outerClosure();           // 5

// ---------- 3. INNER AS ARROW FUNCTION ----------
function outerArrow() {
  console.log(count);     // undefined (same as before)
  var count = 5;
  const inner = () => {
    console.log(count);   // undefined: arrow functions ALSO create a function
    var count = 10;       // scope, so `var count` is hoisted inside it too
  };
  inner();
}
console.log("\n--- Arrow inner ---");
outerArrow();             // undefined, undefined (same output)

// What actually changes with an arrow:
//  a) `const inner` is NOT hoisted as callable: calling inner() above its
//     definition throws ReferenceError (TDZ). A declaration would work.
//  b) Arrows have no own `this` / `arguments` (not visible with this example).
function outerArrowEarlyCall() {
  try {
    inner();              // too early
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
  const inner = () => console.log("inner ran");
  inner();
}
console.log("\n--- Arrow called before definition ---");
outerArrowEarlyCall();

// ---------- 4. DEBUG SESSION NOTES ----------
//  Put breakpoints on the first line of outer() and inner() and press F5.
//  CALL STACK when paused inside inner():
//      inner               <- top (currently executing)
//      outer
//      (anonymous)         <- module wrapper for this file
//  Flow: global -> outer pushed -> outer runs, calls inner -> inner pushed ->
//  inner logs & returns (popped) -> outer returns (popped).
//  In the VARIABLES panel: `count` under Local of outer shows undefined then 5;
//  under Local of inner it shows undefined then 10, two separate entries.