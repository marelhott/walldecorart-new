// ===== Wall Decor Art — site.js =====

// Scroll reveal
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// Header scroll border
(() => {
  const h = document.querySelector('.site-header');
  if (!h) return;
  const fn = () => h.classList.toggle('scrolled', window.scrollY > 8);
  fn(); window.addEventListener('scroll', fn, { passive: true });
})();

// Homepage hero appear animation — mirrors Refit's Framer spring settings.
(() => {
  const els = document.querySelectorAll('[data-hero-appear]');
  if (!els.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    els.forEach(el => el.classList.add('hero-appear-ready'));
    return;
  }

  const stiffness = 250;
  const damping = 80;
  const mass = 1;
  const omega = Math.sqrt(stiffness / mass);
  const ratio = damping / (2 * Math.sqrt(stiffness * mass));
  const velocityEpsilon = 0.01;
  const distanceEpsilon = 0.01;

  const progressAt = t => {
    if (ratio < 1) {
      const envelope = Math.exp(-ratio * omega * t);
      const damped = omega * Math.sqrt(1 - ratio * ratio);
      return 1 - envelope * (Math.cos(damped * t) + (ratio * omega / damped) * Math.sin(damped * t));
    }
    if (ratio === 1) {
      const envelope = Math.exp(-omega * t);
      return 1 - envelope * (1 + omega * t);
    }
    const root = omega * Math.sqrt(ratio * ratio - 1);
    const r1 = -omega * ratio + root;
    const r2 = -omega * ratio - root;
    const c1 = -r2 / (r1 - r2);
    const c2 = r1 / (r1 - r2);
    return 1 - (c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t));
  };

  const doneAt = t => {
    const p = progressAt(t);
    const next = progressAt(t + 0.016);
    return Math.abs(1 - p) <= distanceEpsilon && Math.abs(next - p) <= velocityEpsilon;
  };

  const animate = el => {
    const delay = Number(el.dataset.heroDelay || 0) * 1000;
    const fromY = Number(el.dataset.heroY || 40);

    window.setTimeout(() => {
      const start = performance.now();
      const tick = now => {
        const t = (now - start) / 1000;
        const p = Math.max(0, Math.min(progressAt(t), 1));
        const y = fromY * (1 - p);
        const opacity = 0.001 + (1 - 0.001) * p;

        el.style.opacity = opacity;
        el.style.transform = `translateY(${y}px)`;

        if (doneAt(t)) {
          el.classList.add('hero-appear-ready');
          el.style.opacity = '';
          el.style.transform = '';
          el.style.willChange = 'auto';
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  els.forEach(animate);
})();

// Project cards stack reveal
(() => {
  const cards = [...document.querySelectorAll('[data-project-card]')];
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    cards.forEach(card => card.classList.add('project-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = cards.indexOf(entry.target);
      window.setTimeout(() => {
        entry.target.classList.add('project-in');
        entry.target.querySelectorAll('.clip-reveal').forEach((el, ci) => {
          window.setTimeout(() => el.classList.add('in'), 80 + ci * 60);
        });
      }, Math.max(index, 0) * 120);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.28, rootMargin: '0px 0px -12% 0px' });

  cards.forEach(card => io.observe(card));
})();

// Counter animation
(() => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const animate = el => {
    const target = parseFloat(el.dataset.count);
    const dur = 1800; const t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = target % 1 === 0 ? Math.floor(target * eased) : (target * eased).toFixed(1);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target % 1 === 0 ? target : target.toFixed(1);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  counters.forEach(el => io.observe(el));
})();

// Mobile menu
(() => {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
})();

// FAQ — one open at a time
(() => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(it => {
    it.addEventListener('toggle', () => {
      if (it.open) items.forEach(o => { if (o !== it) o.open = false; });
    });
  });
})();

// Services accordion (homepage)
(() => {
  const rows = document.querySelectorAll('.service-row');
  const imgs = document.querySelectorAll('.services-img-inner .ph');
  if (!rows.length) return;
  const activate = (row, i) => {
    rows.forEach(r => r.classList.remove('active'));
    row.classList.add('active');
    rows.forEach(r => r.setAttribute('aria-expanded', String(r === row)));
    imgs.forEach((img, j) => img.classList.toggle('hide', j !== i));
  };
  rows.forEach((row, i) => {
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');
    row.addEventListener('click', () => {
      activate(row, i);
    });
    row.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate(row, i);
    });
  });
  // activate first by default
  if (rows[0]) activate(rows[0], 0);
  imgs.forEach((img, j) => j !== 0 && img.classList.add('hide'));
})();

// Contact form -> prepares an email draft instead of faking submission
(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const location = String(data.get('location') || '').trim();
    const technique = String(data.get('technique') || '').trim();
    const message = String(data.get('message') || '').trim();
    const fileInput = form.querySelector('input[type="file"]');
    const files = fileInput?.files ? [...fileInput.files] : [];
    const subject = `Poptavka Wall Decor Art - ${name || 'novy projekt'}`;
    const lines = [
      `Jmeno: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || '-'}`,
      `Misto realizace: ${location || '-'}`,
      `Typ realizace: ${technique || '-'}`,
      `Fotografie k projektu: ${files.length ? files.map(file => file.name).join(', ') : '-'}`,
      '',
      'Popis projektu:',
      message || '-',
      '',
      files.length ? 'Poznamka: Po otevreni e-mailu je potreba vybrane fotografie prilozit rucne jako prilohy.' : ''
    ];
    const href = `mailto:info@walldecorart.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = href;
    if (status) {
      status.textContent = files.length
        ? 'Oteviram e-mail s predvyplnenou poptavkou. Vybrane fotografie potom v e-mailu jeste pripojte rucne jako prilohy.'
        : 'Oteviram e-mail s predvyplnenou poptavkou. Pokud se nic nestane, zavolejte nebo napiste primo.';
    }
  });
})();

// Duplicate marquee tracks for seamless loop
(() => {
  document.querySelectorAll('.marquee-track, .testi-track').forEach(track => {
    const items = [...track.children];
    items.forEach(item => track.appendChild(item.cloneNode(true)));
  });
})();

// Image lightbox for content photos
(() => {
  const photoSelector = [
    '.ph.photo img',
    '.decor-photo img',
    '.decor-story-photo img',
    '.decor-feature-image img',
    '.g-tile img',
    '.hl-img img',
    '.proj-img img',
    '.marquee-tile img',
    '.hero-img img',
    '.services-img-inner img',
    '.team-photo img',
    '.tl-img img'
  ].join(',');

  const ignoredSelector = [
    '.site-header',
    '.site-footer',
    '.proj-avatar',
    '.testi-card .av',
    '.logo',
    '.decor-original-symbol'
  ].join(',');

  let lightbox;
  let lightboxImg;
  let closeBtn;

  const ensureLightbox = () => {
    if (lightbox) return;

    lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <button class="image-lightbox-close" type="button" aria-label="Zavřít náhled">×</button>
      <img class="image-lightbox-img" alt="" />
    `;
    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector('.image-lightbox-img');
    closeBtn = lightbox.querySelector('.image-lightbox-close');

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox || event.target === lightboxImg) closeLightbox();
    });
  };

  const openLightbox = img => {
    ensureLightbox();
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus({ preventScroll: true });
  };

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    window.setTimeout(() => {
      if (!lightbox.classList.contains('open')) lightboxImg.removeAttribute('src');
    }, 220);
  }

  document.addEventListener('click', event => {
    const img = event.target.closest(photoSelector);
    if (!img || img.closest(ignoredSelector)) return;

    event.preventDefault();
    openLightbox(img);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });
})();

