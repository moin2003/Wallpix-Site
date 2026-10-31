import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const urlObj = new URL(request.url);
  const targetUrl = urlObj.searchParams.get('url');
  let filename = urlObj.searchParams.get('filename') || 'walpix-wallpaper-4k.jpg';

  // Sanitize filename
  filename = filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  if (!filename.toLowerCase().endsWith('.jpg') && !filename.toLowerCase().endsWith('.png') && !filename.toLowerCase().endsWith('.webp')) {
    filename += '.jpg';
  }

  if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
    return new Response('Invalid or missing image URL', { status: 400 });
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://wallpapercat.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!upstreamRes.ok) {
      return new Response(`Upstream fetch failed: ${upstreamRes.statusText}`, { status: 502 });
    }

    const contentType = upstreamRes.headers.get('content-type') || 'image/jpeg';
    const body = upstreamRes.body;

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=604800, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(`Error proxying image download: ${err?.message || err}`, { status: 500 });
  }
};
