// Q3: Multi-Step Form with Next / Back and Validation

const form = document.getElementById("multi-step-form");
const steps = document.querySelectorAll(".step");
const progress = document.getElementById("progress");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const summary = document.getElementById("summary");
const restartButton = document.getElementById("restart-button");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

let currentStep = 0;
const lastStep = steps.length - 1;

// One validator per step. Each returns an error message, or "" when valid.
const validators = [
  () => (nameInput.value.trim().length < 2 ? "Please enter your name (at least 2 characters)." : ""),
  () => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) ? "" : "Please enter a valid email address."),
  () => (passwordInput.value.length < 6 ? "Password must be at least 6 characters." : ""),
];

// Show only the current step and update buttons / progress text
function showStep(index) {
  steps.forEach((step, i) => {
    step.hidden = i !== index;
  });
  backButton.hidden = index === 0;                       // no Back on the first step
  nextButton.textContent = index === lastStep ? "Finish" : "Next";
  progress.textContent = `Step ${index + 1} of ${steps.length}`;
  steps[index].querySelector("input").focus();
}

function showError(message) {
  steps[currentStep].querySelector(".error").textContent = message;
}

// "Next" only moves ahead when the current step is valid
function goNext() {
  const errorMessage = validators[currentStep]();
  showError(errorMessage);
  if (errorMessage) return; // stay on this step

  if (currentStep < lastStep) {
    currentStep++;
    showStep(currentStep);
  } else {
    showSummary(); // all 3 steps complete
  }
}

function goBack() {
  if (currentStep > 0) {
    showError("");
    currentStep--;
    showStep(currentStep);
  }
}

function showSummary() {
  document.getElementById("summary-name").textContent = nameInput.value.trim();
  document.getElementById("summary-email").textContent = emailInput.value.trim();
  document.getElementById("summary-password").textContent = "•".repeat(passwordInput.value.length); // never show the real password
  form.hidden = true;
  progress.textContent = "All steps complete";
  summary.hidden = false;
}

function restart() {
  form.reset();
  form.hidden = false;
  summary.hidden = true;
  steps.forEach((step) => (step.querySelector(".error").textContent = ""));
  currentStep = 0;
  showStep(0);
}

nextButton.addEventListener("click", goNext);
backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", restart);

// Pressing Enter inside an input should act like "Next" (not reload the page)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  goNext();
});

// Clear the error as soon as the user edits the field
form.addEventListener("input", () => showError(""));

showStep(0);