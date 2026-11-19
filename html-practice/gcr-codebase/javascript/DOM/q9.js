// Q9: Form Submit Blocker with preventDefault() and Live Errors

const form = document.getElementById("register-form");
const successMessage = document.getElementById("success-message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Validation rules: each returns an error message, or "" when the value is valid
const rules = [
  {
    input: nameInput,
    errorElement: document.getElementById("name-error"),
    validate: (value) => (value.trim() === "" ? "Name is required." : ""),
  },
  {
    input: emailInput,
    errorElement: document.getElementById("email-error"),
    validate: (value) => {
      if (value.trim() === "") return "Email is required.";
      if (!value.includes("@")) return "Email must contain @.";
      return "";
    },
  },
  {
    input: passwordInput,
    errorElement: document.getElementById("password-error"),
    validate: (value) => (value.length < 6 ? "Password must be at least 6 characters." : ""),
  },
];

// Validate one field, show/clear its inline error, and return true if valid
function checkField(rule) {
  const message = rule.validate(rule.input.value);
  rule.errorElement.textContent = message;
  rule.input.classList.toggle("invalid", message !== "");
  return message === "";
}

form.addEventListener("submit", (event) => {
  // Stop the browser's default submit (page reload) - always, since there is no server here
  event.preventDefault();
  successMessage.hidden = true;

  // Check EVERY field (don't stop at the first error) so all errors show together
  const results = rules.map(checkField);
  const formIsValid = results.every(Boolean);

  if (formIsValid) {
    successMessage.hidden = false; // "Form Submitted Successfully"
    form.reset();
  }
});

// Live errors: once a field shows an error, re-check it on every keystroke so the
// error disappears automatically as soon as the value is corrected.
rules.forEach((rule) => {
  rule.input.addEventListener("input", () => {
    successMessage.hidden = true;
    if (rule.errorElement.textContent !== "") checkField(rule);
  });
});