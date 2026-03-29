# Core Editor

## Lines
- [x] Skating line — solid + arrow
- [x] Skating with puck — squiggly + arrow
- [x] Passing line — short dashed + arrow
- [x] Shooting line — long dashed + arrow
- [x] Lines end at arrow base (no overlap)
- [x] Click-to-start, click-to-end mechanic
- [x] Preview line follows cursor between clicks

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

## Actions
- [x] Reset — double-tap confirmation, clears canvas and redraws rink
- [x] ESC key deselects all tools
- [x] Undo/redo — state snapshots, max 50 depth
- [x] Cmd/Ctrl+Z undo, Cmd/Ctrl+Y redo

## Future
- [ ] Curved/bezier lines
- [ ] Snap-to-grid for precise alignment
- [ ] Multi-select (shift+click) to move/delete several objects
- [ ] Visual alignment guides when objects line up
