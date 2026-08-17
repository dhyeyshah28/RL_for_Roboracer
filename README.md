# RL for Roboracer

Project page for the **Reinforcement Learning for Roboracer** tutorial — a static,
single-page site built the same way as the L4DC SciML tutorial page: plain HTML,
one hand-written stylesheet, MathJax from a CDN, served by GitHub Pages. There is
no Jekyll theme, no build step, and no dependencies to install.

## Layout

```
.
├── index.html                     # the entire page (all sections live here)
├── assets/
│   ├── css/style.css              # the whole design system
│   └── images/
│       ├── favicon.svg
│       ├── rl_abstraction.svg     # graphical abstract
│       └── speakers/placeholder.svg
├── slides/                        # PDFs linked from the Materials section
├── notebooks/                     # notebooks the Colab links point at
├── requirements.txt
├── .nojekyll                      # serve files verbatim, no Jekyll processing
└── .github/workflows/pages.yml    # optional GitHub Actions deploy
```

## Run it locally

Any static server works:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly by double-click
also works; only the MathJax formulas need a network connection.

## Publish on GitHub Pages

1. Create a repository and push this folder to the `main` branch.
2. **Settings → Pages → Build and deployment**:
   - *Deploy from a branch*: pick `main` / `/ (root)` — nothing else needed, or
   - *GitHub Actions*: the included `.github/workflows/pages.yml` handles it.
3. The site appears at `https://<user-or-org>.github.io/<repo>/`.

Because every path in `index.html` is relative, the page works both at the root
of a user site and in a project subpath.

## Content structure

The course is organized into three progressive modules (see the Roadmap
section of `index.html`):

1. **Learn to Drive** — PPO from scratch and with Stable-Baselines3; a policy
   that completes laps without crashing.
2. **Learn to Race** — reward shaping (steering smoothness, wall proximity,
   lap completion), sim-to-real transfer, and deployment as a ROS 2 node on
   the physical car.
3. **RL for Everything** — RL alongside classical planning and control:
   residual policies, trajectory optimization, multi-agent racing.

Each module is meant to ship as a recorded lecture (Recordings section), a
slide deck, and one or more Colab notebooks (Materials section).

## Placeholders to replace

| Where | What |
| --- | --- |
| `index.html` | `YOUR-ORG/RL-for-Roboracer` — GitHub button, Colab links, setup clone command |
| `index.html` | `VIDEO_ID_MODULE_1` / `VIDEO_ID_MODULE_2` — uncomment the `<iframe>` blocks in the Recordings section and delete the `video-placeholder` divs; add a Module 3 embed once that recording exists |
| `index.html` | `YOUR-CHANNEL` — the course's YouTube channel link on the Module 3 card |
| `index.html` | Teaching staff names, titles, and affiliations |
| `index.html` | Acknowledgments section — currently heading-only; add sponsor text/links once finalized |
| `assets/images/speakers/` | Real headshots; they are cropped to a 180 px circle, so square images look best |
| `slides/`, `notebooks/` | The actual PDFs and notebooks — see the README in each directory for expected filenames/layout |
| `deployment/` | Not yet created — add the ROS 2 deployment node here (`ppo_deploy_node.py`) and it will match the Module 2 link in Materials |

## Editing notes

- Section order and the nav links at the top of `index.html` must be kept in
  sync — the nav is anchor-based (`#overview`, `#roadmap`, `#recordings`,
  `#materials`, `#speakers`, `#setup`, `#references`).
- Alternating background bands come from the `section alt` class; keep them
  alternating as you add or remove sections.
- Colors and shadows are all CSS custom properties at the top of
  `assets/css/style.css` (`--brand`, `--accent`, …). Change them there once
  rather than in individual rules.
- The Roadmap section reuses two existing patterns rather than new CSS: the
  `.timeline`/`.slot` classes (originally the agenda) for the 4-step "how it
  works" guide, and `.cards.three` + `.avatar` (originally the speaker grid)
  for the three module cards.
