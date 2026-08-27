"""Create an editor-friendly portrait green-screen Modak keyframe for video generation."""

from pathlib import Path
import sys

from PIL import Image

sys.path.insert(0, "/home/ubuntu/takam-website")
from build_modak_social_posters import remove_green_key

SOURCE = Path("/home/ubuntu/webdev-static-assets/takam_modak_dink_v2.png")
DESTINATION = Path("/home/ubuntu/webdev-static-assets/takam_modak_transition_keyframe.png")
KEY_GREEN = (0, 255, 0, 255)


def main() -> None:
    mascot = remove_green_key(Image.open(SOURCE))
    canvas = Image.new("RGBA", (1080, 1920), KEY_GREEN)
    target_height = 1120
    ratio = target_height / mascot.height
    mascot = mascot.resize((int(mascot.width * ratio), target_height), Image.Resampling.LANCZOS)
    x = (canvas.width - mascot.width) // 2
    y = 665
    canvas.alpha_composite(mascot, (x, y))
    canvas.convert("RGB").save(DESTINATION, "PNG", optimize=True)


if __name__ == "__main__":
    main()
