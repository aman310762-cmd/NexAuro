/* ═══════════════════════════════════════
   NEXAURO — Contact Form Handler
   Dual submission: Google Sheets + Formspree
   No personal email exposed on frontend
   ═══════════════════════════════════════ */

(function() {
  const form = document.getElementById('nexauro-form');
  if (!form) return;

  // ─── Configuration ───
  // REPLACE with your actual Google Apps Script Web App URL after deployment
  const GOOGLE_SCRIPT_URL = '';
  // REPLACE with your actual Formspree form ID
  const FORMSPREE_URL = 'https://formspree.io/f/xpwrjkqv';

  // ─── Math CAPTCHA ───
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const captchaQ = document.getElementById('captcha-question');
  const captchaA = document.getElementById('f-captcha');
  if (captchaQ) captchaQ.textContent = `${num1} + ${num2} = ?`;

  // ─── Form Submission ───
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors();

    // Honeypot check
    const hp = document.getElementById('f-company-url');
    if (hp && hp.value) return;

    // Validate
    const validations = [
      { id: 'f-name', msg: 'Full name is required' },
      { id: 'f-biz', msg: 'Business name is required' },
      { id: 'f-phone', msg: 'Phone number is required' },
      { id: 'f-email', msg: 'Email address is required' }
    ];

    let hasError = false;
    validations.forEach(({ id, msg }) => {
      const input = document.getElementById(id);
      if (!input || !input.value.trim()) {
        showError(id, msg);
        hasError = true;
      }
    });

    // Email format
    const emailInput = document.getElementById('f-email');
    if (emailInput && emailInput.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        showError('f-email', 'Please enter a valid email address');
        hasError = true;
      }
    }

    // Phone format
    const phoneInput = document.getElementById('f-phone');
    if (phoneInput && phoneInput.value.trim()) {
      if (phoneInput.value.replace(/[\s\-\(\)]/g, '').length < 10) {
        showError('f-phone', 'Please enter a valid phone number');
        hasError = true;
      }
    }

    // CAPTCHA
    if (captchaA) {
      if (parseInt(captchaA.value) !== num1 + num2) {
        showError('f-captcha', 'Incorrect answer, please try again');
        hasError = true;
      }
    }

    if (hasError) return;

    // Collect data
    const formData = {
      name: getValue('f-name'),
      business: getValue('f-biz'),
      phone: getValue('f-phone'),
      email: getValue('f-email'),
      industry: getValue('f-industry'),
      package: getValue('f-package'),
      revenue: getValue('f-revenue'),
      message: getValue('f-msg'),
      whatsapp: document.getElementById('f-wa')?.checked ? 'Yes' : 'No',
      _subject: `New NEXAURO Lead — ${getValue('f-package') || 'General'} Package Inquiry`,
      submitted_at: new Date().toISOString()
    };

    // Loading state
    const submitBtn = document.getElementById('f-submit');
    const btnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px"><svg width="16" height="16" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="3" fill="none" stroke-dasharray="32" stroke-dashoffset="12"/></svg> Submitting...</span>';
    submitBtn.disabled = true;

    // Add spinner animation
    if (!document.getElementById('spinner-style')) {
      const style = document.createElement('style');
      style.id = 'spinner-style';
      style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    let submitted = false;

    // Strategy 1: Google Sheets (primary — if URL configured)
    if (GOOGLE_SCRIPT_URL) {
      try {
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        submitted = true;
      } catch (err) {
        console.warn('Google Sheets submission failed, trying Formspree:', err);
      }
    }

    // Strategy 2: Formspree (backup or primary if no Google Script)
    if (!submitted) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) submitted = true;
        else throw new Error('Formspree returned ' + res.status);
      } catch (err) {
        console.warn('Formspree submission failed:', err);
      }
    }

    if (submitted) {
      // Success state
      const formCard = document.querySelector('.form-card');
      formCard.innerHTML = `
        <div class="form-success">
          <div class="success-check">✓</div>
          <h3>Thank you, ${sanitize(formData.name)}!</h3>
          <p>We'll reach out within 24 hours.</p>
          <p style="margin-top:20px;font-size:13px;color:var(--muted)">
            A confirmation has been sent to <strong>${sanitize(formData.email)}</strong>
          </p>
        </div>
      `;

      // Track conversion in analytics
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: formData.package || 'General',
          value: 1
        });
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: formData.package || 'General' });
      }

      // WhatsApp redirect
      if (formData.whatsapp === 'Yes') {
        const msg = encodeURIComponent(
          `Hi! I'm ${formData.name} from ${formData.business}. I'm interested in NEXAURO solutions for ${formData.industry || 'my business'}.`
        );
        setTimeout(() => {
          window.open(`https://wa.me/919315807233?text=${msg}`, '_blank');
        }, 1200);
      }
    } else {
      // Both failed — show fallback
      submitBtn.innerHTML = btnText;
      submitBtn.disabled = false;
      const formCard = document.querySelector('.form-card');
      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = 'background:#FDF2F2;border:1px solid #E74C3C;border-radius:8px;padding:16px;margin-top:16px;color:#E74C3C;font-size:14px;text-align:center;';
      errorMsg.innerHTML = '⚠️ Submission failed. Please try <a href="https://wa.me/919315807233" target="_blank" style="color:#D4AF37;font-weight:700">WhatsApp</a> or call <a href="tel:+919315807233" style="color:#D4AF37;font-weight:700">+91 9315807233</a>';
      formCard.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 8000);
    }
  });

  // ─── Helpers ───
  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showError(id, msg) {
    const input = document.getElementById(id);
    const errorSpan = document.querySelector(`[data-error-for="${id}"]`);
    if (input) input.classList.add('error');
    if (errorSpan) {
      errorSpan.textContent = msg;
      errorSpan.classList.add('show');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.field-error').forEach(el => {
      el.classList.remove('show');
      el.textContent = '';
    });
  }

  // Clear individual field errors on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errorSpan = el.parentElement.querySelector('.field-error');
      if (errorSpan) errorSpan.classList.remove('show');
    });
  });
})();
