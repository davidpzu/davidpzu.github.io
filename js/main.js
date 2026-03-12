// js/main.js
// ── SVG background entrance animation ────────────────────────────
window.addEventListener('load', () => {
  const bg = document.getElementById('svgBackground');
  if (bg) bg.classList.add('loaded');
});

// 1. Nav scroll darken
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// 2. Scroll-triggered reveal (add class="reveal" or "reveal-stagger" to elements in HTML)
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

// 3. Contact form (paste your existing handler here, wrapped in an if-guard)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    // your existing form logic here
  });
}