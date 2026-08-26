# STATUS — v2 rebuild

Handoff notes. Companion to `design.md`, which stays the spec — this file
only records where the build actually is and what is still undecided.
Delete at promotion.

**Last updated:** after the post-build pass of 2026-08-26 — David's
instructions on the About images, the SACEM case study, the footer GitHub
row and item 26. Nothing here is committed yet.

---

## State of play

The §5 build order finished at step 15. Since then, one pass of changes
David asked for directly:

| what | state |
|---|---|
| `the-beginning.png` replaces `my-origins.png` | wired, chapter renamed **The Beginning** |
| `.portrait-slot` removed | now `.chapter-media` — **one image per chapter**, all three |
| SACEM case study | **built** — `work/sacem/index.html`, v1 ported onto the v2 system |
| footer GitHub row | removed, and §3.6 now says not to add it back |
| Sanofi Connect descriptor | still a placeholder, deliberately (item 6) |
| item 26 (Lighthouse) | **closed** — David runs it himself |
| all images → AVIF | 1476 KB of PNG/JPEG became **206 KB**, 86% smaller |

All of it is **committed** as `e4d47a3`, with this file following in the
commit after it as it has each time — a file cannot name its own hash.
**Nothing is pushed:** `main` is 7 commits ahead of `origin/main`. The
authorship problem is fixed for those 7; see the section below, which also
corrects the count and names the 13 pushed commits it does not cover.

### Payload, both pages

Measured, not estimated. §6's budget is 800 KB.

| | index | case study |
|---|---|---|
| html + css + js + fonts + favicon | 126.5 KB | 142.1 KB |
| images on initial load | 0 (all lazy) | 37.4 KB (hero, eager) |
| **initial load** | **126.5 KB** | **179.5 KB** |
| everything, after scrolling | 258.2 KB | 216.5 KB |

The case study carries more because of the fifth stylesheet and a much
longer document. Both are comfortably inside the budget with every image
loaded, which was not true before the AVIF pass: `the-beginning.png` alone
was 898 KB.

### New files

| file | what |
|---|---|
| `work/sacem/index.html` | the case study. Nine sections, v1's ids and v1's copy |
| `assets/css/casestudy.css` | fifth sheet, case-study pages only. The index never loads it |
| `assets/js/casestudy.js` | scroll progress + contents-rail scrollspy. 28 assertions, all passing |
| `assets/img/the-beginning.avif` | 121 KB against the PNG's 898 |
| `assets/img/projects/sacem-mensajeria/*.avif` | hero, challenge and thumb — 85 KB against 556 |

`design.md` gained **§3.7**, which specifies the case study page, and §4 now
lists the fifth sheet, the fourth script and the `<picture>` rule. §3.5 was
rewritten for the per-chapter images. Read the spec, not this file.

### Commit authorship — fixed for the unpushed commits, open for 13 others

**Done.** `user.name` / `user.email` are now set repo-locally to
`davidpzu <88293615+davidpzu@users.noreply.github.com>`, and the **seven
unpushed commits were rewritten** to that identity. `my-origins.png` was
dropped from their trees in the same pass, so the 920 KB blob is no longer
in `main`'s history at all.

Two things the earlier version of this file got wrong, both found by
actually looking:

- **It was never five or six commits — it is twenty.** The broken author
  runs from `8de1006` (2026-05-25) forward. Something wiped the git config
  that day.
- **The repo already had a correct identity, and it is not the gmail.**
  Every commit up to `ac34792` (2026-05-19) is
  `davidpzu <88293615+davidpzu@users.noreply.github.com>`. The rewrite
  matches it, so the history reads as one contributor rather than three.

**Thirteen already-pushed commits still carry the broken author**
(`56435cf` back to `8de1006`, 2026-05-25 → 2026-08-25). They were left
alone deliberately: fixing them rewrites public history, changes every SHA
from May onward and needs a force-push to a repo linked from an active CV.
They will not attribute to David's GitHub profile. If that is ever worth
doing, it is the same mechanism used here, run over `8de1006^..origin/main`
and force-pushed — a deliberate decision, not a drive-by.

