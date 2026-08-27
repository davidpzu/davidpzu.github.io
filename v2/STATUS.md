# STATUS — v2 rebuild

Handoff notes. Companion to `design.md`, which stays the spec — this file
only records where the build actually is and what is still undecided.
Delete at promotion.

**Last updated:** after David's three rounds of post-build changes — the
dark passage, the page chrome, the background grid, and the nav blend mode.
`design.md` was brought fully current in the same pass. Everything below is
committed together.

---

## State of play

The §5 build order finished at step 15 long ago. Everything since has come
from David directly, in four passes. **`design.md` is current with all of
it** — §3.1, §3.2, §3.4, §3.5, §3.6 and §3.7 were rewritten, §3.8 (cursor)
and §3.9 (section eyebrows) are new, and §1.2, §1.4, §2, §4, §5, §6 and §7
were updated. **Read the spec, not this file, for what the site is.**

### Pass 1 — the case study and the images

| what | state |
|---|---|
| SACEM case study | **built** — `work/sacem/index.html`, v1 ported onto the v2 system |
| `.portrait-slot` removed | now `.chapter-media`, **one image per chapter** |
| `the-beginning.png` | replaces `my-origins.png`; chapter renamed **The Beginning** |
| all images → AVIF | 1476 KB of PNG/JPEG became 206 KB |
| footer GitHub row | removed; §3.6 says not to add it back |

### Pass 2 — the form, the metric boxes, the root

| what | state |
|---|---|
| contact form | **confirms inline** — `form.js`, 34 assertions |
| `aria-expanded` | **removed**, not wired — it was never a toggle |
| the repo root | **cleaned** — README restored, `.DS_Store` ignored, `CLAUDE.md` tracked |
| commit authorship | **fixed** for every unpushed commit |

### Pass 3 — the redesign

| what | state |
|---|---|
| nav | **centred**, and hides while scrolling |
| hero | two corners: "✦ Open to work" left, location right. New positioning line |
| background grid | three hairlines on the shell's edges and centre, every section |
| section eyebrows | above all four section titles (§3.9) |
| impact | icons in, disclosure and `<button>` out, notes always visible |
| **the dark passage** | About fades to `--void` and runs unbroken into the cobalt footer |
| Education & Experience | ported from v1, two columns |
| Software I work with | ported from v1, 5 × 2 |
| cursor | a ring **replaces** the native pointer (§3.8) |

### Pass 4 — the corrections

| what | state |
|---|---|
| positioning line | "Shipping B2B SaaS that gets measured", 1.5rem |
| nav | returns after **350ms** of stillness, not only at the top |
| impact→About seam | hairline removed; the gradient carries it |
| **chapter copy** | float → real grid column. See item 32 — this was a real bug |
| toolkit | 5 × 2, and the two heavy icons converted |
| case study hero | on the grid, with top clearance |
| CV button | "Download Resume" — no file type, no size |
| contact | lead line added above the columns |
| **nav contrast** | `mix-blend-mode: difference`. See item 23 |

### Payload

Measured. §6's budget is 800 KB.

| | index | case study |
|---|---|---|
| html + css + js + fonts + favicon | 165.7 KB | 210.7 KB |
| **initial load** | **165.7 KB** | **210.7 KB** |
| everything, after scrolling | 324.9 KB | 247.7 KB |

CSS is 58.6 KB across four sheets; the index's five scripts are 17.8 KB; the
ten tool icons are 27.5 KB after two of them were converted (they were 218).

### Files added since step 15

| file | what |
|---|---|
| `work/sacem/index.html` | the case study, nine sections, v1's copy |
| `assets/css/casestudy.css` | fifth sheet, case-study pages only |
| `assets/js/casestudy.js` | scroll progress + contents rail. **28 assertions** |
| `assets/js/form.js` | inline form confirmation, both pages. **34 assertions** |
| `assets/js/ui.js` | nav visibility + cursor ring, both pages. **39 assertions** |
| `assets/img/the-beginning.avif` | 121 KB against the PNG's 898 |
| `assets/img/icons/icon-{davinci,adobecc}.avif` | 4.7 + 6.7 KB against 145 + 56 |
| `assets/img/projects/sacem-mensajeria/*.avif` | 85 KB against 556 |
| `.gitignore` (root) | `.DS_Store`. The only file outside `v2/` this rebuild added |

**101 assertions pass** across the three test harnesses, all under
`osascript -l JavaScript`, all kept outside `v2/` — §4 gives them no place
and they would ship at promotion.

### Git

