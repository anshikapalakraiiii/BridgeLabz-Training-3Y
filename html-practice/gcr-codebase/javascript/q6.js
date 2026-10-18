// Q6. Progressive Discount System
// Applies a discount tier based on the total purchase amount.

const totalAmount = 6200;  // test purchase amount (₹)

let discountPercent;

if (totalAmount >= 10000) {
  discountPercent = 25;
} else if (totalAmount >= 5000) {
  discountPercent = 15;
} else if (totalAmount >= 2000) {
  discountPercent = 5;
} else {
  discountPercent = 0;
}

const discountAmount = (totalAmount * discountPercent) / 100;
const finalPrice = Math.round(totalAmount - discountAmount); // rounded price

console.log(`Original total      : ₹${totalAmount}`);
console.log(`Discount percentage : ${discountPercent}%`);
console.log(`Final price         : ₹${finalPrice}`);