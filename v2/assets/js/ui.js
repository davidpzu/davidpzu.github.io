/* ui.js — page chrome, on every page. Two jobs, both viewport-level rather
 * than belonging to any one section: the nav's visibility, and the cursor.
 *
 * Supplies no content. With this file absent the nav is simply always
 * visible and the pointer is the browser's own — the page is complete
 * either way.
 *
 * Plain IIFE, no modules, so file:// preview works.
 */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------- the nav
   * Out of the way while you are actually moving, back as soon as you stop.
   * §3.1
   *
   * Three states, in priority order:
   *   - within 24px of the top: always visible. The threshold is not 0 so
   *     that the sub-pixel scroll a browser performs when restoring position
   *     does not flicker the nav on arrival.
   *   - a scroll event just fired: hidden.
   *   - no scroll event for IDLE ms: visible again. 350ms — long
   *     enough not to strobe during a flick-scroll, short enough that
   *     stopping feels like it brings the nav straight back.
   *
   * The idle timer is what makes it come back while you sit still reading,
   * which a scroll-direction check alone would not do — that only reveals on
   * an upward flick.
   */

  var nav = document.querySelector('.nav');

  if (nav) {
    var IDLE = 350;
    var navTicking = false;
    var idleTimer = null;

    var showNav = function () {
      nav.classList.remove('is-hidden');
    };

    var paintNav = function () {
      navTicking = false;

      if (window.scrollY <= 24) {
        showNav();
        return;
      }

      nav.classList.add('is-hidden');

      // Restarted on every scroll event, so it only fires once the page has
      // actually been still for IDLE ms rather than IDLE ms after the first
      // event of a long scroll.
      if (idleTimer !== null) { window.clearTimeout(idleTimer); }
      idleTimer = window.setTimeout(showNav, IDLE);
    };

    var requestNav = function () {
      if (!navTicking) {
        navTicking = true;
        window.requestAnimationFrame(paintNav);
      }
    };

    window.addEventListener('scroll', requestNav, { passive: true });
    paintNav();   // a reload partway down the page must not show the nav
  }

  /* ---------------------------------------------------------- the cursor
   * A ring that replaces the native pointer. Three guards decide whether
   * it runs at all, and the native cursor is only hidden once they pass:
   *
   *   - a fine pointer that can hover. Touch has no cursor to replace, and
   *     hiding one on a hybrid device would strand a visitor who picks up
   *     a mouse later — hence the live matchMedia listener rather than a
   *     one-time read.
   *   - reduced motion off. The ring eases toward the pointer, which is
   *     exactly the kind of unrequested movement the query is about.
   *   - this script running at all. `cursor: none` lives under a class this
   *     file adds, so a parse error, a blocked script or JS off leaves the
   *     native pointer exactly where it was. It is never hidden by CSS
   *     alone.
   *
   * The ring is driven in a rAF loop rather than from the pointer event, so
   * it eases rather than snapping, and a burst of pointermove events cannot
   * queue a write each.
   */

  var ring = document.querySelector('.cursor-ring');
  if (!ring) { return; }

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');

  var on = false;
  var raf = null;
  var tx = 0, ty = 0;    // target, from the pointer
  var cx = 0, cy = 0;    // current, eased
  var placed = false;

  var loop = function () {
    // 0.2 is a visible trail without the ring ever falling far behind the
    // click point — the ring is the pointer now, so it cannot lag much.
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    ring.style.transform = 'translate3d(' + cx + 'px, ' + cy + 'px, 0) translate(-50%, -50%)';
    raf = window.requestAnimationFrame(loop);
  };

  var move = function (event) {
    tx = event.clientX;
    ty = event.clientY;

    // First move: jump rather than ease in from 0,0, which would otherwise
    // fly the ring across the page from the top-left corner.
    if (!placed) {
      placed = true;
      cx = tx;
      cy = ty;
      ring.classList.add('is-visible');
    }

    // An interactive target under the pointer grows the ring. Checked here
    // rather than with CSS :hover, because the ring is not underneath the
    // element it is reporting on.
    var el = event.target;
    var interactive = !!(el && el.closest &&
      el.closest('a, button, input, textarea, select, summary, [tabindex]'));
    ring.classList.toggle('is-active', interactive);

    // Text keeps its own affordance: over a text field the ring thins to a
    // bar, which is the one thing lost by hiding the native I-beam.
    var text = !!(el && el.closest && el.closest('input, textarea'));
    ring.classList.toggle('is-text', text);
  };

  var hide = function () { ring.classList.remove('is-visible'); };
  var show = function () { if (placed) { ring.classList.add('is-visible'); } };

  var start = function () {
    if (on) { return; }
    on = true;
    root.classList.add('has-cursor-ring');
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', move, { passive: true });
    // The ring must not sit frozen over the page once the pointer leaves it.
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    window.addEventListener('blur', hide);
    raf = window.requestAnimationFrame(loop);
  };

  var stop = function () {
    if (!on) { return; }
    on = false;
    root.classList.remove('has-cursor-ring');
    ring.classList.remove('is-visible');
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerdown', move);
    document.removeEventListener('mouseleave', hide);
    document.removeEventListener('mouseenter', show);
    window.removeEventListener('blur', hide);
    if (raf !== null) { window.cancelAnimationFrame(raf); raf = null; }
    placed = false;
  };

  var decide = function () {
    if (fine.matches && !still.matches) { start(); } else { stop(); }
  };

  // addEventListener on a MediaQueryList is the modern form; addListener is
  // the only one Safari below 14 has. Neither is required for the page to
  // work, so a browser with neither simply keeps whatever the first read
  // decided.
  var watch = function (mq) {
    if (mq.addEventListener) { mq.addEventListener('change', decide); }
    else if (mq.addListener) { mq.addListener(decide); }
  };

  watch(fine);
  watch(still);
  decide();
}());
