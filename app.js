const catalog = document.querySelector('#catalog');
const featuredGrid = document.querySelector('#featuredGrid');
const sewingSpotlight = document.querySelector('#sewingSpotlight');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const listingCount = document.querySelector('#listingCount');
const dialog = document.querySelector('#itemDialog');
const dialogHero = document.querySelector('#dialogHero');
const dialogThumbs = document.querySelector('#dialogThumbs');
const dialogCategory = document.querySelector('#dialogCategory');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogPrice = document.querySelector('#dialogPrice');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogNotes = document.querySelector('#dialogNotes');

listingCount.textContent = window.SALE_ITEMS.length;
const categories = [...new Set(window.SALE_ITEMS.map(item => item.category))].sort();
for (const category of categories) {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.append(option);
}

function itemMatches(item) {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const haystack = [item.title, item.category, item.room, item.price, item.description, item.freeOffer || '', ...(item.notes || [])].join(' ').toLowerCase();
  return (!query || haystack.includes(query)) && (category === 'all' || item.category === category);
}

function cardTemplate(item, variant = 'standard') {
  return `
    <button class="image-button" type="button" aria-label="View ${item.title}">
      <img loading="lazy" src="${item.hero}" alt="${item.title}" />
      <span class="photo-count">${item.photos.length} photos</span>
      ${item.freeOffer ? '<span class="free-badge">Free Bonus</span>' : ''}
    </button>
    <div class="item-copy">
      <div class="item-meta"><span>${item.category}</span><span>${item.price}</span></div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="card-footer">
        <span>${item.room}</span>
        <button class="text-button" type="button">Inspect</button>
      </div>
    </div>`;
}

function bindCard(card, item) {
  card.querySelectorAll('button').forEach(button => button.addEventListener('click', () => openDialog(item)));
}

function renderFeatured() {
  featuredGrid.innerHTML = '';
  for (const item of window.SALE_ITEMS.filter(item => item.featured).slice(0, 6)) {
    const card = document.createElement('article');
    card.className = 'item-card featured-card';
    card.innerHTML = cardTemplate(item, 'featured');
    bindCard(card, item);
    featuredGrid.append(card);
  }
}

function renderSewingSpotlight() {
  sewingSpotlight.innerHTML = '';
  const spotlightItems = window.SALE_ITEMS
    .filter(item => ['Sewing & Upholstery', 'Sewing'].includes(item.category))
    .filter(item => item.featured || /Singer|Brother|upholstery|marine|fabric/i.test(`${item.title} ${item.description}`))
    .slice(0, 6);

  for (const item of spotlightItems) {
    const card = document.createElement('article');
    card.className = 'item-card spotlight-card';
    card.innerHTML = cardTemplate(item, 'spotlight');
    bindCard(card, item);
    sewingSpotlight.append(card);
  }
}

function renderCatalog() {
  const items = window.SALE_ITEMS.filter(itemMatches);
  catalog.innerHTML = '';
  if (!items.length) {
    catalog.innerHTML = '<p class="empty">No matching finds right now. Try a broader search or text GEO — some pieces move as bundles.</p>';
    return;
  }
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.innerHTML = cardTemplate(item);
    bindCard(card, item);
    catalog.append(card);
  }
}

function openDialog(item) {
  dialogHero.src = item.hero;
  dialogHero.alt = item.title;
  dialogCategory.textContent = `${item.category} • ${item.room}`;
  dialogTitle.textContent = item.title;
  dialogPrice.textContent = item.freeOffer ? item.price : `${item.price} — or best offer`;
  dialogDescription.textContent = item.description;
  dialogNotes.innerHTML = [
    ...(item.freeOffer ? [item.freeOffer] : []),
    ...(item.notes || [])
  ].map(note => `<li>${note}</li>`).join('');
  dialogThumbs.innerHTML = '';
  for (const photo of item.photos) {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<img src="${photo.thumb}" alt="${item.title} additional photo" />`;
    button.addEventListener('click', () => {
      dialogHero.src = photo.image;
    });
    dialogThumbs.append(button);
  }
  dialog.showModal();
}

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
searchInput.addEventListener('input', renderCatalog);
categorySelect.addEventListener('change', renderCatalog);
renderFeatured();
renderSewingSpotlight();
renderCatalog();

