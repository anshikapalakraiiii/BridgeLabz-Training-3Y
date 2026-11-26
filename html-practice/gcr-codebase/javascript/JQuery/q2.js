$(document).ready(function () {
  // 4. Attribute selector: any product that HAS a data-discount attribute gets special styling
  $(".product[data-discount]").addClass("discounted");

  // 1 + 5. Click a product -> highlight it; alert if data-stock is 0
  $(".product").on("click", function () {
    $(this).toggleClass("highlight");
    if ($(this).attr("data-stock") === "0") {
      alert($(this).find("h3").text() + " is out of stock!");
    }
  });

  // 2. Hover -> slide the extra details in and out
  $(".product").hover(
    function () { $(this).find(".details").stop(true, true).slideDown(150); },
    function () { $(this).find(".details").stop(true, true).slideUp(150); }
  );

  // 3. Favorite icon toggles the "selected" class
  $(".fav").on("click", function (e) {
    e.stopPropagation(); // don't trigger the product's own click handler
    $(this).toggleClass("selected");
  });
});