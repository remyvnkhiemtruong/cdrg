# Tài liệu kỹ thuật cho trang web **Regeneration**

Trang web **Regeneration** là một cổng thông tin đa trang dành cho cộng đồng game thủ. Tất cả mã nguồn nằm trong thư mục `regeneration_site` gồm các file HTML, CSS, JS và tài nguyên hình ảnh. Dưới đây là hướng dẫn tổng quan để hiểu cấu trúc dự án, tùy chỉnh nội dung, triển khai trên GitHub Pages và mở rộng tính năng.

## 1. Cấu trúc thư mục

```
regeneration_site/
│  CNAME                # chỉ định tên miền tuỳ chỉnh (cdrg.io.vn)
│  index.html           # Trang chủ (home)
│  news.html            # Tin tức
│  tournaments.html     # Giải đấu
│  gallery.html         # Thư viện ảnh
│  memory.html          # Kỷ niệm (Memory wall)
│  blog.html            # Danh sách bài blog
│  about.html           # Giới thiệu
│  contact.html         # Liên hệ
│  discord.html         # Trang mời tham gia Discord
│  rules.html           # Nội quy
│  privacy.html         # Chính sách quyền riêng tư
│
├─ posts/               # Thư mục chứa các bài blog chi tiết
│    post1.html         # Bài viết "Kinh nghiệm thi đấu eSports / eSports tournament experiences"
│    post2.html         # Bài viết "Những khoảnh khắc đáng nhớ… / Memorable moments…"
│
├─ assets/
│   └─ images/          # Hình ảnh sử dụng trong trang
│        logo.png       # Logo chính (cung cấp bởi người dùng)
│        hero.jpg       # Ảnh nền cho trang chủ (màu sắc đen/đỏ theo logo)
│        gallery*.jpg   # Ảnh mẫu cho thư viện
│
├─ css/
│   └─ style.css        # Tập tin định dạng (CSS) với biến màu & chế độ sáng/tối
└─ js/
    └─ script.js        # Tập tin JavaScript xử lý giao diện, dịch ngôn ngữ, kỷ niệm
```

## 2. Tính năng chính

### Trang chủ (index.html)

