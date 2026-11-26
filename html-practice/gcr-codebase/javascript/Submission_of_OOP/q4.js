// Q4: Employee Inheritance and Runtime Polymorphism

class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    return `${this.name} (${this.department}) is doing general office work.`;
  }
}

// Manager inherits from Employee and OVERRIDES work()
class Manager extends Employee {
  work() {
    return `${this.name} (${this.department}) is managing the team and planning projects.`;
  }
}

// Another subclass, to make polymorphism clearer
class Developer extends Employee {
  work() {
    return `${this.name} (${this.department}) is writing and reviewing code.`;
  }
}

const employee = new Employee("Ravi", "Admin");
const manager = new Manager("Sunita", "Sales");
const developer = new Developer("Karan", "IT");

// ---------- Runtime polymorphism ----------
// The SAME call, person.work(), runs different code depending on the actual
// object type. JavaScript decides which work() to run at RUN TIME, by looking
// up the prototype chain of each object.
[employee, manager, developer].forEach((person) => {
  console.log(person.work());
});

console.log("\nmanager instanceof Manager :", manager instanceof Manager);
console.log("manager instanceof Employee:", manager instanceof Employee);