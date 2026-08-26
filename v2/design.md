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
- **Relative paths everywhere.** `assets/css/tokens.css`, `../../assets/js/rotator.js`. Never root-relative (`/assets/…`) — those break the moment `/v2` is promoted to root.
- **Fonts self-hosted** as `.woff2` in `v2/assets/fonts/`. No external requests of any kind.
- **`<meta name="robots" content="noindex">`** on every `/v2` page until promotion. Remove at promotion.
- **JS is progressive enhancement.** Every section readable and navigable with JavaScript disabled. JS adds motion, never content.
- **Accessibility floor:** visible keyboard focus, `prefers-reduced-motion` respected, semantic landmarks, AA contrast minimum, no hover-only content.

---

## 1. Design direction

### 1.1 Thesis

**"Engineering notebook."** Near-white space, monospace as the display face, content chaptered rather than dumped. Justified by the subject: a product designer who works close to code and builds his own tooling. The mono isn't decoration — it's accurate.

### 1.2 Color tokens

```css
:root {
  --paper:      #FCFCFA;  /* page background — barely warm, not cream */
  --paper-alt:  #F4F4F0;  /* alternating section band */
  --ink:        #14150F;  /* primary text */
  --ink-muted:  #6E6E68;  /* captions, meta, mono labels */
  --rule:       #E2E2DC;  /* hairlines, card borders */
  --accent:     #1F3BFF;  /* cobalt — links, focus ring, caret, metric numerals */
  --accent-dim: #E8EBFF;  /* accent wash, metric box hover, footer gradient stop */
}
```

Accent appears in **five places only**: link hover, focus ring, the hero caret, metric numerals, footer gradient. Nowhere else. Electric cobalt reads engineered against near-white and stays clear of the warm-cream palette that every templated portfolio lands on.

### 1.3 Type tokens

```css
:root {
  --font-display: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
  --font-body:    "Inter Tight", system-ui, -apple-system, sans-serif;
  --font-mark:    "Syne", var(--font-display);   /* wordmark only */
}
```

Weights to load: Geist Mono 400/500, Inter Tight 400/600, Syne 700. All `latin`, all `font-display: swap`. Nothing else.

Mono is the display face — headlines, section titles, nav, metrics, eyebrows. Inter Tight carries body copy so the About chapters are readable at length. Syne is demoted to the wordmark; it doesn't hold up as a body face and isn't what the direction is doing.

| Role | Size | Face | Tracking | Weight |
|---|---|---|---|---|
| Hero name | `clamp(2.5rem, 7vw, 5rem)` | display | `-0.03em` | 500 |
| Section title | `clamp(1.75rem, 3.5vw, 2.75rem)` | display | `-0.02em` | 500 |
| Metric numeral | `clamp(2rem, 4.5vw, 3.5rem)` | display | `-0.04em` | 500 |
| Chapter year | `clamp(1.5rem, 3vw, 2.25rem)` | display | `-0.02em` | 400 |
| Chapter lead | `1.25rem` | body | `-0.01em` | 600 |
| Body | `1.0625rem / 1.65` | body | `0` | 400 |
| Eyebrow / nav | `0.75rem` | display | `0.12em`, uppercase | 500 |
| Caption / meta | `0.8125rem` | display | `0.02em` | 400 |

### 1.4 Space and layout

Whitespace is the mechanism, not an afterthought. Strict scale, used consistently.

```css
:root {
  --s-1: 0.5rem;  --s-2: 1rem;   --s-3: 1.5rem;  --s-4: 2rem;
  --s-5: 3rem;    --s-6: 4.5rem; --s-7: 7rem;    --s-8: 10rem;
  --measure: 62ch;
  --shell:   min(1140px, 92vw);
  --radius:  10px;   /* cards and metric boxes only — everything else square */
}
```

- Section rhythm: `--s-8` desktop, `--s-6` mobile. **One rule, no exceptions.**
- 12-column grid, `--s-3` gutter, `--shell` container.
- Hairline `1px solid var(--rule)` between major sections. No shadows except card hover.

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
| 2 | Selected work | 3 cards: 1 live, 2 in progress |
| 3 | Impact | 4 metric boxes in a rising staircase, hover/focus discloses context |
| 4 | About — chapters | Scrolled timeline, replaces the wall of text |
| 5 | Get in touch | Gradient footer, contact details, Formspree |

