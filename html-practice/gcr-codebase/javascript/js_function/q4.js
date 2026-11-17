// Q4: Constructor function + prototype method sharing

function Car(brand, model) {
  this.brand = brand;   // own properties: separate for every object
  this.model = model;
}

// Method on the prototype: stored ONCE and shared by all Car objects
Car.prototype.getDetails = function () {
  console.log(`Brand: ${this.brand}, Model: ${this.model}`);
};

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Hyundai", "Creta");

car1.getDetails(); // Brand: Toyota, Model: Fortuner
car2.getDetails(); // Brand: Hyundai, Model: Creta

// Proof of method sharing via prototype
console.log("Same method shared?", car1.getDetails === car2.getDetails);          // true
console.log("Method is own property of car1?", car1.hasOwnProperty("getDetails")); // false
console.log("Both share Car.prototype?", Object.getPrototypeOf(car1) === Car.prototype &&
                                          Object.getPrototypeOf(car2) === Car.prototype); // true