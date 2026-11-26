// Q4: Theme Switcher Using Attribute Manipulation

const themeButtons = document.querySelectorAll("[data-theme-value]");
const themeLabel = document.getElementById("theme-label");
const attributeLabel = document.getElementById("attribute-label");

function applyTheme(themeName) {
  // 1. Add the theme class to <body> USING setAttribute() (as required).
  //    setAttribute("class", ...) replaces the whole class attribute, so the
  //    previous theme class is removed automatically.
  document.body.setAttribute("class", `theme-${themeName}`);

  // 2. Save the current theme in a custom data attribute: data-theme="dark"
  document.body.setAttribute("data-theme", themeName);

  // 3. Update the on-screen labels
  themeLabel.textContent = themeName;
  attributeLabel.textContent = `data-theme="${document.body.getAttribute("data-theme")}"`;

  // 4. Mark the active button (also done with setAttribute)
  themeButtons.forEach((button) => {
    const isActive = button.getAttribute("data-theme-value") === themeName;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.getAttribute("data-theme-value"));
  });
});

applyTheme("light"); // default theme