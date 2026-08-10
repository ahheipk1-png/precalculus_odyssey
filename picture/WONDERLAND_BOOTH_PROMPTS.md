# Wonderland booth art — image-generation prompts

24 carnival booths, one per game. Drop the finished PNGs in `picture/` using the **exact filenames**
below, then run `python tools/prep_hub_art.py` — it strips the background, trims and resizes, and
writes `game/assets/wonder/`. Until then each booth renders as a CSS-drawn striped tent, so nothing
is broken while you work through these.

---

## Read this first — the shared style block

**Paste this in front of every prompt below.** It is what makes 24 separately-generated images look
like one fairground instead of 24 unrelated pictures. It matches the Earth Hub buildings you already
generated, so the two maps feel like the same world.

> A single carnival game booth, drawn as one isolated object on a plain flat background, hand-painted
> storybook game-art style with soft clean cel shading and dark friendly outlines. Three-quarter front
> view, viewed slightly from above, as a tile in a top-down adventure game. The whole booth fits well
> inside the frame with clear empty margin on all four sides — nothing cropped, nothing touching an
> edge. A striped fabric canopy over an open wooden service counter, warm fairground string-lights
> along the canopy edge, a hand-painted sign board on the front. Evening carnival lighting: warm glow
> spilling from inside the booth, cool blue-violet dusk around it. No people, no text, no letters, no
> numbers, no logos, no watermark, no border, no frame. Square image.

**Then add the per-booth line.** Each one below names the booth's two signature colours (they match
the accent the game already uses in-app) and the props that say what the game is at a glance.

**Why "no text":** generated lettering comes out as garbled pseudo-words, and the game already prints
each booth's real name underneath it. Ask for a blank or symbol-only sign board.

**Practical notes**
- Square aspect ratio (1:1). 1024×1024 is plenty — booths display at roughly 120px.
- A plain background is fine; the prep script removes it. Avoid busy scenery *behind* the booth — it
  gets cut away and can leave a halo.
- Keep the booth roughly centred and no more than ~85% of the frame. The script trims to the subject,
  so a tight crop loses the canopy edge.
- If one comes back with the booth touching the frame edge, regenerate rather than keeping it — a
  clipped canopy is very visible once it's a tile.

---

## Casino wing (3)

These three sit together in their own corner of the map, so lean them a little richer and more
grown-up than the arcade booths — velvet, brass, deep reds and golds.

| # | Game | Filename |
|---|------|----------|
| 1 | Hoo Hey How | `w-hoohey.png` |
| 2 | Star Slots | `w-slots.png` |
| 3 | Pop-a-Tic-Tac-Toe | `w-poptic.png` |

**1. Hoo Hey How** — `w-hoohey.png`
> Deep crimson and antique gold. A traditional Chinese dice-betting stall: a lacquered red counter
> with a painted betting mat of six symbols (fish, prawn, crab, gourd, coin, rooster), a brass bowl
> with a lid beside three large white dice with red pips, red paper lanterns hanging from the canopy.

**2. Star Slots** — `w-slots.png`
> Gold and warm amber. A slot-machine stall: one tall ornate slot cabinet standing behind the counter,
> its three reels showing bright fruit and star symbols, a big red ball-topped lever on its side, a
> chunky ring of round marquee bulbs framing the reels, a scattering of gold coins spilling from the
> payout tray.

**3. Pop-a-Tic-Tac-Toe** — `w-poptic.png`
> Coral red and cream. A ball-toss stall: a vertical three-by-three grid of round holes on the back
> wall, some holes lit up, a wire basket of coloured balls on the counter, a small pyramid of prizes
> stacked to one side.

---

## Arcade midway — row 1 (7)

| # | Game | Filename |
|---|------|----------|
| 4 | Gone Fishin' | `w-fishin.png` |
| 5 | Tile Ball | `w-tileball.png` |
| 6 | Quantum Block Forge | `w-forge.png` |
| 7 | Star Match | `w-match.png` |
| 8 | Mini Sudoku | `w-sudoku.png` |
| 9 | Cargo Bay | `w-cargo.png` |
| 10 | Glacier Push | `w-glacier.png` |

