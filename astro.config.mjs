import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://calvinstahoviak.com',
  integrations: [
    sitemap({
      // /resume and /cv only forward to the PDFs, and the Friendsgiving
      // sign-up is unlisted, so keep them out.
      filter: (page) =>
        !/\/(resume|cv|2026-friendsgiving)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