---

## 3. Section specs

### 3.1 Navigation

**Revised after step 13.** This section previously specified v1's floating pill and said not to touch its position, blur or scroll behaviour. The pill is gone — that was a deliberate decision, not drift, and the reasons are recorded below. Anything still describing a pill is out of date, not authoritative.

Three bare links, fixed to the top of the page. Same three items as v1, same targets, same mono treatment. **No enclosure of any kind** — no pill, no border, no radius, no fill, no blur, no shadow.

```
   [HOME]   PROJECTS   ABOUT
   ─────────────────────────────────────────────
   DAVID PRIETO ZURITA
```

- **Brackets encode state, they don't decorate.** Active item renders `[HOME]`; inactive items render `HOME` with no brackets. On hover/focus, brackets fade in at 40% opacity as a preview of the active state.
- Brackets are real characters in the DOM (`<span class="bracket">[</span>`), not `::before`/`::after` content, so copy-paste behaves.
- **The brackets carry `aria-hidden="true"`** (added at step 14). They are a visual state indicator, and on inactive items they are invisible and encode nothing — a screen reader announcing "[ Projects ]" there is reading punctuation for no reason. `aria-current="page"` is what carries the state to assistive tech. `aria-hidden` affects the accessibility tree only, so they remain real, selectable characters.
- Mono, `0.75rem`, `0.12em` tracking, uppercase. `--ink-muted` at rest, `--ink` when active or hovered.
- **Left-aligned to `--shell`**, in line with the hero name and every section title. The pill was centred and so needed no relationship to anything; bare links do. The `<nav>` is fixed with `left: 0; right: 0` and carries an inner `<div class="shell">` — the same mechanism every section uses, so the two cannot drift apart at any width.
- Because it spans the viewport while painting nothing, the `<nav>` carries `pointer-events: none`, restored to `auto` on the links alone. An invisible full-width strip must not swallow clicks.
- Fixed `1.25rem` from the top, and it stays for the whole page. It does not change on scroll — there is no longer anything to change.
- Link target height is 28px: `0.35rem` vertical padding on `0.75rem`/1.4 text. The bare line box is 16.8px and would miss WCAG 2.5.8's 24px floor. Vertical padding only — the horizontal separation is the list's `--s-2` gap, and side padding would push the first link off the shell's left edge.
- Do not add items. Do not re-centre them. Do not put a ground back behind them without first deciding the footer question below.

**Nothing is painted behind the links, so their contrast is whatever scrolls under them.** Measured, on `--ink-muted` at `0.75rem`, against §6's 4.5:1 floor:

| ground | `--ink-muted` | `--ink` |
|---|---|---|
| `--paper` — hero, work, about | 4.99 | 17.87 |
| `--paper-alt` — impact band | 4.65 | 16.65 |
| footer gradient at 55% | 4.34 | 15.52 |
| footer gradient at 80% | **1.67** | 5.96 |
| footer gradient at 100% | **1.31** | **2.73** |

Over the page proper this clears AA, though `--paper-alt` and the footer's top edge are thin. Over the bottom half of the footer the links effectively vanish, and `--ink` does not rescue them — nothing is legible on cobalt except `--paper`. This is a known and accepted cost of removing the enclosure. If it has to be solved, the two exits are a `--paper` link colour that swaps in over the footer, or restoring a ground behind the links. There is also a collision no contrast ratio describes: the links now pass directly over card borders and chapter text.

**Keyboard focus is a separate problem, and it is already solved — do not undo it.** The resting text above is a judgement call; a focus ring is not. Over the footer an `--accent` ring on cobalt is `--accent` on `--accent`: 1:1, completely invisible, a straight WCAG failure. No single ring colour survives the whole page — `--ink` is 2.73:1 on cobalt, `--paper` is 1:1 on `--paper`. So `.nav-link:focus-visible` paints its own ground: `background: var(--paper)` with `outline-offset: 0`, which puts the ring flush against `--paper` at 6.54:1 whatever is scrolling underneath. §6 keeps its `--accent` ring, and nothing paints unless a link has keyboard focus.

### 3.2 Hero

