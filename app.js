// --- Data (mock products) ---
const PRODUCTS = [
  // Rings (8 items)
  { id: 1, name: 'Mekka Mothiram', type: 'ring', price: 180, was: 220, img: 'assets/rings/ring1.jpg' },
  { id: 2, name: 'Mekka Mothiram', type: 'ring', price: 320, img: 'assets/rings/ring2.jpg' },
  { id: 3, name: 'Mekka Mothiram', type: 'ring', price: 95, img: 'assets/rings/ring3.jpg' },
  { id: 4, name: 'Mekka Mothiram', type: 'ring', price: 450, img: 'assets/rings/ring4.jpg' },
  { id: 5, name: 'Mekka Mothiram', type: 'ring', price: 120, img: 'assets/rings/ring5.jpg' },
  { id: 6, name: 'Mekka Mothiram', type: 'ring', price: 280, img: 'assets/rings/ring6.jpg' },
  { id: 7, name: 'Mekka Mothiram', type: 'ring', price: 160, img: 'assets/rings/ring7.jpg' },
  { id: 8, name: 'Mekka Mothiram', type: 'ring', price: 200, img: 'assets/rings/ring8.jpg' },
  
  // Necklaces (8 items)
  { id: 9, name: 'Manga Maala', type: 'necklace', price: 240, img: 'assets/necklaces/necklace1.jpg' },
  { id: 10, name: 'Manga Maala', type: 'necklace', price: 95, img: 'assets/necklaces/necklace2.jpg' },
  { id: 11, name: 'Manga Maala', type: 'necklace', price: 180, img: 'assets/necklaces/necklace3.jpg' },
  { id: 12, name: 'Manga Maala', type: 'necklace', price: 320, img: 'assets/necklaces/necklace4.jpg' },
  { id: 13, name: 'Manga Maala', type: 'necklace', price: 140, img: 'assets/necklaces/necklace5.jpg' },
  { id: 14, name: 'Manga Maala', type: 'necklace', price: 380, img: 'assets/necklaces/necklace6.jpg' },
  { id: 15, name: 'Manga Maala', type: 'necklace', price: 110, img: 'assets/necklaces/necklace7.jpg' },
  { id: 16, name: 'Manga Maala', type: 'necklace', price: 220, img: 'assets/necklaces/necklace8.jpg' },
  
  // Bracelets (8 items)
  { id: 17, name: 'Tennis Bracelet', type: 'bracelet', price: 160, img: 'assets/bracelets/bracelet1.jpg' },
  { id: 18, name: 'Tennis Bracelet', type: 'bracelet', price: 210, img: 'assets/bracelets/bracelet2.jpg' },
  { id: 19, name: 'Tennis Bracelet', type: 'bracelet', price: 290, img: 'assets/bracelets/bracelet3.jpg' },
  { id: 20, name: 'Tennis Bracelet', type: 'bracelet', price: 85, img: 'assets/bracelets/bracelet4.jpg' },
  { id: 21, name: 'Tennis Bracelet', type: 'bracelet', price: 130, img: 'assets/bracelets/bracelet5.jpg' },
  { id: 22, name: 'Tennis Bracelet', type: 'bracelet', price: 180, img: 'assets/bracelets/bracelet6.jpg' },
  { id: 23, name: 'Tennis Bracelet', type: 'bracelet', price: 150, img: 'assets/bracelets/bracelet7.jpg' },
  { id: 24, name: 'Tennis Bracelet', type: 'bracelet', price: 200, img: 'assets/bracelets/bracelet8.jpg' },
  
  // Earrings (8 items)
  { id: 25, name: 'Pearl Studs', type: 'earring', price: 120, img: 'assets/earrings/earring1.jpg' },
  { id: 26, name: 'Pearl Studs', type: 'earring', price: 70, img: 'assets/earrings/earring2.jpg' },
  { id: 27, name: 'Pearl Studs', type: 'earring', price: 160, img: 'assets/earrings/earring3.jpg' },
  { id: 28, name: 'Pearl Studs', type: 'earring', price: 320, img: 'assets/earrings/earring4.jpg' },
  { id: 29, name: 'Pearl Studs', type: 'earring', price: 90, img: 'assets/earrings/earring5.jpg' },
  { id: 30, name: 'Pearl Studs', type: 'earring', price: 240, img: 'assets/earrings/earring6.jpg' },
  { id: 31, name: 'Pearl Studs', type: 'earring', price: 60, img: 'assets/earrings/earring7.jpg' },
  { id: 32, name: 'Pearl Studs', type: 'earring', price: 180, img: 'assets/earrings/earring8.jpg' }
];

