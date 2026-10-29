"use strict";
// Q6 – Employee Management System (Classes + Object Methods)
// Run: node q6_employee_management.js
// `salary` is the MONTHLY salary, so annual = salary * 12.

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }

  // Increases the monthly salary by the given percentage
  applyBonus(percent) {
    if (percent <= 0) throw new RangeError("Bonus percent must be positive");
    this.salary = Number((this.salary * (1 + percent / 100)).toFixed(2));
  }
}

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const employees = [
  new Employee(101, "Amit", "Engineering", 60000),
  new Employee(102, "Sara", "Design", 45000),
  new Employee(103, "Kiran", "Engineering", 72000),
  new Employee(104, "Neha", "HR", 38000),
  new Employee(105, "Ravi", "Sales", 42000)
];

function printAnnual(title) {
  console.log(`\n=== ${title} ===`);
  employees.forEach((e) =>
    console.log(`${e.id} | ${e.name.padEnd(6)} | ${e.department.padEnd(12)} | Annual: ${inr(e.getAnnualSalary())}`)
  );
  // reduce() adds up every employee's annual salary
  const totalPayout = employees.reduce((sum, e) => sum + e.getAnnualSalary(), 0);
  console.log(`Total annual payout: ${inr(totalPayout)}`);
}

printAnnual("Annual salaries");

employees.filter((e) => e.department === "Engineering").forEach((e) => e.applyBonus(10));
printAnnual("After 10% bonus for Engineering");