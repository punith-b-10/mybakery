/**
 * ============================================================
 * TWO BROTHERS HOME BAKERY — Main Application JS
 * ============================================================
 * Initializes: Lenis, GSAP, Three.js, AOS, Vanilla Tilt
 * Handles: Navbar, Products, Search, Filters, FAQ, Reviews, etc.
 * ============================================================
 */

'use strict';

/* ── Wait for DOM + External Scripts ─────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // ── 1. LOADER ─────────────────────────────────────────────
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 2200);

  // ── 2. CUSTOM CURSOR ──────────────────────────────────────
  const cursor = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  if (window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .product-card, .gallery-item, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  } else {
    if (cursor) cursor.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ── 3. LENIS SMOOTH SCROLL ────────────────────────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  // ── 4. SCROLL PROGRESS ────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
  });

  // ── 5. NAVBAR SCROLL BEHAVIOUR ────────────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleNavScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active link indicator
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── 6. MOBILE NAV ─────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger) hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

  // ── 7. DARK MODE TOGGLE ───────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('twobrothershomebakery-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('twobrothershomebakery-theme', next);
      updateThemeIcon(next);
    });
  }
  function updateThemeIcon(theme) {
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ── 8. GSAP HERO ANIMATIONS ───────────────────────────────
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ delay: 2.3 });
    tl.to('.hero-eyebrow',  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .to('.hero-title',    { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, '-=0.5')
      .to('.hero-tagline',  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .to('.hero-ctas',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6');
  }

  // ── 9. THREE.JS HERO SCENE ────────────────────────────────
  initThreeScene();

  // ── 10. AOS ───────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  // ── 11. PRODUCT SYSTEM ────────────────────────────────────
  initProductSystem();

  // ── 12. ANIMATED COUNTERS ─────────────────────────────────
  initCounters();

  // ── 13. FAQ ───────────────────────────────────────────────
  initFAQ();

  // ── 14. GALLERY LIGHTBOX ──────────────────────────────────
  initGallery();

  // ── 15. HERO MOUSE PARALLAX ───────────────────────────────
  initParallax();

  // ── 16. VANILLA TILT ──────────────────────────────────────
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.product-card'), {
      max: 6, speed: 600, glare: true, 'max-glare': 0.08
    });
  }
});

/* ══════════════════════════════════════════════════════════
   THREE.JS HERO SCENE — Floating Particles & Bokeh
   ══════════════════════════════════════════════════════════ */
function initThreeScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  // Ambient light
  scene.add(new THREE.AmbientLight(0xfff8f0, 0.7));

  // Directional warm light
  const dirLight = new THREE.DirectionalLight(0xc9a84c, 1.2);
  dirLight.position.set(5, 8, 5);
  scene.add(dirLight);

  // Point light — coffee warm
  const pointLight = new THREE.PointLight(0x8b5a3c, 2, 20);
  pointLight.position.set(-3, 3, 3);
  scene.add(pointLight);

  // ── Floating Spheres (stylised desserts/ingredients) ──────
  const particles = [];
  const geometries = [
    new THREE.SphereGeometry(0.18, 16, 16),      // coffee bean / truffle
    new THREE.SphereGeometry(0.28, 12, 12),      // large truffle
    new THREE.TorusGeometry(0.18, 0.06, 8, 20),  // ring cookie
    new THREE.BoxGeometry(0.2, 0.2, 0.08),       // chocolate shard
    new THREE.SphereGeometry(0.12, 8, 8),        // small berry
    new THREE.CylinderGeometry(0.15, 0.15, 0.1, 12), // macaron disc
  ];

  const materials = [
    new THREE.MeshPhongMaterial({ color: 0x3d1a0e, shininess: 80 }),
    new THREE.MeshPhongMaterial({ color: 0x6b3a2a, shininess: 60 }),
    new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 100 }),
    new THREE.MeshPhongMaterial({ color: 0xfff8f0, shininess: 40, transparent: true, opacity: 0.7 }),
    new THREE.MeshPhongMaterial({ color: 0xf0b8b8, shininess: 50 }),
    new THREE.MeshPhongMaterial({ color: 0x8b5a3c, shininess: 70 }),
  ];

  const count = 40;
  for (let i = 0; i < count; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geo, mat);

    // Spread in a wide volume
    mesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4 - 2
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    const speed  = 0.004 + Math.random() * 0.006;
    const range  = 0.4 + Math.random() * 0.6;
    const offset = Math.random() * Math.PI * 2;
    const rotSpd = (Math.random() - 0.5) * 0.02;

    particles.push({ mesh, speed, range, offset, rotSpd, baseY: mesh.position.y });
    scene.add(mesh);
  }

  // ── Large central glowing sphere ──────────────────────────
  const coreMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 32, 32),
    new THREE.MeshPhongMaterial({
      color: 0xc9a84c, transparent: true, opacity: 0.12,
      shininess: 200, emissive: 0xc9a84c, emissiveIntensity: 0.04
    })
  );
  coreMesh.position.set(3, 0, -1);
  scene.add(coreMesh);

  // ── Mouse tracking ────────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Resize ────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Render loop ───────────────────────────────────────────
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    particles.forEach(p => {
      p.mesh.position.y = p.baseY + Math.sin(elapsed * p.speed * 60 + p.offset) * p.range * 0.1;
      p.mesh.rotation.x += p.rotSpd;
      p.mesh.rotation.y += p.rotSpd * 0.7;
    });

    // Gentle camera drift with mouse
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    coreMesh.rotation.y = elapsed * 0.1;

    renderer.render(scene, camera);
  };
  animate();
}

