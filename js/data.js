/* ═══════════════════════════════════════════════
   METALLIC.V1 — Launch Page App
   Plain JavaScript. No framework.
═══════════════════════════════════════════════ */

/* ── STATE ─────────────────────────────────── */
let currentPageId   = 'page-home';
let accessGranted   = true; // no email gate on countdown launch page
let pendingGoto     = null;

/* ── ELEMENT REFS ──────────────────────────── */
const overlayProduct   = document.getElementById('overlay-product');
const modalAccess      = document.getElementById('modal-access');
const modalContribute  = document.getElementById('modal-contribute');
const productsGrid     = document.getElementById('products-grid');
const rewardsList      = document.getElementById('rewards-list');
const formAccess       = document.getElementById('form-access');
const inputEmail       = document.getElementById('input-email');
const inputName        = document.getElementById('input-name');
const formErr          = document.getElementById('access-err');
const btnProductBack   = document.getElementById('btn-product-back');
const btnProductCta    = document.getElementById('btn-product-cta');
const btnContribute    = document.getElementById('btn-contribute');

/* ═══════════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════════ */
function showPage(id) {
  // Remove all active pages
  document.querySelectorAll('.page.is-visible').forEach(p => {
    p.classList.remove('is-visible');
  });

  // Pause all videos
  document.querySelectorAll('video').forEach(v => v.pause());

  const page = document.getElementById(id);
  if (!page) return;

  page.classList.add('is-visible');
  currentPageId = id;
  window.scrollTo(0, 0);

  // Play this page's videos
  page.querySelectorAll('video').forEach(v => {
    v.muted = true;
    if (v.readyState === 0) v.load();
    v.play().catch(() => {});
  });

  // Sync nav active state
  const key = id.replace('page-', '');
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.goto === key);
  });
}

function navigate(target) {
  // No access gate on the static countdown launch page.
  showPage('page-' + target);
}

/* ═══════════════════════════════════════════════
   COUNTDOWN
═══════════════════════════════════════════════ */
const BETA_DATE = METALLIC.betaDate;

function tickCountdown() {
  const diff = BETA_DATE - Date.now();
  if (diff <= 0) {
    ['cd-days','cd-hrs','cd-mins','cd-secs'].forEach(id => setText(id, '00'));
    return;
  }
  setText('cd-days', pad(Math.floor(diff / 86400000)));
  setText('cd-hrs',  pad(Math.floor((diff % 86400000) / 3600000)));
  setText('cd-mins', pad(Math.floor((diff % 3600000)  / 60000)));
  setText('cd-secs', pad(Math.floor((diff % 60000)    / 1000)));
}

function pad(n) { return String(n).padStart(2, '0'); }
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

tickCountdown();
setInterval(tickCountdown, 1000);

/* ═══════════════════════════════════════════════
   PRODUCTS GRID
═══════════════════════════════════════════════ */
function buildProductsGrid() {
  if (!productsGrid) return;

  METALLIC.flagships.forEach(f => {
    const tile  = document.createElement('div');
    tile.className = 'product-tile';
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');

    const imgSrc = ASSET_URLS.products[f.imgKey];
    const display = (f.nameFull || f.name).replace(/\n/g, ' ');

    tile.innerHTML = `
      <div class="tile-img-wrap">
        ${imgSrc
          ? `<img class="tile-img" src="${imgSrc}" alt="${display}" loading="lazy">`
          : `<div class="tile-placeholder"><span class="tile-num">${f.num}</span></div>`
        }
        <div class="tile-img-fade"></div>
      </div>
      <div class="tile-label">
        <h2 class="tile-name">${display}</h2>
        <span class="tile-status${f.available ? ' available' : ''}">${f.status}</span>
      </div>
    `;

    tile.addEventListener('click', () => openProductDetail(f));
    tile.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductDetail(f); }
    });

    productsGrid.appendChild(tile);
  });
}

