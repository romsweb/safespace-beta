// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// BETA=1 → build pour GitHub Pages (romsweb.github.io/safespace-beta, pages en noindex).
// Sans BETA → build production safespace.nc (base racine).
const isBeta = process.env.BETA === '1';

export default defineConfig({
  site: isBeta ? 'https://romsweb.github.io' : 'https://safespace.nc',
  base: isBeta ? '/safespace-beta' : '/',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
