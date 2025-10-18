// === DOM Ready ===
window.addEventListener('DOMContentLoaded', () => {
  // === Lucide Icons ===
  if (window.lucide) lucide.createIcons();

  // === Year (footer) ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === THEME TOGGLE ===
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');

  function setTheme(mode) {
    const dark = mode === 'dark';
    root.classList.toggle('dark', dark);
    if (moonIcon && sunIcon) {
      moonIcon.classList.toggle('hidden', !dark);
      sunIcon.classList.toggle('hidden', dark);
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  // Load saved theme (default = dark)
  setTheme(localStorage.getItem('theme') || 'dark');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setTheme(root.classList.contains('dark') ? 'light' : 'dark');
    });
  }

  // === Reveal on Scroll ===
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // === Typing Effect ===
  (function () {
    const el = document.getElementById("typingText");
    if (!el) return;
    const phrases = [
      "Crafting Clean, Scalable Web Solutions",
      "Turning Code into Real-World Impact",
      "Designing Interactive, Modern Experiences"
    ];
    let pi = 0, ci = 0, del = false;
    function tick() {
      const p = phrases[pi];
      el.textContent = p.slice(0, ci);
      if (!del && ci++ > p.length) { del = true; setTimeout(tick, 1000); return; }
      if (del && --ci < 0) { del = false; pi = (pi + 1) % phrases.length; }
      setTimeout(tick, del ? 50 : 80);
    }
    tick();
  })();

  // === Subtle Tilt on Right Card ===
  (function () {
    const wrap = document.getElementById('statsWrap');
    const card = document.getElementById('expCard');
    if (!wrap || !card) return;

    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * 10; // tilt max 10deg
      const ry = (x - 0.5) * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  })();

  // === Contact Form Validation & Submit ===
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');
  const loader = document.getElementById('loader');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      let valid = true;

      if (nameInput.value.trim() === '') {
        nameError.classList.remove('hidden');
        nameInput.classList.add('border-red-500');
        valid = false;
      } else {
        nameError.classList.add('hidden');
        nameInput.classList.remove('border-red-500');
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        valid = false;
      } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
      }

      if (messageInput.value.trim() === '') {
        messageError.classList.remove('hidden');
        messageInput.classList.add('border-red-500');
        valid = false;
      } else {
        messageError.classList.add('hidden');
        messageInput.classList.remove('border-red-500');
      }

      if (!valid) return;

      // Show loader
      loader.classList.remove('hidden');
      submitBtn.disabled = true;

      // Send data via FormSubmit
      const formData = new FormData(form);
      try {
        const response = await fetch('https://formsubmit.co/ajax/nkathiravan90@gmail.com', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          successMsg.classList.remove('hidden');
          errorMsg.classList.add('hidden');
          form.reset();
        } else {
          throw new Error('Network error');
        }
      } catch (error) {
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');
      } finally {
        loader.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });
  }

  // === Tilt Effect for Service Cards ===
  const maxTilt = 8;       // deg
  const lift = 6;          // px
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = -((y - r.height / 2) / (r.height / 2)) * maxTilt;
      const ry = ((x - r.width / 2) / (r.width / 2)) * maxTilt;
      card.style.transform = `perspective(900px) translateY(-${lift}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      const icon = card.querySelector('.icon');
      if (icon) icon.style.transform = 'translateZ(24px) scale(1.08)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const icon = card.querySelector('.icon');
      if (icon) icon.style.transform = '';
    });
  });
});

// === Tailwind Config ===
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: {
        glow: '0 0 30px rgba(99,102,241,0.35), inset 0 0 30px rgba(56,189,248,0.2)'
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '100% 50%' } }
      },
      animation: {
        floaty: 'floaty 3s ease-in-out infinite',
        fadeUp: 'fadeUp .8s ease forwards',
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  }
};
