// Q6: E-Commerce Dashboard - Product Card Fetcher (console version)
// Requires Node.js 18+ (built-in fetch) or a browser console.
// For the bonus HTML product cards, open q6_productDashboard.html in a browser.

const API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    // fetch() only rejects on network errors, so check HTTP status ourselves
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    products.forEach((product) => {
      console.log(`Product: ${product.title}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log(""); // blank line between products
    });
  } catch (error) {
    console.log("Failed to load products. Please try again.");
    console.error(error.message); // technical detail for debugging
  }
}

fetchProducts();