`main` runs ahead of `origin/main` and **nothing is pushed.** Pushing
publishes the preview to `davidpzu.github.io/v2/`; the `noindex` tag is in
place for exactly that reason.

**Authorship is fixed for every unpushed commit** —
`davidpzu <88293615+davidpzu@users.noreply.github.com>`, which is the
identity the repo used up to 2026-05-19 before something wiped the git
config. Two things the earlier notes got wrong, both found by looking:
it was never five or six commits, it was twenty; and the repo already had a
correct identity, so the gmail address David first chose would have
fragmented the history into three.

**Thirteen already-pushed commits still carry the broken author**
(`56435cf` back to `8de1006`, 2026-05-25 → 2026-08-25). Left alone
deliberately: fixing them rewrites public history, changes every SHA from
May onward and needs a force-push to a repo linked from an active CV. They
will not attribute to David's GitHub profile. If it is ever worth doing, it
is the same mechanism, run over `8de1006^..origin/main` and force-pushed.

**The rewrite used a scratch `GIT_INDEX_FILE`, not `filter-branch`**, and
that matters if it is ever repeated: `filter-branch` and `rebase` both
refuse to run with a dirty working tree, and this tree was permanently dirty
with root drift the project rules put off limits. Building each tree in a
temporary index and replaying with `git commit-tree` never touches the
working tree, the index, or anything outside `v2/`.

`my-origins.png` was dropped from history in the same pass — 920 KB, and
David had replaced it.

**`backup-before-rewrite` still points at the pre-rewrite tip** (`ef199df`).
It is the only thing keeping the old commits reachable. Delete it once the
pages have been looked at in a browser: `git branch -D backup-before-rewrite`.

### The repo root was cleaned — the one change outside `v2/`

At David's instruction, committed on its own as `c7b9747`. `README.md`
restored (the deletion was not deliberate); `.gitignore` added at the root
with `.DS_Store` and the three tracked ones untracked; `CLAUDE.md`
committed. **The root is the right place for the ignore file, not `v2/`:**
at promotion `mv v2/* .` does not move dotfiles, so a `v2/.gitignore` would
be left behind and `rmdir v2` would then fail.

**The working tree is clean** apart from work in progress, which it had not
been for the whole rebuild.

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

The image has since grown again and the float became a grid column — see
item 32. Current: `min(400px, 34%)` in a two-column `.chapter-body`.

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

**2. ~~The Formspree form no longer confirms inline.~~ Fixed — `form.js` is
the fourth JS file.** David chose the new file over accepting the redirect.

It restores exactly what v1's `js/main.js` did and nothing more: intercept
the submit, post with `fetch` and `Accept: application/json`, swap the form
for a confirmation. **The action URL and the three field names are still
untouched, byte for byte.** Three things it does that v1 did not, all
because v1's version was thin:

- **Both result states are markup, not strings in the script** — §0 forbids
  JS supplying content. The copy is v1's own.
- **Failure is recoverable.** v1 called `alert()`. This shows an inline
  message with a `mailto:` above the button, leaves the form filled in and
  re-enables the submit, and clears the error when you resubmit. A failed
  message must not cost the visitor their typing.
- **Focus moves to the confirmation.** The form the visitor was working in
  has just left the page; without this a keyboard or screen-reader user is
  dropped back to `<body>`. `role="status"` is the fallback.

Still fully progressive: no `fetch`, no `FormData`, no `.form-success` in
the DOM, or JS off, and the listener is never attached — the form posts
natively exactly as before.

One CSS trap worth knowing: `.contact-form[hidden]` needs an explicit
`display: none`, because the UA sheet's type-less `[hidden]` rule loses to
`.contact-form { display: grid }` and the form would otherwise stay visible
underneath the confirmation. A specificity fix, not a place for
`!important`.

**34 assertions passing** under `osascript -l JavaScript`: the happy path
and every header and body field of the request, in-flight button state,
server rejection, network failure, retry-after-failure, and the five
degraded paths (no `fetch`, no `FormData`, no form, no confirmation markup,
missing submit or error elements).

**3. ~~The nav pill no longer darkens on scroll.~~ Closed by the nav
redesign.** There is no pill to darken. `.nav.is-scrolled` and its rule are
deleted, so nothing is waiting on a script here any more. Item 2 still
wants a decision on its own; it no longer has company.

