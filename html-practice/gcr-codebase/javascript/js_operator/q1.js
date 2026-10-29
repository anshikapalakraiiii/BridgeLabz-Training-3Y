// Q1. Scope Conflict Resolver

// Global variable: visible everywhere in the script
var bonus = 5000;

function calculateSalary(isPermanent) {
  // Local variable: exists only inside this function
  const salary = 40000;
  let totalSalary = salary;

  // Add the global bonus only for permanent employees
  if (isPermanent) {
    totalSalary += bonus;
  }

  console.log(`isPermanent = ${isPermanent} -> Total salary: ${totalSalary}`);
  return totalSalary;
}

// Permanent vs. non-permanent: only the local result changes
calculateSalary(true);   // 45000
calculateSalary(false);  // 40000

// Demonstrate scope: the global is untouched, locals are not visible outside
console.log("Global bonus after both calls:", bonus); // still 5000
console.log("salary visible outside function?", typeof salary !== "undefined"); // false
console.log("isPermanent visible outside function?", typeof isPermanent !== "undefined"); // false