```
┌──────────────────────────────────────────────┐
│  [HOME]  PROJECTS  ABOUT                     │  fixed, no enclosure
│                                              │
│  DAVID PRIETO ZURITA                         │  display, tight
│  Senior Product Designer · Madrid            │  mono, muted
│                                              │
│  currently > [rotating line] ▮               │  the signature
│                                              │
│  See the work →                              │  single text link
│                                              │
│  ─────────────────────────────────────────   │
│  ● AVAILABLE FOR SENIOR PRODUCT ROLES        │  eyebrow, accent dot
└──────────────────────────────────────────────┘
```

- **No CV download link in the hero.** It lives in the About section only.
- Content constrained to `--shell`. Not `100vh` — let the work peek above the fold.
- Rotator: 4s hold, 400ms crossfade, `aria-live="off"` so it doesn't spam screen readers.
- `<noscript>`: line one renders statically. Also the default state in HTML, so it's visible before JS runs.
- Caret: CSS `@keyframes` blink, 1s `step-end`.
- Under `prefers-reduced-motion`: rotation stops on line one, caret stops blinking (stays solid).

### 3.3 Selected work

```
┌───────────────────────┐  ┌───────────────────────┐
│ [16:10 media slot]    │  │ [16:10 placeholder]   │
│ 01 · SACEM            │  │ 02 · Sacem Collab+    │
│ Rights management     │  │ Analytics platform    │
│ ───────────────────── │  │ ───────────────────── │
│ Read case study →     │  │ IN PROGRESS           │
└───────────────────────┘  └───────────────────────┘
```

- **Three cards: SACEM (live), Sacem Collab+ (WIP), Sanofi Connect (WIP).** The two WIP case study pages get built after v2 ships.
- **No metrics on the cards.** The numbers live in section 3.4 only, so they aren't diluted across two places.
- **Media slot must work empty today.** Build a fixed 16:10 container with `--paper-alt` fill and a mono placeholder label. Thumbnails and Cursorful navigation videos arrive later, so the container must accept, without any layout change:
  - `<img>` (webp + jpg fallback), or
  - `<video autoplay muted loop playsinline>` with a `poster`.
  - Under `prefers-reduced-motion`, video must not autoplay — show the poster.
- WIP cards: `--ink-muted` text, `IN PROGRESS` eyebrow, `cursor: default`, **not** an `<a>`. A dead link is worse than an honest label.
- **No `aria-disabled`** (this section asked for it until step 14). It is not an allowed attribute on `role=listitem`, which is what a `<li>` is, so axe flags it under `aria-allowed-attr` and it costs §6's "accessibility 100". It was also doing nothing: with no interactive element on the card there is nothing to disable, and `IN PROGRESS` is real text in the DOM, so the state already reaches everyone. Do not add it back.
- Live card: entire card is one `<a>`, no nested interactive elements. Hover: media scales `1.02`, border → `--accent`, 200ms ease.
- 2-up desktop (third card starts a second row, left-aligned — do not stretch it), 1-up below 768px.
- Numbering `01 / 02 / 03` is earned: the order is by significance and the reader uses it.

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

| Box | Figure | Label (always visible) | Disclosure (hover/focus) |
|---|---|---|---|
| 1 | €3.7M | avoided spend | Design decisions that removed cost before it was committed |
| 2 | 18% | drop-off reduction | Fewer people abandoning the transaction flow mid-way |
| 3 | 41% → 59% | weekly active users | Measured over the platform's core employee base |
| 4 | +130% | in-platform messaging | People actually talking to each other inside the product |

