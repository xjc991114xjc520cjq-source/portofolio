"""Create web derivatives without changing the supplied artwork or source files."""
import argparse
from pathlib import Path
from PIL import Image, ImageOps

ASSETS = {
    "094819_934b3c94": "speaker-rock-hero",
    "093331_9e3c7163": "speaker-product-master",
    "115620_de811395": "speaker-material-macro",
    "104405_546769ef": "speaker-hiking-carry",
    "113114_d6d842e8": "speaker-car-camp",
    "113404_1a3900c4": "speaker-category-cover",
    "142502_daa0436b": "speaker-commerce-hero",
    "143552_632d4ba8": "speaker-commerce-outdoor",
    "145027_acb5a1a8": "speaker-commerce-control",
    "150039_f221c7cb": "speaker-commerce-impact",
    "150341_4efb15c9": "speaker-commerce-friends",
    "151211_0a8c8440": "speaker-commerce-fitness",
    "152234_b1325a18": "speaker-commerce-night",
    "154654_fd17f5fd": "speaker-commerce-everyday",
}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", type=Path, default=Path("public/assets/projects/outdoor-speaker"))
    args = parser.parse_args()
    source_files = list(args.source.glob("*.jpg"))
    matches = {key: [p for p in source_files if key in p.name] for key in ASSETS}
    if any(len(files) != 1 for files in matches.values()):
        parser.error("Every selected source must resolve to exactly one image.")
    args.output.mkdir(parents=True, exist_ok=True)
    for key, name in ASSETS.items():
        with Image.open(matches[key][0]) as original:
            picture = ImageOps.exif_transpose(original).convert("RGB")
            picture.thumbnail((2560, 2560), Image.Resampling.LANCZOS)
            target = args.output / f"{name}.webp"
            picture.save(target, "WEBP", quality=91, method=6)
            print(f"{target.name}: {picture.width}x{picture.height}, {target.stat().st_size:,} bytes")

if __name__ == "__main__":
    main()
