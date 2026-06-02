# Furniture & Home Sale

Static GitHub Pages site for advertising a local furniture / estate-style home sale.

## What is included

- Responsive sale catalog with searchable, filterable item cards
- 26 grouped listings generated from the iPad photo set
- Browser-safe optimized JPG assets in `assets/items/`
- Thumbnail assets in `assets/thumbs/`
- Printable letter-size physical signs in `signs.html`
- Helper scripts for rebuilding image assets and validating references

## Edit before publishing publicly

Update these placeholders before sharing the link widely:

- Sale hours in `index.html`
- Street address or neighborhood directions in `index.html`
- Address/hours on the printable signs in `signs.html`
- Public GitHub Pages URL or QR code on `signs.html`
- Fixed item prices in `items.js`, if desired

## Local preview

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

Printable signs are at:

```text
http://127.0.0.1:4173/signs.html
```

## Rebuild assets after adding photos

Install image dependencies once:

```powershell
python -m pip install --user pillow pillow-heif
```

Add new photos under `images/`, then run:

```powershell
python scripts/prepare-assets.py
node scripts/write-items.cjs
node scripts/validate.cjs
```

`prepare-assets.py` converts HEIC/JPG originals into browser-safe images under `assets/items/` and thumbnails under `assets/thumbs/`.

## Validate

```powershell
node -c app.js
node scripts/validate.cjs
```

Expected validation result:

```json
{
  "listings": 26,
  "missing": []
}
```

## GitHub Pages

1. Push this repository to GitHub.
2. Open repository `Settings` → `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save and wait for GitHub to publish the Pages URL.

## Notes

Original HEIC and MOV files are intentionally ignored by `.gitignore`. The published site uses optimized JPG files so the page loads faster and works in normal browsers.
