# STATUS — v2 rebuild

Handoff notes. Companion to `design.md`, which stays the spec — this file
only records where the build actually is and what is still undecided.
Delete at promotion.

**Last updated:** after build step 15 (performance pass). Steps 11–15, the
nav redesign, the CV button and both `design.md` edits are committed as
`16928bb`; this file follows in the commit after it, as it did last time —
a file cannot name its own hash.

---

## State of play

Steps 1–15 done. **The §5 build order is finished.** What is left is not
a step: the open items below, the two things no machine here can do
(Lighthouse, and looking at the page), and promotion.

Everything is committed, across five commits on `main`: `7645aab`
(step 1), `d05f724` (steps 2–6), `9774a97` (steps 7–10), `7bc6a3f` (STATUS)
and `16928bb` (steps 11–15, the nav redesign and both `design.md` edits),
with this file following one commit behind as before. **Nothing outside
`v2/` was touched, and nothing is pushed** — `main` sits ahead of
`origin/main`. Pushing publishes the preview to `davidpzu.github.io/v2/`
via GitHub Pages; the `noindex` tag is in place for exactly that reason.

Three things were deliberately kept out of `16928bb`:

- **The root drift is untouched and still uncommitted.** `README.md` is
  still deleted in the working tree, the three root `.DS_Store` files still
  show as modified, and `CLAUDE.md` is still untracked. All of it sits
  outside `v2/`, which the project rules put off limits.
- **`v2/.DS_Store`, `v2/assets/.DS_Store` and `v2/assets/img/.DS_Store` are
  untracked and were not staged.** Committing them would add Finder noise
  to a repo that already carries three tracked ones it does not want. A
  `v2/.gitignore` is *not* the fix: `mv v2/* .` at promotion does not move
  dotfiles, so it would be left behind and `rmdir v2` would then fail.
- **`my-origins.png` was committed** (920 KB), because it is David's own
  file sitting inside `v2/`. Worth knowing that git keeps blobs forever and
  that item 0 says this one is the wrong format and will be replaced.
  Nothing is pushed, so dropping it from history is still cheap.

**Commit authorship is wrong across all five commits.** See the note below.
That is the thing to fix before the first push, and fixing all five at once
is far easier than unpicking it later.

| File | State |
|---|---|
| `v2/design.md` | §3.1 rewritten for the bare nav; §3.1/§3.3/§3.6 amended for step 14 |
| `v2/index.html` | All five sections, complete semantic skeleton |
| `v2/assets/css/tokens.css` | Done, committed |
| `v2/assets/css/base.css` | Focus, `scroll-margin-top`, link reduced-motion |
| `v2/assets/css/layout.css` | Shell, rhythm, 12-col grid, `.band-alt` |
| `v2/assets/css/components.css` | Nav, hero, cards, staircase, chapters, chapter reveal, footer. All sections styled |
| `v2/assets/js/rotator.js` | Done |
| `v2/assets/js/reveal.js` | Done, linked with `defer` |
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
No `user.email` is configured, so git auto-detects it — true of all five
commits in this repo. That address is not a GitHub account, so none of this
history will attribute to David's profile. `16928bb` was left consistent
with the other four rather than being the odd one out; the fix is to set
`user.email` and rewrite all five together, and it has to happen **before
the first push**. Worth doing on a portfolio repo.

---

## Needs a decision

**0. `my-origins.png` was replaced and rechecked at step 15. It is not a
portrait, and `.portrait-slot` was built for the wrong kind of asset.**
Now 957 × 738, 920 KB — a quarter of the old resolution, near enough the
same bytes. The aspect ratio is unchanged at 1.297:1.

Opening it is what matters: **it is a composited collage on a transparent
background**, not a photograph. A childhood photo of David in headphones
sits in the middle, and a Sony CD Walkman, a Nike football and a
PlayStation 2 are cut out around it, deliberately breaking outside the
photo's rectangle onto transparency. The caption *"Always passionate about
music"* is baked into the pixels.