/* ═══════════════════════════════════════════════
   PRODUCT DETAIL OVERLAY
═══════════════════════════════════════════════ */
function openProductDetail(f) {
  const imgSrc  = ASSET_URLS.products[f.imgKey];
  const display = f.name;

  // Status badge
  const badge = document.getElementById('product-status-badge');
  badge.textContent = f.status;
  badge.classList.toggle('available', f.available);

  // Text
  document.getElementById('product-category').textContent = f.category;
  document.getElementById('product-name').textContent     = display;
  document.getElementById('product-desc').textContent     = f.description;

  // Image
  const imgWrap = document.getElementById('product-img-wrap');
  if (imgWrap) {
    imgWrap.innerHTML = imgSrc
      ? `<img src="${imgSrc}" alt="${display}">`
      : '';
  }

  // CTA
  if (btnProductCta) {
    btnProductCta.textContent = f.action + (f.available ? ' →' : '');
    btnProductCta.style.color  = f.available ? '' : 'rgba(242,242,242,0.22)';
    btnProductCta.style.cursor = f.available ? 'pointer' : 'default';
    btnProductCta.onclick      = f.available ? () => navigate('beta') : null;
  }

  showOverlay(overlayProduct);
}

/* ═══════════════════════════════════════════════
   REWARDS LIST
═══════════════════════════════════════════════ */
function buildRewardsList() {
  if (!rewardsList) return;

  REWARDS.forEach(r => {
    const item = document.createElement('div');
    item.className = 'reward-item';
    item.innerHTML = `
      <span class="reward-num">${r.num}</span>
      <div>
        <p class="reward-title">${r.title}</p>
        <p class="reward-desc">${r.desc}</p>
      </div>
    `;
    rewardsList.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════
   OVERLAY / MODAL HELPERS
═══════════════════════════════════════════════ */
function showOverlay(el) {
  el.classList.add('is-visible');
  el.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function hideOverlay(el) {
  el.classList.remove('is-visible');
  document.body.style.overflow = '';
}

function showModal(el) {
  el.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function hideModal(el) {
  el.classList.remove('is-visible');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════
   ACCESS FORM
═══════════════════════════════════════════════ */
if (formAccess) {
  formAccess.addEventListener('submit', e => {
    e.preventDefault();
    const email = inputEmail ? inputEmail.value.trim() : '';
    const name  = inputName  ? inputName.value.trim()  : '';

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      if (formErr) {
        formErr.textContent = 'A valid email is required.';
        formErr.classList.add('is-visible');
      }
      return;
    }

    sessionStorage.setItem('mv1_access', 'true');
    sessionStorage.setItem('mv1_email',  email);
    if (name) sessionStorage.setItem('mv1_name', name);

    accessGranted = true;
    hideModal(modalAccess);

    if (pendingGoto) {
      navigate(pendingGoto);
      pendingGoto = null;
    }
  });

  if (inputEmail) {
    inputEmail.addEventListener('input', () => {
      if (formErr) formErr.classList.remove('is-visible');
    });
  }
}

/* ═══════════════════════════════════════════════
   EVENT DELEGATION
═══════════════════════════════════════════════ */
document.addEventListener('click', e => {
  // data-goto: navigate to page
  const gotoEl = e.target.closest('[data-goto]');
  if (gotoEl) {
    navigate(gotoEl.dataset.goto);
    return;
  }

  // data-close: close a modal/overlay by id
  const closeEl = e.target.closest('[data-close]');
  if (closeEl) {
    const target = document.getElementById(closeEl.dataset.close);
    if (target) hideModal(target);
    return;
  }

  // Product detail back
  if (e.target.closest('#btn-product-back')) {
    hideOverlay(overlayProduct);
    return;
  }

  // Contribute modal
  if (e.target.closest('#btn-contribute')) {
    showModal(modalContribute);
    return;
  }

  // Backdrop clicks — close if backdrop itself is clicked
  if (e.target === modalAccess)     { hideModal(modalAccess);     return; }
  if (e.target === modalContribute) { hideModal(modalContribute); return; }
});

/* ── Keyboard accessibility ──────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (overlayProduct.classList.contains('is-visible')) { hideOverlay(overlayProduct); return; }
    if (modalAccess.classList.contains('is-visible'))    { hideModal(modalAccess);      return; }
    if (modalContribute.classList.contains('is-visible')){ hideModal(modalContribute);  return; }
  }
});

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
buildProductsGrid();
buildRewardsList();

// Boot on home page, start its video
showPage('page-home');
