"""Export final text-filled Modak posters and clean background-only Reel templates."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, "/home/ubuntu/takam-website")
from build_modak_social_posters import ASSETS, CREAM, H, INK, W, add_mascot, background, hex_rgb, tint

OUT = Path("/home/ubuntu/takam_final_instagram_assets")
POSTERS = OUT / "text_filled_posters"
BACKGROUNDS = OUT / "background_only_templates"
POSTERS.mkdir(parents=True, exist_ok=True)
BACKGROUNDS.mkdir(parents=True, exist_ok=True)

FONT = "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf"

COPY = {
    "dink": ("मी गोड आहे, पण कमजोर नाही!", "डिंक मोदक  ताकदवाली गोडी"),
    "nachni": ("प्रोटीन शेक नाही, मीच पुरे!", "नाचणी मोदक  आरोग्याचा मित्र"),
    "dryfruit": ("श्रीमंत आहे बाबा, पण माज नाही.", "ड्रायफ्रुट मोदक  उत्सवी मानकरी"),
    "beet": ("गुलाबी आहे म्हणून कमी समजू नको.", "बीट मोदक  रंगीत नाद"),
    "poshtik": ("पोषण हेच माझं मधलं नाव आहे.", "पोष्टीक मोदक  घरचा हिरो"),
    "tilkund": ("आकार छोटा; ताकद मोठी.", "तीळकुंद मोदक  छोटा पण दमदार"),
    "gulkand": ("मी नाही मिष्टान्न; मी प्रेमपत्र आहे.", "गुलकंद मोदक  गोड गुलाबी प्रेम"),
}


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> str:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = word if not current else f"{current} {word}"
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return "\n".join(lines)


def draw_centered_text(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, font: ImageFont.FreeTypeFont, fill: str, spacing: int = 10) -> None:
    text_box = draw.multiline_textbbox((0, 0), text, font=font, spacing=spacing, align="center")
    tx = (box[0] + box[2] - (text_box[2] - text_box[0])) / 2
    ty = (box[1] + box[3] - (text_box[3] - text_box[1])) / 2
    draw.multiline_text((tx, ty), text, font=font, fill=fill, spacing=spacing, align="center")


def add_copy(poster: Image.Image, headline: str, subline: str) -> Image.Image:
    draw = ImageDraw.Draw(poster)
    headline_font = ImageFont.truetype(FONT, 64)
    sub_font = ImageFont.truetype(FONT, 39)
    brand_font = ImageFont.truetype(FONT, 31)
    wrapped = wrap_text(draw, headline, headline_font, 780)
    draw_centered_text(draw, (124, 138, W - 124, 388), wrapped, headline_font, INK, spacing=8)
    draw_centered_text(draw, (130, 1690, W - 130, 1748), subline, sub_font, INK)
    draw_centered_text(draw, (130, 1758, W - 130, 1818), "टाकम  घरगुती चविष्ट मस्त  9371055473", brand_font, INK)
    return poster


def add_blank_talking_zone(template: Image.Image, slug: str) -> Image.Image:
    draw = ImageDraw.Draw(template, "RGBA")
    config = ASSETS[slug]
    r, g, b = hex_rgb(config["subaccent"])
    draw.rounded_rectangle(
        (118, 435, W - 118, 1505),
        radius=74,
        fill=(*tint(config["background"], 0.16), 225),
        outline=(r, g, b, 210),
        width=7,
    )
    # Small practical safe-zone dots; no words so it stays reusable.
    for x, y in [(155, 472), (W - 155, 472), (155, 1468), (W - 155, 1468)]:
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(r, g, b, 220), outline=INK, width=2)
    return template


def main() -> None:
    for index, (slug, config) in enumerate(ASSETS.items()):
        poster = background(config, 300 + index, with_panels=True)
        add_mascot(poster, config["source"])
        headline, subline = COPY[slug]
        add_copy(poster, headline, subline)
        poster.convert("RGB").save(POSTERS / f"takam_{slug}_modak_post_ready.png", "PNG", optimize=True)

        template = background(config, 300 + index, with_panels=False)
        add_blank_talking_zone(template, slug)
        template.convert("RGB").save(BACKGROUNDS / f"takam_{slug}_modak_background_only.png", "PNG", optimize=True)

    (OUT / "README.txt").write_text(
        "text_filled_posters: complete 1080 x 1920 Instagram posts with Marathi copy.\n"
        "background_only_templates: same colour theme without the mascot or copy; use behind a talking video or real food photo.\n"
    )


if __name__ == "__main__":
    main()
