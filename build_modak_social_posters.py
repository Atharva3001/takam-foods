"""Create Instagram-ready 9:16 Modak posters from Takam's mascot art.

The generator-created mascot images have a saturated green key background. This script
removes that key, composes a flavour-specific hand-drawn background, and exports a
ready-to-use PNG for each Modak. No text is added, leaving headline space for Canva.
"""

from __future__ import annotations

import colorsys
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path("/home/ubuntu/webdev-static-assets")
OUT = Path("/home/ubuntu/takam_social_assets")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1920
INK = "#201C16"
PEACH = "#FFC5AF"
MINT = "#BCEFD6"
YELLOW = "#F5C84B"
CREAM = "#FFF7E8"

ASSETS = {
    "dink": {
        "source": ROOT / "takam_modak_dink_v2.png",
        "background": "#D96A43",
        "accent": "#F4C44C",
        "subaccent": "#BCEFD6",
        "name": "takam_dink_modak_instagram.png",
        "style": "akhada",
    },
    "nachni": {
        "source": ROOT / "takam_modak_nachni_v2.png",
        "background": "#634332",
        "accent": "#FFC58B",
        "subaccent": "#BCEFD6",
        "name": "takam_nachni_modak_instagram.png",
        "style": "morning",
    },
    "dryfruit": {
        "source": ROOT / "takam_modak_dryfruit_v2.png",
        "background": "#F3DFC1",
        "accent": "#719A5C",
        "subaccent": "#FFC5AF",
        "name": "takam_dryfruit_modak_instagram.png",
        "style": "vip",
    },
    "beet": {
        "source": ROOT / "takam_modak_beet_v2.png",
        "background": "#EA829B",
        "accent": "#BCEFD6",
        "subaccent": "#F5C84B",
        "name": "takam_beet_modak_instagram.png",
        "style": "studio",
    },
    "poshtik": {
        "source": ROOT / "takam_modak_poshtik_v2.png",
        "background": "#FFF4D8",
        "accent": "#BCEFD6",
        "subaccent": "#FFC5AF",
        "name": "takam_poshtik_modak_instagram.png",
        "style": "superhero",
    },
    "tilkund": {
        "source": ROOT / "takam_modak_tilkund_v2.png",
        "background": "#F3E4C4",
        "accent": "#2B2926",
        "subaccent": "#F5C84B",
        "name": "takam_tilkund_modak_instagram.png",
        "style": "mighty",
    },
    "gulkand": {
        "source": ROOT / "takam_modak_gulkand_v2.png",
        "background": "#F4A8B5",
        "accent": "#8F3650",
        "subaccent": "#BCEFD6",
        "name": "takam_gulkand_modak_instagram.png",
        "style": "loveletter",
    },
}


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def tint(hex_value: str, factor: float) -> tuple[int, int, int]:
    r, g, b = hex_rgb(hex_value)
    return tuple(int(c + (255 - c) * factor) for c in (r, g, b))


def remove_green_key(image: Image.Image) -> Image.Image:
    """Remove the saturated green temporary background while retaining mint outlines."""
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = pixels[x, y]
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if 0.23 < h < 0.46 and s > 0.60 and g > 75:
                pixels[x, y] = (r, g, b, 0)
            elif 0.23 < h < 0.46 and s > 0.48 and g > 90:
                softness = max(0.0, min(1.0, (s - 0.48) / 0.12))
                pixels[x, y] = (r, g, b, int(a * (1 - softness)))
    bbox = rgba.getchannel("A").getbbox()
    return rgba.crop(bbox) if bbox else rgba


