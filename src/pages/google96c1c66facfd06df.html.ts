export const prerender = true;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response('google-site-verification: google96c1c66facfd06df.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
};
