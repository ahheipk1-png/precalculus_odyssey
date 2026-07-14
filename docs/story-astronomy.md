# Story, Astronomy & Star Log

← [docs orchestra](README.md) · code: `js/14-lore.js` · data: `config/story.config.js`, `config/planets.config.js`, `config/worlds.config.js`

## The story (canon)

**Archive Minds** = ancient human-built AIs that preserved all knowledge and left the Solar System
>1,000,000 years ago. A catastrophe erased human civilization; the Minds returned, no longer
recognize modern humans, and their guardian machines attack. Extradimensional invaders arrive too.
**Mathematics is the only shared language** — the player is a young **Solver** who solves math to
activate ancient tech, translate the Archive language, and prove humanity's lineage. Tagline:
**"Knowledge Is Humanity's Strongest Weapon."** Signature beat: boss fights unlock **memory
fragments** — many guardians were never evil, just following ancient orders — building to a
communicate-don't-destroy finale. Full verbatim text (opening narration, ending, chapter beats) is
in `config/story.config.js` and the master plan's story section.

## Three-layer fusion

Each **chapter = a story beat × a real star system × a math band**; each **planet = a real
Sol-system body × a math sub-topic × an astronomy fact card**. Chapter 1 = **the Sol System**,
planets Earth→Neptune.
The 9 star systems are recorded in `STAR_SYSTEMS` (`worlds.config.js`) for the Star Atlas.

## Delivery mechanics (built)

- **Opening narration** — a skippable star-field crawl (verbatim `STORY.openingNarration`) shown to
  new players; replayable from the Star Log. `showOpeningNarration`/`hideOpeningNarration`.
- **Tagline** on the start screen + the Star Log tagline.
- **Astronomy card** — a slim panel atop the equation view showing the planet's real Sol body (name +
  2 facts + stylized SVG). `updateAstroCard` (called from `loadProblem`), art from `planetSVG`.
- **📖 Star Log** (`#codexView`, header button) — tabs **Story** (narration + collected memory
  fragments) and **Star Atlas** (the Sun + 10 planet cards with real facts; visited-planets gating).
  `openCodex`/`setCodexTab`/`renderStoryTab`/`renderStarAtlas`.
- **Star Atlas systems list** (`renderStarAtlas`, `25-nav.js`) — each of the 11 system cards shows its
  maths **topic** (world title from `MATH_WORLDS`, matched by `s.worldId`) + **arena range** (from
  `s.arenaStart/arenaEnd`), e.g. "📚 Numbers · Arena 1–24" (`.atlas-sys-topic`).
- **Planet arrival splash** — `showPlanetArrival(level)` (`14-lore.js`): a brief star-field overlay
  with the planet zooming in, naming "Arena N · <name> · <kind> · ★ <star system>". It reads the body
  from the **curriculum** (`getArena(level).body` + `bodyArtSVG` + `STAR_SYSTEMS` for the system name),
  falling back to the legacy Sol chapter/`BODIES` map only if the curriculum isn't loaded. (Previously
  it indexed `BODIES` by room-in-chapter, so e.g. arena 119 wrongly announced "Saturn".) Fires on
  advancing a planet (`advanceToNextLevel`), Star Atlas Travel (`atlasTravel`), and worm-hole jumps
  (`executeWarp`) — not on every problem. Skippable by click; auto-dismisses; reduced-motion aware.
- **Boss memory fragments** — defeating a planet's rank-3 boss calls `unlockMemoryFragment(room)`
  (from `handleBattleVictory`), revealing that boss's fragment into the Codex.

## Astronomy data & art

- `BODIES` (`planets.config.js`), keyed by planet number 1–10: `name, kind, accent, blurb, facts[], fun,
  art`. Real kid-friendly facts (diameter, day/year, moons, temps).
- Stylized SVG art is **logic** in `14-lore.js` (`PLANET_ART`, keyed by the body's `art` field):
  earth/moon/mars/venus/mercury/jupiter/europa/saturn/titan/neptune/sun. Hand-built vector spheres
  with element-appropriate coloring; gentle CSS float/pulse. No external images.
- **Universal body art — `js/30-bodyart.js` (`window.bodyArtSVG(body, ctx, astro)`).** Renders EVERY
  one of the 187 bodies as a shaded 3-D sphere themed to its real composition/type (from `body` +
  `ASTRO[n]`). It reuses the 11 hand-drawn `PLANET_ART` Sol bodies, and `classify()`-es everything
  else into an archetype — earthlike, ocean, rocky, dusty, desert, ice, gasGiant, iceGiant, ringed,
  lava, dwarf, asteroid, comet, star (colour by temperature), blackhole, station — most a
  gradient-shaded sphere + surface features (bands, craters, cracks, rings, glow). **Shape follows the
  physics** — not everything is a sphere:
  - **Sphere (178):** anything gravity rounds — planets, large moons, round dwarf planets (Ceres,
    Pluto, Eris), normal gas/ice giants, stars.
  - **Irregular lump (3):** small asteroids / tiny moons too small to be rounded — Phobos, Deimos,
    Vesta (a clipped lumpy `<path>`, not a circle).
  - **Comet (1):** Halley — the glowing coma head + a fanning dust/ion tail (`H`/`T` gradients), no
    solid sphere.
  - **Ellipsoid (3):** close-in giants tidally stretched by their star — the `Hot Jupiter` kind
    (Upsilon And b, 51 Pegasi b) and the `Puffy Planet` (TOI-178 f) render as a wide ellipse.
  - **Oblate star (1):** the `Fast-Spinning Star` (Altair) bulges at the equator.
  - **Black hole (1):** Sagittarius A* (the `Galactic Centre` finale) — accretion ring + dark core. This replaced the
  old broken path (`planetSVG` looked up `BODIES` by the wrong key → blank cards) and the flat 2-D
  fallback circle. Call sites: the Star Atlas cards + info modal (`25-nav.js`) and the arena astro
  card (`updateAstroCard`, `14-lore.js`). `ctx` keeps gradient ids unique per instance.

## Persistence

`state.codex = { bodies:{room:true}, fragments:{room:true} }` (unlocked ids) via the 4-place rule.
Unlocked bodies + fragments survive reload.
