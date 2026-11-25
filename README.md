# Website giới thiệu công ty – NAM KINH GROUP

Website tĩnh xây bằng **Astro 7**, không cần backend hay database.
Thương hiệu công nghệ: Nam Kinh Digital – Nền tảng Số hóa & Kết nối Kinh doanh Du lịch (kèm thương hiệu cộng đồng Kể Miền Di Sản). Hướng nội dung: xem docs/huong-noi-dung.md.

## Chạy thử trên máy

Yêu cầu: cài [Node.js](https://nodejs.org) bản LTS (22 trở lên).

```bash
npm install        # cài thư viện (chỉ cần chạy lần đầu)
npm run dev        # mở http://localhost:4321 để xem, sửa file là trang tự cập nhật
npm run build      # xuất website ra thư mục dist/ để đưa lên hosting
npm run preview    # xem thử bản đã build
```

## Cần sửa gì trước khi đưa lên mạng

| Việc cần làm | Sửa ở đâu |
|---|---|
| Tên công ty, SĐT, email, địa chỉ, mạng xã hội | `src/data/site.ts` (phần `company`) |
| Dịch vụ, dự án, con số, cảm nhận khách hàng, FAQ, đội ngũ | `src/data/site.ts` (hiện là **nội dung mẫu**) |
| Bài viết tin tức | Thêm/sửa file `.md` trong `src/content/tin-tuc/` |
| Màu thương hiệu, font chữ | `src/styles/global.css` (phần `:root`) |
| Logo | `src/components/Logo.astro` và `public/favicon.svg` |
| Tên miền | `astro.config.mjs` (dòng `site`) và `public/robots.txt` |
| Bản đồ Google | `company.mapEmbed` trong `src/data/site.ts` |
| Form liên hệ | Lấy access key miễn phí tại web3forms.com, dán vào `company.web3formsKey` |
| Ảnh chia sẻ Facebook/Zalo | Thay `public/og-image.png` (1200×630) |

### Thêm ảnh thật

Bỏ ảnh vào `public/images/` (nên dùng định dạng `.webp` hoặc `.jpg` đã nén), rồi:
- **Dự án**: thêm `image: '/images/du-an/ten-anh.webp'` vào dự án tương ứng trong `site.ts`.
- **Tin tức**: thêm `image: /images/tin-tuc/ten-anh.webp` vào phần đầu file `.md`.

Mục nào chưa có ảnh sẽ tự hiện hình minh họa đường đồng mức theo màu dịch vụ.

## Cấu trúc thư mục

```
public/                 ảnh, favicon, robots.txt (copy nguyên khi build)
src/
├── components/         khối giao diện dùng lại (Header, Hero, Footer, Form…)
├── content/tin-tuc/    bài viết Markdown
├── data/site.ts        TOÀN BỘ nội dung & thông tin công ty
├── layouts/            khung trang chung (SEO, font, header, footer)
├── pages/              mỗi file là một trang
│   ├── index.astro         /
│   ├── gioi-thieu.astro    /gioi-thieu
│   ├── dich-vu/            /dich-vu và /dich-vu/diem-den-so, /ket-noi-du-lich, /trai-nghiem-so
│   ├── du-an.astro         /du-an
│   ├── tin-tuc/            /tin-tuc và từng bài viết
│   ├── lien-he.astro       /lien-he
│   └── 404.astro
├── scripts/main.ts     hiệu ứng & tương tác (menu, tab, lọc, slider, đếm số, form)
└── styles/global.css   màu sắc, chữ, nút, hiệu ứng chung
```

## Hiệu ứng & tương tác có sẵn

- Hero: bản đồ đồng mức tự vẽ, tuyến đường nối 3 điểm dịch vụ, chuyển động theo chuột
- Chuyển trang mượt (View Transitions), thanh tiến độ cuộn, header đổi nền khi cuộn
- Nội dung hiện dần khi cuộn tới, số liệu tự đếm
- Tab dịch vụ (dùng được bằng phím mũi tên), lọc dự án theo lĩnh vực
- Slider cảm nhận khách hàng (tự chạy, vuốt được trên điện thoại)
- FAQ đóng/mở có hiệu ứng, menu di động toàn màn hình
- Tôn trọng cài đặt "giảm chuyển động" của hệ điều hành

## Đưa lên mạng (miễn phí)

1. Đẩy code lên GitHub.
2. Vào **Cloudflare Pages** hoặc **Netlify**, chọn repo.
3. Build command: `npm run build`, thư mục xuất: `dist`.
4. Gắn tên miền của công ty trong phần cài đặt Domain.
