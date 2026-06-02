from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "outputs" / "geo-sale-inventory"
QR_PATH = ROOT / "assets" / "signs" / "site-qr.png"
PDF_PATH = OUTPUT_DIR / "GEO_Road_Signs_12_Faces.pdf"
PREVIEW_PATH = OUTPUT_DIR / "GEO_Road_Signs_preview.png"

WIDTH, HEIGHT = letter

SIGNS = [
    ("Scan Before You Stop", "Estate Finds\nToday", "Wed–Fri + Sunday · All Day", "Scan inventory + prices", "GEO · 205-418-8019", "dark", None),
    ("Furniture · Tools · Decor", "Big Local\nEstate Drop", "All Day · OBO Deals", "", "205-418-8019", "yellow", "→"),
    ("Whole-House Pickup Available", "$6,500\nTakes It All", "Or shop individual items", "Best offer welcome", "Text GEO · 205-418-8019", "cream", None),
    ("Beds · Sofas · Chairs · Decor", "Furniture\nClearout", "Decatur · All Day", "", "205-418-8019", "yellow", "←"),
    ("Don’t Guess From The Road", "Scan The\nInventory", "Photos, prices, categories", "geo222222.github.io/gs-de", "GEO · 205-418-8019", "black", None),
    ("Priced To Move", "Garage\nTools +\nLadders", "OBO · Local Pickup", "", "Text GEO · 205-418-8019", "white", None),
    ("Scan Inventory Online", "Estate\nSale", "Follow the arrow", "", "205-418-8019", "yellow", "→"),
    ("Serious Local Buyers", "Deals\nThis Way", "Follow the arrow", "", "205-418-8019", "yellow", "←"),
    ("Bedroom Sets · Electronics · Decor", "Quality\nHome Finds", "Wed–Fri + Sunday", "Scan first · text GEO", "205-418-8019", "white", None),
    ("Bring A Truck", "Pickup\nDeals", "Furniture, decor, sewing, electronics, garage items", "Best offer welcome", "205-418-8019", "cream", None),
    ("Browse Before You Knock", "Scan\nPhotos", "Full item catalog online", "geo222222.github.io/gs-de", "GEO · 205-418-8019", "black", None),
    ("Decatur Local Pickup", "Estate\nDrop", "All Day · Wed–Fri + Sunday", "Text or call before you come", "GEO · 205-418-8019", "dark", None),
]


THEMES = {
    "dark": (colors.HexColor("#05070d"), colors.white, colors.HexColor("#b7ff4a"), colors.HexColor("#54f3ff")),
    "black": (colors.HexColor("#05070d"), colors.white, colors.HexColor("#b7ff4a"), colors.HexColor("#b7ff4a")),
    "yellow": (colors.HexColor("#f6ff00"), colors.HexColor("#05070d"), colors.HexColor("#ff2d55"), colors.HexColor("#05070d")),
    "white": (colors.white, colors.HexColor("#05070d"), colors.HexColor("#ff2d55"), colors.HexColor("#05070d")),
    "cream": (colors.HexColor("#fff8d7"), colors.HexColor("#05070d"), colors.HexColor("#ff2d55"), colors.HexColor("#05070d")),
}


def draw_centered_lines(pdf, text, x, y, size, color, leading=None):
    pdf.setFillColor(color)
    pdf.setFont("Helvetica-Bold", size)
    leading = leading or size * 0.9
    lines = text.split("\n")
    start_y = y + (len(lines) - 1) * leading / 2
    for index, line in enumerate(lines):
        pdf.drawCentredString(x, start_y - index * leading, line.upper())