**4. ~~Section rhythm may be too generous.~~ Answered by the dark passage,
not by a decision.** The 320px symmetric gap is still what every section
carries, and David has now seen the page repeatedly without raising it — so
it stays. §1.4 was amended to say "one rule, **one exception**": `.about`
takes `calc(var(--s-8) + var(--s-6))` on top, because that padding is where
the fade into `--void` happens and it is also the extra separation from
Impact that David asked for. Item 17's footer exception is gone (see there),
so the rhythm now has exactly one deviation and it is documented in the spec.

**5. ~~The rotator `<p>` bends an acceptance criterion.~~ Fixed, by the
option that satisfies the letter.** It is a `<div class="rotator">` now, so
base.css's `p { max-width: var(--measure) }` never applies and the
`max-width: none` override that bent §6 is deleted rather than justified. A
terminal line is not a paragraph. Nothing changed visually, `rotator.js`
selects `.rotator-slot` and was untouched, and §3.2 records the reasoning.

**6. ~~One piece of copy is still a placeholder.~~ Closed — David wrote all
four cards.** The work section is now four cards, not three: Green Up was
added, and every title and description is David's verbatim copy. §3.3 has
the table. **Nothing on either page is placeholder copy any more** — what is
left pending is images, not words.

One typography note rather than a question: the titles use a spaced hyphen
("SACEM - Messaging app") where the year markers use an en dash. That is how
David wrote them and it is the same form v1 used. Left alone.

**7. Cards 2, 3 and 4 have no media yet; card 1 does.** David asked for v1's
SACEM thumbnail back, so `sacem-thumb.jpg`/`.avif` is wired again and is no
longer parked. §3.3's `1.02` media hover therefore works on card 1 and
scales nothing on the other three — and those three carry `.card-wip`, which
excludes them from the hover rule regardless. Resolves itself entirely when
the remaining thumbnails land.

The one CSS line the wiring depends on: `.card-media picture
{ display: contents }`. The img is sized `100%/100%` against the slot, and
an inline `<picture>` box in between would hand it an auto height to resolve
against instead. Same line exists on `.tool-icon picture`.

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

**10. ~~Nothing toggles `aria-expanded` on the metric buttons.~~ Closed —
the attributes were removed, not wired.** David picked the third of the
three exits, which was also the recommended one.

§3.4 describes a *reveal*, not a toggle: clicking a second time does not
close the note, so the four buttons were never a disclosure widget and
`aria-expanded` could only ever have reported `false` while the note was on
screen. `aria-expanded` and `aria-controls` are gone from all four. The
note `id`s stay — they cost nothing and a real toggle would want them back.

Nothing is lost by it: the notes are permanently in the DOM and in the
accessibility tree (item 11), so a screen reader already had all four
regardless of state. The disclosure stays CSS-only, works with JS off, and
covers pointer, keyboard and touch. §3.4 now says this and says the
attributes must not come back.

**11. ~~Note text is exposed to screen readers while invisible.~~ Gone with
the disclosure.** The notes are now permanently visible to everyone, at
every width — there is no hidden state left to be inconsistent about. What
was a deliberate trade is now simply not a situation. Item 16 still holds
for the chapter reveal, which is a different mechanism.

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

**14. ~~A possible flash when the chapters reveal at load.~~ Closed —
David checked at the page and there is none.** The mechanism is §3.5's own:
chapters render visible from the markup and `reveal.js` strips `.is-visible`
before it observes, so a browser that paints before the deferred script runs
would blink visible → hidden → fade. Half of it was already handled — the
transition is declared on `.chapter.is-visible` only, so the strip is instant
rather than a 500ms fade-*out*. The remaining single-frame risk was never
measurable here. It does not happen.

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

**17. ~~The footer's bottom padding breaks §1.4's "one rule".~~ Resolved by
the gradient change, and resolved properly rather than waived.** The `--s-3`
bottom padding existed only to push the colophon past 90% of a
`--paper → --accent` gradient, where neither `--ink` nor `--paper` cleared
AA in the 82% band. On `--void → --accent` there is no such band: `--paper`
is 20.4:1 at the top and 6.54:1 at the very bottom, so nothing in the footer
depends on its depth any more. **The padding is symmetric again**, and so is
the colophon's margin — `--s-8`, the rhythm's own step, instead of
`calc(var(--s-8) + var(--s-6))`.

**18. ~~The `--accent` focus ring on the submit button.~~ Resolved twice,
and the second answer deleted the first.** Step 14 had every footer control
paint its own `--paper` ground on focus, because no fixed ring colour could
be trusted at an unknown depth of a gradient.

