# Hockey Drill Maker

Single self-contained HTML file (`index.html`) + service worker (`sw.js`).
Hosted on GitHub Pages: https://priyank-purohit.github.io/hockey-drills/

# Tech Stack
- **Fabric.js 5.3.1** (CDN) — canvas engine
- **jsPDF 2.5.1** (CDN) — PDF export
- **qrcode-generator 1.4.4** (CDN) — QR codes for sharing
- **LZ-String 1.5.0** (CDN) — URL compression for share links
- **Service Worker** (`sw.js`) — offline-first caching
- Vanilla JS, no build step, no frameworks

## Architecture
- Everything in one HTML file: CSS + HTML + JS
- Data stored in browser localStorage (key: `hockey-drill-library`)
- Version 3 library format with semantic drill serialization
- Drill positions in logical coordinates (0-200 x 0-85), rendered by current code
- Style changes auto-apply to all saved drills on next load
- Lines support multi-segment waypoints (click to add, double-click to finish)

# Key Patterns
- `drawDefaultRink()` — programmatic NHL-accurate rink with muted colors (55% opacity)
- `serializeDrill()` / `renderDrill()` — semantic save/load (not Fabric.js JSON)
- `createLine(type, points, colour, thickness)` — points is an array of {x,y} logical coords
- `confirmAction(btnId, fn)` — double-tap confirm for all download actions
- Event delegation on `#library-list` and `#practice-drills-list` (not per-render listeners)
- `rinkRotated` flag + CSS rotation for mobile portrait
- `VIEW_CONFIGS` for half-rink/zone views with coordinate offsets
- `lineJustFinished` flag prevents dblclick-to-delete after finishing a line

# Commit Convention
- Commit message: description + `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
- Don't auto-commit — wait for user approval
- Push to `main` branch, auto-deploys to GitHub Pages
- When committing, update the last updated date that is hardcoded.
- When committing, be sure to update the specs directory to reflect the new set of features implemented in the app.

## Important Gotchas
- `savePracticePlan()` must NOT call `loadLibrary()` (overwrites in-memory plan data)
- Fullscreen CSS targets `.tags-section` not `.drill-tags`
- Net dimensions intentionally swapped (NET_HEIGHT for width) for portrait orientation
- `rinkRotated` uses CSS transform on Fabric.js container — pointer events still work
- `lineJustFinished` prevents dblclick-to-delete from firing right after finishing a multi-segment line
- Background image loaded via URL (not file upload) — uses crossOrigin: 'anonymous'
- Service worker caches HTML (network-first) and CDN assets (cache-first)

# Testing
- Playwright tests in `tests/` folder (gitignored, not deployed)
- `tests/test-editor.mjs` — 11 editor tests
- `tests/test-library.mjs` — 10 library tests
- `tests/test-practice.mjs` — 11 practice plan tests
- Run all: `node tests/test-editor.mjs && node tests/test-library.mjs && node tests/test-practice.mjs`
- Requires: `npm install playwright && npx playwright install chromium`

# Specs
Feature specs with checkboxes in `specs/` folder.

## Help docs
- When you build a feature that is not obvious, include a section in the help docs for it.