**The rewrite was done with a scratch `GIT_INDEX_FILE` rather than
`filter-branch`**, for one reason worth recording: `filter-branch` and
`rebase` both refuse to run with a dirty working tree, and this tree is
permanently dirty with the root drift below — which the project rules put
off limits. Building each tree in a temporary index and replaying with
`git commit-tree` never touches the working tree, the index, or anything
outside `v2/`. Verified afterwards: the root drift is byte-for-byte what it
was, and `git diff backup-before-rewrite HEAD` is empty.

**`backup-before-rewrite` still points at the pre-rewrite tip** (`ef199df`).
It is the only thing keeping the old commits and the `my-origins.png` blob
reachable. Delete it once the pages have been looked at in a browser:
`git branch -D backup-before-rewrite`.

**Nothing is pushed.** `main` is 7 commits ahead of `origin/main`. Pushing
publishes the preview to `davidpzu.github.io/v2/`; the `noindex` tag is in
place for exactly that reason.

## Needs a decision

**0. ~~`my-origins.png` and the portrait slot.~~ Closed. David replaced the
file and changed the shape of the requirement.** Read this for what was
decided, not for an open question.

`the-beginning.png` (878 × 846, near enough square) replaces it, and the
chapter is now titled **The Beginning**. More importantly the requirement
itself changed: **every chapter gets its own image**, not one portrait for
the section. `.portrait` / `.portrait-slot` are gone; `.chapter-media` is
the replacement and it is on all three chapters. Chapters two and three
carry placeholder boxes until their files arrive.

The three complaints in the old item 0 are all answered:

- **No cropping, because nothing has a fixed ratio any more.** The `<img>`
  carries its real `width` and `height`, and CSS sizes it `width: 100%;
  height: auto`. The browser reserves the intrinsic ratio, so there is no
  layout shift, and square or 4:5 both fit without `object-fit` choosing
  what to lose. The old 4:5 `cover` box removed 183px from each side — the
  Walkman and the PlayStation.
- **No fill and no radius on a real image.** The asset is a cut-out on
  transparency whose whole point is breaking its own rectangle. The
  `--paper-alt` fill and `--radius` now live on the *placeholder* only,
  because an empty slot with no fill is invisible; the real image never
  inherits them.
- **The format problem is solved, and not with WebP.** `sips` cannot write
  WebP — it is read-only in its format list — but it *can* write **AVIF**,
  which does alpha and photographs both. 878 × 846 at quality 85 is
  **121 KB against the PNG's 898**, an 87% saving, checked by decoding it
  back and looking at it: indistinguishable, caption included. Shipped as a
  `<picture>` with the PNG as fallback, so only Safari below 16.4 pays.
- **Alt text is drafted and needs David's approval** (see item 30). It
  carries the baked-in caption, as WCAG 1.4.5 requires.

The image also ran wider: `min(360px, 38%)` where the portrait rule said
320. Measured — at 1024 that leaves the copy 405px (~50ch) and at 1440 it
leaves 510px (~63ch), both clear of the 45ch floor.

**1. ~~`work/sacem/index.html` does not exist.~~ Built.** Read this for
what it is and what is still missing inside it.

v1's `sacem.html` ported onto the v2 system: same nine sections, same ids,
same copy, restyled rather than rewritten. `design.md` §3.7 now specifies
the page — read that, not this. What is worth knowing here:

- **The contents nav is one element doing two jobs.** In the flow it is an
  ordinary "Contents" list under the page header; from **1200px** it becomes
  a fixed rail in the right gutter. No duplicated markup, and with JS off it
  is still a complete, working table of contents.
- **The reading column is 820px, not `--shell`'s 1140.** Long-form prose,
  and it is also what leaves a gutter the rail can live in — measured at
  1200, the rail fits with 18px spare.
- **v1's two Final Outcome images do not exist in this repo.** v1 pointed at
  `img/sacem/outcome-1.jpg` and `outcome-2.jpg`; that directory is absent
  everywhere. They are placeholder boxes carrying v1's captions. **This is
  the one piece of the case study that is still missing content.**
- **v1's closing "Other Projects" block was not ported.** Both cards were
  placeholders pointing back at the same page, with thumbnails from
  `dummyimage.com` — an external host, which §0 rules out. A link back to
  the work section replaces it.
