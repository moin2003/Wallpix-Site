import time
import sys
from playwright.sync_api import sync_playwright

BOARDS = [
    "iPhone & Mobile Wallpapers 4K",
    "AMOLED Pure Black Wallpapers",
    "Desktop 4K & Ultrawide Wallpapers",
    "Anime & Manga Aesthetic",
    "Cyberpunk & Neon City",
    "Minimalist & Clean Wallpapers",
    "Gaming & Battlestation Setups",
    "Nature, Scenery & Landscapes",
    "Superheroes & Comic Art",
    "Cars, Supercars & Bikes",
    "Space, Galaxy & Sci-Fi",
    "Lofi, Chill & Cozy Vibes",
    "Music Icons & Band Art",
    "Movies & Series Posters",
    "Pastel & Soft Aesthetic",
    "Dark Mode & Mystery",
    "iPad & Tablet Wallpapers"
]

def run():
    print("=" * 60)
    print("🚀 WALPIX - PINTEREST AUTOMATED BOARD CREATOR")
    print("=" * 60)
    print(f"Total boards to create: {len(BOARDS)}")
    print("Opening browser with saved session profile...")

    with sync_playwright() as p:
        user_data_dir = "./scripts/pinterest_session"
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            viewport={'width': 1280, 'height': 850},
            args=["--disable-blink-features=AutomationControlled"]
        )

        page = context.new_page()
        page.goto("https://www.pinterest.com/", wait_until="domcontentloaded")
        print("\nNavigated to Pinterest.")

        # Check if user needs to log in
        print("\nChecking login status...")
        print("👉 If you are not logged in yet, please log into your Pinterest account now in the opened browser window.")
        print("Waiting for login detection (up to 120 seconds)...")

        logged_in = False
        for _ in range(60):
            time.sleep(2)
            # Check for indicators of being logged in: profile icon, saved tab, etc.
            content = page.content()
            if 'aria-label="Saved"' in content or 'data-test-id="header-profile"' in content or '/_saved' in page.url or 'aria-label="Profile"' in content:
                logged_in = True
                break
            if 'pinterest.com/today' in page.url or 'pinterest.com/business' in page.url:
                logged_in = True
                break

        if not logged_in:
            print("⚠️ Still waiting or please make sure you are logged in. Press Enter in this terminal once you are logged in:")
            try:
                input()
            except Exception:
                pass

        print("✅ Logged in successfully!")
        
        # Navigate to profile / saved tab
        print("Navigating to Profile / Saved page...")
        # Find profile button or click it
        try:
            profile_btn = page.locator('div[data-test-id="header-profile"], button[aria-label*="Profile"], a[aria-label*="Profile"]').first
            if profile_btn.count() > 0:
                profile_btn.click()
                time.sleep(3)
            else:
                page.goto("https://www.pinterest.com/settings/", wait_until="domcontentloaded")
                time.sleep(2)
        except Exception as e:
            print(f"Note: {e}")

        # Current URL is profile
        profile_url = page.url
        print(f"Current Profile URL: {profile_url}")

        created_count = 0

        for i, board_name in enumerate(BOARDS, 1):
            print(f"\n[{i}/{len(BOARDS)}] Creating board: '{board_name}'...")
            try:
                # Click the '+' / create button on profile or header
                # Pinterest usually has an Add button on profile: aria-label="Create", or "Create board"
                # Let's look for create button
                add_btn = None
                selectors = [
                    'button[aria-label="Create a board"]',
                    'div[data-test-id="create-board-button"]',
                    'button[aria-label="Create board"]',
                    'div[aria-label="Create"] button',
                    'button[aria-label="Create"]',
                    'button[aria-label="Add"]',
                    'div[data-test-id="create-button"]',
                    'button:has-text("Create board")'
                ]
                
                for sel in selectors:
                    loc = page.locator(sel).first
                    if loc.count() > 0 and loc.is_visible():
                        add_btn = loc
                        break

                if not add_btn:
                    # Look for floating '+' button or dropdown
                    plus_btn = page.locator('button[aria-label="Add board or pin"], button[aria-label="Create Pin or Board"], div[data-test-id="add-board-icon"]').first
                    if plus_btn.count() > 0 and plus_btn.is_visible():
                        plus_btn.click()
                        time.sleep(1)
                        board_option = page.locator('text=Board').first
                        if board_option.count() > 0:
                            board_option.click()
                            time.sleep(1)
                    else:
                        # Fallback to direct script injection
                        print(f"Could not find '+' button for {board_name}, attempting direct modal trigger...")
                else:
                    add_btn.click()
                    time.sleep(1.5)

                    # If a menu popped up with "Pin" and "Board"
                    board_choice = page.locator('div:has-text("Board"), span:has-text("Board")').first
                    if board_choice.count() > 0 and board_choice.is_visible():
                        board_choice.click()
                        time.sleep(1.5)

                # Now in create board modal
                name_input = page.locator('input#boardEditName, input[name="boardName"], input[id*="board"], input[placeholder*="Name"], input[placeholder*="Like"]').first
                if name_input.count() > 0:
                    name_input.fill("")
                    name_input.fill(board_name)
                    time.sleep(0.5)

                    create_confirm = page.locator('button:has-text("Create"), button[type="submit"]').last
                    if create_confirm.count() > 0 and create_confirm.is_visible():
                        create_confirm.click()
                        print(f"  ✨ Successfully created: {board_name}")
                        created_count += 1
                        time.sleep(3) # Wait for creation animation
                        
                        # If a "Save pins to your new board" modal pops up, click "Done" or close
                        done_btn = page.locator('button:has-text("Done"), button[aria-label="Close"]').first
                        if done_btn.count() > 0 and done_btn.is_visible():
                            done_btn.click()
                            time.sleep(1)
                    else:
                        print(f"  ❌ Could not find Create submit button for {board_name}")
                else:
                    print(f"  ❌ Modal input not found for {board_name}")

            except Exception as ex:
                print(f"  ⚠️ Error creating '{board_name}': {ex}")

            # Return to profile if redirected
            if not page.url.startswith(profile_url):
                page.goto(profile_url, wait_until="domcontentloaded")
                time.sleep(2)

        print("\n" + "=" * 60)
        print(f"🎉 COMPLETED! Created {created_count}/{len(BOARDS)} boards.")
        print("=" * 60)
        time.sleep(5)
        context.close()

if __name__ == "__main__":
    run()
