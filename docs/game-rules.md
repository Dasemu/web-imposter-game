# Game rules

- Defaults: up to 10 players; impostors by player count (<=5 -> 1, 6-7 -> 2, >7 -> 3) and never more than half.
- Time defaults: 5 min with 4 or fewer players, up to 15 min with 10; deliberation = 1/3 of the match time (rounded).
- No self-voting. Max executions = number of impostors.
- Tie on execution slots: 1 extra minute of deliberation and a new vote only among tied players; if the tie persists, the impostors win.
- Starting player and direction (clockwise/counter-clockwise) are random.
- State is saved in `localStorage` (`impostorGameStateV2`). Use "New match" to clear it.

## Word pools

Each word pair consists of:
- **Civilian word**: what most players see.
- **Impostor word**: a related but different word that impostors see, to keep them guessing.

Example from `www/word-pools/animales_naturaleza.txt`:
```
Oso|Pez
Camello|Arena
Elefante|Safari
```

22 pools are available in `www/word-pools/*.txt`, listed in `www/word-pools/manifest.json`. Two of them (`animales_naturaleza`, `objetos_cotidianos`) are embedded in `script.js` (`EMBEDDED_POOLS`) so the game works fully offline; the rest are fetched over the network and require a connection. Players can select multiple pools at once; words are drawn randomly from the combined set.

### Add a new pool

1. Create a `.txt` file in `www/word-pools/` with an optional header `# Name` on the first line, then `civilian_word|impostor_word` pairs, one per line.
2. Add an entry in `www/word-pools/manifest.json` with `id`, `name`, `emoji`, `count`, and optionally `local: true`.
3. To make it work offline, also add an embedded version in `script.js`'s `EMBEDDED_POOLS` array.

## UI notes

- Mobile optimized: no scrolling required on the setup screen, reveal via swipe or tap, compact adaptive UI.
- The pool selection grid scrolls vertically when needed to fit all 22 categories.