The gradient change made that unnecessary. On `--void → --accent` the ring
is simply `--paper` at `outline-offset: 3px` and clears at every depth —
6.54:1 at the worst point, against a 3:1 floor. **No control on the site
paints a ground under a focus ring any more**, including the nav (item 23).
§3.6's "no boxes" is now literally true at rest *and* on focus.

**19. Two things in the footer are reads of §3.6, not lines in it.** The
headline size — §1.3 has no row for an "oversized" headline, so it is
`clamp(2.75rem, 8vw, 6rem)`, whose floor is set by "Let's talk." staying on
one line at 375px. And the two-column layout — §3.6 lists the contact block
and the form but never places them.

The third used to be the contact list's size, which is settled: §3.6 says
"mono, one per line, generous leading" and nothing about size, so it takes
§1.3's body size with the display face swapped in, at `line-height: 2.2`.
The old reason for flagging it — that a bigger list pushed the form into a
contrast danger band — no longer exists.

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

**22. ~~Three fits decided by a font metric this environment cannot read.~~
Closed — David checked them at the page.** Geist Mono was treated throughout
as 0.6em advance, which could not be confirmed here: the fonts ship as
`.woff2`, Python has no `brotli`, and CoreText refuses to load woff2 through
`CTFontManagerCreateFontDescriptorsFromURL`. Two measurements sat close to
the edge at 768 — `41% → 59%` in its box with 3.6px spare, and `2018–2020`
in the year track with 2.7px — and the `→` was assumed to be in the latin
subset. All of it holds in a browser.

**The year track's fit is still load-bearing** even though it is confirmed:
item 32 records that narrowing it to buy chapter width breaks the date.

**23. ~~Nav contrast.~~ Closed, in two moves.** Worth keeping the whole
shape of it, because the first move was a regression I introduced.

**It became a regression, not an inherited cost.** When first written the
failing ground was the bottom half of the footer — a short run at the end of
the page — and About was `--paper` at 4.99. Making About `--void` turned the
longest section on the site into a failing ground, and the *active* item was
worse than the resting one: `--ink` on `--void` is 1.14:1. Scroll-hiding
masked it and did not fix it; the nav returns after 350ms of stillness,
which is exactly when someone has stopped to read.

**Move one: `mix-blend-mode: difference` on `.nav`**, chosen by David from
three options. It inverts the backdrop, so the links are dark on light
grounds and light on dark ones by construction — no scroll tracking, no
second colour pair:

| ground | resting | active | focus ring |
|---|---|---|---|
| `--paper` — hero, work | 8.92 | 20.06 | 20.06 |
| `--paper-alt` — impact | 9.44 | 17.82 | 17.82 |
| `--void` — About, footer top | 10.13 | 21.00 | 21.00 |
| footer at 50% | 4.60 | 10.36 | 10.36 |
| footer at 100% | **1.64** | **3.86** | 3.86 |

**Move two: `ui.js` suppresses the nav over the band that still fails.**
No source colour closes the cobalt end — inverting a saturated blue lands
near cobalt's own luminance, so even pure white reaches only 3.86 — so the
nav does not render there. The test is geometric:
`footerRect.top + footerRect.height × 0.52 ≤ 48`, and it outranks both the
at-the-top rule and the idle timer.

Three things not to undo:

- **The blend sits on `.nav`, not on `.nav-link`.** A blend on the links
  finds nothing inside `.nav`'s own stacking context to blend with.
  `.site-header` must not gain a `z-index` or `isolation` either.
- **`--nav-rest` / `--nav-active` are blend sources, not colours.** The
  logic is inverted: a light source renders dark on `--paper`.
- **The rect is read live, not cached.** The footer's height changes when
  `form.js` swaps in the confirmation, and a stale measurement would go
  wrong exactly when someone has just written to David. The idle callback
  re-checks for the same reason.

**Suppression is scoped to the band, not the whole footer**, so the nav
stays available over the top half of the contact section where the blend
clears on its own.

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

**25. ~~The contact block's longest line wraps at 375.~~ Fixed as a side
effect.** "Available for senior product roles" was 34 mono glyphs, ~347px
against 345px of shell — over by 1.8px. It now reads **"Open to work"**, 12
glyphs, which fits at 320 with room to spare. The wording change was
David's, for consistency with the hero corner; the wrap going away was free.

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
four `.woff2` files are already `latin` subsets from google-webfonts-helper.
Re-subsetting to the glyphs the page actually uses would need `fontTools`
and `brotli`, neither of which is installed, and it would save perhaps 20 KB
on a page with plenty of headroom.

**~~Syne is the one thing worth knowing.~~ Deleted.** It was a third face
reserved for a wordmark — `--font-mark`, a `.wordmark` class, and
`syne-v24-latin-700.woff2` — that no element ever used, so the browser never
fetched it: 0 bytes on load, 14 KB in the repo. David decided he is not
going to use it, so the token, the `@font-face`, the class and the file are
all gone. **The site is two faces and four files now**, and §1.3 says not to
add a third without a reason.

**28. Unused v1 assets in `v2/assets/`, re-counted again.** The toolkit put
the ten tool icons into service, so the dead weight is much smaller than it
was.

| file | KB | state |
|---|---|---|
| `img-david.jpg` | 443 | **dead** — unused, and per §8 not an About image |
| ten tool icons | 27 | **live** — §3.5's toolkit. Two converted to AVIF |
| `the-beginning.png` | 898 | live, as the AVIF's `<picture>` fallback |
| `sacem-hero/-challenge.jpg` | 481 | live, as the AVIF fallbacks |
| `sacem-thumb.jpg`/`.avif` | 86 | live — card 1's thumbnail |

`my-origins.png` is gone. **`img-david.jpg` is now the only genuinely dead
file**, and David chose to keep it for now and revisit at promotion. §7's
"no Beyond the screen or interests section" was amended: it had bundled the
toolkit in with an interests section, and they are not the same thing — a
tools list is professional evidence.

**29. ~~The case study's contents rail over the footer.~~ Closed by the
same pass as item 23, but with a different rule.** The rail carries no blend
mode, so it fails from the very *top* of the footer rather than halfway
down: `--ink-muted` on `--void` is 4.09 and the current entry's `--accent`
is 3.13. The test is therefore overlap at all — `footerRect.top ≤
railRect.bottom` — not overlap with a band.

**The nav's blend was considered here and rejected**: a blend mode on a rail
beside a reading column is a far more visible change than one on three small
links, and the rail had a cheaper exit available because `casestudy.js`
already ran a scroll handler.

**Guarded twice, and it must stay that way.** Below 1200 the rail is an
ordinary contents list in the flow, and hiding it there would take a working
table of contents out of the document. `casestudy.js` checks
`matchMedia('(min-width: 1200px)')` before it ever adds the class, *and* the
rule that hides it is scoped inside the same media query. Either guard alone
would do; both mean a mistake in one cannot reach the in-flow version.

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

**32. The chapter copy bug, and the wrong fix that preceded it.** Worth
recording because the first attempt looked reasonable and changed nothing.

David reported the chapter paragraphs fitting "only 4-5 words per line". The
first fix widened the chapter column — narrowing the year track and the
gutter — and measured a gain from 44ch to 54ch. **That measurement was of
the wrong quantity.** A float shortens the *line boxes* inside a paragraph
but does not move the paragraph's own box, so base.css's
`p { max-width: var(--measure) }` was capping the box at 564px and the
floated image was consuming 343px of it from the left. What was left for
text was ~220px — four or five words, exactly as reported, and unchanged by
widening the column, because the cap and not the column was binding.

The real fix is a two-column grid from 1024 with the copy in a
`.chapter-text` wrapper, so the text has its own box and `--measure` caps
the text rather than the text-plus-image. **62ch at 1440, ~51ch at 1024.**

Two things survived from the wrong fix and are worth keeping: the gutter is
`--s-4` rather than `--s-5`, and **the year track must stay
`clamp(8rem, 16vw, 12rem)`** — narrowing it to buy width breaks "2018–2020"
at every width. That was measured the second time round: nine mono glyphs
need ~130px at 768 and ~194px at 1440 against a track of 128 and 192, which
is item 22's couple-of-pixels-spare fit.

**33. The cursor replaces the native pointer — reviewed and kept.** David
was given the trade (a trailing ring that keeps the native cursor, versus a
full replacement) and chose the replacement knowing it costs the I-beam and
the resize arrows. **He has since checked it at the page: the easing and the
blend over cobalt and the tool tiles all read correctly.**

The guards are what make it acceptable and none is optional — §0 and §3.8: a
fine hovering pointer (live `matchMedia`, so a hybrid device that picks up a
mouse gets the ring and one that switches to touch gets its cursor back),
reduced motion off, and **`cursor: none` scoped to a class `ui.js` adds** —
so a parse error, a blocked script or JS off can never leave a visitor with
no pointer and no way back. Over a text field the ring becomes a bar, which
gives back the one affordance hiding the I-beam costs.

**34. The background grid is drawn per section, and that is load-bearing.**
It looks like it could be one fixed layer behind the page. It cannot: the
About section and the footer paint `--void`, and a layer behind them would
be covered by their own background. A `::before` inside each section paints
on top of that background, which is also what lets each section set its own
line colour — `.is-dark` flips the token, and that is the whole mechanism
that carries the grid through the dark passage.

The dark line colour is **white at 8%, not a fixed grey**. Over the `--paper`
end of the About fade a fixed grey would have drawn a harsh black line;
white-on-white is simply absent, so the grid arrives as the ground darkens.

Stacking is explicit — section is the positioning parent, `::before` takes
`z-index: 0`, `.shell` takes `z-index: 1`. Nothing relies on the subtleties
of negative `z-index` against a parent's background, and it should stay that
way.

**35. On the case study the grid does not align with the reading column.**
The lines are at `--shell` (1140px), which is what the figures use, while
the prose sits in `.cs-shell` at 820px. So the grid frames the images and
not the words. It reads as deliberate — the images are what the lines
bracket — but it is the one place on either page where the grid and the text
do not agree, and it is a judgement only a human at the page can settle.

**36. The About section's dark styling is done by repointing tokens, not by
a rule per element.** `.about` sets `--ink`, `--ink-muted`, `--rule`,
`--accent`, `--paper-alt` and `--eyebrow-fg` to dark-ground values, and
every existing chapter, CV-button and media rule then works unchanged. **Add
to the dark passage this way.** A second rule per element is how the two
halves of the page drift apart.

The one that is easy to miss: `--accent` is repointed to `--accent-lift`
because plain `--accent` is 3.13:1 on `--void`, under the 4.5 a link hover
needs. That single line carries `a:hover`, the CV button and the focus ring.

**37. Three of the four case study pages are literal copies of the fourth,
and that is a maintenance liability with a clock on it.** `thalesgu`,
`sacem-collab` and `sconnect` are `work/sacem/index.html` with four lines
changed each: `<title>`, `<meta description>`, `<h1>`, and a badge reading
"Case Study — in progress". Everything else — every section, every word of
copy, both images — is SACEM's.

That was David's instruction ("using the same content of sacem, dont worry
about it, we will slowly modify all its content"), and it is the right call
for scaffolding. What it costs, until the content diverges:

- **Any structural fix to the template has to be made four times.** There is
  no include mechanism and §0 rules out the build step that could give one.
  Before changing one of these pages structurally, check whether the change
  belongs on all four. `diff` between them is currently 8 lines, which makes
  that check cheap — it will not stay that way.
  **Structure, not copy.** David edits the SACEM page's wording for the SACEM
  case study — that is per-page content and the four pages are *supposed* to
  diverge as each gets written. It happened once in the session that created
  them (24 changed lines instead of 8) and the three were re-synced, but that
  was only harmless because they are still pure scaffolding.
  **Do not re-sync copy again.** Once a page has real content of its own,
  re-copying `sacem/index.html` over it destroys that work. What still has to
  be applied four times is *structural*: a template change, a new section, a
  markup fix, an accessibility correction.
  While they remain untouched scaffolding, `diff work/sacem/index.html
  work/<slug>/index.html` returning 8 lines is a cheap sanity check. That
  check stops being meaningful the moment David starts writing them.
- **The four pages currently claim the same work.** A visitor clicking
  "Green Up" lands on a page whose body describes the SACEM messaging
  redesign. The badge says "in progress", the site is `noindex` and nothing
  is pushed, so no one can encounter this yet — but it must not be pushed in
  this state without the badge, or it reads as a copy-paste portfolio.
- **`.card-wip` is now dormant.** All four cards are links, so nothing uses
  the WIP treatment. It is kept, not deleted: the next announced-but-unbuilt
  project needs it back.

**38. The card thumbnail source is smaller than the box it is displayed in.**
`sacem-thumb` is 475 × 300 against a slot that reaches **526 × 329** CSS px
at `--shell` — so on any desktop it is being upscaled to 1.11x before the
browser even considers device pixel ratio, and on a 2x display it is
effectively 4x upscaled. It reads acceptably because it is a UI screenshot
with flat areas, but it is the one image on the site that is genuinely
under-resolved.

Measured display maxima, for whenever the real assets are exported:

| slot | widest CSS box | 2x source |
|---|---|---|
| card thumbnail | 526 × 329 (16:10) | **1120 × 700** |
| case study hero | 1140 × 480 (2.375:1) | **2280 × 960** |

