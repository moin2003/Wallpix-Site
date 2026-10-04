"""
Competitor Wallpaper Auto-Embedder & Ingestion Engine
Fetches high-resolution wallpapers directly from top competitors
(WallpaperCat, Wallspic, Xtrafondos, MotionBGS, WallpaperCave)
and adds them to our live site catalog with zero local storage.
"""

import json
import asyncio
from playwright.async_api import async_playwright
from pathlib import Path

CATALOG_PATH = Path("public/data/catalog.json")

TARGET_COMPETITOR_FEEDS = [
    {
        "name": "WallpaperCat",
        "category": "Anime & 4K",
        "url": "https://wallpapercat.com/desktop",
        "selector": "img"
    },
    {
        "name": "Wallspic",
        "category": "Aesthetic & AMOLED",
        "url": "https://wallspic.com/",
        "selector": "img"
    },
    {
        "name": "MotionBGS",
        "category": "Live & Mobile 4K",
        "url": "https://motionbgs.com/mobile/",
        "selector": "img"
    }
]

async def scrape_competitor(browser, feed):
    page = await browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    wallpapers = []
    try:
        print(f"[*] Ingesting wallpapers from competitor: {feed['name']}...")
        await page.goto(feed["url"], wait_until="domcontentloaded", timeout=30000)
        await page.wait_for_timeout(3000)

        items = await page.evaluate('''() => {
            const list = [];
            const elements = document.querySelectorAll('img, a[href*=".jpg"], a[href*=".webp"]');
            elements.forEach(el => {
                const src = el.getAttribute('data-src') || el.getAttribute('data-original') || el.src || el.href;
                let title = el.alt || el.title || el.innerText || '';
                if (src && (src.includes('.jpg') || src.includes('.webp') || src.includes('.png')) && !src.includes('logo') && !src.includes('icon')) {
                    if (!title || title.length < 3) {
                        const parts = src.split('/');
                        title = parts[parts.length - 1].replace(/[-_\\.]/g, ' ').replace(/jpg|webp|png|\\d+/gi, '').trim();
                    }
                    list.push({
                        title: title || "Ultra HD 4K Wallpaper",
                        src: src
                    });
                }
            });
            return list;
        }''')

        for item in items[:25]: # Grab top items
            slug = item["title"].lower().replace(" ", "-").replace("/", "-")[:40]
            wallpapers.append({
                "id": f"wp-{feed['name'].lower()}-{len(wallpapers)+1}",
                "title": item["title"].title(),
                "slug": slug,
                "category": feed["category"],
                "sourceCdn": item["src"],
                "isHotlink": True,
                "views": 1200,
                "downloads": 650,
                "aspectRatio": "16:9"
            })
            
    except Exception as e:
        print(f"[-] Failed {feed['name']}: {e}")
    finally:
        await page.close()
        
    return wallpapers

async def main():
    CATALOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    all_wallpapers = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for feed in TARGET_COMPETITOR_FEEDS:
            res = await scrape_competitor(browser, feed)
            all_wallpapers.extend(res)
        await browser.close()

    with open(CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(all_wallpapers, f, indent=2, ensure_ascii=False)
        
    print(f"\n[SUCCESS] Ingested {len(all_wallpapers)} competitor wallpapers into: {CATALOG_PATH}")

if __name__ == "__main__":
    asyncio.run(main())
