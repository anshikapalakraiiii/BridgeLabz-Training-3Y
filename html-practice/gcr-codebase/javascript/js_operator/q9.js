// Q9. Odd-Even Number Analyzer

const numbers = [];
const results = [];

// Fill the array with 1 to 30 using a loop
for (let i = 1; i <= 30; i++) {
  numbers.push(i);
}

// Classify each number
for (const num of numbers) {
  if (num % 3 === 0 && num % 5 === 0) {
    results.push("FizzBuzz");
  } else if (num % 2 === 0) {
    results.push("Even");
  } else {
    results.push("Odd");
  }
}

numbers.forEach((n, i) => console.log(`${n}: ${results[i]}`));
console.log("\nResults array:", results);