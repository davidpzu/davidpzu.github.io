# STATUS — v2 rebuild

Handoff notes. Companion to `design.md`, which stays the spec — this file
only records where the build actually is and what is still undecided.
Delete at promotion.

**Last updated:** after build step 10 (About chapters), committed as
`9774a97`.

---

## State of play

Steps 1–10 done. Next up is **step 11, `reveal.js`**.

All ten steps are committed, across three commits on `main`: `7645aab`
(step 1), `d05f724` (steps 2–6) and `9774a97` (steps 7–10). This file is committed
one step behind them, in the commit directly after `9774a97` — a file
cannot name its own hash. `v2/` has no uncommitted changes.

None of the three is pushed — `main` sits ahead of `origin/main`. Pushing
publishes the preview to `davidpzu.github.io/v2/` via GitHub Pages; the
`noindex` tag is in place for exactly that reason.

| File | State |
|---|---|
| `v2/index.html` | All five sections, complete semantic skeleton |
| `v2/assets/css/tokens.css` | Done, committed |
| `v2/assets/css/base.css` | Done, committed |
| `v2/assets/css/layout.css` | Shell, rhythm, 12-col grid, `.band-alt` |
| `v2/assets/css/components.css` | Nav, hero, cards, staircase, chapters. Footer still to come |
| `v2/assets/js/rotator.js` | Done |
| `v2/assets/js/reveal.js` | Empty (step 11) |
| `v2/assets/js/counters.js` | Done, linked with `defer` |

Also true: CV is in `v2/assets/` and its link is live, favicons linked,
`_typecheck.html` deleted but recoverable from `7645aab`.

**The repo root has drifted, and not from `v2/` work.** Three things sit
outside `v2/` and none of them has been committed or touched:

- `README.md` is **deleted in the working tree** but intact in git (21
  bytes, `# davidpzu.github.io`, last changed in `1cbff1c`). Restore with
  `git checkout -- README.md` if the deletion was not deliberate. Left
  alone because the root is off-limits per the project rules.
- `.DS_Store`, `assets/.DS_Store` and `assets/img/.DS_Store` are tracked
  and show as modified. They are Finder noise and should be in a
  `.gitignore` that does not exist yet — a root change, so it needs a
  decision, not a drive-by fix.
- `CLAUDE.md` is untracked at the root.

**Commits are authored as `David <david@MacBook-Pro-de-David.local>`.**
No `user.email` is configured, so git auto-detects it — true of all four
commits in this repo, not just the recent ones. That address is not a
GitHub account, so none of this history will attribute to David's profile.
Worth fixing before pushing a portfolio repo.

---

## Needs a decision

**0. `v2/assets/img/my-origins.png` appeared, untracked, and is not
wired in.** 2393 × 1845, 4.6 MB. Left alone on purpose — §8 says do not
source or substitute images, and nothing said this one was ready. Three
things to settle before it goes in the slot:

- **It is landscape, 1.297:1.** §3.5 specifies square or 4:5, and the slot
  is built at 4:5. `object-fit: cover` would crop roughly 40% of the frame
  away. Either the photo gets cropped to 4:5 deliberately, or `.portrait-slot`
  changes ratio — one line, but it changes the chapter's whole proportion.
- **4.6 MB against §6's 800 KB budget for the entire page.** Needs to
  become a compressed webp with a jpg fallback. That is step 15's work,
  but the file cannot ship as it stands.
- **Alt text has to come from David.** §3.5 requires real alt text, and
  describing a photo of him is not something to guess at.

**1. `work/sacem/index.html` does not exist.** Card 01 links to it and
gets a 404. No step in §5 creates it, and §4 lists it as a file. The v1
case study is `sacem.html` at the repo root — is v2's version a port of
that content or a fresh build? This is the largest open item and it
blocks card 01 being real.

**2. The Formspree form no longer confirms inline.** v1 submitted through
`fetch` in `js/main.js` and swapped in a success message. §4 gives v2 no
file for that, so the form currently posts natively and redirects to
Formspree's own thank-you page. Either add a fourth JS file or accept the
redirect. Action URL and field names are carried over byte-exact either
way.

