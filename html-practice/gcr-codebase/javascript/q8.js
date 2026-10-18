// Q8. Employee Salary Projection
// Projects the salary for the next 5 years with a yearly increment.

const currentSalary = 500000;   // current annual salary
const incrementRate = 8;        // annual increment in %

let salary = currentSalary;
const projection = [];

for (let year = 1; year <= 5; year++) {
  salary += salary * (incrementRate / 100);          // assignment operator +=
  salary = Math.round(salary * 100) / 100;           // round to 2 decimals

  projection.push({
    Year: year,
    "Increment (%)": incrementRate,
    "Projected Salary": salary,
  });
}

console.log(`Starting salary: ${currentSalary}`);
console.table(projection);