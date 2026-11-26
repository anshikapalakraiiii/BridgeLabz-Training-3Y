// Q6: E-Commerce Inventory System (filter, sort, reduce)

const products = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 15000, stock: 4 },
  { id: 2, name: "Laptop", category: "Electronics", price: 55000, stock: 12 },
  { id: 3, name: "T-Shirt", category: "Clothing", price: 499, stock: 3 },
  { id: 4, name: "Jeans", category: "Clothing", price: 1299, stock: 25 },
  { id: 5, name: "Novel", category: "Books", price: 350, stock: 2 },
  { id: 6, name: "Cookbook", category: "Books", price: 650, stock: 18 },
  { id: 7, name: "Headphones", category: "Electronics", price: 2500, stock: 8 },
];

// 1. filter(): products whose stock is at or below the limit (default 5)
function getLowStockProducts(items, limit = 5) {
  return items.filter((product) => product.stock <= limit);
}

// 2. sort(): cheapest first. A copy is sorted so the original array stays unchanged.
function sortProductsByPrice(items) {
  return [...items].sort((a, b) => a.price - b.price);
}

// 3. reduce(): total value of all stock = sum of (price × stock)
function calculateTotalInventoryValue(items) {
  return items.reduce((total, product) => total + product.price * product.stock, 0);
}

// 4. reduce() + object grouping: { Electronics: [...], Clothing: [...], ... }
function groupByCategory(items) {
  return items.reduce((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = []; // first product of this category
    }
    groups[product.category].push(product);
    return groups;
  }, {});
}

// ---------- Tests ----------
console.log("Low stock products (stock <= 5):");
console.table(getLowStockProducts(products), ["id", "name", "stock"]);

console.log("Sorted by price (low to high):");
console.table(sortProductsByPrice(products), ["id", "name", "price"]);

console.log(`Total inventory value: ₹${calculateTotalInventoryValue(products)}\n`);

console.log("Grouped by category:");
const grouped = groupByCategory(products);
Object.entries(grouped).forEach(([category, items]) => {
  console.log(`  ${category}: ${items.map((p) => p.name).join(", ")}`);
});