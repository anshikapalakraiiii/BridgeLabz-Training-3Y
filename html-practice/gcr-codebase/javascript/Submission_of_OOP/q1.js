// Q1: Student Result Processing (reduce + Classes)

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks; // array of numbers
  }

  // Average marks calculated with reduce()
  calculateAverage() {
    if (this.marks.length === 0) {
      throw new Error(`${this.name} has no marks`);
    }
    // reduce() folds the array into one value: running total starts at 0
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    return total / this.marks.length;
  }

  // Grade based on the average: A (>=80), B (>=65), C (>=50), F (below 50)
  getGrade() {
    const average = this.calculateAverage();
    if (average >= 80) return "A";
    if (average >= 65) return "B";
    if (average >= 50) return "C";
    return "F";
  }
}

// Test with 3 students
const students = [
  new Student("Aarav", [92, 85, 88, 79, 90]),
  new Student("Diya", [70, 62, 68, 71, 66]),
  new Student("Rohan", [40, 35, 52, 45, 30]),
];

students.forEach((student) => {
  console.log(
    `${student.name}: marks = [${student.marks}] | average = ${student.calculateAverage().toFixed(2)} | grade = ${student.getGrade()}`
  );
});