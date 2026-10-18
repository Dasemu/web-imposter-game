# Impostor Game (offline)

## What is it?
Role-based impostor-style game for mobile, 100% in the browser with no backend. Uses localStorage so a reload doesn't lose the match. Features **impostor-specific words** for each civilian word to make the game more challenging! 22 word-pool categories are available, and you can select several at once.

## Structure
- `www/index.html`: main UI.
- `www/styles.css`: mobile-first, no-scroll optimized styles.
- `www/script.js`: game logic (roles, timers, voting, tiebreaks, word pools with impostor variants).
- `www/word-pools/`: 22 word pools in `.txt` + `manifest.json`.
- `android/`: Capacitor-generated Android project.

See `docs/game-rules.md` for the full rules and word-pool format, and `docs/release.md` for how builds and releases work.

## How to run (offline)
Use any static file server so `fetch` can read the `.txt` files (needed if opening via `file://`). Example with Python:

```bash
git clone https://git.dariosevilla.es/dasemu/web-imposter-game
cd web-imposter-game
python -m http.server 8000
```

Open in browser: `http://localhost:8000`

For Android, see `docs/release.md`.

