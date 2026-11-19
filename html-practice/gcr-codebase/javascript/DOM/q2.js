// Q2: Live Character Counter with Warning Behaviour

const MAX_CHARACTERS = 100;
const WARNING_THRESHOLD = 20; // counter turns yellow when 20 or fewer characters remain

const messageBox = document.getElementById("message-box");
const counter = document.getElementById("counter");
const resetButton = document.getElementById("reset-button");

// Recalculate remaining characters and update text + colour class
function updateCounter() {
  const remaining = MAX_CHARACTERS - messageBox.value.length;
  counter.textContent = `${remaining} characters remaining`;

  counter.classList.remove("warning", "danger");
  if (remaining <= 0) {
    counter.classList.add("danger");              // red at 0
  } else if (remaining <= WARNING_THRESHOLD) {
    counter.classList.add("warning");             // yellow at <= 20
  }
}

// Block typing once the limit is reached. We deliberately do NOT use the HTML
// maxlength attribute, because the assignment wants preventDefault().
messageBox.addEventListener("keydown", (event) => {
  const atLimit = messageBox.value.length >= MAX_CHARACTERS;
  const hasSelection = messageBox.selectionStart !== messageBox.selectionEnd; // typing would replace it

  // A key that would ADD text: a single character (not a shortcut like Ctrl+C) or Enter
  const addsText =
    (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) ||
    event.key === "Enter";

  // Backspace, Delete, arrows etc. are still allowed so the user can edit
  if (atLimit && !hasSelection && addsText) {
    event.preventDefault();
  }
});

// Safety net: pasting (or mobile keyboards) can bypass keydown, so trim any overflow
messageBox.addEventListener("input", () => {
  if (messageBox.value.length > MAX_CHARACTERS) {
    messageBox.value = messageBox.value.slice(0, MAX_CHARACTERS);
  }
  updateCounter();
});

// Reset clears the text and the counter state
resetButton.addEventListener("click", () => {
  messageBox.value = "";
  updateCounter();
  messageBox.focus();
});

updateCounter();