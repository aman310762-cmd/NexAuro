/* ═══════════════════════════════════════
   NEXAURO — FAQ Accordion
   ═══════════════════════════════════════ */

(function() {
  const items = document.querySelectorAll('.faq-q');
  items.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const answer = b.nextElementSibling;
        if (answer) answer.style.maxHeight = '0';
      });

      // Toggle clicked
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
