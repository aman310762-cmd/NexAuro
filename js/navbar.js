/* ═══════════════════════════════════════
   NEXAURO — Navbar Scroll + Hamburger + Scroll Progress
   ═══════════════════════════════════════ */

(function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const progressBar = document.getElementById('scroll-progress');

  // Scroll state + progress bar
  window.addEventListener('scroll', () => {
    // Navbar scrolled state
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('menu-open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('menu-open')) {
      navbar.classList.remove('menu-open');
    }
  });
})();
