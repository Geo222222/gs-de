const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('items.js', 'utf8'), ctx);
const items = ctx.window.SALE_ITEMS;
const img = (...ids) => ids.map(id => ({ image: `assets/items/${id}.jpg`, thumb: `assets/thumbs/${id}.jpg`, original: `${id.toUpperCase()}` }));
function update(id, patch) {
  const item = items.find(entry => entry.id === id);
  if (!item) throw new Error(`Missing ${id}`);
  Object.assign(item, patch);
}
function add(item) {
  if (!items.some(entry => entry.id === item.id)) items.push(item);
}
function removePhotoIds(id, ids) {
  const item = items.find(entry => entry.id === id);
  if (!item) return;
  const remove = new Set(ids.map(x => x.toUpperCase()));
  item.photos = item.photos.filter(photo => !remove.has(photo.original));
}

// Existing inferred quantities where photos make counts clearer.
update('decorative-figurines-lot', {
  title: 'Mixed Decorative Small Items Lot',
  price: '$10–$60 OBO',
  quantity: 1,
  description: 'Remaining mixed tabletop decor and smaller decorative accents not broken out as individual listings. Good for bundle buyers and decor resellers.',
  notes: ['Individual offers welcome', 'Bundle with figurines, lamps, or wall decor', 'Exact contents can be confirmed in person']
});
update('decorative-wreath', { quantity: 1 });
update('plant-stand-artificial-tree', { quantity: 1, photos: img('img_0530','img_0531','img_0532','img_0574','img_0575','img_0633','img_0634','img_0649','img_0687','img_0688') });
update('floor-lamp-table-lamps', { quantity: 3 });
update('decorative-figurines-lot', { photos: img('img_0571','img_0572','img_0573','img_0592','img_0593','img_0629','img_0630','img_0632','img_0635','img_0663','img_0664') });

add({
  id: 'vintage-style-globe',
  title: 'Vintage-Style Decorative Globe',
  category: 'Decor',
  room: 'Living Area',
  price: '$35 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0676.jpg',
  photos: img('img_0676'),
  description: 'Decorative globe with vintage-style map finish and pedestal base. Strong desk, bookshelf, office, or study accent.',
  notes: ['One globe shown', 'Good office/study decor', 'Easy pickup item']
});
add({
  id: 'angel-figurine',
  title: 'Angel Figurine',
  category: 'Decor',
  room: 'Living Area',
  price: '$25 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0677.jpg',
  photos: img('img_0677'),
  description: 'Light-toned angel figurine with floral detail. Decorative tabletop piece for a mantel, shelf, or memorial display.',
  notes: ['One angel figurine shown', 'Delicate decorative piece', 'Bundle offers welcome']
});
add({
  id: 'family-figurine',
  title: 'Family Figurine',
  category: 'Decor',
  room: 'Living Area',
  price: '$30 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0678.jpg',
  photos: img('img_0678'),
  description: 'Family-themed figurine with seated adult and child figures. Warm sentimental tabletop decor piece.',
  notes: ['One family figurine shown', 'Good shelf or table display piece', 'Bundle with other figurines available']
});
add({
  id: 'seated-woman-figurine',
  title: 'Seated Woman Figurine',
  category: 'Decor',
  room: 'Living Area',
  price: '$30 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0679.jpg',
  photos: img('img_0679','img_0680'),
  description: 'Decorative seated woman figurine photographed from multiple angles. Elegant accent for tabletop, shelf, or display cabinet.',
  notes: ['One figurine shown from two angles', 'Detailed sculptural decor', 'Inspect condition in person']
});
add({
  id: 'black-angel-statue',
  title: 'Black Angel Statue',
  category: 'Decor',
  room: 'Living Area',
  price: '$35 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0681.jpg',
  photos: img('img_0681','img_0682'),
  description: 'Dark angel statue with sculptural robe and wing detail. Strong decorative shelf or table piece.',
  notes: ['One black angel statue shown', 'Multiple detail photos included', 'Pairs well with other figurines']
});
add({
  id: 'golden-elephant-figurines',
  title: 'Golden Elephant Figurines',
  category: 'Decor',
  room: 'Living Area',
  price: '$45 OBO for set of 3',
  quantity: 3,
  featured: false,
  hero: 'assets/items/img_0683.jpg',
  photos: img('img_0683','img_0684'),
  description: 'Set of three gold-tone elephant figurines. Good luck-style decor set for shelf, table, entry console, or resale bundle.',
  notes: ['Quantity: 3 golden elephants', 'Sold preferably as a set', 'Close-up photo included']
});
add({
  id: 'gold-pineapple-decor-pieces',
  title: 'Gold Pineapple Decor Pieces',
  category: 'Decor',
  room: 'Living Area',
  price: '$45 OBO for group',
  quantity: 3,
  featured: false,
  hero: 'assets/items/img_0685.jpg',
  photos: img('img_0578','img_0580','img_0685','img_0686'),
  description: 'Gold-tone pineapple decor pieces with textured metallic finish. Strong accent pieces for table, shelf, entry, or tropical glam decor.',
  notes: ['Quantity inferred from photos: 3 pieces', 'Buyer can confirm exact group in person', 'Bundle-friendly decor item']
});
add({
  id: 'metal-hourglass-decor',
  title: 'Metal Hourglass Decor',
  category: 'Decor',
  room: 'Living Area',
  price: '$25 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0675.jpg',
  photos: img('img_0675'),
  description: 'Metal-frame hourglass decor piece. Good bookshelf, office, console, or tabletop accent.',
  notes: ['One hourglass shown', 'Decorative tabletop scale', 'Easy add-on purchase']
});
add({
  id: 'teddy-bear-chair-decor',
  title: 'Teddy Bear Chair Decor Set',
  category: 'Decor',
  room: 'Living Area',
  price: '$35 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0674.jpg',
  photos: img('img_0674'),
  description: 'Small decorative chair display with teddy bears and soft accent pieces. Cute tabletop or children’s room decor bundle.',
  notes: ['Sold as photographed', 'Small decor bundle', 'Good add-on with kids/decor items']
});

const order = ['Bedroom','Living Room','Chairs','Tables','Electronics','Storage','Wall Decor','Decor','Lighting','Sewing','Kids & Toys','Garage & Tools','Outdoor','Household'];
items.sort((a,b)=> (order.indexOf(a.category) - order.indexOf(b.category)) || a.title.localeCompare(b.title));
fs.writeFileSync('items.js', `window.SALE_ITEMS = ${JSON.stringify(items, null, 2)};\n`, 'utf8');
fs.writeFileSync('scripts/write-items.cjs', `const fs = require('fs');\nconst items = ${JSON.stringify(items, null, 2)};\nfs.writeFileSync('items.js', \`window.SALE_ITEMS = ${'${JSON.stringify(items, null, 2)}'};\\n\`, 'utf8');\nconsole.log(\`wrote ${'${items.length}'} grouped listings\`);\n`, 'utf8');
console.log(JSON.stringify({ items: items.length, added: 9 }));

