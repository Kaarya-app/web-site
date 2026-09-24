import type { APIRoute } from 'astro';
import { generateAIManifest } from '../utils/ai-ingest';

export const GET: APIRoute = async () => {
  const manifest = await generateAIManifest();
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