- **Card 01's thumbnail is now wired** on the index, using
  `sacem-thumb.jpg`/`.avif` — that project's own asset, already in the repo.
  Easily reverted if David wants a new one; it is one `<picture>` block.
- `casestudy.js` was unit-tested the same way `counters.js` and `reveal.js`
  were: **28 assertions** under `osascript -l JavaScript` against a stubbed
  `document`, `window`, `requestAnimationFrame` and `IntersectionObserver`.
  Covered: progress at load / halfway / bottom, overscroll and iOS bounce
  clamping, rAF coalescing (20 scroll events, one paint), an unscrollable
  page not producing NaN, a missing progress bar, the scrollspy's rootMargin
  and single-mark invariant, mixed batches, no `IntersectionObserver`, no
  links, dead links, non-fragment hrefs, and all-dead links. The harness is
  outside `v2/` for the same reason the others are.

 Card 01 links to it and
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

**6. One piece of copy is still a placeholder.** Sanofi Connect's one-line
descriptor (§3.3 only ever shows two cards). David has confirmed it stays a
placeholder for now.

**The GitHub row is closed and it did not get a URL — it was removed.**
David does not publish there, so the row was a placeholder for something
that is never coming. `design.md` §3.6 now lists the contact block without
it and says not to add it back.

**7. Empty media slots have no hover response — now true of cards 02 and 03
only.** §3.3 asks the media to scale `1.02` on hover. The transform is
written against `.card-media img, .card-media video`, so an empty slot has
nothing to scale. **Card 01 now has its thumbnail**, so it does scale; the
two WIP cards do not, and their `.card-wip` class excludes them from the
hover rule anyway. Resolves itself entirely when the remaining thumbnails
land.

One thing the wiring needed: `.card-media picture { display: contents }`.
The img is sized `100%/100%` against the slot, and an inline `<picture>` box
in between would hand it an auto height to resolve against instead.
`<picture>` carries no semantics of its own, so removing its box costs
nothing in the accessibility tree.

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

**26. ~~Step 15 could not run Lighthouse.~~ Closed — David runs it himself.**
No browser on this machine, and §6's "performance ≥ 95, accessibility 100"
are verdicts only a browser gives. Marked resolved at David's instruction.

What *could* be measured is in the payload table at the top of this file,
and it improved a great deal in this pass: every image is now AVIF, so the
index loads **126.5 KB** and the case study **179.5 KB** against a 800 KB
budget, with everything loaded still only 258 KB and 217 KB. Before this
pass the About image alone would have added 898 KB and blown the budget on
its own.

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

**28. Unused v1 assets in `v2/assets/`, re-counted after this pass.** Three
of the SACEM JPEGs are now in use, so the dead weight is smaller than it
was — but all of it still ships at promotion, where `mv v2/* .` copies it to
the live site.

| file | KB | state |
|---|---|---|
| `my-origins.png` | 920 | **dead** — replaced by `the-beginning.png`. Also in git history |
| `the-beginning.png` | 898 | live, but only as the AVIF's fallback |
| `img-david.jpg` | 443 | unused, and per §8 not the About portrait |
| `sacem-hero/-challenge/-thumb.jpg` | 556 | live — the `<picture>` fallbacks |
| ten tool icons | 240 | unused; §7 rules out the section they were for |

Nothing was deleted: §8 says ask first. **`my-origins.png` is the clear one
to drop now** — David has explicitly replaced it and nothing references it.
`img-david.jpg` and the icons want a decision before promotion, not before.

**29. The case study's contents rail inherits item 23's problem, exactly.**
From 1200px the rail is `position: fixed` and vertically centred, so once
the footer fills the viewport the rail's links sit over the cobalt
gradient. The numbers are item 23's, unchanged: `--ink-muted` is 4.99 on
`--paper` and 4.65 on `--paper-alt` — fine over the page proper — and
**1.67:1 at 80% down the footer, 1.31:1 at the bottom**. The current entry
is `--accent`, which over the accent end of the gradient is 1:1.

Not fixed, for the same reason item 23 is not: it is the accepted cost of
nav elements that paint nothing, and David has deferred the whole
nav-over-footer question to a human at the page. If it does need fixing,
the cheap exit here is better than item 23's — the rail is a case-study
element with a scrollspy already running, so `casestudy.js` can hide it once
the last section is behind you, which is arguably the right behaviour
regardless of contrast.

