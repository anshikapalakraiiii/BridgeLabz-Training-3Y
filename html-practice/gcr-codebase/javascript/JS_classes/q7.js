"use strict";
// Q7 – Login Form Validation using RegExp. Open q7_login_form.html in a browser.

// Each rule has its own RegExp + its own message, so we can report EVERY problem specifically
const usernameRules = [
  { regex: /^.{5,}$/, message: "Username must be at least 5 characters." }
];
const passwordRules = [
  { regex: /^.{8,}$/, message: "Password must be at least 8 characters." },
  { regex: /\d/, message: "Password must include a number." },
  { regex: /[A-Z]/, message: "Password must include an uppercase letter." },
  { regex: /[a-z]/, message: "Password must include a lowercase letter." },
  { regex: /[^A-Za-z0-9]/, message: "Password must include a special character." }
];

// Returns the list of messages for rules that FAILED
const getErrors = (value, rules) => rules.filter((r) => !r.regex.test(value)).map((r) => r.message);

function showErrors(id, errors) {
  const input = document.getElementById(id);
  const box = document.getElementById(`${id}-error`);
  input.classList.toggle("valid", errors.length === 0);
  input.classList.toggle("invalid", errors.length > 0);
  box.innerHTML = "";
  errors.forEach((message) => {
    const line = document.createElement("div");
    line.textContent = message;
    box.appendChild(line);
  });
}

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const usernameErrors = getErrors(document.getElementById("username").value, usernameRules);
  const passwordErrors = getErrors(document.getElementById("password").value, passwordRules);
  showErrors("username", usernameErrors);
  showErrors("password", passwordErrors);

  document.getElementById("result").textContent =
    usernameErrors.length === 0 && passwordErrors.length === 0 ? "✔ Login successful!" : "";
});