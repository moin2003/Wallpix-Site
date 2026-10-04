import asyncio
import json
from playwright.async_api import async_playwright

COMPETITORS = [
    {"name": "WallpapersMax", "url": "https://wallpapersmax.com/"},
    {"name": "WallpaperCat", "url": "https://wallpapercat.com/desktop"},
    {"name": "Xtrafondos", "url": "https://www.xtrafondos.com/en/"},
    {"name": "Wallspic", "url": "https://wallspic.com/"},
    {"name": "MotionBGS", "url": "https://motionbgs.com/mobile/"},
    {"name": "WallpaperCave", "url": "https://wallpapercave.com/"},
    {"name": "WallpaperFlare", "url": "https://www.wallpaperflare.com/"}
]

async def analyze_site(browser, site):
    context = await browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    page = await context.new_page()
    
    network_data = {
        "site": site["name"],
        "url": site["url"],
        "image_cdns": set(),
        "api_endpoints": set(),
        "ad_networks": set(),
        "sample_wallpapers": []
    }

    # Intercept all network traffic
    page.on("request", lambda req: handle_request(req, network_data))
    
    try:
        print(f"[*] Navigating to {site['name']} ({site['url']})...")
        await page.goto(site["url"], wait_until="domcontentloaded", timeout=25000)
        await page.wait_for_timeout(3000) # Wait for lazy loaded elements
        
        # Extract images from DOM
        images = await page.evaluate('''() => {
            const results = [];
            const imgs = document.querySelectorAll('img, a[href*=".jpg"], a[href*=".png"], a[href*=".webp"]');
            imgs.forEach(el => {
                const src = el.getAttribute('data-src') || el.getAttribute('data-original') || el.getAttribute('data-full') || el.src || el.href;
                const alt = el.alt || el.title || el.innerText || '';
                if (src && src.match(/\\.(webp|jpg|jpeg|png)/i) && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
                    results.push({ src: src, title: alt.trim() });
                }
            });
            return results.slice(0, 5);
        }''')
        network_data["sample_wallpapers"] = images

        # Check for AdSense and Ad Networks in DOM/Scripts
        has_adsense = await page.evaluate('''() => {
            return {
                has_adsbygoogle: !!window.adsbygoogle || !!document.querySelector('.adsbygoogle') || !!document.querySelector('script[src*="adsbygoogle"]'),
                has_ad_containers: !!document.querySelector('[id*="ad-"], [class*="ad-"], [id*="google_ads"], ins.adsbygoogle'),
                has_related_search: !!document.querySelector('[id*="afs"], [class*="search-suggest"], [class*="discover"]')
            }
        }''')
        network_data["ad_inspection"] = has_adsense
        
    except Exception as e:
        network_data["error"] = str(e)
        print(f"[-] Error visiting {site['name']}: {e}")
    finally:
        await context.close()

    network_data["image_cdns"] = list(network_data["image_cdns"])
    network_data["api_endpoints"] = list(network_data["api_endpoints"])
    network_data["ad_networks"] = list(network_data["ad_networks"])
    return network_data

def handle_request(req, data):
    url = req.url
    resource_type = req.resource_type
    
    # Identify CDNs
    if resource_type == "image" or any(url.endswith(ext) for ext in [".jpg", ".jpeg", ".webp", ".png"]):
        try:
            from urllib.parse import urlparse
            domain = urlparse(url).netloc
            if domain and not any(ignored in domain for ignored in ["google", "doubleclick", "facebook", "clarity", "analytics", "fontawesome"]):
                data["image_cdns"].add(domain)
        except:
            pass

    # Identify APIs / XHR
    if resource_type in ["fetch", "xhr"]:
        if any(keyword in url for keyword in ["api", "graphql", "feed", "search", "wallpapers", "get", "load"]):
            data["api_endpoints"].add(url[:120])

    # Identify Ad networks
    if any(ad_net in url for ad_net in ["googlesyndication", "doubleclick", "adsbygoogle", "adnxs", "criteo", "amazon-adsystem", "ezoic", "mediavine"]):
        data["ad_networks"].add(url.split("?")[0][:80])

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        results = []
        for site in COMPETITORS:
            data = await analyze_site(browser, site)
            results.append(data)
        await browser.close()

        with open(".agent/scripts/competitors_analysis_report.json", "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print("\n[SUCCESS] Deep analysis complete! Report saved to .agent/scripts/competitors_analysis_report.json")

if __name__ == "__main__":
    asyncio.run(main())
