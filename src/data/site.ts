// =============================================================
//  TOÀN BỘ THÔNG TIN CÔNG TY NẰM Ở FILE NÀY
//  Sửa tên, số điện thoại, dịch vụ, dự án... tại đây là cả website
//  tự cập nhật. Nội dung bám theo tài liệu "Chiến lược thương hiệu và
//  hệ sinh thái sản phẩm Nam Kinh Digital 2027–2029".
//  Dự án hiện là MÔ HÌNH TRIỂN KHAI MẪU (minh họa), chưa phải dự án đã bàn giao.
// =============================================================

// Địa điểm văn phòng cho nút "Chỉ đường" (ghi giống địa chỉ Google Maps hiển thị để ghim chính xác)
const mapQuery = '158 P. Chùa Láng, Láng, Hà Nội';

export const company = {
  name: 'NAM KINH GROUP',
  // Thương hiệu công nghệ du lịch của tập đoàn
  brand: 'Nam Kinh Digital',
  // Thương hiệu cộng đồng do Nam Kinh Digital phát triển và vận hành
  community: 'Kể Miền Di Sản',
  // Tên pháp lý đầy đủ (hiện ở chân trang): sửa đúng theo giấy phép kinh doanh, vd: 'Công ty TNHH ...'
  legalName: 'NAM KINH GROUP',
  positioning: 'Nền tảng Số hóa & Kết nối Kinh doanh Du lịch',
  tagline: 'Số hóa điểm đến – Kết nối trải nghiệm – Gia tăng giá trị',
  description:
    'Nam Kinh Digital – thương hiệu công nghệ du lịch của NAM KINH GROUP – đưa điểm đến, sản phẩm và dịch vụ du lịch từ đời thực lên môi trường số: để du khách khám phá, đặt trải nghiệm, và để chủ điểm đến quản lý kinh doanh trên một nền tảng.',
  phone: '0900 000 000',
  phoneHref: 'tel:+84900000000',
  hotline: '1900 0000',
  email: 'lienhe@example.com',
  address: '158 Chùa Láng, Quận Ba Đình, TP. Hà Nội',
  hours: 'Thứ 2 – Thứ 7, 8:30 – 17:30',
  taxCode: '0300000000',
  // Link nhúng CHÍNH THỨC: Google Maps → tìm địa chỉ → Chia sẻ → Nhúng bản đồ → copy phần src="..."
  // (link dạng /maps?q=...&output=embed bị Google chặn trên một số điện thoại)
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2466603034454!2d105.80055879999999!3d21.0228143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5cbba0580d%3A0x97078b7d5e123009!2zMTU4IFAuIENow7lhIEzDoW5nLCBMw6FuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1794887977863!5m2!1svi!2s',
  // Mở Google Maps (ứng dụng trên điện thoại) và chỉ đường từ vị trí hiện tại đến văn phòng
  mapDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  socials: [
    { name: 'Facebook Nam Kinh Digital', href: 'https://facebook.com/', icon: 'facebook' },
    { name: 'Zalo', href: 'https://zalo.me/', icon: 'zalo' },
    { name: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
    { name: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
  ],
  // Lấy access key miễn phí tại https://web3forms.com (nhập email nhận tin)
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
};

export const nav = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Giải pháp', href: '/dich-vu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export type Service = {
  slug: 'diem-den-so' | 'ket-noi-du-lich' | 'trai-nghiem-so';
  name: string;
  title: string;
  short: string;
  intro: string;
  icon: string;
  tone: 'lagoon' | 'jade' | 'lantern';
  features: { title: string; text: string }[];
  outcomes: string[];
  forWho: string[];
};

// Ba giải pháp thương mại chính (mỗi giải pháp có trang chi tiết /dich-vu/<slug>)
export const services: Service[] = [
  {
    slug: 'diem-den-so',
    name: 'Điểm Đến Số',
    title: 'Nam Kinh Điểm Đến Số – Số hóa điểm đến',
    short:
      'Đưa thông tin, hình ảnh, không gian và câu chuyện của điểm đến lên môi trường trực tuyến, để du khách tìm hiểu và trải nghiệm từ xa hoặc ngay tại chỗ.',
    intro:
      'Mỗi di tích, bảo tàng, làng nghề đều có một câu chuyện đáng được kể. Chúng tôi số hóa không gian, tư liệu và trải nghiệm của điểm đến thành sản phẩm số mà du khách có thể khám phá bằng nhiều ngôn ngữ, ở bất cứ đâu.',
    icon: 'scan',
    tone: 'lagoon',
    features: [
      { title: 'Ảnh 360° & tham quan ảo', text: 'Chụp ảnh 360° và dựng tour tham quan ảo cho toàn bộ không gian, nhúng được vào website, Google Maps và mạng xã hội.' },
      { title: 'Website & bản đồ số điểm đến', text: 'Website riêng cho điểm đến cùng bản đồ số tương tác: lối đi, điểm tham quan, tiện ích và thông tin cần biết.' },
      { title: 'Thuyết minh đa ngôn ngữ qua QR/NFC', text: 'Du khách quét mã tại từng điểm để nghe, đọc thuyết minh bằng ngôn ngữ của mình, kèm hình ảnh, video và âm thanh.' },
      { title: 'Số hóa tư liệu & mô hình 3D', text: 'Số hóa thông tin, tư liệu, hiện vật; dựng mô hình 3D theo nhu cầu để lưu giữ và giới thiệu giá trị di sản.' },
    ],
    outcomes: [
      'Du khách tìm hiểu, trải nghiệm điểm đến từ xa hoặc ngay tại chỗ',
      'Lịch sử, văn hóa được kể đầy đủ bằng nhiều ngôn ngữ',
      'Ban quản lý chủ động cập nhật nội dung và xem báo cáo tương tác',
    ],
    forWho: ['Di tích lịch sử, bảo tàng, nhà cổ', 'Làng nghề, không gian văn hóa, khu du lịch', 'Ban quản lý và cơ quan quản lý du lịch địa phương'],
  },
  {
    slug: 'ket-noi-du-lich',
    name: 'Kết Nối Du Lịch',
    title: 'Nam Kinh Kết Nối Du Lịch – Nền tảng kinh doanh điểm đến',
    short:
      'Phần mềm thuê bao giúp du khách xem, chọn và đặt dịch vụ trực tuyến; giúp chủ điểm đến quản lý dịch vụ, lịch, đơn hàng và doanh thu trên một nền tảng.',
    intro:
      'Số hóa mới là bước đầu. Nền tảng Kết Nối Du Lịch biến sự quan tâm của du khách thành đơn đặt chỗ: du khách đặt trải nghiệm ngay trên trang của điểm đến, đơn hàng tự động chuyển đến chủ điểm đến để xác nhận, phục vụ và theo dõi doanh thu.',
    icon: 'ticket',
    tone: 'jade',
    features: [
      { title: 'Trang đặt dịch vụ cho du khách', text: 'Xem ảnh, video, 360°; xem danh mục trải nghiệm, giá và lịch; chọn số người, gửi đặt chỗ, nhận xác nhận và hướng dẫn trải nghiệm.' },
      { title: 'Tài khoản quản trị cho nhà cung cấp', text: 'Quản lý danh mục dịch vụ, giá bán, lịch và sức chứa; tiếp nhận, xác nhận hoặc từ chối đơn đặt chỗ.' },
      { title: 'Thanh toán, khách đến & doanh thu', text: 'Thanh toán qua đơn vị thanh toán phù hợp, ghi nhận khách đến, theo dõi doanh thu và báo cáo hiệu quả bán hàng.' },
      { title: 'Tích hợp hệ thống sẵn có', text: 'Với khách sạn, nhà hàng: kết nối với phần mềm đặt phòng, POS hoặc hệ thống quản trị đang dùng, không bắt thay mới.' },
    ],
    outcomes: [
      'Nhận đặt lịch, bán vé và trải nghiệm trực tuyến mọi lúc',
      'Đơn đặt chỗ tự động chuyển đến chủ điểm đến',
      'Quản lý khách hàng, đơn hàng và doanh thu trên một màn hình',
    ],
    forWho: ['Xưởng trải nghiệm làng nghề, trang trại giáo dục', 'Khu du lịch sinh thái, khu vui chơi, điểm có bán vé', 'Homestay, villa, nhà hàng phục vụ khách du lịch'],
  },
  {
    slug: 'trai-nghiem-so',
    name: 'Trải Nghiệm Thông Minh',
    title: 'Trải nghiệm du lịch thông minh',
    short:
      'Trợ lý AI, thuyết minh tương tác, AR/VR, trò chơi khám phá và bản đồ hành trình thông minh cho những điểm đến muốn ứng dụng công nghệ sâu hơn.',
    intro:
      'Dòng giải pháp nâng cao giúp du khách không chỉ xem mà còn tương tác với điểm đến. Mỗi dự án được thiết kế riêng; các hạng mục 3D chuyên sâu được triển khai cùng đối tác công nghệ phù hợp.',
    icon: 'spark',
    tone: 'lantern',
    features: [
      { title: 'Trợ lý AI du lịch', text: 'Trả lời câu hỏi, gợi ý lộ trình và thuyết minh tương tác theo ngôn ngữ và sở thích của từng du khách.' },
      { title: 'AR/VR & tour 360° nâng cao', text: 'Tái hiện không gian, hiện vật và câu chuyện lịch sử bằng thực tế tăng cường và thực tế ảo.' },
      { title: 'Trò chơi khám phá qua QR/NFC', text: 'Hành trình nhiệm vụ, săn điểm, thu thập huy hiệu để du khách ở lại lâu hơn và khám phá nhiều hơn.' },
      { title: 'Bản đồ hành trình, mô hình 3D & bản sao số', text: 'Bản đồ hành trình thông minh, mô hình 3D và bản sao số của điểm đến khi có dữ liệu vận hành phù hợp.' },
    ],
    outcomes: [
      'Du khách tương tác nhiều hơn, ở lại lâu hơn',
      'Điểm đến có sản phẩm trải nghiệm khác biệt',
      'Triển khai theo dự án, linh hoạt theo quy mô',
    ],
    forWho: ['Khu du lịch lớn', 'Bảo tàng, di tích có lượng khách lớn', 'Tổ hợp du lịch – văn hóa – thương mại'],
  },
];

// Mô hình kinh doanh ba tầng
export const tiers = [
  { icon: 'scan', title: 'Số hóa', text: 'Giúp điểm đến có hình ảnh, thông tin, sản phẩm và trải nghiệm trên môi trường trực tuyến.' },
  { icon: 'ticket', title: 'Kết nối thương mại', text: 'Giúp du khách tìm hiểu, lựa chọn và đặt dịch vụ; giúp nhà cung cấp quản lý đơn hàng và kinh doanh.' },
  { icon: 'chart', title: 'Dữ liệu & hệ sinh thái', text: 'Xây dựng mạng lưới điểm đến, chuẩn hóa thông tin và phát triển sản phẩm dữ liệu có quyền khai thác hợp pháp.' },
];

// Hệ sinh thái năm nhóm sản phẩm (triển khai theo mức độ ưu tiên thương mại)
export const ecosystem = [
  { icon: 'scan', name: 'Nam Kinh Điểm Đến Số', text: 'Ảnh 360°, tour ảo, website và bản đồ số, thuyết minh đa ngôn ngữ, QR/NFC, mô hình 3D.', status: 'Triển khai ngay', href: '/dich-vu/diem-den-so' },
  { icon: 'ticket', name: 'Nam Kinh Kết Nối Du Lịch', text: 'Nền tảng thuê bao: du khách đặt dịch vụ, chủ điểm đến quản lý lịch, đơn hàng và doanh thu.', status: 'Sản phẩm cốt lõi', href: '/dich-vu/ket-noi-du-lich' },
  { icon: 'spark', name: 'Trải nghiệm du lịch thông minh', text: 'Trợ lý AI, thuyết minh tương tác, AR/VR, trò chơi khám phá, bản đồ hành trình thông minh.', status: 'Theo dự án', href: '/dich-vu/trai-nghiem-so' },
  { icon: 'temple', name: 'Kể Miền Di Sản', text: 'Nền tảng cộng đồng khám phá di tích, làng nghề, câu chuyện địa phương. Đánh thức di sản bằng công nghệ.', status: 'Cộng đồng', href: '/gioi-thieu#hai-thuong-hieu' },
  { icon: 'map', name: 'Dữ liệu du lịch & kinh tế đêm', text: 'Kho dữ liệu điểm đến, bản đồ du lịch, bản đồ kinh tế đêm và báo cáo xu hướng, chỉ từ dữ liệu được phép khai thác.', status: 'Định hướng dài hạn', href: '/gioi-thieu#chang-duong' },
];

// Bốn nhóm khách hàng doanh nghiệp (B2B)
export const audiences = [
  { icon: 'temple', title: 'Điểm đến văn hóa và di sản', text: 'Di tích, bảo tàng, làng nghề, nhà cổ, ban quản lý điểm tham quan cần số hóa tài nguyên, thuyết minh đa ngôn ngữ và tham quan ảo.', product: 'Điểm Đến Số' },
  { icon: 'ticket', title: 'Doanh nghiệp cung cấp trải nghiệm', text: 'Xưởng làng nghề, khu sinh thái, trang trại giáo dục, khu vui chơi cần nhận đặt lịch, bán vé và quản lý đơn hàng.', product: 'Kết Nối Du Lịch' },
  { icon: 'bed', title: 'Lưu trú và dịch vụ du lịch', text: 'Homestay, khách sạn nhỏ, villa, nhà hàng cần giới thiệu không gian 360°, kết nối đặt chỗ và bán chéo dịch vụ.', product: 'Điểm Đến Số + Kết Nối' },
  { icon: 'map', title: 'Cơ quan quản lý điểm đến', text: 'Chính quyền, cơ quan quản lý du lịch, ban quản lý di tích cần bản đồ số, hệ thống thông tin điểm đến và báo cáo dữ liệu.', product: 'Giải pháp theo dự án' },
];

// Nam Kinh Digital khác gì
export const differences = {
  chain: ['Giới thiệu điểm đến', 'Trải nghiệm số', 'Đặt dịch vụ', 'Quản trị', 'Phân tích dữ liệu'],
  items: [
    { vs: 'Khác một công ty làm website', text: 'Không chỉ bàn giao giao diện theo đơn đặt hàng, mà cung cấp một hệ thống tích hợp từ giới thiệu đến phân tích dữ liệu.' },
    { vs: 'Khác một nền tảng đặt dịch vụ', text: 'Trước hết cung cấp công nghệ cho chính nhà cung cấp, giúp họ số hóa và tự quản lý kinh doanh của mình.' },
    { vs: 'Khác một công ty số hóa di sản', text: 'Không dừng ở bàn giao dự án, mà đồng hành lâu dài qua nền tảng quản trị, nội dung, đặt dịch vụ và báo cáo.' },
  ],
};

// Các con số về mô hình (không phải số liệu kinh doanh đã đạt được)
export const stats = [
  { value: 3, suffix: '', label: 'tầng giá trị: số hóa, kết nối, dữ liệu' },
  { value: 5, suffix: '', label: 'nhóm giải pháp trong hệ sinh thái' },
  { value: 4, suffix: '', label: 'nhóm khách hàng doanh nghiệp' },
  { value: 2, suffix: '', label: 'thương hiệu: Nam Kinh Digital & Kể Miền Di Sản' },
];

// Quy trình vận hành (là một chuỗi bước nên được đánh số)
export const process = [
  { title: 'Số hóa điểm đến', text: 'Khảo sát, chụp 360°, số hóa thông tin, câu chuyện và dịch vụ của điểm đến.' },
  { title: 'Đưa lên nền tảng', text: 'Điểm đến có website, trang đặt dịch vụ và tài khoản quản trị riêng.' },
  { title: 'Du khách đặt chỗ', text: 'Du khách tìm thấy qua Facebook, Google, website, đối tác và gửi đặt chỗ; đơn tự chuyển đến chủ điểm đến.' },
  { title: 'Quản trị & báo cáo', text: 'Chủ điểm đến xác nhận, phục vụ, theo dõi doanh thu; Nam Kinh Digital hỗ trợ vận hành.' },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  category: Service['slug'];
  year: number;
  summary: string;
  result: string; // mục tiêu của mô hình (chưa phải kết quả đã đạt)
  image?: string; // ảnh ở public/images/du-an/... – chép ảnh thật đè lên cùng tên; xóa dòng image để quay về hình minh họa
};

// MÔ HÌNH TRIỂN KHAI MẪU – thay bằng dự án thật khi có điểm mẫu đầu tiên
export const projects: Project[] = [
  { slug: 'di-tich-360', title: 'Tham quan ảo & thuyết minh di tích', client: 'Mô hình mẫu – Di tích lịch sử', location: 'Hà Nội', category: 'diem-den-so', year: 2027, summary: 'Tour 360° toàn khu di tích, bản đồ số và thuyết minh đa ngôn ngữ qua mã QR tại từng hạng mục.', result: 'Mục tiêu: du khách khám phá từ xa và tại chỗ bằng ngôn ngữ của mình', image: '/images/du-an/tour-360-pho-co.jpg' },
  { slug: 'lang-nghe-dat-lich', title: 'Đặt lịch trải nghiệm làng nghề', client: 'Mô hình mẫu – Xưởng gốm làng nghề', location: 'Bát Tràng', category: 'ket-noi-du-lich', year: 2027, summary: 'Trang đặt trải nghiệm làm gốm theo khung giờ và sức chứa, chủ xưởng nhận và xác nhận đơn trên điện thoại.', result: 'Mục tiêu: nhận đặt lịch và bán trải nghiệm trực tuyến mỗi ngày', image: '/images/du-an/ha-giang-trai-nghiem.jpg' },
  { slug: 'bao-tang-3d', title: 'Bảo tàng số và hiện vật 3D', client: 'Mô hình mẫu – Bảo tàng', location: 'Huế', category: 'trai-nghiem-so', year: 2027, summary: 'Số hóa hiện vật thành mô hình 3D, kết hợp trợ lý AI thuyết minh tương tác cho khách tham quan.', result: 'Mục tiêu: không gian trưng bày mở cửa trực tuyến cho du khách khắp nơi', image: '/images/du-an/bao-tang-so.jpg' },
  { slug: 'homestay-360-dat-phong', title: 'Homestay 360° kết nối đặt phòng', client: 'Mô hình mẫu – Homestay', location: 'Đà Lạt', category: 'ket-noi-du-lich', year: 2027, summary: 'Giới thiệu không gian bằng ảnh 360°, tích hợp với phần mềm đặt phòng đang dùng và bán chéo trải nghiệm địa phương.', result: 'Mục tiêu: tăng đặt chỗ trực tiếp và bán chéo dịch vụ', image: '/images/du-an/website-homestay-da-lat.jpg' },
  { slug: 'khu-sinh-thai-kham-pha', title: 'Hành trình khám phá khu sinh thái', client: 'Mô hình mẫu – Khu du lịch sinh thái', location: 'Ninh Bình', category: 'trai-nghiem-so', year: 2028, summary: 'Trò chơi khám phá qua QR/NFC và bản đồ hành trình thông minh dẫn du khách qua từng điểm trải nghiệm.', result: 'Mục tiêu: du khách tương tác nhiều hơn và ở lại lâu hơn', image: '/images/du-an/resort-bien-phu-quoc.jpg' },
  { slug: 'ban-do-so-dia-phuong', title: 'Bản đồ số du lịch địa phương', client: 'Mô hình mẫu – Cơ quan quản lý du lịch', location: 'Cấp tỉnh', category: 'diem-den-so', year: 2028, summary: 'Hệ thống thông tin và bản đồ số các điểm đến trên địa bàn, kèm báo cáo tương tác phục vụ công tác quản lý.', result: 'Mục tiêu: quảng bá điểm đến và hỗ trợ quản lý bằng dữ liệu', image: '/images/du-an/can-ho-dich-vu-q1.jpg' },
];

// Thông điệp dành cho từng nhóm (hiển thị ở khung trượt trên trang chủ và trang Dự án)
export const testimonials = [
  { quote: 'Nam Kinh Digital giúp anh chị đưa điểm đến và các dịch vụ đang kinh doanh lên môi trường số, để du khách có thể khám phá, đặt trải nghiệm và để anh chị quản lý hoạt động kinh doanh dễ dàng hơn.', name: 'Với chủ điểm đến', role: 'Số hóa và kinh doanh trên một nền tảng' },
  { quote: 'Nam Kinh Digital cung cấp các giải pháp số hóa, giới thiệu và quản trị điểm đến, giúp nâng cao trải nghiệm du khách, phát huy giá trị tài nguyên và hỗ trợ công tác quản lý bằng dữ liệu.', name: 'Với cơ quan quản lý', role: 'Quản lý điểm đến bằng dữ liệu' },
  { quote: 'Nam Kinh Digital xây dựng nền tảng công nghệ kết nối điểm đến, nhà cung cấp dịch vụ và du khách, hướng đến một hệ sinh thái du lịch số có khả năng mở rộng.', name: 'Với đối tác', role: 'Cùng xây hệ sinh thái du lịch số' },
  { quote: 'Nam Kinh Digital kết hợp doanh thu triển khai số hóa với mô hình phần mềm thuê bao để phát triển mạng lưới điểm đến, nâng cao hiệu quả kinh doanh và hình thành tài sản công nghệ dài hạn.', name: 'Với nhà đầu tư', role: 'Doanh thu định kỳ, tài sản công nghệ dài hạn' },
];

export const faqs = [
  { q: 'Nam Kinh Digital khác gì một công ty làm website?', a: 'Công ty website thường bàn giao giao diện rồi kết thúc. Chúng tôi cung cấp một hệ thống tích hợp: giới thiệu điểm đến, trải nghiệm số, đặt dịch vụ, quản trị và phân tích dữ liệu, và đồng hành lâu dài qua nền tảng.' },
  { q: 'Tôi đang dùng phần mềm đặt phòng hoặc POS, có phải thay không?', a: 'Không. Với khách sạn, homestay và nhà hàng, chúng tôi ưu tiên tích hợp với phần mềm đặt phòng, POS hoặc hệ thống quản trị bạn đang dùng, không phát triển lại các phần mềm chuyên ngành này.' },
  { q: 'Chi phí được tính như thế nào?', a: 'Số hóa điểm đến tính theo gói triển khai và phí duy trì; nền tảng Kết Nối Du Lịch gồm phí khởi tạo và thuê bao hằng tháng; giải pháp nâng cao báo giá theo dự án. Gửi thông tin qua form liên hệ, chúng tôi báo giá theo đúng quy mô của bạn.' },
  { q: 'Du khách thanh toán qua đâu?', a: 'Du khách thanh toán qua đơn vị thanh toán phù hợp được tích hợp vào trang đặt dịch vụ. Chủ điểm đến theo dõi thanh toán và doanh thu trong tài khoản quản trị của mình.' },
  { q: 'Dữ liệu của điểm đến và du khách được sử dụng ra sao?', a: 'Chúng tôi chỉ thu thập, phân tích và khai thác dữ liệu trong phạm vi được phép, có căn cứ pháp lý và quyền sử dụng rõ ràng. Dữ liệu của từng thương hiệu, từng điểm đến được phân quyền tách biệt.' },
  { q: 'Kể Miền Di Sản là gì?', a: 'Kể Miền Di Sản là thương hiệu cộng đồng do Nam Kinh Digital phát triển và vận hành, nơi mọi người khám phá di tích, làng nghề, câu chuyện địa phương và đóng góp tư liệu. Nội dung đóng góp được kiểm duyệt và quản lý quyền sử dụng trước khi đưa lên hệ thống.' },
];

export const values = [
  { title: 'Chân thực', text: 'Hình ảnh số phải đúng với trải nghiệm thật. Chúng tôi kể câu chuyện của điểm đến một cách tôn trọng và chính xác.' },
  { title: 'Đồng hành lâu dài', text: 'Không bàn giao xong là hết. Nền tảng quản trị, nội dung và báo cáo giữ chúng tôi bên cạnh điểm đến qua từng mùa khách.' },
  { title: 'Dữ liệu minh bạch', text: 'Chỉ khai thác dữ liệu có căn cứ pháp lý và quyền sử dụng; quyền truy cập được phân tách rõ ràng.' },
];

// Lộ trình triển khai 2027–2029
export const milestones = [
  { year: 2027, text: 'Xây dựng sản phẩm và doanh thu ban đầu: hoàn thiện gói Điểm Đến Số, ra mắt phiên bản đầu của nền tảng kinh doanh điểm đến, triển khai điểm mẫu và khởi động cộng đồng Kể Miền Di Sản.' },
  { year: 2028, text: 'Phát triển nền tảng thương mại: mở rộng mạng lưới khách hàng phần mềm, hoàn thiện đặt dịch vụ và tích hợp, quản trị nhiều điểm, phát triển kênh đối tác phân phối.' },
  { year: 2029, text: 'Phát triển hệ sinh thái: mở rộng mạng lưới điểm đến, kết nối nhà cung cấp dịch vụ, phát triển sản phẩm dữ liệu có quyền khai thác, thử nghiệm bản đồ và phân tích kinh tế đêm.' },
];

export const team = [
  { name: 'Nguyễn Văn A', role: 'Giám đốc điều hành', bio: 'Định hướng chiến lược và phát triển quan hệ đối tác của Nam Kinh Digital.' },
  { name: 'Trần Thị B', role: 'Giám đốc công nghệ', bio: 'Phụ trách nền tảng Kết Nối Du Lịch và các tích hợp hệ thống.' },
  { name: 'Lê Văn C', role: 'Trưởng bộ phận số hóa điểm đến', bio: 'Phụ trách chụp 360°, tour ảo, bản đồ số và thuyết minh đa ngôn ngữ.' },
  { name: 'Phạm Thị D', role: 'Trưởng bộ phận cộng đồng', bio: 'Phát triển cộng đồng và nội dung Kể Miền Di Sản.' },
];

// Dải chữ chạy dưới phần đầu trang chủ: các loại điểm đến mà giải pháp phục vụ
export const partners = ['Di tích lịch sử', 'Bảo tàng', 'Làng nghề', 'Nhà cổ', 'Khu du lịch sinh thái', 'Trang trại giáo dục', 'Khu vui chơi trải nghiệm', 'Homestay', 'Villa & khu nghỉ dưỡng', 'Nhà hàng du lịch', 'Ban quản lý điểm đến'];
