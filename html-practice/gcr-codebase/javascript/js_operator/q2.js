// Q2. String Manipulation Report

const rawTitle = "  wireless headphones PRO  ";

// Step 1: trim spaces and convert to lowercase
const trimmedLower = rawTitle.trim().toLowerCase();

// Step 2: split into words, capitalize each word, join back
const capitalized = trimmedLower
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

// Step 3: replace "Pro" with "Pro Edition" (case-insensitive, whole word)
const cleanTitle = capitalized.replace(/\bpro\b/i, "Pro Edition");

console.log("Original  :", `"${rawTitle}"`);
console.log("Clean     :", cleanTitle);
console.log("Length    :", cleanTitle.length);