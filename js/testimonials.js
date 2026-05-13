/* ═══════════════════════════════════════
   NEXAURO — Testimonial Carousel with Touch Support
   ═══════════════════════════════════════ */

(function() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  let autoTimer;
  let cardsPerView = 3;
  let touchStartX = 0;
  let touchEndX = 0;

  function getCardsPerView() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  function updateCarousel() {
    cardsPerView = getCardsPerView();
    const cardWidth = cards[0].offsetWidth + 24;
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update active card
    cards.forEach((card, i) => {
      card.classList.remove('active');
      if (cardsPerView === 3) {
        if (i === currentIndex + 1) card.classList.add('active');
      } else {
        if (i === currentIndex) card.classList.add('active');
      }
    });
  }

  function setCardWidths() {
    cardsPerView = getCardsPerView();
    const containerWidth = track.parentElement.offsetWidth;
    if (cardsPerView === 1) {
      cards.forEach(card => { card.style.width = (containerWidth - 24) + 'px'; });
    } else {
      const w = (containerWidth - (cardsPerView - 1) * 24) / cardsPerView;
      cards.forEach(card => { card.style.width = w + 'px'; });
    }
  }

  function next() {
    const maxIndex = Math.max(0, cards.length - getCardsPerView());
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prev() {
    const maxIndex = Math.max(0, cards.length - getCardsPerView());
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function stopAuto() { clearInterval(autoTimer); }

  // Init
  setCardWidths();
  updateCarousel();
  startAuto();

  // Controls
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); currentIndex = i; updateCarousel(); startAuto(); });
  });

  // Pause on hover
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    // Touch swipe support
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) next();
      else if (touchEndX - touchStartX > swipeThreshold) prev();
      startAuto();
    }, { passive: true });
  }

  // Resize
  window.addEventListener('resize', () => { setCardWidths(); updateCarousel(); });
})();
