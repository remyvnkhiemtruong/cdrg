// Gallery page script

// Define your gallery images here. Captions can be provided per language.
const galleryImages = [
  {
    src: 'assets/images/gallery1.jpg',
    caption: {
      vi: 'Khoảnh khắc vũ trụ 1',
      en: 'Cosmic moment 1'
    }
  },
  {
    src: 'assets/images/gallery2.jpg',
    caption: {
      vi: 'Khoảnh khắc vũ trụ 2',
      en: 'Cosmic moment 2'
    }
  },
  {
    src: 'assets/images/gallery3.jpg',
    caption: {
      vi: 'Khoảnh khắc vũ trụ 3',
      en: 'Cosmic moment 3'
    }
  }
];

function renderGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;
  container.innerHTML = '';
  const lang = document.body.getAttribute('data-lang') || 'vi';
  galleryImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${img.src}" alt="${img.caption[lang]}" loading="lazy" data-index="${index}">`;
    container.appendChild(item);
  });
  // Attach click events to open lightbox
  container.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', function () {
      openLightbox(parseInt(this.getAttribute('data-index')));
    });
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const lang = document.body.getAttribute('data-lang') || 'vi';
  const imgObj = galleryImages[index];
  if (lightbox && lightboxImg) {
    lightboxImg.src = imgObj.src;
    captionEl.textContent = imgObj.caption[lang];
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('galleryContainer')) return;
  renderGallery();
  const closeBtn = document.getElementById('lightbox');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      // close only if clicked outside image
      if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg' || e.target.id === 'lightboxCaption') {
        closeLightbox();
      }
    });
  }
});