const state = {
  filter: 'all',
  sort: 'pop',
  cart: []
};

// --- Helpers ---
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const fmt = (n) => `₹${n.toFixed(2)}`;

function renderGrid() {
  let items = PRODUCTS.filter(p => state.filter === 'all' ? true : p.type === state.filter);

  const searchEl = $('#search');
  if (searchEl && searchEl.value.trim()) {
    const q = searchEl.value.trim().toLowerCase();
    items = items.filter(p => p.name.toLowerCase().includes(q));
  }

  if (state.sort === 'low') items.sort((a,b) => a.price - b.price);
  if (state.sort === 'high') items.sort((a,b) => b.price - a.price);

  const grid = $('#grid');
  grid.innerHTML = items.length ? items.map(Card).join('') : `<div class="empty">No items match your filters.</div>`;

  // attach handlers for dynamic elements
  // Inquire buttons are now direct WhatsApp links - no event handlers needed
  $$('.quick-view', grid).forEach(btn => btn.addEventListener('click', openQuickView));
}

function Card(p) {
  return `
  <article class="card" data-id="${p.id}">
    <div class="card-media">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    </div>
    <div class="card-body">
      <div class="card-title">${p.name}</div>
      <div class="subtle">${p.type.charAt(0).toUpperCase() + p.type.slice(1)}</div>
      <div class="price">
        <span class="now">${fmt(p.price)}</span>
        ${p.was ? `<span class="was">${fmt(p.was)}</span>` : ''}
      </div>
    </div>
    <div class="card-actions">
      <button class="btn quick-view">Quick view</button>
      <a href="https://wa.me/919567662493?text=Hi%20Tripi%20Collections,%20I%27m%20interested%20in%20the%20${encodeURIComponent(p.name)}%20(${p.type})%20-%20₹${p.price.toFixed(2)}.%20Could%20you%20please%20provide%20more%20details%20about%20this%20piece?" target="_blank" class="btn primary">Inquire</a>
    </div>
  </article>`;
}

// --- Cart logic ---
function onAddToCart(e) {
  const id = Number(e.target.closest('.card').dataset.id);
  const prod = PRODUCTS.find(p => p.id === id);
  const existing = state.cart.find(i => i.id === id);
  if (existing) existing.qty += 1; else state.cart.push({ id, name: prod.name, price: prod.price, img: prod.img, qty: 1 });
  openSheet('#cartSheet');
  renderCart();
}

function renderCart() {
  const root = $('#cartItems');
  if (!state.cart.length) {
    root.innerHTML = '<div class="empty">Your cart is empty.</div>';
    return;
  }
  const rows = state.cart.map(i => `
    <div style="display:flex; gap:10px; align-items:center; margin-bottom:12px">
      <img src="${i.img}" alt="${i.name}" style="width:64px; height:64px; object-fit:cover; border-radius:8px; border:1px solid var(--border)"/>
      <div style="flex:1">
        <div style="font-weight:600">${i.name}</div>
        <div class="subtle">Qty: ${i.qty}</div>
      </div>
      <div>${fmt(i.price * i.qty)}</div>
      <button class="icon-btn" aria-label="Remove" onclick="removeFromCart(${i.id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
  `).join('');
  const total = state.cart.reduce((s,i) => s + i.price * i.qty, 0);
  root.innerHTML = rows + `<div style="display:flex; justify-content:space-between; border-top:1px solid var(--border); padding-top:12px; margin-top:4px"><strong>Total</strong><strong>${fmt(total)}</strong></div>`;
}

