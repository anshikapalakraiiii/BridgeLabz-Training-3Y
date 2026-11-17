// Q8: Custom Array.prototype.myMap() that behaves like map()

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {   // skip holes in sparse arrays, like built-in map
      result[i] = callback.call(thisArg, this[i], i, this); // (element, index, array)
    }
  }
  return result;
};

// Demonstration
console.log([1, 2, 3].myMap((num) => num * 2));            // [ 2, 4, 6 ]
console.log(["a", "b"].myMap((c, i) => `${i}:${c}`));      // [ '0:a', '1:b' ]
console.log("Matches built-in map?",
  JSON.stringify([1, 2, 3].myMap((n) => n * 2)) ===
  JSON.stringify([1, 2, 3].map((n) => n * 2)));            // true