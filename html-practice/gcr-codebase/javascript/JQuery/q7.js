$(document).ready(function () {
  var $courses = $(".course");

  // Escape special characters so user text is safe in HTML and RegExp
  function esc(s) { return s.replace(/[&<>"']/g, function (c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Remember each original title so highlighting can be undone
  $courses.each(function () {
    var $t = $(this).find(".title");
    $t.data("orig", $t.text());
  });

  // 1. Filter in real time on every key release
  $("#search").on("keyup", function () {
    var q = $.trim($(this).val());
    var matched = 0;

    $courses.each(function () {
      var $t = $(this).find(".title");
      var title = $t.data("orig");
      var isMatch = q === "" || title.toLowerCase().indexOf(q.toLowerCase()) !== -1;

      // 3. Toggle visibility depending on match
      $(this).toggle(isMatch);

      if (isMatch) {
        matched++;
        if (q) {
          // 2. Wrap the matched text in <mark> and style it with .css()
          var re = new RegExp("(" + escRe(q) + ")", "ig");
          $t.html(esc(title).replace(new RegExp("(" + escRe(esc(q)) + ")", "ig"), "<mark>$1</mark>"));
          $t.find("mark").css({ "background-color": "#ffe14d", "padding": "0 2px" });
        } else {
          $t.text(title);
        }
      }
    });

    // 4. Dynamic count of matches
    $("#count").text("Showing " + matched + " of " + $courses.length + " courses");
    $("#noResult").toggle(matched === 0);
  });

  // 5. Clear -> empty the input and show everything again
  $("#clearBtn").on("click", function () {
    $("#search").val("").trigger("keyup");
  });

  $("#search").trigger("keyup"); // initial count
});