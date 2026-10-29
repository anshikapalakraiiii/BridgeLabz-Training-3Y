// Q10. Departmental Employee Evaluator

const departments = [
  ["HR", 72],
  ["Finance", 88],
  ["Tech", 95],
  ["Support", 63]
];

for (let i = 0; i < departments.length; i++) {
  const name = departments[i][0];
  const score = departments[i][1];
  let rating;

  if (score >= 90) {
    rating = "Excellent";
  } else {
    if (score >= 75) {
      rating = "Good";
    } else {
      if (score >= 60) {
        rating = "Average";
      } else {
        rating = "Needs Improvement";
      }
    }
  }

  console.log(`${name} (${score}): ${rating}`);
}