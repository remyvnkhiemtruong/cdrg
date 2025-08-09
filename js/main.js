// Common site functionality: language and theme toggle

function initSite() {
  // Set language
  const savedLang = localStorage.getItem('lang') || 'vi';
  applyLanguage(savedLang);

  // Attach language switchers if present
  const viBtn = document.getElementById('langViBtn');
  const enBtn = document.getElementById('langEnBtn');
  if (viBtn) {
    viBtn.addEventListener('click', function () {
      setLang('vi');
    });
  }
  if (enBtn) {
    enBtn.addEventListener('click', function () {
      setLang('en');
    });
  }

  // Theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.body.setAttribute('data-lang', lang);
  const viElements = document.querySelectorAll('.lang-vi');
  const enElements = document.querySelectorAll('.lang-en');
  viElements.forEach(function (el) {
    el.style.display = (lang === 'vi') ? '' : 'none';
  });
  enElements.forEach(function (el) {
    el.style.display = (lang === 'en') ? '' : 'none';
  });
  // Optionally highlight active language button
  const viBtn = document.getElementById('langViBtn');
  const enBtn = document.getElementById('langEnBtn');
  if (viBtn && enBtn) {
    if (lang === 'vi') {
      viBtn.classList.add('active-lang');
      enBtn.classList.remove('active-lang');
    } else {
      enBtn.classList.add('active-lang');
      viBtn.classList.remove('active-lang');
    }
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initSite);