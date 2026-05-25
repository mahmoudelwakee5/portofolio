(() => {
  'use strict';

  /* ── NAV: scroll shadow ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── NAV: active link highlight on scroll ── */
  const navLinks    = document.querySelectorAll('.nav-links a');
  const sections    = document.querySelectorAll('main section[id]');
  const sectionObs  = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }),
    { rootMargin: '-50% 0px -50% 0px' }
  );
  sections.forEach(s => sectionObs.observe(s));

  /* ── HAMBURGER / MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const closeMobile = () => {
    mobileNav?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  };
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(!!isOpen));
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMobile(); });

  /* ── SMOOTH SCROLL (offset for sticky nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = id === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 0) - 16;
      window.scrollTo({
        top: Math.max(offset, 0),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
      closeMobile();
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── FOOTER YEAR ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()} Mahmoud Anwar Elwakeel. All rights reserved.`;

  /* ── CONTACT FORM ── */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data    = new FormData(form);
    const name    = String(data.get('name')    ?? '').trim();
    const email   = String(data.get('email')   ?? '').trim();
    const project = String(data.get('project') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const btn     = form.querySelector('button[type="submit"]');

    const setStatus = (msg, type) => {
      if (!status) return;
      status.textContent = msg;
      status.className   = 'form-status ' + type;
    };

    if (!name || !email || !project || !message) {
      return setStatus('Please complete every field before sending.', 'error');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus('Please enter a valid email address.', 'error');
    }

    const subject = encodeURIComponent(`Portfolio Inquiry: ${project}`);
    const body    = encodeURIComponent(
      `Hello Mahmoud,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${project}\n\nDetails:\n${message}\n\nBest regards,\n${name}`
    );

    if (btn instanceof HTMLButtonElement) { btn.disabled = true; btn.textContent = 'Opening email…'; }
    setStatus('Your email client is opening with the details prepared.', 'success');
    window.location.href = `mailto:elwakeelmahmoud06@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      if (btn instanceof HTMLButtonElement) { btn.disabled = false; btn.textContent = 'Send Inquiry →'; }
    }, 2000);
  });

})();