The hero's number is per page, so it does not stack. The thumbnails do: four
of them at 1120 × 700 land the index between 741 and 819 KB against §6's 800
budget, depending on how compressible the screenshots are. **That is the one
place where the asset decision and the budget actually collide** — encode
quality is the lever, and it is set at conversion time.

## Known spec contradictions

**All of these are now resolved in `design.md`.** Kept as the record of what
was decided and why, so none of it gets re-litigated.

- **~~§1.2's "accent appears in five places only".~~ Retired.** It was never
  true — §3.2's availability dot and §3.3's card-hover border made seven
  before a line was built, and the page has since grown a progress bar, four
  metric icons, a spinning star and a results bullet. §1.2 now carries a
  rule that holds: **accent marks interaction or measurement, never
  decoration.**
- **~~`--radius` scope.~~ Resolved in §1.4's favour.** The portrait rule is
  gone; `--radius` on a chapter image applies to the placeholder box only,
  which is a box. Same for the case study's figure placeholders and the
  toolkit's tiles.
- **§3.4's diagram says `41→59%`, its table says `41% → 59%`.** Using the
  table's form. Harmless, still there.
- **§1.3's metric numeral size does not fit §3.4's four-across layout.**
  `.staircase .figure` lowers §1.3's ceiling to `clamp(1.5rem, 3vw, 2.5rem)`
  — the largest the longest figure can be and still sit in its box at every
  width. base.css keeps §1.3 verbatim, so reverting is deleting one block.
  §1.3 now names this as one of two deliberate local overrides.
- **~~§3.5's portrait rule contradicts its own diagram.~~ Gone with the
  rule.** §3.5 draws an image on every chapter and specifies the 1024
  breakpoint directly.
- **§1.2's `--accent-dim` "metric box hover" collides with §6's AA floor.**
  `--ink-muted` on `--accent-dim` is 4.34:1, under 4.5. The lit box moves its
  label and note to `--ink` (15.5:1) with the wash, through one custom
  property — `--metric-fg`, set on `.metric` and read by both children.
- **~~§7's "no cursor follower" and its tools-section ban.~~ Both removed
  from §7**, with what replaced them written down. David asked for a cursor
  and for the toolkit; the spec should not be left arguing with the build.
  §7 still rules out an interests section, which is a different thing.
- **~~§3.5's "file type and size in the label".~~ Gone.** The CV button reads
  "Download Resume". §3.5 says why.
- **~~§6's "every metric box disclosure reachable by keyboard and tap".~~
  Retired** — there is no disclosure. §6 marks the criterion struck rather
  than deleting it, so the change is visible.

---

## Things to know before touching the code

- **Sections are full-bleed; content sits in an inner `<div class="shell">`.**
  That is what lets the Impact band, the dark passage and the footer gradient
  reach the edges. Every new section follows the same pattern. **`.shell` now
  also carries `position: relative; z-index: 1`** — it has to sit above the
  background grid's `::before`. Do not remove it.
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
  column.** §3.5's diagram draws it across the right-hand column only. Full
  width is one declaration against four and reads the same at a glance.
  Scoping it to `.chapter-body` later is a small, contained change — though
  note that `.chapter-body` is a two-column grid from 1024 now (item 32), so
  "the chapter column" means `.chapter-text`.
- **Breakpoints, and the standard for adding one.** 768 is the main one:
  cards go 1-up, the staircase flattens, the sticky year collapses, section
  rhythm switches, the résumé and toolkit grids change. **1024**: the chapter
  becomes two columns. **1200**: the case study's contents nav becomes a
  fixed rail — measured, the gutter there is `(1200 − 820) / 2 = 190px`
  against a 140px rail plus `--s-4`. **1240**: the chapter image takes a
  bigger share — measured, `--shell` is `min(1140px, 92vw)` so it stops
  growing at `vw >= 1239`, and above that the chapter body is a constant
  916px however wide the monitor. **480**: the toolkit goes 2→3 across and
  the positioning line steps down a size.
  Hold new breakpoints to that standard: a measured reason, in a comment,
  scoped to one component. The rotator's true wrap points are 433px and
  865px, but those follow from the font metric of item 22, so pinning a
  breakpoint to them would be false precision.
- **`site.webmanifest` is deliberately not linked.** Its icon paths are
  root-relative (`/web-app-manifest-192x192.png`) and would break §0 both
  now and after promotion. Two-line fix whenever it's wanted.
