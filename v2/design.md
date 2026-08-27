# design.md — davidpzu.github.io redesign (v2)

**Owner:** David Prieto Zurita — Senior Product Designer, Madrid
**Goal:** Rebuild the portfolio so it reads as senior-level evidence, not a growth story.
**Working directory:** `/v2` only. **Do not modify, move, or delete anything outside `/v2`.** The site at the repo root is live and linked from an active CV.
**Preview URL:** `davidpzu.github.io/v2/`
**Final URL after promotion:** `davidpzu.github.io` (no custom domain, no CNAME file).

---

## 0. Hard constraints

Non-negotiable. Do not propose alternatives.

- **No framework.** Vanilla HTML, CSS, JavaScript in separate files. No React, Next, Vue, Svelte.
- **No build step.** No npm, no bundler, no PostCSS, no Tailwind. What's in the repo is what ships.
- **No CSS framework.** Hand-written CSS with custom properties.
- **Relative paths everywhere.** `assets/css/tokens.css`, `../../assets/js/rotator.js`. Never root-relative (`/assets/…`) — those break the moment `/v2` is promoted to root. **Two exceptions, both forced and both documented where they live.** The `og:`/`canonical` URLs in every `<head>` are absolute, because a scraper has no base to resolve a relative one against (§3.10). And **every path in `404.html` is root-relative**, because that page is served for URLs at unpredictable depths and a relative path would resolve against whatever was asked for (§3.11). Both are written in their post-promotion form, so neither needs an edit at promotion.
- **Fonts self-hosted** as `.woff2` in `v2/assets/fonts/`. No external requests of any kind.
- **`<meta name="robots" content="noindex">`** on every `/v2` page until promotion. Remove at promotion.
- **JS is progressive enhancement.** Every section readable and navigable with JavaScript disabled. JS adds motion, never content.
- **Accessibility floor:** visible keyboard focus, `prefers-reduced-motion` respected, semantic landmarks, AA contrast minimum, no hover-only content.
- **The native cursor is never hidden by CSS alone.** `cursor: none` lives under a class `ui.js` adds after its guards pass, so no failure mode — a parse error, a blocked script, JS off, a touch device, reduced motion — can leave a visitor with no pointer and no way to get one back. §3.8.

---

## 1. Design direction

### 1.1 Thesis

**"Engineering notebook."** Near-white space, monospace as the display face, content chaptered rather than dumped. Justified by the subject: a product designer who works close to code and builds his own tooling. The mono isn't decoration — it's accurate.

### 1.2 Color tokens

```css
:root {
  /* the light half of the page */
  --paper:      #FCFCFA;  /* page background — barely warm, not cream */
  --paper-alt:  #F4F4F0;  /* alternating section band */
  --ink:        #14150F;  /* primary text */
  --ink-muted:  #6E6E68;  /* captions, meta, mono labels */
  --rule:       #E2E2DC;  /* hairlines, card borders */
  --accent:     #1F3BFF;  /* cobalt — links, focus ring, caret, metric numerals */
  --accent-dim: #E8EBFF;  /* accent wash, metric box hover, .kw highlight */

  /* the dark passage — About through the bottom of the footer */
  --void:        #000000;  /* the dark ground */
  --void-rule:   #2A2A2A;  /* hairlines on --void, where --rule vanishes */
  --paper-muted: #A8A8A2;  /* muted text on --void ONLY. Never in the footer */
  --accent-lift: #7C8DFF;  /* cobalt lifted so it clears AA on --void */

  /* the background grid */
  --grid-line:      #EDEDE7;
  --grid-line-dark: rgba(255, 255, 255, 0.08);

  /* nav links — SOURCE values for mix-blend-mode: difference, not the
     colours you see. Light sources render dark on --paper. §3.1 */
  --nav-rest:   #B4B4B4;
  --nav-active: #FFFFFF;
}
```

Electric cobalt reads engineered against near-white and stays clear of the warm-cream palette that every templated portfolio lands on.

**The "accent appears in five places only" rule is retired.** It was never true — §3.2's availability dot and §3.3's card-hover border made seven before a line of it was built — and the page has since grown a scroll-progress bar, four metric icons, a spinning star and a results bullet. The rule that replaces it is narrower and actually holds: **accent marks interaction or measurement, never decoration.** Links, focus, the caret, figures, the progress bar, the metric icons. If a new accent mark is neither something you can act on nor something that was counted, it does not get accent.

**Four tokens exist only because one colour cannot cross the dark passage.** Two repoint an existing colour for `--void`; two are blend-mode sources.

- `--paper-muted` is the muted tone on `--void` (8.79:1). It is **banned in the footer**: no muted tone clears 4.5:1 against the cobalt end of that gradient — the best candidate manages 4.16 — so the footer is `--paper` for everything, full stop.
- `--accent-lift` exists because `--accent` is **3.13:1 on `--void`**, under the 4.5 a link hover needs. `.about` repoints `--accent` to it, which carries every rule that already reads `--accent` — `a:hover`, the CV button, the focus ring — without one of them being restated.
- `--nav-rest` and `--nav-active` are **not colours, they are blend sources.** The nav is `mix-blend-mode: difference`, so what gets painted is `|backdrop − source|` and the logic inverts: a light source renders dark on `--paper` and light on `--void`. This is what lets one nav be legible on both halves of the page with no scroll tracking. Read §3.1 before touching either.

### 1.3 Type tokens

```css
:root {
  --font-display: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
  --font-body:    "Inter Tight", system-ui, -apple-system, sans-serif;
}
```

**Two faces, four files.** Geist Mono 400/500 and Inter Tight 400/600, all `latin`, all `font-display: swap`. Nothing else.

Mono is the display face — headlines, section titles, nav, metrics, eyebrows. Inter Tight carries body copy so the About chapters are readable at length.

**Syne is gone, and it should not come back without a reason.** It was specified as a third face reserved for a wordmark, with `--font-mark` and a `.wordmark` class to carry it. No element ever used them, so the browser never fetched the file — it cost 0 bytes on load and 14 KB in the repo for a wordmark that was never designed. David removed it rather than leave a face on the books he does not intend to use. The token, the `@font-face`, the `.wordmark` rule and `syne-v24-latin-700.woff2` are all deleted.

| Role | Size | Face | Tracking | Weight |
|---|---|---|---|---|
| Hero name | `clamp(2.5rem, 7vw, 5rem)` | display | `-0.03em` | 500 |
| Positioning line | `1.5rem` (`1.25rem` ≤480) | display | `-0.02em` | 400 |
| Section title | `clamp(1.75rem, 3.5vw, 2.75rem)` | display | `-0.02em` | 500 |
| Metric numeral | `clamp(2rem, 4.5vw, 3.5rem)` | display | `-0.04em` | 500 |
| Chapter year | `clamp(1.5rem, 3vw, 2.25rem)` | display | `-0.02em` | 400 |
| Chapter lead | `1.25rem` | body | `-0.01em` | 600 |
| Body | `1.0625rem / 1.65` | body | `0` | 400 |
| Eyebrow / nav | `0.75rem` | display | `0.12em`, uppercase | 500 |
| Caption / meta | `0.8125rem` | display | `0.02em` | 400 |
| Block title (§3.5) | `clamp(1.5rem, 3vw, 2rem)` | display | `-0.02em` | 500 |

**The positioning line is the one size added after the scale was set**, and it earns the row: it used to be `.meta` reading "Senior Product Designer · Madrid", a caption-weight fact. The location half now lives in the hero's top-right corner, and what is left — "Shipping B2B SaaS that gets measured" — is a claim, not a caption. It sits above body size and below the `h1`, in `--ink`.

Two sizes are deliberately **not** in this table because they are local overrides with their reasons recorded where they live: the staircase figure lowers §1.3's metric ceiling to `clamp(1.5rem, 3vw, 2.5rem)` so `41% → 59%` fits its box, and the footer headline is `clamp(2.75rem, 8vw, 6rem)`, which §1.3 has no row for.

### 1.4 Space and layout

Whitespace is the mechanism, not an afterthought. Strict scale, used consistently.

```css
:root {
  --s-1: 0.5rem;  --s-2: 1rem;   --s-3: 1.5rem;  --s-4: 2rem;
  --s-5: 3rem;    --s-6: 4.5rem; --s-7: 7rem;    --s-8: 10rem;
  --measure: 62ch;
  --shell:   min(1140px, 92vw);
  --radius:  10px;   /* boxes that hold something — see below */
}
```

- **`--radius` has five consumers and they are all boxes that hold something:** `.card`, its `.card-media` slot, `.metric`, `.tool-icon`, `.cs-figure-slot`. Everything else is square, deliberately — the CV button and the case study's tag chips both take the card's border idiom without its corners. The media slot is inset `--s-2` from the card's own edge, so it is not a nested-corner problem: it reads as its own rounded object inside a rounded card, and takes `--radius` straight rather than a reduced value.
- Section rhythm: `--s-8` desktop, `--s-6` mobile. **One rule, one exception**, and the exception is `.about`: it needs `calc(var(--s-8) + var(--s-6))` on top because that padding is where the fade into `--void` happens. See §3.5.
- 12-column grid, `--s-3` gutter, `--shell` container.
- Hairline `1px solid var(--rule)` between major sections. **Two seams deliberately have none**: About→footer, and impact→About. Both are places where a gradient is doing the transition, and a rule across a fade only cuts it in half. No shadows except card hover.

