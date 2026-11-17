// Q5: Prototypal inheritance - Person -> Student

function Person(name) {
  this.name = name;
}
Person.prototype.printName = function () {
  console.log(`Name: ${this.name}`);
};

function Student(name, branch) {
  Person.call(this, name);   // inherit Person's properties (name)
  this.branch = branch;
}

// Link prototype chain: Student.prototype -> Person.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;  // restore constructor reference

Student.prototype.printBranch = function () {
  console.log(`Branch: ${this.branch}`);
};

// Demonstration
const s1 = new Student("Neha", "Computer Science");
s1.printName();    // from Person.prototype (found up the chain)
s1.printBranch();  // from Student.prototype

console.log("s1 instanceof Student:", s1 instanceof Student); // true
console.log("s1 instanceof Person :", s1 instanceof Person);  // true
console.log("Student.prototype is s1's proto:", Object.getPrototypeOf(s1) === Student.prototype); // true
console.log("Person.prototype is next in chain:",
  Object.getPrototypeOf(Student.prototype) === Person.prototype);                                   // true
console.log("printName own property of s1?", s1.hasOwnProperty("printName"));                       // false
// Chain: s1 -> Student.prototype -> Person.prototype -> Object.prototype -> null