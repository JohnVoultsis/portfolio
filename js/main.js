/* Small progressive enhancements. The site works fully without JavaScript. */
(function () {
  "use strict";

  // 1. Mark the current section in the header (home = "Work", about = "About").
  var section = document.body.getAttribute("data-nav");
  if (section) {
    var link = document.querySelector('.site-header nav a[data-nav="' + section + '"]');
    if (link) link.setAttribute("aria-current", "page");
  }

  // 2. Scrollable device screens: tell assistive tech what they are and let
  //    keyboard users scroll them (tabindex is set in the markup).
  document.querySelectorAll(".ip-screen, .mb-content").forEach(function (el) {
    el.setAttribute("role", "region");
  });

  // 3. "Work" link on the home page scrolls to the grid without a jump.
  var work = document.getElementById("work");
  document.querySelectorAll('a[href="#work"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (!work) return;
      e.preventDefault();
      work.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#work");
    });
  });
})();
