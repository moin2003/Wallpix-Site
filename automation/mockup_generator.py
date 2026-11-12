"""
WALPIX 4K - High-Precision Standalone Mockup Studio Engine
==========================================================
Generates realistic device mockup frames for wallpapers without browser dependencies:
1. Mobile Mockup (iPhone 16 Pro Max Style):
   - Titanium rounded body, Dynamic Island notch, realistic clock overlay.
2. Desktop Mockup (MacBook Pro / Pro Display XDR Style):
   - Aluminum unibody, thin bezels, desktop display base, subtle screen reflection.
Outputs pristine WebP/PNG ready for Pinterest, Instagram, Threads & X.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_mobile_mockup(wallpaper_path, output_path):
    """Wraps a 9:16 mobile wallpaper into an ultra-realistic iPhone 16 Pro frame."""
    canvas_w, canvas_h = 1080, 1920
    # Elegant dark studio background
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (11, 15, 25, 255))
    
    # Phone frame dimensions
    phone_w, phone_h = 820, 1680
    phone_x = (canvas_w - phone_w) // 2
    phone_y = (canvas_h - phone_h) // 2
    corner_radius = 65
    
    # Load and crop wallpaper to fit screen
    screen_w, screen_h = phone_w - 24, phone_h - 24
    screen_x, screen_y = phone_x + 12, phone_y + 12
    
    try:
        wp = Image.open(wallpaper_path).convert("RGBA")
        wp_ratio = wp.width / wp.height
        screen_ratio = screen_w / screen_h
        
        if wp_ratio > screen_ratio:
            # Wallpaper is wider
            new_h = screen_h
            new_w = int(screen_h * wp_ratio)
        else:
            # Wallpaper is taller
            new_w = screen_w
            new_h = int(screen_w / wp_ratio)
            
        wp_resized = wp.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Center crop
        crop_left = (new_w - screen_w) // 2
        crop_top = (new_h - screen_h) // 2
        wp_cropped = wp_resized.crop((crop_left, crop_top, crop_left + screen_w, crop_top + screen_h))
    except Exception as e:
        print(f"Error loading wallpaper: {e}")
        wp_cropped = Image.new("RGBA", (screen_w, screen_h), (20, 24, 39, 255))
        
    # Create mask for rounded corners on screen
    screen_mask = Image.new("L", (screen_w, screen_h), 0)
    mask_draw = ImageDraw.Draw(screen_mask)
    mask_draw.rounded_rectangle((0, 0, screen_w, screen_h), radius=corner_radius - 8, fill=255)
    
    # Soft drop shadow behind phone
    shadow = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle((phone_x - 10, phone_y + 20, phone_x + phone_w + 10, phone_y + phone_h + 35), radius=corner_radius + 5, fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, shadow)
    
    # Outer Titanium Bezel
    c_draw = ImageDraw.Draw(canvas)
    c_draw.rounded_rectangle((phone_x, phone_y, phone_x + phone_w, phone_y + phone_h), radius=corner_radius, fill=(35, 38, 48, 255), outline=(90, 95, 115, 255), width=3)
    
    # Paste Wallpaper Screen
    canvas.paste(wp_cropped, (screen_x, screen_y), screen_mask)
    
    # Overlay: Dynamic Island
    notch_w, notch_h = 160, 42
    notch_x = (canvas_w - notch_w) // 2
    notch_y = screen_y + 22
    c_draw.rounded_rectangle((notch_x, notch_y, notch_x + notch_w, notch_y + notch_h), radius=21, fill=(0, 0, 0, 255))
    
    # Overlay: Aesthetic Minimalist Lock Screen Clock
    c_draw.text((canvas_w // 2, screen_y + 115), "09:41", fill=(255, 255, 255, 230), anchor="mm")
    c_draw.text((canvas_w // 2, screen_y + 80), "Wednesday, November 12", fill=(255, 255, 255, 180), anchor="mm")
    
    # Subtle Home Bar
    bar_w, bar_h = 180, 5
    bar_x = (canvas_w - bar_w) // 2
    bar_y = screen_y + screen_h - 25
    c_draw.rounded_rectangle((bar_x, bar_y, bar_x + bar_w, bar_y + bar_h), radius=3, fill=(255, 255, 255, 160))
    
    canvas.convert("RGB").save(output_path, "WEBP", quality=92)
    return output_path

def create_desktop_mockup(wallpaper_path, output_path):
    """Wraps a 16:9 desktop wallpaper into an ultra-realistic MacBook / Gaming Display frame."""
    canvas_w, canvas_h = 1920, 1080
    # Luxury dark studio gradient background
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (11, 15, 25, 255))
    
    screen_w, screen_h = 1440, 900
    screen_x = (canvas_w - screen_w) // 2
    screen_y = 65
    corner_radius = 24
    
    try:
        wp = Image.open(wallpaper_path).convert("RGBA")
        wp_ratio = wp.width / wp.height
        screen_ratio = screen_w / screen_h
        
        if wp_ratio > screen_ratio:
            new_h = screen_h
            new_w = int(screen_h * wp_ratio)
        else:
            new_w = screen_w
            new_h = int(screen_w / wp_ratio)
            
        wp_resized = wp.resize((new_w, new_h), Image.Resampling.LANCZOS)
        crop_left = (new_w - screen_w) // 2
        crop_top = (new_h - screen_h) // 2
        wp_cropped = wp_resized.crop((crop_left, crop_top, crop_left + screen_w, crop_top + screen_h))
    except Exception as e:
        print(f"Error loading wallpaper: {e}")
        wp_cropped = Image.new("RGBA", (screen_w, screen_h), (20, 24, 39, 255))
        
    screen_mask = Image.new("L", (screen_w, screen_h), 0)
    mask_draw = ImageDraw.Draw(screen_mask)
    mask_draw.rounded_rectangle((0, 0, screen_w, screen_h), radius=corner_radius, fill=255)
    
    # Display Outer Bezel
    bezel_pad = 18
    bezel_w = screen_w + (bezel_pad * 2)
    bezel_h = screen_h + (bezel_pad * 2)
    bezel_x = screen_x - bezel_pad
    bezel_y = screen_y - bezel_pad
    
    # Soft Drop Shadow
    shadow = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle((bezel_x - 15, bezel_y + 15, bezel_x + bezel_w + 15, bezel_y + bezel_h + 30), radius=corner_radius + 10, fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(35))
    canvas = Image.alpha_composite(canvas, shadow)
    
    c_draw = ImageDraw.Draw(canvas)
    c_draw.rounded_rectangle((bezel_x, bezel_y, bezel_x + bezel_w, bezel_y + bezel_h), radius=corner_radius + 6, fill=(28, 30, 38, 255), outline=(75, 80, 95, 255), width=2)
    
    # Paste Screen
    canvas.paste(wp_cropped, (screen_x, screen_y), screen_mask)
    
    # Laptop Base / Stand
    base_w = bezel_w + 140
    base_h = 24
    base_x = (canvas_w - base_w) // 2
    base_y = bezel_y + bezel_h - 2
    c_draw.rounded_rectangle((base_x, base_y, base_x + base_w, base_y + base_h), radius=10, fill=(50, 54, 66, 255), outline=(85, 90, 105, 255), width=2)
    
    # Notch in base
    notch_w = 120
    notch_x = (canvas_w - notch_w) // 2
    c_draw.rounded_rectangle((notch_x, base_y, notch_x + notch_w, base_y + 8), radius=4, fill=(20, 22, 28, 255))
    
    canvas.convert("RGB").save(output_path, "WEBP", quality=92)
    return output_path

if __name__ == "__main__":
    print("WALPIX Standalone Mockup Studio Engine Ready.")