Four things follow, and the first two are new:

- **The slot's shape fights the asset.** `object-fit: cover` at 4:5 keeps
  the middle 61.7% of the width and crops **183px from each side** — which
  is almost exactly the Walkman and almost exactly the PlayStation. The
  crop removes the music and the videogames, which is what the chapter's
  copy is actually about. A centred crop is not a smaller version of this
  image, it is a different one.
- **The slot's chrome fights it too.** `.portrait-slot` fills with
  `--paper-alt` and rounds to `--radius`. This asset is a cut-out that
  wants the page's own ground behind it and no corners at all. §3.5's
  "portrait photo, square or 4:5, `--radius`, max 320px" describes a
  different thing entirely.
- **920 KB, and the right format cannot be produced here.** Transparency
  rules out JPEG, and PNG is the wrong compressor for a photograph — hence
  1.3 bytes per pixel. WebP does alpha *and* photographs, but there is no
  `cwebp`, no ImageMagick and no `pngquant` on this machine, and `sips`
  reads WebP without being able to write it. Nothing here can produce the
  file this needs.
- **Alt text still has to come from David.** §3.5 requires real alt text.
  Now that the content is known it could be *drafted* for approval — it
  would have to carry the baked-in caption too, since text in an image is
  unreadable to AT and to anyone who needs to resize it (WCAG 1.4.5).

**Nothing was wired in and nothing was cropped.** The recommendation, if
the collage is the intended direction: give the slot the asset's own
ratio, drop the `--paper-alt` fill and the `--radius`, and let it run wider
than 320px. That is a real change to the chapter's proportion, so it is
David's call, not a step 15 fix.

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
way — verified again at step 12 against `about.html`. v1's `placeholder`
attributes were not carried over and step 12 did not put them back: the
labels are visible mono, so the hints would be decoration, and placeholder
text is copy that §3.5 does not contain.

**3. ~~The nav pill no longer darkens on scroll.~~ Closed by the nav
redesign.** There is no pill to darken. `.nav.is-scrolled` and its rule are
deleted, so nothing is waiting on a script here any more. Item 2 still
wants a decision on its own; it no longer has company.

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
close it. Step 9 did **not** quietly resolve this: `counters.js` touches
the figures only and leaves the buttons alone, because which file owns that
wiring is exactly what is undecided.

**Step 14 looked at it and deliberately left it.** It is not an automated
failure — no checker can tell that the note is on screen — and the fix is a
choice between three approaches, one of which adds a fourth JS file. It is
also the mildest of the three: because the notes never leave the
accessibility tree (item 11), a screen reader already has all four, so
`aria-expanded` is not hiding anything from anyone, it is merely untrue.
Step 14 fixed what was unambiguously broken and left what needs a decision.

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

**14. §3.5's fallback cannot fully rule out a flash at load, and only a
browser can say whether it does.** The mechanism is the spec's, not a
choice: the chapters render visible from the markup, and `reveal.js` strips
`.is-visible` before it observes. If the browser paints before the deferred
script runs, whatever is in view blinks visible → hidden → fades back. Half
of it is already handled — the transition is declared on
`.chapter.is-visible` only, never on the bare `.chapter`, so the strip is
instant instead of a 500ms fade-*out*, which is the ugly half. The
remaining single-frame risk is inherent to a markup-default fallback and
cannot be measured in this environment. If it shows up at step 13, the fix
is a different mechanism than §3.5 describes — an inline
`document.documentElement.classList.add('js')` in `<head>` and a
`.js .chapter` selector — so it needs a decision, not a drive-by.

**15. Chapter 1 reveals at load, not on scroll.** It sits above the fold,
so its first intersect is immediate and it fades in as the page settles.
That is §3.5 read literally — "each chapter animates on its own entry" —
but it reads as a page-load animation rather than a scroll one, which is a
judgement only a human at the page can make. Leaving it alone is correct
until someone says otherwise.

