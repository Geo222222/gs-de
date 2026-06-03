# GEO Curated Estate Drop

Static GitHub Pages site for GEO's limited-time estate inventory release in Decatur, Alabama.

## Positioning

The site positions the offer as a curated estate drop for decorators, families, resellers, deal hunters, and anyone who can move quickly with pickup.

## Contact

- Name: GEO
- Phone: 205-418-8019
- Location: Decatur, Alabama
- Timing: All-day access window on Wednesday–Friday and Sunday
- Pricing: Individual pieces are OBO; bundles are encouraged
- Whole-house pickup: $6,500 OBO

## What is included

- Responsive landing page and inventory experience
- 75 grouped item listings from 228 source photos
- Search and category filtering
- Featured high-interest listings
- Call and SMS links for GEO
- Optimized web images in `assets/items/`
- Thumbnails in `assets/thumbs/`
- Contact sheets in `assets/contact/`
- Clean inventory XLSX and CSV in `outputs/geo-sale-inventory/`
- Separate road-sign print files in `signs.html` and `outputs/geo-sale-inventory/GEO_Road_Signs_12_Faces.pdf`

## Local preview

```powershell
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/index.html
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
  "listings": 57,
  "missing": []
}
```

## GitHub Pages

1. Push this repository to GitHub.
2. Open repository `Settings` ? `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save and wait for GitHub to publish.




