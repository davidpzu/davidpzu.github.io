/* rotator.js — the hero terminal line. design.md §3.2
 *
 * The five lines are already in the HTML; this file only decides which one
 * is showing. Nothing here adds content, so with JS off the markup's own
 * default — line one — is what the page renders.
 *
 * Plain IIFE, no module, so file:// preview works.
 */
(function () {
  'use strict';

  var HOLD_MS = 4000;   /* how long a line rests */
  var FADE_MS = 200;    /* out, then in: the 400ms crossfade */

  var slot = document.querySelector('.rotator-slot');
  if (!slot) { return; }

  var lines = slot.querySelectorAll('.rotator-line');
  if (lines.length < 2) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0;
  var timer = null;

  function show(next) {
    lines[index].classList.remove('is-current');
    index = next;
    lines[index].classList.add('is-current');
  }

  function cycle() {
    timer = window.setTimeout(function () {
      slot.classList.add('is-fading');

      timer = window.setTimeout(function () {
        show((index + 1) % lines.length);
        slot.classList.remove('is-fading');
        cycle();
      }, FADE_MS);
    }, HOLD_MS);
  }

  /* Reduced motion means rotation stops on line one — including when the
     setting is switched on mid-session. */
  function stop() {
    window.clearTimeout(timer);
    timer = null;
    slot.classList.remove('is-fading');
    show(0);
  }

  if (!reduce.matches) { cycle(); }

  reduce.addEventListener('change', function () {
    if (reduce.matches) { stop(); }
  });
}());
