// jQuery.noConflict(true) in the HTML gave each version its own variable:
//   jQuery1 -> v1.12.4   jQuery2 -> v3.7.1   (global $ is left untouched)
(function ($1, $2) {

  // ---------- Version 1 widgets ----------
  $1(function () {
    $1("#ver1").text($1.fn.jquery);

    // 1. Carousel rotation: fade current slide out, next one in, every 3 seconds
    var $slides = $1("#carousel .slide"), i = 0;
    $slides.eq(0).show();
    setInterval(function () {
      var next = (i + 1) % $slides.length;
      $slides.eq(i).fadeOut(300, function () { $slides.eq(next).fadeIn(300); });
      i = next;
    }, 3000);

    // 3. Highlight the active widget on click
    $1(".widget").on("click", function () {
      $1(".widget").removeClass("active");
      $1(this).addClass("active");
    });
  });

  // ---------- Version 2 widgets ----------
  $2(function () {
    $2("#ver2").text($2.fn.jquery);

    // 2. Modal popup for notifications
    $2("#openModal").on("click", function (e) { e.stopPropagation(); $2("#overlay").css("display", "flex").hide().fadeIn(200); });
    $2("#closeModal, #overlay").on("click", function (e) {
      if (e.target === this) { $2("#overlay").fadeOut(200); }
    });

    // 4. Tooltips on hover (created from the data-tip attribute)
    $2(".tipItem").on("mouseenter", function () {
      var $tip = $2("<div class='tooltip'></div>").text($2(this).data("tip")).appendTo("body");
      var pos = $2(this).offset();
      $tip.css({ top: pos.top - $tip.outerHeight() - 6, left: pos.left }).fadeIn(100);
    }).on("mouseleave", function () { $2(".tooltip").remove(); });
  });

})(jQuery1, jQuery2);  // 5. both versions operate at the same time