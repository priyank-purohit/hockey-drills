# Hockey Drill Maker

Single self-contained HTML file (`index.html`) hosted on GitHub Pages.
https://priyank-purohit.github.io/hockey-drills/

## Tech Stack
- **Fabric.js 5.3.1** (CDN) — canvas engine
- **jsPDF 2.5.1** (CDN) — PDF export
- **qrcode-generator 1.4.4** (CDN) — QR codes for sharing
- **LZ-String 1.5.0** (CDN) — URL compression for share links
- Vanilla JS, no build step, no frameworks

## Architecture
- Everything in one HTML file: CSS + HTML + JS
- Data stored in browser localStorage (key: `hockey-drill-library`)
- Version 3 library format with semantic drill serialization
- Drill positions in logical coordinates (0-200 x 0-85), rendered by current code
- Style changes auto-apply to all saved drills on next load

## Key Patterns
- `drawDefaultRink()` — programmatic NHL-accurate rink with muted colors
- `serializeDrill()` / `renderDrill()` — semantic save/load (not Fabric.js JSON)
- `confirmAction(btnId, fn)` — double-tap confirm for all download actions
- Event delegation on `#library-list` and `#practice-drills-list` (not per-render listeners)
- `rinkRotated` flag + CSS rotation for mobile portrait
- `VIEW_CONFIGS` for half-rink/zone views with coordinate offsets

## Testing
- Playwright tests in `tests/` folder (gitignored)
- `tests/test-drill.mjs` — 7 editor tests
- `tests/test-library-full.mjs` — 25 library + practice plan + responsive tests
- Run: `node tests/test-drill.mjs && node tests/test-library-full.mjs`
- Requires: `npm install playwright && npx playwright install chromium`

## Specs
Feature specs with checkboxes in `specs/` folder.

## Commit Convention
- Commit message: description + `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
- Don't auto-commit — wait for user approval
- Push to `main` branch, auto-deploys to GitHub Pages

## Important Gotchas
- `savePracticePlan()` must NOT call `loadLibrary()` (overwrites in-memory plan data)
- Fullscreen CSS targets `.tags-section` not `.drill-tags`
- Net dimensions intentionally swapped (NET_HEIGHT for width) for portrait orientation
- `rinkRotated` uses CSS transform on Fabric.js container — pointer events still work
- All rink markings use muted colors (55% opacity) so drill objects stand out
