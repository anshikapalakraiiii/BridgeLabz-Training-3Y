// Q5: Ride-Sharing Application

class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }
}

class Driver extends User {
  constructor(name, rating, vehicleModel, vehicleNumber) {
    super(name, rating);
    this.vehicle = { model: vehicleModel, number: vehicleNumber };
  }
}

class Trip {
  static BASE_FARE = 50;     // fixed charge (₹)
  static RATE_PER_KM = 12;   // charge per km (₹)

  constructor(fromLocation, toLocation, distance) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance; // in km
  }

  calculateFare() {
    // distance missing (undefined / null) or not a number
    if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || Number.isNaN(this.distance)) {
      throw new Error("Distance is required to calculate the fare");
    }
    if (this.distance < 0) {
      throw new Error("Distance cannot be negative");
    }
    return Trip.BASE_FARE + this.distance * Trip.RATE_PER_KM;
  }
}

// Demonstration
const driver = new Driver("Suresh", 4.8, "Maruti Swift", "UP85 AB 1234");
console.log(`Driver: ${driver.name} (rating ${driver.rating}) - ${driver.vehicle.model}, ${driver.vehicle.number}`);
console.log(`driver instanceof User: ${driver instanceof User}\n`);

const trips = [
  new Trip("Mathura", "Vrindavan", 12),     // valid
  new Trip("Agra", "Mathura", -5),          // negative distance
  new Trip("Delhi", "Mathura"),             // distance not provided
];

trips.forEach((trip) => {
  try {
    console.log(`${trip.fromLocation} -> ${trip.toLocation}: Fare = ₹${trip.calculateFare()}`);
  } catch (error) {
    console.log(`${trip.fromLocation} -> ${trip.toLocation}: Could not calculate fare. ${error.message}.`);
  }
});