**16. Hidden chapters stay in the accessibility tree.** Same trade as item
11 and for the same reason: the reveal fades with `opacity` alone, never
`display` or `visibility`, so a screen reader has all three chapters from
the start regardless of scroll position, and nothing is gated behind
motion. Here it is unambiguously the right side of the trade — the About
copy is the content — but it is a choice, so it is written down.

**17. The footer's bottom padding breaks §1.4's "one rule, no
exceptions".** `padding-top` is still `--s-8`, where the rhythm is doing
its actual job — the gap from the About section. `padding-bottom` is
`--s-3`. The reason is measured, not aesthetic: §3.6 puts the colophon over
the accent end of the gradient and requires it to be `--paper`, and
`--paper` only clears AA from 90% down. Symmetric `--s-8` holds the
colophon 160px clear of the bottom, which on any realistic footer height
lands it around 82% — the one band where neither `--ink` nor `--paper`
clears 4.5:1. `--s-3` puts it past 90%, and it stays there for any footer
taller than 440px, which every viewport gives. Related to item 4: if the
rhythm goes single-sided everywhere, this stops being an exception.

**18. ~~The `--accent` focus ring on the submit button.~~ Resolved at step
14 — read this for the reasoning, not for an open question.** Over this gradient
`--accent` clears 3:1 only down to 72%, and the submit button is the
lowest focusable thing in the page. The layout is built to keep it above
that line — two columns instead of a stack, and `calc(var(--s-8) +
var(--s-6))` above the colophon — which holds as long as the footer's top
edge through the bottom of the button measures **709px or less**. Estimated
at ~660 desktop and ~750 mobile when this was first written.

**Step 13 measured it more carefully and it does not clear, at either
end.** The first estimate under-counted the form: three labelled fields
with a five-row textarea and the submit come to ~416px, not the ~330 first
assumed. Recomputed, the button lands at **~73% at 1440** and **~76% at
375** — needing ≤72%. The accent ring there is roughly 2.7:1 and 2.6:1
against a required 3:1. Mobile is worse because the columns stack, putting
the 416px form under the 187px contact block.

Left as it is, deliberately, because it is one of the open questions and
because the three exits are not equivalent:

- **Lengthen the colophon's top margin.** Needs ~292px to cover 375, i.e.
  `calc(var(--s-8) + var(--s-8))`. That is a third of a phone screen of
  empty gradient, and it fixes the symptom by making the footer taller.
- **Drop the footer's `padding-top` to `--s-7`.** Fixes 1440 and does
  nothing for 375, where the padding is already `--s-6`.
- **Give footer focus rings `--ink`.** One declaration, clears 3:1 down to
  97%, works at every width and cannot drift when copy changes.
  Recommended. The cost is §6's "using `--accent`", which the rest of the
  page would still honour — the footer is the only ground on this site
  where accent stops being legible.

**Step 14 took none of those three.** All of them treat the ring's colour
or the footer's height as the variable. The actual variable is the ground,
which is a gradient and therefore unknowable at any fixed point. So on
`:focus-visible` the control paints its own ground — `background:
var(--paper)` with `outline-offset: 0`, so the ring sits flush against
`--paper` at 6.54:1 instead of 2px out over cobalt. That holds at any depth
the footer ever grows to, needs no measurement, cannot go stale when copy
changes, and keeps §6's `--accent` ring rather than trading it for `--ink`.
§3.6's "no boxes" is untouched: nothing paints unless a control has
keyboard focus. The same rule covers the contact links, which already
cleared on their own — included so the rule cannot rot.

