import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import nodeAdapter from '@astrojs/node';
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

export default defineConfig({
  site: siteConfig.site || 'https://kaarya.interstellarhq.in',
  integrations: [
    mdx(),
    sitemap(),
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
  adapter: nodeAdapter({ mode: 'standalone' }),
});
