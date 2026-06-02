const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('items.js', 'utf8'), ctx);
const missing = [];
for (const item of ctx.window.SALE_ITEMS) {
  if (!fs.existsSync(item.hero)) missing.push(item.hero);
  for (const photo of item.photos) {
    if (!fs.existsSync(photo.image)) missing.push(photo.image);
    if (!fs.existsSync(photo.thumb)) missing.push(photo.thumb);
  }
}
console.log(JSON.stringify({ listings: ctx.window.SALE_ITEMS.length, missing }, null, 2));