**19. Three things in the footer are reads of §3.6, not lines in it.**
Flagging together because they are all the same kind of call. The headline
size — §1.3 has no row for an "oversized" headline, so it is
`clamp(2.75rem, 8vw, 6rem)`, whose floor is set by "Let's talk." staying on
one line at 375px. The two-column layout — §3.6 lists the contact block and
the form but never places them; stacked they add ~180px and push the form
into item 18's danger band, which is why they are side by side. And the
contact list's size — §3.6 says "mono, one per line, generous leading" and
nothing about size, so it takes §1.3's body size with the display face
swapped in, at `line-height: 2.2`.

**20. ~~At 375 the nav pill clears the hero by 6px.~~ Fixed by the nav
redesign.** The pill's padding, border and radius were most of its 46px
height. Three bare links with a 28px target box put the underside at 48px
instead of 66px, so clearance at 375 goes from **6px to 24px**, and from
94px to 112px at every width above it. No longer entangled with item 4.

**21. ~~The nav's links land their target under the nav.~~ This was wrong,
and no `scroll-margin-top` is needed.** The claim assumed the scroll lands
the section *title* at the viewport top. It does not: the scroll lands the
section's border box there, and every section's border box opens with the
rhythm's `padding-block` — `--s-6` at 375, `--s-8` above it. So the title
arrives 72px or 160px down, against a nav underside of 66px with the old
pill and 48px now. It was never covered; it was the same 6px squeeze as
item 20, measured somewhere else. With the bare nav both read +24px at 375
and +112px above. Nothing to fix, and nothing was changed for it.

**22. Three fits are decided by a font metric this environment cannot
read.** Geist Mono is treated throughout as 0.6em advance (unitsPerEm 1000,
advance 600). That is almost certainly right, but it could not be confirmed
here: the fonts ship as `.woff2`, Python has no `brotli` to decompress
them, and CoreText refuses to load woff2 through
`CTFontManagerCreateFontDescriptorsFromURL`. Three measurements sit close
enough to the edge that a wider advance would change the answer, all at
768, all previously flagged on their own terms:

| what | available | needed | spare |
|---|---|---|---|
| `41% → 59%` in its box (item on §1.3) | 124.6px | 121.0px | 3.6px |
| `2018–2020` in the sticky year track | 128.0px | 125.3px | 2.7px |
| ~~nav pill against the viewport~~ | ~~375px~~ | ~~320.7px~~ | ~~54.3px~~ |

The nav row is gone with the pill — the bare links measure 230.7px against
345px of shell at 375, which is not a close call. **The first two rows are
untouched by the nav redesign**: they are in Impact and About and have
nothing to do with it. They remain the ones to look at in a browser. A
related unknown: the `→` in `41% → 59%` is assumed to be in the latin
subset. If it is not, it falls back to another face at a different width
and the 3.6px goes.

---

**23. The bare nav is unreadable over the footer, and that is the
redesign's one real cost.** With nothing painted behind the links, their
contrast is whatever scrolls under them. Measured, at `--ink-muted` on
0.75rem text needing 4.5:1:

| ground | `--ink-muted` | `--ink` |
|---|---|---|
| `--paper` — hero, work, about | 4.99 | 17.87 |
| `--paper-alt` — impact band | 4.65 | 16.65 |
| footer gradient at 55% | 4.34 | 15.52 |
| footer gradient at 80% | **1.67** | 5.96 |
| footer gradient at 100% | **1.31** | **2.73** |

Over the page proper it clears AA, though `--paper-alt` at 4.65 and the
footer's top at 4.34 are both thin — the resting `--ink-muted` is the weak
link, and the active/hover `--ink` is never in doubt. Over the bottom half
of the footer the links effectively vanish, and `--ink` would not save them
either: nothing legible sits on cobalt except `--paper`. Accepted knowingly
when the bare option was chosen over a blurred strip. There is also a
collision the numbers do not capture: the links now pass directly over card
borders and chapter text, which is a legibility problem no contrast ratio
describes. Both want a human at the page. If either turns out to matter,
the cheap exits are a `--paper` link colour that swaps in over the footer,
or going back to a ground behind the links.

