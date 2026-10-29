"use strict";
// ============================================================
// Q1 – Dynamic Data Parser
// Run: node q1_data_parser.js
// ============================================================

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// --- Validation rule -------------------------------------------------
// DEBUG OBSERVATION: Number() alone is a poor validator, because
//   Number(" ")  -> 0   (whitespace silently becomes 0!)
//   Number(null) -> 0   (null silently becomes 0!)
// So we also require: a string, non-blank, and a finite result.
function isValidNumber(value) {
  if (typeof value !== "string") return false;        // rejects null / undefined
  if (value.trim() === "") return false;              // rejects " "
  return Number.isFinite(Number(value));              // rejects "NaN", "100px", "true"
}

// Reason helper used for the invalid log
function invalidReason(value) {
  if (value === null) return "null is not numeric data (Number(null) is a misleading 0)";
  if (value === undefined) return "undefined -> NaN";
  if (value.trim() === "") return "blank string (Number(' ') is a misleading 0)";
  return `cannot be parsed as a number (Number("${value}") = ${Number(value)})`;
}

// Display raw value so null / undefined / strings are distinguishable
const show = (v) => (v === null || v === undefined ? String(v) : `"${v}"`);

const validNumbers = [];     // numeric data we accept
const invalidEntries = [];   // everything we skip (logged separately)

console.log("=== Q1: DYNAMIC DATA PARSER REPORT ===\n");
console.log("#  | Raw        | Number | Boolean | String      | Status");
console.log("---+------------+--------+---------+-------------+--------");

// Task 1 + 4: loop, convert each value to Number / Boolean / String
for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];

  const asNumber = Number(raw);     // "25"->25, "true"->NaN, null->0, undefined->NaN
  const asBoolean = Boolean(raw);   // every non-empty string is true, even "false" and "NaN"!
  const asString = String(raw);     // null -> "null", undefined -> "undefined"

  // Task 2 + 3: split into valid / invalid arrays
  let status;
  if (isValidNumber(raw)) {
    validNumbers.push(asNumber);
    status = "VALID   ";
  } else {
    invalidEntries.push({ index: i, raw: show(raw), reason: invalidReason(raw) });
    status = "INVALID ";
  }

  // Conditional formatting: tick for valid, cross for invalid
  const mark = status.trim() === "VALID" ? "✔" : "✖";
  console.log(
    `${String(i).padEnd(2)} | ${show(raw).padEnd(10)} | ${String(asNumber).padEnd(6)} | ` +
    `${String(asBoolean).padEnd(7)} | ${show(asString).padEnd(11)} | ${mark} ${status}`
  );
}

console.log("\n--- Valid numeric data ---");
console.log(validNumbers);

console.log("\n--- Invalid entries (skipped) ---");
for (const item of invalidEntries) {
  console.log(`  [index ${item.index}] ${item.raw} -> ${item.reason}`);
}

// Small aggregate computed with a loop
let sum = 0;
for (const n of validNumbers) sum += n;

console.log("\n--- Summary ---");
console.log(`Total entries : ${apiData.length}`);
console.log(`Valid         : ${validNumbers.length}`);
console.log(`Invalid       : ${invalidEntries.length}`);
console.log(`Sum of valid  : ${sum}`);