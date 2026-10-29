"use strict";
// ============================================================
// Q7 – Smart Calculator
// Run: node q7_smart_calculator.js
// ============================================================

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

// ---- Custom errors ----
class CalculatorError extends Error {
  constructor(message) { super(message); this.name = this.constructor.name; }
}
class DivideByZeroError extends CalculatorError {}
class NegativeRootError extends CalculatorError {}
class InvalidOperationError extends CalculatorError {}

function calculate(op, a, b) {
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError(`Cannot divide ${a} by zero`);
      return a / b;
    case "power":
      return a ** b;
    case "root":                      // square root of the first number
      if (a < 0) throw new NegativeRootError(`Cannot take the root of negative number ${a}`);
      return Math.sqrt(a);
    default:
      throw new InvalidOperationError(`Unknown operation "${op}"`);
  }
}

function runAll(cases) {
  const results = [];
  for (const [op, a, b] of cases) {
    try {
      results.push({ op, a, b, status: "OK", output: calculate(op, a, b) });
    } catch (err) {
      results.push({ op, a, b, status: "ERROR", output: `${err.name}: ${err.message}` });
    }
  }
  return results;
}

function printSummary(title, results) {
  console.log(`=== ${title} ===`);
  console.log("Operation  | Inputs      | Status | Result");
  console.log("-----------+-------------+--------+-----------------------------");
  for (const r of results) {
    const icon = r.status === "OK" ? "✔" : "✖";
    console.log(
      `${r.op.padEnd(10)} | ${`${r.a}, ${r.b}`.padEnd(11)} | ${icon} ${r.status.padEnd(4)} | ${r.output}`
    );
  }
  const ok = results.filter((r) => r.status === "OK").length;
  console.log(`\nSucceeded: ${ok}  Failed: ${results.length - ok}\n`);
}

// Main run with the given data
printSummary("CALCULATOR SUMMARY", runAll(operations.map((op) => [op, num1, num2])));

// Extra edge cases: negative root + unrecognised operation
printSummary("EDGE CASES", runAll([["root", -9, 0], ["modulo", 10, 3]]));