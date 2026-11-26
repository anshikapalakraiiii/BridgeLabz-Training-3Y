$(document).ready(function () {
  // 1. Personalised greeting based on the current hour
  var hour = new Date().getHours();
  var greet = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  $("#greeting").text(greet + ", Visitor!");

  // 2. Replace the greeting with a random motivational quote
  var quotes = [
    "Believe you can and you're halfway there.",
    "Small steps every day lead to big results.",
    "Dream big. Start small. Act now.",
    "Your only limit is your mind.",
    "Success is the sum of small efforts repeated daily."
  ];
  $("#changeBtn").on("click", function () {
    $("#greeting").text(quotes[Math.floor(Math.random() * quotes.length)]);
  });

  // 3. Toggle visibility of the welcome message
  $("#toggleBtn").on("click", function () {
    $("#welcomeMsg").toggle();
  });

  // 4. Alert when the greeting itself is clicked
  $("#greeting").on("click", function () {
    alert("You clicked: " + $(this).text());
  });
});