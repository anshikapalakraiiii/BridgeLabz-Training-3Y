// Q2: applyOperation(numbers, operation) - callback applied to each element

function applyOperation(numbers, operation) {
  const result = [];
  for (const num of numbers) {
    result.push(operation(num));  // call the callback on every element
  }
  return result;
}

// Callback functions
const double = (n) => n * 2;
const square = (n) => n * n;

const numbers = [1, 2, 3, 4];

console.log("Original:", numbers);
console.log("Doubled :", applyOperation(numbers, double)); // [2, 4, 6, 8]
console.log("Squared :", applyOperation(numbers, square)); // [1, 4, 9, 16]