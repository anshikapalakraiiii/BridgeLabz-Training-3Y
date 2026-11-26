$(document).ready(function () {
  // 1. Click question -> toggle its own answer
  $(".question").on("click", function () {
    $(this).next(".answer").slideToggle(200);
  });

  // 2. Hover -> change question colour
  $(".question").hover(
    function () { $(this).css("color", "#2f5bea"); },
    function () { $(this).css("color", ""); }
  );

  // 3. Double-click a question -> collapse ALL answers
  $(".question").on("dblclick", function () {
    $(".answer").slideUp(200);
  });

  // 4. Focus on an answer input -> highlight the parent question
  $(".answer input").on("focus", function () {
    $(this).closest(".faq-item").find(".question").css("background", "#fff3b0");
  });

  // 5. Blur -> reset background colour
  $(".answer input").on("blur", function () {
    $(this).closest(".faq-item").find(".question").css("background", "");
  });
});