- The 4.2 → 2.5 min figure is deliberately **not** here — it already carries a rotator line. Don't duplicate it.
- Numerals `--font-display`, `--accent`. Labels `--ink-muted`, mono, small.
- **Disclosure must not be hover-only.** Each box is a `<button type="button">` with `aria-expanded`. Reveal on `:hover`, `:focus-visible`, and click/tap. Below 768px the disclosure text is **always visible** and the staircase flattens to a stacked 1-up list with no offset.
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
│  2024 —    │  Where I am now                  │
│            │  China remote, back in Madrid,   │
│            │  AI tooling, design events       │
└────────────┴─────────────────────────────────┘
```

**Section title:** "Design and tooling for B2B platforms, with AI where it truly helps"

Three named chapters. The titles carry the narrative; the year column carries the timeline. Together they close the 1997 → 2018 gap without needing a fourth entry — "The Beginning" reads as a deliberate framing device rather than a missing chapter.

#### Final copy

**`1997` — The Beginning**

> Born in 1997 in Marbella, on Spain's Mediterranean coast. Futsal took most of my afternoons; music took the rest — I've been chasing a good song since before I could talk. Design found me on internet forums, where I made signatures in Photoshop CS6 between long stretches of videogames. That was the hook.

**`2018–2020` — Where it all started**

> After graduating I learned graphic design, then UI, in Málaga — a coast kid finally in a real city. Madrid came next, and with it my first job, as a visual designer. In 2020 I was promoted to product designer and took two new client platforms from the first discovery call to launch, working with PMs and engineers.

**`2024 —` — Where I am now**

> Half a year working remotely from China taught me how design reads in a mobile-first, gamified, pro-AI culture. Back in Madrid — eight years and counting — I'm still leading those same two platforms six years on, studying the Google UX Design certificate, building AI tooling, and turning up at design events to meet people whose work I admire.

Word counts: 52 / 57 / 56. All inside the cap. Do not pad them.

#### Build rules

- Each chapter renders in this order: year marker (mono, large, muted, sticky) / chapter title (Inter Tight 600, `1.25rem`) / one paragraph (Inter Tight 400, capped at `--measure`).
- Chapter titles are `<h3>`. The section heading is the `<h2>`. Don't skip levels.
- Year markers are typed exactly as above, including the en dash in `2018–2020` and the trailing em dash in `2024 —`. They are text, not generated.
- **Every chapter carries its own image, one each, not one portrait for the section.** Square or 4:5; above the title on mobile, beside the text from 1024 up (768 does not fit — see the note below). Max 360px wide.
  - *This replaces the earlier single-portrait rule and the `--radius` and `--paper-alt` that came with it. Do not put them back.* The first image, `the-beginning.png`, is a **composited cut-out on a transparent ground**, not a photograph: the Sony Walkman, the football and the PlayStation deliberately break outside the photo's rectangle. A filled, rounded container frames precisely the parts that are meant to escape a frame, and a fixed `aspect-ratio` with `object-fit: cover` crops them off — at 4:5 it removed 183px from each side, which was the music and the videogames the copy is about.
  - **No cropping, and no `aspect-ratio` on the image.** Each `<img>` carries its real `width` and `height` attributes and is sized `width: 100%; height: auto`. The browser reserves the intrinsic ratio, so there is no layout shift, and square and 4:5 both fit without anything choosing what to lose.
  - Chapters two and three have no image yet. They keep a placeholder box — `aspect-ratio: 1 / 1`, `--paper-alt`, `--radius`, mono label — because an unfilled empty slot is an invisible one. The placeholder is deleted along with its markup when the real file lands; the real image never inherits its fill or its radius.
  - **Format: AVIF, with the PNG as a `<picture>` fallback.** The source PNG is 898 KB — 1.2 bytes per pixel, because PNG is a lossless compressor being handed a photograph. AVIF does alpha *and* photographs: the same 878 × 846 image at quality 85 is **121 KB**, an 87% saving, visually indistinguishable including the baked-in caption. `macOS sips` writes AVIF; it cannot write WebP (read-only in its format list), which is why this is not the more obvious WebP. Safari below 16.4 is the only engine that falls back to the PNG. Chapter images are below the fold, so they also carry `loading="lazy"` and `decoding="async"` and cost nothing on initial load.
  - Real `alt` text is required, and it must carry any text baked into the image — text in pixels is unreadable to assistive tech and cannot be resized (WCAG 1.4.5). `the-beginning.png` has *"Always passionate about music"* baked in, and its `alt` says so.
- **CV download link sits at the end of "Where I am now"**, not in the hero. Mono, accent on hover, with file type and size in the label.
- Reveal: `IntersectionObserver`, `threshold: 0.25`, adds `.is-visible` → opacity `0→1`, `translateY(16px)→0`, 500ms. Each chapter animates on its own entry, no stagger.
- **Fallback:** `.is-visible` is applied by default in CSS; JS removes it on load before observing. Fully readable without JS.
- Sticky year collapses to an inline label below 768px.

### 3.6 Get in touch — footer

```css
footer {
  background: linear-gradient(180deg,
    var(--paper) 0%,
    var(--accent-dim) 55%,
    var(--accent) 100%);
}
```

- Oversized mono headline sitting in the gradient: **"Let's talk."**
- Contact block: email, LinkedIn, Madrid, current status. Mono, one per line, generous leading. **No GitHub link** — removed at David's instruction; he does not publish there, so the row was a placeholder for something that is never coming. Do not add it back.
- **Formspree form stays — do not rebuild it.** Restyle only: bottom-border inputs, no boxes, mono labels, accent focus ring. Preserve the existing action URL and field names exactly.
- Two markup additions are allowed against "restyle only", both from step 14 and neither touching the action URL or the field names: `autocomplete="name"` and `autocomplete="email"` on the two inputs (WCAG 1.3.5, AA), and `class="eyebrow"` on the three labels so they take §1.3's mono label role rather than a duplicated type block.
- **"No boxes" describes the form at rest.** On `:focus-visible` every control in the footer paints `background: var(--paper)` with `outline-offset: 0`. That is not decoration: the submit button sits ~73% down the gradient at 1440 and ~76% at 375, where `--accent` is 2.6:1 against the ground and misses the 3:1 a focus indicator needs. Painting `--paper` under the ring puts a 6.54:1 edge on its inner side and holds at any depth the footer grows to — the ground is a gradient, so no fixed ring colour can be checked once and trusted. Same mechanism as the nav in §3.1.
- Text over the accent end must be `--paper`, never `--ink`. Verify `#FCFCFA` on `#1F3BFF` clears AA.
- Bottom bar: `© 2026 · Built by hand · Madrid`, caption size.

