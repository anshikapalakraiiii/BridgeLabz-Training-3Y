// Q8: Movie Ticket Booking System

class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// Method added to MovieTicket.prototype AFTER the classes are defined.
// Every MovieTicket object AND every OnlineTicket object can use it.
MovieTicket.prototype.printTicket = function () {
  console.log(`Ticket -> Movie: ${this.movieName} | Seat: ${this.seatNo} | Price: ₹${this.price}`);
};

const ticket1 = new OnlineTicket("Inception", "A12", 300, 30);
const ticket2 = new OnlineTicket("Interstellar", "C05", 350, 40);
const counterTicket = new MovieTicket("Dangal", "F10", 200);

// OnlineTicket objects use printTicket() found up the prototype chain
ticket1.printTicket();
ticket2.printTicket();
counterTicket.printTicket();

console.log(`\n${ticket1.movieName} total amount: ₹${ticket1.getTotalAmount()}`);
console.log(`${ticket2.movieName} total amount: ₹${ticket2.getTotalAmount()}`);

// ---------- Prototype chain proof ----------
// ticket1 -> OnlineTicket.prototype -> MovieTicket.prototype -> Object.prototype -> null
console.log("\nprintTicket is own property of ticket1?", ticket1.hasOwnProperty("printTicket")); // false
console.log("Found on MovieTicket.prototype?", MovieTicket.prototype.hasOwnProperty("printTicket")); // true
console.log("OnlineTicket.prototype's parent is MovieTicket.prototype?",
  Object.getPrototypeOf(OnlineTicket.prototype) === MovieTicket.prototype); // true
console.log("ticket1.printTicket === counterTicket.printTicket?",
  ticket1.printTicket === counterTicket.printTicket); // true (one shared function)