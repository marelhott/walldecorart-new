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
  rows.forEach((row, i) => {
    row.addEventListener('click', () => {
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      imgs.forEach((img, j) => img.classList.toggle('hide', j !== i));
    });
  });
  // activate first by default
  if (rows[0]) rows[0].classList.add('active');
  imgs.forEach((img, j) => j !== 0 && img.classList.add('hide'));
})();

// Duplicate marquee tracks for seamless loop
(() => {
  document.querySelectorAll('.marquee-track, .testi-track').forEach(track => {
    const items = [...track.children];
    items.forEach(item => track.appendChild(item.cloneNode(true)));
  });
})();

// Wix-like masonry gallery: equal gutters, original image ratios, packed columns.
(() => {
  const galleries = [...document.querySelectorAll('.decor-masonry')];
  if (!galleries.length) return;

  const getColumnCount = gallery => {
    const width = gallery.clientWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return gallery.classList.contains('decor-masonry-process') ? 3 : 3;
  };

  const layoutGallery = gallery => {
    const items = [...gallery.querySelectorAll('.decor-photo')];
    if (!items.length) return;

    const styles = window.getComputedStyle(gallery);
    const gap = parseFloat(styles.getPropertyValue('--decor-gallery-gap')) || 14;
    const columns = getColumnCount(gallery);
    const columnWidth = (gallery.clientWidth - gap * (columns - 1)) / columns;
    const heights = Array(columns).fill(0);

    gallery.classList.add('is-masonry');

    items.forEach(item => {
      const img = item.querySelector('img');
      const ratio = img && img.naturalWidth ? img.naturalHeight / img.naturalWidth : 0.75;
      const height = Math.max(120, columnWidth * ratio);
      const column = heights.indexOf(Math.min(...heights));
      const x = column * (columnWidth + gap);
      const y = heights[column];

      item.style.width = `${columnWidth}px`;
      item.style.height = `${height}px`;
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      heights[column] += height + gap;
    });

    gallery.style.height = `${Math.max(...heights) - gap}px`;
  };

  const layoutAll = () => galleries.forEach(layoutGallery);
  const scheduleLayout = (() => {
    let frame;
    return () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layoutAll);
    };
  })();

  galleries.forEach(gallery => {
    gallery.querySelectorAll('img').forEach(img => {
      if (!img.complete) img.addEventListener('load', scheduleLayout, { once: true });
    });
  });

  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('load', scheduleLayout);
  scheduleLayout();
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
