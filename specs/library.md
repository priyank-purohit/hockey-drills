# Drill Library

## Navigation
- [x] Two-tab UI — Editor (default) and Library
- [x] Clicking drill in Library auto-switches to Editor
- [x] Breadcrumb shows active drill title

## Library View
- [x] Search bar filters drills by name/description/tags
- [x] Collapsible category sections sorted by last modified
- [x] Drill count badges per category
- [x] Drill cards — title, description (truncated), tags, relative date
- [x] Drill thumbnail previews (static rink snapshots, cached, lazy-rendered)
- [x] Actions per drill — Open, Duplicate, Delete, Export JSON (all with confirm)
- [x] Uncategorized section for untagged drills
- [x] New Category button, inline rename (double-click), delete

## Tags & Categories
- [x] Tag-based categorization (drills can belong to multiple)
- [x] Tag chips in Editor with remove (x) button
- [x] Add tag input with autocomplete from existing categories
- [x] New tags auto-create categories

## Data Model
- [x] Version 3 localStorage structure
- [x] UUID-based drill IDs
- [x] Created/modified timestamps
- [x] Auto-save to library on every action
- [x] New Drill button
- [x] Migration from v2 single-drill format
- [x] Default sample drill ("Game warm up") for new users
- [x] Favourite/star drills via "Favourite" tag toggle
- [x] Share drill from library card without loading (QR + URL)

## Export/Import
- [x] Full library export as one JSON file (with confirm)
- [x] Library import — merge or replace
- [x] Individual drill JSON export (with confirm)
- [x] Individual drill JSON import adds to library
- [x] Print Cards — 1/2/4 per page, team name header, page numbers

## Future
- [ ] Drag-and-drop reordering of drills
- [ ] Drill templates — pre-built starter drills
- [ ] Bulk select and delete/export drills
