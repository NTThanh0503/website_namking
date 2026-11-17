// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Đổi "site" thành tên miền thật của công ty khi deploy (dùng cho sitemap & SEO)
export default defineConfig({
  site: 'https://www.example.com',
  integrations: [
    sitemap({
      // Sinh thẻ hreflang cho bản tiếng Việt (/) và tiếng Anh (/en)
      i18n: { defaultLocale: 'vi', locales: { vi: 'vi-VN', en: 'en-US' } },
    }),
  ],
  prefetch: { prefetchAll: true },
});