**3. The nav pill no longer darkens on scroll.** Same root cause: v1
toggled `.scrolled` from `js/main.js`, v2 has no nav script.
`.nav.is-scrolled` is written and styled, nothing adds the class. Decide
together with #2 — one small `ui.js` would cover both. v1's drop shadow
on that state was dropped, since §1.4 permits shadows on card hover only.

**4. Section rhythm may be too generous.** Every section carries
symmetric `padding-block: --s-8`, so the gap between two sections'
content is 320px on desktop. That's §1.4's "one rule, no exceptions" read
literally, and it puts the hairline centred in the whitespace. It only
becomes judgeable once cards and the staircase are in, at steps 7–8.
Going single-sided is a one-line change.

**5. The rotator `<p>` bends an acceptance criterion.** §6 says no
paragraph exceeds `--measure`; the terminal line needs `max-width: none`
or it wraps mid-phrase at ~527px. Leave it, let it wrap, or move the
rotator out of a `<p>` into a `<div>` — the last option satisfies the
letter of the rule and changes nothing visible.

**6. Two pieces of copy are placeholders, not guesses.** Sanofi Connect's
one-line descriptor (§3.3 only ever shows two cards), and the GitHub URL
in the footer. On the latter: this repo's own remote is
`github.com/davidpzu/davidpzu.github.io`, so the profile is almost
certainly `https://github.com/davidpzu` — but confirm with David before
wiring it in rather than inferring it.

**7. Empty media slots have no hover response.** §3.3 asks the media to
scale `1.02` on hover. The transform is written against
`.card-media img, .card-media video`, so today — with the slots empty —
nothing scales; the placeholder label deliberately stays put. Border and
CTA still go accent, so the card does respond. Alternative is scaling the
label too, which reads as jitter on 13px of mono. Resolves itself when the
thumbnails land.

**8. "Video must not autoplay under reduced motion" (§3.3) is not built.**
It cannot be: no CSS selector stops an `autoplay` attribute, and §4 gives
v2 only three JS files, none of which is a card script. Nothing regresses
today because there is no video. Options when the Cursorful clips arrive:
drop `autoplay` and start playback from a script, or ship the posters
only. Needs a decision at asset time, not now.

**9. Card titles are mono, not the base `h3`.** base.css styles `h3` as
Inter Tight 600 per §1.3's "Chapter lead" row. `.card-title` overrides
that to display face 500 / `-0.02em`, on §1.3's "mono is the display face
— headlines" rule. The chapter `h3`s in §3.5 are explicitly body face and
keep the base rule. Flagging because it is a read of the spec, not a line
in it.

**10. Nothing toggles `aria-expanded` on the metric buttons.** The step 8
disclosure is CSS only — `.metric:hover` and `.metric:focus-within`. That
covers pointer, keyboard and touch with no script (a button takes focus
when it is tapped), and it works with JS off, which §0 requires. What it
cannot do is keep `aria-expanded` truthful: all four still read `false`
while their note is on screen. Three ways out, all cheap: have step 9's
`counters.js` also wire the buttons; add the `ui.js` that items 2 and 3
already want; or drop `aria-expanded` and `aria-controls`, on the grounds
that §3.4 describes a *reveal*, not a toggle — clicking twice does not
close it. Worth settling before step 14. Step 9 did **not** quietly resolve this:
`counters.js` touches the figures only and leaves the buttons alone,
because which file owns that wiring is exactly what is undecided.

