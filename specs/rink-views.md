# Rink & Views

## Rink Drawing
- [x] Programmatic default rink — thin border (1.2 units), large rounded corners (28 units), 3px canvas padding
- [x] NHL-accurate line positions: blue lines at 75/125, goal lines at 11/189, center at 100
- [x] Goal lines shortened with circular inset to stay within rounded corners
- [x] Border frame rendered on top to clip any corner overflow
- [x] Center circle and center dot (radius 15, matching face-off circles)
- [x] Face-off circles in end zones (4, radius 15) with center dots
- [x] Neutral zone face-off dots (4, no circles)
- [x] D-shaped goal creases (semicircles on goal lines)
- [x] All rink markings muted to 55% opacity so drill objects stand out
- [x] Background image upload
- [x] Configurable background URL
- [x] Rink elements non-selectable and non-interactive

## Zone Views
- [x] Full rink view (200:85)
- [x] Left half view
- [x] Right half view
- [x] Neutral zone view
- [x] Drill data always in full-rink logical coords (0-200 x 0-85)
- [x] Objects outside current view preserved
- [x] PDF export uses current view aspect ratio

## Future
- [ ] Custom zone selection (drag to define viewport rectangle)
- [ ] Remember last-used view per drill
- [ ] Smooth animated transition between views
- [ ] Goalie-specific crease detail view
