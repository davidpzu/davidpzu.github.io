/* reveal.js — the About chapters. design.md §3.5
 *
 * The fallback runs the other way round from the usual scroll reveal.
 * .is-visible is written into the markup, CSS treats a bare .chapter as
 * the hidden state, and this file's first act is to take the class away.
 * So JS off, no IntersectionObserver, or reduced motion on, and every
 * chapter is simply visible: the class is never removed, and nothing here
 * can hide content it is not also about to bring back.
 *
 * No content is added or moved — only which chapters have arrived yet.
 *
 * Plain IIFE, no module, so file:// preview works.
 */
(function () {
  'use strict';

  var THRESHOLD = 0.25;   /* §3.5 */

  var chapters = document.querySelectorAll('.about .chapter');
  if (!chapters.length) { return; }

  /* No observer means there is no entry to hang a reveal on, so the
     chapters keep the class the markup gave them — the same answer as JS
     being off. Checked before anything is stripped. */
  if (!('IntersectionObserver' in window)) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* §6: reduced motion kills the reveal outright. Leave the markup as it
     is and there is nothing left to reveal. */
  if (reduce.matches) { return; }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) { continue; }

      /* Revealed once. Scrolling back up does not hide it again, and each
         chapter animates on its own entry — §3.5 asks for no stagger, so
         there is none to add. */
      observer.unobserve(entries[i].target);
      entries[i].target.classList.add('is-visible');
    }
  }, { threshold: THRESHOLD });

  for (var i = 0; i < chapters.length; i++) {
    chapters[i].classList.remove('is-visible');
    observer.observe(chapters[i]);
  }

  /* Switched on mid-scroll: stop observing and hand every chapter back its
     class, so nothing further down the page is left stranded hidden. The
     CSS drops the transition under the same query, so they arrive at once
     rather than fading in together. */
  reduce.addEventListener('change', function () {
    if (!reduce.matches) { return; }

    observer.disconnect();

    for (var i = 0; i < chapters.length; i++) {
      chapters[i].classList.add('is-visible');
    }
  });
}());
