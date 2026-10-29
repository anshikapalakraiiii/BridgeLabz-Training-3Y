"use strict";
// ============================================================
// Q2 – Employee Bonus Calculator
// Run: node q2_bonus_calculator.js
// ============================================================

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

// Strict-mode validation (Task 3): assigning to an undeclared variable throws.
try {
  bonusTotal = 0; // no let/const/var -> ReferenceError in strict mode
} catch (err) {
  console.log(`[strict mode] ${err.name}: ${err.message}\n`);
}

// Strict numeric conversion: Number("") is 0 and Number(undefined) is NaN,
// so we explicitly reject missing / blank / non-numeric values.
function toNumber(value, field) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new TypeError(`"${field}" is empty or missing`);
  }
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError(`"${field}" is not numeric: ${value}`);
  return n;
}

function processEmployee(emp) {
  if (emp === null || typeof emp !== "object") {
    throw new TypeError("Employee record is not an object");
  }
  // Missing-property check (Task 5)
  for (const key of ["name", "salary", "years"]) {
    if (!(key in emp)) throw new ReferenceError(`Missing property "${key}"`);
  }

  const salary = toNumber(emp.salary, "salary");   // Task 1
  const years = toNumber(emp.years, "years");      // Task 1

  // Task 2: > 3 years -> 10%, otherwise 5% (exactly 3 years gets 5%)
  const bonus = years > 3 ? salary * 0.1 : salary * 0.05;
  return { name: emp.name, salary, years, bonus, total: salary + bonus };
}

const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

function report(list, title) {
  console.log(`=== ${title} ===`);
  for (const emp of list) {
    try {
      const r = processEmployee(emp);
      // Task 4: template strings
      console.log(
        `Employee: ${r.name.padEnd(6)} | Salary: ₹${fmt(r.salary)} | Years: ${r.years} | ` +
        `Rate: ${r.years > 3 ? "10%" : "5%"} | Bonus: ₹${fmt(r.bonus)} | Total: ₹${fmt(r.total)}`
      );
    } catch (err) {
      console.log(`⚠ Skipped record -> ${err.name}: ${err.message}`);
    }
  }
  console.log();
}

report(employees, "BONUS REPORT");

// Error-handling demo: bad conversion, missing property, null record
report(
  [
    { name: "Ravi", salary: "abc", years: "3" },
    { name: "Neha", years: "4" },
    null
  ],
  "ERROR HANDLING DEMO"
);