# GEO Home Sale

Static GitHub Pages site for GEO's local furniture / estate-style home sale in Decatur, Alabama.

## Sale contact

- Name: GEO
- Phone: 205-418-8019
- Location: Decatur, Alabama
- Timing: All-day event on Wednesday–Friday and Sunday
- Pricing: Suggested prices are intentionally marked `OBO` / or best offer

## What is included

- Futuristic responsive landing page and item catalog
- 34 grouped item listings from 131 source photos
- Search and category filtering
- Featured high-interest listings
- Call and SMS links for GEO
- Optimized web images in `assets/items/`
- Thumbnails in `assets/thumbs/`
- Contact sheets in `assets/contact/`
- Printable physical signs in `signs.html`
- Rebuild and validation scripts in `scripts/`

## Local preview

```powershell
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/index.html
```

Printable signs:

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

`images/` is ignored because GitHub Pages only needs the optimized JPG files under `assets/`.

## Validate

```powershell
node -c app.js
node scripts/validate.cjs
```

Expected validation shape:

```json
{
  "listings": 34,
  "missing": []
}
```

## GitHub Pages

1. Push this repository to GitHub.
2. Open repository `Settings` → `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save and wait for GitHub to publish.

## Notes

Original HEIC and MOV files are intentionally ignored by `.gitignore`. The public site uses optimized JPG files so the catalog loads faster and works in normal browsers.
