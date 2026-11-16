// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Đổi "site" thành tên miền thật của công ty khi deploy (dùng cho sitemap & SEO)
export default defineConfig({
  site: 'https://www.example.com',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true },
});