function removeFromCart(id) { state.cart = state.cart.filter(i => i.id !== id); renderCart(); }

// --- Quick view ---
function openQuickView(e) {
  const id = Number(e.target.closest('.card').dataset.id);
  const p = PRODUCTS.find(p => p.id === id);
  $('#qvBody').innerHTML = `
    <div style="display:grid; gap:16px; grid-template-columns: 1fr; align-items:start">
      <img src="${p.img}" alt="${p.name}" style="width:100%; aspect-ratio: 4/3; object-fit:cover; border-radius:12px; border:1px solid var(--border)"/>
      <div>
        <h3 style="margin:0 0 6px">${p.name}</h3>
        <div class="subtle">${p.type}</div>
        <div class="price" style="margin:10px 0 12px"><span class="now">${fmt(p.price)}</span> ${p.was ? `<span class="was">${fmt(p.was)}</span>` : ''}</div>
        <p>Exclusively selected for you. Like this?</p>
        <div style="display:flex; gap:8px; margin-top:12px">
          <button class="btn" onclick="closeDialog('#quickView')">Close</button>
          <a href="https://wa.me/919876543210?text=Hi%20Tripi%20Collections,%20I%27m%20interested%20in%20the%20${encodeURIComponent(p.name)}%20(${p.type})%20-%20₹${p.price.toFixed(2)}.%20Could%20you%20please%20provide%20more%20details%20about%20this%20piece?" target="_blank" class="btn primary" onclick="closeDialog('#quickView')">Inquire</a>
        </div>
      </div>
    </div>`;
  openDialog('#quickView');
}

function addFromQuick(id) {
  const prod = PRODUCTS.find(p => p.id === id);
  const existing = state.cart.find(i => i.id === id);
  if (existing) existing.qty += 1; else state.cart.push({ id, name: prod.name, price: prod.price, img: prod.img, qty: 1 });
  closeDialog('#quickView');
  openSheet('#cartSheet');
  renderCart();
}


// --- UI plumbing: sheets & dialogs ---
const backdrop = document.querySelector('#backdrop');

function openSheet(sel) { document.querySelector(sel).classList.add('open'); showBackdrop(); }
function closeSheet(sel) { document.querySelector(sel).classList.remove('open'); hideBackdropIfNoSheets(); }

function openDialog(sel) { document.querySelector(sel).classList.remove('hide'); document.querySelector(sel).classList.add('open'); showBackdrop(); setTimeout(()=> document.querySelector(sel).scrollTop = 0, 0); }
function closeDialog(sel) { document.querySelector(sel).classList.remove('open'); setTimeout(() => document.querySelector(sel).classList.add('hide'), 250); hideBackdropIfNoSheets(); }

function showBackdrop() { backdrop.classList.add('show'); }
function hideBackdropIfNoSheets() {
  const anyOpen = document.querySelectorAll('.sheet.open').length || document.querySelectorAll('.dialog.open').length;
  if (!anyOpen) backdrop.classList.remove('show');
}

// Close with ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSheet('#menuSheet'); closeSheet('#cartSheet'); closeDialog('#quickView');
  }
});

// Backdrop click to close
backdrop.addEventListener('click', () => { closeSheet('#menuSheet'); closeSheet('#cartSheet'); closeDialog('#quickView'); });

// Event wiring
document.querySelector('#openMenu').addEventListener('click', () => openSheet('#menuSheet'));
document.querySelector('#closeMenu').addEventListener('click', () => closeSheet('#menuSheet'));
// Cart button removed, so commenting out
// document.querySelector('#openCart').addEventListener('click', () => { openSheet('#cartSheet'); renderCart(); });
// document.querySelector('#closeCart').addEventListener('click', () => closeSheet('#cartSheet'));
document.querySelector('#closeQv').addEventListener('click', () => closeDialog('#quickView'));

// Filters & sort
$$('.filters .pill').forEach(btn => btn.addEventListener('click', () => { 
  // Remove active class from all filter buttons
  $$('.filters .pill').forEach(filterBtn => {
    filterBtn.classList.remove('active');
  });
  
  // Add active class to clicked filter button
  btn.classList.add('active');
  
  state.filter = btn.dataset.filter; 
  renderGrid(); 
}));
document.querySelector('#sorter').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });

// Search (commented out since search elements were removed)
// document.querySelector('#searchToggle').addEventListener('click', () => {
//   const bar = document.querySelector('.searchbar');
//   bar.style.display = bar.style.display === 'flex' ? 'none' : 'flex';
//   if (bar.style.display === 'flex') setTimeout(() => document.querySelector('#search').focus(), 0);
// });
// document.querySelector('#search').addEventListener('input', renderGrid);

// Category click handlers
function setupCategoryListeners() {
  const viewAllBtn = document.querySelector('#viewAllBtn');
  const sectionTitle = document.querySelector('#products h2');
  
  document.querySelectorAll('.cat').forEach(cat => {
    cat.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const category = cat.dataset.category;
      
      // Remove active class from all category buttons
      document.querySelectorAll('.cat').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Remove active class from all filter buttons
      $$('.filters .pill').forEach(filterBtn => {
        filterBtn.classList.remove('active');
      });
      
      // Add active class to clicked category
      cat.classList.add('active');
      
      // Add active class to corresponding filter button
      const filterBtn = document.querySelector(`.filters .pill[data-filter="${category}"]`);
      if (filterBtn) {
        filterBtn.classList.add('active');
      }
      
      // Update the main products section
      state.filter = category;
      renderGrid();
      
      // Update the section title
      const categoryNames = {
        'ring': 'Rings',
        'necklace': 'Necklaces', 
        'bracelet': 'Bracelets',
        'earring': 'Earrings'
      };
      sectionTitle.textContent = categoryNames[category] || 'New arrivals';
      
      // Show "View All" button
      if (viewAllBtn) {
        viewAllBtn.style.display = 'block';
      }
      
      // Scroll to products section
      document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // View All button handler
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      // Remove active class from all category buttons
      document.querySelectorAll('.cat').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Remove active class from all filter buttons
      $$('.filters .pill').forEach(filterBtn => {
        filterBtn.classList.remove('active');
      });
      
      // Add active class to "All" filter button
      const allFilterBtn = document.querySelector('.filters .pill[data-filter="all"]');
      if (allFilterBtn) {
        allFilterBtn.classList.add('active');
      }
      
      state.filter = 'all';
      renderGrid();
      sectionTitle.textContent = 'New arrivals';
      viewAllBtn.style.display = 'none';
    });
  }
}


// Footer category filtering function
function filterByCategory(category) {
  // Scroll to products section first
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Set the filter state
  state.filter = category;
  
  // Update active states
  document.querySelectorAll('.cat').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelectorAll('.filters .pill').forEach(filterBtn => {
    filterBtn.classList.remove('active');
  });
  
  // Add active class to corresponding category button
  const categoryBtn = document.querySelector(`.cat[data-category="${category}"]`);
  if (categoryBtn) {
    categoryBtn.classList.add('active');
  }
  
  // Add active class to corresponding filter button
  const filterBtn = document.querySelector(`.filters .pill[data-filter="${category}"]`);
  if (filterBtn) {
    filterBtn.classList.add('active');
  }
  
  // Update section title
  const sectionTitle = document.querySelector('#products h2');
  const categoryNames = {
    'ring': 'Rings',
    'necklace': 'Necklaces', 
    'bracelet': 'Bracelets',
    'earring': 'Earrings'
  };
  if (sectionTitle) {
    sectionTitle.textContent = categoryNames[category] || 'New arrivals';
  }
  
  // Show "View All" button
  const viewAllBtn = document.querySelector('#viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.style.display = 'block';
  }
  
  // Render the filtered grid
  renderGrid();
}

// Navigation smooth scrolling
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
renderGrid();
  setupNavigation();
  // Delay category listeners to ensure DOM is fully ready
  setTimeout(() => {
    setupCategoryListeners();
    // Set "All" filter as active by default
    const allFilterBtn = document.querySelector('.filters .pill[data-filter="all"]');
    if (allFilterBtn) {
      allFilterBtn.classList.add('active');
    }
  }, 100);
});
