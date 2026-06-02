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
update('ornate-queen-bedroom-suite', {
  id: 'ornate-king-bedroom-suite',
  title: 'Ornate King Bedroom Suite',
  price: '$800 OBO',
  description: 'Large coordinated king bedroom suite with carved wood styling, upholstered/nailhead headboard detail, matching dresser and bedside storage. Best for a buyer furnishing a full room at once.',
  notes: ['King bed suite; corrected from earlier queen label', 'Suggested price is for the grouped suite; individual offers considered', 'Buyer pickup required; bring truck and loading help']
});
update('wall-mounted-tv', { price: '$100 OBO' });
update('record-player-console', { price: '$50 OBO' });
update('singer-sewing-machine-table', { price: '$450 OBO', description: 'Singer sewing machine mounted in a work table with foot pedal and close-up machine photos. Higher-value sewing setup for a hobbyist, collector, or resale buyer.' });
update('garage-tools-ladders-lot', {
  title: 'Werner Ladder + Garage Utility Items',
  price: '$140 OBO for large ladder; smaller tools/ladders negotiable',
  description: 'Garage and utility items including a Werner ladder, additional ladders, storage drawers, yard/cleaning tools, hoses/tubing, and household utility pieces. The large ladder is priced below typical new big-box ladder pricing to move locally.',
  notes: ['Large Werner ladder target: $140 OBO', 'Smaller ladders/tools can be bundled or sold individually', 'Competing against new Home Depot-style pricing while staying attractive for pickup']
});
update('floral-wingback-chair', { photos: img('img_0516','img_0517','img_0518','img_0631') });
update('decorative-figurines-lot', { photos: img('img_0571','img_0572','img_0573','img_0578','img_0579','img_0580','img_0581','img_0582','img_0592','img_0593','img_0629','img_0630','img_0632','img_0635','img_0663','img_0664') });
update('plant-stand-artificial-tree', { photos: img('img_0530','img_0531','img_0532','img_0574','img_0575','img_0633','img_0634','img_0649') });
update('framed-wall-art-group', { photos: img('img_0557','img_0558','img_0559','img_0561','img_0577','img_0611','img_0612','img_0614','img_0615','img_0616','img_0647','img_0648','img_0659') });
update('mirror-collection', { photos: img('img_0613','img_0617','img_0618','img_0654') });
update('pair-scroll-metal-bar-chairs', { photos: img('img_0500','img_0506','img_0507','img_0508','img_0619','img_0640') });
add({id:'folding-room-divider-screen',title:'Folding Room Divider Screen',category:'Decor',room:'Living Room',price:'$85 OBO',featured:false,hero:'assets/items/img_0626.jpg',photos:img('img_0626'),description:'Black-and-white folding room divider screen. Useful as a privacy screen, decorative backdrop, or room separation piece.',notes:['Folding panel screen', 'Good staging/decor piece', 'Easy standalone pickup item']});
add({id:'hp-monitor',title:'HP Flat Panel Monitor',category:'Electronics',room:'Office / Media',price:'$50 OBO',featured:false,hero:'assets/items/img_0639.jpg',photos:img('img_0639','img_0641'),description:'HP flat panel monitor with stand shown. Useful as a computer display, secondary monitor, or simple office setup.',notes:['HP label/details visible in photos', 'Buyer should confirm inputs and test if needed', 'Priced for quick local pickup']});
add({id:'decorative-tree-wall-panels',title:'Decorative Metal Tree Wall Panels',category:'Wall Decor',room:'Living Area',price:'$90 OBO',featured:false,hero:'assets/items/img_0643.jpg',photos:img('img_0642','img_0643'),description:'Tall decorative metal wall panels with tree/leaf motif. Strong visual pieces for entry, hallway, living room, or patio-style decor.',notes:['Two views shown', 'Tall vertical decor format', 'Bundle offers considered']});
add({id:'brass-scissors-wall-decor',title:'Brass Scissors Wall Decor',category:'Wall Decor',room:'Hall / Living Areas',price:'$35 OBO',featured:false,hero:'assets/items/img_0645.jpg',photos:img('img_0645'),description:'Gold/brass-tone oversized scissors wall decor. Distinctive accent piece for craft room, salon, studio, or gallery wall.',notes:['Oversized wall accent', 'Good for sewing/craft theme', 'Easy pickup item']});
add({id:'floor-lamp-table-lamps',title:'Floor Lamp & Table Lamp Decor',category:'Lighting',room:'Living Areas',price:'$75 OBO',featured:false,hero:'assets/items/img_0646.jpg',photos:img('img_0646','img_0563','img_0564','img_0593'),description:'Lighting group including floor/table lamp styles shown across the home. Available individually or as a bundle.',notes:['Function should be confirmed at sale', 'Individual offers welcome', 'Good add-on bundle']});
add({id:'abstract-wall-art',title:'Large Abstract Wall Art',category:'Wall Decor',room:'Living Area',price:'$95 OBO',featured:false,hero:'assets/items/img_0651.jpg',photos:img('img_0651','img_0652'),description:'Large horizontal abstract wall art with black, white, red, yellow, and neutral tones. Modern accent piece for a wide wall.',notes:['Large horizontal format', 'Two angles shown', 'Good statement art piece']});
add({id:'decorative-wreath',title:'Gold-Tone Decorative Wreath',category:'Decor',room:'Living Area',price:'$35 OBO',featured:false,hero:'assets/items/img_0653.jpg',photos:img('img_0653'),description:'Gold-tone decorative wreath with layered leaf texture. Good wall, door, or seasonal decor accent.',notes:['Decorative wreath', 'Neutral metallic finish', 'Easy pickup item']});
add({id:'ironing-board',title:'Folding Ironing Board',category:'Household',room:'Utility / Bedroom',price:'$25 OBO',featured:false,hero:'assets/items/img_0657.jpg',photos:img('img_0657'),description:'Folding ironing board in usable household condition. Simple utility item for laundry or sewing setup.',notes:['Folds for transport', 'Good add-on with sewing items', 'Priced to move']});
add({id:'metal-flower-wall-art',title:'Red Metal Flower Wall Art',category:'Wall Decor',room:'Living Area',price:'$45 OBO',featured:false,hero:'assets/items/img_0656.jpg',photos:img('img_0656','img_0658'),description:'Red metal flower wall art with dimensional floral detail. Bright accent decor for a wall or covered patio.',notes:['Two flower views shown', 'Dimensional metal design', 'Bundle with other wall art available']});
add({id:'guest-room-dresser',title:'Wood Dresser / Storage Chest',category:'Bedroom',room:'Bedroom',price:'$175 OBO',featured:false,hero:'assets/items/img_0660.jpg',photos:img('img_0660'),description:'Wood dresser/storage chest shown with decorative items. Useful bedroom storage piece with traditional styling.',notes:['Dresser/storage piece', 'Decor on top not automatically included', 'Buyer pickup required']});
add({id:'kids-play-kitchen',title:'Kids Play Kitchen Set',category:'Kids & Toys',room:'Kids Room',price:'$80 OBO',featured:false,hero:'assets/items/img_0661.jpg',photos:img('img_0661'),description:'Children’s play kitchen set with visible play features and accessories. Good standalone kids item.',notes:['Play kitchen set', 'Accessories shown may vary', 'Confirm completeness in person']});
add({id:'large-wall-clock',title:'Large Decorative Wall Clock',category:'Wall Decor',room:'Bedroom / Living Area',price:'$55 OBO',featured:false,hero:'assets/items/img_0662.jpg',photos:img('img_0662'),description:'Large decorative wall clock with black scroll-style outer frame and vintage face. Strong wall accent with functional potential.',notes:['Large wall clock', 'Confirm clock function/battery in person', 'Good decorative piece']});
const order = ['Bedroom','Living Room','Chairs','Tables','Electronics','Storage','Wall Decor','Decor','Lighting','Sewing','Kids & Toys','Garage & Tools','Outdoor','Household'];
items.sort((a,b)=> (order.indexOf(a.category) - order.indexOf(b.category)) || a.title.localeCompare(b.title));
fs.writeFileSync('items.js', `window.SALE_ITEMS = ${JSON.stringify(items, null, 2)};\n`, 'utf8');
fs.writeFileSync('scripts/write-items.cjs', `const fs = require('fs');\nconst items = ${JSON.stringify(items, null, 2)};\nfs.writeFileSync('items.js', \`window.SALE_ITEMS = ${'${JSON.stringify(items, null, 2)}'};\\n\`, 'utf8');\nconsole.log(\`wrote ${'${items.length}'} grouped listings\`);\n`, 'utf8');
console.log(`items=${items.length}`);
console.log(`sum=${items.reduce((s,i)=>s+(Number((i.price.match(/\$([0-9,]+)/)||[])[1]?.replace(',',''))||0),0)}`);
