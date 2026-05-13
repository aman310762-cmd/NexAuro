/* ═══════════════════════════════════════
   NEXAURO — Scroll Animations + Reveal System
   IntersectionObserver-based, performance-first
   ═══════════════════════════════════════ */

(function() {

  // ─── REVEAL ON SCROLL (fade-up) ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so animations replay if user scrolls back
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .slide-left, .slide-right, .scale-in, .stagger-in').forEach(el => {
    revealObserver.observe(el);
  });

  // ─── COUNT-UP NUMBERS ───
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        if (!target) return;

        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));
  document.querySelectorAll('.sp-counter').forEach(el => countObserver.observe(el));

  // ─── HERO STAGGERED ENTRANCE ───
  const heroElements = document.querySelectorAll('.trust-badges, .hero-content h1, .hero-sub, .hero-ctas, .scroll-indicator');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300);
  });

  // ─── 3D TILT EFFECT ON CARDS ───
  if (window.innerWidth > 768) {
    document.querySelectorAll('.sol-card, .pricing-card, .phase-card, .founder-card, .cs-sol-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease';

        // Shine effect
        const shine = card.querySelector('.card-shine');
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.12), transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
      });

      // Add shine overlay div
      const shine = document.createElement('div');
      shine.className = 'card-shine';
      shine.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;transition:background 0.15s ease;z-index:5;';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(shine);
    });
  }

  // ─── MAGNETIC BUTTON EFFECT ───
  if (window.innerWidth > 768) {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease';
      });
    });
  }

  // ─── TYPEWRITER EFFECT FOR HERO H1 ───
  // Add subtle gold word highlight
  const heroH1 = document.querySelector('.hero-content h1');
  if (heroH1) {
    const text = heroH1.innerHTML;
    heroH1.innerHTML = text
      .replace('Smart Infrastructure', '<span class="gold-highlight">Smart Infrastructure</span>')
      .replace('Modern Retail', '<span class="teal-highlight">Modern Retail</span>');
  }

  // ─── PARALLAX ORBS ON MOUSE MOVE (Desktop) ───
  if (window.innerWidth > 1024) {
    const orbs = document.querySelectorAll('.orb');
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

})();
