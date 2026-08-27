/* casestudy.js — work/<slug>/index.html only. Two jobs, both progressive:
   the scroll progress bar and the contents rail's current-section mark.
   Neither supplies content, and with this file absent the page is a
   complete, readable case study with a working table of contents. §0

   Plain IIFE, no modules, so file:// preview works. */

(function () {
  'use strict';

  // ------------------------------------------------------------ progress
  // Scaled, not resized. transform is compositor-only; animating width
  // would force layout on every scroll frame. Reads are batched into a
  // rAF so a fast scroll cannot queue one layout per event.

  var bar = document.querySelector('.cs-progress-bar');
  var rail = document.querySelector('.cs-nav');
  var footer = document.querySelector('.site-footer');

  /* The rail is only fixed from 1200px — below that it is an ordinary
   * "Contents" list in the flow, and hiding it there would take a working
   * table of contents out of the document. The query mirrors the CSS
   * breakpoint exactly; the rule that hides it is scoped to the same media
   * query, so even a mistake here cannot reach the in-flow version. */
  var railFixed = window.matchMedia('(min-width: 1200px)');

  if (bar || rail) {
    var ticking = false;

    var paintProgress = function () {
      if (!bar) { return; }
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has nothing to report. Guard the
      // divide rather than letting it produce Infinity or NaN.
      var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (ratio < 0) { ratio = 0; }
      if (ratio > 1) { ratio = 1; }
      bar.style.transform = 'scaleX(' + ratio + ')';
    };

    /* Unlike the site nav, the rail has no blend mode, so it fails from the
     * TOP of the footer rather than halfway down: --ink-muted on --void is
     * 4.09 and the current entry's --accent is 3.13, both under 4.5. So the
     * test is overlap with the footer at all, not with a band inside it.
     * Applying the nav's blend here was considered and rejected — a blend
     * mode on a rail beside a reading column is a far more visible change
     * than one on three small links. STATUS item 29. */
    var paintRail = function () {
      if (!rail || !footer) { return; }

      if (!railFixed.matches) {
        rail.classList.remove('is-hidden');
        return;
      }

      // visibility: hidden keeps layout, so the rail's own rect stays valid
      // while it is hidden and the test cannot oscillate.
      var f = footer.getBoundingClientRect();
      var r = rail.getBoundingClientRect();
      rail.classList.toggle('is-hidden', f.top <= r.bottom);
    };

    var paint = function () {
      ticking = false;
      paintProgress();
      paintRail();
    };

    var request = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });

    // Crossing 1200 hands the rail back to the flow, or takes it away again.
    if (railFixed.addEventListener) { railFixed.addEventListener('change', request); }
    else if (railFixed.addListener) { railFixed.addListener(request); }

    paint();
  }

  // ------------------------------------------------------- contents rail
  // Marks the section currently being read. IntersectionObserver only —
  // no observer, no mark, and the rail stays a plain list of links.

  var links = document.querySelectorAll('.cs-nav-link');

  if (!links.length || !('IntersectionObserver' in window)) { return; }

  // Pair each link with its target once, up front. A link whose target is
  // missing is skipped rather than throwing on every scroll.
  var pairs = [];
  var i;

  for (i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href') || '';
    if (href.charAt(0) !== '#') { continue; }
    var target = document.getElementById(href.slice(1));
    if (target) { pairs.push({ link: links[i], target: target }); }
  }

  if (!pairs.length) { return; }

  var mark = function (link) {
    for (var j = 0; j < pairs.length; j++) {
      pairs[j].link.classList.toggle('is-current', pairs[j].link === link);
    }
  };

  // The band is the middle of the viewport: a section counts as "being
  // read" once its box crosses the centre. Without the negative insets
  // two adjacent sections are both intersecting for most of a scroll and
  // the mark flickers between them.
  var observer = new IntersectionObserver(function (entries) {
    for (var k = 0; k < entries.length; k++) {
      if (entries[k].isIntersecting) {
        for (var m = 0; m < pairs.length; m++) {
          if (pairs[m].target === entries[k].target) {
            mark(pairs[m].link);
            break;
          }
        }
      }
    }
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  for (i = 0; i < pairs.length; i++) {
    observer.observe(pairs[i].target);
  }
}());