**Step 14 fixed the focus half of this, not the resting half.** A focused
nav link over the footer was worse than the text: `--accent` on `--accent`
is a 1:1 ring, completely invisible, and no single colour survives the trip
— `--ink` is 2.73:1 on cobalt and `--paper` is 1:1 on `--paper`. So
`.nav-link:focus-visible` paints its own `--paper` ground with
`outline-offset: 0`, the same mechanism as the footer form in item 18.
**The resting text is untouched and this item stays open**: keyboard focus
is now fine everywhere, reading the links over cobalt is not.

**24. ~~`design.md` §3.3 still asks for `aria-disabled`.~~ Done — the spec
is now current with step 14.** Four amendments, not one: §3.3 drops the
`aria-disabled` instruction and says why it must not come back; §3.1's
bracket bullet records the `aria-hidden` and hands the screen-reader job to
`aria-current`, keeping copy-paste as the reason the brackets are real
characters; §3.1 gains the nav's `:focus-visible` ground, marked *do not
undo*; and §3.6 records the two markup additions allowed against "restyle
only" (`autocomplete`, `class="eyebrow"`) and states that "no boxes"
describes the form at rest, with the focus ground and its 2.6:1 reason.

`design.md` and the build now agree everywhere except the items still open
below. **Read the spec, not this file, for what the site is.**

**25. The contact block's longest line wraps at 375 and below.**
"Available for senior product roles" is 34 mono glyphs, ~347px, against
345px of shell at 375 — over by 1.8px, so it takes two lines there and at
320. It is wrapping, not overflow: nothing scrolls horizontally, because
the longest *unbreakable* token in that list is the email at 275px, which
fits at 320 with 19px to spare. But §3.6 says "mono, one per line", and at
the narrow end one line becomes two. Dropping the list to `1rem` fixes 375
and not 320. Left alone as the smallest of the open questions.

**26. Step 15 could not run Lighthouse, and that is half of what §5's step
15 asks for.** No browser on this machine. §6 wants performance ≥ 95 and
accessibility 100, and both are verdicts only a browser gives. What step 15
*could* do was measure, and the numbers are good: **the page loads 121.6 KB
against §6's 800 KB budget** — 63.1 KB of fonts, 35.7 KB of CSS, 13.9 KB of
HTML, 8.9 KB of JS, and one 539-byte favicon. No images load at all yet,
which is the whole reason there is so much headroom, and item 0 is what
will spend it.

**27. Fonts could not be subsetted further, and do not need to be.** The
five `.woff2` files are already `latin` subsets from
google-webfonts-helper. Re-subsetting to the glyphs the page actually uses
would need `fontTools` and `brotli`, neither of which is installed, and it
would save perhaps 20 KB on a page with 678 KB of headroom. **Syne is the
one thing worth knowing:** `--font-mark` and `.wordmark` exist but no
element in `index.html` uses them, so the browser never fetches
`syne-v24-latin-700.woff2`. It costs **0 bytes on load** and 14 KB in the
repo. Not a performance problem — a "decide whether the wordmark is
coming back" problem.

**28. 2.2 MB of v1 assets sit in `v2/assets/` that the page never
references.** `img-david.jpg` (443 KB — and per §8 not the About portrait),
`my-origins.png` (920 KB), three SACEM case-study JPEGs (554 KB, for the
page item 1 says does not exist yet), and ten tool icons (240 KB, for the
"Beyond the screen" section §7 explicitly rules out). None of it loads, so
none of it touches §6's budget — but **all of it ships at promotion**,
where `mv v2/* .` copies it to the live site. Nothing was deleted: §8 says
ask first, and the SACEM images are load-bearing for a page that has yet to
be built. Worth a decision before promotion, not before.

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
- **Section titles repeat their own margin rule, and the footer is not
  one of them.** `.work h2`, `.impact h2` and `.about h2` all carry
  `margin-bottom: var(--s-5)`; consolidating those three into one rule is
  still worth doing at step 13, and it is a rhythm rule, so `layout.css`.
  The footer headline deliberately stays out: it is 96px tall against the
  section titles' 44px, so the gap under it comes from
  `.footer-cols { margin-top: var(--s-6) }` instead. Do not fold it in
  without looking at it.
