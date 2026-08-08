"""
Prepare the Earth Hub tile art.

The generated sprites came back with OPAQUE backgrounds (a soft grey/brown vignette) even though
the prompt asked for transparency, so pasting them onto the grass would show a box per sprite.

Approach: flood-fill inward from the image border, treating a pixel as background while it stays
close to the colour of the neighbour it spread from. That tracks a smooth gradient (which a single
global colour-match cannot) and stops at the sprite's dark outline. Then feather the resulting mask
by one pass so the cut edge isn't jagged, and trim to the subject's bounding box so every sprite
fills its tile consistently.

Full-bleed textures (ground/wall/water) are only resized — they must stay opaque.
"""
import os
import sys
from collections import deque

import numpy as np
from PIL import Image

SRC = r"C:\PythonProject\AlgebraGame\picture"
OUT = r"C:\PythonProject\AlgebraGame\game\assets\hub"

# (source filename, output name, target px) — kept opaque, they tile/fill.
TEXTURES = [
    ("Ground (seamless).png", "ground.png", 512),
    ("Stone wall (seamless).png", "wall.png", 256),
    ("Pond water (seamless).png", "water.png", 256),
]

# (source filename, output name) — background removed, trimmed, 256px.
SPRITES = [
    ("Tree (transparent).png", "tree.png"),
    # NOTE: these two arrived SWAPPED. The file named "Weapon Store" is a potion/bottle shop; the
    # one named "Item Store" is a blacksmith forge (anvil + furnace). Mapped to the building each
    # image actually depicts, rather than renaming the player's source files.
    ("\U0001f392 Item Store.png", "b-weapon.png"),        # forge art       -> Weapon Store
    ("\u2694\ufe0f Weapon Store.png", "b-item.png"),      # potion-shop art -> Item Store
    ("\U0001f9ea Laboratory.png", "b-alchemy.png"),
    ("\U0001f3e8 Hotel.png", "b-hotel.png"),
    ("\U0001f3a1 Wonderland.png", "b-wonder.png"),
    ("\U0001f504 Trading Room.png", "b-trading.png"),
    ("\u267e\ufe0f Arena Infinity.png", "b-practice.png"),
    ("\U0001f33e Farm.png", "b-farm.png"),
    ("\U0001f3ed Special Item Store.png", "b-special.png"),
]

# Player poses, each (source sheet, cell-x, cell-y, output name). Every sheet is a 2x2 grid.
#
# "up" comes from a SECOND, later sheet (2026-08-05, player: "the up facing one should be this
# guy"): the first sheet's top-left pose still showed a visor, so walking away from the camera
# looked like walking toward it. The newer sheet has a true back view — helmet only, no visor.
#
# Only ONE side pose is exported; the game mirrors it with scaleX(-1) for the other direction, so
# left/right can't be shipped as two separately-wrong images. NOTE the art faces LEFT (measured via
# the visor's offset from the body centre), so map.css flips for RIGHT.
PLAYER_SHEET_A = "Player (4 facings, one sheet).png"
PLAYER_SHEET_B = "ChatGPT Image Aug 8, 2026, 06_59_18 PM.png"
PLAYER_POSES = [
    (PLAYER_SHEET_B, 1, 0, "player-up.png"),     # true back view — helmet, no visor
    (PLAYER_SHEET_A, 1, 0, "player-down.png"),   # face visible through the visor
    (PLAYER_SHEET_A, 1, 1, "player-side.png"),   # faces LEFT as drawn
]

SPRITE_PX = 256
# Tolerances are deliberately loose: these backgrounds are smooth vignettes WITH a soft glow halo
# around the subject, and a tight tolerance stops at the glow and leaves a grey blob (first attempt
# did exactly that). The sprites all have hard dark cartoon outlines, which is what actually halts
# the fill, so a high per-step tolerance is safe here.
TOL = 62.0          # per-step colour distance allowed while spreading through background
SEED_TOL = 400.0    # effectively off; the outline stops the fill, not a global colour match


def _fill_bg(rgb: np.ndarray, tol: float) -> np.ndarray:
    """Flood-fill from the border, allowing `tol` colour drift PER STEP.

    Per-step (rather than distance-from-one-colour) is what lets it follow the smooth vignette;
    a hard cartoon outline is a big single-step jump, so the fill stops there. No global colour
    cap — that was what left the bright glow ring behind as a grey halo on the first attempt.
    """
    h, w = rgb.shape[:2]
    bg = np.zeros((h, w), bool)
    seen = np.zeros((h, w), bool)
    q = deque()

    def push(y, x):
        if not seen[y, x]:
            seen[y, x] = True
            q.append((y, x, rgb[y, x].astype(np.float64)))

    for x in range(w):
        push(0, x); push(h - 1, x)
    for y in range(h):
        push(y, 0); push(y, w - 1)

    while q:
        y, x, prev = q.popleft()
        cur = rgb[y, x].astype(np.float64)
        if np.linalg.norm(cur - prev) > tol:
            continue
        bg[y, x] = True
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx, cur))
    return bg


