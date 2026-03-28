# Hockey Drill Maker — Build Spec

## Build Instructions

Build a fully functional ice hockey drill drawing tool as a **single self-contained HTML file**. Use Fabric.js (v5+) from CDN for the canvas engine and jsPDF from CDN for PDF export. All CSS, JS, and HTML must be in one file. No build step. No frameworks — vanilla JS only.

The tool should allow coaches to place hockey objects (players, pucks, nets, and cones), draw lines representing skating/passing/shooting, and export the result as JSON or PDF.

Hosted on GitHub Pages: **https://priyank-purohit.github.io/hockey-drills/**

---

## UI Layout

### Canvas / Rink Sizing

- Canvas logical size: **200 x 85 px** (ratio) — scales to fit available width
- Canvas includes 3px padding around the rink to prevent border clipping
- In landscape mobile, canvas height-constrains to fit the viewport
- App has 5% horizontal padding on each side for mobile touch scrolling
- Above the canvas is a toolbar row

### Overall Layout

- **Top Bar:** All tools and objects in a horizontal bar above the canvas (wraps on mobile)
- MUI-style design with system-preference dark/light theming

### Drill Name & Description

- [x] **Title** — text field at the very top of the top bar
- [x] **Description** — text field below the title

### Tool Palette

In the top bar, coaches can pick a tool or object, and a colour override.

#### Lines

- [x] **Skating line** — straight line with 1 arrow. Default colour: black
- [x] **Skating with puck line** — squiggly line with 1 arrow (same click-to-start, click-to-end mechanic as straight lines — rendered as a sine-wave/zigzag shape). Default colour: black
- [x] **Passing line** — short dashed line with 1 arrow. Default colour: black
- [x] **Shooting line** — longer dashed line with 1 arrow. Default colour: black

All lines are straight only (no curved/bezier paths). Lines end at the arrow base (no overlap between line stroke and arrowhead).

#### Players

- [x] **Forwards** — circle with label `F#` in the center (stroke: 0.6x base). Default colour: red
- [x] **Defensemen** — circle with label `D#` in the center (stroke: 0.8x base). Default colour: red
- [x] **Goalies** — circle with label `G#` in the center (stroke: 1.0x base). Default colour: red

> **Indexing rules:** Index auto-increments starting at 1. Deleting a player does NOT re-index existing players. The next player added fills the lowest available index (e.g., if F1 and F3 exist and F2 was deleted, the next forward is F2). Objects cannot be edited or moved after placement — delete and re-add instead.

#### Equipment

- [x] **Hockey net** — rectangle outline (1/3 rink border thickness) with grey fill and cross-hatch lines. Oriented tall (height > width). Default colour: red
- [x] **Pylon** — bright orange equilateral triangle. Default colour: orange
- [x] **Single puck** — small black circle. Default colour: black
- [x] **Multiple pucks** — group of 5 small black circles in pyramid layout (3 bottom, 2 top) with 2-3px spacing. Default colour: black

#### Object Sizing

All sizes are proportional to the 200:85 rink ratio, relative to the hockey net:

| Object              | Size relative to net |
|---------------------|----------------------|
| Player circles      | 2/3                  |
| Pylons              | 2/3                  |
| Pucks               | 1/3                  |

#### Colours

- [x] Available colours: red, blue, green, yellow, orange, black, purple, teal

All tools have a default colour (stored as a constant for easy customization). Coaches can override the colour before placing an object/tool/line on the rink.

### Actions & Shortcuts

- [x] **Reset button** in the top bar — clears all objects and lines from the canvas. Uses double-tap confirmation (first tap shows "⚠ Confirm?", second tap within 3 seconds executes reset, auto-cancels otherwise). No confirmation for individual object/line deletes (coaches use undo/redo).
- [x] **ESC key** deselects all tools (returns to idle/no-tool-selected state)

---

## Responsive Strategy & Touch Interactions

