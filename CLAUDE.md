# davidpzu.github.io

Spec: `design.md`. Read it before any task — it carries the reasoning as
well as the rules, so read it before re-litigating anything.

`STATUS.md` was the build's handoff log. It is **deliberately untracked and
gitignored**: David keeps a local copy, and once the site moved to the repo
root it was being served at `davidpzu.github.io/STATUS.md`. If it is not in
your working copy, it is not missing — ask David rather than recreating it.

**v2 was promoted to the root on 2026-08-27.** There is no `/v2` directory
any more; the site at the root *is* v2. The old site is archived under
`/v1/`, `noindex`, and is not maintained.

## Rules
- **The root is the live site**, and it is linked from an active CV. There
  is no staging directory now, so a change to `index.html`, `work/`,
  `assets/`, `404.html` or the three root metadata files is a change to the
  live portfolio the moment it is pushed. Work carefully and verify on the
  deployed URL, not just locally.
- **Do not modify `/v1/`.** It is an archive of the previous site, kept
  browsable. Its images are already broken (its pages reference `img/...`
  while its files live in `assets/img/...`) — that predates the archive and
  is deliberately left as-is.
- Vanilla HTML/CSS/JS only. No framework, no build step, no npm,
  no CSS library.
- **Relative asset paths.** Never root-relative (`/assets/...`), with
  exactly two documented exceptions: the `og:`/`canonical` URLs in every
  `<head>` (§3.10) and every path in `404.html` (§3.11). Both are explained
  where they live; do not add a third without the same treatment.
- **Every image is a bare `<img>` at an AVIF.** No `<picture>`, no raster
  fallbacks. The single exception is `assets/img/social-card.png`, which
  must stay a PNG — no link-preview scraper reads AVIF (§4, §3.10).
- Never invent content. Copy lives in §3.5, and the case study copy is
  David's. Anything missing gets a placeholder, not a guess.
- **`work/thalesgu/`, `work/sacem-collab/` and `work/sconnect/` still carry
  SACEM's copy** under their own titles. They are `noindex`, unlinked from
  the work section, and absent from `sitemap.xml`. Do not link them until
  each has content of its own; §3.3 has the one-edit recipe for turning a
  `.card-wip` back into a link.
- **`sacem.html`, `about.html`, `projects.html` and `greenup-transaction.html`
  at the root are redirect stubs**, not pages — they cover v1's old URLs
  (§3.13). `greenup-transaction.html` points at the work section for now and
  should be repointed at `work/thalesgu/` once that case study is written.
- **`alt` text takes no em dashes and no closing full stop** — David's house
  style, applied site-wide. Reflow the sentence rather than deleting the
  punctuation and leaving it ungrammatical (§3.5).
- One step at a time. Stop and wait for review after each.
- If a CSS rule seems to need `!important`, the selector is wrong.
- **The index is at ~788 KB against §6's 800 KB budget.** Measure before
  adding anything to that page; do not estimate.
