// ============================================
// ACCESS CHAPEL - JAVASCRIPT
// ============================================

// ===== GOOGLE SHEETS REGISTRATION =====
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzL6X5CrqI0u08AJNwFN6KD68DEhHLF45-jWGivI7S41-zzAjvA3QxhD8qbm-ENRUcjTg/exec';

// ===== REGISTRATION FORM =====
const registerForm = document.getElementById('registerForm');
const formSuccess = document.getElementById('formSuccess');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      event: document.getElementById('event').value,
      message: document.getElementById('message') ? document.getElementById('message').value : ''
    };

    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      registerForm.style.display = 'none';
      formSuccess.classList.remove('hidden');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again or call us directly.');
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) setTimeout(() => preloader.classList.add('hidden'), 800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = menuBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// ===== COUNTDOWN (First Event: Oct 1, 2026 @ 2:00 PM) =====
const eventDate = new Date('October 1, 2026 14:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = eventDate - now;
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };
  if (diff <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => setText(id, 0));
    return;
  }
  setText('days', Math.floor(diff / 86400000));
  setText('hours', Math.floor((diff % 86400000) / 3600000));
  setText('minutes', Math.floor((diff % 3600000) / 60000));
  setText('seconds', Math.floor((diff % 60000) / 1000));
}
if (document.getElementById('countdown')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

console.log('✝ Access Chapel website loaded');
