# Impostor Game (offline)

## What is it?
Role-based impostor-style game for mobile, 100% in the browser with no backend. Uses localStorage so a reload doesn't lose the match. Features **impostor-specific words** for each civilian word to make the game more challenging!

## Structure
- `index.html`: main UI.
- `styles.css`: mobile-first, no-scroll optimized styles.
- `script.js`: game logic (roles, timers, voting, tiebreaks, word pools with impostor variants).
- `word-pools/`: 22 word pools in `.txt` + `manifest.json`.

## Available pools (22 total)

### Local pools (work offline, embedded in code):
- 🌿 Animales y Naturaleza (88 words) — `animales_naturaleza.txt`
- 🏠 Objetos Cotidianos (99 words) — `objetos_cotidianos.txt`

### Remote pools (require internet connection):
- 🛍️ Marcas y Empresas (81 words)
- 💼 Profesiones y Trabajos (94 words)
- 🍕 Comida y Bebidas (145 words)
- 🌍 Lugares del Mundo (89 words)
- ⚽ Deportes (97 words)
- 🎬 Películas y Series (118 words)
- 📚 Escuela y Educación (114 words)
- 💻 Tecnología e Internet (63 words)
- 🚗 Vehículos y Transporte (97 words)
- 🎸 Instrumentos Musicales (106 words)
- 🎮 Videojuegos (128 words)
- 🎌 Personajes de Anime (133 words)
- 🏰 Personajes de Disney (133 words)
- 🎤 Artistas Latinos (116 words)
- 💎 Marcas de Lujo (108 words)
- 🦸 Personajes de Ficción (124 words)
- 🫀 Cuerpo Humano (129 words)
- 🏖️ Playa y Verano (69 words)
- 💕 Amor y Romance (98 words)
- 🎄 Navidad y Fiestas (88 words)

**New feature:** You can select **multiple pools** simultaneously to mix categories!

`.txt` format: `# Header` on first line (optional), then `civilian_word|impostor_word` pairs, one per line.

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

## Word format with impostor variants
Each word pair consists of:
- **Civilian word**: What most players see
- **Impostor word**: A related but different word that impostors see

Example from `animales_naturaleza.txt`:
```
Oso|Pez
Camello|Arena
Elefante|Safari
```

This makes the game more interesting as impostors have a related word to work with!

## Add new pools
1) Create a `.txt` in `word-pools/` with optional header `# Name` and pairs `civilian|impostor` per line.
2) Add an entry in `word-pools/manifest.json` with `id`, `name`, `emoji`, `count`, and optionally `local: true`.
3) (Optional) To make it work offline, add an embedded version in `script.js` `EMBEDDED_POOLS` array.

## Notes
- State is saved in `localStorage` (`impostorGameStateV2`). Use "New match" to clear it.
- Mobile optimized: **No scrolling required** on setup screen, reveal via swipe or tap, compact adaptive UI.
- Pool selection grid has vertical scroll when needed to fit all 22 categories.
