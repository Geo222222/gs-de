const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('items.js','utf8'), ctx);
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
update('mirror-collection', { photos: img('img_0613','img_0617','img_0618','img_0654','img_0671','img_0672') });
update('framed-wall-art-group', { photos: img('img_0557','img_0558','img_0559','img_0561','img_0577','img_0611','img_0612','img_0614','img_0615','img_0616','img_0647','img_0648','img_0659','img_0670','img_0673') });
add({
  id:'wood-frame-rocking-chair',
  title:'Wood Frame Rocking Chair',
  category:'Chairs',
  room:'Living Room',
  price:'$125 OBO',
  featured:false,
  hero:'assets/items/img_0665.jpg',
  photos:img('img_0665','img_0666','img_0667'),
  description:'Wood frame rocking chair with light patterned upholstered seat and back. Traditional accent chair for a living room, nursery, bedroom, or porch-style sitting area.',
  notes:['Rocking chair shown from multiple angles','Light patterned upholstery','Buyer should inspect fabric and rocker condition in person']
});
add({
  id:'tufted-ottoman-bench',
  title:'Tufted Ottoman / Small Bench',
  category:'Chairs',
  room:'Living Room',
  price:'$65 OBO',
  featured:false,
  hero:'assets/items/img_0668.jpg',
  photos:img('img_0668','img_0669'),
  description:'Small tufted ottoman or bench with light upholstery and wood legs. Useful as a footrest, vanity bench, or accent seating.',
  notes:['Tufted cushion top','Compact size','Pairs well with the rocking chair or accent seating']
});
const order = ['Bedroom','Living Room','Chairs','Tables','Electronics','Storage','Wall Decor','Decor','Lighting','Sewing','Kids & Toys','Garage & Tools','Outdoor','Household'];
items.sort((a,b)=> (order.indexOf(a.category) - order.indexOf(b.category)) || a.title.localeCompare(b.title));
fs.writeFileSync('items.js', `window.SALE_ITEMS = ${JSON.stringify(items, null, 2)};\n`, 'utf8');
fs.writeFileSync('scripts/write-items.cjs', `const fs = require('fs');\nconst items = ${JSON.stringify(items, null, 2)};\nfs.writeFileSync('items.js', \`window.SALE_ITEMS = ${'${JSON.stringify(items, null, 2)}'};\\n\`, 'utf8');\nconsole.log(\`wrote ${'${items.length}'} grouped listings\`);\n`, 'utf8');
console.log(JSON.stringify({items:items.length}));
