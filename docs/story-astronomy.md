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
- **Astronomy card** — `updateAstroCard` (`14-lore.js`, called from `loadProblem`). **Hidden during
  arena play** (user preference) — it early-returns after unlocking the body, so the top strip stays
  clear; the planet name still shows in the stat tile and full astronomy lives in the Star Atlas.
  (To re-enable the in-arena card, delete the early-return block.)
- **📖 Star Log** (`#codexView`, header button `openCodex()`) — tabs **Story** (narration + collected
  memory fragments, `renderStoryTab`) and **Star Atlas** (the real, current 65-arena atlas —
  `setCodexTab('atlas')` just calls the SAME `renderStarAtlas()` (25-nav.js) used by the dedicated
  full-screen Atlas; see `_atlasRenderInto` below).
  - **2026-07-21 double bug, fixed**: (1) the header button that opens this view (`openCodex()` with
    no tab arg, for the Story tab) had been removed at some point — nothing in the live UI could reach
    `#codexView` at all (the two `openCodex('atlas')` call sites, in `15-map.js` and the astro card's
    dead-code button, both always fell through to `openStarAtlas()` instead since that function
    always exists); the post-boss-fight "📖 Memory fragment recovered! Open the Star Log." toast had
    nowhere to send the player. Re-added a "📖 Star Log" header button (`index.html`) next to
    "🪐 Space Travel". (2) Even once reached, the Atlas tab rendered the literal text "undefined":
    `renderCodex()` (14-lore.js) did `el.codexBody.innerHTML = renderStarAtlas()`, but this file used
    to define its OWN same-named, long-superseded `renderStarAtlas()` (the old Sol-chapter-only
    version, `BODY_ORDER`/`isBodyUnlocked`/`planetSVG`) — since both shared this codebase's one global
    script scope, the later-loaded 25-nav.js version always silently won at call time, and it doesn't
    return an HTML string (it writes straight into `#starAtlasView` and returns `undefined`). Deleted
    the dead duplicate in 14-lore.js; `renderStarAtlas()` writes into whichever of `#starAtlasView` /
    `#codexBody` is actually on screen via a small `_atlasRenderInto(html)` helper, so it works
    correctly from either entry point (the dedicated Atlas screen, or this tab) without duplicating
    the rendering logic.
    - **Regression, fixed 2026-07-22 (user: "all these pictures are messed up... it was very
      beautiful")**: this helper originally wrote the SAME html into BOTH containers unconditionally
      ("only one is ever visible, so mirroring is harmless"). It isn't — `bodyArtSVG`'s SVG
      `<radialGradient>`/`<clipPath>` uid is per-arena only (e.g. `g-sunatlasnav1`), not per-container,
      so writing the identical markup into both left TWO live elements sharing the same `id` in the
      DOM the moment the Atlas was opened by any route (confirmed live: 47 exact duplicate ids).
      Duplicate SVG ids are undefined behaviour for `fill="url(#...)"`/`clip-path="url(#...)"`
      resolution — different browsers/engines are free to resolve them differently, which is the
      likely cause of the planet art rendering duller/flatter on the user's device while looking
      correct elsewhere. Fixed by only writing into whichever container currently has the `.active`
      class (the same convention `openStarAtlas`/`openCodex` already use to toggle view-container
      visibility), so at most one live copy of each id ever exists at a time. Verified live: before
      the fix, a duplicate-id scan on production found 47 matches; after patching `_atlasRenderInto`
      in-memory and re-rendering with `#codexBody` cleared (simulating a fresh session), 0 duplicates.
- **Star Atlas systems list** (`renderStarAtlas`, `25-nav.js`) — each of the 11 system cards shows its
  maths **topic** (world title from `MATH_WORLDS`, matched by `s.worldId`) + **arena range** (from
  `s.arenaStart/arenaEnd`), e.g. "📚 Numbers · Arena 1–24" (`.atlas-sys-topic`).
- **Arena cards are progress-locked** (`_atlasArenaCard`, `25-nav.js`, added 2026-07-21 — user:
  "why all arena is open? ... not until i finish arena 1,2,3, arena 4 should be locked"). An arena
  card is locked when `a.n > state.level` AND it's never been beaten (`!state.bossDefeated[a.n]`,
  and not `state.testMode`) — shows "🔒 Locked" with a disabled Enter button, a "Clear Arena N-1
  first" note, and dimmed/greyscale styling (`.atlas-planet.locked`, `systems.css`).
  - **The `bossDefeated` exemption was added same-day** (user: "the picture of the planets shouldn't
    be darker if cleared") — the first version only checked `a.n > state.level`, so `atlasTravel(room)`
    setting `state.level = room` to REPLAY an earlier arena would make every already-cleared arena
    ahead of that point look freshly "🔒 Locked" (dimmed/greyscale) again the moment you traveled
    back. Progress-gating now only ever blocks arenas that have genuinely never been reached.
  - **`lockedDim` briefly narrowed to just the immediate-next arena, then reverted same day.**
    2026-07-22, first pass (user: "everything is dark... only locked one should be dark", after
    discovering the `bossDefeated` exemption above hadn't actually reached production yet): only
    `a.n === state.level + 1` got the dark/greyscale treatment, so browsing a 24-arena system didn't
    mean staring at a wall of dimmed cards. Reverted later the same day (user: "all arena7+ should be
    dim") — `lockedDim` is now simply `= locked` again: EVERY not-yet-reached arena dims, not just
    the next one. `alreadyCleared`/`testMode`/`special` stay exempt either way.
  - Already-cleared and the current arena stay freely re-enterable (unchanged). The two special
    end-game arenas (888/999) are exempt from this check —
  they have their own separate `_arenaVisible()` reveal condition and shouldn't be double-gated once
  earned. The "ℹ️ About this ..." astronomy-info button stays clickable even when locked (it's
  reference content, not a progress skip). Note: the lock is UI-only on the card's button (no
  onclick when locked) — `atlasTravel(room)` itself has no internal guard, so this doesn't defend
  against a console call jumping ahead; not considered necessary for a single-player client-side game.
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

## Real photos & artist impressions (Star Atlas info modal, `25-nav.js`)

- **Real photos** — `BODY_PHOTOS` (flat filename map keyed by `_bodyPhotoKey(name)`) + `bodyPhotoUrl(b)`,
  serving 22 bundled Sol-system JPEGs from `game/assets/bodies/`. Gates on `b.real !== false` — only
  real (non-imagined) bodies ever get a "📷 See real photo" button.
- **Artist impressions** (added 2026-07-21) — `ART_PHOTOS` + `bodyArtPhotoUrl(b)`, serving 41 bundled
  AI-generated infographic PNGs from `game/assets/bodies/ArtistImpressions/` (arenas 23, 25–48, 50–65
  — every exoplanet/dwarf-planet arena except 49, Kepler-90 d, which has no image anywhere yet).
  Does **not** gate on `b.real` — these ARE the imagined bodies. `atlasShowBodyInfo` prefers the real
  photo when both would exist; otherwise shows a "🎨 See artist's impression" button
  (`atlasShowArtImpression(n)`, same lightbox as the real-photo one, honestly captioned "artist's
  impression · no real photo exists yet"). The old generic `.bim-artlabel` fallback text now only
  renders when a body has neither a real photo nor an artist impression (currently just arena 49).
  Source images were AI-generated infographic cards (arena #, body name, stat table, orbital diagram)
  renamed to match each body (`_bodyPhotoKey`-style, e.g. `trappist-1_b.png`) after visually
  cross-checking every image's embedded label against `BODIES_LIST.md`; one mislabeled image and 19
  images of exoplanet systems not in this game's curriculum (Kepler-22/62/69/138/186/296/440/442/452/
  987/1229/1649) were discarded.

## Persistence

`state.codex = { bodies:{room:true}, fragments:{room:true} }` (unlocked ids) via the 4-place rule.
Unlocked bodies + fragments survive reload.