* Phần **hero** với slogan và nút "Join Discord" liên kết tới server Discord (https://discord.gg/8NHd7aAab2). Ảnh nền `hero.jpg` có các dải màu đỏ – trắng – đen phù hợp với logo.
* Mục **Khám phá/Explore** liệt kê các phần Tin tức, Giải đấu, Thư viện, Kỷ niệm và Blog. Mỗi ô có nút dẫn tới trang tương ứng.
* Hỗ trợ hai ngôn ngữ (Tiếng Việt và English) qua nút chuyển `VI`/`EN` góc phải. Nội dung được dịch bằng cách gắn thuộc tính `data-lang` trên thẻ HTML và mảng dịch trong `js/script.js`.
* Có nút đổi **chế độ sáng/tối** (icon mặt trăng/mặt trời). Trạng thái lưu vào `localStorage` nên trang nhớ lựa chọn khi tải lại.

### Trang Tin tức (news.html)

* Hiển thị các thẻ tin tóm tắt (tựa đề, ngày tháng và mô tả). Để thêm/sửa tin, chỉnh trực tiếp nội dung HTML.

### Trang Giải đấu (tournaments.html)

* Liệt kê các giải đấu sắp tới với ngày tổ chức và mô tả.
* Mỗi giải có đồng hồ **đếm ngược** (countdown) tự động cập nhật bằng JavaScript. Bạn có thể sửa ngày (`2025-08-20`, `2025-12-31`,…) ở các thuộc tính `data-date` trong HTML để hiển thị thời gian đếm ngược khác.
* Nút **Đăng ký** có thể trỏ tới Google Form hoặc biểu mẫu ngoài (sửa thuộc tính `href="#"`).

### Thư viện ảnh (gallery.html)

* Trình bày ảnh theo dạng grid, tự co giãn. Ảnh nằm trong `assets/images/gallery*.jpg`.
* Sử dụng thư viện **Lightbox2** (được nhúng trong `script.js`) để mở ảnh ở dạng popup lớn. Để thêm ảnh mới, lưu file vào `assets/images` rồi chèn thêm thẻ `<a href="…"><img src="…"></a>` theo mẫu vào `gallery.html`.

### Kỷ niệm (memory.html)

* **Memory Wall** – nơi thành viên có thể đăng kỷ niệm.
* Biểu mẫu gồm:
  - **Tên (tùy chọn)**: tên người đăng, có thể bỏ trống hoặc dùng nick.
  - **Nội dung**: mô tả kỷ niệm.
  - **Link ảnh (tùy chọn)**: url hình ảnh minh họa.
* Bài đăng được lưu vào **localStorage** trên trình duyệt người dùng, nên không cần backend. Khi tải lại trang, các kỷ niệm vẫn được hiển thị.
* Bên dưới mỗi bài có nút **trái tim** để bấm “thích”; số lượt thích cũng lưu trong localStorage.
* Ô **Search** cho phép tìm nhanh theo tên hoặc nội dung. Mã lọc thực thi trực tiếp trên trình duyệt.

### Blog (blog.html & posts)

* Danh sách bài blog với nút **Đọc tiếp / Read more**. Nội dung bài viết nằm trong thư mục `posts/`.
* Mỗi bài được viết ở cả hai ngôn ngữ. Nút `VI`/`EN` trong trang bài viết cho phép chuyển đổi.

### About (about.html)

* Giới thiệu tổng quan cộng đồng, sứ mệnh và đội ngũ. Bạn chỉnh sửa nội dung trực tiếp ở file này.

### Contact (contact.html)

* Biểu mẫu liên hệ gồm tên, email và lời nhắn. Nút **Send** hiện tại dùng `mailto:` (người dùng nhấn sẽ mở phần mềm email). Nếu muốn gửi qua Formspree/Google Forms, hãy thay thuộc tính `action` và `method` của form.
* Địa chỉ email mặc định là `info@cdrg.io.vn` (sửa trong HTML nếu cần).

### Discord (discord.html)

* Trang giới thiệu Discord với nút **Join server** trỏ thẳng tới liên kết mời.

### Nội quy & Quyền riêng tư (rules.html, privacy.html)

* Liệt kê các quy tắc, quy định cộng đồng và chính sách bảo mật.
* Sửa nội dung trực tiếp nếu cộng đồng cập nhật quy tắc mới.

## 3. Tùy chỉnh giao diện

### Màu sắc & logo

* Logo cộng đồng nằm trong `assets/images/logo.png`. Thay file này nếu muốn dùng logo mới.
* Các biến màu (chủ đạo, phụ, nhấn…) được khai báo trong `css/style.css` ở phần `:root`:

```css
:root {
    --primary-color: #000000;       /* nền tối */
    --secondary-color: #1a1a1a;     /* nền phụ */
    --accent-color: #c94c57;        /* màu nhấn đỏ */
    --text-color: #f5f5f5;          /* chữ sáng */
    --header-bg: #111111;           /* nền header */
    --card-bg: #0a0a0a;             /* nền thẻ */
}
```

* Chế độ sáng được điều chỉnh trong `body.light-mode` ở cuối file CSS. Thay đổi giá trị tại đây để phù hợp với nhận diện thương hiệu.

### Ảnh nền

* `assets/images/hero.jpg` là hình nền cho phần hero trang chủ. Bạn có thể thay bằng hình ảnh khác (kích thước lớn ~1920×1080) và vẫn giữ màu sắc đen – đỏ – trắng để đồng bộ với logo.

### Nội dung động

* **Tin tức, bài blog, lịch giải đấu**: chỉ cần mở file HTML tương ứng và chỉnh sửa nội dung (tiêu đề, mô tả, ngày tháng). Các ngày ở giải đấu dùng chuẩn `YYYY-MM-DD` trong thuộc tính `data-date` để đồng hồ đếm ngược hoạt động.
* **Bài kỷ niệm**: không cần sửa file, người dùng tự đăng lên. Nếu muốn xóa toàn bộ kỷ niệm, mở trình duyệt và xóa localStorage cho domain.

## 4. Triển khai trên GitHub Pages

1. **Tạo repository mới** trên GitHub (public), ví dụ `regeneration-site`.
2. Tải toàn bộ thư mục `regeneration_site` lên repository (bao gồm mọi file con).
3. Nếu sử dụng tên miền tuỳ chỉnh (`cdrg.io.vn`): giữ nguyên file `CNAME` và trỏ DNS của tên miền về `yourusername.github.io` bằng bản ghi CNAME.
4. Trong **Settings → Pages**:
   - **Source**: chọn `Deploy from a branch`.
   - **Branch**: `main` (hoặc branch bạn đang lưu code), thư mục `/` (root).
   - Lưu lại. Sau vài phút, trang sẽ được xuất bản tại `https://yourusername.github.io/regeneration-site/` hoặc tên miền tùy chỉnh.

## 5. Mở rộng tính năng (nếu cần)

* **Formspree/Google Forms** cho trang liên hệ và đăng ký giải đấu.
* **Staticman/Giscus/Utterances** để lưu bài kỷ niệm lên GitHub thay vì localStorage (cần cấu hình GitHub OAuth).
* **Tìm kiếm toàn site** bằng Lunr.js hoặc Algolia nếu số lượng nội dung tăng.
* **PWA (Progressive Web App)** để người dùng cài site như ứng dụng offline.
* **Các sự kiện khác**: thêm trang lịch, đếm ngược, bảng xếp hạng giải đấu (nhúng từ Challonge/Toornament).

Trang web này được thiết kế thuần HTML/CSS/JS nên dễ dàng chỉnh sửa. Mọi tính năng hiện có đều hoạt động trên GitHub Pages mà không cần máy chủ phía sau. Hy vọng tài liệu này giúp bạn duy trì và phát triển cộng đồng **Regeneration**.
