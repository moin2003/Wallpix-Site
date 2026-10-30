// =========================================================================
// 🚀 WALPIX - 1-CLICK PINTEREST BOARD CREATOR (SUPER FAST)
// =========================================================================
// নির্দেশিকা:
// ১. আপনার ব্রাউজারে যেখানে Pinterest ইতিমধ্যে লগইন করা আছে, সেখানে যান (https://www.pinterest.com/)
// ২. কীবোর্ডে F12 চাপুন অথবা রাইট ক্লিক করে "Inspect" -> "Console" ট্যাবে যান।
// ৩. নিচের সম্পূর্ণ কোডটি কপি করে Console-এ পেস্ট করে Enter চাপুন।
// ৪. মাত্র ২৫-৩০ সেকেন্ডের মধ্যে সবগুলো ১৭টি বোর্ড স্বয়ংক্রিয়ভাবে তৈরি হয়ে যাবে!
// =========================================================================

(async function createAllBoards() {
  const boards = [
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
  ];

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  const csrfToken = getCookie('csrftoken');
  if (!csrfToken) {
    console.error("❌ CSRF Token পাওয়া যায়নি। অনুগ্রহ করে নিশ্চিত করুন আপনি Pinterest-এ লগইন অবস্থায় আছেন।");
    return;
  }

  console.log(`🚀 বোর্ড তৈরি শুরু হচ্ছে... মোট বোর্ড: ${boards.length}টি`);
  console.log("--------------------------------------------------");

  let successCount = 0;

  for (let i = 0; i < boards.length; i++) {
    const boardName = boards[i];
    console.log(`[${i + 1}/${boards.length}] তৈরি হচ্ছে: "${boardName}"...`);

    const payload = new URLSearchParams();
    payload.append('source_url', window.location.pathname);
    payload.append('data', JSON.stringify({
      options: {
        name: boardName,
        privacy: 'public'
      },
      context: {}
    }));

    try {
      const response = await fetch('/resource/BoardResource/create/', {
        method: 'POST',
        headers: {
          'x-csrftoken': csrfToken,
          'x-pinterest-pws-handler': 'www',
          'x-requested-with': 'XMLHttpRequest',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: payload.toString()
      });

      const resData = await response.json();
      if (resData.resource_response && resData.resource_response.status === 'success') {
        console.log(`  ✅ সফলভাবে তৈরি হয়েছে: "${boardName}"`);
        successCount++;
      } else if (resData.resource_response && resData.resource_response.error) {
        console.warn(`  ⚠️ রেসপন্স: ${resData.resource_response.error.message || 'বোর্ডটি সম্ভবত আগেই তৈরি করা আছে।'}`);
      } else {
        console.log(`  ✨ তৈরি সম্পন্ন: "${boardName}"`);
        successCount++;
      }
    } catch (err) {
      console.error(`  ❌ এরর হয়েছে "${boardName}":`, err);
    }

    // ২ সেকেন্ডের সেফটি ডিলে (অ্যাকাউন্ট সেফ রাখার জন্য)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("--------------------------------------------------");
  console.log(`🎉 অভিনন্দন! মোট ${successCount}টি বোর্ড সম্পূর্ণ প্রস্তুত!`);
  console.log("পেজটি একবার রিফ্রেশ করলেই সব বোর্ড দেখতে পাবেন।");
})();
