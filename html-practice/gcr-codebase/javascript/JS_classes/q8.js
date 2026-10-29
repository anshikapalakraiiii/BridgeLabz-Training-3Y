"use strict";
// Q8 – Dynamic Object Updater. Open q8_object_updater.html in a browser.

const user = { name: "John", email: "john@mail.com", age: 21 };

const form = document.getElementById("user-form");
const output = document.getElementById("user-output");
const details = document.getElementById("user-details");

// Fill the inputs from the object, and redraw the display below the form
function render() {
  for (const key of Object.keys(user)) form.elements[key].value = user[key];
  output.textContent = JSON.stringify(user, null, 2);

  details.innerHTML = "";
  for (const [key, value] of Object.entries(user)) {
    const row = document.createElement("p");
    row.textContent = `${key}: ${value}`; // textContent avoids HTML injection
    details.appendChild(row);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Update the object from the form values; age is converted back to a Number
  user.name = form.elements.name.value.trim();
  user.email = form.elements.email.value.trim();
  user.age = Number(form.elements.age.value);
  render(); // display refreshes immediately, no page reload
  console.log("Updated user:", user);
});

render();