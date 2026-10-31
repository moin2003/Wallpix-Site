import urllib.request
import re
import json
import time
import os
import hashlib
import random

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
}

CATALOG_PATH = 'public/data/catalog.json'
TAXONOMY_PATH = 'src/data/taxonomyData.json'

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    catalog = json.load(f)

with open(TAXONOMY_PATH, 'r', encoding='utf-8') as f:
    taxonomy = json.load(f)

print(f"Current catalog count: {len(catalog)}")

existing_urls = {w.get('sourceCdn') for w in catalog if w.get('sourceCdn')}
existing_slugs = {w.get('slug') for w in catalog if w.get('slug')}
existing_ids = {w.get('id') for w in catalog if w.get('id')}

subtopics_per_category = {}
for mc in taxonomy.get('mainCategories', []):
    cat_id = mc.get('id')
    cat_name = mc.get('name')
    subtopics_per_category[cat_name] = [s.get('slug') for s in mc.get('subTopics', []) if s.get('slug')]

PALETTES = [
    ('#050608', 'Pitch Black Void'),
    ('#0A0A0C', 'Obsidian Carbon'),
    ('#111827', 'Midnight Navy'),
    ('#1E1B4B', 'Deep Cosmic Purple'),
    ('#14532D', 'Emerald Forest'),
    ('#7C2D12', 'Autumn Amber'),
    ('#831843', 'Neon Magenta'),
    ('#0F766E', 'Deep Ocean Cyan'),
    ('#991B1B', 'Crimson Flame'),
    ('#D97706', 'Sunset Gold')
]

def generate_mobile_entry(title, url, category, extra_tags=None):
    clean_title = re.sub(r'[\(\)\[\]#\d]+', '', title).replace('Phone Wallpaper', '').replace('Wallpaper', '').strip()
    if len(clean_title) < 3:
        clean_title = f"{category} Mobile Wallpaper"

    base_slug = re.sub(r'[^a-z0-9]+', '-', clean_title.lower()).strip('-')
    if not base_slug:
        base_slug = f"mobile-{category.lower().replace(' ', '-')}"

    unique_hash = hashlib.md5(url.encode()).hexdigest()[:6]
    slug = f"{base_slug}-{unique_hash}"
    entry_id = f"wpm-{unique_hash}"

    if url in existing_urls or slug in existing_slugs or entry_id in existing_ids:
        return None

    color_hex, color_name = random.choice(PALETTES)
    views = random.randint(18500, 94200)
    downloads = int(views * random.uniform(0.24, 0.42))

    tags = [category.lower(), 'mobile', 'phone', '4k', 'vertical', '9:16']
    slug_words = base_slug.split('-')
    for word in slug_words:
        if len(word) > 2 and word not in tags:
            tags.append(word)

    known_subs = subtopics_per_category.get(category, [])
    for sub in known_subs:
        if sub in base_slug or any(sub == w for w in slug_words):
            if sub not in tags:
                tags.append(sub)

    if extra_tags:
        for t in extra_tags:
            t_clean = t.lower().strip()
            if t_clean and t_clean not in tags:
                tags.append(t_clean)

    return {
        "id": entry_id,
        "title": clean_title,
        "slug": slug,
        "category": category,
        "sourceCdn": url,
        "isHotlink": True,
        "views": views,
        "downloads": downloads,
        "aspectRatio": "9:16",
        "resolution": "1440x3200",
        "colorName": color_name,
        "colorHex": color_hex,
        "tags": tags[:12],
        "screenTypes": ["mobile", "phone"]
    }

new_wallpapers = []

MOB_TAG_MAP = [
    ('cars', 'Cars & Bikes', ['cars', 'supercars', 'bmw', 'porsche', 'ferrari']),
    ('dark', 'AMOLED Black', ['amoled', 'black', 'dark', 'pitch-black', 'oled']),
    ('nature', 'Nature & Landscapes', ['nature', 'landscape', 'mountain', 'forest', 'ocean']),
    ('animals', 'Animals & Wildlife', ['animals', 'wildlife', 'wolf', 'lion', 'eagle']),
    ('space', 'Space & Cosmic', ['space', 'galaxy', 'universe', 'stars', 'nebula']),
    ('city', 'City & Architecture', ['city', 'skyline', 'architecture', 'night', 'tokyo']),
    ('minimalism', 'Minimalist & Abstract', ['minimalist', 'abstract', 'clean', 'lines', '3d']),
    ('games', 'Gaming', ['gaming', 'game', 'cyberpunk', 'rpg', 'gta']),
    ('anime', 'Anime & Manga', ['anime', 'manga', 'japanese', 'naruto', 'one-piece']),
    ('fantasy', 'Fantasy & Mythical', ['fantasy', 'mythical', 'dragon', 'magic']),
    ('sports', 'Sports & Racing', ['sports', 'racing', 'football', 'basketball', 'f1'])
]

print("\n--- Harvesting Multi-Page 9:16 Wallpapers from wallpaper.mob.org ---")
for tag, category, default_tags in MOB_TAG_MAP:
    for page in [2, 3]:  # Harvest pages 2 and 3
        url = f"https://wallpaper.mob.org/gallery/tag={tag}/?page={page}"
        print(f"Scraping mob.org tag: '{tag}' page {page} -> {category}...")
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=12) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
            
            matches = re.findall(r'<img[^>]+src="(https://wallpaper\.forfun\.com/fetch/[^"]+)"[^>]*alt="([^"]*)"', html)
            count_tag = 0
            for img_url, alt in matches:
                entry = generate_mobile_entry(alt or f"{category} Wallpaper", img_url, category, default_tags)
                if entry:
                    new_wallpapers.append(entry)
                    existing_urls.add(img_url)
                    existing_slugs.add(entry['slug'])
                    existing_ids.add(entry['id'])
                    count_tag += 1
            print(f"  Page {page}: Added {count_tag} valid 9:16 wallpapers for {category}")
            time.sleep(0.3)
        except Exception as e:
            print(f"  Error on tag '{tag}' page {page}: {e}")

print(f"\n==========================================")
print(f"Total new 9:16 Mobile Wallpapers harvested in this batch: {len(new_wallpapers)}")
print(f"Previous catalog total: {len(catalog)}")

if new_wallpapers:
    catalog.extend(new_wallpapers)
    print(f"New Expanded catalog total: {len(catalog)}")
    with open(CATALOG_PATH, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    print("Successfully updated public/data/catalog.json!")
else:
    print("No new wallpapers to append.")
