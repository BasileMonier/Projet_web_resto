    /* ---- Carousel (uniquement sur l'index) ---- */
    const slides    = document.getElementById('carousel-slides');
    const dots      = document.querySelectorAll('.dot');
    const prevBtn   = document.getElementById('prev-btn');
    const nextBtn   = document.getElementById('next-btn');
    const TOTAL     = dots.length;
    let current     = 0;
    let timer;

    function goTo(idx) {
      current = (idx + TOTAL) % TOTAL;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 5000);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.idx); startAuto(); }));

    // Swipe basique
    let startX = 0;
    slides.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    slides.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
    });

    startAuto();