def hand_line(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], fill: str, width: int = 8) -> None:
    draw.line(points, fill=fill, width=width, joint="curve")
    for px, py in points:
        draw.ellipse((px - width // 3, py - width // 3, px + width // 3, py + width // 3), fill=fill)


def petal(draw: ImageDraw.ImageDraw, x: int, y: int, size: int, color: str, angle: float) -> None:
    pts = []
    for index in range(12):
        t = math.pi * 2 * index / 12
        rx = size * math.cos(t)
        ry = size * 0.55 * math.sin(t)
        ca, sa = math.cos(angle), math.sin(angle)
        pts.append((x + rx * ca - ry * sa, y + rx * sa + ry * ca))
    draw.polygon(pts, fill=color)


def star(draw: ImageDraw.ImageDraw, x: int, y: int, radius: int, color: str) -> None:
    pts = []
    for index in range(8):
        angle = -math.pi / 2 + index * math.pi / 4
        r = radius if index % 2 == 0 else radius * 0.35
        pts.append((x + math.cos(angle) * r, y + math.sin(angle) * r))
    draw.polygon(pts, fill=color, outline=INK)


def background(config: dict, seed: int, with_panels: bool = True) -> Image.Image:
    random.seed(seed)
    base = Image.new("RGBA", (W, H), config["background"])
    draw = ImageDraw.Draw(base)
    accent = config["accent"]
    sub = config["subaccent"]

    # A soft paper grain helps all seven posts feel related and avoids a flat look.
    grain = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grain)
    for _ in range(1800):
        x, y = random.randrange(W), random.randrange(H)
        alpha = random.randrange(8, 25)
        gdraw.point((x, y), fill=(255, 255, 255, alpha))
    base.alpha_composite(grain)

    # Preserve a clean header area for user-added Marathi headlines.
    if with_panels:
        draw.rounded_rectangle((72, 88, W - 72, 440), radius=56, fill=(*tint(config["background"], 0.36), 225), outline=INK, width=6)
        draw.rounded_rectangle((110, 126, W - 110, 400), radius=38, outline=(*hex_rgb(sub), 110), width=5)

    style = config["style"]
    if style == "akhada":
        draw.ellipse((120, 500, 960, 1340), fill=accent, outline=INK, width=10)
        for offset in range(6):
            y = 505 + offset * 76
            hand_line(draw, [(80, y), (210, y + 28), (360, y - 15)], "#A34A34", 12)
            hand_line(draw, [(720, y - 10), (865, y + 28), (1010, y - 5)], "#A34A34", 12)
        for x, y in [(120, 520), (915, 560), (170, 1450), (880, 1430)]:
            petal(draw, x, y, 24, PEACH, random.random())
    elif style == "morning":
        draw.ellipse((150, 465, 930, 1245), fill=accent, outline=INK, width=10)
        draw.rounded_rectangle((0, 1385, W, H), radius=0, fill=sub)
        for angle in range(0, 360, 20):
            rad = math.radians(angle)
            x1 = 540 + int(math.cos(rad) * 385)
            y1 = 850 + int(math.sin(rad) * 385)
            x2 = 540 + int(math.cos(rad) * 490)
            y2 = 850 + int(math.sin(rad) * 490)
            draw.line((x1, y1, x2, y2), fill=YELLOW, width=12)
        for x in (80, 850):
            draw.arc((x, 1260, x + 200, 1530), 200, 340, fill=CREAM, width=12)
    elif style == "vip":
        draw.ellipse((100, 485, 980, 1365), fill=accent, outline=INK, width=10)
        for x in (-40, 840):
            draw.pieslice((x, 520, x + 310, 830), 180, 360, fill=sub, outline=INK, width=8)
        for x, y in [(100, 620), (920, 640), (135, 1420), (920, 1390)]:
            draw.ellipse((x, y, x + 58, y + 34), fill="#F6E2AB", outline=INK, width=5)
            draw.line((x + 10, y + 12, x + 48, y + 20), fill="#B07947", width=5)
    elif style == "studio":
        cell = 95
        for x in range(0, W, cell):
            for y in range(470, H, cell):
                if (x // cell + y // cell) % 2 == 0:
                    draw.rectangle((x, y, x + cell, y + cell), fill=sub)
        draw.ellipse((120, 505, 960, 1345), fill=PEACH, outline=INK, width=10)
        for y in range(510, 1380, 170):
            hand_line(draw, [(40, y), (180, y - 60), (310, y + 45)], YELLOW, 14)
            hand_line(draw, [(770, y + 45), (900, y - 50), (1050, y)], YELLOW, 14)
        for x, y in [(130, 530), (920, 520), (130, 1430), (910, 1440)]:
            star(draw, x, y, 34, YELLOW)
    elif style == "superhero":
        draw.ellipse((100, 490, 980, 1370), fill=YELLOW, outline=INK, width=10)
        for x in range(0, W, 135):
            for y in range(480, H, 135):
                draw.rounded_rectangle((x + 8, y + 8, x + 125, y + 125), radius=10, outline=(*hex_rgb(sub), 130), width=5)
        for angle in range(0, 360, 30):
            rad = math.radians(angle)
            draw.line((540, 930, 540 + int(math.cos(rad) * 500), 930 + int(math.sin(rad) * 500)), fill=PEACH, width=14)
    elif style == "mighty":
        cell = 108
        for x in range(-cell, W + cell, cell):
            for y in range(470, H, cell):
                if (x // cell + y // cell) % 2 == 0:
                    draw.rectangle((x, y, x + cell, y + cell), fill=accent)
        draw.ellipse((118, 510, 962, 1354), fill=sub, outline=INK, width=10)
        for y in range(560, 1430, 155):
            hand_line(draw, [(22, y), (240, y - 90), (380, y + 20)], PEACH, 16)
            hand_line(draw, [(700, y + 20), (860, y - 90), (1060, y)], PEACH, 16)
    elif style == "loveletter":
        draw.ellipse((112, 500, 968, 1356), fill=CREAM, outline=INK, width=10)
        for y in range(520, 1400, 112):
            draw.line((90, y, 990, y), fill=(*hex_rgb(sub), 150), width=4)
        for x, y in [(126, 505), (930, 570), (135, 1440), (915, 1390), (770, 1490)]:
            petal(draw, x, y, random.randint(22, 36), accent, random.random() * math.pi)
        for x, y in [(190, 635), (860, 730), (195, 1300)]:
            draw.polygon([(x, y), (x - 32, y - 34), (x - 65, y), (x, y + 68), (x + 65, y), (x + 32, y - 34)], fill=PEACH, outline=INK)

    # Bottom footer panel, deliberately blank for price/order text added later in Canva.
    if with_panels:
        draw.rounded_rectangle((90, 1680, W - 90, 1830), radius=34, fill=(*hex_rgb(CREAM), 232), outline=INK, width=7)
    return base


def add_mascot(base: Image.Image, source: Path) -> Image.Image:
    mascot = remove_green_key(Image.open(source))
    max_width, max_height = 820, 1030
    scale = min(max_width / mascot.width, max_height / mascot.height)
    size = (int(mascot.width * scale), int(mascot.height * scale))
    mascot = mascot.resize(size, Image.Resampling.LANCZOS)
    x = (W - mascot.width) // 2
    y = 590
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    alpha = mascot.getchannel("A").filter(ImageFilter.GaussianBlur(22))
    shadow_mask = Image.new("L", (W, H), 0)
    shadow_mask.paste(alpha, (x + 18, y + 28))
    shadow_layer = Image.new("RGBA", (W, H), (32, 28, 22, 78))
    shadow.paste(shadow_layer, (0, 0), shadow_mask)
    base.alpha_composite(shadow)
    base.alpha_composite(mascot, (x, y))
    return base


def main() -> None:
    manifest = []
    for index, (slug, config) in enumerate(ASSETS.items()):
        poster = background(config, 100 + index)
        add_mascot(poster, config["source"])
        destination = OUT / config["name"]
        poster.convert("RGB").save(destination, "PNG", optimize=True)
        manifest.append(destination.name)
    (OUT / "README.txt").write_text(
        "Seven 1080 x 1920 PNG posters, with intentionally empty headline and footer zones.\n"
        "Use directly for Reels/Stories or crop to 4:5 for feed posts.\n"
        + "\n".join(manifest)
    )


if __name__ == "__main__":
    main()
