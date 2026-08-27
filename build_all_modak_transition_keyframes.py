"""Export clean green-screen portrait keyframes for every Ganapati Modak mascot."""

from pathlib import Path
import sys

from PIL import Image

sys.path.insert(0, "/home/ubuntu/takam-website")
from build_modak_social_posters import remove_green_key

ROOT = Path("/home/ubuntu/webdev-static-assets")
OUT = Path("/home/ubuntu/takam_motion_assets/flavour_keyframes")
OUT.mkdir(parents=True, exist_ok=True)
KEY_GREEN = (0, 255, 0, 255)

SOURCES = {
    "dink": ROOT / "takam_modak_dink_v2.png",
    "nachni": ROOT / "takam_modak_nachni_v2.png",
    "dryfruit": ROOT / "takam_modak_dryfruit_v2.png",
    "beet": ROOT / "takam_modak_beet_v2.png",
    "poshtik": ROOT / "takam_modak_poshtik_v2.png",
    "tilkund": ROOT / "takam_modak_tilkund_v2.png",
    "gulkand": ROOT / "takam_modak_gulkand_v2.png",
}


def main() -> None:
    for slug, source in SOURCES.items():
        mascot = remove_green_key(Image.open(source))
        canvas = Image.new("RGBA", (1080, 1920), KEY_GREEN)
        target_height = 1120
        scale = target_height / mascot.height
        mascot = mascot.resize((int(mascot.width * scale), target_height), Image.Resampling.LANCZOS)
        x = (canvas.width - mascot.width) // 2
        y = 665
        canvas.alpha_composite(mascot, (x, y))
        canvas.convert("RGB").save(OUT / f"takam_{slug}_modak_keyframe.png", "PNG", optimize=True)


if __name__ == "__main__":
    main()
