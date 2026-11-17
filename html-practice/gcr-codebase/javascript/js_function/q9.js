// Q9: ES6 classes (extends + super) vs prototype version

// ---------- Prototype version ----------
function ProtoPerson(name) {
  this.name = name;
}
ProtoPerson.prototype.printName = function () {
  console.log(`Name: ${this.name}`);
};

function ProtoStudent(name, branch) {
  ProtoPerson.call(this, name);
  this.branch = branch;
}
ProtoStudent.prototype = Object.create(ProtoPerson.prototype);
ProtoStudent.prototype.constructor = ProtoStudent;
ProtoStudent.prototype.printBranch = function () {
  console.log(`Branch: ${this.branch}`);
};

// ---------- ES6 class version ----------
class Person {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(`Name: ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, branch) {
    super(name);          // calls Person's constructor
    this.branch = branch;
  }
  printBranch() {
    console.log(`Branch: ${this.branch}`);
  }
}

// ---------- Compare behaviour ----------
const protoStudent = new ProtoStudent("Neha", "Computer Science");
const classStudent = new Student("Neha", "Computer Science");

console.log("--- Prototype version ---");
protoStudent.printName();
protoStudent.printBranch();

console.log("--- Class version ---");
classStudent.printName();
classStudent.printBranch();

console.log("--- Proof they behave the same ---");
console.log("Same own properties:",
  JSON.stringify(protoStudent) === JSON.stringify(classStudent));                         // true
console.log("Proto instanceof Person chain:", protoStudent instanceof ProtoPerson);       // true
console.log("Class instanceof Person chain:", classStudent instanceof Person);            // true
console.log("Proto methods on prototype:", !protoStudent.hasOwnProperty("printName"));    // true
console.log("Class methods on prototype:", !classStudent.hasOwnProperty("printName"));    // true
console.log("Same chain shape:",
  Object.getPrototypeOf(Object.getPrototypeOf(protoStudent)) === ProtoPerson.prototype &&
  Object.getPrototypeOf(Object.getPrototypeOf(classStudent)) === Person.prototype);       // true
console.log("typeof Student:", typeof Student); // 'function' - classes are syntactic sugar