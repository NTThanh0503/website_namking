# Hướng nội dung website NAM KINH GROUP

Viết theo tài liệu *Chiến lược thương hiệu và hệ sinh thái sản phẩm Nam Kinh Digital, giai đoạn 2027–2029*.

## 1. Định vị

- **Website thuộc**: NAM KINH GROUP. Thương hiệu công nghệ đứng tên giải pháp là **Nam Kinh Digital**.
- **Định vị**: Nền tảng Số hóa & Kết nối Kinh doanh Du lịch.
- **Khẩu hiệu**: Số hóa điểm đến – Kết nối trải nghiệm – Gia tăng giá trị.
- **Đọc giả chính**: chủ điểm đến, doanh nghiệp du lịch, cơ quan quản lý, đối tác (B2B). Du khách là người dùng cuối, không phải người trả phí.
- **Thương hiệu cộng đồng**: Kể Miền Di Sản – "Đánh thức di sản bằng công nghệ", do Nam Kinh Digital phát triển và vận hành. Website doanh nghiệp chỉ giới thiệu, Kể Miền Di Sản có website và Facebook riêng.

## 2. Thông điệp cốt lõi

Nam Kinh Digital không chỉ làm website hay số hóa rồi bàn giao. Đây là **một hệ thống tích hợp**:

> Giới thiệu điểm đến → Trải nghiệm số → Đặt dịch vụ → Quản trị → Phân tích dữ liệu

Mô hình **ba tầng**: Số hóa → Kết nối thương mại → Dữ liệu & hệ sinh thái.

## 3. Cấu trúc trang

| Trang | Nội dung chính |
|---|---|
| Trang chủ | Khẩu hiệu · 3 giải pháp chính · 3 tầng giá trị + quy trình vận hành · hệ sinh thái 5 sản phẩm · 4 nhóm khách hàng + du khách · điểm khác biệt · mô hình triển khai mẫu · thông điệp cho từng nhóm · tin tức · hỏi đáp |
| Giới thiệu | Chúng tôi là ai · tầm nhìn, sứ mệnh · hai thương hiệu · giá trị cốt lõi · lộ trình 2027–2029 · đội ngũ |
| Giải pháp | Điểm Đến Số · Kết Nối Du Lịch · Trải nghiệm thông minh · hệ sinh thái · quy trình |
| Dự án | Mô hình triển khai mẫu, ghi rõ là minh họa, thay dần bằng dự án thật |
| Tin tức | Số hóa điểm đến, kinh doanh du lịch trực tuyến, cộng đồng Kể Miền Di Sản |

## 4. Ba giải pháp thương mại (trang chi tiết)

1. **Nam Kinh Điểm Đến Số** (`/dich-vu/diem-den-so`): ảnh 360°, tour ảo, website và bản đồ số, thuyết minh đa ngôn ngữ, QR/NFC, mô hình 3D. Dành cho di tích, bảo tàng, làng nghề, khu du lịch, cơ quan quản lý.
2. **Nam Kinh Kết Nối Du Lịch** (`/dich-vu/ket-noi-du-lich`): sản phẩm cốt lõi, phần mềm thuê bao. Có giao diện cho du khách và giao diện quản trị cho nhà cung cấp. Ưu tiên tích hợp với phần mềm đặt phòng/POS sẵn có.
3. **Trải nghiệm du lịch thông minh** (`/dich-vu/trai-nghiem-so`): trợ lý AI, AR/VR, trò chơi khám phá, bản đồ hành trình, bản sao số. Triển khai theo dự án, phần 3D chuyên sâu làm cùng đối tác.

Hai sản phẩm còn lại chỉ xuất hiện trong phần hệ sinh thái: **Kể Miền Di Sản** (cộng đồng) và **Dữ liệu du lịch & kinh tế đêm** (định hướng dài hạn).

## 5. Nguyên tắc viết

- **Trung thực**: không đưa số liệu kinh doanh, số khách hàng hay lời khách hàng khi chưa có. Các con số trên web là con số về mô hình (3 tầng, 5 nhóm giải pháp, 4 nhóm khách hàng, 2 thương hiệu). Dự án ghi "Mô hình mẫu", kết quả ghi "Mục tiêu: …".
- **Không công bố giá**: tài liệu nêu giá chỉ để kiểm chứng (Điểm Đến Số khoảng 60–150 triệu đồng; Kết Nối: phí triển khai 15–30 triệu đồng, thuê bao 1–2 triệu đồng/tháng). Trên web chỉ mô tả cách tính phí và mời liên hệ báo giá.
- **Dữ liệu**: luôn nói rõ "trong phạm vi được phép", "có căn cứ pháp lý và quyền sử dụng".
- **Giọng văn**: xưng "chúng tôi", gọi khách là "anh chị" hoặc "bạn", rõ ràng, tôn trọng di sản, không phóng đại.

## 6. Hình ảnh và hiệu ứng

- Màu đỏ đô #680A12 và màu ngà #F0ECE9, theo logo.
- Phần đầu trang chủ có mô hình **Chùa Một Cột 3D dạng khung dây số**, xoay chậm, có tia quét "số hóa" từ dưới lên, lưới sàn số, gợn nước và hạt dữ liệu, để thể hiện việc đưa di sản thật lên môi trường số (`src/scripts/pagoda.ts`).
- Phần đầu các trang con có mạng điểm dữ liệu trôi nhẹ.

## 7. Việc cần làm khi có dữ liệu thật

- Thay số điện thoại, email, mã số thuế, tên pháp lý trong `src/data/site.ts`.
- Thay đội ngũ (hiện là tên mẫu) và ảnh trong `public/images/`.
- Khi bàn giao điểm mẫu đầu tiên: thêm vào `projects`, đổi "Mô hình mẫu" thành tên khách hàng và "Mục tiêu" thành kết quả đo được. Khi có phản hồi thật, có thể thêm lời khách hàng bên cạnh phần thông điệp.
- Gắn link website và Facebook của Kể Miền Di Sản khi đã có.
