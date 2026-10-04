import urllib.request
import re
import json

urls = [
    'https://www.wallpaperflare.com/',
    'https://wallpapersmax.com/',
    'https://wallpapercat.com/desktop',
    'https://wallspic.com/',
    'https://motionbgs.com/mobile/'
]

for u in urls:
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        imgs = re.findall(r'https?://[^\s"\'><]+?\.(?:webp|jpg|jpeg|png)', html)
        print(f"=== URL: {u} ===")
        print(f"Total image links found: {len(imgs)}")
        domains = set()
        for img in imgs:
            m = re.match(r'https?://([^/]+)', img)
            if m:
                domains.add(m.group(1))
        print(f"CDNs/Domains detected: {list(domains)[:5]}")
        for sample in imgs[:3]:
            print(f"  Sample: {sample}")
    except Exception as e:
        print(f"Failed {u}: {e}")