**4. Gone Fishin'** — `w-fishin.png`
> Sky blue and white. A fishing stall: a shallow round pond of clear blue water set into the counter
> with bright toy fish circling in it, two wooden fishing rods with string and hooks leaning against
> the post, a net and a wooden bucket.

**5. Tile Ball** — `w-tileball.png`
> Coral red and cream. A brick-breaker stall: a wall of coloured brick tiles behind the counter with a
> gap smashed through the middle, a glowing white ball frozen mid-bounce, a flat paddle resting on the
> counter.

**6. Quantum Block Forge** — `w-forge.png`
> Sky blue and pale steel. A block-puzzle stall: a glowing grid board mounted upright behind the
> counter, loose geometric puzzle blocks in several colours laid out on the counter ready to be
> placed, faint blue energy glow around the grid.

**7. Star Match** — `w-match.png`
> Warm yellow and deep indigo. A memory-card stall: a grid of face-down cards with star-patterned
> backs laid out on the counter, two cards flipped face-up showing matching glowing constellations,
> small stars drifting above them.

**8. Mini Sudoku** — `w-sudoku.png`
> Sky blue and chalk white. A number-puzzle stall: a wooden nine-by-nine peg board behind the counter
> with heavy bold-lined boxes, carved wooden number tiles scattered on the counter, a few already
> slotted into the board.

**9. Cargo Bay** — `w-cargo.png`
> Warm yellow and industrial grey. A crate-pushing stall: wooden shipping crates stacked beside the
> counter, one crate sitting on a glowing target ring painted on the floor, a small yellow forklift
> toy and stencilled arrow markings.

**10. Glacier Push** — `w-glacier.png`
> Ice blue and frosted white. An ice-puzzle stall: blocks of clear blue ice on a frozen sheet floor
> mid-slide with frost trails behind them, icicles hanging from the canopy edge, cold pale mist
> spilling over the counter.

---

## Arcade midway — row 2 (7)

| # | Game | Filename |
|---|------|----------|
| 11 | Forbidden City | `w-forbidden.png` |
| 12 | Sky Stacker | `w-stacker.png` |
| 13 | Astro Drop | `w-astro.png` |
| 14 | Virus Lab | `w-virus.png` |
| 15 | Circuit Loop | `w-circuit.png` |
| 16 | Comet Muncher | `w-comet.png` |
| 17 | Blast Bot | `w-blastbot.png` |

**11. Forbidden City** — `w-forbidden.png`
> Imperial red and gold. A Chinese palace-gate stall: the canopy shaped like a tiered pagoda roof with
> upturned eaves and green glazed tiles, round gold door-studs on red gate panels behind the counter,
> matching spirit tiles laid out on the counter, a small stone guardian lion beside the post.

**12. Sky Stacker** — `w-stacker.png`
> Warm yellow and sunset orange. A tower-stacking stall: a tall wobbling tower of coloured blocks
> rising behind the counter, one block swinging from a rope above it, thin clouds drifting around the
> tower's top.

**13. Astro Drop** — `w-astro.png`
> Electric blue and deep space navy. A falling-blocks stall: a tall dark upright cabinet behind the
> counter showing glowing four-square block shapes falling into stacked rows, one full row flashing
> white as it clears, small stars in the cabinet's background.

**14. Virus Lab** — `w-virus.png`
> Coral red and clinical white. A laboratory stall: glass specimen jars on the counter holding
> cartoon viruses with little faces, two-tone capsule pills in a tray, a microscope and a rack of
> bubbling test tubes, a red medical cross painted on the canopy.

**15. Circuit Loop** — `w-circuit.png`
> Warm yellow and dark teal. A wiring-puzzle stall: a dark board behind the counter covered in
> rotatable pipe and wire segments, some glowing gold where power flows through, a bright energy core
> at the centre, small light bulbs lit along the top edge.

**16. Comet Muncher** — `w-comet.png`
> Sky blue and neon purple. A maze-arcade stall: a dark upright maze board behind the counter dotted
> with glowing star pellets, a round yellow muncher character token and two little cartoon UFO tokens
> resting on the counter, neon maze lines glowing blue.

