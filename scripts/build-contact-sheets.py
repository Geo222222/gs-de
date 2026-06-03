import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CONTACT_DIR = ROOT / "assets" / "contact"


def load_items():
    source = (ROOT / "items.js").read_text(encoding="utf-8")
    payload = source.strip()
    payload = payload.removeprefix("window.SALE_ITEMS = ").removesuffix(";")
    return json.loads(payload)


def label_for_title(title):
    replacements = {
        " / ": " ",
        " with ": " + ",
        " and ": " + ",
        "Decorative ": "",
        "Bonus": "Free Bonus",
    }
    label = title
    for old, new in replacements.items():
        label = label.replace(old, new)
    words = label.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if len(candidate) > 22 and current:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return "\n".join(lines[:2])


def build_label_map(items):
    labels = {}
    for item in items:
        label = label_for_title(item["title"])
        for photo in item.get("photos", []):
            stem = Path(photo["image"]).stem
            labels[stem] = label
    return labels


def fit_text(draw, text, font_path, max_width, max_height, start_size=18, min_size=11):
    for size in range(start_size, min_size - 1, -1):
        try:
            font = ImageFont.truetype(font_path, size)
        except Exception:
            font = ImageFont.load_default()
        bbox = draw.multiline_textbbox((0, 0), text, font=font, spacing=1)
        if bbox[2] - bbox[0] <= max_width and bbox[3] - bbox[1] <= max_height:
            return font
    return ImageFont.load_default()


def main():
    records = json.loads((ROOT / "items.raw.json").read_text(encoding="utf-8"))
    labels = build_label_map(load_items())
    CONTACT_DIR.mkdir(parents=True, exist_ok=True)

    cols, per_sheet = 4, 16
    tile_w, tile_h, label_h = 300, 225, 52
    font_path = "arialbd.ttf"

    for sheet_idx in range((len(records) + per_sheet - 1) // per_sheet):
        sheet_records = records[sheet_idx * per_sheet:(sheet_idx + 1) * per_sheet]
        rows = (len(sheet_records) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tile_w, rows * (tile_h + label_h)), "#f3f4f6")
        draw = ImageDraw.Draw(sheet)
        for index, record in enumerate(sheet_records):
            x = (index % cols) * tile_w
            y = (index // cols) * (tile_h + label_h)
            image = Image.open(ROOT / record["thumb"]).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
            sheet.paste(image, (x, y))
            draw.rectangle((x, y + tile_h, x + tile_w, y + tile_h + label_h), fill="#111827")
            label = labels.get(record["id"], record["id"].upper())
            font = fit_text(draw, label, font_path, tile_w - 20, label_h - 10)
            draw.multiline_text((x + 10, y + tile_h + 7), label, fill="white", font=font, spacing=1)
        sheet.save(CONTACT_DIR / f"sheet-{sheet_idx + 1:02}.jpg", "JPEG", quality=88, optimize=True)

    print(json.dumps({"sheets": (len(records) + per_sheet - 1) // per_sheet, "records": len(records)}))


if __name__ == "__main__":
    main()