# Tried largest-first; the first one that doesn't leak into the subject wins.
TOL_LADDER = [26.0, 22.0, 18.0, 15.0, 12.0, 10.0, 8.0, 6.0]


def remove_bg(img: Image.Image) -> Image.Image:
    """Background-strip with an ADAPTIVE tolerance.

    One global tolerance can't serve every image: 24 cleanly strips the buildings (dark outlines on
    a grey backdrop) but shreds the tree, whose dark-green shadows sit very close to that same
    backdrop. So walk a ladder high->low and take the first tolerance that leaves the image's
    CENTRE intact — the centre going transparent is a direct signal the fill leaked through an
    outline into the subject.
    """
    img = img.convert("RGBA")
    a = np.asarray(img).astype(np.int16)
    h, w = a.shape[:2]
    rgb = a[:, :, :3]

    y0, y1 = int(h * 0.38), int(h * 0.62)
    x0, x1 = int(w * 0.38), int(w * 0.62)

    # Self-calibrating: the most conservative tolerance can't be leaking, so whatever fraction of
    # the centre box it clears is legitimately background (gaps between legs, space around a narrow
    # subject). Judge every higher tolerance against THAT baseline, not a fixed number — a fixed 2%
    # rejected every tolerance for the player sprites, whose baseline is already ~3%.
    baseline = _fill_bg(rgb, TOL_LADDER[-1])
    base_centre = baseline[y0:y1, x0:x1].mean()

    bg = baseline
    for tol in TOL_LADDER:
        cand = _fill_bg(rgb, tol)
        if cand[y0:y1, x0:x1].mean() <= base_centre + 0.04:   # no meaningful new leak
            bg = cand
            break

    alpha = np.where(bg, 0, 255).astype(np.uint8)

    # Feather: any kept pixel touching background gets partial alpha, softening the cut.
    keep = alpha > 0
    nbr_bg = np.zeros_like(keep)
    nbr_bg[1:, :] |= bg[:-1, :]
    nbr_bg[:-1, :] |= bg[1:, :]
    nbr_bg[:, 1:] |= bg[:, :-1]
    nbr_bg[:, :-1] |= bg[:, 1:]
    alpha[keep & nbr_bg] = 140

    a[:, :, 3] = alpha
    return Image.fromarray(a.astype(np.uint8), "RGBA")


def trim_and_fit(img: Image.Image, px: int) -> Image.Image:
    """Crop to the visible subject, then centre it on a square transparent canvas."""
    bbox = img.split()[3].getbbox()
    if bbox:
        img = img.crop(bbox)
    side = max(img.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    return canvas.resize((px, px), Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    report = []

    for src, dst, px in TEXTURES:
        p = os.path.join(SRC, src)
        if not os.path.exists(p):
            report.append(f"MISSING texture {src}")
            continue
        im = Image.open(p).convert("RGB").resize((px, px), Image.LANCZOS)
        im.save(os.path.join(OUT, dst), optimize=True)
        report.append(f"texture  {dst:16s} {px}x{px}  {os.path.getsize(os.path.join(OUT, dst))//1024}KB")

    for src, dst in SPRITES:
        p = os.path.join(SRC, src)
        if not os.path.exists(p):
            report.append(f"MISSING sprite {src}")
            continue
        cut = trim_and_fit(remove_bg(Image.open(p)), SPRITE_PX)
        cut.save(os.path.join(OUT, dst), optimize=True)
        op = (np.asarray(cut)[:, :, 3] > 0).mean() * 100
        report.append(f"sprite   {dst:16s} {SPRITE_PX}x{SPRITE_PX}  opaque={op:5.1f}%  "
                      f"{os.path.getsize(os.path.join(OUT, dst))//1024}KB")

    for sheet_name, cx, cy, dst in PLAYER_POSES:
        pp = os.path.join(SRC, sheet_name)
        if not os.path.exists(pp):
            report.append(f"MISSING player sheet {sheet_name}")
            continue
        sheet = Image.open(pp).convert("RGBA")
        cw, ch = sheet.width // 2, sheet.height // 2
        cell = sheet.crop((cx * cw, cy * ch, (cx + 1) * cw, (cy + 1) * ch))
        out = trim_and_fit(remove_bg(cell), 192)
        out.save(os.path.join(OUT, dst), optimize=True)
        op = (np.asarray(out)[:, :, 3] > 0).mean() * 100
        report.append(f"player   {dst:16s} 192x192  opaque={op:5.1f}%  "
                      f"{os.path.getsize(os.path.join(OUT, dst))//1024}KB")

    print("\n".join(report))


if __name__ == "__main__":
    sys.exit(main())
