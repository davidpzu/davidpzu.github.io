/* counters.js — the count-up on the Impact figures. design.md §3.4
 *
 * Every final value is already in the HTML, spelled exactly as the CV
 * spells it. This file only counts up to what is already there and then
 * puts the source string back verbatim, so nothing here can invent a
 * number or reformat one. With JS off — or reduced motion on — the markup
 * is what renders, which is the whole of §3.4's fallback.
 *
 * Plain IIFE, no module, so file:// preview works.
 */
(function () {
  'use strict';

  var DURATION_MS = 900;   /* §3.4 */
  var THRESHOLD = 0.5;     /* half the numeral on screen before it starts */

  var figures = document.querySelectorAll('.staircase .figure');
  if (!figures.length) { return; }

  /* No observer means there is no "first intersect" to hang this on, so the
     figures just stay as written — the same answer as JS being off. */
  if (!('IntersectionObserver' in window)) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Split a figure into literal runs and numbers, so the count works on all
     four shapes without a per-box special case:

       "€3.7M"      -> ["€", 3.7, "M"]
       "18%"        -> [18, "%"]
       "41% → 59%"  -> [41, "% → ", 59, "%"]
       "+130%"      -> ["+", 130, "%"]

     Decimal places travel with each number, so €3.7M counts 0.0 → 3.7 and
     never renders €3.70000001M on the way. */
  function parse(text) {
    var parts = [];
    var number = /\d+(?:\.\d+)?/g;
    var at = 0;
    var match;

    while ((match = number.exec(text)) !== null) {
      if (match.index > at) { parts.push(text.slice(at, match.index)); }

      var dot = match[0].indexOf('.');
      parts.push({
        value: parseFloat(match[0]),
        decimals: dot === -1 ? 0 : match[0].length - dot - 1
      });

      at = match.index + match[0].length;
    }

    if (at < text.length) { parts.push(text.slice(at)); }
    return parts;
  }

  function render(parts, fraction) {
    var out = '';

    for (var i = 0; i < parts.length; i++) {
      out += typeof parts[i] === 'string'
        ? parts[i]
        : (parts[i].value * fraction).toFixed(parts[i].decimals);
    }

    return out;
  }

  /* CSS's own ease-out — cubic-bezier(0, 0, 0.58, 1) — because §3.4 asks
     for ease-out by name, and the usual one-line stand-in (1 - (1-t)³) is
     not close to it: at the halfway mark that one is 88% done, so the back
     half of the 900ms has nothing left to show. This one is 68% there.

     Both control points x1 and y1 are 0, which collapses the cubic to
     t²(3(1-t)p + t). x has no closed-form inverse, so solve it for t by
     Newton-Raphson and read y off the same t. */
  var EASE_X2 = 0.58;

  function curve(t, p2) {
    return t * t * (3 * (1 - t) * p2 + t);
  }

  function ease(x) {
    if (x <= 0) { return 0; }
    if (x >= 1) { return 1; }

    var t = x;   /* x is close enough to t to converge in a few passes */

    for (var i = 0; i < 8; i++) {
      var error = curve(t, EASE_X2) - x;
      if (Math.abs(error) < 1e-5) { break; }

      var slope = 6 * EASE_X2 * t + 3 * (1 - 3 * EASE_X2) * t * t;
      if (slope < 1e-6) { break; }   /* flat: Newton has nothing to divide by */

      t = Math.min(Math.max(t - error / slope, 0), 1);
    }

    return curve(t, 1);
  }

  function count(el) {
    var source = el.textContent;

    /* Nothing to count. Leave it exactly as written. */
    if (!/\d/.test(source)) { return; }

    /* Reduced motion renders the final value immediately — which it already
       is, so the work is not doing any. */
    if (reduce.matches) { return; }

    var parts = parse(source);
    var started = null;

    function frame(now) {
      /* Read every frame rather than once, so switching the setting on
         mid-count lands on the final value instead of freezing partway. */
      if (reduce.matches) {
        el.textContent = source;
        return;
      }

      if (started === null) { started = now; }
      var t = Math.min((now - started) / DURATION_MS, 1);

      if (t < 1) {
        el.textContent = render(parts, ease(t));
        window.requestAnimationFrame(frame);
      } else {
        /* Restore the source rather than rendering t = 1, so the figure ends
           as the CV spells it — spacing, arrow, currency mark and all. */
        el.textContent = source;
      }
    }

    window.requestAnimationFrame(frame);
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) { continue; }

      /* First intersect only — §3.4. Scrolling back up does not re-run it. */
      observer.unobserve(entries[i].target);
      count(entries[i].target);
    }
  }, { threshold: THRESHOLD });

  for (var i = 0; i < figures.length; i++) {
    observer.observe(figures[i]);
  }
}());
