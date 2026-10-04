from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1672, 'height': 941})
    
    # 1. Homepage
    print("Navigating to Homepage...")
    page.goto('http://127.0.0.1:4321/', wait_until='domcontentloaded')
    page.evaluate('() => { try { document.fonts.clear(); } catch(e){} }')
    page.wait_for_timeout(1000)
    page.screenshot(path='preview_verified_home.png', timeout=5000)
    print("Homepage saved!")

    # 2. Wallpapers Gallery
    print("Navigating to Gallery...")
    page.goto('http://127.0.0.1:4321/wallpapers', wait_until='domcontentloaded')
    page.wait_for_timeout(1000)
    page.screenshot(path='preview_verified_gallery.png', timeout=5000)
    print("Gallery saved!")

    # 3. Detail Page
    print("Navigating to Detail...")
    page.goto('http://127.0.0.1:4321/wallpapers/cyberpunk-neon-city-skyline-1', wait_until='domcontentloaded')
    page.wait_for_timeout(1000)
    page.screenshot(path='preview_verified_detail.png', timeout=5000)
    print("Detail saved!")

    browser.close()
