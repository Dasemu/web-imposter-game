# Impostor Game (offline)

## What is it?
Role-based impostor-style game for mobile, 100% in the browser with no backend. Uses localStorage so a reload doesn’t lose the match.

## Structure
- `index.html`: main UI.
- `styles.css`: mobile-first styles.
- `script.js`: game logic (roles, timers, voting, tiebreaks, word pools).
- `word-pools/`: word pools in `.txt` + `manifest.json`.

## Available pools
- Animals & Nature (🌿) — `animales_naturaleza.txt`
- Daily Life (🏠) — `vida_cotidiana.txt`
- Sports (🏅) — `deportes.txt`
- Brands (🛍️) — `marcas.txt`
- Music (🎵) — `musica.txt`
- Characters (🧙) — `personajes.txt`

`.txt` format: optional first line header `# emoji Name`; the rest is one word/term per line.

## Key rules
- Defaults: up to 10 players; impostors by player count (<=5 →1, 6-7 →2, >7 →3) and never more than half.
- Time defaults: 5 min with 4 or fewer players, up to 15 min with 10; deliberation = 1/3 (rounded).
- No self-voting. Max executions = number of impostors.
- Tie on execution slots: 1 extra minute of deliberation and a new vote only among tied players; if tie persists, impostors win.
- Starting player and direction (clockwise/counter-clockwise) are random.

## How to run (offline)
Use any static file server so `fetch` can read the `.txt` files (needed if opening via `file://`). Example with Python:

```bash
git clone https://git.dariosevilla.es/dasemu/web-imposter-game
cd web-imposter-game
python -m http.server 8000
```

Open in browser: `http://localhost:8000`

## Add new pools
1) Create a `.txt` in `word-pools/` with optional header and one word per line.
2) Add an entry in `word-pools/manifest.json` with `id`, `name`, `emoji`.
3) (Optional) add an embedded version in `script.js` if you want it available without the files.

## Notes
- State is saved in `localStorage` (`impostorGameStateV2`). Use “New match” to clear it.
- Mobile friendly: reveal via swipe or tap; adaptive UI.
