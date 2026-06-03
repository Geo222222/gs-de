const fs = require('fs');
const vm = require('vm');

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('items.js', 'utf8'), ctx);
let items = ctx.window.SALE_ITEMS;

const img = (...ids) => ids.map(id => ({ image: `assets/items/${id}.jpg`, thumb: `assets/thumbs/${id}.jpg`, original: `${id.toUpperCase()}` }));

function add(item) {
  if (!items.some(existing => existing.id === item.id)) items.push(item);
}

function update(id, patch) {
  const item = items.find(existing => existing.id === id);
  if (!item) throw new Error(`Missing ${id}`);
  Object.assign(item, patch);
}

update('brother-1034dx-serger', {
  price: 'Free w/ $50+ purchase',
  featured: true,
  freeOffer: 'Free with a purchase of $50 or more; limit 1 free bonus item per customer.',
  description: 'Brother 1034DX serger sewing machine with original box shown. Positioned as a high-value doorbuster bonus for buyers spending $50 or more.',
  notes: ['Free with $50+ purchase', 'Limit 1 free bonus item per customer', 'Original box shown', 'Good traffic-driver for sewing buyers']
});

update('record-player-console', {
  price: 'Free w/ $30+ purchase',
  hero: 'assets/items/img_0708.jpg',
  photos: img('img_0708', 'img_0709', 'img_0710', 'img_0620', 'img_0621'),
  freeOffer: 'Free with a purchase of $30 or more; limit 1 free bonus item per customer.',
  description: 'Victrola-style vinyl/record player console with wood-look case and built-in controls. Offered as a strong bonus item for buyers spending $30 or more.',
  notes: ['Free with $30+ purchase', 'Limit 1 free bonus item per customer', 'Vinyl player shown open and close-up', 'Function should be confirmed in person']
});

add({
  id: 'vizio-sound-bar-bonus',
  title: 'Vizio Sound Bar Bonus',
  category: 'Free Bonus',
  room: 'Electronics',
  price: 'Free w/ $10+ purchase',
  quantity: 1,
  featured: true,
  hero: 'assets/items/img_0038.jpg',
  photos: img('img_0038', 'img_0039', 'img_0040', 'img_0041', 'img_0042'),
  freeOffer: 'Free with a purchase of $10 or more; limit 1 free bonus item per customer.',
  description: 'Vizio sound bar with multiple detail photos. A practical electronics bonus designed to make small purchases feel more valuable.',
  notes: ['Free with $10+ purchase', 'Limit 1 free bonus item per customer', 'Vizio branding visible', 'Buyer should confirm cables/accessories in person']
});

add({
  id: 'dvd-player-bonus',
  title: 'DVD Player Bonus',
  category: 'Free Bonus',
  room: 'Electronics',
  price: 'Free w/ $5+ purchase',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0714.jpg',
  photos: img('img_0714', 'img_0043', 'img_0044'),
  freeOffer: 'Free with a purchase of $5 or more; limit 1 free bonus item per customer.',
  description: 'Black DVD player offered as a simple bonus item for buyers making a $5+ purchase.',
  notes: ['Free with $5+ purchase', 'Limit 1 free bonus item per customer', 'Function/cables should be confirmed in person']
});

add({
  id: 'cassette-recorder-bonus',
  title: 'Cassette Recorder Bonus',
  category: 'Free Bonus',
  room: 'Electronics',
  price: 'Free w/ $5+ purchase',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0715.jpg',
  photos: img('img_0715'),
  freeOffer: 'Free with a purchase of $5 or more; limit 1 free bonus item per customer.',
  description: 'Portable cassette recorder offered as a nostalgic add-on bonus for buyers making a $5+ purchase.',
  notes: ['Free with $5+ purchase', 'Limit 1 free bonus item per customer', 'Automatic stop label visible', 'Function should be confirmed in person']
});

add({
  id: 'ceramic-chicken-rooster-bonus',
  title: 'Ceramic Chicken / Rooster Decor Bonus',
  category: 'Free Bonus',
  room: 'Decor',
  price: 'Free w/ $5+ purchase',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0712.jpg',
  photos: img('img_0712', 'img_0713'),
  freeOffer: 'Free with a purchase of $5 or more; limit 1 free bonus item per customer.',
  description: 'Kitchen-style ceramic chicken/rooster decor offered as a light, easy bonus item with a $5+ purchase.',
  notes: ['Free with $5+ purchase', 'Limit 1 free bonus item per customer', 'White chicken and rooster photos included']
});

add({
  id: 'blue-floral-vase',
  title: 'Blue Floral Vase',
  category: 'Decor',
  room: 'Decor / Tabletop',
  price: '$20 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0711.jpg',
  photos: img('img_0711'),
  description: 'Deep blue decorative vase with floral detail. Easy tabletop decor piece for a shelf, mantel, entry table, or resale display.',
  notes: ['Single vase shown', 'Good small add-on item', 'Inspect condition in person']
});

