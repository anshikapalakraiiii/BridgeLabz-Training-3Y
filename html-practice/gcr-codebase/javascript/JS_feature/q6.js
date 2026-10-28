"use strict";
// ============================================================
// Q6 – Pyramid Pattern Generator
// Run: node q6_pyramid_pattern.js        (default 5 rows)
//      node q6_pyramid_pattern.js 7      (user input = 7 rows)
// ============================================================

// ---- Task 3: user input with default = 5 ----
function getRows() {
  const arg = Number.parseInt(process.argv[2], 10);
  return Number.isInteger(arg) && arg > 0 ? arg : 5;  // fallback to default
}
const ROWS = getRows();

// ---- Base version with let ----
function pyramidLet(rows) {
  for (let i = 1; i <= rows; i++) {        // i lives only inside this loop
    let line = "";
    for (let j = 1; j <= i; j++) {         // j lives only inside the inner loop
      line += "* ";
    }
    console.log(line.trimEnd());
    // DEBUG: breakpoint here. Watch i, j (j is out of scope here), line.
  }
}
console.log(`--- Pyramid with let (${ROWS} rows) ---`);
pyramidLet(ROWS);

// ---- Task 1: replace let with var ----
function pyramidVar(rows) {
  for (var i = 1; i <= rows; i++) {        // var -> function-scoped, hoisted
    var line = "";
    for (var j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trimEnd());
  }
  // OBSERVATION 1: the printed pattern is IDENTICAL.
  // OBSERVATION 2: the variables LEAK out of the loops:
  console.log(`After loops -> i = ${i}, j = ${j}, line = "${line.trimEnd()}"`);
  // i = rows+1 (the value that ended the loop), j = last i + 1.
  // With let these would be a ReferenceError here.
}
console.log(`\n--- Pyramid with var ---`);
pyramidVar(ROWS);

// ---- Task 2: variable re-use / closure capture ----
function closureDemo(rows) {
  const withVar = [];
  const withLet = [];
  for (var a = 1; a <= rows; a++) withVar.push(() => a);   // ONE shared `a`
  for (let b = 1; b <= rows; b++) withLet.push(() => b);   // NEW `b` per iteration
  console.log("var captured:", withVar.map((fn) => fn()));  // [6,6,6,6,6]
  console.log("let captured:", withLet.map((fn) => fn()));  // [1,2,3,4,5]
}
console.log("\n--- Variable re-use: closures ---");
closureDemo(ROWS);
// STEP-BY-STEP DEBUG NOTES:
//  With var, the debugger's Watch panel shows a single `i` in the Local scope
//  that is mutated every iteration. With let, the Block scope shows a fresh
//  `i` per iteration. Also: if the inner loop re-used `var i` instead of `j`,
//  the inner loop would reset the outer counter -> wrong/infinite output.

// ---- Task 4: strict mode catches undeclared loop variables ----
function undeclaredLoopVar() {
  for (k = 1; k <= 3; k++) { }   // `k` never declared
}
console.log("\n--- Strict mode check ---");
try {
  undeclaredLoopVar();
} catch (err) {
  console.log(`${err.name}: ${err.message}`);  // ReferenceError: k is not defined
}