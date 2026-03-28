# Hockey Drill Library — Feature Spec

## Overview

Add a drill library to the existing Hockey Drill Maker, allowing coaches to organize drills into tagged categories. Everything stays client-side (LocalStorage). The app remains a single self-contained HTML file.

---

## Navigation

### Two-Tab Layout

- Two tabs at the top of the app: **Editor** and **Library**
- **Editor tab** is the default landing tab (same as today's experience)
- Coach can switch between tabs freely
- Selecting a drill from the Library tab auto-switches to the Editor tab with that drill loaded

### Tab Behavior

- **Editor tab:** The current drill editor (rink, toolbar, title, description — everything that exists today)
- **Library tab:** A browsable, searchable collection of all saved drills organized by categories

---

## Library View

### Layout

- Search bar at the top to filter drills by name
- Categories displayed as collapsible sections, sorted by **last modified date** (most recent first)
- Each category shows its drill count
- Drills within each category are also sorted by **last modified date** (most recent first)

### Category Management

- **Create category:** Button or inline input to create a new category
- **Rename category:** Inline edit on category name
- **Delete category:** Removes the category tag from all drills in it. Drills are NOT deleted (they become uncategorized). Double-tap confirmation like Reset.

### Drill Cards

Each drill in the library shows:
- Drill title
- Description (truncated to 2 lines)
- Category tags (as small chips/badges)
- Last modified date
- Thumbnail preview of the rink (optional — can be deferred to future)

### Drill Actions (from Library)

- **Open** — load drill into the Editor tab (auto-switches to Editor)
- **Duplicate** — create a copy of the drill
- **Delete** — remove drill from library. Double-tap confirmation.
- **Export** — download individual drill as JSON

### Uncategorized Drills

- Drills without any category tags appear in an "Uncategorized" section at the bottom
- The "Uncategorized" section cannot be renamed or deleted

---

## Categorization

### Tag-Based (Multiple Categories)

- A drill can belong to **multiple categories** (tag model, not folder model)
- When editing a drill, coach can add/remove category tags
- Categories are created on-the-fly when typing a new tag name
- Example: A drill tagged "Skating" and "Warmup" appears in both category sections in the Library

### Tag UI in Editor

- Below the drill title/description, show current tags as removable chips
- "Add tag" input with autocomplete from existing category names
- Creating a new tag name creates the category automatically

---

## Save Behavior

### Auto-Save to Library

- Every drill is automatically saved to the library as the coach works
- Changes auto-save on each action (same as today's LocalStorage auto-save, but now saving to the library data structure)
- No explicit "Save to Library" button needed
- The current single-drill auto-save is replaced by the library-aware save

### New Drill

- "New Drill" button in the Editor tab (and optionally in the Library tab)
- Creates a blank drill with empty title, description, and no tags
- Auto-saves to library immediately (appears as "Untitled Drill" in Uncategorized)

### Current Drill Indicator

- The Editor tab shows which drill is currently being edited (e.g. drill title in the tab or a breadcrumb)
- If the coach switches to a different drill, the current drill is already saved (auto-save)

---

## Data Model

### LocalStorage Structure

All library data stored under a single LocalStorage key:

```json
{
  "version": 3,
  "categories": ["Skating", "Passing", "Warmup", "Power Play"],
  "drills": [
    {
      "id": "uuid-1",
      "title": "Full Ice Skating",
      "description": "Players skate full length...",
      "tags": ["Skating", "Warmup"],
      "backgroundUrl": null,
      "items": [
        { "kind": "line", "lineType": "skate", ... },
        { "kind": "object", "objectType": "forward", ... }
      ],
      "createdAt": "2026-03-28T10:00:00Z",
      "modifiedAt": "2026-03-28T12:30:00Z"
    }
  ],
  "activeDrillId": "uuid-1"
}
```

### Semantic Serialization (Preserved)

- Each drill's `items` array uses the existing version 2 semantic format
- Positions in logical coordinates (0–200 x 0–85)
- Rendering always done by current code (style updates apply to all drills)

---

## Export & Import

### Individual Drill

- **Export drill JSON** — same as today, downloads one drill
- **Import drill JSON** — loads a drill into the library (adds it, doesn't replace)

### Full Library

- **Export library** — downloads entire library as one JSON file (all categories + all drills)
- **Import library** — loads a library JSON file. Options:
  - **Merge** — adds imported drills/categories to existing library (skips duplicates by ID)
  - **Replace** — overwrites the entire library with the imported data (double-tap confirmation)

---

## Migration

### Backward Compatibility

- On first load, if old version 2 single-drill data exists in LocalStorage, auto-migrate it:
  - Create a library with one drill (the existing drill)
  - Place it in "Uncategorized"
  - Preserve title, description, and all items
- If no existing data, start with an empty library and a blank drill in the Editor

---

## No Limits

- No artificial limits on number of categories or drills
- LocalStorage has a ~5–10MB browser limit; if storage is full, show a warning and suggest exporting/cleaning up

---

## Future Iterations (Not Built Now)

- **Drill thumbnail previews** in library cards
- **Drag-and-drop reordering** of drills within the library
- **Print multiple drills** as a practice plan PDF
- **Share drill via link** (would require cloud storage)
- **Drill templates** — pre-built drills coaches can start from
