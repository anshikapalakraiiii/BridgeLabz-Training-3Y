"use strict";
// Q9 – Shopping Cart Total (Classes + RegExp for Coupon)
// Run: node q9_shopping_cart.js

class Cart {
  // Coupon = SAVE or DISC followed by exactly two digits, e.g. SAVE20, DISC10
  static COUPON_PATTERN = /^(SAVE|DISC)(\d{2})$/;

  constructor() {
    this.items = [];
    this.discountPercent = 0;
  }

  addItem(name, price, quantity = 1) {
    if (price < 0 || quantity < 1) throw new RangeError("Invalid price or quantity");
    this.items.push({ name, price, quantity });
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  applyCoupon(code) {
    const match = Cart.COUPON_PATTERN.exec(code.trim());
    if (!match) {
      this.discountPercent = 0;
      return { valid: false, message: `Invalid coupon "${code}". Use a format like SAVE20 or DISC10.` };
    }
    this.discountPercent = Number(match[2]); // captured digits = % off
    return { valid: true, message: `Coupon ${code} applied: ${this.discountPercent}% off.` };
  }

  getFinalTotal() {
    return this.getTotal() * (1 - this.discountPercent / 100);
  }
}

const money = (n) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

function checkout(couponCode) {
  const cart = new Cart();
  cart.addItem("Keyboard", 1500, 1);
  cart.addItem("USB Cable", 299, 3);
  cart.addItem("Mouse Pad", 250, 2);

  console.log(`\n--- Coupon: "${couponCode}" ---`);
  cart.items.forEach((i) => console.log(`${i.name.padEnd(10)} ${i.quantity} x ${money(i.price)}`));
  console.log(`Subtotal   : ${money(cart.getTotal())}`);
  const result = cart.applyCoupon(couponCode);
  console.log(result.message);
  console.log(`Final total: ${money(cart.getFinalTotal())}`);
}

["SAVE20", "DISC10", "save20", "FREE50", "SAVE5"].forEach(checkout);