**30. The alt text for `the-beginning.png` is drafted, not approved.** §3.5
requires real alt text and this is the first image that has any. What is
written:

> A childhood photo of me at about three, wearing oversized headphones, with
> cut-outs of a Sony CD Walkman, a Nike football and a PlayStation 2
> arranged around it. Caption in the image: Always passionate about music.

Two things to check. The description is what the image plainly shows, but
"about three" is an estimate — David knows. And the trailing sentence is
there because the caption is **baked into the pixels**, which WCAG 1.4.5
treats as text that cannot be resized or read by assistive tech; naming it
in `alt` is the mitigation, not the fix.

**The related open question is legibility.** At `min(360px, 38%)` the
caption renders at roughly a third of its authored size — about 6px per
glyph. It will be small. The real fix is a caption-free image plus a
`<figcaption>`, which would also satisfy 1.4.5 outright. Not done, because
it means editing David's artwork. A judgement for a human at the page.

**31. The AVIF fallback means two files ship for every image.** The
`<picture>` pattern is right — only Safari below 16.4 fetches the fallback,
so nobody downloads both — but at promotion `mv v2/* .` copies **both** to
the live site. That is 1476 KB of PNG/JPEG sitting next to 206 KB of AVIF
for the same five images.

Worth knowing rather than worth acting on: it costs repo weight, not load
time, and dropping the fallbacks would strand Safari 16.3 and older on a
portfolio where the images are most of the point. Revisit at promotion
alongside item 28, not before.

## Known spec contradictions

Worth resolving in `design.md` so they don't get re-litigated every step.

- **§1.2's "accent appears in five places only" is contradicted twice by
  the spec itself.** §3.2 asks for an accent dot on the availability
  eyebrow, §3.3 asks for an accent card-hover border. Both are being
  built as accent — that's seven places, not five.
- **`--radius` scope.** §1.4 restricts it to cards and metric boxes;
  §3.5 gave the portrait container `--radius`. **Resolved, and in §1.4's
  favour:** the portrait rule is gone, and `--radius` on a chapter image now
  applies to the placeholder box only — which is a box, so §1.4 is satisfied
  rather than overridden. See item 0.
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
- **~~§3.5's portrait rule contradicts §3.5's own diagram.~~ Gone with the
  rule.** §3.5 now draws an image on every chapter and specifies the 1024
  float directly, so the prose and the diagram agree. The measurement that
  settled it still holds and is why 1024 is the breakpoint: at 768 the
  chapter column is 531px, and an image beside the copy would leave it well
  under 45ch.
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
  switches — all at 768. **Two others exist.** 1024, where the chapter image
  floats beside the text and the rotator drops its height reservation. And
  **1200, new with the case study**, where the contents nav stops being a
  list in the flow and becomes a fixed rail — measured, not chosen: the
  gutter there is `(1200 − 820) / 2 = 190px` against a 140px rail plus
  `--s-4`, so it fits with 18px spare. Step 13 deliberately
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
- **Images.** Two have landed: `the-beginning.png` on About chapter one,
  and `sacem-thumb` on work card 01. Still placeholders: About chapters two
  and three, work cards 02 and 03, and the case study's two Final Outcome
  screens. `img-david.jpg` in `v2/assets/img/` is **not** an About image —
  David supplies one image per chapter and per card himself.
- **Every image is a `<picture>`: AVIF source, PNG or JPEG fallback.** Not
  WebP — `sips` is the only image tool on this machine and WebP is read-only
  in its format list, while AVIF is writable and does alpha and photographs
  both. Quality 85 for the alpha cut-out, 80 for the JPEG screenshots;
  both checked by decoding back and looking. 1476 KB became 206 KB.
- **How a card media slot accepts its asset.** `.card-media` holds the
  16:10 box with `aspect-ratio`; `.card-media img, .card-media video` are
  already sized `100%/100%` with `object-fit: cover`. Dropping a `<picture>`
  or a `<video poster>` inside the span and deleting the
  `.card-media-label` is the whole change — no CSS edit, no layout shift.
  Card 01 is the worked example. The one CSS line it did need is
  `.card-media picture { display: contents }`, which is now in place for
  every future card (item 7).
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