#### The background grid

Three hairlines running the full height of every section: the shell's **left edge, centre, and right edge**.

```
│                    │                    │
│   DAVID PRIETO ZURITA                   │
│                    │                    │
↑                    ↑                    ↑
shell L           centre              shell R
```

- They are the shell's own edges, not decoration near them, so the `h1`, every section title, the card grid and the chapter column all sit on a line that is actually drawn.
- **Drawn per section (`main > section::before`), not as one fixed layer behind the page.** A layer behind would be covered by the About section's and the footer's own `--void` background. A pseudo-element is inside the section, so it paints on top of that background — and each section can therefore set its own line colour, which is what lets the grid survive the dark passage.
- Stacking is explicit, not inherited: the section is the positioning parent, `::before` takes `z-index: 0` (above the section background), `.shell` takes `z-index: 1` above that. Nothing relies on the subtleties of negative `z-index` against a parent's background.
- `.is-dark` flips `--grid-line` to `--grid-line-dark`, which is **white at 8%, not a fixed grey**. Over `--void` that is a faint light hairline; over the `--paper` end of the About fade it is white on white, so the grid simply is not there yet and arrives as the ground darkens. A fixed dark grey would have drawn a harsh black line across the fade.
- Full-bleed media (`.cs-hero-media`, `.cs-figure`) sits above the grid: a hairline crossing a screenshot reads as an artefact rather than as structure.

### 1.5 Signature element

**The hero terminal line.** One bold idea, carrying both the rotating subtitle and the monospace personality. Fixed stem, rotating slot, blinking cobalt caret.

```
currently > designing benefits platforms for 250k+ users ▮
currently > learning Mandarin and Cantonese, trying not to butcher the tones ▮
currently > cutting transaction time from 4.2 to 2.5 minutes ▮
currently > running a Chinese hip-hop blog nobody asked for ▮
currently > building and designing with AI tooling, when it helps ▮
```

Order is fixed as written: work, personal, work, personal, work. Don't shuffle — the alternation is the point.

Everything else on the page stays quiet.

---

## 2. Information architecture

| # | Section | Job |
|---|---|---|
| 1 | Hero | Positioning + the signature rotator |
| 2 | Selected work | 4 cards, all linked to a `work/<slug>/` page |
| 3 | Impact | 4 metric boxes in a rising staircase, each with an icon, figure, label and note |
| 4 | About — chapters | Scrolled timeline, then background and toolkit. Enters the dark passage |
| 5 | Get in touch | Gradient footer, contact details, Formspree |

**The page has two halves, and the seam is inside the About section.** Everything from the hero through Impact sits on `--paper`/`--paper-alt`. About fades into `--void` in its own top padding and stays there; the footer picks `--void` up as its first stop and runs to `--accent`. From the top of About to the bottom of the page is one continuous dark run. §3.5 and §3.6.

---

## 3. Section specs

### 3.1 Navigation

**Revised after step 13.** This section previously specified v1's floating pill and said not to touch its position, blur or scroll behaviour. The pill is gone — that was a deliberate decision, not drift, and the reasons are recorded below. Anything still describing a pill is out of date, not authoritative.

Four bare links, fixed to the top of the page. **No enclosure of any kind** — no pill, no border, no radius, no fill, no blur, no shadow.

| item | target | notes |
|---|---|---|
| Home | `index.html` (`../../index.html` from a case study) | `is-active` on the index |
| Projects | `#work` | `is-active` on every case study |
| About | `#about` | |
| Contact | `#contact` | **a local anchor on both pages** — they both carry the §3.6 footer, so it scrolls to the form on the page you are already on rather than sending you to the index |

```
       [HOME]  PROJECTS  ABOUT  CONTACT           centred, no enclosure
   ─────────────────────────────────────────────
   DAVID PRIETO ZURITA
```

- **Brackets encode state, they don't decorate.** Active item renders `[HOME]`; inactive items render `HOME` with no brackets. On hover/focus, brackets fade in at 40% opacity as a preview of the active state.
- Brackets are real characters in the DOM (`<span class="bracket">[</span>`), not `::before`/`::after` content, so copy-paste behaves.
- **The brackets carry `aria-hidden="true"`** (added at step 14). They are a visual state indicator, and on inactive items they are invisible and encode nothing — a screen reader announcing "[ Projects ]" there is reading punctuation for no reason. `aria-current="page"` is what carries the state to assistive tech. `aria-hidden` affects the accessibility tree only, so they remain real, selectable characters.
- Mono, `0.75rem`, `0.12em` tracking, uppercase. `--ink-muted` at rest, `--ink` when active or hovered.
- **Centred.** This deliberately gives up the alignment with the `h1` and the section titles that the left-aligned version was built for — David's call. The `<nav>` is still fixed with `left: 0; right: 0` and still carries an inner `<div class="shell">`, which keeps the links inside the page's own gutters at every width.
- Because it spans the viewport while painting nothing, the `<nav>` carries `pointer-events: none`, restored to `auto` on the links alone. An invisible full-width strip must not swallow clicks.
- Fixed `1.25rem` from the top for the whole page.
- **It hides while you scroll and comes back when you stop.** `ui.js` adds `.is-hidden`; three states, in priority order: within 24px of the top it is always visible; a scroll event just fired means hidden; **350ms with no scroll event** means visible again. The 24px threshold is not 0 so the sub-pixel scroll a browser performs when restoring position cannot flicker it on arrival. The idle timer restarts on every scroll event, so a long scroll does not reveal it mid-way.
  - The idle timer is the whole point: a scroll-direction check alone only reveals on an upward flick, and the requirement is that it returns while you sit still reading.
  - `visibility` is animated alongside `opacity` so the links cannot be tabbed to or clicked while invisible. `opacity` alone would leave three live but unreachable-looking targets floating over the content.
  - With `ui.js` absent the nav is simply always visible. Nothing about the page depends on it hiding.
