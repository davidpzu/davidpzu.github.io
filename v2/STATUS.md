# STATUS — v2 rebuild

Handoff notes. Companion to `design.md`, which stays the spec — this file
only records where the build actually is and what is still undecided.
Delete at promotion.

**Last updated:** after build step 6 (rotator.js + caret).

---

## State of play

Steps 1–6 done. Next up is **step 7, work cards**.

Only step 1 is committed (`7645aab`). Everything since — the whole
skeleton, layout, nav, hero and rotator — is loose in the working tree.
Commit before doing anything risky.

| File | State |
|---|---|
| `v2/index.html` | All five sections, complete semantic skeleton |
| `v2/assets/css/tokens.css` | Done, committed |
| `v2/assets/css/base.css` | Done, committed |
| `v2/assets/css/layout.css` | Shell, rhythm, 12-col grid, `.band-alt` |
| `v2/assets/css/components.css` | Nav + hero only. Cards, staircase, chapters, footer still to come |
| `v2/assets/js/rotator.js` | Done |
| `v2/assets/js/reveal.js` | Empty (step 11) |
| `v2/assets/js/counters.js` | Empty (step 9) |

Also true: repo root untouched, CV is in `v2/assets/` and its link is
live, favicons linked, `_typecheck.html` deleted but recoverable from
`7645aab`.

---

## Needs a decision

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
in the footer — there is no GitHub link anywhere in the repo, and it
should not be inferred from the domain.

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
- **`768px` is the only breakpoint.** Cards go 1-up, the staircase
  flattens, the sticky year collapses, and section rhythm switches — all
  at 768.
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
- **Phone number is intentionally gone** from the contact block.
- **The build environment has no Node, npm or browser.** Everything so
  far is verified structurally — parse checks, path resolution, heading
  outline, brace balance. Cadence, crossfade, blink rate, spacing and
  contrast in situ are unverified and need a human looking at the page.
