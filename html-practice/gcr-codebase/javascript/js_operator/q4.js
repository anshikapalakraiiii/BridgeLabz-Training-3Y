// Q4. Array Performance Analyzer

// 8 random scores between 30 and 100 (inclusive)
const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

const highest = Math.max(...scores);
const lowest = Math.min(...scores);
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
const passedStudents = scores.filter(s => s >= 50);
const result = scores.map(s => (s >= 50 ? "Pass" : "Fail"));

console.log(`
===== Student Performance Summary =====
Scores          : ${scores.join(", ")}
Highest         : ${highest}
Lowest          : ${lowest}
Average         : ${average.toFixed(2)}
Passed (>= 50)  : ${passedStudents.length} of ${scores.length}
Results         : ${result.join(", ")}
=======================================`);