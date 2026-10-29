// Q8. Dynamic Discount Evaluator

const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

function evaluateCart(cart) {
  // Original cart value (before any discount) decides the extra 5% offer
  const originalTotal = cart.reduce((sum, product) => sum + product.price, 0);

  // Category discounts applied per item
  const discountedItems = cart.map(product => {
    let rate = 0;
    if (product.category === "electronics") {
      rate = 0.10;
    } else if (product.category === "fashion") {
      rate = 0.05;
    }
    const finalPrice = product.price - product.price * rate;
    console.log(`${product.item.padEnd(8)} ${product.price} -> ${finalPrice} (${rate * 100}% off)`);
    return finalPrice;
  });

  let total = discountedItems.reduce((sum, p) => sum + p, 0);

  // Extra 5% overall if the cart value exceeds 50000
  if (originalTotal > 50000) {
    total = total * 0.95;
    console.log("Extra 5% overall discount applied");
  }

  console.log(`Original total: ${originalTotal}`);
  console.log(`Final total   : ${total}\n`);
}

evaluateCart(cart);

// Extra test: a bigger cart that triggers the extra 5%
evaluateCart([...cart, { item: "Phone", category: "electronics", price: 20000 }]);