- **The nav: read §3.1, not this file.** It has changed four times — pill
  removed, left-aligned, centred, then given a blend mode — and the spec is
  current with all of it. What must not be undone, in short: the blend sits
  on `.nav` and not on `.nav-link` (a blend on the links finds nothing inside
  `.nav`'s stacking context to blend with); `--nav-rest` and `--nav-active`
  are blend *sources*, so the colour logic is inverted; and `.site-header`
  must not gain a `z-index` or `isolation`, which would break the chain to
  the root stacking context.
- **The nav hides while you scroll and returns after 350ms of stillness.**
  `ui.js` owns it. Three states in priority order: within 24px of the top,
  always visible; a scroll event just fired, hidden; idle, visible. The idle
  timer restarts on every scroll event, so a long scroll never reveals it
  mid-way. `visibility` is animated with `opacity` so hidden links cannot be
  tabbed to.
- **Nav bracket semantics — settled at step 14.** Brackets are real
  characters on all three items with opacity carrying the state, so a
  screen reader was announcing "[ Projects ]" on inactive items, where the
  brackets are invisible and encode nothing. They now carry
  `aria-hidden="true"`: the state reaches assistive tech through
  `aria-current`, which is the correct mechanism, and the brackets stay
  real DOM characters so §3.1's copy-paste rationale still holds —
  `aria-hidden` affects the accessibility tree, not selection.
- **Nav targets.** Home → `index.html`, Projects → `#work`, About →
  `#about`, Contact → `#contact`. v1 had no scrollspy, so the active bracket
  is per-page, not per-section.
  **Contact is a local anchor on both pages**, not a link back to the index:
  the index and every case study carry the same §3.6 footer, so it scrolls
  to the form where you already are. It also lands you above the band where
  `ui.js` suppresses the nav — the failing band starts at 52% of the
  footer's height, and the anchor puts the footer's top edge at the top of
  the viewport, so the nav is still up when you arrive and only goes as you
  scroll further in.
- **Images.** Landed: all three About chapter images, `sacem-thumb` (work
  card 01), the SACEM case study's hero and challenge shots, and the ten tool
  icons. Still placeholders: **work cards 2, 3 and 4, and the Final Outcome
  screens on every case study page.** `img-david.jpg` is not one of them.
  Item 38 has the display maxima to export against.
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
- **The CV link is a button, and the system had no button to copy.** §3.5
  asks for mono and accent on hover and says nothing about shape, and nothing
  else in the build is an enclosed control. `.cv-button` takes the **card's**
  idiom: a 1px border going `--accent` on hover, at caption metrics. Square,
  because §1.4 scopes `--radius` to cards and metric boxes. Its border is
  `--ink`, not `--rule`: `--rule` on `--paper` is 1.27:1, fine for a hairline
  between sections but not for the boundary of a control, where WCAG 1.4.11
  wants 3:1. Inside the dark passage both `--ink` and `--accent` are
  repointed (item 36), so the same rules carry over untouched.
  The label is now **"Download Resume"** — the file type and the "194 KB"
  are gone, at David's instruction, and §3.5 was amended to match.
- **Three fonts are preloaded, and the fourth deliberately is not.** Geist
  Mono 400 and 500 and Inter Tight 400 all render above the fold, and
  without a preload none is discovered until `components.css` has parsed.
  Inter Tight 600 is left out because it is only the `h3`s, which are all
  below the fold. `crossorigin` is on all three and is **required even
  though they are same-origin** — font fetches are always CORS, and without
  it the browser downloads each file twice. This adds no bytes; it moves
  when they start.
- **~~The footer gradient bans two tokens outright.~~ The whole table is
  gone.** It was written for a `--paper → --accent-dim → --accent` gradient,
  where every token had a depth past which it failed. The footer now runs
  `--void → --accent`, where **`--paper` is the only colour used and it
  clears everywhere** — 20.4:1 at the top, 6.54:1 at the cobalt end. Text,
  field underlines, the submit rule, focus rings, all `--paper`. Nothing in
  the footer depends on its depth any more. `--paper-muted` is banned there
  and only there: it clears on `--void` but tops out at 4.16 against cobalt.
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
- **What still cannot be checked here.** Anything needing layout or paint:
  cadence, crossfade, blink rate, the staircase rhythm, spacing and contrast
  in situ. The list has grown with the redesign — the cursor ring's easing
  and how its blend reads over cobalt and the tool tiles (item 33), whether
  the nav's blend mode looks right on small text (item 23), the chapter
  reveal flash (item 14), where the grid falls on the case study (item 35),
  and the two mono fits of item 22. **The contrast numbers throughout this
  file are computed and exact; what is estimated is which percentage of a
  gradient a given element sits at, and only a browser settles that.**
