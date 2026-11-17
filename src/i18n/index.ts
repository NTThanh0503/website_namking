// =============================================================
//  ĐA NGÔN NGỮ (Tiếng Việt / English)
//  - Tiếng Việt là ngôn ngữ mặc định, nằm ở đường dẫn gốc: /, /dich-vu, ...
//  - Tiếng Anh nằm dưới tiền tố /en: /en, /en/dich-vu, ...
//  - Nội dung tiếng Việt: src/data/site.ts  · tiếng Anh: src/data/site.en.ts
// =============================================================

export const languages = { vi: 'Tiếng Việt', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'vi';

/** Mã ngôn ngữ dùng cho định dạng ngày/số và thẻ hreflang */
export const locales: Record<Lang, string> = { vi: 'vi-VN', en: 'en-US' };
/** Mã dùng cho Open Graph */
export const ogLocales: Record<Lang, string> = { vi: 'vi_VN', en: 'en_US' };

const EN_PREFIX = /^\/en(?=\/|$|#|\?)/;

/** Xác định ngôn ngữ từ đường dẫn trang */
export function getLang(url: URL | string): Lang {
  const path = typeof url === 'string' ? url : url.pathname;
  return EN_PREFIX.test(path) ? 'en' : 'vi';
}

/** Bỏ tiền tố ngôn ngữ: /en/du-an → /du-an */
export function stripLang(path: string): string {
  return path.replace(EN_PREFIX, '') || '/';
}

/** Gắn tiền tố ngôn ngữ cho đường dẫn nội bộ: ('/du-an', 'en') → '/en/du-an' */
export function localizePath(href: string, lang: Lang): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href; // link ngoài, tel:, mailto:
  const base = stripLang(href);
  if (lang === defaultLang) return base;
  return base === '/' ? '/en' : `/en${base.startsWith('/#') ? base.slice(1) : base}`;
}

/** Đường dẫn của cùng trang hiện tại ở ngôn ngữ khác */
export function switchLangPath(pathname: string, target: Lang): string {
  return localizePath(stripLang(pathname.replace(/\/$/, '') || '/'), target);
}