- **The chapter hairline runs the full shell, not just the chapter
  column.** §3.5's diagram draws it across the right-hand column only,
  leaving the year column an unbroken spine. Full width is one declaration
  against four and reads the same at a glance, so that is what is built.
  Scoping it to `.chapter-body` later is a small, contained change.
- **`768px` is no longer quite the only breakpoint.** Cards go 1-up, the
  staircase flattens, the sticky year collapses, and section rhythm
  switches — all at 768. **1024 is the only other one, and two components
  now use it**: the portrait moves beside the text there (step 10), and the
  rotator drops its height reservation there (step 13). Step 13 deliberately
  did not add a third — the rotator's true wrap points are 433px and 865px,
  but those follow from the font metric of item 22, so pinning a breakpoint
  to them would be false precision. Hold new breakpoints to that standard:
  a measured reason, in a comment, scoped to one component.
- **`site.webmanifest` is deliberately not linked.** Its icon paths are
  root-relative (`/web-app-manifest-192x192.png`) and would break §0 both
  now and after promotion. Two-line fix whenever it's wanted.
- **The nav diverged from §3.1, and §3.1 has been rewritten to match.**
  The pill, its 50px radius, its 1px border, its translucent fill and its
  `blur(16px)` are gone, replaced by three bare fixed links — David's call,
  made after step 13. `design.md` §3.1 now specifies the bare links, the
  shell alignment, the 28px target, the `pointer-events` rule and the
  footer contrast cost, and opens with a note saying the pill was removed
  deliberately. The §3.2 hero diagram was updated in the same pass. **The
  spec and the build agree on the nav; read §3.1, not this bullet, for what
  the nav is.** This is also the precedent for the `## Known spec
  contradictions` section below: those are still recorded only here, and
  still want the same treatment.
- **The nav aligns itself with the page now, and how matters.** The pill
  was centred, so it needed no relationship to anything. The bare links sit
  on the shell's left edge, in line with the `h1` and every section title.
  That is done by giving the fixed `<nav>` `left: 0; right: 0` and putting
  the same `<div class="shell">` inside it that every section uses — same
  mechanism, so the two cannot drift apart at any width or scrollbar. The
  nav therefore spans the viewport while painting nothing, which is why it
  carries `pointer-events: none` with `auto` restored on `.nav-link` alone:
  an invisible full-width strip must not swallow clicks.
- **Nav bracket semantics — settled at step 14.** Brackets are real
  characters on all three items with opacity carrying the state, so a
  screen reader was announcing "[ Projects ]" on inactive items, where the
  brackets are invisible and encode nothing. They now carry
  `aria-hidden="true"`: the state reaches assistive tech through
  `aria-current`, which is the correct mechanism, and the brackets stay
  real DOM characters so §3.1's copy-paste rationale still holds —
  `aria-hidden` affects the accessibility tree, not selection.
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
- **What step 13 checked, and the two things it changed.** Every component
  was measured at 375 / 768 / 1024 / 1440 rather than eyeballed, since
  there is nothing here to eyeball with. Clean at all four: the nav pill
  (320.7px, fits 375), the hero `h1` (wraps to two lines at 375 only, as
  intended), the work cards, the staircase, the chapter column and the
  portrait float, the footer headline, and horizontal overflow anywhere.
  Two things were not clean, and both are now fixed:

  - **The rotator changed the page height every four seconds.** The five
    lines are different lengths, so below the width where the longest fits
    on one line, some wrap and some do not — 375 alternated between two and
    three lines, 768 between one and two, and everything under the hero
    moved with it. `.rotator` now reserves the tallest state with a
    `min-height` in `em`, stepped at 768 and 1024.
  - **The footer contact block overflowed its column at 768.** "Available
    for senior product roles" is 34 mono glyphs, ~347px, against the 264px
    a plain `1fr` track gets at that width, and none of those lines has a
    sensible wrap point. The track is now `minmax(max-content, 1fr)`; above
    ~1010px the `1fr` share overtakes the floor on its own, so the wide end
    is exactly as it was.

  Both fixes are CSS only. No markup changed at step 13.
