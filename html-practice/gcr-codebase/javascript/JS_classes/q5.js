"use strict";
// Q5 – Movie Ticket Booking (Objects + RegExp). Open q5_movie_booking.html in a browser.

const rules = {
  name:  { regex: /^[A-Za-z]+(\s[A-Za-z]+)*$/, message: "Name must contain alphabets only." },
  email: { regex: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, message: "Enter a valid email like example@domain.com." },
  seats: { regex: /^([1-9]|10)$/, message: "Seats must be a number from 1 to 10." } // 1-9 or 10
};

function validateField(id) {
  const input = document.getElementById(id);
  const isValid = rules[id].regex.test(input.value.trim());
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  document.getElementById(`${id}-error`).textContent = isValid ? "" : rules[id].message;
  return isValid;
}

Object.keys(rules).forEach((id) =>
  document.getElementById(id).addEventListener("input", () => validateField(id))
);

document.getElementById("booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const ticketBox = document.getElementById("ticket");
  const allValid = Object.keys(rules).map(validateField).every(Boolean);
  if (!allValid) { ticketBox.hidden = true; return; }

  // Store the booking in an object, then display it
  const booking = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    seats: Number(document.getElementById("seats").value)
  };
  console.log("Booking stored:", booking);

  ticketBox.hidden = false;
  ticketBox.innerHTML = "<strong>🎟 Ticket Confirmed</strong><br>";
  for (const [key, value] of Object.entries(booking)) {
    const line = document.createElement("div");
    line.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${value}`; // textContent = safe
    ticketBox.appendChild(line);
  }
});