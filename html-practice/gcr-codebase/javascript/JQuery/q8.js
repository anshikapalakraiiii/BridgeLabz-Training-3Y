$(document).ready(function () {
  var counter = 5;

  // Build the HTML for a new post
  function buildPost(title, featured) {
    var cls = featured ? "post featured" : "post";
    return $("<article class='" + cls + "'><h3></h3><p>Freshly written content.</p>" +
      "<button class='tag-before'>Tag before title</button>" +
      "<button class='tag-after'>Tag after title</button></article>")
      .find("h3").text(title).end();
  }

  // 1. Append a new post at the END of the list
  $("#addPost").on("click", function () {
    counter++;
    $("#posts").append(buildPost("New Post #" + counter, false));
  });

  // 2. Prepend a featured post at the TOP of the list
  $("#prependPost").on("click", function () {
    counter++;
    $("#posts").prepend(buildPost("Featured Post #" + counter, true));
  });

  // 3. Remove the last post
  $("#removeLast").on("click", function () {
    $("#posts .post:last").remove();
  });

  // 4. Tags: .before() puts the tag ahead of the title, .after() puts it right after
  //    (delegated handlers so they also work on posts added later)
  function newTag() { return $("<span class='tag'></span>").text("#" + ($.trim($("#tagText").val()) || "tag")); }
  $("#posts").on("click", ".tag-before", function () {
    $(this).closest(".post").find("h3").before(newTag());
  });
  $("#posts").on("click", ".tag-after", function () {
    $(this).closest(".post").find("h3").after(newTag());
  });

  // 5. Highlight posts containing a keyword
  $("#highlightBtn").on("click", function () {
    var kw = $.trim($("#keyword").val()).toLowerCase();
    $("#posts .post").each(function () {
      var hit = kw && $(this).text().toLowerCase().indexOf(kw) !== -1;
      $(this).css("background-color", hit ? "#fff3b0" : "");
    });
  });
  $("#resetBtn").on("click", function () { $("#posts .post").css("background-color", ""); });
});