// Q7: Closure - makeMultiplier

function makeMultiplier(multiplier) {
  // The returned inner function "remembers" `multiplier`
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(triple(5));  // 15
console.log(double(5));  // 10

/*
 HOW CLOSURE WORKS HERE:
 - makeMultiplier(3) runs and creates a local variable `multiplier = 3`.
 - It returns the inner function. Normally, when makeMultiplier finishes, its
   local variables would be destroyed.
 - BUT the inner function still references `multiplier`, so JavaScript keeps that
   variable alive. The inner function + its remembered outer variables = a closure.
 - Each call to makeMultiplier creates a separate closure with its own
   `multiplier`, so `triple` (3) and `double` (2) don't interfere with each other.
*/