- [x] **Fully responsive** — works on phones (320px+), tablets, and desktop
- [x] On mobile (320px+), the top bar tool palette wraps to multiple lines
- [x] In landscape mobile, canvas constrains to available viewport height so toolbar + rink fit without scrolling
- [x] 5% horizontal padding on each side for mobile touch scrolling
- [x] Touch/click to start a line, touch/click again to end
- [x] Tap/click to place objects
- [x] Long-press to delete objects (double-click on desktop)
- [x] No zoom in/out needed
- [x] Canvas auto-scales to fit available space (maintaining 200:85 aspect ratio)

---

## Rink Background

### Background Image

- [x] Background image sits at the **lowest z-index** (below all objects and lines)
- [x] A URL to the background image can be configured (`CONFIG.BACKGROUND_URL`)
- [x] Background image URL persists in JSON export/import
- [x] User can upload a replacement background image via toolbar button

### Default Rink (programmatically drawn, used when no image URL provided)

- Thick black border around the full rink (rounded corners, 3px canvas padding to prevent clipping)
- Center red line (vertical, splitting rink in half)
- Two blue lines (vertical, at 1/3 and 2/3)
- Center circle and center dot (blue)
- White/ice-colored fill background (`#f0f4f8`)

### Z-Order

- [x] Rink background elements are non-selectable and non-interactive
- [x] Objects render above rink background but below UI
- [x] No line snapping to objects — lines are free-floating

---

## Undo / Redo

- [x] Semantic state snapshot on each action (stores drill data, not Fabric.js objects)
- [x] Configurable history depth (default: 50 states)
- [x] Undo/redo buttons in UI
- [x] Keyboard shortcut support (`Cmd/Ctrl+Z` and `Cmd/Ctrl+Y` / `Cmd/Ctrl+Shift+Z`)

---

## Semantic Serialization

All persistence uses **semantic data** — only the type, position, colour, and metadata of each drill element is stored. Rendering is always done by current code. This means:

- Updating line styles, object appearance, or sizing in the code automatically applies to all saved drills on next load
- Positions stored in logical coordinates (0–200 x 0–85), independent of screen size
- JSON format (version 2):

```json
{
  "version": 2,
  "title": "...",
  "description": "...",
  "backgroundUrl": null,
  "items": [
    { "kind": "line", "lineType": "skate", "startX": 10, "startY": 42, "endX": 190, "endY": 42, "colour": "#212121" },
    { "kind": "object", "objectType": "forward", "x": 30, "y": 42, "colour": "#d32f2f", "index": 1 }
  ]
}
```

---

## Export & Import

### Export

- [x] **PDF export** — canvas image + drill name + footer text, auto-downloads. Landscape A4 orientation matching rink aspect ratio.
- [x] **JSON export** — save semantic drill state as JSON for reload later

### Import

- [x] **JSON import** — load previously saved JSON state, re-rendered with current styles

### PDF Options

- [x] Include drill name/description text
- [x] Include watermark/footer text (configurable via `CONFIG.PDF_WATERMARK`)
- [x] Landscape orientation matching rink aspect ratio

---

## Persistence

- [x] **LocalStorage auto-save** — semantic drill state saved to browser on every action, restored on reload
- [x] **Manual save/load** — JSON export/import buttons

---

## Typography

Font stack:

```
system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

- Player labels (F1, D2, etc.) are **bold** and sized to fit legibly inside their circles
- Title and description fields use a slightly larger weight/size to stand out from the toolbar

---

## Theming / Visual Style

- [x] System preference (follows OS dark/light mode via `prefers-color-scheme`)
- CSS variables for all theme tokens (background, surface, text, borders, etc.)

---

## Future Iterations

The following features are intentionally deferred and should NOT be built now, but the code should be structured to accommodate them later:

- **Select/Move tool** — allow coaches to select and reposition objects after placement (currently: delete and re-add)
- **Object rotation** — allow rotation of placed objects (especially nets)
- **Z-order controls** — bring-to-front / send-to-back for overlapping objects
- **Curved/bezier lines** — non-straight line paths between two points
- **Edit placed objects** — change color or label of objects already on the canvas
