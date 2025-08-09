# Regeneration

Trang web cộng đồng lưu giữ kỷ niệm (GitHub Pages).

## Cấu trúc
- Nhiều trang: Trang chủ, Tin tức, Giải đấu, Thư viện, Kỷ niệm, Blog, Discord, About/Team, Liên hệ, Nội quy, Quyền riêng tư.
- Song ngữ VI/EN (chuyển ở menu). i18n dùng `data-i18n` và `assets/js/i18n.js`.
- Theme dark xanh dương, có toggle light/dark.
- Kỷ niệm: lưu localStorage (client-side). Có chỗ gắn Giscus để công khai (cần repo config).
- Tìm kiếm: ô tìm kiếm lọc nội dung trên trang (fallback). Có thể tích hợp Lunr/Algolia sau.
- Hiệu năng: lazy-load ảnh; CSS/JS gọn nhẹ.
- Analytics: bật GA bằng cách điền `GA_MEASUREMENT_ID` trong `<head>`.

## Deploy (GitHub Pages)
1. Tạo repo public trên GitHub, upload toàn bộ file/folder trong thư mục này.
2. Vào **Settings → Pages** → Source: *Deploy from a branch* → Branch: **main** (root) → Save.
3. Nếu dùng domain `cdrg.io.vn`, giữ file `CNAME` để GitHub Pages trỏ đúng domain.
4. Cấu hình DNS: thêm CNAME `cdrg.io.vn` → `<username>.github.io`.

## Tuỳ chỉnh nhanh
- Thay logo: `assets/img/logo.svg` (đổi sang logo của bạn).
- Cập nhật link Discord, form đăng ký ở các trang tương ứng.
- Gắn Giscus: thay `data-repo`, `data-repo-id`, `data-category-id` theo hướng dẫn tại https://giscus.app

## Ghi chú
- Khu vực Kỷ niệm hiện **không có backend**. Dữ liệu lưu cục bộ (mỗi người thấy bài của chính họ). Để lưu vĩnh viễn và chia sẻ công khai:
  - Dùng **Giscus** (lưu trên GitHub Discussions) hoặc
  - Tích hợp dịch vụ như **Staticman**, **Netlify Forms**, hoặc backend riêng.