- **What step 14 changed, and what it verified.** Five changes, each
  because something was actually wrong rather than to tick a box:

  | change | why |
  |---|---|
  | `aria-disabled` removed from both WIP cards | not allowed on `role=listitem`; an axe failure. Item 24 |
  | `aria-hidden` on the six bracket spans | invisible brackets were being announced; `aria-current` is the real mechanism |
  | `role="list"` on all four `list-style: none` lists | Safari/VoiceOver drops list semantics without it |
  | `autocomplete` on the name and email inputs | WCAG 1.3.5, AA. Field names and the action URL untouched |
  | `scroll-margin-top` on every focusable, in `base.css` | the fixed nav paints nothing, so a browser will scroll a newly focused element under it. WCAG 2.4.11 |

  Plus the two `:focus-visible` ground rules of items 18 and 23, and one
  reduced-motion gap: `base.css`'s own `a { transition: color }` was the
  only transition on the page with nothing standing it down. It now
  retires itself under `prefers-reduced-motion` — same selector, later in
  the file, so no `!important`, which is why the "no blanket override"
  note above still holds.

  Verified and clean, by computation rather than by eye: **tab order**
  (16 focusable elements, DOM order matches visual order — the staircase's
  `translateY` moves boxes visually but not in the DOM, and left-to-right
  is the reading order either way); **contrast** (13 text and non-text
  pairs, zero failures, thinnest is `--ink-muted` on `--paper-alt` at
  4.65:1); **reduced motion** (14 animated selectors, all 14 retired);
  **JS off** (rotator line one, all three chapters, every metric figure and
  the whole disclosure render from markup and CSS alone); and **reflow at
  320px** (WCAG 1.4.10 — no horizontal overflow, the tightest being the
  email address at 275px in 294px of shell).
- **No `<noscript>` element, and none is wanted.** §3.2 asks that line one
  of the rotator render statically with JS off. That is already what
  happens: `.is-current` is in the markup and CSS shows only that line. A
  `<noscript>` block would render *in addition* to it, so line one would
  appear twice. The markup default is the mechanism §3.2 describes, not a
  substitute for it.
- **The CV link is a button now, and the system had no button to copy.**
  §3.5 asks for mono, accent on hover, and the file type and size in the
  label; it says nothing about shape, and nothing else in the build is an
  enclosed control — `.form-submit` is a ruled line, and it belongs to the
  footer's gradient problem. `.cv-button` takes the **card's** idiom
  instead, the one "this is clickable" enclosure the system has: a 1px
  border going `--accent` on hover, at caption metrics. Two deliberate
  departures from the card. It is **square**, because §1.4 scopes
  `--radius` to cards and metric boxes and calls everything else square.
  And its border is `--ink`, not the card's `--rule`: `--rule` on `--paper`
  is **1.27:1**, fine for a hairline between sections but not for the
  boundary of a control, where WCAG 1.4.11 wants 3:1. `--ink` is 17.9:1 and
  matches the ruled line the submit button already carries. Measures
  265 × 52px, fits the chapter column at every width from 320 up, and the
  `↓` is decorative — `aria-hidden`, like `.caret` and `.status-dot`.
  The label's "194 KB" was re-checked against the file: 193.9 KB.
