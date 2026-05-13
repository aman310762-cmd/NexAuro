/* ═══════════════════════════════════════
   NEXAURO — Main Orchestrator + Global Polish
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  // ─── Preloader ───
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 400);
    }
  });

  // ─── Body Fade-In ───
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);

  // ─── Custom Cursor (desktop only) ───
  if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = (mouseX - 4) + 'px';
      dot.style.top = (mouseY - 4) + 'px';
    });

    // Smooth ring follow with lerp
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = (ringX - 12) + 'px';
      ring.style.top = (ringY - 12) + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hide on links/buttons hover (scale up)
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'scale(1.5)';
        ring.style.borderColor = 'var(--gold)';
        ring.style.opacity = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'scale(1)';
        ring.style.borderColor = '';
        ring.style.opacity = '1';
      });
    });

    // Disable on touch
    window.addEventListener('touchstart', () => {
      dot.style.display = 'none';
      ring.style.display = 'none';
    }, { once: true });
  }

  // ─── Smooth scroll for all anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Active nav link highlight on scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ─── Floating card gentle hover animation ───
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, i) => {
    const delay = i * 0.7;
    card.style.animation = `floatGently ${3 + i * 0.5}s ease-in-out ${delay}s infinite`;
  });

  // Add float animation keyframes
  const floatStyle = document.createElement('style');
  floatStyle.textContent = `
    @keyframes floatGently {
      0%, 100% { transform: translateY(0) rotate(var(--float-rotate, 3deg)); }
      50% { transform: translateY(-8px) rotate(var(--float-rotate, 3deg)); }
    }
  `;
  document.head.appendChild(floatStyle);

  // ─── Parallax effect on hero scroll ───
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const parallax = window.scrollY * 0.3;
      if (heroContent) {
        heroContent.style.transform = `translateY(${parallax}px)`;
        heroContent.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.6;
      }
    }
  });

});
