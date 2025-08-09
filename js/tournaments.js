// Tournaments page script

// Define your events here. Use ISO 8601 date strings for the event start time in your local timezone.
const tournaments = [
  {
    id: 't1',
    title: { vi: 'Giải đấu Mùa Hè 2025', en: 'Summer Tournament 2025' },
    date: '2025-08-20T15:00:00',
    description: {
      vi: 'Giải đấu mùa hè dành cho mọi thành viên. Tham gia để tranh tài và giành giải thưởng hấp dẫn!',
      en: 'A summer tournament open to all members. Join to compete and win attractive prizes!'
    },
    link: '#'
  },
  {
    id: 't2',
    title: { vi: 'Giải đấu Kỷ niệm 2025', en: 'Anniversary Cup 2025' },
    date: '2025-12-01T18:00:00',
    description: {
      vi: 'Giải đấu kỷ niệm thành lập cộng đồng với nhiều phần thưởng giá trị.',
      en: 'An anniversary tournament celebrating our community with valuable prizes.'
    },
    link: '#'
  }
];

function renderTournaments() {
  const container = document.getElementById('tournamentContainer');
  if (!container) return;
  container.innerHTML = '';
  const lang = document.body.getAttribute('data-lang') || 'vi';
  tournaments.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'tournament-card';
    card.innerHTML = `
      <h3>${evt.title[lang]}</h3>
      <p>${evt.description[lang]}</p>
      <div class="countdown" id="countdown-${evt.id}"></div>
      <a href="${evt.link}" target="_blank">${lang === 'vi' ? 'Đăng ký' : 'Register'}</a>
    `;
    container.appendChild(card);
  });
  updateCountdowns();
}

function updateCountdowns() {
  const now = new Date().getTime();
  tournaments.forEach(evt => {
    const target = new Date(evt.date).getTime();
    const diff = target - now;
    const element = document.getElementById(`countdown-${evt.id}`);
    if (!element) return;
    if (diff <= 0) {
      element.textContent = (document.body.getAttribute('data-lang') === 'vi') ? 'Đã bắt đầu' : 'Started';
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const lang = document.body.getAttribute('data-lang') || 'vi';
      if (lang === 'vi') {
        element.textContent = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
      } else {
        element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Only run on tournaments page
  if (!document.getElementById('tournamentContainer')) return;
  renderTournaments();
  // update every second
  setInterval(updateCountdowns, 1000);
});