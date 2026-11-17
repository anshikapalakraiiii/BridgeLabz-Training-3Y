// Q3: Arrow function vs normal function and `this`

// --- Version 1: arrow function method (problem) ---
const user = {
  name: "Riya",
  showName: () => {
    console.log("Arrow function:", this.name);
  },
};
user.showName(); // undefined

/*
 WHY is this.name undefined?
 Arrow functions do NOT have their own `this`. They capture `this` from the
 surrounding (lexical) scope at the time they are defined. An object literal
 `{ ... }` does not create a scope, so the arrow function's `this` is the `this`
 of the outer scope:
   - In a Node.js module file: `this` === module.exports ({}), so this.name is undefined.
   - In a browser (non-module script): `this` === window, and window.name is "" / undefined.
 It is NOT the `user` object, so `name` is not found.
*/

// --- Version 2: fix using a normal function ---
const fixedUser = {
  name: "Riya",
  showName: function () {      // (or shorthand: showName() { ... })
    console.log("Normal function:", this.name);
  },
};
fixedUser.showName(); // Riya

/*
 A normal function gets `this` based on HOW it is called.
 Called as fixedUser.showName(), `this` is the object before the dot -> fixedUser.
*/