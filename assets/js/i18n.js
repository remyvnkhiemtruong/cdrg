// Simple i18n loader using data-i18n attributes
const dict = {
  vi: {
    "nav.home":"Trang chủ",
    "nav.news":"Tin tức",
    "nav.tournaments":"Giải đấu",
    "nav.gallery":"Thư viện",
    "nav.memories":"Kỷ niệm",
    "nav.blog":"Blog",
    "nav.discord":"Discord",
    "nav.about":"About/Team",
    "nav.contact":"Liên hệ",
    "hero.title":"Lưu giữ những kỷ niệm của cộng đồng",
    "hero.tag":"Cộng đồng game thủ • Regeneration",
    "hero.cta":"Xem Kỷ niệm",
    "footer.by":"Xây dựng bởi cộng đồng",
    "mem.form.title":"Đăng kỷ niệm",
    "mem.name":"Tên (tùy chọn)",
    "mem.anon":"Đăng ẩn danh",
    "mem.content":"Nội dung",
    "mem.image":"Link ảnh (tùy chọn)",
    "mem.submit":"Đăng",
    "mem.empty":"Chưa có bài nào. Hãy là người đầu tiên!",
    "mem.localNotice":"(Dữ liệu đang lưu tạm trên trình duyệt của bạn. Để lưu vĩnh viễn, bật Giscus hoặc tích hợp backend sau.)",
    "search.placeholder":"Tìm kiếm..."
  },
  en: {
    "nav.home":"Home",
    "nav.news":"News",
    "nav.tournaments":"Tournaments",
    "nav.gallery":"Gallery",
    "nav.memories":"Memories",
    "nav.blog":"Blog",
    "nav.discord":"Discord",
    "nav.about":"About/Team",
    "nav.contact":"Contact",
    "hero.title":"Preserving our community’s memories",
    "hero.tag":"Gaming community • Regeneration",
    "hero.cta":"View Memories",
    "footer.by":"Built by the community",
    "mem.form.title":"Post a memory",
    "mem.name":"Name (optional)",
    "mem.anon":"Post anonymously",
    "mem.content":"Content",
    "mem.image":"Image link (optional)",
    "mem.submit":"Post",
    "mem.empty":"No posts yet. Be the first!",
    "mem.localNotice":"(Currently stored in your browser only. Enable Giscus or a backend to persist.)",
    "search.placeholder":"Search..."
  }
};

function applyI18n(lang){
  const strings = dict[lang] || dict.vi;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(strings[key]) el.textContent = strings[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(strings[key]) el.setAttribute('placeholder', strings[key]);
  });
}

(function(){
  const stored = localStorage.getItem('lang') || 'vi';
  document.documentElement.setAttribute('lang', stored);
  window.currentLang = stored;
  document.addEventListener('DOMContentLoaded', ()=>{
    const sel = document.getElementById('langSelect');
    if(sel){ sel.value = stored; sel.addEventListener('change', e=>{
      const l = e.target.value;
      localStorage.setItem('lang', l);
      document.documentElement.setAttribute('lang', l);
      applyI18n(l);
    }); }
    applyI18n(stored);
  });
})();
