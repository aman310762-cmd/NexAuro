/* ═══════════════════════════════════════
   NEXAURO — Solutions Detail Panel
   ═══════════════════════════════════════ */

(function() {
  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('panel-overlay');
  if (!panel || !overlay) return;

  const verticals = [
    {
      icon: '🍽️', name: 'Restaurants & Cafes',
      steps: [
        'Map your reservation flow and no-show triggers',
        'Build automated booking + kitchen display system',
        'Go live and watch no-shows drop within 30 days'
      ]
    },
    {
      icon: '💎', name: 'Jewelry Businesses',
      steps: [
        'Audit your inventory chaos across all locations',
        'Deploy digital inventory + WhatsApp ordering catalog',
        'Automate GST and watch online orders roll in'
      ]
    },
    {
      icon: '🦷', name: 'Dental Clinics',
      steps: [
        'Digitize your patient record system and appointment flow',
        'Launch automated reminders and treatment plan tracker',
        'Monitor no-show rates drop week by week'
      ]
    },
    {
      icon: '🏨', name: 'Hotels & Resorts',
      steps: [
        'Unify all booking channels into one dashboard',
        'Deploy guest preference AI and upsell engine',
        'Optimize revenue daily with real-time analytics'
      ]
    },
    {
      icon: '✂️', name: 'Salons & Beauty Clinics',
      steps: [
        'Map all booking friction points and no-show patterns',
        'Launch loyalty system + automated appointment reminders',
        'Track staff performance and optimize service recommendations'
      ]
    }
  ];

  function openPanel(index) {
    const v = verticals[index];
    if (!v) return;

    let stepsHtml = v.steps.map((s, i) => `
      <div class="panel-step">
        <div class="panel-step-num">0${i+1}</div>
        <div class="panel-step-text">${s}</div>
      </div>
    `).join('');

    panel.innerHTML = `
      <button class="panel-close" aria-label="Close panel">&times;</button>
      <div class="panel-icon">${v.icon}</div>
      <div class="panel-title">${v.name}</div>
      <div class="panel-divider"></div>
      <div class="panel-subtitle">How we transform your ${v.name.toLowerCase()}</div>
      ${stepsHtml}
      <div class="panel-mockup"><span>Live Demo Preview</span></div>
      <a href="tel:+919315807233" class="btn-primary panel-cta">Book a Strategy Call →</a>
    `;

    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    panel.querySelector('.panel-close').addEventListener('click', closePanel);
  }

  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', closePanel);

  // Attach to card CTAs
  document.querySelectorAll('.sol-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.sol-card');
      const index = parseInt(card.dataset.vertical);
      openPanel(index);
    });
  });
})();
