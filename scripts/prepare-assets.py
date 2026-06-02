import json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
from pillow_heif import register_heif_opener

register_heif_opener()
root = Path.cwd()
image_dir = root / 'images'
item_dir = root / 'assets' / 'items'
thumb_dir = root / 'assets' / 'thumbs'
contact_dir = root / 'assets' / 'contact'
for d in (item_dir, thumb_dir, contact_dir):
    d.mkdir(parents=True, exist_ok=True)

files = sorted([p for p in image_dir.iterdir() if p.suffix.lower() in ['.heic', '.jpg', '.jpeg', '.png']], key=lambda p: p.name)
records = []
for idx, p in enumerate(files, 1):
    print(f'converting {idx}/{len(files)} {p.name}')
    image = Image.open(p)
    image = ImageOps.exif_transpose(image).convert('RGB')
    item = image.copy()
    item.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
    item_name = f'{p.stem.lower()}.jpg'
    item.save(item_dir / item_name, 'JPEG', quality=84, optimize=True)

    thumb = ImageOps.fit(image, (520, 390), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    thumb.save(thumb_dir / item_name, 'JPEG', quality=78, optimize=True)
    records.append({
        'id': p.stem.lower(),
        'source': f'images/{p.name}',
        'image': f'assets/items/{item_name}',
        'thumb': f'assets/thumbs/{item_name}',
        'originalFile': p.name,
    })

try:
    font = ImageFont.truetype('arialbd.ttf', 20)
except Exception:
    font = ImageFont.load_default()
cols, per_sheet = 4, 16
tile_w, tile_h, label_h = 260, 195, 34
for sheet_idx in range((len(records) + per_sheet - 1) // per_sheet):
    sheet_records = records[sheet_idx * per_sheet:(sheet_idx + 1) * per_sheet]
    rows = (len(sheet_records) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * tile_w, rows * (tile_h + label_h)), '#f3f4f6')
    draw = ImageDraw.Draw(sheet)
    for i, rec in enumerate(sheet_records):
        x = (i % cols) * tile_w
        y = (i // cols) * (tile_h + label_h)
        thumb = Image.open(root / rec['thumb']).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
        draw.rectangle((x, y + tile_h, x + tile_w, y + tile_h + label_h), fill='#111827')
        draw.text((x + 10, y + tile_h + 7), rec['id'].upper(), fill='white', font=font)
    sheet.save(contact_dir / f'sheet-{sheet_idx + 1:02}.jpg', 'JPEG', quality=86, optimize=True)

(root / 'items.raw.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print(f'wrote {len(records)} records')
