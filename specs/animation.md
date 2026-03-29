# Animation Playback

## Implemented
- [x] Play button — animates lines sequentially
- [x] Type-specific animations:
  - Skating: red player circle moves from start to end
  - Puck carry: red player circle + puck in FRONT move together
  - Passing: player stays at start, puck flies to end
  - Shooting: player stays at start, red puck flies faster (500ms vs 800ms)
  - Freehand: dot traces the actual freehand path
- [x] Multi-segment line tracing — dot follows waypoint path via interpolation
- [x] Ghost trail — faded line follows movement during animation
- [x] Speed control — 1/3 Speed, 2/3 Speed, Full Speed selector
- [x] Objects appear instantly at start
- [x] Stop button halts and restores full drill
- [x] Step-through mode — advance one line at a time
- [x] Loop toggle — continuous replay
- [x] Canvas interactions disabled during playback
- [x] 200ms pause between lines

## Future
- [ ] Pause/resume (not just stop)
- [ ] Animate player objects moving along connected lines
- [ ] Numbered step indicators on the rink
- [ ] Export animation as GIF or video
