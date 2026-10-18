// Q3. Monthly Expense Tracker
// Calculates total, average and the final amount after 10% tax.

// Array of expenses for 5 categories
const expenses = [
  { category: "Food",    amount: 6500 },
  { category: "Travel",  amount: 2300 },
  { category: "Rent",    amount: 15000 },
  { category: "Bills",   amount: 3200 },
  { category: "Leisure", amount: 1800 },
];

// Add up all the expenses
let total = 0;
for (let i = 0; i < expenses.length; i++) {
  total += expenses[i].amount;          // assignment operator +=
}

const average = total / expenses.length;

// Add 10% tax using arithmetic + assignment operators
let finalAmount = total;
finalAmount += total * 0.10;            // same as total + 10% of total

console.log("--- Monthly Expense Report ---");
console.log(`Total expenses      : ₹${total.toFixed(2)}`);
console.log(`Average per category: ₹${average.toFixed(2)}`);
console.log(`Final amount (+10% tax): ₹${finalAmount.toFixed(2)}`);