**11. Note text is exposed to screen readers even while invisible.** The
disclosure fades with `opacity` alone, never `display` or `visibility`, so
all four notes stay in the accessibility tree and in flow. Two consequences,
both deliberate: nothing is hover-only (§0's floor), and the stair cannot
shift when a box lights up. The cost is that a screen reader reads all four
notes in sequence regardless of state. Flagging it as a choice rather than
an oversight.

**12. The count-up eases on CSS's real curve, not the usual one-liner.**
§3.4 says "900ms `ease-out`", which in CSS is
`cubic-bezier(0, 0, 0.58, 1)`. The stock JS stand-in — `1 - (1-t)³` — is
not close to it: measured against the `+130%` figure, the one-liner reads
`+114%` at the halfway mark and `+128%` by 675ms, so the last third of the
900ms has nothing left to show and the animation reads as roughly half its
stated duration. `counters.js` solves the real bezier instead
(Newton-Raphson on x, then y off the same t — about fifteen lines) and
reads `+89%` at halfway. Verified against independently computed values at
six points. If that ever looks like more machinery than it is worth, the
one-liner is a two-line swap in `ease()`.

**13. The step 2 skeleton gained a `.chapter-body` wrapper.** The sticky
year needs a grid area that spans the whole chapter, which it only gets if
the chapter is a clean two-cell grid. Everything after the year marker is
now inside `<div class="chapter-body">` on all three chapters. Render order
is unchanged, so §3.5's "year / title / paragraph" still holds.

**14. Reveal CSS is deliberately not here.** Step 10 is the static build,
so `.chapter` has no opacity or transform rule at all — the markup renders
as-is. Step 11 adds both the CSS pair and the JS together. Worth recording
how §3.5's fallback is meant to work, so it is not re-read from scratch:
`.is-visible` goes in the **markup** on each `<article class="chapter">`,
CSS styles the bare `.chapter` as hidden and `.chapter.is-visible` as
shown, and `reveal.js` strips the class on load before observing. JS off
means the class stays and every chapter is visible — which is the point.

---

## Known spec contradictions

Worth resolving in `design.md` so they don't get re-litigated every step.

- **§1.2's "accent appears in five places only" is contradicted twice by
  the spec itself.** §3.2 asks for an accent dot on the availability
  eyebrow, §3.3 asks for an accent card-hover border. Both are being
  built as accent — that's seven places, not five.
- **`--radius` scope.** §1.4 restricts it to cards and metric boxes;
  §3.5 gives the portrait container `--radius`. Portrait wins as the more
  specific instruction.
- **§3.4's diagram says `41→59%`, its table says `41% → 59%`.** Using the
  table's form.
- **§1.3's metric numeral size does not fit §3.4's four-across layout.**
  The `41% → 59%` figure is nine mono glyphs; at §1.3's `3.5rem` ceiling
  that is ~282px of text in a column that is 235px wide at `--shell`, and
  it overflows at *every* width from 768 up, not only the wide end — at
  768 the column holds 127px and §1.3's own `2rem` floor already needs
  173px. Four boxes across is what §3.4 is actually about, so the numeral
  gives way: `.staircase .figure` in components.css lowers the ceiling to
  `clamp(1.5rem, 3vw, 2.5rem)`, the largest the longest figure can be and
  still sit inside its box at every width. base.css keeps §1.3 verbatim,
  so reverting is deleting one block. If the figure ever shortens, revert.
- **§3.5's portrait rule contradicts §3.5's own diagram, and neither fits
  at 768.** The prose says the portrait sits "above the title on mobile,
  beside the text on desktop"; the diagram draws it above the title at
  every width. Measured, beside-the-text does not fit at 768: the chapter
  column is 531px there, and a 320px photo would leave the copy 36ch. It
  clears 45ch from 1024 up. So the build floats it alongside from 1024 and
  stacks it below that — the prose where the prose is possible, the diagram
  where it is not. Costs one breakpoint beyond 768, in `.portrait` only.
- **§1.2's `--accent-dim` "metric box hover" collides with §6's AA floor.**
  `--ink-muted` on `--accent-dim` is 4.34:1 — under 4.5 for text at
  `0.8125rem`. So the lit box moves its label and note to `--ink` (15.5:1)
  at the same time as the wash. Handled with one custom property,
  `--metric-fg`, set on `.metric` and read by both children.

---

## Things to know before touching the code

- **Sections are full-bleed; content sits in an inner `<div class="shell">`.**
  That's what lets the Impact band and footer gradient reach the edges.
  Every new section follows the same pattern.
- **All five rotator lines live in the HTML, not in `rotator.js`.** §0
  forbids JS supplying content. Only `.is-current` is in flow; the rest
  are `display: none`. Anything that changes the rotator must preserve
  this.
- **base.css has no global `prefers-reduced-motion` override, on
  purpose.** The usual blanket rule needs `!important`, which the project
  rules forbid. Every component declares its own reduced-motion
  behaviour — nav and hero already do; cards, staircase, counters and
  reveals still must.
- **Section titles repeat their own margin rule.** `.work h2`,
  `.impact h2` and `.about h2` all carry `margin-bottom: var(--s-5)`. The
  footer will want it too. Consolidate into one rule once it exists —
  step 13 is the natural place, and it is a rhythm rule, so `layout.css`.
- **The chapter hairline runs the full shell, not just the chapter
  column.** §3.5's diagram draws it across the right-hand column only,
  leaving the year column an unbroken spine. Full width is one declaration
  against four and reads the same at a glance, so that is what is built.
  Scoping it to `.chapter-body` later is a small, contained change.
- **`768px` is no longer quite the only breakpoint.** Cards go 1-up, the
  staircase flattens, the sticky year collapses, and section rhythm
  switches — all at 768. One component needed a second one and says why in
  its own comment: the portrait moves beside the text at 1024. That is the
  only one. Hold new breakpoints to that standard — a measured reason, in
  a comment, scoped to one component.
- **`site.webmanifest` is deliberately not linked.** Its icon paths are
  root-relative (`/web-app-manifest-192x192.png`) and would break §0 both
  now and after promotion. Two-line fix whenever it's wanted.
- **Nav bracket semantics.** Brackets are real characters on all three
  items with opacity carrying the state, so a screen reader announces
  "[ Projects ]" even on inactive items; `aria-current` carries the real
  state. Flagged for the step 14 pass.
- **Nav targets.** Home → `index.html`, Projects → `#work`, About →
  `#about`. v1 had no scrollspy, so the active bracket is per-page, not
  per-section.
- **Images.** The portrait and all three card media slots are
  fixed-ratio placeholders. `img-david.jpg` in `v2/assets/img/` is **not**
  the About portrait — David supplies one image per section later.
- **How a card media slot accepts its asset.** `.card-media` holds the
  16:10 box with `aspect-ratio`; `.card-media img, .card-media video` are
  already sized `100%/100%` with `object-fit: cover`. Dropping an `<img>`
  or a `<video poster>` inside the span and deleting the
  `.card-media-label` is the whole change — no CSS edit, no layout shift.
- **`.card-head` was added to the step 2 skeleton.** §3.3's diagram shows
  `01 · SACEM` on one line, and the index and title were loose siblings in
  a column. They are now wrapped in a `<div class="card-head">` on all
  three cards. The `·` is a `::after` on `.card-index`, not a DOM
  character — unlike the nav brackets it encodes nothing, so keeping it
  out of the accessibility tree is the better trade.
- **Phone number is intentionally gone** from the contact block.
- **The build environment has no Node, npm or browser — but it does have
  a JS engine.** `osascript -l JavaScript` runs JavaScriptCore, so a file
  like `counters.js` can be exercised for real: stub `document`,
  `window.matchMedia`, `IntersectionObserver` and
  `requestAnimationFrame`, `eval` the source, and drive the frames by
  hand with fixed timestamps. `counters.js` was checked that way — 18
  assertions covering all four figure shapes, the easing curve, the
  reduced-motion paths and the first-intersect-only rule. The harness is
  deliberately **not** in `v2/`: §4 gives no place for a test file and it
  would ship to the live site at promotion. Worth rebuilding for
  `reveal.js` at step 11.
- **What still cannot be checked here.** Anything that needs layout or
  paint: cadence, crossfade, blink rate, the staircase rhythm, spacing and
  contrast in situ. Those need a human looking at the page.
