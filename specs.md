# Hockey Drill Maker — Build Spec & Prompt

## Build Instructions

Build a fully functional ice hockey drill drawing tool as a **single self-contained HTML file**. Use Fabric.js (v5+) from CDN for the canvas engine and jsPDF from CDN for PDF export. All CSS, JS, and HTML must be in one file. No build step. No frameworks — vanilla JS only.

The tool should allow coaches to place hockey objects (players, pucks, nets, and cones), draw lines representing skating/passing/shooting, and export the result as JSON or PDF.

---

## UI Layout

### Canvas / Rink Sizing `[CONFIGURE]`

- Canvas logical size: **200 x 85 px** (ratio) — scale to fit available width
- Above the canvas is a row of tools

### Overall Layout `[CONFIGURE]`

- **Top Bar:** All tools and objects in a horizontal bar above the canvas

### Drill Name & Description `[CONFIGURE]`

- [ ] **Title** — text field at the very top of the top bar
- [ ] **Description** — text field below the title

### Tool Palette

In the top bar, coaches can pick a tool or object, and a colour override.

#### Lines

- [ ] **Skating line** — straight line with 1 arrow. Default colour: black
- [ ] **Skating with puck line** — squiggly line with 1 arrow (same click-to-start, click-to-end mechanic as straight lines — rendered as a sine-wave/zigzag shape instead of a straight stroke). Default colour: black
- [ ] **Passing line** — dashed line with 1 arrow. Default colour: black
- [ ] **Shooting line** — longer dashed line with 1 arrow. Default colour: black

#### Players

- [ ] **Forwards** — circle with label `F#` in the center, where `#` is an auto-incrementing index starting at 1 (F1, F2, F3…). Default colour: red
- [ ] **Defensemen** — circle with label `D#` in the center, where `#` is an auto-incrementing index starting at 1 (D1, D2, D3…). Default colour: red
- [ ] **Goalies** — circle with label `G#` in the center, where `#` is an auto-incrementing index starting at 1 (G1, G2…). Default colour: red

> **Indexing rules:** Deleting a player does NOT re-index existing players. The next player added fills the lowest available index (e.g., if F1 and F3 exist and F2 was deleted, the next forward is F2). Objects cannot be edited or moved after placement — delete and re-add instead.

#### Equipment

- [ ] **Hockey net** — simple rectangle outline (1/3 the thickness of the rink border) with grey fill. Bigger than player circles. Default colour: red
- [ ] **Pylon** — bright orange equilateral triangle. Default colour: orange
- [ ] **Single puck** — small black circle. Default colour: black
- [ ] **Multiple pucks** — group of 5 small black circles. Default colour: black

#### Object Sizing

All sizes are proportional to the 200:85 rink ratio, relative to the hockey net:

| Object              | Size relative to net |
|---------------------|----------------------|
| Player circles      | 2/3                  |
| Pylons              | 2/3                  |
| Pucks               | 1/3                  |

#### Colours

- [ ] Available colours: red, blue, green, yellow, orange, black, purple, teal

All tools have a default colour (stored as a constant for easy customization). Coaches can override the colour before placing an object/tool/line on the rink.

### Actions & Shortcuts

- [ ] **Reset button** in the top bar — clears all objects and lines from the canvas. Shows a confirmation dialog before clearing. Deleting individual objects/lines does NOT require confirmation (coaches can use undo/redo).
- [ ] **ESC key** deselects all tools (returns to idle/no-tool-selected state)

---

## Responsive Strategy & Touch Interactions

- [ ] **Fully responsive** — works on phones (320px+), tablets, and desktop
- [ ] On mobile (320px+), the top bar tool palette wraps to multiple lines. The rink is 320px wide, leaving plenty of vertical screen real estate for the multi-line toolbar above it.
- [ ] Touch/click to start a line, touch/click again to end
- [ ] Tap/click to place objects
- [ ] Long-press to delete objects (double-click on desktop)
- [ ] No zoom in/out needed
- [ ] Canvas auto-scales to fit available space (maintaining 200:85 aspect ratio)
- [ ] All lines are straight only (no curved/bezier paths)

---

## Rink Background

### Background Image

- Background image sits at the **lowest z-index** (below all objects and lines)
- A URL to the background image will be provided (configurable)
- Background image URL persists in JSON export/import
- Allow user to upload a replacement background image

### Default Rink (programmatically drawn, used when no image URL provided)

- Thick black border around the full rink (rounded corners for rink shape)
- Center red line (vertical, splitting rink in half)
- Two blue lines (vertical, evenly spaced between center and each end)
- White/ice-colored fill background

### Z-Order

- [ ] Objects render above rink background but below UI
- [ ] No line snapping to objects — lines are free-floating

---

## Undo / Redo

- [ ] Full canvas state snapshot on each action
- [ ] Configurable history depth (default: 50 states)
- [ ] Undo/redo buttons in UI
- [ ] Keyboard shortcut support (`Cmd/Ctrl+Z` and `Cmd/Ctrl+Y`)

---

## Export & Import

### Export

- [ ] **PDF export** — canvas image + drill name + footer text, auto-downloads
- [ ] **JSON export** — save canvas state as JSON for reload later

### Import

- [ ] **JSON import** — load previously saved JSON state

### PDF Options

- [ ] Include drill name/description text
- [ ] Include watermark/footer text (configurable — text content stored as a constant/config option)
- [ ] Landscape orientation matching rink aspect ratio

---

## Persistence

- [ ] **LocalStorage auto-save** — canvas state saved to browser, restored on reload
- [ ] **Manual save/load** — JSON export/import buttons

---

## Typography

Use a clean, modern sans-serif font stack suitable for a sports/coaching tool:

```
system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

- Player labels (F1, D2, etc.) should be **bold** and sized to fit legibly inside their circles
- Title and description fields should use a slightly larger weight/size to stand out from the toolbar

---

## Theming / Visual Style `[CONFIGURE]`

- [ ] Dark theme (dark backgrounds, light text)
- [ ] Light theme (white/light grey backgrounds)
- [ ] System preference (follow OS dark/light mode)

---

## Future Iterations

The following features are intentionally deferred and should NOT be built now, but the code should be structured to accommodate them later:

- **Select/Move tool** — allow coaches to select and reposition objects after placement (currently: delete and re-add)
- **Object rotation** — allow rotation of placed objects (especially nets)
- **Z-order controls** — bring-to-front / send-to-back for overlapping objects
- **Curved/bezier lines** — non-straight line paths between two points
- **Edit placed objects** — change color or label of objects already on the canvas
