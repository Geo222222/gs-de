import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const input = await FileBlob.load("outputs/geo-sale-inventory/GEO_Home_Sale_Inventory_clean.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);
const inventory = await workbook.inspect({ kind: "table", range: "Inventory!A1:H10", include: "values,formulas", tableMaxRows: 10, tableMaxCols: 8 });
console.log(inventory.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "formula errors" });
console.log(errors.ndjson);
await workbook.render({ sheetName: "Inventory", range: "A1:R18", scale: 1 });
