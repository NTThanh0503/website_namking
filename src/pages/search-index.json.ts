// Chỉ mục tìm kiếm, tạo sẵn lúc build thành file /search-index.json.
// Hộp tìm kiếm (SearchDialog) tải file này khi người dùng mở lần đầu.
// Muốn nội dung mới tìm được: chỉ cần thêm vào src/data hoặc src/content, không phải sửa file này.
import type { APIRoute } from 'astro';
import { getData } from '../data';
import { langs, localizePath, type Lang } from '../i18n';
import { getPosts } from '../i18n/posts';

export type SearchEntry = { type: 'page' | 'service' | 'project' | 'news' | 'faq'; title: string; text: string; url: string };

const pages: Record<Lang, { title: string; text: string; url: string }[]> = {
  vi: [
    { title: 'Trang chủ', text: 'Số hóa điểm đến, lấp đầy phòng nghỉ, dẫn lối hành trình', url: '/' },
    { title: 'Giới thiệu', text: 'Câu chuyện, tầm nhìn, sứ mệnh, giá trị cốt lõi và chặng đường phát triển', url: '/gioi-thieu' },
    { title: 'Đội ngũ lãnh đạo', text: 'Những người chịu trách nhiệm trực tiếp với dự án của bạn', url: '/gioi-thieu#doi-ngu' },
    { title: 'Dịch vụ', text: 'Số hóa, lưu trú, du lịch, quy trình làm việc', url: '/dich-vu' },
    { title: 'Dự án', text: 'Các dự án số hóa, vận hành lưu trú và tổ chức du lịch tiêu biểu', url: '/du-an' },
    { title: 'Tin tức', text: 'Kinh nghiệm số hóa, vận hành lưu trú và gợi ý hành trình', url: '/tin-tuc' },
    { title: 'Liên hệ', text: 'Gửi yêu cầu tư vấn, số điện thoại, email, địa chỉ văn phòng, bản đồ', url: '/lien-he' },
  ],
  en: [
    { title: 'Home', text: 'Digitize destinations, fill every room, guide the journey', url: '/' },
    { title: 'About us', text: 'Our story, vision, mission, core values and journey', url: '/gioi-thieu' },
    { title: 'Leadership team', text: 'The people directly responsible for your project', url: '/gioi-thieu#doi-ngu' },
    { title: 'Services', text: 'Digital, hospitality, travel, our process', url: '/dich-vu' },
    { title: 'Projects', text: 'Featured digital, hospitality operations and travel projects', url: '/du-an' },
    { title: 'News', text: 'Insights on digital transformation, hospitality and travel ideas', url: '/tin-tuc' },
    { title: 'Contact', text: 'Request a consultation, phone, email, office address, map', url: '/lien-he' },
  ],
};

async function build(lang: Lang): Promise<SearchEntry[]> {
  const { services, projects, faqs, company } = getData(lang);
  const L = (u: string) => localizePath(u, lang);
  const posts = await getPosts(lang);
  return [
    ...pages[lang].map((p) => ({ type: 'page' as const, ...p, text: p.url === '/lien-he' ? `${p.text} ${company.phone} ${company.email} ${company.address}` : p.text, url: L(p.url) })),
    ...services.map((s) => ({
      type: 'service' as const,
      title: s.title,
      text: [s.name, s.short, ...s.features.map((f) => `${f.title}. ${f.text}`), ...s.forWho].join(' '),
      url: L(`/dich-vu/${s.slug}`),
    })),
    ...projects.map((p) => ({
      type: 'project' as const,
      title: p.title,
      text: `${p.location} · ${p.year}. ${p.summary} ${p.result}. ${p.client}`,
      url: L(`/du-an?linh-vuc=${p.category}`),
    })),
    ...posts.map((p) => ({
      type: 'news' as const,
      title: p.data.title,
      text: `${p.data.description} ${p.body ?? ''}`.replace(/[#*_>\[\]()]/g, ' ').replace(/\s+/g, ' ').slice(0, 1200),
      url: L(`/tin-tuc/${p.id}`),
    })),
    ...faqs.map((f) => ({ type: 'faq' as const, title: f.q, text: f.a, url: L('/lien-he#hoi-dap') })),
  ];
}

export const GET: APIRoute = async () => {
  const out: Record<string, SearchEntry[]> = {};
  for (const l of langs) out[l] = await build(l);
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
