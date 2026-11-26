// Q8: Custom Dropdown Using Only JavaScript (no <select>)

const dropdown = document.getElementById("dropdown");
const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const selectionMessage = document.getElementById("selection-message");

function openMenu() {
  dropdownMenu.hidden = false;
  dropdownButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  dropdownMenu.hidden = true;
  dropdownButton.setAttribute("aria-expanded", "false");
}

// The button shows / hides the options
dropdownButton.addEventListener("click", () => {
  if (dropdownMenu.hidden) openMenu();
  else closeMenu();
});

// Clicking an option updates the button text, then closes the menu
dropdownMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    dropdownButton.textContent = event.target.textContent;
    selectionMessage.textContent = `You selected: ${event.target.textContent}`;
    closeMenu();
  }
});

// Clicking OUTSIDE closes the menu.
// The third argument `true` registers this listener in the CAPTURING phase:
// the event travels from the top (document) DOWN to the target first, so this
// handler runs BEFORE any bubbling-phase handler on the page. That means the
// dropdown closes reliably even if another element calls stopPropagation()
// (like the modal in Q5 does).
document.addEventListener(
  "click",
  (event) => {
    const clickedInsideDropdown = dropdown.contains(event.target);
    if (!dropdownMenu.hidden && !clickedInsideDropdown) {
      closeMenu();
    }
  },
  true // <-- capture = true
);

// Bonus: Escape key closes the menu
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});