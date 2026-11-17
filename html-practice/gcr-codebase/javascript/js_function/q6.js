// Q6: Prototype chain  Person -> Faculty -> Professor

function Person(name) {
  this.name = name;
}
Person.prototype.introduce = function () {
  console.log(`Hi, I am ${this.name}.`);
};

function Faculty(name, department) {
  Person.call(this, name);
  this.department = department;
}
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.showDepartment = function () {
  console.log(`Department: ${this.department}`);
};

function Professor(name, department, researchArea) {
  Faculty.call(this, name, department);
  this.researchArea = researchArea;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.showResearch = function () {
  console.log(`Research Area: ${this.researchArea}`);
};

// Demonstration: a Professor can use ALL methods up the chain
const prof = new Professor("Dr. Sharma", "Computer Science", "Artificial Intelligence");

prof.introduce();       // Person.prototype
prof.showDepartment();  // Faculty.prototype
prof.showResearch();    // Professor.prototype

console.log("instanceof Professor:", prof instanceof Professor); // true
console.log("instanceof Faculty  :", prof instanceof Faculty);   // true
console.log("instanceof Person   :", prof instanceof Person);    // true
// Chain: prof -> Professor.prototype -> Faculty.prototype -> Person.prototype -> Object.prototype -> null