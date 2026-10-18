// Q2. Multi-Type Data Summary
// Declares variables of different types and prints one formatted console.table().

const userName = "Priya Sharma";
const userAge = 28;
const isActive = true;
const hobbies = ["reading", "cycling", "coding"];
const address = { city: "Mathura", state: "Uttar Pradesh" };
const middleName = null;
let phoneNumber;                        // undefined (declared, never assigned)

// Helper: returns an accurate type label.
// typeof gives "object" for arrays and null, so we handle those separately.
function getType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

// Each entry: label + value + type
const entries = [
  ["userName", userName],
  ["userAge", userAge],
  ["isActive", isActive],
  ["hobbies", hobbies],
  ["address", address],
  ["middleName", middleName],
  ["phoneNumber", phoneNumber],
];

const report = entries.map(([label, value]) => ({
  Label: label,
  Value: Array.isArray(value) || (typeof value === "object" && value !== null)
    ? JSON.stringify(value)             // readable form for array/object
    : String(value),
  Type: getType(value),
}));

// Single console.table() statement
console.table(report);