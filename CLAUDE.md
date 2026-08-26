# davidpzu.github.io

Spec for current work: `v2/design.md`. Read it before any task.

## Rules
- All work happens in `/v2`. Never create, modify, move, or delete
  anything outside it — the repo root is the live portfolio and it is
  linked from an active CV.
- Vanilla HTML/CSS/JS only. No framework, no build step, no npm,
  no CSS library.
- Relative asset paths only. Never root-relative (`/assets/...`).
- Follow the build order in design.md §5. One step at a time.
  Stop and wait for review after each step.
- Never invent content. Copy lives in §3.5. Anything missing gets a
  placeholder, not a guess.
- If a CSS rule seems to need `!important`, the selector is wrong.