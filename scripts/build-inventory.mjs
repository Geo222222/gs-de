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
const csvEscape = (value) => {
  const text = value == null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};
const total = items.reduce((sum, item) => sum + priceNumber(item.price), 0);
const buyout = 6500;
const workbook = Workbook.create();
const inventory = workbook.worksheets.add("Inventory");
const categories = workbook.worksheets.add("Category Summary");
const summary = workbook.worksheets.add("Summary");

const headers = [
  "Item #",
  "Item Name",
  "Category",
  "Room / Area",
  "Quantity",
  "Suggested Price",
  "Price Number",
  "Extended Ask",
  "Status",
  "OBO?",
  "Featured?",
  "Photo Count",
  "Main Photo",
  "Description",
  "Notes",
  "Buyer / Sold To",
  "Final Sold Price",
  "Pickup Status"
];
const rows = items.map((item, index) => [
  index + 1,
  item.title,
  item.category,
  item.room,
  1,
  item.price,
  priceNumber(item.price),
  null,
  "Available",
  "Yes",
  item.featured ? "Yes" : "No",
  item.photos.length,
  item.hero,
  item.description,
  item.notes.join(" | "),
  "",
  "",
  ""
]);
inventory.getRange(`A1:R${rows.length + 1}`).values = [headers, ...rows];
inventory.getRange(`H2:H${rows.length + 1}`).formulas = rows.map((_, index) => [`=E${index + 2}*G${index + 2}`]);

const categoryMap = new Map();
for (const item of items) {
  const entry = categoryMap.get(item.category) || { count: 0, ask: 0 };
  entry.count += 1;
  entry.ask += priceNumber(item.price);
  categoryMap.set(item.category, entry);
}
const categoryRows = [...categoryMap.entries()].sort((a,b)=>b[1].ask-a[1].ask).map(([category, entry]) => [category, entry.count, entry.ask]);
categories.getRange(`A1:C${categoryRows.length + 1}`).values = [["Category","Listings","Base Asking Total"], ...categoryRows];

summary.getRange("A1:B9").values = [
  ["GEO Home Sale Inventory", ""],
  ["Contact", "GEO"],
  ["Phone", "205-418-8019"],
  ["Location", "Decatur, Alabama"],
  ["Sale Timing", "All-day event; call or message for info"],
  ["Listings", items.length],
  ["Base Asking Total", total],
  ["Whole-House Buyout", buyout],
  ["Quantity Note", "Update quantities directly on the Inventory sheet"],
];
summary.getRange("D1:E5").values = [
  ["Pricing Position", "All listed prices are OBO"],
  ["Recommended Buyout", "$6,500 OBO"],
  ["Buyer Pitch", "Pick everything up and start with resale-ready inventory"],
  ["Pickup Note", "Buyer handles loading, hauling, and transport"],
  ["Working Sheet", "Use the Inventory tab first"],
];

await fs.mkdir("outputs/geo-sale-inventory", { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save("outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.xlsx");

const csvRows = [headers, ...rows.map((row, index) => {
  const copy = [...row];
  copy[7] = row[4] * row[6];
  return copy;
})];
const csv = csvRows.map(row => row.map(csvEscape).join(",")).join("\r\n");
await fs.writeFile("outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.csv", csv, "utf8");
console.log(JSON.stringify({ xlsx: "outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.xlsx", csv: "outputs/geo-sale-inventory/GEO_Home_Sale_Inventory.csv", rows: items.length }));
