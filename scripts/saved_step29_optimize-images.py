"""
Automated Wallpaper Batch Optimizer & Metadata Extractor
Converts images to WebP/AVIF, generates multi-resolutions (4K, 1080p, Mobile, Thumb),
extracts dominant color palette, and writes structured JSON catalog.

Prerequisites:
  pip install pillow
"""

import os
import sys
import json
from pathlib import Path
from PIL import Image

RESOLUTIONS = {
    "4k": (3840, 2160),
    "1080p": (1920, 1080),
    "mobile": (1440, 3200),
    "thumb": (480, 854)
}

def get_dominant_color(pil_img):
    """Calculates dominant hex color from image thumbnail."""
    img = pil_img.copy()
    img = img.convert("RGB")
    img = img.resize((1, 1), resample=0)
    dominant_color = img.getpixel((0, 0))
    return f"#{dominant_color[0]:02x}{dominant_color[1]:02x}{dominant_color[2]:02x}"

def process_single_image(image_path: Path, output_dir: Path):
    try:
        with Image.open(image_path) as img:
            base_name = image_path.stem.lower().replace(" ", "-")
            dominant_hex = get_dominant_color(img)
            
            # Create subfolders for formats
            for key in RESOLUTIONS:
                (output_dir / key).mkdir(parents=True, exist_ok=True)
                
            # Generate WebP renditions
            output_files = {}
            for res_name, (target_w, target_h) in RESOLUTIONS.items():
                out_file = output_dir / res_name / f"{base_name}.webp"
                
                # Copy & resize preserving aspect ratio or fill crop
                resized_img = img.copy()
                resized_img.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)
                
                quality = 88 if res_name == "4k" else (75 if res_name == "thumb" else 82)
                resized_img.save(out_file, "WEBP", quality=quality, optimize=True)
                output_files[res_name] = str(out_file.as_posix())

            metadata = {
                "id": f"wp-{base_name}",
                "title": image_path.stem.replace("-", " ").replace("_", " ").title(),
                "slug": base_name,
                "dominantColor": dominant_hex,
                "originalSize": {
                    "width": img.width,
                    "height": img.height
                },
                "files": output_files
            }
            return metadata
    except Exception as e:
        print(f"[ERROR] Failed to process {image_path}: {e}")
        return None

def main():
    input_folder = Path(sys.argv[1] if len(sys.argv) > 1 else "./raw_wallpapers")
    output_folder = Path(sys.argv[2] if len(sys.argv) > 2 else "./public/wallpapers")
    
    if not input_folder.exists():
        print(f"Input directory '{input_folder}' does not exist. Creating directory...")
        input_folder.mkdir(parents=True, exist_ok=True)
        print(f"Place your wallpaper images in '{input_folder}' and run this script again.")
        return

    output_folder.mkdir(parents=True, exist_ok=True)
    all_metadata = []
    
    valid_exts = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
    images = [p for p in input_folder.iterdir() if p.suffix.lower() in valid_exts]
    
    print(f"Found {len(images)} images to process...")
    for img_path in images:
        print(f"Processing: {img_path.name}")
        meta = process_single_image(img_path, output_folder)
        if meta:
            all_metadata.append(meta)

    catalog_path = output_folder / "catalog.json"
    with open(catalog_path, "w", encoding="utf-8") as f:
        json.dump(all_metadata, f, indent=2)
        
    print(f"[SUCCESS] Processed {len(all_metadata)} wallpapers. Metadata saved to: {catalog_path}")

if __name__ == "__main__":
    main()
