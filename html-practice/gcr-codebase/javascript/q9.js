// Q9. Random Math Quiz Generator

const operators = ["+", "-", "*", "/"];

// Two random numbers between 1 and 20
const num1 = Math.floor(Math.random() * 20) + 1;
const num2 = Math.floor(Math.random() * 20) + 1;

// Random operator from the array
const operator = operators[Math.floor(Math.random() * operators.length)];

let correctAnswer;

// Calculate the answer using switch
switch (operator) {
  case "+":
    correctAnswer = num1 + num2;
    break;
  case "-":
    correctAnswer = num1 - num2;
    break;
  case "*":
    correctAnswer = num1 * num2;
    break;
  case "/":
    correctAnswer = (num1 / num2).toFixed(2);   // 2 decimal places for division
    break;
  default:
    correctAnswer = "Invalid operator";
}

console.log(`Question: ${num1} ${operator} ${num2} = ?`);
console.log(`Correct answer: ${correctAnswer}`);