add({
  id: 'red-quilted-bag-bonus',
  title: 'Red Quilted Bag Bonus',
  category: 'Free Bonus',
  room: 'Accessories',
  price: 'Free w/ $5+ purchase',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0721.jpg',
  photos: img('img_0721'),
  freeOffer: 'Free with a purchase of $5 or more; limit 1 free bonus item per customer.',
  description: 'Red quilted bag with gray/faux-fur trim offered as a bonus item for a buyer making a $5+ purchase.',
  notes: ['Free with $5+ purchase', 'Limit 1 free bonus item per customer', 'Inspect condition in person']
});

add({
  id: 'gray-felt-bag-bonus',
  title: 'Gray Felt Bag Bonus',
  category: 'Free Bonus',
  room: 'Accessories',
  price: 'Free w/ $5+ purchase',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0722.jpg',
  photos: img('img_0722', 'img_0723'),
  freeOffer: 'Free with a purchase of $5 or more; limit 1 free bonus item per customer.',
  description: 'Gray felt bag shown from front and back. Offered as a bonus item for a buyer making a $5+ purchase.',
  notes: ['Free with $5+ purchase', 'Limit 1 free bonus item per customer', 'Front and back photos included']
});

add({
  id: 'marine-upholstery-vinyl-rolls',
  title: 'Marine-Quality Upholstery Vinyl / Material Rolls',
  category: 'Sewing & Upholstery',
  room: 'Sewing / Materials',
  price: '$275 OBO for lot',
  quantity: 1,
  featured: true,
  hero: 'assets/items/img_0690.jpg',
  photos: img('img_0690', 'img_0692', 'img_0694', 'img_0695', 'img_0696', 'img_0697', 'img_0724', 'img_0725', 'img_0730', 'img_0732'),
  description: 'Large upholstery and vinyl material roll lot, with several pieces appearing marine-quality or heavy-duty. Strong opportunity for boat seats, cushions, upholstery repair, craft resale, or a small shop.',
  notes: ['Dedicated sewing/upholstery spotlight item', 'Several rolls and material types shown', 'Most appear heavy-duty; buyer should confirm exact yardage and backing', 'Bundle with Singer table and sewing supplies']
});

add({
  id: 'upholstery-fabric-bolt-stack',
  title: 'Upholstery Fabric Bolt Stack',
  category: 'Sewing & Upholstery',
  room: 'Sewing / Materials',
  price: '$150 OBO for stack',
  quantity: 1,
  featured: true,
  hero: 'assets/items/img_0716.jpg',
  photos: img('img_0716', 'img_0717', 'img_0718', 'img_0719', 'img_0720'),
  description: 'Stacked upholstery and craft fabrics in multiple colors and textures. Good for chair recovering, pillows, samples, craft projects, and resale bundles.',
  notes: ['Multiple colors and textures visible', 'Buyer should confirm lengths/yardage', 'Good add-on for sewing machine buyers']
});

add({
  id: 'decorative-upholstery-remnant-rolls',
  title: 'Decorative Upholstery Remnant Rolls',
  category: 'Sewing & Upholstery',
  room: 'Sewing / Materials',
  price: '$125 OBO for lot',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0727.jpg',
  photos: img('img_0726', 'img_0727', 'img_0728', 'img_0729', 'img_0731'),
  description: 'Decorative upholstery remnant rolls with patterned and textured materials. Useful for accent cushions, small upholstery jobs, crafts, or booth resale.',
  notes: ['Patterned and textured rolls visible', 'Buyer should confirm exact quantity and lengths', 'Bundle with other material lots available']
});

add({
  id: 'chrome-wire-shelving-panels',
  title: 'Chrome Wire Shelving Panels / Rack Parts',
  category: 'Garage & Tools',
  room: 'Garage',
  price: '$35 OBO',
  quantity: 1,
  featured: false,
  hero: 'assets/items/img_0698.jpg',
  photos: img('img_0698'),
  description: 'Chrome wire shelving panels or rack parts visible in garage storage. Practical utility item for shelving repair, garage organization, or parts reuse.',
  notes: ['Garage utility item', 'Buyer should confirm exact parts and dimensions in person']
});

const order = ['Free Bonus', 'Bedroom', 'Living Room', 'Chairs', 'Tables', 'Electronics', 'Storage', 'Wall Decor', 'Decor', 'Lighting', 'Sewing & Upholstery', 'Sewing', 'Kids & Toys', 'Garage & Tools', 'Outdoor', 'Household'];
items.sort((a, b) => {
  const categoryOrder = order.indexOf(a.category) - order.indexOf(b.category);
  return categoryOrder || a.title.localeCompare(b.title);
});

fs.writeFileSync('items.js', `window.SALE_ITEMS = ${JSON.stringify(items, null, 2)};\n`, 'utf8');
fs.writeFileSync('scripts/write-items.cjs', `const fs = require('fs');\nconst items = ${JSON.stringify(items, null, 2)};\nfs.writeFileSync('items.js', \`window.SALE_ITEMS = ${'${JSON.stringify(items, null, 2)}'};\\n\`, 'utf8');\nconsole.log(\`wrote ${'${items.length}'} grouped listings\`);\n`, 'utf8');
console.log(JSON.stringify({ items: items.length }));
