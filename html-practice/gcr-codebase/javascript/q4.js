// Q4. Academic Performance Evaluator
// Decides promotion status from the marks of 5 subjects (each out of 100).

const marks = [78, 85, 92, 67, 88];     // try changing values to test

const totalSubjects = marks.length;
const maxMarksPerSubject = 100;

// Calculate total, average and percentage
let total = 0;
for (const mark of marks) {
  total += mark;
}
const average = total / totalSubjects;
const percentage = (total / (totalSubjects * maxMarksPerSubject)) * 100;

// Validation: any subject below 35 means automatic "Detained"
const hasFailedSubject = marks.some((mark) => mark < 35);

let result;
if (hasFailedSubject || percentage < 50) {
  result = "Detained";
} else if (percentage >= 85) {
  result = "Promoted with Distinction";
} else if (percentage >= 50 && percentage <= 84.99) {
  result = "Promoted";
}

console.log(`Marks      : ${marks.join(", ")}`);
console.log(`Average    : ${average.toFixed(2)}`);
console.log(`Percentage : ${percentage.toFixed(2)}%`);
if (hasFailedSubject) {
  console.log("Note: At least one subject is below 35.");
}
console.log(`Result     : ${result}`);