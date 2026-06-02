const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('items.js', 'utf8'), ctx);
let items = ctx.window.SALE_ITEMS;
const img = (...ids) => ids.map(id => ({ image: `assets/items/${id}.jpg`, thumb: `assets/thumbs/${id}.jpg`, original: `${id.toUpperCase()}` }));
function add(item) { if (!items.some(x => x.id === item.id)) items.push(item); }
function update(id, patch) { const item = items.find(x => x.id === id); if (!item) throw new Error(`Missing ${id}`); Object.assign(item, patch); }
function remove(id) { items = items.filter(x => x.id !== id); }

remove('garage-tools-ladders-lot');
update('pair-scroll-metal-bar-chairs', {
  photos: img('img_0500','img_0506','img_0507','img_0508','img_0619'),
  description: 'Pair of black metal scroll-back chairs with patterned upholstered seats. Good for a bar-height counter, breakfast area, or accent seating.',
  notes: ['Quantity: 2 matching scroll chairs shown', 'Decorative metal frames', 'Seat condition shown in close-ups']
});
update('outdoor-planters-yard-items', {
  photos: img('img_0594','img_0595','img_0596','img_0597','img_0598'),
  description: 'Outdoor items including ceramic planters, green spreader/cart, and perforated metal lantern or planter-style pieces.',
  notes: ['Outdoor/patio items', 'Several planters shown', 'Green spreader/cart shown separately in photos']
});

add({ id:'wood-seat-metal-chair', title:'Wood-Seat Metal Accent Chair', category:'Chairs', room:'Dining / Entry', price:'$45 OBO', quantity:1, featured:false, hero:'assets/items/img_0640.jpg', photos:img('img_0640'), description:'Single metal accent chair with shaped wood seat. Useful as extra seating, plant-stand seating, or a small entry/dining accent.', notes:['Single chair shown', 'Different from the matching scroll chair pair', 'Good quick pickup item'] });
add({ id:'werner-extension-ladder', title:'Werner Extension Ladder', category:'Garage & Tools', room:'Garage', price:'$140 OBO', quantity:1, featured:false, hero:'assets/items/img_0590.jpg', photos:img('img_0590'), description:'Werner extension ladder priced to compete with new big-box ladder pricing while still moving quickly for local pickup.', notes:['Large Werner ladder visible', 'Priced below typical new retail ladder cost', 'Buyer should confirm size/rating in person'] });
add({ id:'extra-ladders-step-ladders', title:'Additional Ladders / Step Ladders', category:'Garage & Tools', room:'Garage', price:'$60 OBO for group', quantity:1, featured:false, hero:'assets/items/img_0585.jpg', photos:img('img_0585'), description:'Additional household ladders/step ladders visible in the garage grouping. Useful for utility, storage, and home projects.', notes:['Group pricing; individual offers considered', 'Exact ladder count should be confirmed in person', 'Bundle with Werner ladder available'] });
add({ id:'multi-drawer-parts-organizer', title:'Multi-Drawer Parts Organizer / Storage Cabinet', category:'Garage & Tools', room:'Garage', price:'$45 OBO', quantity:1, featured:false, hero:'assets/items/img_0589.jpg', photos:img('img_0589'), description:'Multi-drawer organizer cabinet for small parts, hardware, craft supplies, tools, fasteners, or garage organization.', notes:['Many small drawers visible', 'Useful for garage, craft room, or workshop', 'Contents not guaranteed unless confirmed'] });
add({ id:'garage-hoses-tubing-lot', title:'Garage Hoses / Tubing Lot', category:'Garage & Tools', room:'Garage', price:'$35 OBO', quantity:1, featured:false, hero:'assets/items/img_0586.jpg', photos:img('img_0586'), description:'Group of hoses/tubing and utility garage pieces. Best as a practical bundle for someone already picking up tools or outdoor items.', notes:['Sold as a lot', 'Inspect exact pieces in person', 'Good bundle add-on'] });
add({ id:'big-red-mechanic-utility-item', title:'Big Red Mechanic / Utility Item', category:'Garage & Tools', room:'Garage', price:'$40 OBO', quantity:1, featured:false, hero:'assets/items/img_0587.jpg', photos:img('img_0587'), description:'Big Red branded garage utility item. Likely useful for mechanic, workshop, or garage tasks depending on buyer needs.', notes:['Big Red branding visible', 'Function/type should be confirmed in person', 'Priced conservatively for quick pickup'] });
add({ id:'cleaning-tools-broom-lot', title:'Cleaning Tools / Broom Lot', category:'Garage & Tools', room:'Garage', price:'$20 OBO', quantity:1, featured:false, hero:'assets/items/img_0591.jpg', photos:img('img_0591'), description:'Small cleaning-tool lot including broom/handle tools visible in garage photos. Practical add-on for a bundle buyer.', notes:['Low-cost utility lot', 'Bundle with garage items', 'Exact contents confirmed in person'] });
add({ id:'garage-household-overflow-lot', title:'Garage Household Overflow Lot', category:'Garage & Tools', room:'Garage', price:'$25 OBO', quantity:1, featured:false, hero:'assets/items/img_0584.jpg', photos:img('img_0583','img_0584','img_0588'), description:'Remaining mixed garage/household overflow items not otherwise broken out. Includes small household utility pieces and miscellaneous items visible in the photos.', notes:['Use as a bundle/overflow listing', 'Individual contents should be confirmed in person', 'Good add-on for buyer taking multiple items'] });

const order = ['Bedroom','Living Room','Chairs','Tables','Electronics','Storage','Wall Decor','Decor','Lighting','Sewing','Kids & Toys','Garage & Tools','Outdoor','Household'];
items.sort((a,b)=> (order.indexOf(a.category) - order.indexOf(b.category)) || a.title.localeCompare(b.title));
fs.writeFileSync('items.js', `window.SALE_ITEMS = ${JSON.stringify(items, null, 2)};\n`, 'utf8');
fs.writeFileSync('scripts/write-items.cjs', `const fs = require('fs');\nconst items = ${JSON.stringify(items, null, 2)};\nfs.writeFileSync('items.js', \`window.SALE_ITEMS = ${'${JSON.stringify(items, null, 2)}'};\\n\`, 'utf8');\nconsole.log(\`wrote ${'${items.length}'} grouped listings\`);\n`, 'utf8');
console.log(JSON.stringify({items: items.length}));
