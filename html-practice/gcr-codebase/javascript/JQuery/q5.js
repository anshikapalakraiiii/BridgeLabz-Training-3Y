$(document).ready(function () {
  function clearHighlights() { $(".employee").css("background", ""); }

  // 1. Click a manager -> highlight all direct reports (matched by data-manager)
  $(".manager").on("click", function () {
    clearHighlights();
    var id = $(this).data("id");
    $('.employee[data-manager="' + id + '"]').css("background", "#cdeccd");
    $(this).css("background", "#ffe08a");
  });

  // 2. Hover on a name -> show contact info held in the NEXT sibling (.next())
  $(".name").hover(
    function () { $(this).next(".contact").fadeIn(150); },
    function () { $(this).next(".contact").fadeOut(150); }
  );

  // 3. Click a department title -> colour all members using .children()
  $(".dept-title").on("click", function () {
    var $team = $(this).next(".team");
    $team.children().css("background", "#d6e4ff");
  });

  // 4. Random employee -> highlight that person and their siblings
  $("#randomBtn").on("click", function () {
    clearHighlights();
    var $all = $(".employee");
    var $pick = $all.eq(Math.floor(Math.random() * $all.length));
    $pick.siblings().css("background", "#ffd6e7");
    $pick.css("background", "#ffe08a");
  });

  // 5. Collapse / expand a team: go to .parent(), then .find() the list
  $(".toggle-team").on("click", function () {
    $(this).parent().find(".team").slideToggle(250);
  });
});