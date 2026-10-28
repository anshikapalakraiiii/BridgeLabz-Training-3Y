"use strict";
// ============================================================
// Q5 – Hoisting Lab: The Sequence Trap
// Run: node q5_hoisting_lab.js
// ============================================================

// ---------- PART 0: PREDICTION ----------
// Predicted output of the original code:
//   undefined      (var score is hoisted & initialised to undefined)
//   Game started   (function declaration is hoisted with its body)
//   ready          (startGame() is called AFTER `let status` was initialised)

console.log("--- Original code ---");
console.log(score);   // undefined  <- the "trap": no error, but a wrong value
announce();           // "Game started"
var score = 50;
function announce() { console.log("Game started"); }

let status = "ready";
startGame();          // "ready"
function startGame() {
  console.log(status);
}

// ---------- PART 1: MEMORY STATE OF EACH HOISTED ELEMENT ----------
//  Element        | Hoisted? | State during creation phase
//  ---------------+----------+----------------------------------------------
//  var score      | yes      | allocated, initialised to undefined
//  announce()     | yes      | fully hoisted: name AND body available
//  let status     | yes      | allocated but UNINITIALISED (Temporal Dead Zone)
//                 |          | until the line `let status = ...` executes
//  startGame()    | yes      | fully hoisted (declaration)
//  The "trap": reading score early gives undefined, not an error; reading
//  `status` early would throw ReferenceError (TDZ).

// ---------- PART 2: FIXED VERSION ----------
function fixedVersion() {
  console.log("\n--- Fixed version ---");
  const score = 50;                          // declared & assigned BEFORE use
  const status = "ready";                    // initialised BEFORE startGame() runs

  function announce() { console.log("Game started"); }
  function startGame() { console.log(status); }

  console.log(score);   // 50
  announce();
  startGame();
}
fixedVersion();

// TDZ demonstration: calling startGame before `let` is initialised
function tdzDemo() {
  console.log("\n--- TDZ demo (let accessed too early) ---");
  try {
    earlyStart();                // runs while `state` is still in the TDZ
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
  let state = "ready";
  function earlyStart() { console.log(state); }
}
tdzDemo();

// ---------- PART 3: ARROW FUNCTION VERSION ----------
function arrowVersion() {
  console.log("\n--- Arrow function comparison ---");

  // (a) const arrow: binding is in the TDZ -> ReferenceError
  try { announceConst(); } catch (err) { console.log(`const arrow : ${err.name}: ${err.message}`); }

  // (b) var arrow: binding hoisted as undefined -> TypeError
  try { announceVar(); } catch (err) { console.log(`var arrow   : ${err.name}: ${err.message}`); }

  const announceConst = () => console.log("Game started (const arrow)");
  var announceVar = () => console.log("Game started (var arrow)");

  // After the definition lines they work normally
  announceConst();
  announceVar();

  // Full rewrite using arrows, in a safe order
  const score = 50;
  const status = "ready";
  const startGame = () => console.log(status);
  console.log(score);
  startGame();
}
arrowVersion();

// KEY DIFFERENCE:
//  function declarations -> hoisted WITH body (callable before definition)
//  arrow functions       -> are just values assigned to a variable, so they
//  follow that variable's rules: const/let = TDZ (ReferenceError),
//  var = undefined until assignment (TypeError: not a function).