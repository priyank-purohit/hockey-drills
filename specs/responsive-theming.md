# Responsive & Theming

## Responsive
- [x] Works on phones (320px+), tablets, desktop
- [x] Toolbar wraps to multiple lines on small screens
- [x] Canvas auto-scales to fit available space (200:85 ratio)
- [x] Landscape mobile: canvas constrains to viewport height
- [x] 5% horizontal padding for mobile scroll
- [x] 3px canvas padding prevents border clipping
- [x] Tablet breakpoint (601-1024px): larger buttons, 32px swatches
- [x] Phone breakpoint (≤600px): hide toolbar labels/dividers, compact buttons/swatches
- [x] Phone: hide description and tags to maximize rink space
- [x] Compact mode (max-height <700px): aggressive size reduction for landscape
- [x] Fullscreen mode: rink expands to 95% width, hides all other UI, ESC to exit

## Theming
- [x] System preference (prefers-color-scheme) — default
- [x] Manual theme toggle: System → Light → Dark cycle
- [x] Theme choice persists in localStorage
- [x] Dark theme — dark backgrounds, light text
- [x] Light theme — white/light grey backgrounds
- [x] CSS variables for all theme tokens
- [x] `html[data-theme]` overrides for manual selection

## Typography
- [x] System sans-serif font stack
- [x] Bold player labels sized to circles
- [x] Larger title/description weight

## Future
- [ ] Custom accent colour picker
- [ ] High-contrast mode for projectors