**17. Blast Bot** — `w-blastbot.png`
> Coral red and gunmetal. A demolition stall: a small friendly boxy robot standing on the counter, a
> round black bomb with a lit sparking fuse beside it, cracked wooden crates and scorch marks behind,
> a couple of small drone toys hanging from the canopy.

---

## Arcade midway — row 3 (7)

| # | Game | Filename |
|---|------|----------|
| 18 | Bubble Blast | `w-bubble.png` |
| 19 | Star Lanes Bowling | `w-bowling.png` |
| 20 | Cosmic Rhythm | `w-rhythm.png` |
| 21 | Snake | `w-snake.png` |
| 22 | Crystal Cascade | `w-crystal.png` |
| 23 | Cloudberry Squadron | `w-cloudberry.png` |
| 24 | Sky Squadron 194X | `w-skysquad.png` |

**18. Bubble Blast** — `w-bubble.png`
> Sky blue and iridescent white. A bubble stall: big soap bubbles with rainbow sheen drifting up from
> the counter, one bubble with a small cartoon gremlin trapped inside looking annoyed, a bubble wand
> and a tub of soapy water on the counter.

**19. Star Lanes Bowling** — `w-bowling.png`
> Warm yellow and polished wood. A bowling stall: a short polished lane running back from the counter
> with a triangle of white pins at the far end, a glossy marbled bowling ball rolling down it, two
> spare balls in a rack, star decals along the lane gutters.

**20. Cosmic Rhythm** — `w-rhythm.png`
> Coral pink and neon magenta. A rhythm-arcade stall: an upright screen behind the counter showing
> four vertical note lanes with glowing notes falling toward a bright hit line, four big round
> light-up pads on the counter, musical-note shapes and speaker cones at the sides.

**21. Snake** — `w-snake.png`
> Sky blue and lime green. A snake-game stall: a dark grid board behind the counter with a chunky
> segmented green snake curling across it, a glowing red apple ahead of its head, small block walls at
> the board's corners.

**22. Crystal Cascade** — `w-crystal.png`
> Warm yellow and jewel-toned violet. A gem stall: faceted crystals in ruby, emerald, sapphire and
> amber heaped along the counter, three gems stacked in a falling column above with sparkle trails, a
> soft rainbow refraction glow on the counter surface.

**23. Cloudberry Squadron** — `w-cloudberry.png`
> Coral red and cloud white. A sky-shooter stall: a little cartoon fighter plane toy mounted on a wire
> above the counter, small homing missiles with cartoon fins curving after it, fluffy white clouds and
> a berry-shaped power-up token, a radar dish on the canopy.

**24. Sky Squadron 194X** — `w-skysquad.png`
> Sky blue and vintage military olive. A retro warplane stall: a 1940s propeller fighter plane model
> hanging under the canopy, a wooden island-and-ocean diorama on the counter with a tiny aircraft
> carrier, a leather flight cap and goggles, riveted metal panels on the booth front.

---

## Optional extras

Only if you feel like it — the map works without them.

**Carnival ground texture** — `w-ground.png`
> A seamless tileable top-down texture of trodden fairground grass at dusk, with faint worn dirt paths
> and a few scattered fallen leaves. Hand-painted storybook game-art style, soft cel shading, evening
> lighting. No objects, no shadows cast from outside, edges must tile seamlessly. Square image.

**Fairground fountain** — `w-fountain.png`
> A round stone wishing fountain seen from slightly above, water lit turquoise from below, coins
> glinting on the bottom, a low carved rim. Hand-painted storybook game-art style, dark friendly
> outlines, evening carnival lighting, isolated on a plain flat background with clear margin on all
> sides. No people, no text. Square image.

**Fairground entrance arch** — `w-gate.png`
> A carnival entrance arch of curved metal strung with rows of round marquee bulbs, two striped posts,
> pennant flags along the top. Hand-painted storybook game-art style, dark friendly outlines, evening
> lighting, isolated on a plain flat background with clear margin on all sides. No text, no letters.
> Square image.
