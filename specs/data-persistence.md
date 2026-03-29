# Data & Persistence

## Semantic Serialization
- [x] Drill data stored as semantic items (type, position, colour, metadata)
- [x] Positions in logical coordinates (0-200 x 0-85)
- [x] Rendering always by current code — style updates apply to all saved drills
- [x] Version 2 item format for individual drills
- [x] Version 3 library format for full collection

## LocalStorage
- [x] Auto-save on every action
- [x] Library structure: categories, drills, active drill, practice plans, team name
- [x] Migration from v2 single-drill to v3 library format
- [x] No artificial limits on categories or drills

## Future
- [ ] Cloud sync (Firebase/Supabase) for cross-device access
- [ ] Account system for coaches
- [ ] Offline-first with service worker
- [ ] Auto-backup to file on a schedule
- [ ] Storage usage indicator with cleanup suggestions
