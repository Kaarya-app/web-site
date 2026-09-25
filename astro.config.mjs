import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';
import { join } from 'path';

// https://astro.build/config
const isDev = process.env.NODE_ENV === 'development';

// Read Astro manifest for site config
let siteConfig = {};
try {
  const manifestPath = join(process.cwd(), 'dist/.astro/manifest.json');
  if (!isDev) {
    siteConfig = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  }
} catch (error) {
  console.warn('Could not read Astro manifest:', error);
}

// Matomo analytics configuration
export default defineConfig({
  site: siteConfig.site || 'https://kaayra.interstellarhq.in',
  integrations: [
    mdx(),
    sitemap(),
    // Add Matomo integration if configured
    ...(process.env.NUXT_PUBLIC_MATOMO_URL && process.env.NUXT_PUBLIC_MATOMO_SITE_ID ? [
      // We can't add Matomo as an Astro integration directly, but we'll inject it via the layout
    ] : [])
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  // Add adapter for SSR
  adapter: '@astrojs/node({ mode: 'standalone' })',
});