- **Three fonts are preloaded, and the fourth deliberately is not.** Geist
  Mono 400 and 500 and Inter Tight 400 all render above the fold, and
  without a preload none is discovered until `components.css` has parsed.
  Inter Tight 600 is left out because it is only the `h3`s, which are all
  below the fold. `crossorigin` is on all three and is **required even
  though they are same-origin** — font fetches are always CORS, and without
  it the browser downloads each file twice. This adds no bytes; it moves
  when they start.
- **The footer gradient bans two tokens outright.** Measured against §6's
  AA floor on the gradient exactly as §3.6 writes it, and repeated in a
  comment at the top of the footer block in `components.css`:

  | token | 4.5:1 (text) | 3:1 (borders, focus) |
  |---|---|---|
  | `--ink` | top down to 86% | top down to 97% |
  | `--ink-muted` | top down to 40% | top down to 65% |
  | `--rule` | from 96% down | from 86% down |
  | `--accent` | top down to 61% | top down to 72% |
  | `--paper` | from 90% down | from 81% down |

  So: **nothing in the footer is `--ink-muted`** — which is the rest of the
  site's default for meta, captions and the `.meta` class, and is why the
  colophon overrides it and the form labels are `--ink`. **No hairline in
  the footer is `--rule`** — the field underlines and the submit button's
  rule are `--ink`, or they would fade out at exactly the depth the form
  sits at. And the colophon is the only thing allowed past 90%.
- **Step 12 added three things to the step 2 footer markup**, same kind of
  change as `.chapter-body` and `.card-head`: a `<div class="footer-cols">`
  wrapping the contact list and the form, `class="eyebrow"` on the three
  labels so they take §1.3's mono label role rather than a duplicated type
  block, and `class="form-submit"` on the submit button. The Formspree
  action URL and the three field names are untouched.
- **There is no hairline above the footer, on purpose.** The gradient's
  first stop is `--paper`, the same ground the About section sits on, so
  the two meet seamlessly and a `--rule` line would only cut the fade in
  half. Every other section boundary still has one, from
  `main > section + section` in `layout.css` — which does not reach the
  footer, so nothing had to be undone.
- **How the chapter reveal is wired.** `.is-visible` is a real class in
  `index.html` on all three `<article class="chapter">`. `components.css`
  styles the bare `.chapter` as the hidden state (`opacity: 0`,
  `translateY(16px)`) and `.chapter.is-visible` as the shown one; the
  `transition` lives on the shown state only, deliberately — see item 14.
  `reveal.js` checks for `IntersectionObserver` and for reduced motion
  *before* it strips anything, so in either of those cases the markup's own
  class is never removed. Reduced motion switched on mid-scroll disconnects
  the observer and hands every chapter its class back at once, with the CSS
  dropping the transition under the same query so they arrive instantly.
  Reveal is once-only: the target is unobserved on first intersect, so
  scrolling back up does not re-hide it.
- **`reveal.js` was unit-tested the same way `counters.js` was** — 27
  assertions under `osascript -l JavaScript` against a stubbed `document`,
  `matchMedia`, `IntersectionObserver` and `classList`, with observer
  callbacks and the `change` event driven by hand. Covered: the
  `.about .chapter` selector, the `0.25` threshold, strip-on-load,
  single-chapter reveal, mixed batches, non-intersecting entries,
  once-only, both no-op paths (no observer, reduced motion at load), the
  mid-scroll toggle in both directions, and an empty page. The harness is
  outside `v2/` for the same reason counters' was — §4 gives it no place
  and it would ship at promotion.
- **What still cannot be checked here.** Anything that needs layout or
  paint: cadence, crossfade, blink rate, the staircase rhythm, spacing and
  contrast in situ. Those need a human looking at the page. Step 12 added
  two more to that list, both in `## Needs a decision`: whether the reveal
  flashes at load (item 14), and where the submit button actually lands in
  the footer gradient (item 18). The contrast *numbers* are computed and
  exact; what is estimated is which percentage each element sits at, and
  only a browser can settle that.