- Link target height is 28px: `0.35rem` vertical padding on `0.75rem`/1.4 text. The bare line box is 16.8px and would miss WCAG 2.5.8's 24px floor. Vertical padding only — the horizontal separation is the list's `--s-2` gap, and side padding would push the first link off the shell's left edge.
- **Adding a fifth item is a width decision, not a markup one.** The brackets are in the DOM on every item and always occupy their width, so the four labels come to 32 glyphs; at `0.75rem` with `0.12em` tracking that is 276px, and the row needs 324px against 345px of shell at 375. Four was already enough to force the gap down from `--s-3` to `--s-2` and to add a type step below 375 (`0.6875rem`, `--s-1` gaps — 277px, clearing 320 by 17px, with the target box still 26.6px and over WCAG 2.5.8's 24px floor). A fifth would need measuring before it were written.
- Do not put a ground back behind them without first reading the contrast section below.

**Nothing is painted behind the links, so their contrast is whatever scrolls under them.** When About went `--void` that became a real failure across most of the page's height, and the fix is `mix-blend-mode: difference` on the nav.

**The blend inverts the backdrop, so the links are dark on light grounds and light on dark ones by construction** — no scroll position to track, no second colour pair to keep in sync, one declaration that is correct on every ground the page has or ever grows.

Three things about it are load-bearing:

- **The blend sits on `.nav`, not on `.nav-link`.** An element blends with its backdrop within its *parent* stacking context, and `.nav` is one (fixed + `z-index: 100`). A blend on the links would find nothing inside `.nav` to blend with and do effectively nothing. On `.nav` the backdrop is the root context — the page. `.site-header` creates no stacking context, so the chain holds. **Do not move it down to the links, and do not give `.site-header` a `z-index` or `isolation`.**
- **The colour logic is inverted, and the tokens are sources, not colours.** What gets painted is `|backdrop − source|` per channel, so a *light* source renders dark on `--paper` and light on `--void`. `--ink-muted` in there renders near-white on near-white. `--nav-rest: #B4B4B4` and `--nav-active: #FFFFFF` (§1.2) carry that warning at the point of definition.
- **The focus ring no longer paints its own ground.** A white ring under difference is the exact inverse of whatever is beneath it, so `outline: 2px solid var(--nav-active)` with a 2px offset needs no ground and no measurement. §3.6's "no boxes" is now literally true for the nav too.

Measured as shipped, against §6's floors of 4.5:1 for text and 3:1 for a focus indicator:

| ground | resting | active | focus ring |
|---|---|---|---|
| `--paper` — hero, work | 8.92 | 20.06 | 20.06 |
| `--paper-alt` — impact band | 9.44 | 17.82 | 17.82 |
| `--void` — About, footer top | 10.13 | 21.00 | 21.00 |
| footer gradient at 50% | 4.60 | 10.36 | 10.36 |
| footer gradient at 100% | **1.64** | **3.86** | 3.86 |

**The bottom of the footer still fails for text, and no source colour fixes it.** Inverting a saturated blue produces a yellow whose luminance sits close to cobalt's own, so even pure white only reaches 3.86 there. Resting text drops under 4.5 below **52%** of the footer; the active item holds to **92%**. The focus ring clears the entire run.

**The remaining band is handled by suppressing the nav there, and the two mechanisms together close the item.** `ui.js` hides the nav once the failing band has scrolled up past its underside, and that outranks both the at-the-top rule and the idle timer — the nav stays down over that band whether you are moving or not.

The test is geometric, not a scroll offset: `footerRect.top + footerRect.height × 0.52 ≤ 48`, where 48px is the nav's underside (`top: 1.25rem` plus a 28px target box). Read live inside the existing rAF, at most one rect per frame, because **the footer's height changes when `form.js` swaps the form for the confirmation** — a cached measurement would go stale exactly when someone has just written to David.

Two details that matter if this is ever touched:

- **The suppression is scoped to the band, not to the footer.** Above 52% the blend mode clears on its own, so the nav stays available for the top half of the contact section rather than vanishing the moment the footer appears.
- **The idle callback re-checks before it shows.** It fires on a delay, so the footer can arrive between the timer being set and it running; trusting the queued call would flash the nav over failing ground.

The other two exits considered and **not** taken, recorded so they are not re-proposed: swapping the link colour over the dark passage from `ui.js` (predictable, but a second colour pair and a scroll-position check to keep in sync), and putting a ground back behind the links (the thing removing the pill was meant to avoid).

**Keyboard focus is solved and stays solved.** See the ring row above — it is the one thing that clears at every point of the page.

There is also a collision no contrast ratio describes: the links pass directly over card borders and chapter text.

### 3.2 Hero

```
┌──────────────────────────────────────────────┐
│           [HOME]  PROJECTS  ABOUT            │  fixed, centred, no enclosure
│                                              │
│  ✦ OPEN TO WORK    MADRID, ES · REMOTE CET…  │  the hero's own two corners
│                                              │
│  DAVID PRIETO ZURITA                         │  display, tight
│  Senior Product Designer · Shipping B2B      │  mono, 1.5rem, --ink
│  SaaS that gets measured                     │
│                                              │
│  currently > [rotating line] ▮               │  the signature
│                                              │
│  See the work →                              │  single text link
└──────────────────────────────────────────────┘
```

**The two corner items are the hero's, not the viewport's.** They sit inside `.shell` at the top of the hero block, so they land on the same two grid lines the `h1` does, and they scroll away with the hero rather than sitting fixed over the page. `justify-content: space-between` puts availability left and location right; below about 620px they wrap and both stay left.

- **"Open to work"**, with a four-point star that turns. 8s linear, and deliberately that slow — at anything faster it reads as a loading spinner, which is the opposite of what it means. The star is `aria-hidden`: the text carries the meaning. Under `prefers-reduced-motion` it holds still.
- **"Madrid, ES · Remote CET/EST-friendly"** right. This is why the positioning line no longer says Madrid.
- The old bottom-of-hero availability line and the `<hr>` above it are **gone**. Do not put them back — the fact now lives in the corner, and repeating it would be the same claim twice on one screen.
- The same wording is used in the footer contact list ("Open to work"), so the site says one thing in one voice.

- **The positioning line is `.hero-role`**, and it is not `.meta` any more — see §1.3. It wraps to two lines below about 1024px and three at 375px. That is intended: the line is 62 glyphs, and forcing it onto one would mean shrinking it back to the size it just came up from.
- **No CV download link in the hero.** It lives in the About section only.
- Content constrained to `--shell`. Not `100vh` — let the work peek above the fold.
- Rotator: 4s hold, 400ms crossfade, `aria-live="off"` so it doesn't spam screen readers.
- **The rotator is a `<div>`, not a `<p>`, and that is what keeps §6 honest.** base.css caps every `<p>` at `--measure`, which is 62ch of the *body* face; the longest terminal line is 76 mono characters and wrapped mid-phrase, breaking the one thing the hero is built around. It used to carry `max-width: none` to escape that, which bent §6's "no paragraph exceeds `--measure`". A terminal line is not a paragraph, so it is no longer marked up as one — the rule is satisfied by the letter and nothing changed visually.
- `<noscript>`: line one renders statically. Also the default state in HTML, so it's visible before JS runs.
- Caret: CSS `@keyframes` blink, 1s `step-end`.
- Under `prefers-reduced-motion`: rotation stops on line one, caret stops blinking (stays solid).

### 3.3 Selected work

```
┌───────────────────────┐  ┌───────────────────────┐
│ [16:10 thumbnail]     │  │ [16:10 thumbnail]     │
│ SACEM - Messaging app │  │ Green Up - Transacti… │
│ Redesigning the mess… │  │ Designed the interac… │
│ ───────────────────── │  │ ───────────────────── │
│ Read case study →     │  │ IN PROGRESS           │
└───────────────────────┘  └───────────────────────┘
┌───────────────────────┐  ┌───────────────────────┐
│ [16:10 thumbnail]     │  │ [16:10 thumbnail]     │
│ SACEM - Collab+       │  │ Sanofi Connect - Ref… │
│ A new collaboration … │  │ Referral system to g… │
│ ───────────────────── │  │ ───────────────────── │
│ IN PROGRESS           │  │ IN PROGRESS           │
└───────────────────────┘  └───────────────────────┘
```

- **Section eyebrow: "See the process."** Every section title now carries one — see §3.9.
- **Four cards, one live and three WIP.** Titles and descriptions are David's, verbatim — including the spaced hyphen in each title, which is his form and not the en dash the year markers use. Do not "correct" it.

| # | Title | Description | State |
|---|---|---|---|
| 1 | SACEM - Messaging app | Redesigning the messaging app for music creators | `work/sacem/` |
| 2 | Green Up - Transaction Analysis | Designed the interactions and entire transaction process for an internal reuse industrial material platform | `work/thalesgu/` |
| 3 | SACEM - Collab+ | A new collaboration module built for musicians across France to promote networking and allow artists to share their creations | `work/sacem-collab/` |
| 4 | Sanofi Connect - Referral functionality | Referral system designed to grow platform audience and enable potential reward system | `work/sconnect/` |

  **Card 1 is a link; cards 2–4 are `.card-wip` and carry no `<a>`.** They were briefly all links, and that was reverted before promotion: their pages are scaffolding — a duplicate of the SACEM case study with only title, description, `h1` and badge changed — so a visitor clicking "Green Up" would read the SACEM messaging redesign under a Green Up headline. The pages stay in the repo, unlinked and `noindex`, and each is re-linked the moment it has content of its own. Folder names are deliberately abbreviated so a client's full name is not spelled out in a URL.
- **No metrics on the cards.** The numbers live in section 3.4 only, so they aren't diluted across two places.
- **All four slots are filled.** David's thumbnails landed 2026-08-27, all four exactly **1120 × 700** — 2x the 526 × 329 the slot reaches at `--shell`, which is the number item 38 derived. `.card-media-label` and its "Media pending" text are gone from the markup but kept in the CSS, because the next announced-but-unshot project needs the empty state back. The container still accepts, without any layout change:
  - a bare `<img>` at an AVIF (§4), a direct child of the slot so it sizes 100%/100% against it, or
  - `<video autoplay muted loop playsinline>` with a `poster`.
  - Under `prefers-reduced-motion`, video must not autoplay — show the poster.
- **The WIP card treatment, and the rule it rests on.** `.card-wip` gives `--ink-muted` text, an `IN PROGRESS` eyebrow, `cursor: default`, and **no `<a>`** — because a link to the wrong content is worse than an honest label. `.card-wip` takes the padding directly, since there is no `.card-link` to carry it, so a live card and a WIP card in the same row line up rule for rule. `--ink-muted` on `--paper` is 4.99:1, the same pairing `.card-desc` already uses. **Turning a card live is one edit:** wrap its contents in `<a class="card-link" href="work/<slug>/index.html">`, drop `card-wip` and `.card-status`, and end with `<span class="card-cta">Read case study →</span>`.
- **No `aria-disabled`** (this section asked for it until step 14). It is not an allowed attribute on `role=listitem`, which is what a `<li>` is, so axe flags it under `aria-allowed-attr` and it costs §6's "accessibility 100". It was also doing nothing: with no interactive element on the card there is nothing to disable, and `IN PROGRESS` is real text in the DOM, so the state already reaches everyone. Do not add it back.
- Live card: entire card is one `<a>`, no nested interactive elements. Hover: media scales `1.02`, border → `--accent`, 200ms ease.
- 2-up desktop, 1-up below 768px. Four cards make an even 2 × 2, so the old "third card starts a second row, do not stretch it" caveat no longer applies.
- **No numbering, and no `·` separator.** They were there on the argument that the order is by significance and the reader uses it. David removed them. `.card-head` went with them: it was a flex row whose only job was sitting the index and the title on one baseline, and a flex wrapper around a single `h3` is not a wrapper — the title carries the top margin instead.
- **All four thumbnails are David's, 1120 × 700, AVIF at quality 65.** They replace v1's 475 × 300 SACEM shot, which was the one genuinely under-resolved image on the site — upscaled 1.11x on any desktop before device pixel ratio was even considered. A thumbnail on a WIP card is expected and changes nothing else: the media slot is identical on both shapes, only the link and the CTA differ.
  **`alt` carries each thumbnail's headline, and is not empty.** The old `alt=""` was right when the image was a bare screenshot the card title already named. These are designed cards with a headline baked in — "From listing to signature", "Find a collaborator" — and that phrase appears nowhere else in the page, so an empty `alt` would drop it. The alt does *not* repeat the card's own description, which a screen reader has just read.
  **Quality 65 is the budget, not a preference.** §6 allows 800 KB and the index without thumbnails is 649 KB, so four of them have ~150 KB to live in. Measured: q65 is 138.3 KB and lands the page at **787.6 KB**; q75 would be 158 KB and overshoot. Checked at 526px, the slot's real display width, before choosing — headlines crisp, no visible artefacts. This is the collision item 38 predicted, resolved by encode quality exactly as it said it would be.
- Card heights are equal by the grid, and `.card-rule { margin-top: auto }` inside a flex column pins the rule and the CTA to the bottom of each one — so the four descriptions can be different lengths without the rules going ragged. That matters more now than it did with three short descriptors.

### 3.4 Impact — the staircase

Four boxes, offset vertically to form a rising staircase left to right. Rising encodes the content; don't invert it.

```
                                          ┌──────────┐
                             ┌──────────┐ │  +130%   │
                ┌──────────┐ │  41→59%  │ │          │
   ┌──────────┐ │   18%    │ │          │ └──────────┘
   │  €3.7M   │ │          │ └──────────┘
   │          │ └──────────┘
   └──────────┘
```

| Box | Icon | Figure | Label | Note |
|---|---|---|---|---|
| 1 | currency | €3.7M | avoided spend | Designed core features of an industrial marketplace helping our client save money in new equipment purchases |
| 2 | clock | 18% | drop-off reduction | Redesigned transaction flow transformed into fewer people abandoning mid-process |
| 3 | rising chart | 41% → 59% | weekly active users | Led design for a new module that drove weekly user engagement within first six months of launch |
| 4 | speech bubble | +130% | in-platform messaging | Redesigned the legacy messaging system which led monthly messages to grew from ~3k to ~7k |

Every part of the box is **always visible**, at every width.

- The 4.2 → 2.5 min figure is deliberately **not** here — it already carries a rotator line. Don't duplicate it.
- **Section eyebrow: "By the numbers."** §3.9.
- Numerals `--font-display`, `--accent`. Labels `--ink-muted`, mono, small.
- Notes take `margin-top: auto` so the four share a baseline at the bottom of their boxes — the stair's rhythm comes from the `translateY`, not from ragged box interiors.
- **There is no disclosure. The note is always on screen** — David's call, and it ends a long thread: the hover reveal, the `aria-expanded` that could never be truthful, and the argument about which JS file should own the toggle all go with it. §0's "no hover-only content" is now satisfied by there being no hover state that carries content at all.
- **The box is plain markup — no `<button>`, no `aria-expanded`, no `aria-controls`, and none of them come back.** Nothing in the box is interactive, so nothing in it should be a tab stop; four dead tab stops is what the `<button>` had become. The note `id`s stay: they cost nothing, and a real toggle would want them back.
- **Hover still washes the box `--accent-dim`**, because the box acknowledging the pointer is worth keeping. The text moves to `--ink` at the same time — `--ink-muted` on `--accent-dim` is 4.34:1, under §6's floor, where `--ink` is 15.5:1. There is no `:focus-within` any more; nothing inside can take focus.
- **Each box carries one of v1's icons**, matched to what it measures: a currency mark on avoided spend, a clock on the completion-time drop-off, a rising chart on weekly actives, a speech bubble on messaging. `--accent`, `1.5rem`, above the figure. Decorative — the figure and the label carry the meaning — so every `svg` is `aria-hidden`.
- Below 768px the staircase flattens to a stacked 1-up list with no offset.
- Staircase offsets via `transform: translateY()` on `nth-child`, in `--s-3` steps: box 1 = `+4.5rem`, box 2 = `+3rem`, box 3 = `+1.5rem`, box 4 = `0`. Parent needs matching bottom padding so the offset doesn't collide with the next section.
- Count-up on first intersect, 900ms `ease-out`. Under reduced motion, render the final value immediately.
- Section sits on `--paper-alt`.
- Every figure must match the CV exactly. If the CV changes, this section changes.

### 3.5 About — chapters

Sticky year column left, chapter content right, revealed on scroll. Replaces the current single long paragraph.

```
┌────────────┬─────────────────────────────────┐
│            │  [chapter image]                 │
│   1997     │  The Beginning                   │
│  (sticky)  │  Marbella, futsal, music,        │
│            │  Photoshop CS6 on forums         │
│            ├─────────────────────────────────┤
│            │  [chapter image]                 │
│ 2018–2020  │  Where it all started            │
│            │  Málaga, then Madrid, then the   │
│            │  promotion to product design     │
│            ├─────────────────────────────────┤
│            │  [chapter image]                 │
│ 2024–2026  │  Where I am now                  │
│            │  China remote, back in Madrid,   │
│            │  AI tooling, design events       │
└────────────┴─────────────────────────────────┘
```

**Section eyebrow:** "About me" (§3.9). **Section title:** "AI tooling & Design for B2B" — shortened from "Design and tooling for B2B platforms, with AI where it truly helps", which ran to two lines and was too long for a section head.

**This section is where the page goes dark, and it carries two more blocks after the chapters.** In order: eyebrow, title, three chapters, Education & Experience, Software I work with. Then the footer, on the same ground.

Three named chapters. The titles carry the narrative; the year column carries the timeline. Together they close the 1997 → 2018 gap without needing a fourth entry — "The Beginning" reads as a deliberate framing device rather than a missing chapter.

#### Final copy

**`1997` — The Beginning**

> Born in 1997 in Marbella, southern coast of Spain by the Mediterraneum sea. Playing football on the streets and futsal in a club took my afternoons. Listening to music 24/7 while playing videogames when I was at home. Found my interest for Design on internet forums, where I made signatures in Photoshop CS6

**`2018–2020` — Where it all started**

> After graduating I learned first graphic design to set the basics and later UI, all of it in Málaga, fulfilling a dream of living in a real city. Madrid came next in 2018 and with it my first job, as a Visual Designer. In 2020 I was promoted to Product Designer which led to an opportunity of owning two client platforms from the beginning with clients, PMs and engineers.

**`2024–2026` — Where I am now**

> Half a year working remotely from China taught me how design is done in a mobile-first, focused in gamification and pro-AI culture. Back in Madrid in 2025, I'm still leading those same two platforms, studying Google UX certificate, building AI tooling while staying up to new practices, and showing up at design events in the city to meet other designers that I admire.

Word counts: **53 / 69 / 63**. Chapters two and three are over §6's 60-word cap by 9 and 3 — David rewrote them knowing that and chose to keep the length. §6 records the exception rather than pretending the cap still holds. **Do not pad them, and do not trim them back without asking.**

#### Build rules

- Each chapter renders in this order: year marker (mono, large, muted, sticky) / chapter title (Inter Tight 600, `1.25rem`) / its copy (Inter Tight 400, capped at `--measure`).
- **Chapter three breaks its copy in two with `<br><br>` inside a single `<p>`.** That is David's edit and it is left as written, but it is worth knowing why it took that form rather than two `<p>` elements: base.css resets `p` margin to `0` and there is no `p + p` rule inside `.chapter-text`, so two paragraphs would sit flush against each other with no gap. If a second chapter ever wants a break, the cleaner fix is `.chapter-text p + p { margin-top: var(--s-3) }` and real paragraphs — the same rule `.cs-shell` already has for the case studies.
- Chapter titles are `<h3>`. The section heading is the `<h2>`. Don't skip levels.
- Year markers are typed exactly as above and are text, not generated. **Both ranges use an en dash** (U+2013) — `2018–2020` and `2024–2026`. A range takes an en dash; an em dash briefly appeared in the second one and was corrected. Do not let them diverge again.
- **Every chapter carries its own image, one each, not one portrait for the section.** Square or 4:5; above the title on mobile, beside the text from 1024 up (768 does not fit — see the note below). Max **400px** wide.
- **From 1024 the chapter is a two-column grid, not a float — and the difference is not cosmetic.** `.chapter-body` becomes `grid-template-columns: min(400px, 34%) minmax(0, 1fr)`, with the copy wrapped in `.chapter-text`.
  - **Why the float had to go.** A float shortens the *line boxes* inside a paragraph but does not move the paragraph's own box. So base.css's `p { max-width: var(--measure) }` capped the box at 564px and the floated image consumed 343px of that from the left, leaving about **28ch** for text — four or five words a line. Widening the chapter column could not fix it, because the cap, not the column, was the binding constraint. This was diagnosed only after a first attempt that widened the column and changed nothing.
  - As a grid column the text gets its own box, so `--measure` caps the text and nothing else.
  - **A third breakpoint at 1240 gives the image more and the copy less.** `--shell` is `min(1140px, 92vw)`, so it stops growing at `vw >= 1239`; above that the chapter body is a constant 916px however wide the monitor, and that is the range where a 311px image read small against 62ch of copy. From 1240 the columns are `min(440px, 46%)`, which puts the image at **421 × 406** and the copy at **~51ch** — the same measure 1024 already produced, so **line length now holds steady across the whole desktop range and the image is what grows.** The 440px cap does not bind at today's `--shell`; it is a ceiling if the shell is ever widened.

| width | layout | image | copy |
|---|---|---|---|
| 375 | 1 column | 345 × 332, centred | full width |
| 768 | 1 column | 400 × 385, centred | ~60ch |
| 1024 | 2 columns | 254 × 244, fills its track | ~51ch |
| 1240 and up | 2 columns | **421 × 406**, fills its track | ~51ch |

- **Stacked, the image is centred; in the grid it is not.** Below 1024 the 400px cap leaves dead space in a column that is wider than the image — at 768 that is 147px of nothing to the right of it, which reads as a mistake rather than as alignment, because in one column there is no spine to align to. In the grid it is a real column with the year marker and the copy to line up against, so it fills its track and sits left.
- **In the grid the figure must be `width: 100%`, not the base rule's cap.** `min(400px, 100%)` applies inside the grid too, so a 421px track was rendering a 400px image and quietly giving back 21px of what the 1240 breakpoint had just bought.
  - `align-items: start` keeps the image at the top rather than stretching it down the chapter.
- **The year track keeps its `clamp(8rem, 16vw, 12rem)`. Do not narrow it.** "2018–2020" is nine mono glyphs and needs ~130px at 768 and ~194px at 1440 against a track of 128px and 192px — the couple-of-pixels-spare fit that has always been flagged. Narrowing it to buy copy width was tried and breaks the date at every width. The gutter gave instead: `--s-5` to `--s-4`.
  - *This replaces the earlier single-portrait rule and the `--radius` and `--paper-alt` that came with it. Do not put them back.* The first image, `the-beginning.png`, is a **composited cut-out on a transparent ground**, not a photograph: the Sony Walkman, the football and the PlayStation deliberately break outside the photo's rectangle. A filled, rounded container frames precisely the parts that are meant to escape a frame, and a fixed `aspect-ratio` with `object-fit: cover` crops them off — at 4:5 it removed 183px from each side, which was the music and the videogames the copy is about.
  - **No cropping, and no `aspect-ratio` on the image.** Each `<img>` carries its real `width` and `height` attributes and is sized `width: 100%; height: auto`. The browser reserves the intrinsic ratio, so there is no layout shift, and square and 4:5 both fit without anything choosing what to lose.
  - **All three images have landed** — `the-beginning.png`, `where-it-started.png`, `me-now.png` — and they are a set: the same composited-cut-out treatment at the same 1.037 ratio, all served at 878 × 846. The chapter placeholder rules were deleted with the last of them, since nothing used them any more. The pattern is still documented here and still live in `.card-media-label` and `.cs-figure-slot`: a placeholder is a box (`--paper-alt`, `--radius`, mono label), because an unfilled empty slot is an invisible one, and the real image never inherits that fill or radius.
  - **Format: AVIF, and only AVIF.** The source PNG was 898 KB — 1.2 bytes per pixel, because PNG is a lossless compressor being handed a photograph. AVIF does alpha *and* photographs: the same 878 × 846 image at quality 85 is **121 KB**, an 87% saving, visually indistinguishable including the baked-in caption. `macOS sips` writes AVIF; it cannot write WebP (read-only in its format list), which is why this is not the more obvious WebP. **The PNG shipped alongside as a fallback until promotion, and no longer does** — §4 has that decision and what it strands. Chapter images are below the fold, so they also carry `loading="lazy"` and `decoding="async"` and cost nothing on initial load.
  - Real `alt` text is required, and it must carry any text baked into the image — text in pixels is unreadable to assistive tech and cannot be resized (WCAG 1.4.5). `the-beginning.png` has *"Always passionate about music"* baked in, and its `alt` says so.
- **CV download link sits at the end of "Where I am now"**, not in the hero. Mono, accent on hover. The label is **"Download Resume"** — no file type, no size. It said "Download CV — PDF, 194 KB" until David changed it: "resume" is the word people actually use, and a byte count in a label is developer furniture. The `download` attribute still does the work.
- Reveal: `IntersectionObserver`, `threshold: 0.25`, adds `.is-visible` → opacity `0→1`, `translateY(16px)→0`, 500ms. Each chapter animates on its own entry, no stagger.
- **Fallback:** `.is-visible` is applied by default in CSS; JS removes it on load before observing. Fully readable without JS.
- Sticky year collapses to an inline label below 768px.

#### The dark passage

The section fades out of `--paper` into `--void` and stays there. The footer picks `--void` up as its first stop, so About through the bottom of the page is one continuous dark run.

- **The fade lives entirely inside the section's own top padding**, and its length is **absolute (200px desktop, 120px mobile), not a percentage**, so it cannot stretch or compress as the content grows. Content starts well below it — nothing is ever read against a mid-grey. This is why `.about` is §1.4's one rhythm exception: it needs `calc(var(--s-8) + var(--s-6))` on top, which is also the "more separation from Impact" the change was asked for.
- **No hairline on the impact→About seam.** The gradient is the transition. `layout.css` draws a rule between every pair of sections and here it landed as a dark line across the `--paper` end of the fade, because the section repoints `--rule` for its own interior and the border read that. Removed, for the same reason the footer has never had one.
- **Everything inside is repointed through custom properties, not restated.** `.about` sets `--ink: var(--paper)`, `--ink-muted: var(--paper-muted)`, `--rule: var(--void-rule)`, `--accent: var(--accent-lift)`, `--paper-alt: #141414`, `--eyebrow-fg: var(--paper-muted)`. Every existing chapter, CV-button and media rule then works unchanged. **Add dark-mode styling this way, not with a second rule per element.**
- `.is-dark` on the section flips the background grid to `--grid-line-dark`. §1.4.

#### Education & Experience

Ported from v1's `about.html`, same copy. Two columns from 768 — Education left, Experience right.

- **A list, not a run of headings.** Five entries in a CV block are items in a timeline, not document sections; five more heading levels would clutter the outline for no navigational gain. `<ol class="resume-list">`, each item carrying date (mono, muted), role, place (mono, muted) and description.
- Block title takes §1.3's "Block title" row. Column titles are `<h4>` eyebrows.

#### Software I work with

Ported from v1's `about.html`. Ten tools, **5 across in two even rows** from 768 (3 at 480, 2 below).

- **Fixed column count, not `auto-fill`.** Auto-fill packed as many as fitted, which at a wide shell was eight on the first row and two orphaned on the second. Two even rows is what makes it read as a set.
- **Every icon sits on a `--paper` tile, and this is not decoration.** Four of the ten — Affinity, Cursor, Miro, Notion — are drawn in near-black and would vanish on `--void`; the other six are brand-coloured and must not be inverted to rescue them. A light tile gives all ten the ground they were drawn for.
- Icons are centred with flex, `line-height: 0` and an explicit `object-position`. The ten have wildly different intrinsic shapes — Figma is 120×90, Affinity 249×283, Adobe 240×234 with no `viewBox` at all — and several are Illustrator exports with whitespace baked into the `viewBox`. Centring the box alone was not enough.
- `alt=""` on every icon: the name is written beside it.
- **Two of the ten ship as AVIF instead of SVG.** DaVinci was a 145 KB gradient mesh and Adobe a 56 KB embedded PNG — neither was really a vector, and both were drawn at 32px. At 192px AVIF they are 4.7 KB and 6.7 KB, 4x the 48px slot. The SVGs were their `<picture>` fallback and went with the rest of them (§4), taking another 202 KB. `object-fit: contain` absorbs Adobe's 192 × 187 against a square box. The other eight are real vectors and stay as they are.

### 3.6 Get in touch — footer

```css
footer {
  background: linear-gradient(180deg,
    var(--void) 0%,
    var(--accent) 100%);
}
```

**The gradient starts at `--void`, not `--paper`, and that change deleted a whole class of problem rather than moving it.** On the old `--paper → --accent-dim → --accent` run every token had a depth past which it stopped clearing AA, and this section used to carry a measured table of those depths that every rule below depended on.

On `--void → --accent` there is exactly one legible colour and it is legible everywhere:

| | top | 25% | 50% | 75% | bottom |
|---|---|---|---|---|---|
| `--paper` | 20.44 | 17.74 | 13.45 | 9.51 | **6.54** |

So **everything in this footer is `--paper`** — text, field underlines, the submit button's rule, focus rings, all of it. Nothing here depends on how far down it sits any more.

What that retires, and none of it should come back: the per-depth table; the `--s-3` bottom padding that existed only to push the colophon past 90%; the paint-your-own-ground focus trick; and the `--s-8 + --s-6` colophon margin that was structural rather than spacing. **The rhythm is symmetric again, so §1.4's "one rule" holds here.** `--paper-muted` is banned — see §1.2.

The focus ring is `--paper` with `outline-offset: 3px`, not base.css's `--accent`: over a gradient ending in `--accent`, an `--accent` ring is 1:1 against its own ground at the bottom of the run, invisible exactly where the submit button sits. §3.6's "no boxes" is now literally true, at rest and on focus.

- Oversized mono headline sitting in the gradient: **"Let's talk."**
- **A lead line under the headline**, before the two columns: *"If you want to know more about me send me an email and I'll get back as soon as possible."* Body face, not mono — it is a sentence, where everything else in this footer is a label or a field. Capped at `--measure` so it does not run the full shell under a 96px headline.
- **Section eyebrow: "Where to find me."** §3.9.
- Contact block: email, LinkedIn, Madrid, current status. Mono, one per line, generous leading. The status line reads **"Open to work"**, the same wording as the hero corner. **No GitHub link** — removed at David's instruction; he does not publish there, so the row was a placeholder for something that is never coming. Do not add it back.
- **Formspree form stays — do not rebuild it.** Restyle only: bottom-border inputs, no boxes, mono labels, accent focus ring. Preserve the existing action URL and field names exactly.
- **It confirms inline, and `form.js` is what does it.** v1 intercepted the submit with `fetch` and swapped in a success message; without that the form posts natively and hands the visitor to formspree.io, which is the last thing a contact form should do. `form.js` restores v1's behaviour and nothing else — it never touches the action URL or the three field names.
  - **Both result states are markup, not strings in the script.** `.form-success` (with v1's copy: *"Done!"* / *"Thanks for your message. I'll get back as soon as possible."*) and `.form-error` (v1's *"Something went wrong…"*, now an inline message with a `mailto:` rather than v1's `alert()`). Both ship `hidden`. §0 forbids JS supplying content, and this is why.
  - **Progressive, and it must stay that way.** No `fetch`, no `FormData`, no `.form-success` in the DOM, or JS off entirely — the listener is never attached and the form posts natively exactly as before. Degraded, not broken.
  - **On success, focus moves to the confirmation.** The form the visitor was working in has just left the page; without moving focus, a keyboard or screen-reader user is dropped back to `<body>` and loses their place. `role="status"` is the belt for the case where focus cannot be taken, and the confirmation carries `tabindex="-1"` so it can.
  - **On failure the form stays put, re-enabled, with the error above the button** — a failed message must be retryable without retyping. Resubmitting clears the error first.
  - `.contact-form[hidden]` needs an explicit `display: none`. The UA sheet's `[hidden]` rule loses to `.contact-form { display: grid }`, so without it the form stays visible under the confirmation. That is a specificity fix, not a place for `!important`.
- Two markup additions are allowed against "restyle only", both from step 14 and neither touching the action URL or the field names: `autocomplete="name"` and `autocomplete="email"` on the two inputs (WCAG 1.3.5, AA), and `class="eyebrow"` on the three labels so they take §1.3's mono label role rather than a duplicated type block.
- **~~"No boxes" describes the form at rest.~~ Retired with the old gradient.** Controls no longer paint a `--paper` ground on focus; the ring is simply `--paper` at `outline-offset: 3px`, which clears at every depth. "No boxes" is now true at rest *and* on focus. The nav dropped the same mechanism at the same time, for a different reason — see §3.1. **Nothing on the site paints a ground under a focus ring any more.**
- **All text here is `--paper`**, not only the text over the accent end. See the table above.
- Bottom bar: `© 2026 · Built by hand · Madrid`, caption size.

### 3.7 Case study — `work/<slug>/index.html`

**Four of these exist:** `sacem`, `thalesgu`, `sacem-collab`, `sconnect`. Slugs are abbreviated on purpose so a client's full name is not spelled out in a URL. Only `sacem` has real content; the other three are duplicates of it carrying their own `<title>`, `<meta description>`, `<h1>` and an "in progress" badge, and nothing else of their own yet.

**They are literal copies, and that is a liability to watch — for structure, not for copy.** Each page's wording is its own and the four are meant to diverge as they get written; do not propagate copy between them. What has no include mechanism, and what §0's no-build-step rules out solving, is *structural* change: a template fix, a new section, a markup or accessibility correction. Those have to be applied four times. Before changing one of these pages structurally, check whether the change belongs on all four.

The v1 SACEM page ported onto the v2 system. Everything below is the shape every future case study takes.

```
   ┌──────────────────────────────────────────┐   --shell, padded from the top
   │              hero image                   │
├──────────────────────────────────────────────┤
│  CASE STUDY                                   │
│  SACEM — Messaging App Redesign               │   ┌──────────┐
│  one-line subtitle                            │   │ Overview │
│  [tag] [tag] [tag]                            │   │ What I…  │  fixed
│  ── Contents ─────────                        │   │ Context  │  rail
├──────────────────────────────────────────────┤   │ …        │  ≥1200
│  role · timeline · team · tools               │   └──────────┘
├──────────────────────────────────────────────┤
│  What I Did / Context / Problems & Goals /    │
│  Research / Process / Outcome / Results /     │
│  Takeaways                                    │
└──────────────────────────────────────────────┘
```

**Sections, in order, with these exact ids:** `overview`, `what-i-did`, `context`, `challenge`, `research`, `process`, `outcome`, `results`, `takeaways`. They are v1's own sections and v1's own copy — a port, not a rewrite. The ids are what the contents nav targets.

#### Build rules

- **Its own reading column: `.cs-shell` at `min(820px, 92vw)`, not `--shell`.** A case study is long-form prose, and 62ch of copy in a 1140px field reads as a caption. The narrower column is also what leaves a gutter the fixed rail can live in.
- **The rail hides once the footer reaches it**, and unlike the site nav this is overlap with the footer *at all*, not with a band inside it. The rail carries no blend mode, so it fails from the very top of the footer: `--ink-muted` on `--void` is 4.09 and the current entry's `--accent` is 3.13, both under 4.5. The test is `footerRect.top ≤ railRect.bottom`.
  - **The nav's blend mode was considered here and rejected.** A blend on a rail sitting beside a reading column is a far more visible change than one on three small links.
  - **Guarded twice, and it must stay that way.** Below 1200 the rail is an ordinary contents list in the flow, and hiding it there would take a working table of contents out of the document. `casestudy.js` checks `matchMedia('(min-width: 1200px)')` before it ever adds the class, *and* the rule that hides it is scoped inside the same media query. Either guard alone would do; both together mean a mistake in one cannot reach the in-flow version.
  - `visibility: hidden` keeps layout, so the rail's own rect stays valid while hidden and the test cannot oscillate.
- **Contents nav — one element, two jobs, no duplicated markup.** In the flow it is an ordinary "Contents" list under the page header, which is what it is on a phone and what it stays as with JS off. From **1200px** it becomes a fixed rail in the right gutter, vertically centred so it clears both the site nav at 48px and the progress hairline at 0. `casestudy.js` marks the current entry; the mark is a rule that grows from 40% to full width, not colour alone (WCAG 1.4.1).
  - 1200 is measured, not chosen: the gutter there is `(1200 − 820) / 2 = 190px` against a 140px rail plus `--s-4` of clearance, so it fits with 18px spare and only widens above.
- **Scroll progress:** a 2px `--accent` hairline fixed at the top. It is scaled (`transform: scaleX`), never resized — animating `width` forces layout on every scroll frame — and the paint is batched into a `requestAnimationFrame`. `aria-hidden`: it reports a fact the document already gives assistive tech, and a `progressbar` role would announce on every tick.
- **Site nav:** the same three bare links as §3.1, targets climbing `../../`. **Projects** is `is-active` and `aria-current="page"` on every case study.
- **Footer:** the §3.6 footer, unchanged — same markup, same Formspree action and field names.
- **`.kw`** — v1 marked phrases inside its prose. Carried over as an `--accent-dim` wash, not a colour swap: `--ink` on `--accent-dim` is 15.5:1, and recolouring the text would put a second meaning on the one colour §1.2 reserves for interaction. A wash also survives forced-colours mode, where a colour change vanishes.
- **Subheads inside a prose section (`.cs-sub`) are mono**, on §1.3's "mono is the display face" rule — the same call `.card-title` makes. The `<h4>`s inside Target Users are body face, because they are leads, not labels.
- **Images get `--shell`, wider than the reading column but not full bleed.** They are screenshots and they earn the extra width.
- **The hero image is on the grid too, and no longer full bleed.** `--shell` wide, so its left and right edges land on the same two background hairlines everything else sits on, with `--s-7` of top padding (`--s-6` below 768).
  - **Its height tracks 40vw, and that number is derived rather than chosen.** The figure is `--shell` wide, `--shell` is `92vw` below its cap, and the source is 2280 × 960 — so the banner's natural height at this width is `92 / 2.375 = 38.7vw`. Tracking 40vw renders it at within about 3% of its true proportions from 768 up, instead of cropping a fifth of the picture away to a letterbox. `clamp(240px, 40vw, 480px)`: the 480 ceiling sits 9px under the 489px it would be at a capped 1140px shell, and the 240 floor is the deliberate exception — at 375 the true height is 148px, a strip rather than a hero, so it stays taller and lets `object-fit` take the sides. It is the only element on either page that needs its own top clearance, because it is the only one that is the first thing in the document — it has to clear the fixed nav, whose underside sits at 48px, and then leave enough air to read as placed rather than jammed under the chrome.
- **v1's closing "Other Projects" block is not ported.** Both its cards were placeholders pointing back at the same page, with thumbnails loaded from `dummyimage.com` — an external host, which §0 rules out. A link back to the work section replaces it until there is a second case study.
- **v1's two Final Outcome images do not exist in this repo** (`img/sacem/outcome-1.jpg`, `outcome-2.jpg` — the directory is absent). They are placeholder boxes carrying v1's captions, on the §3.5 rule: a placeholder is a box, the real image is not.

---

---

### 3.8 Cursor

A ring that **replaces** the native pointer. David chose the full replacement over a ring that trails alongside the native cursor, after the usability cost was put to him.

- **28px hollow circle**, easing toward the pointer at 0.2 per frame in a `requestAnimationFrame` loop — not driven from the pointer event, so a burst of `pointermove` cannot queue a write each.
- **`mix-blend-mode: difference`.** One ring works on `--paper`, `--paper-alt`, `--void` and cobalt without ever being told which it is over: it inverts whatever is beneath, so it is dark on light grounds and light on dark ones by construction.
- **Over anything interactive it grows to 44px and fills.** Filled rather than merely larger, so the state is legible at a glance and not a size the eye has to compare.
- **Over a text field it becomes a 2px bar.** This is the one affordance lost by hiding the native I-beam, and it is given back explicitly rather than accepted as a cost.
- `pointer-events: none`, always. It must never intercept what it is pointing at.

**Three guards decide whether it runs at all, and the native cursor is only hidden once they pass. None of them is optional.**

1. **A fine pointer that can hover.** Touch has no cursor to replace. The `matchMedia` listener is live, not a one-time read, so a hybrid device that picks up a mouse mid-session gets the ring and one that switches to touch gets its cursor back.
2. **Reduced motion off.** The ring eases toward the pointer, which is exactly the unrequested movement the query is about.
3. **This script running at all.** `cursor: none` lives under `.has-cursor-ring`, a class `ui.js` adds. A parse error, a blocked script or JS off leaves the native pointer exactly where it was. **Never hide the cursor from CSS alone** — the page must not be able to reach a state where there is no pointer and no way to get one back.

It is also hidden when the pointer leaves the window and on `blur`, so it cannot sit frozen over the page.

### 3.9 Section eyebrows

A mono label above every section title, taking §1.3's eyebrow role, muted, so the `h2` under it stays the loudest thing in the section.

| Section | Eyebrow |
|---|---|
| Selected work | See the process |
| Impact | By the numbers |
| About | About me |
| Get in touch | Where to find me |

The colour comes from `--eyebrow-fg`, which defaults to `--ink-muted` and is repointed by the dark blocks — `--paper-muted` in About, `--paper` in the footer — rather than from a second rule per section. §3.5 uses the same class again for its "Background" and "Toolkit" sub-blocks.

---

### 3.10 Link preview

Every page carries an Open Graph block and a `canonical`. Without one, a URL pasted into LinkedIn renders as a bare title on a grey rectangle — which is how most people will first meet this site.

- **The card is `assets/img/social-card.png`, 1200 × 630.** It is a real screenshot of the hero at that size, cropped from 1250 × 630 so the shell's two hairlines sit 30px and 31px from the edges rather than the original 42 and 69. It is not a composed graphic: the page's own opening screen is the strongest thing it could show.
- **It is a PNG, and that is deliberate — see §4.** Do not convert it to AVIF.
- **The URLs are absolute, and that is deliberate — see §0.** They are the post-promotion ones, so nothing in the block changes at promotion. The cost is that while the preview lives at `/v2/` the card resolves to a page that is not up yet; the site is `noindex` until promotion and should not be shared from there.
- **`og:title` and `og:description` are each page's own**; the image is shared by all five. A case study will want its own card once it has final screens, and the reason it cannot have one today is that its hero is AVIF and there is no PNG of it.
- `twitter:card` is `summary_large_image`. No `twitter:title` or `twitter:description` — X falls back to the `og:` pair, and duplicating them is two more lines to keep in sync.
- `og:image:alt` is required by the same rule as every other image (§3.5): it carries the text baked into the card.

### 3.11 Not found — `404.html`

Playful, in David's words, and the one page on the site that is a single self-contained file.

- **The copy is his: `哎呀` over "Looks like you went too far"**, with an `ERROR 404` eyebrow above and one button back. `哎呀` (*āiyā*) is roughly "oops" — the page's whole warmth is carried by it, so it is set at `clamp(4rem, 13vw, 8.5rem)` and everything else stays quiet.
- **Both halves live in one `<h1>`**, the Chinese in a block-level `<span lang="zh-Hans">`. A heading reading only `哎呀` would announce as two characters and nothing else; this way the whole message is the heading, and the `lang` attribute gets a screen reader to switch voice rather than spell it.
- **No CJK glyph exists in a latin-subset `.woff2`, so `哎呀` was always going to come from the system.** `--font-hans` names the stack — PingFang, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK — so it reads as a deliberate second voice against Geist Mono instead of a font that failed. Adding a CJK webfont for two characters is not on the table: the smallest usable subset dwarfs the entire rest of the page.
- **`哎呀` is not `--accent`.** §1.2 gives the cobalt to interaction and measurement, never decoration. The accent on this page is the button's hover and the focus ring; the heading carries its weight in size alone.
- **The background is the site's own grid, plus the horizontals David asked for.** Three vertical hairlines on the shell's left edge, centre and right edge — the same three-layer background trick `layout.css` uses — but `position: fixed` and full height, because this page has no sections for them to be drawn per. The horizontals are the panel's own `border-top`/`border-bottom`, full bleed, which is exactly the line `layout.css` draws between two sections.
- **Everything is root-relative, and that is not optional.** GitHub Pages serves `404.html` for any unmatched URL while leaving the address bar at what was requested, so a request for `/work/typo/deep` makes `assets/…` resolve against `/work/typo/` and 404 inside the 404. The CSS is inline for the same reason — a 404 page should have no dependency that can itself fail — leaving two font requests, each with a real fallback stack behind it.
- **Only the repo root's `404.html` is ever used.** Pages ignores one in a subdirectory, so this file does nothing at `/v2/404.html` beyond being directly viewable. It starts working at promotion.
- **It keeps its `noindex` when the other five pages lose theirs.** A 404 is served with a 404 status and should never be indexed.
- `justify-content: safe center`, not `center`. Verified at 320px tall: the panel overflows the bottom, which scrolls, rather than the top, which would not.

### 3.12 Root metadata — manifest, robots, sitemap

Three small files that all share one property: **only the site root's copy is ever read.** A `robots.txt`, a `sitemap.xml` or a `404.html` in a subdirectory is ignored, so none of these do anything at `/v2/` — they are written now, in their final form, and start working at promotion when they move to the root with everything else. That is also why they sit at `v2/`'s top level rather than under `assets/`.

**`site.webmanifest`** — rewritten, moved, and now actually linked.

- The favicon generator left a copy in `assets/img/favicon/` that was **unlinked and broken**: its icon paths were root-relative (`/web-app-manifest-192x192.png`) to files that do not sit at the root, and its name was `MyWebSite`. That file is gone.
- **It lives at the site root now, and that is what makes the paths work.** Every URL inside a manifest resolves against *the manifest's own location*, not the page's — so from the root, `"start_url": "./"` and `assets/img/favicon/…` are correct both at `/v2/` today and at the root after promotion, with no edit in between.
- **`purpose` is `any`, not `maskable`.** The generator declared the icons maskable; they are not. The monogram fills roughly 88% of its canvas, well outside the central safe zone a circular Android mask leaves, so a maskable declaration would have cropped the mark's edges. A true maskable variant would need a padded re-export — worth doing, not worth faking.
- `theme_color` and `background_color` are `--paper`, matching the top of the page. Each page also carries `<meta name="theme-color" content="#FCFCFA">`, which is what actually tints the browser chrome.

**`robots.txt`** — permissive, and deliberately so.

- **`/v1/` is not disallowed, and must not be.** The archived pages carry `noindex`, and a crawler has to *fetch* a page to see that tag. Blocking the path would hide the `noindex` and leave the old URLs eligible to appear as bare, untitled links — the opposite of the intent. The same reasoning covers the three unfinished case studies: `noindex` on the page, no inbound link, no sitemap entry, and nothing blocked.
- It points at the sitemap by absolute URL, which is the only form the file accepts.

**`sitemap.xml`** — two URLs: the index and `/work/sacem/`.

- **The three scaffolded case studies are excluded on purpose.** Listing a page while telling crawlers not to index it is a contradiction, and their copy is still SACEM's. Each gets a `<url>` block as it is written.
- No `changefreq`, no `priority` — Google has ignored both for years.

---

## 4. File structure

```
v2/
├── index.html
├── 404.html                      ← self-contained; root-relative by necessity, §3.11
├── site.webmanifest              ┐
├── robots.txt                    │ root-only files: inert at /v2/, live at promotion, §3.12
├── sitemap.xml                   ┘
├── work/
│   ├── sacem/index.html
│   ├── thalesgu/index.html
│   ├── sacem-collab/index.html
│   └── sconnect/index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css        ← custom properties, loaded first
│   │   ├── base.css          ← reset, @font-face, typography, focus styles
│   │   ├── layout.css        ← grid, shell, section rhythm
│   │   ├── components.css    ← nav, hero, cards, staircase, chapters, footer
│   │   └── casestudy.css     ← case-study pages only; the index never loads it
│   ├── js/
│   │   ├── rotator.js
│   │   ├── reveal.js
│   │   ├── counters.js
│   │   ├── form.js           ← every page with the footer form
│   │   ├── ui.js             ← every page: nav visibility + cursor ring
│   │   └── casestudy.js      ← case-study pages only
│   ├── fonts/                ← geist-mono 400/500, inter-tight 400/600
│   └── img/
└── design.md
```

- Four `<link>` tags in order on `index.html`. No `@import` — it blocks rendering.
- **A case study loads a fifth, `casestudy.css`, after `components.css`.** It is the only page-scoped sheet, and it exists so the index pays nothing for a page it never shows. It restates nothing: `.shell`, `.band-alt`, the section rhythm, `.eyebrow`, `.meta`, `.cv-button`, the nav and the footer all come from the four above.
- Likewise `casestudy.js` loads on case-study pages only, and the index's three scripts do not load on a case study. `form.js` and `ui.js` load on **both**: both pages carry the §3.6 footer and the §3.1 nav.
- **`ui.js` owns page chrome — things that belong to the viewport rather than to any one section.** Today that is the nav's visibility (§3.1) and the cursor ring (§3.8). New chrome goes here rather than into a fifth and sixth file.
- JS with `defer`. Each file a plain IIFE — no ES modules, so local `file://` preview works.
- **Every image on the site is a bare `<img>` pointing at an AVIF.** There are no `<picture>` elements and no raster fallbacks — they were dropped before promotion, David's call, knowing the cost: **Safari below 16.4 (pre-March 2023) sees no images at all.** Everything newer does, and AVIF has been in every current engine since Firefox 93 / Chrome 85. What it bought: fourteen `<picture>` blocks became fourteen `<img>` tags, three `display: contents` rules left the CSS, and **8.7 MB of fallbacks and dead files left the repo** — `me-now.png` alone was 4.4 MB against its 220 KB AVIF. It costs nothing at load time either way, since a supporting browser never fetched a fallback; it was repo weight, and after promotion it is repo weight at the live root. The files are recoverable from git if the decision is ever reversed. §3.5 has the encode numbers.
- **One file is exempt and must stay exempt: `assets/img/social-card.png`.** Link-preview scrapers are not browsers and none of the major ones read AVIF, so converting it would silently blank every share on LinkedIn, Slack, iMessage and X. No browser fetches it during a page view, so it costs nothing against §6's budget. §3.10.
- Everything below the fold carries `loading="lazy"` and `decoding="async"`; the one image above it — a case study's hero — carries `fetchpriority="high"` instead.

---

## 5. Build order

**Steps 1–15 are done.** This list is kept as the record of how the page was built and in what order, not as work remaining. Everything after step 15 came from David directly and is specified in §3, not here.

Each step was independently reviewable, with a stop for review after each.

1. `tokens.css` + `base.css` — `@font-face` blocks, type scale, color, focus styles. Verify on a throwaway page.
2. `index.html` semantic skeleton — all five sections, real structure, zero styling. Confirm it reads top to bottom as a document with CSS disabled.
3. `layout.css` — grid, shell, section rhythm.
4. Nav bracket states.
5. Hero, static (no rotation).
6. `rotator.js` + caret.
7. Work cards, including empty media containers and WIP states.
8. Impact staircase, static values, disclosure working on hover **and** focus **and** tap. *(The disclosure was later removed entirely — §3.4.)*
9. `counters.js`.
10. About chapters, static, with photo slot. *(Later: one image per chapter, a two-column grid instead of a float, and the dark passage — §3.5.)*
11. `reveal.js`.
12. Footer gradient + Formspree restyle. *(The gradient later changed to `--void → --accent`, and the form gained `form.js` — §3.6.)*
13. Responsive pass: 375 / 768 / 1024 / 1440.
14. Accessibility pass: tab order, focus visibility, contrast, reduced motion, `noscript`.
15. Performance pass: font subsetting, image compression, Lighthouse.

**After step 15**, in order: the SACEM case study (§3.7); per-chapter images and AVIF everywhere (§3.5, §4); `form.js` (§3.6); then David's two rounds of changes — the nav, the hero corners, the background grid, the section eyebrows, the impact rebuild, the dark passage with Education & Experience and the toolkit, and the cursor.

---

## 6. Acceptance criteria

- [ ] Renders complete and usable with JavaScript disabled.
- [ ] `prefers-reduced-motion: reduce` kills rotation, caret blink, count-up, reveals, the spinning star, the cursor ring, and video autoplay. All content still visible. **Every animated selector must have a stand-down** — there is no blanket override, because one would need `!important`.
- [ ] ~~Every metric box disclosure reachable by keyboard and by tap.~~ Retired: there is no disclosure. §3.4.
- [ ] Visible focus state on every interactive element. Four grounds, four answers, each recorded where it lives: `--accent` on the light half; `--accent-lift` in About (`--accent` is 3.13:1 on `--void`); `--paper` in the footer (`--accent` is 1:1 against the footer's own bottom stop); and `--nav-active` through the blend mode on the nav, which is the only one that clears every point of the page.
- [ ] **Hiding the native cursor is never reachable without JS.** §3.8.
- [ ] No text anywhere under 4.5:1, and no border or focus indicator under 3:1 — checked on `--paper`, `--paper-alt`, `--void`, and at five points down the footer gradient. **No exceptions.** The two grounds no colour choice could fix — the nav over the bottom of the footer, and the case study's rail over any of it — are handled by not rendering there: §3.1 and §3.7.
- [ ] No paragraph exceeds `--measure`.
- [ ] ~~No About chapter exceeds 60 words.~~ **Waived by David, knowingly.** The chapters run 53 / 69 / 63 after his rewrite. The cap was there to stop the section becoming the wall of text it replaced; at ~63 words average it still is not one. Kept struck rather than deleted so the change is visible.
- [ ] Every metric matches the CV exactly.
- [x] ~~Work card media containers hold their 16:10 box while empty~~ — **assets arrived 2026-08-27 and there was no layout shift**, which is what the criterion was for. The empty state stays in the CSS for the next unshot project.
- [ ] ~~Every image is a `<picture>` with an AVIF source~~ — **the fallbacks were dropped; every image is a bare `<img>` at an AVIF.** §4 has the reasoning and what it strands. Still required: real `width`/`height` on every one, and `loading="lazy"` unless it is above the fold.
- [ ] Zero external network requests.
- [ ] Lighthouse: performance ≥ 95, accessibility 100.
- [ ] Total page weight under 800KB.
- [ ] Verified on the deployed `davidpzu.github.io/v2/` URL, not just locally.

---

## 7. Explicit non-goals

- No dark mode **as a toggle**. The dark passage of §3.5/§3.6 is a fixed part of the page's composition, not a user preference, and there is no light/dark switch.
- No page transition or scroll library. No Lenis, Locomotive, GSAP, Framer Motion.
- No magnetic buttons, no scroll-jacking.
- No blog section.
- No CMS.
- No "Beyond the screen" or interests section — the rotator already carries the personal register.

**Two entries were removed from this list rather than being broken quietly.**

- **"No cursor follower"** — David asked for one and chose the full native-cursor replacement over a trailing ring, after the usability cost was put to him. §3.8 is the spec, and its three guards are what keep it from being the thing this non-goal was guarding against.
- **"No software/tools section"** — the old wording bundled the toolkit in with "Beyond the screen". They are not the same thing: a tools list is professional evidence, an interests section is personal register. The toolkit is now in §3.5; the interests section is still ruled out.

---

## 8. Notes for Claude Code

- **Stay inside `/v2`.** Never touch the repo root.
- Ask before deleting anything. The SACEM case study and the Formspree config are load-bearing.
- **Every image David owed has landed.** The three chapter images, all four card thumbnails and all four case study heroes are in and wired. What is still outstanding is the **Final Outcome screens** — two 16:9 slots per case study, eight boxes across four pages, still placeholders carrying v1's captions. The rule stands for those: build the fixed-ratio slot, and **do not source, generate, or substitute images.**
- When a behaviour is ambiguous, build the simpler version and flag it. Don't guess at complexity.
- If a CSS rule seems to need `!important`, the specificity is wrong. Fix the selector.
- **Promotion is a manual step done by David, not by you**, and it is no longer the one-liner this line used to carry. That command (`rm index.html && rm -rf assets work && mv v2/* .`) leaves v1 debris serving at the root — `about.html`, `projects.html`, `sacem.html`, `greenup-transaction.html`, `css/`, `js/`, `.htaccess` and the root CV all survive it, with v1 navigation pointing back at an index that is now v2. It also moves `design.md` and `STATUS.md` into the live root. The sequence, in three revertible commits:

  1. **Push first.** The preview goes live at `davidpzu.github.io/v2/` under `noindex`, which is what those tags are for and the only way to satisfy §6's last criterion.
  2. **Commit A — archive v1.** `git mv` the whole old site into `v1/`: the five pages *and* `css/`, `js/`, `assets/`, `.htaccess`, the root CV. All of it together, or v1's own relative paths break — and the root `assets/` has to vacate before v2's can take its place. Add `noindex` to the archived pages.
  3. **Commit B — the swap.** `v2/*` to the root, minus `design.md` and `STATUS.md`. `404.html` lands at the root, where it starts working (§3.11).
  4. **Commit C — go public.** Strip `noindex` from the five v2 pages; `404.html` keeps its own. Add `robots.txt` and `sitemap.xml`.
  5. Tag `v2-live`.

  Rollback point is the `v1-live` tag. Note that archiving v1 preserves its *content* but not its *URLs* — anything linking to `davidpzu.github.io/sacem.html` gets the 404 page unless redirect stubs are added in Commit A.
