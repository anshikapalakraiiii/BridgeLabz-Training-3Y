// Q3: Product Discount System (constructor function + prototype + abstraction)

function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Shared by all products through the prototype. Returns the NEW price
// and does not change the original price.
Product.prototype.applyDiscount = function (percent) {
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    throw new Error("Discount must be a number between 0 and 100");
  }
  return this.price - (this.price * percent) / 100;
};

const laptop = new Product("Laptop", 60000);
const headphones = new Product("Headphones", 2500);
const keyboard = new Product("Keyboard", 1500);

// Different discounts for each product
console.log(`${laptop.name}: ₹${laptop.price} -> ₹${laptop.applyDiscount(10)} (10% off)`);
console.log(`${headphones.name}: ₹${headphones.price} -> ₹${headphones.applyDiscount(25)} (25% off)`);
console.log(`${keyboard.name}: ₹${keyboard.price} -> ₹${keyboard.applyDiscount(40)} (40% off)`);

// ---------- How ABSTRACTION helps ----------
// The caller only says WHAT it wants ("apply 20% discount"). The formula
// (price - price * percent / 100) and the validation are HIDDEN inside applyDiscount().
// If the discount logic changes later (e.g. a maximum discount cap), we change
// ONE place and every caller keeps working unchanged.
const cart = [laptop, headphones, keyboard];
const totalAfterSale = cart.reduce((sum, product) => sum + product.applyDiscount(20), 0);
console.log(`\nCart total after 20% sale on everything: ₹${totalAfterSale}`);

// The abstraction also protects us from bad input
try {
  laptop.applyDiscount(150);
} catch (error) {
  console.log(`Error: ${error.message}`);
}