    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    let index = 0;

    function showImage(i) {
      const item = items[i];
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.dataset.alt;
      index = i;
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        showImage(i);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    document.getElementById('closeLightbox').addEventListener('click', () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    });

    document.getElementById('prevLightbox').addEventListener('click', () => {
      index = (index - 1 + items.length) % items.length;
      showImage(index);
    });

    document.getElementById('nextLightbox').addEventListener('click', () => {
      index = (index + 1) % items.length;
      showImage(index);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });