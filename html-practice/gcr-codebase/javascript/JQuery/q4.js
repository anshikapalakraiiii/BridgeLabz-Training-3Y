$(document).ready(function () {
  // Banners the buttons act on: selected ones, or all if none are selected
  function targets() {
    var sel = $("#bannerList .banner.selected");
    return sel.length ? sel : $("#bannerList .banner");
  }

  // Click a banner to select / unselect it
  $("#bannerList .banner").on("click", function () { $(this).toggleClass("selected"); });

  $("#hideBtn").on("click", function () { targets().hide(); });
  $("#showBtn").on("click", function () { targets().show(); });
  $("#slideUpBtn").on("click", function () { targets().slideUp(400); });
  $("#slideDownBtn").on("click", function () { targets().slideDown(400); });
  $("#fadeOutBtn").on("click", function () { targets().fadeOut(600); });
  $("#fadeInBtn").on("click", function () { targets().fadeIn(600); });

  // 5. Auto-rotate banners every 5 seconds using fadeOut() then fadeIn()
  var $slides = $(".rotator .slide");
  var current = 0;
  setInterval(function () {
    var next = (current + 1) % $slides.length;
    $slides.eq(current).fadeOut(400, function () {
      $slides.eq(next).fadeIn(400);
    });
    current = next;
  }, 5000);
});