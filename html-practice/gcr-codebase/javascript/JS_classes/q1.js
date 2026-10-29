"use strict";

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.originalPrice = price;
    this.category = category;
  }

  applyDiscount(percent = 10) {
    if (percent <= 0 || percent >= 100) {
      throw new RangeError("Discount must be between 1 and 99");
    }

    this.price = Number((this.price * (1 - percent / 100)).toFixed(2));
    return this.price;
  }

  getDetails() {
    const priceText = `₹${this.price.toLocaleString("en-IN")}`;
    const was =
      this.price < this.originalPrice
        ? ` (was ₹${this.originalPrice.toLocaleString("en-IN")})`
        : "";

    return `#${this.id} | ${this.name.padEnd(18)} | ${this.category.padEnd(12)} | ${priceText}${was}`;
  }
}

const products = [
  new Product(1, "Laptop", 55000, "Electronics"),
  new Product(2, "Wireless Mouse", 799, "Accessories"),
  new Product(3, "Smartphone", 24999, "Electronics"),
  new Product(4, "Notebook Pack", 350, "Stationery"),
  new Product(5, "Office Chair", 7500, "Furniture"),
  new Product(6, "USB Cable", 299, "Accessories")
];

console.log("=== All products ===");
products.forEach((p) => console.log(p.getDetails()));

console.log("\n=== Products with price > 1000 (filter) ===");
products
  .filter((p) => p.price > 1000)
  .forEach((p) => console.log(p.getDetails()));

console.log("\n=== After 10% discount on Smartphone ===");
const phone = products.find((p) => p.name === "Smartphone");

if (phone) {
  phone.applyDiscount(10);
  console.log(phone.getDetails());
}