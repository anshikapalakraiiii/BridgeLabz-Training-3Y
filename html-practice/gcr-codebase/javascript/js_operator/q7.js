// Q7. Customer Feedback Processor

const feedback = "Great product! Fast delivery and amazing sound quality!";

// Count words (split on whitespace, ignore empty pieces)
const wordCount = feedback.trim().split(/\s+/).length;

// Check for negative words (case-insensitive)
const lower = feedback.toLowerCase();
const hasNegative = lower.includes("bad") || lower.includes("poor");

console.log("Feedback  :", feedback);
console.log("Word count:", wordCount);

if (!hasNegative) {
  console.log("Positive Feedback");
} else {
  console.log("Needs Improvement");
}