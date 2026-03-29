# Animation Playback

## Implemented
- [x] Play button — animates lines sequentially
- [x] Type-specific animations:
  - Skating: player (hollow circle) moves from start to end
  - Puck carry: player moves + small puck trails behind
  - Passing: player stays at start, puck flies to end
  - Shooting: player stays at start, puck flies faster (500ms vs 800ms)
- [x] Ghost trail — faded line follows movement during animation
- [x] Objects appear instantly at start
- [x] Stop button halts and restores full drill
- [x] Step-through mode — advance one line at a time
- [x] Loop toggle — continuous replay
- [x] Canvas interactions disabled during playback
- [x] 200ms pause between lines

## Future
- [ ] Speed control (0.5x, 1x, 2x)
- [ ] Pause/resume (not just stop)
- [ ] Animate player objects moving along connected lines
- [ ] Numbered step indicators on the rink
- [ ] Export animation as GIF or video