/* ===== Premium Animations v2 ===== */

// Grain overlay inject
(() => {
  const el = document.createElement('div');
  el.className = 'grain-overlay';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
})();

// Custom cursor (desktop only)
(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.createElement('div');
  dot.className  = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  document.documentElement.style.cursor = 'none';

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const active = !!e.target.closest('a, button, label, summary, [role="button"], input, textarea, select');
    ring.classList.toggle('cursor-hover', active);
  });
  document.addEventListener('mousedown',  () => ring.classList.add('cursor-click'));
  document.addEventListener('mouseup',    () => ring.classList.remove('cursor-click'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '';  ring.style.opacity = '';  });

  (function cursorTick() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    dot.style.transform  = `translate(${mx}px,${my}px)`;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(cursorTick);
  })();
})();

// Magnetic buttons (desktop only)
(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.hero-action, .btn-primary, .btn-secondary, .contact-form button').forEach(btn => {
    let raf;
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform 0.05s ease'; });
    btn.addEventListener('mousemove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        btn.style.transform = `translate(${dx * 10}px,${dy * 8}px)`;
      });
    });
    btn.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      btn.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform  = '';
      window.setTimeout(() => { btn.style.transition = ''; }, 700);
    });
  });
})();

// Word-split disabled — using .reveal fade-in for headings
// (Cormorant Garamond + Czech diacritics caused clipping/merge issues)

// 3-D tilt on cards (desktop only)
(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const TILT = 4.5;
  document.querySelectorAll('.services-img-inner, .testi-card, .fact-card, .contact-block').forEach(el => {
    let raf;
    el.addEventListener('mousemove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        el.style.transform  = `perspective(1100px) rotateY(${dx*TILT}deg) rotateX(${-dy*TILT}deg) scale(1.012)`;
        el.style.transition = 'transform 0.06s ease';
      });
    });
    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform 0.75s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform  = '';
      window.setTimeout(() => { el.style.transition = ''; }, 800);
    });
  });
})();

// Clip-path reveal — pouze .proj-img na homepage (spouštěno project-in observerem)
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.proj-img').forEach(el => el.classList.add('clip-reveal'));
})();

// Hero image parallax
(() => {
  const heroShell = document.querySelector('.hero-shell');
  const heroPh    = document.querySelector('.hero-img .ph');
  if (!heroShell || !heroPh) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const s = window.scrollY;
      if (s < heroShell.offsetHeight * 1.6) {
        heroPh.style.setProperty('--parallax-y', `${s * 0.22}px`);
      }
    });
  }, { passive: true });
})();
