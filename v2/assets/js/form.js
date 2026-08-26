/* form.js — the footer contact form, on every page that carries it.
 * Posts to Formspree with fetch and swaps in an inline confirmation, so a
 * visitor who writes to David is not handed off to formspree.io. That is
 * what v1 did in js/main.js; §4 had no v2 file for it until now.
 *
 * Progressive throughout. This file supplies no content — both result
 * states are in the markup — and it never touches the action URL or the
 * three field names. With JS off, no fetch, or no FormData, the listener
 * is never attached and the form posts natively exactly as before: the
 * visitor lands on Formspree's own page, which is worse but not broken.
 *
 * Plain IIFE, no modules, so file:// preview works.
 */

(function () {
  'use strict';

  var form = document.querySelector('.contact-form');

  // No form on this page, or an engine without the two things this needs.
  // Bail before the listener exists, so the native post survives.
  if (!form || !window.fetch || !window.FormData) { return; }

  var success = document.querySelector('.form-success');
  var error = form.querySelector('.form-error');
  var submit = form.querySelector('.form-submit');

  // The confirmation is markup, not something this file writes. Without it
  // there is nothing to swap in, so leave the native post alone.
  if (!success) { return; }

  var restingLabel = submit ? submit.textContent : '';

  var setBusy = function (busy) {
    if (!submit) { return; }
    submit.disabled = busy;
    submit.textContent = busy ? 'Sending…' : restingLabel;
  };

  var fail = function () {
    setBusy(false);
    if (error) { error.hidden = false; }
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (error) { error.hidden = true; }
    setBusy(true);

    window.fetch(form.action, {
      method: 'POST',
      body: new window.FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) { fail(); return; }

      form.hidden = true;
      success.hidden = false;

      // Move focus rather than trusting the live region alone. The form the
      // visitor was working in has just left the page, so a keyboard or
      // screen-reader user needs to be put somewhere real — otherwise focus
      // falls back to <body> and their place in the document is lost.
      // role="status" covers the case where focus cannot be taken.
      success.focus();
    })['catch'](fail);   // bracket form: 'catch' is a reserved word in ES3
  });
}());
