"use strict";
// Q2 – Student Form Validator (Forms + RegExp). Open q2_student_form.html in a browser.

const rules = {
  name:     { regex: /^[A-Za-z]+(\s[A-Za-z]+)*$/, message: "Name must contain alphabets only (spaces between words allowed)." },
  email:    { regex: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, message: "Enter a valid email like example@domain.com." },
  phone:    { regex: /^\d{10}$/, message: "Phone must be exactly 10 digits." },
  // Lookaheads: at least one uppercase, one digit, one special character
  password: { regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, message: "Password needs 1 uppercase letter, 1 number and 1 special character." }
};

// Validates one input: green border + clear message if OK, red border + message if not
function validateField(id) {
  const input = document.getElementById(id);
  const errorBox = document.getElementById(`${id}-error`);
  const value = id === "password" ? input.value : input.value.trim(); // don't trim passwords
  const isValid = rules[id].regex.test(value);

  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  errorBox.textContent = isValid ? "" : rules[id].message;
  return isValid;
}

const form = document.getElementById("student-form");
const result = document.getElementById("result");

Object.keys(rules).forEach((id) => {
  document.getElementById(id).addEventListener("input", () => validateField(id)); // live feedback
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // map() (not some/every) so every field gets validated and highlighted
  const allValid = Object.keys(rules).map(validateField).every(Boolean);
  result.textContent = allValid ? "✔ Registration successful!" : "";
});