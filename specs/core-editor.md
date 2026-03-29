# Core Editor

## Lines
- [x] Skating line — solid + arrow
- [x] Skating with puck — squiggly + arrow
- [x] Passing line — short dashed + arrow
- [x] Shooting line — long dashed + arrow
- [x] Multi-segment lines — click waypoints, double-click to finish
- [x] Lines end at arrow base (no overlap), arrow on last segment
- [x] Preview segments follow cursor between clicks
- [x] Line thickness picker — thin / medium / thick
- [x] Freehand drawing mode (Fabric.js drawing mode)
- [x] Freehand paths serialize as logical coordinates

## Players
- [x] Forwards (F#) — auto-index, stroke 0.6x
- [x] Defensemen (D#) — auto-index, stroke 0.8x
- [x] Goalies (G#) — auto-index, stroke 1.0x
- [x] Next index fills lowest available gap
- [x] Bold labels sized to fit inside circles

## Equipment
- [x] Hockey net — rectangle outline, grey fill, cross-hatch
- [x] Pylon — equilateral triangle
- [x] Single puck — small circle
- [x] Multiple pucks — pyramid layout (3+2), 2-3px spacing

## Colours
- [x] 8 colour swatches: red, blue, green, yellow, orange, black, purple, teal
- [x] Per-tool default colours (stored as constants)
- [x] Override colour before placing
- [x] Colour picker blocked when no tool is active

## Actions
- [x] Reset — double-tap confirmation, clears canvas and redraws rink
- [x] ESC key deselects all tools / exits fullscreen
- [x] Undo/redo — state snapshots, max 50 depth
- [x] Cmd/Ctrl+Z undo, Cmd/Ctrl+Y redo
- [x] ? key toggles keyboard shortcuts panel
- [x] beforeunload warning when drill has items on canvas
- [x] PNG export with double-tap confirm
- [x] JSON export (separate from Save) with double-tap confirm
- [x] Save = browser localStorage save (no file download)
- [x] Fullscreen mode — rink expands to 95% width
- [x] 2-step colour picker (click button → dropdown grid)
- [x] Player circles have opaque white background for legibility
- [x] Net mesh grid pattern (2x2 grid instead of cross-hatch)
- [x] 3 pucks in triangle layout (was 5)
- [x] Toolbar: Row 1 (tools+colour+width+move), Row 2 (view+play | actions), Bottom (save+export+io)

## Future
- [ ] Curved/bezier lines
- [ ] Snap-to-grid for precise alignment
- [ ] Multi-select (shift+click) to move/delete several objects
- [ ] Copy/paste objects
