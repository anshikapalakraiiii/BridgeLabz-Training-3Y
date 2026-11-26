$(document).ready(function () {
  // 5. Insert a success message into the DOM, then remove it after 2.5s
  function showMessage(text) {
    $("<p class='msg'></p>").text(text).appendTo("#messages")
      .delay(2500).fadeOut(400, function () { $(this).remove(); });
  }

  // Update the global notification status: ON if any topic is subscribed
  function updateStatus() {
    var on = $(".topic.subscribed").length > 0;
    $("#notifState").text(on ? "On" : "Off");
  }

  // Attach all handlers for one topic row with .on() (namespaced as ".topic" so .off() can remove them)
  function bindTopic($li) {
    var name = $li.find(".label").text();

    // 1. Subscribe -> enable notifications
    $li.find(".sub").on("click.topic", function () {
      $li.addClass("subscribed");
      updateStatus();
      showMessage("Subscribed to " + name + ". Notifications enabled.");
    });

    // 2. Unsubscribe -> disable notifications
    $li.find(".unsub").on("click.topic", function () {
      $li.removeClass("subscribed");
      updateStatus();
      showMessage("Unsubscribed from " + name + ".");
    });

    // 4. Remove -> detach this topic's click events with .off()
    $li.find(".remove").on("click.topic", function () {
      $li.removeClass("subscribed").addClass("removed");
      $li.find("button").off("click.topic").prop("disabled", true);
      updateStatus();
      showMessage(name + " removed. Its buttons no longer respond.");
    });
  }

  // Bind the topics that already exist in the HTML
  $(".topic").each(function () { bindTopic($(this)); });

  // 3. Dynamically add a new topic and bind events to it
  $("#addTopic").on("click", function () {
    var name = $.trim($("#newTopic").val());
    if (!name) { showMessage("Please enter a topic name."); return; }
    var $li = $("<li class='topic'><span class='label'></span>" +
      "<button class='sub'>Subscribe</button><button class='unsub'>Unsubscribe</button>" +
      "<button class='remove'>Remove</button></li>");
    $li.find(".label").text(name);
    $("#topics").append($li);
    bindTopic($li);
    $("#newTopic").val("");
    showMessage("Topic \"" + name + "\" added.");
  });
});