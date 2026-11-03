# Slides

Dedicated in-browser slide viewers, one per module:

- `module1.html` — Module 1: Learn to Drive
- `module2.html` — Module 2: Learn to Race (three decks back to back: Learn
  to Race, Static Obstacle Avoidance, Dynamic Obstacle Avoidance)
- `module3.html` — Module 3: Learn to Win (Trajectory Optimization)

Each page is driven by `../assets/js/slides.js` and styled by
`../assets/css/slides.css`. The slide images themselves live under
`../assets/slides/<deck-slug>/slide-NNN.png`, exported from the source
PowerPoint decks via `../scripts/export_slides.ps1` (PowerPoint COM
automation; edit the `$decks` list at the top of that script to point at your
local `.pptx` paths and re-run it with PowerPoint installed). To update a
deck, re-export its slides to PNG into the same folder (keeping the
`slide-001.png`, `slide-002.png`, ... naming) and update the `count` for that
deck in the relevant `moduleN.html` file if the slide count changed.
