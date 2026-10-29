"use strict";
// ============================================================
// Q8 – Strict Mode Showdown
// Run: node q8_strict_mode_showdown.js
//
// This file itself is strict, but a function built with `new Function(...)`
// does NOT inherit strictness, so we can run the SAME code both ways
// (a strict SyntaxError would otherwise stop this whole file from loading).
// ============================================================

const original = `
  function demo(a, a) {
    total = 10;
    delete total;
  }
  demo(5, 10);
`;

const cases = [
  { label: "Original code (all three problems)", body: original + " return typeof total;" },
  { label: "A) duplicate parameter names", body: "function demo(a, a) { return a; } return demo(5, 10);" },
  { label: "B) assignment to undeclared variable", body: "function demo() { total = 10; return total; } return demo();" },
  { label: "C) delete on a plain identifier", body: "var total = 1; function demo() { delete total; } demo(); return 'finished';" }
];

function run(body, strict) {
  const code = (strict ? '"use strict";\n' : "") + body;
  try {
    const result = new Function(code)();
    return `OK -> returned ${JSON.stringify(result)}`;
  } catch (err) {
    return `${err.name}: ${err.message}`;
  } finally {
    // clean up the implicit global created in sloppy mode
    if (Object.hasOwn(globalThis, "total")) delete globalThis.total;
  }
}

for (const c of cases) {
  console.log(`\n### ${c.label}`);
  console.log("  sloppy :", run(c.body, false));
  console.log("  strict :", run(c.body, true));
}

// ---------------- RECORDED DIFFERENCES ----------------
//  Problem                  | Sloppy mode                        | Strict mode
//  -------------------------+------------------------------------+------------------------------------
//  function demo(a, a)      | allowed; the 2nd `a` wins (a=10)   | SyntaxError: Duplicate parameter name
//  total = 10 (undeclared)  | creates a global variable          | ReferenceError: total is not defined
//  delete total             | silently ignored / deletes global  | SyntaxError: Delete of an unqualified identifier
//
// NOTE: both SyntaxErrors happen at PARSE time, before any code runs, so in
// strict mode the original function never even executes.
//
// WHY STRICT MODE FORBIDS THESE:
//  - Duplicate params: the first `a` becomes unreachable, which is almost
//    always a typo and makes `arguments`/parameter logic ambiguous.
//  - Implicit globals: a misspelt variable name would silently pollute the
//    global scope instead of failing loudly.
//  - delete on a variable: variables are not properties you can remove;
//    allowing it hides bugs and blocks engine optimisations.

// ---------------- CORRECT ES6 VERSION ----------------
function demoFixed(a, b = 0) {          // unique parameter names (+ ES6 default)
  let total = a + b;                    // declared with let
  const settings = { total };           // delete works on object PROPERTIES
  delete settings.total;
  return { total, settingsAfterDelete: settings };
}
console.log("\n### Correct ES6 version");
console.log(demoFixed(5, 10)); // { total: 15, settingsAfterDelete: {} }