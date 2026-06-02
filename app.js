const catalog = document.querySelector('#items');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const dialog = document.querySelector('#itemDialog');
const dialogHero = document.querySelector('#dialogHero');
const dialogThumbs = document.querySelector('#dialogThumbs');
const dialogCategory = document.querySelector('#dialogCategory');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogNotes = document.querySelector('#dialogNotes');

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
  const haystack = [item.title, item.category, item.room, item.description, ...(item.notes || [])].join(' ').toLowerCase();
  return (!query || haystack.includes(query)) && (category === 'all' || item.category === category);
}

function renderCatalog() {
  const items = window.SALE_ITEMS.filter(itemMatches);
  catalog.innerHTML = '';
  if (!items.length) {
    catalog.innerHTML = '<p class="empty">No items match that search.</p>';
    return;
  }
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.innerHTML = `
      <button class="image-button" type="button" aria-label="View ${item.title}">
        <img loading="lazy" src="${item.hero}" alt="${item.title}" />
      </button>
      <div class="item-copy">
        <div class="item-meta"><span>${item.category}</span><span>${item.price}</span></div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="text-button" type="button">View ${item.photos.length} photo${item.photos.length === 1 ? '' : 's'}</button>
      </div>`;
    card.querySelectorAll('button').forEach(button => button.addEventListener('click', () => openDialog(item)));
    catalog.append(card);
  }
}

function openDialog(item) {
  dialogHero.src = item.hero;
  dialogHero.alt = item.title;
  dialogCategory.textContent = `${item.category} • ${item.room} • ${item.price}`;
  dialogTitle.textContent = item.title;
  dialogDescription.textContent = item.description;
  dialogNotes.innerHTML = item.notes.map(note => `<li>${note}</li>`).join('');
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
renderCatalog();
