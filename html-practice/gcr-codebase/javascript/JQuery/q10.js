$(document).ready(function () {
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Mark a field valid/invalid: 5. red border via .css(), message in the next <span>
  function mark($field, ok, msg) {
    $field.css("border", ok ? "2px solid #1a9b53" : "2px solid red");
    $field.next(".error").text(ok ? "" : msg);
    return ok;
  }

  // 1. Name must not be empty
  function checkName() {
    return mark($("#name"), $.trim($("#name").val()) !== "", "Name is required.");
  }

  // 2. Email: valid format AND not already registered (uniqueness check against the list)
  function checkEmail() {
    var v = $.trim($("#email").val()).toLowerCase();
    if (!emailRe.test(v)) return mark($("#email"), false, "Enter a valid email address.");
    var taken = $("#taken li").filter(function () { return $(this).text().toLowerCase() === v; }).length > 0;
    return mark($("#email"), !taken, "This email is already registered.");
  }

  // 3. Password at least 8 characters
  function checkPassword() {
    return mark($("#password"), $("#password").val().length >= 8, "Password must be at least 8 characters.");
  }

  // Live feedback when leaving a field
  $("#name").on("blur", checkName);
  $("#email").on("blur", checkEmail);
  $("#password").on("blur", checkPassword);

  // 4. On submit run every check; show success only if all pass
  $("#regForm").on("submit", function (e) {
    e.preventDefault();
    var a = checkName(), b = checkEmail(), c = checkPassword(); // run all so every error shows
    if (a && b && c) {
      var email = $.trim($("#email").val()).toLowerCase();
      $("#taken").append($("<li></li>").text(email)); // now taken
      $("#success").text("Registration successful! Welcome, " + $.trim($("#name").val()) + ".").fadeIn();
      this.reset();
      $("#regForm input").css("border", "");
    } else {
      $("#success").hide();
    }
  });
});