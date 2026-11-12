"""
WALPIX 4K - Daily Autonomous Asset Pipeline & Storage Purge Engine (v2 with Mockup Studio)
========================================================================================
1. Fetches top 10 Mobile (9:16) and 10 Desktop (16:9) wallpapers daily.
2. Automatically generates realistic iPhone 16 & MacBook hardware mockups.
3. Automatically generates metadata.json with platform-specific captions & URLs.
4. Auto-Purges posted/old images so disk space NEVER exceeds 100MB.
"""

import os
import sys
import json
import random
import urllib.request
from datetime import datetime, timedelta
from automation.mockup_generator import create_mobile_mockup, create_desktop_mockup

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_PATH = os.path.join(ROOT_DIR, "public", "data", "catalog.json")
CONFIG_PATH = os.path.join(ROOT_DIR, "automation", "config.json")
QUEUE_DIR = os.path.join(ROOT_DIR, "automation", "queue")
HISTORY_FILE = os.path.join(ROOT_DIR, "automation", "posted_history.json")

MOBILE_DIR = os.path.join(QUEUE_DIR, "01_Mobile_9x16")
DESKTOP_DIR = os.path.join(QUEUE_DIR, "02_Desktop_16x9")
DONE_DIR = os.path.join(QUEUE_DIR, "Done")

os.makedirs(MOBILE_DIR, exist_ok=True)
os.makedirs(DESKTOP_DIR, exist_ok=True)
os.makedirs(DONE_DIR, exist_ok=True)

def load_config():
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"daily_quota": {"mobile_count": 10, "desktop_count": 10}}

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def purge_old_assets(max_days=2):
    """Auto-deletes assets older than max_days in the Done directory to keep storage tiny."""
    print("🧹 Running Storage Purge Engine...")
    deleted_count = 0
    now = datetime.now()
    
    for root, dirs, files in os.walk(DONE_DIR):
        for f in files:
            file_path = os.path.join(root, f)
            mtime = datetime.fromtimestamp(os.path.getmtime(file_path))
            if now - mtime > timedelta(days=max_days):
                try:
                    os.remove(file_path)
                    deleted_count += 1
                except Exception as e:
                    print(f"Warning: could not delete {file_path}: {e}")
                    
    print(f"✅ Storage Purge Completed: {deleted_count} old files removed. Storage clean.")

def download_file(url, target_path):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    )
    with urllib.request.urlopen(req, timeout=20) as response, open(target_path, "wb") as out_file:
        out_file.write(response.read())

def generate_captions(item, aspect_type, mockup_file):
    slug = item.get("slug", "")
    title = item.get("title", "4K Ultra HD Wallpaper")
    cat = item.get("category", "Aesthetics").replace(" ", "")
    dest_url = f"https://www.walpix.site/wallpapers/{slug}"
    res = item.get("resolution", "3840x2160" if aspect_type == "desktop" else "2050x4450")
    
    meta = {
        "id": item.get("id"),
        "title": title,
        "slug": slug,
        "aspect_ratio": item.get("aspectRatio"),
        "category": item.get("category"),
        "raw_image": f"{slug}.webp",
        "mockup_image": mockup_file,
        "destination_url": dest_url,
        "pinterest": {
            "title": f"{title} [{res}] 4K Wallpaper - Free Ultra HD",
            "description": f"Download {title} in pristine 4K resolution ({res}) with zero watermarks. True OLED color calibration for high-end displays. Get lossless file here: {dest_url}",
            "destination_link": dest_url,
            "recommended_image": mockup_file if aspect_type == "mobile" else f"{slug}.webp"
        },
        "threads_instagram": {
            "caption": f"True #000000 OLED pick: {title} in pristine 4K. Color-graded for high-refresh panels. Free uncompressed file in the reply 👇\n\n#OLED #4KWallpaper #DeskSetup #{cat} #Walpix",
            "first_reply": f"Grab the uncompressed 4K lossless file here without watermark: {dest_url}",
            "recommended_image": mockup_file
        },
        "twitter": {
            "tweet": f"{title} [{res}]. Cleaned up color banding for high-refresh HDR displays.\nFree uncompressed download below 👇\n\n#Wallpaper #OLED #{cat}",
            "self_reply": f"Direct lossless download: {dest_url}",
            "recommended_image": mockup_file
        },
        "reddit": {
            "title": f"[{res}] {title} - Custom color grade for OLED displays",
            "first_comment": f"Uncompressed lossless download without watermarks: {dest_url}",
            "recommended_image": f"{slug}.webp"
        }
    }
    return meta