### 3.7 Case study — `work/<slug>/index.html`

The v1 SACEM page ported onto the v2 system. Everything below is the shape every future case study takes.

```
┌──────────────────────────────────────────────┐  full bleed
│              hero image                       │
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
- **Contents nav — one element, two jobs, no duplicated markup.** In the flow it is an ordinary "Contents" list under the page header, which is what it is on a phone and what it stays as with JS off. From **1200px** it becomes a fixed rail in the right gutter, vertically centred so it clears both the site nav at 48px and the progress hairline at 0. `casestudy.js` marks the current entry; the mark is a rule that grows from 40% to full width, not colour alone (WCAG 1.4.1).
  - 1200 is measured, not chosen: the gutter there is `(1200 − 820) / 2 = 190px` against a 140px rail plus `--s-4` of clearance, so it fits with 18px spare and only widens above.
- **Scroll progress:** a 2px `--accent` hairline fixed at the top. It is scaled (`transform: scaleX`), never resized — animating `width` forces layout on every scroll frame — and the paint is batched into a `requestAnimationFrame`. `aria-hidden`: it reports a fact the document already gives assistive tech, and a `progressbar` role would announce on every tick.
- **Site nav:** the same three bare links as §3.1, targets climbing `../../`. **Projects** is `is-active` and `aria-current="page"` on every case study.
- **Footer:** the §3.6 footer, unchanged — same markup, same Formspree action and field names.
- **`.kw`** — v1 marked phrases inside its prose. Carried over as an `--accent-dim` wash, not a colour swap: `--ink` on `--accent-dim` is 15.5:1, and recolouring the text would put a second meaning on the one colour §1.2 reserves for interaction. A wash also survives forced-colours mode, where a colour change vanishes.
- **Subheads inside a prose section (`.cs-sub`) are mono**, on §1.3's "mono is the display face" rule — the same call `.card-title` makes. The `<h4>`s inside Target Users are body face, because they are leads, not labels.
- **Images get `--shell`, wider than the reading column but not full bleed.** They are screenshots and they earn the extra width. The hero is the exception and runs edge to edge.
- **v1's closing "Other Projects" block is not ported.** Both its cards were placeholders pointing back at the same page, with thumbnails loaded from `dummyimage.com` — an external host, which §0 rules out. A link back to the work section replaces it until there is a second case study.
- **v1's two Final Outcome images do not exist in this repo** (`img/sacem/outcome-1.jpg`, `outcome-2.jpg` — the directory is absent). They are placeholder boxes carrying v1's captions, on the §3.5 rule: a placeholder is a box, the real image is not.

---

---

## 4. File structure

```
v2/
├── index.html
├── work/
│   └── sacem/index.html
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
│   │   └── casestudy.js      ← case-study pages only
│   ├── fonts/                ← geist-mono 400/500, inter-tight 400/600, syne 700
│   └── img/
└── design.md
```

- Four `<link>` tags in order on `index.html`. No `@import` — it blocks rendering.
- **A case study loads a fifth, `casestudy.css`, after `components.css`.** It is the only page-scoped sheet, and it exists so the index pays nothing for a page it never shows. It restates nothing: `.shell`, `.band-alt`, the section rhythm, `.eyebrow`, `.meta`, `.cv-button`, the nav and the footer all come from the four above.
- Likewise `casestudy.js` loads on case-study pages only, and the index's three scripts do not load on a case study.
- JS with `defer`. Each file a plain IIFE — no ES modules, so local `file://` preview works.
- **Every image on the site is a `<picture>`: an AVIF `<source>` with a JPEG or PNG `<img>` fallback.** §3.5 has the reasoning and the numbers. Everything below the fold carries `loading="lazy"` and `decoding="async"`; the one image above it — a case study's hero — carries `fetchpriority="high"` instead.