/* ══════════════════════════════════════════════════════════
   PRODUCT SYSTEM — Dynamic Rendering & Filtering
   ══════════════════════════════════════════════════════════ */
function initProductSystem() {
  // Depends on PRODUCTS, CATEGORIES, BRAND from products.js
  if (typeof PRODUCTS === 'undefined') return;

  const availableProducts = PRODUCTS.filter(p => p.available);

  // Build category filters
  const filterRow = document.getElementById('category-filters');
  if (filterRow) {
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (cat.id === 'all' ? ' active' : '');
      btn.dataset.filter = cat.id;
      btn.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
      filterRow.appendChild(btn);
    });
  }

  // Render
  let activeFilter = 'all';
  let searchTerm   = '';
  let sortMode     = 'default';
  let showBestSeller = false;

  function getFiltered() {
    let list = [...availableProducts];
    if (activeFilter !== 'all') list = list.filter(p => p.category === activeFilter);
    if (showBestSeller)         list = list.filter(p => p.bestSeller);
    if (searchTerm)             list = list.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(t => t.includes(searchTerm))
    );
    if (sortMode === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (sortMode === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sortMode === 'new')        list = list.filter(p => p.newArrival).concat(list.filter(p => !p.newArrival));
    return list;
  }

  function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    const list = getFiltered();
    grid.innerHTML = '';

    if (list.length === 0) {
      grid.innerHTML = '<div class="no-results" data-aos="fade-up">Nothing found — try a different search ✦</div>';
      return;
    }

    list.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', String(Math.min(i * 60, 300)));

      const badge = p.newArrival ? `<span class="product-badge new">New</span>`
                  : p.bestSeller ? `<span class="product-badge bestseller">★ Bestseller</span>`
                  : p.badge      ? `<span class="product-badge">${p.badge}</span>`
                  : '';

      const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(p.whatsappMessage)}`;

      card.innerHTML = `
        <div class="product-card-img-wrap">
          <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy">
          ${badge}
          <button class="product-fav" aria-label="Add to favourites" data-id="${p.id}">♡</button>
        </div>
        <div class="product-card-body">
          <div class="product-sub">${p.shortDesc}</div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-footer">
            <div class="product-price">
              <span class="price-label">Starting from</span>
              <span class="price-value">₹${p.price} <span>${p.priceUnit}</span></span>
            </div>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-order">
              Order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>`;
      grid.appendChild(card);
    });

    // Favourites
    grid.querySelectorAll('.product-fav').forEach(btn => {
      const id = btn.dataset.id;
      const favs = JSON.parse(localStorage.getItem('ladouceur-favs') || '[]');
      if (favs.includes(id)) { btn.classList.add('active'); btn.textContent = '♥'; }
      btn.addEventListener('click', () => {
        const f = JSON.parse(localStorage.getItem('ladouceur-favs') || '[]');
        const idx = f.indexOf(id);
        if (idx === -1) { f.push(id); btn.classList.add('active'); btn.textContent = '♥'; }
        else            { f.splice(idx,1); btn.classList.remove('active'); btn.textContent = '♡'; }
        localStorage.setItem('ladouceur-favs', JSON.stringify(f));
      });
    });

    // Re-init tilt
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(grid.querySelectorAll('.product-card'), {
        max: 6, speed: 600, glare: true, 'max-glare': 0.08
      });
    }

    // Re-init AOS
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Search
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortMode = sortSelect.value;
      renderProducts();
    });
  }

  // Best Seller toggle
  const bsToggle = document.getElementById('bestseller-toggle');
  if (bsToggle) {
    bsToggle.addEventListener('click', () => {
      showBestSeller = !showBestSeller;
      bsToggle.classList.toggle('active', showBestSeller);
      renderProducts();
    });
  }

  renderProducts();

  // ── Best Sellers section ───────────────────────────────────
  const bsGrid = document.getElementById('bestsellers-grid');
  if (bsGrid) {
    const bsProducts = availableProducts.filter(p => p.bestSeller).slice(0, 4);
    bsProducts.forEach((p, i) => {
      const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(p.whatsappMessage)}`;
      const card = document.createElement('div');
      card.className = 'bestseller-card';
      card.setAttribute('data-aos', 'zoom-in');
      card.setAttribute('data-aos-delay', String(i * 100));
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="bestseller-card-overlay">
          <div class="bestseller-card-name">${p.name}</div>
          <div class="bestseller-card-price">from ₹${p.price} ${p.priceUnit}</div>
          <a href="${waLink}" target="_blank" rel="noopener" class="bestseller-card-btn">
            Order on WhatsApp ↗
          </a>
        </div>`;
      bsGrid.appendChild(card);
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
}

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTERS
   ══════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.target, 10);
      const dur = 2000;
      const step = end / (dur / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, end);
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
        if (current >= end) clearInterval(timer);
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════════════════ */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ══════════════════════════════════════════════════════════
   GALLERY LIGHTBOX
   ══════════════════════════════════════════════════════════ */
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src.replace('w=300', 'w=1200');
      lightbox.classList.add('open');
    });
  });

  document.getElementById('lightbox-close')?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
}

/* ══════════════════════════════════════════════════════════
   MOUSE PARALLAX (hero content layers)
   ══════════════════════════════════════════════════════════ */
function initParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    const title   = hero.querySelector('.hero-title');
    const tagline = hero.querySelector('.hero-tagline');
    if (title)   title.style.transform   = `translate(${dx * -8}px, ${dy * -5}px)`;
    if (tagline) tagline.style.transform = `translate(${dx * -5}px, ${dy * -3}px)`;
  });
}
