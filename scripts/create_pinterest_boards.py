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
    print("🚀 WALPIX - PINTEREST EXACT UI BOARD AUTOMATION")
    print("=" * 60)
    print(f"Total boards to create: {len(BOARDS)}")

    with sync_playwright() as p:
        user_data_dir = "./scripts/pinterest_session"
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            viewport={'width': 1366, 'height': 860},
            args=["--disable-blink-features=AutomationControlled"]
        )

        page = context.new_page()
        page.goto("https://www.pinterest.com/", wait_until="domcontentloaded")
        time.sleep(3)

        print("\nChecking login status...")
        # Check if user needs to login or is already logged in
        # If not on profile, guide or wait
        profile_detected = False
        for _ in range(60):
            if page.locator('div[data-test-id="header-profile"]').count() > 0 or '/_saved' in page.url or 'Create' in page.content():
                profile_detected = True
                break
            time.sleep(1)

        if not profile_detected:
            print("👉 Please log into your Pinterest account in the opened window...")
            print("Waiting for login...")
            while True:
                time.sleep(2)
                if 'Create' in page.content() or page.locator('div[data-test-id="header-profile"]').count() > 0:
                    break

        print("✅ Logged in successfully!")

        # Make sure we are on the Profile -> Saved page
        print("Ensuring we are on Profile (Saved tab)...")
        header_profile = page.locator('div[data-test-id="header-profile"], a[data-test-id="header-profile"], button[aria-label*="profile" i]').first
        if header_profile.count() > 0:
            header_profile.click()
            time.sleep(3)

        # Click 'Saved' tab if visible
        saved_tab = page.locator('button:has-text("Saved"), a:has-text("Saved"), div[role="tab"]:has-text("Saved")').first
        if saved_tab.count() > 0 and saved_tab.is_visible():
            saved_tab.click()
            time.sleep(2)

        saved_url = page.url
        print(f"Profile Saved URL: {saved_url}")

        created_count = 0

        for i, board_name in enumerate(BOARDS, 1):
            print(f"\n[{i}/{len(BOARDS)}] Processing: '{board_name}'...")

            # 1. Look for 'Create' floating button (black pill button on right)
            clicked_create = False
            
            # Direct text search for Create button
            create_candidates = [
                page.locator('button:has-text("Create")').last,
                page.locator('div[role="button"]:has-text("Create")').last,
                page.locator('[data-test-id*="create"]').first,
                page.locator('button[aria-label*="Create"]').last
            ]

            for btn in create_candidates:
                try:
                    if btn.count() > 0 and btn.is_visible():
                        btn.click()
                        clicked_create = True
                        break
                except Exception:
                    continue

            if not clicked_create:
                # If cannot find, click the red circle / floating button on right
                try:
                    red_btn = page.locator('button:has(svg), div:has(svg)').filter(has_text="").last
                    page.mouse.click(1300, 680) # Click near bottom right where Create sits
                    time.sleep(1)
                except Exception:
                    pass

            time.sleep(1)

            # 2. Click 'Board' in the popup menu (Pin / Board / Collage)
            board_item = page.locator('div:text-is("Board"), span:text-is("Board"), div[role="menuitem"]:has-text("Board")').first
            if board_item.count() > 0 and board_item.is_visible():
                board_item.click()
                time.sleep(1.5)
            else:
                # Try clicking any text 'Board' visible
                any_board = page.get_by_text("Board", exact=True).first
                if any_board.count() > 0 and any_board.is_visible():
                    any_board.click()
                    time.sleep(1.5)
                else:
                    print(f"  ❌ 'Board' option not visible in menu for: {board_name}")
                    continue

            # 3. Handle Create board Modal dialog
            try:
                # Find the input inside dialog
                dialog = page.locator('div[role="dialog"]').first
                if dialog.count() == 0:
                    dialog = page

                # Find input
                name_input = dialog.locator('input[type="text"], input#boardEditName, input[placeholder*="Like"], input[name="name"]').first
                if name_input.count() > 0:
                    name_input.click()
                    name_input.fill("")
                    name_input.type(board_name, delay=25)
                    time.sleep(0.5)

                    # Click 'Create' button inside modal
                    modal_create_btn = dialog.locator('button:has-text("Create")').last
                    if modal_create_btn.count() > 0 and modal_create_btn.is_visible():
                        modal_create_btn.click()
                        print(f"  ✅ Successfully created board: '{board_name}'")
                        created_count += 1
                        time.sleep(3)

                        # Check for secondary 'Save pins to your new board' modal
                        for _ in range(3):
                            done_btn = page.locator('button:has-text("Done"), button[aria-label="Close"], button:has-text("Cancel")').first
                            if done_btn.count() > 0 and done_btn.is_visible():
                                done_btn.click()
                                time.sleep(1)
                                break
                            time.sleep(1)
                    else:
                        print(f"  ❌ Modal Create submit button not found for: {board_name}")
                else:
                    print(f"  ❌ Name input field not found for: {board_name}")

            except Exception as e:
                print(f"  ⚠️ Error while creating '{board_name}': {e}")

            # 4. Return back to Saved tab for the next board
            if not page.url.endswith('/_saved/') and not page.url.endswith('/saved/'):
                page.goto(saved_url, wait_until="domcontentloaded")
                time.sleep(2)

        print("\n" + "=" * 60)
        print(f"🎉 COMPLETED! Created {created_count}/{len(BOARDS)} boards.")
        print("=" * 60)
        time.sleep(3)
        context.close()

if __name__ == "__main__":
    run()
