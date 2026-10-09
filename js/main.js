/* Small progressive enhancements. The site works fully without JavaScript. */
(function () {
  "use strict";

  // 1. Mark the current section in the header (home = "Work", about = "About").
  var section = document.body.getAttribute("data-nav");
  if (section) {
    var link = document.querySelector('.site-header nav a[data-nav="' + section + '"]');
    if (link) link.setAttribute("aria-current", "page");
  }

  // 1b. Hamburger menu on phones (CSS shows the button only on narrow screens).
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
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
