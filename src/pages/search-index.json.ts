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
    { title: 'Trang chủ', text: 'Nam Kinh Digital – số hóa điểm đến, kết nối trải nghiệm, gia tăng giá trị; ba tầng giá trị, hệ sinh thái năm sản phẩm', url: '/' },
    { title: 'Giới thiệu', text: 'Chúng tôi là ai, tầm nhìn, sứ mệnh, giá trị cốt lõi, lộ trình 2027–2029', url: '/gioi-thieu' },
    { title: 'Kể Miền Di Sản', text: 'Thương hiệu cộng đồng: đánh thức di sản bằng công nghệ; di tích, làng nghề, câu chuyện địa phương', url: '/gioi-thieu#hai-thuong-hieu' },
    { title: 'Giải pháp', text: 'Điểm Đến Số, Kết Nối Du Lịch, trải nghiệm thông minh, hệ sinh thái sản phẩm', url: '/dich-vu' },
    { title: 'Dự án', text: 'Mô hình triển khai mẫu cho di tích, bảo tàng, làng nghề, khu du lịch, homestay', url: '/du-an' },
    { title: 'Tin tức', text: 'Số hóa điểm đến, kinh doanh du lịch trực tuyến, cộng đồng Kể Miền Di Sản', url: '/tin-tuc' },
    { title: 'Liên hệ', text: 'Gửi yêu cầu tư vấn, số điện thoại, email, địa chỉ văn phòng, bản đồ', url: '/lien-he' },
  ],
  en: [
    { title: 'Home', text: 'Nam Kinh Digital – digitize destinations, connect experiences, add value; three value tiers, five-product ecosystem', url: '/' },
    { title: 'About us', text: 'Who we are, vision, mission, core values, 2027–2029 roadmap', url: '/gioi-thieu' },
    { title: 'Ke Mien Di San', text: 'Community brand: awakening heritage with technology; heritage sites, craft villages, local stories', url: '/gioi-thieu#hai-thuong-hieu' },
    { title: 'Solutions', text: 'Digital Destination, Travel Connect, smart experiences, product ecosystem', url: '/dich-vu' },
    { title: 'Projects', text: 'Pilot deployment models for heritage sites, museums, craft villages, tourist areas, homestays', url: '/du-an' },
    { title: 'News', text: 'Destination digitization, selling travel online, the Ke Mien Di San community', url: '/tin-tuc' },
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
