// Theme toggle, mobile menu, footer year, simple search fallback
document.addEventListener('DOMContentLoaded', ()=>{
  const toggleBtn = document.getElementById('toggleMenu');
  const menu = document.getElementById('menu');
  toggleBtn?.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open? 'true':'false');
  });
  const themeBtn = document.getElementById('themeBtn');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme){ root.setAttribute('data-theme', savedTheme); themeBtn.textContent = savedTheme==='light'?'🌞':'🌙'; }
  themeBtn?.addEventListener('click', ()=>{
    const now = root.getAttribute('data-theme')==='light' ? 'dark' : 'light';
    root.setAttribute('data-theme', now);
    localStorage.setItem('theme', now);
    themeBtn.textContent = now==='light'?'🌞':'🌙';
  });
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  // Simple on-page search (fallback). For Lunr/Algolia, integrate separately.
  const searchInput = document.getElementById('siteSearch');
  if(searchInput){
    searchInput.addEventListener('input', ()=>{
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('[data-searchable]').forEach(card=>{
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
});
