"use strict";
// ============================================================
// Q3 – Transaction Validator
// Run: node q3_transaction_validator.js
// Debug: set a breakpoint on the `debugger;` line (or click the gutter in
//        VS Code), press F5, and add Watch: index, tx, valid.length, invalid.length
// ============================================================

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

// ---- Custom error hierarchy -------------------------------------------
class TransactionError extends Error {
  constructor(message, tx) {
    super(message);
    this.name = this.constructor.name; // e.g. "NegativeAmountError"
    this.transaction = tx;
  }
}
class NullEntryError extends TransactionError {}
class MissingFieldError extends TransactionError {}
class NegativeAmountError extends TransactionError {}

function validate(tx) {
  // Order matters: check null FIRST, otherwise tx.id would throw a TypeError.
  if (tx === null) throw new NullEntryError("Transaction entry is null", tx);
  if (tx.id === undefined || tx.amount === undefined) {
    const missing = ["id", "amount"].filter((k) => tx[k] === undefined);
    throw new MissingFieldError(`Missing field(s): ${missing.join(", ")}`, tx);
  }
  if (tx.amount < 0) throw new NegativeAmountError(`Negative amount: ${tx.amount}`, tx);
  return tx;
}

const valid = [];
const invalid = [];
const errorCounts = {}; // categorised by error type

for (let index = 0; index < transactions.length; index++) {
  const tx = transactions[index];
  debugger; // <-- BREAKPOINT: watch index, tx, valid, invalid (no effect without a debugger)
  try {
    valid.push(validate(tx));
  } catch (err) {
    // Categorise by type
    errorCounts[err.name] = (errorCounts[err.name] || 0) + 1;
    invalid.push({ index, type: err.name, message: err.message, tx });
  }
}

console.log("=== TRANSACTION REPORT ===\n");
console.log("Valid transactions:");
for (const t of valid) console.log(`  ✔ id=${t.id}, amount=${t.amount}`);

console.log("\nInvalid transactions:");
for (const e of invalid) {
  console.log(`  ✖ [index ${e.index}] ${e.type}: ${e.message} -> ${JSON.stringify(e.tx)}`);
}

console.log("\nErrors by category:");
for (const [type, count] of Object.entries(errorCounts)) console.log(`  ${type}: ${count}`);

console.log("\n--- Totals ---");
console.log(`Successful: ${valid.length}`);
console.log(`Failed    : ${invalid.length}`);
console.log(`Total     : ${transactions.length}`);