// Lấy dữ liệu website theo ngôn ngữ: getData('vi') hoặc getData('en')
import * as vi from './site';
import * as en from './site.en';
import type { Lang } from '../i18n';

export type SiteData = typeof vi;
export function getData(lang: Lang): SiteData {
  return lang === 'en' ? en : vi;
}
export type { Service, Project } from './site';
