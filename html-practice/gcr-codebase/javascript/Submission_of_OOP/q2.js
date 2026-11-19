// Q2: Online Food Ordering (map + reduce + Error Handling)

const menu = [
  { name: "Burger", price: 120 },
  { name: "Pizza", price: 250 },
  { name: "Pasta", price: 180 },
  { name: "Coke", price: 50 },
];

function calculateBill(orderItems) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("Your order is empty. Please select at least one item.");
  }

  // map(): turn each ordered item NAME into its PRICE
  const priceList = orderItems.map((itemName) => {
    const menuItem = menu.find((item) => item.name.toLowerCase() === String(itemName).toLowerCase());
    if (!menuItem) {
      throw new Error(`"${itemName}" is not on the menu.`); // invalid item
    }
    return menuItem.price;
  });

  // reduce(): add all prices into a total
  return priceList.reduce((total, price) => total + price, 0);
}

// Test cases (try-catch shows meaningful messages)
const orders = [
  ["Burger", "Coke"],               // valid
  ["Pizza", "Pasta", "Coke"],       // valid
  ["Burger", "Sushi"],              // invalid item
  [],                               // empty order
];

orders.forEach((order, index) => {
  try {
    const total = calculateBill(order);
    console.log(`Order ${index + 1} [${order.join(", ")}] -> Total bill: ₹${total}`);
  } catch (error) {
    console.log(`Order ${index + 1} [${order.join(", ")}] -> Error: ${error.message}`);
  }
});