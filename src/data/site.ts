// =============================================================
//  TOÀN BỘ THÔNG TIN CÔNG TY NẰM Ở FILE NÀY
//  Sửa tên, số điện thoại, dịch vụ, dự án... tại đây là cả website
//  tự cập nhật. Các con số và tên dự án hiện là NỘI DUNG MẪU.
// =============================================================

export const company = {
  name: 'Hành Trình Số',
  legalName: 'Công ty TNHH Công nghệ & Du lịch Hành Trình Số',
  tagline: 'Số hóa điểm đến, nâng tầm trải nghiệm lưu trú và du lịch',
  description:
    'Hành Trình Số giúp khách sạn, homestay, khu du lịch và điểm đến chuyển đổi số: từ tham quan ảo 360°, hệ thống đặt phòng, đến thiết kế và vận hành tour trọn gói.',
  founded: 2018,
  phone: '0900 000 000',
  phoneHref: 'tel:+84900000000',
  hotline: '1900 0000',
  email: 'lienhe@example.com',
  address: '158 Chùa Láng, Quận Đống đa, TP. Hà Nội',
  hours: 'Thứ 2 – Thứ 7, 8:30 – 17:30',
  taxCode: '0300000000',
  // Lấy link nhúng: Google Maps → Chia sẻ → Nhúng bản đồ → copy phần src="..."
  mapEmbed:
    'https://www.google.com/maps?q=Ben+Thanh+Market,+Ho+Chi+Minh+City&output=embed',
  socials: [
    { name: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
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
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export type Service = {
  slug: 'so-hoa' | 'luu-tru' | 'du-lich';
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

export const services: Service[] = [
  {
    slug: 'so-hoa',
    name: 'Số hóa',
    title: 'Số hóa điểm đến & doanh nghiệp du lịch',
    short:
      'Tham quan ảo 360°, website đặt phòng, bản đồ số và hệ thống quản lý giúp khách tìm thấy và tin tưởng bạn ngay từ màn hình.',
    intro:
      'Khách du lịch hôm nay quyết định ở đâu, đi đâu ngay trên điện thoại. Chúng tôi đưa cơ sở của bạn lên môi trường số một cách đầy đủ và chân thực, để khách nhìn thấy, cảm nhận và đặt chỗ mà không cần gọi điện hỏi.',
    icon: 'scan',
    tone: 'lagoon',
    features: [
      { title: 'Tham quan ảo 360°', text: 'Chụp và dựng tour 360° cho phòng nghỉ, nhà hàng, khu di tích. Nhúng được vào website, Google Maps và mạng xã hội.' },
      { title: 'Website & đặt phòng trực tuyến', text: 'Website song ngữ, tối ưu điện thoại, kết nối cổng thanh toán và đồng bộ lịch phòng với các kênh OTA.' },
      { title: 'Bản đồ số & thuyết minh tự động', text: 'Mã QR tại từng điểm tham quan, thuyết minh đa ngôn ngữ bằng âm thanh, bản đồ tương tác cho khu du lịch.' },
      { title: 'Số hóa tư liệu & di sản', text: 'Scan 3D hiện vật, số hóa hình ảnh, tài liệu lưu trữ và xây dựng bảo tàng trực tuyến.' },
    ],
    outcomes: ['Tăng lượng đặt phòng trực tiếp, giảm phụ thuộc hoa hồng OTA', 'Khách hiểu rõ cơ sở trước khi đến, giảm hủy phòng', 'Dữ liệu khách hàng tập trung, dễ chăm sóc lại'],
    forWho: ['Khách sạn, resort, homestay', 'Khu du lịch, điểm tham quan', 'Bảo tàng, di tích, sở văn hóa – du lịch'],
  },
  {
    slug: 'luu-tru',
    name: 'Lưu trú',
    title: 'Tư vấn & vận hành cơ sở lưu trú',
    short:
      'Thiết lập, quản lý và tối ưu doanh thu cho khách sạn, homestay, căn hộ dịch vụ, từ ngày khai trương đến khi lấp đầy phòng.',
    intro:
      'Chúng tôi đồng hành cùng chủ đầu tư như một đội vận hành thứ hai: chuẩn hóa quy trình, quản lý giá và kênh bán, đào tạo nhân sự để cơ sở chạy ổn định và có lãi.',
    icon: 'bed',
    tone: 'jade',
    features: [
      { title: 'Quản lý kênh bán & giá phòng', text: 'Đưa phòng lên Booking, Agoda, Airbnb, Traveloka; điều chỉnh giá theo mùa và theo nhu cầu thực tế.' },
      { title: 'Vận hành trọn gói', text: 'Lễ tân, buồng phòng, chăm sóc khách và báo cáo doanh thu hàng tháng minh bạch cho chủ đầu tư.' },
      { title: 'Phần mềm quản lý (PMS)', text: 'Triển khai phần mềm quản lý phòng, khóa cửa thông minh, check-in không chạm.' },
      { title: 'Đào tạo nhân sự', text: 'Đào tạo tiêu chuẩn phục vụ, xử lý đánh giá trực tuyến và nâng điểm review.' },
    ],
    outcomes: ['Công suất phòng ổn định quanh năm', 'Điểm đánh giá trên OTA được cải thiện', 'Chủ đầu tư theo dõi doanh thu theo thời gian thực'],
    forWho: ['Chủ đầu tư khách sạn, homestay mới', 'Căn hộ dịch vụ, villa cho thuê', 'Cơ sở muốn tăng công suất phòng'],
  },
  {
    slug: 'du-lich',
    name: 'Du lịch',
    title: 'Thiết kế tour & trải nghiệm du lịch',
    short:
      'Tour trong nước và quốc tế, du lịch doanh nghiệp, sự kiện và hành trình trải nghiệm được thiết kế riêng cho từng đoàn.',
    intro:
      'Mỗi hành trình được thiết kế từ con người và câu chuyện của điểm đến. Chúng tôi lo trọn từ lịch trình, phương tiện, lưu trú đến hướng dẫn viên, để bạn chỉ việc tận hưởng.',
    icon: 'compass',
    tone: 'lantern',
    features: [
      { title: 'Tour trọn gói trong nước', text: 'Hà Giang, Hội An, Phú Quốc, Tây Nguyên… lịch trình linh hoạt cho gia đình và nhóm bạn.' },
      { title: 'Du lịch doanh nghiệp (MICE)', text: 'Team building, hội nghị, khen thưởng kết hợp du lịch cho đoàn từ 20 đến 1.000 khách.' },
      { title: 'Tour quốc tế', text: 'Nhật Bản, Hàn Quốc, châu Âu, Đông Nam Á; hỗ trợ hồ sơ visa và bảo hiểm du lịch.' },
      { title: 'Trải nghiệm bản địa', text: 'Làm gốm, nấu ăn cùng người dân, homestay bản làng, những hoạt động khó tìm thấy trong tour đại trà.' },
    ],
    outcomes: ['Một đầu mối lo toàn bộ hành trình', 'Chi phí rõ ràng, không phát sinh', 'Hỗ trợ 24/7 trong suốt chuyến đi'],
    forWho: ['Gia đình, nhóm bạn', 'Doanh nghiệp, cơ quan, trường học', 'Khách quốc tế đến Việt Nam'],
  },
];

export const stats = [
  { value: 8, suffix: '+', label: 'năm hoạt động' },
  { value: 120, suffix: '+', label: 'cơ sở lưu trú đã đồng hành' },
  { value: 350, suffix: '', label: 'tour 360° đã thực hiện' },
  { value: 25, suffix: 'k', label: 'khách du lịch mỗi năm' },
];

// Quy trình làm việc (là một chuỗi bước nên được đánh số)
export const process = [
  { title: 'Lắng nghe', text: 'Gặp gỡ, khảo sát thực tế và hiểu rõ mục tiêu của bạn.' },
  { title: 'Đề xuất', text: 'Gửi phương án, lộ trình và báo giá chi tiết trong 3 ngày làm việc.' },
  { title: 'Triển khai', text: 'Đội ngũ chuyên trách thực hiện, báo cáo tiến độ hàng tuần.' },
  { title: 'Đồng hành', text: 'Bàn giao, đào tạo và hỗ trợ vận hành lâu dài sau dự án.' },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  category: Service['slug'];
  year: number;
  summary: string;
  result: string;
  image?: string; // vd: '/images/du-an/khach-san-a.jpg' – để trống sẽ hiện hình minh họa
};

export const projects: Project[] = [
  { slug: 'tour-360-pho-co', title: 'Tham quan ảo phố cổ', client: 'Trung tâm Văn hóa (mẫu)', location: 'Hội An', category: 'so-hoa', year: 2025, summary: 'Dựng 48 điểm tham quan 360° kèm thuyết minh 4 ngôn ngữ qua mã QR.', result: '210.000 lượt xem trong năm đầu' },
  { slug: 'resort-bien-phu-quoc', title: 'Vận hành resort ven biển', client: 'Resort 4 sao (mẫu)', location: 'Phú Quốc', category: 'luu-tru', year: 2024, summary: 'Nhận vận hành 86 phòng, tái cấu trúc kênh bán và giá phòng theo mùa.', result: 'Công suất từ 52% lên 81%' },
  { slug: 'mice-ngan-hang', title: 'Hội nghị khách hàng 600 khách', client: 'Ngân hàng (mẫu)', location: 'Đà Nẵng', category: 'du-lich', year: 2025, summary: 'Tổ chức hội nghị, gala dinner và tour tham quan 3 ngày 2 đêm.', result: 'Điểm hài lòng 4,8/5' },
  { slug: 'website-homestay-da-lat', title: 'Website đặt phòng chuỗi homestay', client: 'Chuỗi homestay (mẫu)', location: 'Đà Lạt', category: 'so-hoa', year: 2024, summary: 'Website song ngữ đồng bộ lịch phòng với 4 kênh OTA và thanh toán trực tuyến.', result: '38% lượt đặt đến từ kênh trực tiếp' },
  { slug: 'can-ho-dich-vu-q1', title: 'Chuỗi căn hộ dịch vụ trung tâm', client: 'Chủ đầu tư tư nhân (mẫu)', location: 'TP. Hồ Chí Minh', category: 'luu-tru', year: 2023, summary: 'Thiết lập từ đầu 3 tòa căn hộ: quy trình, nhân sự, phần mềm và check-in tự động.', result: 'Hòa vốn vận hành sau 5 tháng' },
  { slug: 'ha-giang-trai-nghiem', title: 'Hành trình bản làng Hà Giang', client: 'Sản phẩm của công ty', location: 'Hà Giang', category: 'du-lich', year: 2025, summary: 'Tour 4 ngày lưu trú homestay bản địa, kết hợp với hợp tác xã địa phương.', result: '1.200 khách trong mùa hoa tam giác mạch' },
  { slug: 'bao-tang-so', title: 'Bảo tàng trực tuyến', client: 'Bảo tàng tỉnh (mẫu)', location: 'Huế', category: 'so-hoa', year: 2023, summary: 'Scan 3D 120 hiện vật, xây dựng không gian trưng bày ảo trên web.', result: 'Mở cửa 24/7 cho khách toàn cầu' },
  { slug: 'team-building-cong-nghe', title: 'Team building công ty công nghệ', client: 'Doanh nghiệp (mẫu)', location: 'Hồ Tràm', category: 'du-lich', year: 2024, summary: 'Chương trình 2 ngày cho 250 nhân sự với kịch bản trò chơi riêng.', result: 'Được ký lại hợp đồng 3 năm liên tiếp' },
];

export const testimonials = [
  { quote: 'Từ khi có tour 360° trên website, khách hỏi ít hơn nhưng đặt phòng nhiều hơn. Họ đã thấy hết trước khi đến.', name: 'Chị Lan Anh', role: 'Chủ chuỗi homestay, Đà Lạt' },
  { quote: 'Đội vận hành làm việc như người nhà. Báo cáo doanh thu rõ ràng mỗi tháng, tôi không phải lo gì thêm.', name: 'Anh Minh Quân', role: 'Chủ đầu tư resort, Phú Quốc' },
  { quote: 'Đoàn 600 người mà mọi thứ chạy đúng giờ, từ xe đón sân bay đến gala tối. Nhân viên chúng tôi vẫn còn nhắc chuyến đi.', name: 'Chị Thu Hà', role: 'Trưởng phòng Nhân sự, khối ngân hàng' },
  { quote: 'Dự án số hóa hiện vật được làm rất cẩn thận, tôn trọng giá trị di sản. Khách quốc tế phản hồi rất tốt.', name: 'Ông Trần Văn Hùng', role: 'Giám đốc bảo tàng' },
];

export const faqs = [
  { q: 'Chi phí làm tour tham quan ảo 360° là bao nhiêu?', a: 'Tùy số lượng điểm chụp và yêu cầu thuyết minh. Một homestay nhỏ thường khoảng 8–15 điểm. Bạn gửi thông tin qua form liên hệ, chúng tôi báo giá chi tiết trong 24 giờ.' },
  { q: 'Tôi có thể chỉ thuê phần quản lý kênh bán, không thuê vận hành trọn gói?', a: 'Được. Các dịch vụ lưu trú có thể tách riêng: quản lý kênh bán và giá phòng, phần mềm PMS, hoặc đào tạo nhân sự.' },
  { q: 'Công ty có nhận thiết kế tour cho đoàn nhỏ không?', a: 'Có. Chúng tôi thiết kế tour riêng từ 2 khách trở lên, lịch trình điều chỉnh theo sở thích và ngân sách của bạn.' },
  { q: 'Thời gian triển khai một website đặt phòng mất bao lâu?', a: 'Thông thường 3–5 tuần, gồm thiết kế, nhập nội dung, kết nối cổng thanh toán và đồng bộ OTA.' },
  { q: 'Sau khi bàn giao, ai sẽ hỗ trợ kỹ thuật?', a: 'Mỗi dự án có một quản lý tài khoản riêng. Bạn được bảo hành 12 tháng và có thể gia hạn gói hỗ trợ hằng năm.' },
];

export const values = [
  { title: 'Chân thực', text: 'Hình ảnh số phải đúng với trải nghiệm thật. Chúng tôi không tô vẽ quá mức để rồi khách thất vọng khi đến nơi.' },
  { title: 'Bền vững', text: 'Ưu tiên hợp tác với cộng đồng địa phương và giải pháp giúp điểm đến phát triển lâu dài.' },
  { title: 'Tận tâm', text: 'Một đầu mối, phản hồi nhanh, đồng hành cả sau khi dự án kết thúc.' },
];

export const milestones = [
  { year: 2018, text: 'Thành lập tại TP. Hồ Chí Minh với 5 thành viên, khởi đầu từ dịch vụ chụp ảnh 360° cho khách sạn.' },
  { year: 2020, text: 'Ra mắt mảng vận hành lưu trú, đồng hành cùng các homestay vượt qua giai đoạn khó khăn.' },
  { year: 2022, text: 'Được cấp phép lữ hành, mở rộng sang thiết kế tour và du lịch doanh nghiệp.' },
  { year: 2024, text: 'Mở văn phòng Đà Nẵng, triển khai các dự án số hóa di sản đầu tiên.' },
  { year: 2026, text: 'Hơn 120 cơ sở lưu trú và nhiều điểm đến trên cả nước tin tưởng đồng hành.' },
];

export const team = [
  { name: 'Nguyễn Văn A', role: 'Giám đốc điều hành', bio: '15 năm trong ngành khách sạn và du lịch.' },
  { name: 'Trần Thị B', role: 'Giám đốc công nghệ', bio: 'Phụ trách các giải pháp số hóa và nền tảng đặt phòng.' },
  { name: 'Lê Văn C', role: 'Trưởng bộ phận lưu trú', bio: 'Từng quản lý vận hành nhiều resort 4–5 sao.' },
  { name: 'Phạm Thị D', role: 'Trưởng bộ phận lữ hành', bio: 'Thiết kế hơn 200 hành trình trong và ngoài nước.' },
];

export const partners = ['Booking.com', 'Agoda', 'Traveloka', 'Airbnb', 'Google Maps', 'Vietnam Airlines', 'Vietjet Air', 'VNPAY', 'MoMo'];