def draw_sign(pdf, sign):
    kicker, headline, dates, subhead, phone, theme, arrow = sign
    bg, text, accent, border = THEMES[theme]

    pdf.setFillColor(bg)
    pdf.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)
    pdf.setStrokeColor(border)
    pdf.setLineWidth(14)
    pdf.rect(18, 18, WIDTH - 36, HEIGHT - 36, stroke=1, fill=0)
    pdf.setStrokeColor(colors.Color(border.red, border.green, border.blue, alpha=0.35))
    pdf.setLineWidth(2.5)
    pdf.rect(34, 34, WIDTH - 68, HEIGHT - 68, stroke=1, fill=0)

    y = HEIGHT - 88
    draw_centered_lines(pdf, kicker, WIDTH / 2, y, 20, accent, 22)
    y -= 132
    headline_size = 78 if len(headline) < 18 else 68
    if headline.count("\n") >= 2:
        headline_size = 62
    draw_centered_lines(pdf, headline, WIDTH / 2, y, headline_size, text, headline_size * 0.88)

    if arrow:
        pdf.setFillColor(accent)
        pdf.setFont("Helvetica-Bold", 205)
        pdf.drawCentredString(WIDTH / 2, 280, arrow)
        y = 230
    else:
        qr_size = 154 if theme != "black" else 190
        qr_y = 252 if theme != "black" else 270
        pdf.drawImage(str(QR_PATH), (WIDTH - qr_size) / 2, qr_y, qr_size, qr_size, mask="auto")
        y = qr_y - 42

    if dates:
        pdf.setFillColor(colors.HexColor("#b7ff4a") if theme != "yellow" else colors.HexColor("#05070d"))
        pdf.roundRect(72, y, WIDTH - 144, 42, 6, stroke=0, fill=1)
        pdf.setFillColor(colors.HexColor("#05070d") if theme != "yellow" else colors.white)
        pdf.setFont("Helvetica-Bold", 21)
        pdf.drawCentredString(WIDTH / 2, y + 13, dates.upper())
        y -= 48

    if subhead:
        draw_centered_lines(pdf, subhead, WIDTH / 2, y, 18, text, 20)
        y -= 44

    pdf.setFillColor(colors.HexColor("#05070d") if theme not in {"dark", "black"} else colors.HexColor("#b7ff4a"))
    pdf.roundRect(58, 58, WIDTH - 116, 48, 8, stroke=0, fill=1)
    pdf.setFillColor(colors.white if theme not in {"dark", "black"} else colors.HexColor("#05070d"))
    pdf.setFont("Helvetica-Bold", 25)
    pdf.drawCentredString(WIDTH / 2, 73, phone.upper())


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(PDF_PATH), pagesize=letter)
    for sign in SIGNS:
        draw_sign(pdf, sign)
        pdf.showPage()
    pdf.save()


def build_preview():
    qr = Image.open(QR_PATH).convert("RGB").resize((190, 190))
    image = Image.new("RGB", (850, 1100), "#05070d")
    draw = ImageDraw.Draw(image)
    font_big = ImageFont.truetype("arialbd.ttf", 98)
    font_medium = ImageFont.truetype("arialbd.ttf", 34)
    font_small = ImageFont.truetype("arialbd.ttf", 28)
    draw.rectangle((25, 25, 825, 1075), outline="#54f3ff", width=18)
    draw.text((425, 116), "SCAN BEFORE YOU STOP", fill="#b7ff4a", font=font_small, anchor="mm")
    draw.multiline_text((425, 300), "ESTATE FINDS\nTODAY", fill="white", font=font_big, anchor="mm", align="center", spacing=-6)
    draw.rounded_rectangle((105, 520, 745, 585), radius=10, fill="#b7ff4a")
    draw.text((425, 552), "WED–FRI + SUNDAY · ALL DAY", fill="#05070d", font=font_medium, anchor="mm")
    image.paste(qr, (330, 625))
    draw.text((425, 850), "GEO222222.GITHUB.IO/GS-DE", fill="white", font=font_small, anchor="mm")
    draw.rounded_rectangle((95, 955, 755, 1020), radius=12, fill="#b7ff4a")
    draw.text((425, 987), "GEO · 205-418-8019", fill="#05070d", font=font_medium, anchor="mm")
    image.save(PREVIEW_PATH)


if __name__ == "__main__":
    build_pdf()
    build_preview()
    print({"pdf": str(PDF_PATH), "preview": str(PREVIEW_PATH), "faces": len(SIGNS)})
