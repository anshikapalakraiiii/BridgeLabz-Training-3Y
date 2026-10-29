"use strict";
// ============================================================
// Q9 – JSON Audit
// Run: node q9_json_audit.js
// Debug: breakpoint on the JSON.parse line; step (F10) through entry 3
//        ('{invalid}') and watch control jump from `try` straight to `catch`,
//        skipping the missing-key check and clean.push().
// ============================================================

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

const REQUIRED_KEYS = ["user", "age"];

class MissingKeyError extends Error {
  constructor(keys) {
    super(`Missing key(s): ${keys.join(", ")}`);
    this.name = "MissingKeyError";
  }
}

function auditEntries(entries) {
  const clean = [];
  const errors = [];

  for (let i = 0; i < entries.length; i++) {
    const line = i + 1;                       // human-friendly line number
    try {
      const obj = JSON.parse(entries[i]);     // <-- BREAKPOINT: throws SyntaxError for '{invalid}'
      const missing = REQUIRED_KEYS.filter((key) => !(key in obj));
      if (missing.length > 0) throw new MissingKeyError(missing);
      clean.push(obj);                        // only reached when parse + validation passed
    } catch (err) {
      // Control lands here immediately when anything above throws.
      const type = err instanceof SyntaxError ? "Invalid JSON" : "Missing keys";
      errors.push({ line, type, message: err.message, raw: entries[i] });
    }
  }
  return { clean, errors };
}

const { clean, errors } = auditEntries(rawData);

console.log("=== JSON AUDIT ===\n");
console.log("Clean entries:");
console.log(clean);

console.log("\nErrors:");
for (const e of errors) {
  console.log(`  Line ${e.line}: [${e.type}] ${e.message}   (raw: ${e.raw})`);
}
console.log(`\nValid: ${clean.length}  Invalid: ${errors.length}  Total: ${rawData.length}`);

// ---------------- BONUS: convert age to Number, filter under-18 ----------------
// Extra sample added so the filter has someone to remove.
const bonusInput = [...rawData, '{"user":"Teen","age":"16"}'];
const bonus = auditEntries(bonusInput);

const adults = bonus.clean
  .map((u) => ({ ...u, age: Number(u.age) }))          // "22" -> 22
  .filter((u) => Number.isFinite(u.age) && u.age >= 18);

console.log("\n=== BONUS: age as Number, under-18 removed ===");
console.log(adults);
console.log(`Removed under-18: ${bonus.clean.length - adults.length}`);