---

## 5. Build order

Each step independently reviewable. Stop after each and wait for review.

1. `tokens.css` + `base.css` — `@font-face` blocks, type scale, color, focus styles. Verify on a throwaway page.
2. `index.html` semantic skeleton — all five sections, real structure, zero styling. Confirm it reads top to bottom as a document with CSS disabled.
3. `layout.css` — grid, shell, section rhythm.
4. Nav bracket states.
5. Hero, static (no rotation).
6. `rotator.js` + caret.
7. Work cards, including empty media containers and WIP states.
8. Impact staircase, static values, disclosure working on hover **and** focus **and** tap.
9. `counters.js`.
10. About chapters, static, with photo slot.
11. `reveal.js`.
12. Footer gradient + Formspree restyle.
13. Responsive pass: 375 / 768 / 1024 / 1440.
14. Accessibility pass: tab order, focus visibility, contrast, reduced motion, `noscript`.
15. Performance pass: font subsetting, image compression, Lighthouse.

---

## 6. Acceptance criteria

- [ ] Renders complete and usable with JavaScript disabled.
- [ ] `prefers-reduced-motion: reduce` kills rotation, caret blink, count-up, reveals, and video autoplay. All content still visible.
- [ ] Every metric box disclosure reachable by keyboard and by tap, not hover alone.
- [ ] Visible focus state on every interactive element, using `--accent`.
- [ ] No paragraph exceeds `--measure`.
- [ ] No About chapter exceeds 60 words.
- [ ] Every metric matches the CV exactly.
- [ ] Work card media containers hold their 16:10 box while empty — no layout shift when assets arrive.
- [ ] Zero external network requests.
- [ ] Lighthouse: performance ≥ 95, accessibility 100.
- [ ] Total page weight under 800KB.
- [ ] Verified on the deployed `davidpzu.github.io/v2/` URL, not just locally.

---

## 7. Explicit non-goals

- No dark mode in v1.
- No page transition or scroll library. No Lenis, Locomotive, GSAP, Framer Motion.
- No cursor follower, no magnetic buttons, no scroll-jacking.
- No blog section.
- No CMS.
- No "Beyond the screen" or interests section — the rotator already carries the personal register, and a second pass at it would dilute both.

---

## 8. Notes for Claude Code

- **Stay inside `/v2`.** Never touch the repo root.
- Ask before deleting anything. The SACEM case study and the Formspree config are load-bearing.
- **Assets pending, containers built now:** the chapter two and chapter three images and all three work card thumbnails. Build fixed-ratio placeholders so nothing shifts when the real files arrive. Do not source, generate, or substitute images. Chapter one's image (`the-beginning.png`) has landed and is wired in; see §3.5 for why it takes no fill, no radius and no crop.
- When a behaviour is ambiguous, build the simpler version and flag it. Don't guess at complexity.
- If a CSS rule seems to need `!important`, the specificity is wrong. Fix the selector.
- Promotion is a manual step done by David, not by you: `rm index.html && rm -rf assets work && mv v2/* . && rmdir v2`, then remove the `noindex` tags. Rollback point is the `v1-live` tag.