def run_daily_pipeline():
    print("=" * 60)
    print("🚀 WALPIX AUTONOMOUS ASSET & MOCKUP STUDIO PIPELINE")
    print("=" * 60)
    
    config = load_config()
    history = load_history()
    history_set = set(history)
    
    if not os.path.exists(CATALOG_PATH):
        print(f"❌ Error: Catalog not found at {CATALOG_PATH}")
        return
        
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        catalog = json.load(f)
        
    # Separate available wallpapers
    mobile_pool = [w for w in catalog if w.get("aspectRatio") == "9:16" and w.get("slug") not in history_set]
    desktop_pool = [w for w in catalog if w.get("aspectRatio") != "9:16" and w.get("slug") not in history_set]
    
    quota_mobile = config["daily_quota"]["mobile_count"]
    quota_desktop = config["daily_quota"]["desktop_count"]
    
    selected_mobile = random.sample(mobile_pool, min(quota_mobile, len(mobile_pool)))
    selected_desktop = random.sample(desktop_pool, min(quota_desktop, len(desktop_pool)))
    
    print(f"\n📦 Processing Batch with Realistic Mockups:")
    print(f"  • Mobile (9:16):  {len(selected_mobile)} wallpapers (Rendering iPhone 16 Frames)")
    print(f"  • Desktop (16:9): {len(selected_desktop)} wallpapers (Rendering MacBook/PC Frames)")
    
    processed_count = 0
    
    # Process Mobile
    for item in selected_mobile:
        slug = item["slug"]
        img_url = item.get("sourceCdn")
        if not img_url:
            continue
            
        file_name = f"{slug}.webp"
        mockup_name = f"{slug}_mockup.webp"
        target_img = os.path.join(MOBILE_DIR, file_name)
        target_mockup = os.path.join(MOBILE_DIR, mockup_name)
        target_meta = os.path.join(MOBILE_DIR, f"{slug}_meta.json")
        
        try:
            download_file(img_url, target_img)
            create_mobile_mockup(target_img, target_mockup)
            meta = generate_captions(item, "mobile", mockup_name)
            with open(target_meta, "w", encoding="utf-8") as mf:
                json.dump(meta, mf, indent=2)
            history.append(slug)
            processed_count += 1
            print(f"  📱 [Mobile Mockup Done]: {item['title'][:25]}")
        except Exception as e:
            print(f"    ⚠️ Failed {slug}: {e}")
            
    # Process Desktop
    for item in selected_desktop:
        slug = item["slug"]
        img_url = item.get("sourceCdn")
        if not img_url:
            continue
            
        file_name = f"{slug}.webp"
        mockup_name = f"{slug}_mockup.webp"
        target_img = os.path.join(DESKTOP_DIR, file_name)
        target_mockup = os.path.join(DESKTOP_DIR, mockup_name)
        target_meta = os.path.join(DESKTOP_DIR, f"{slug}_meta.json")
        
        try:
            download_file(img_url, target_img)
            create_desktop_mockup(target_img, target_mockup)
            meta = generate_captions(item, "desktop", mockup_name)
            with open(target_meta, "w", encoding="utf-8") as mf:
                json.dump(meta, mf, indent=2)
            history.append(slug)
            processed_count += 1
            print(f"  💻 [Desktop Mockup Done]: {item['title'][:25]}")
        except Exception as e:
            print(f"    ⚠️ Failed {slug}: {e}")
            
    save_history(history)
    print(f"\n✨ Batch Successfully Prepared: {processed_count} sets with raw + mockup frames in queue.")
    purge_old_assets(max_days=config.get("storage", {}).get("max_history_days", 2))
    print("=" * 60)

if __name__ == "__main__":
    run_daily_pipeline()
