import fs from "node:fs/promises";
import vm from "node:vm";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const source = await fs.readFile("items.js", "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const items = context.window.SALE_ITEMS;
const priceNumber = (price) => {
  const match = String(price).match(/\$([0-9,]+)/);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
};
const total = items.reduce((sum, item) => sum + priceNumber(item.price), 0);
const buyout = 6500;
const workbook = Workbook.create();
const summary = workbook.worksheets.add("Summary");
const inventory = workbook.worksheets.add("Inventory");
const categories = workbook.worksheets.add("Category Summary");

summary.getRange("A1").values = [["GEO Home Sale Inventory"]];
summary.getRange("A3:B9").values = [
  ["Contact", "GEO"],
  ["Phone", "205-418-8019"],
  ["Location", "Decatur, Alabama"],
  ["Sale Timing", "All-day event; call or message for info"],
  ["Listings", items.length],
  ["Base Asking Total", total],
  ["Whole-House Buyout", buyout],
];
summary.getRange("D3:F7").values = [
  ["Pricing Position", "Use OBO to create urgency and leave room to negotiate", null],
  ["Recommended Buyout", "$6,500 OBO", "Approximates itemized ask while creating a remove-it-all convenience deal"],
  ["Buyer Pitch", "Come pick everything up and leave with resale-ready thrift-store starter inventory", null],
  ["Quantity Note", "Quantities are placeholders for GEO to update", null],
  ["Pickup Note", "Buyer handles loading, hauling, and transport", null],
];

const headers = ["Item ID","Title","Category","Room","Suggested Price","Price Number","Quantity","Extended Ask","Status","Featured","Photo Count","Hero Image","Description","Notes"];
const rows = items.map((item, index) => [
  item.id,
  item.title,
  item.category,
  item.room,
  item.price,
  priceNumber(item.price),
  1,
  null,
  "Available",
  item.featured ? "Yes" : "No",
  item.photos.length,
  item.hero,
  item.description,
  item.notes.join(" | "),
]);
inventory.getRange(`A1:N${rows.length + 1}`).values = [headers, ...rows];
const formulaRows = items.map((item, index) => [`=F${index + 2}*G${index + 2}`]);
inventory.getRange(`H2:H${rows.length + 1}`).formulas = formulaRows;

const categoryMap = new Map();
for (const item of items) {
  const entry = categoryMap.get(item.category) || { count: 0, ask: 0 };
  entry.count += 1;
  entry.ask += priceNumber(item.price);
  categoryMap.set(item.category, entry);
}
const categoryRows = [...categoryMap.entries()].sort((a,b)=>b[1].ask-a[1].ask).map(([category, entry]) => [category, entry.count, entry.ask]);
categories.getRange(`A1:C${categoryRows.length + 1}`).values = [["Category","Listings","Asking Total"], ...categoryRows];

await fs.mkdir("outputs/geo-sale-inventory", { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save("outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.xlsx");
console.log(JSON.stringify({ output: "outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.xlsx", items: items.length, total, buyout }));




