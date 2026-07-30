from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"
RENDERED = ROOT / "work" / "pdfs" / "rendered" / "resume-1.png"

INK = (18, 33, 31)
MUTED = (96, 112, 109)
ACCENT = (0, 141, 126)
DEEP = (0, 103, 93)
BG = (247, 250, 248)
SOFT = (232, 243, 240)


def font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\simhei.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for path in candidates:
        if path and Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def add_grid(draw, w, h, color=(0, 141, 126, 18), step=76):
    for x in range(0, w, step):
        draw.line((x, 0, x, h), fill=color, width=1)
    for y in range(0, h, step):
        draw.line((0, y, w, y), fill=color, width=1)


def save_avatar():
    page = Image.open(RENDERED).convert("RGB")
    # Crop the portrait from the resume rendering and mask it into a clean circle.
    crop = page.crop((565, 235, 760, 430)).resize((520, 520), Image.LANCZOS)
    mask = Image.new("L", (520, 520), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((0, 0, 520, 520), fill=255)
    out = Image.new("RGBA", (520, 520), (255, 255, 255, 0))
    out.paste(crop, (0, 0), mask)
    out.save(ASSETS / "avatar.png")


def hero_poster():
    w, h = 1920, 1080
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img, "RGBA")
    add_grid(d, w, h)
    for i in range(28):
        x = int((i * 137) % w)
        y = int(220 + math.sin(i * 0.7) * 160 + i * 14)
        d.line((x - 260, y, x + 520, y - 180), fill=(0, 141, 126, 22), width=3)
        d.ellipse((x + 500, y - 192, x + 522, y - 170), fill=(0, 141, 126, 90))
    d.rounded_rectangle((1160, 230, 1760, 790), radius=36, fill=(255, 255, 255, 168), outline=(18, 33, 31, 28), width=2)
    d.text((1240, 320), "XJC", fill=INK, font=font(96, True))
    d.text((1240, 440), "VISUAL SYSTEMS", fill=DEEP, font=font(36, True))
    d.text((1240, 510), "Brand / Commerce / Campaign", fill=MUTED, font=font(30))
    img.filter(ImageFilter.GaussianBlur(0.2)).save(ASSETS / "hero-poster.png", quality=92)


def base_canvas(title, label):
    w, h = 1600, 1000
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img, "RGBA")
    add_grid(d, w, h, step=80)
    d.rounded_rectangle((70, 70, 1530, 930), radius=34, fill=(255, 255, 255, 206), outline=(18, 33, 31, 28), width=2)
    d.text((130, 126), label, fill=DEEP, font=font(34, True))
    d.text((130, 178), title, fill=INK, font=font(70, True))
    d.line((130, 280, 1470, 280), fill=(18, 33, 31, 38), width=2)
    return img, d


def brand_vi():
    img, d = base_canvas("品牌 VI 升级系统", "Brand Identity")
    palette = [(18, 33, 31), (0, 141, 126), (226, 240, 236), (255, 255, 255)]
    for i, c in enumerate(palette):
        d.rounded_rectangle((132 + i * 150, 340, 252 + i * 150, 460), radius=18, fill=c)
    d.rounded_rectangle((930, 330, 1410, 720), radius=28, fill=(238, 245, 243), outline=(18, 33, 31, 34), width=2)
    d.text((1016, 446), "XJC", fill=INK, font=font(104, True))
    d.text((1016, 570), "Visual System", fill=DEEP, font=font(34, True))
    for y in [550, 616, 682, 748]:
        d.rounded_rectangle((130, y, 710, y + 38), radius=19, fill=(0, 141, 126, 34))
    img.save(ASSETS / "project-brand-vi.png", quality=94)


def commerce():
    img, d = base_canvas("电商小程序视觉美化", "Digital Commerce")
    phone = (1010, 300, 1320, 830)
    d.rounded_rectangle(phone, radius=42, fill=(18, 33, 31), outline=(18, 33, 31, 80), width=2)
    d.rounded_rectangle((1035, 332, 1295, 802), radius=28, fill=(247, 250, 248))
    d.rounded_rectangle((1065, 372, 1265, 488), radius=18, fill=(0, 141, 126, 52))
    for i in range(6):
        x = 1065 + (i % 2) * 104
        y = 530 + (i // 2) * 82
        d.rounded_rectangle((x, y, x + 84, y + 56), radius=14, fill=(255, 255, 255), outline=(18, 33, 31, 24), width=1)
    for x in [150, 310, 470, 630]:
        d.rounded_rectangle((x, 384, x + 110, 700), radius=24, fill=(233, 244, 241), outline=(0, 141, 126, 32), width=2)
    d.text((150, 765), "节日页面 / 促销活动 / 商品管理", fill=MUTED, font=font(34))
    img.save(ASSETS / "project-commerce.png", quality=94)


def packaging():
    img, d = base_canvas("产品礼盒包装设计", "Packaging")
    d.polygon([(880, 410), (1180, 300), (1450, 430), (1140, 560)], fill=(226, 240, 236), outline=(18, 33, 31, 50))
    d.polygon([(880, 410), (1140, 560), (1140, 820), (880, 650)], fill=(210, 231, 226), outline=(18, 33, 31, 50))
    d.polygon([(1140, 560), (1450, 430), (1450, 680), (1140, 820)], fill=(245, 249, 247), outline=(18, 33, 31, 50))
    d.text((965, 610), "FRESH", fill=DEEP, font=font(46, True))
    for i in range(7):
        cx = 230 + i * 72
        cy = 470 + int(math.sin(i) * 32)
        d.ellipse((cx, cy, cx + 58, cy + 58), fill=(0, 141, 126, 70), outline=(0, 141, 126, 120))
    d.text((150, 680), "礼盒结构 / 包装风格 / 货架识别", fill=MUTED, font=font(34))
    img.save(ASSETS / "project-packaging.png", quality=94)


def exhibition():
    img, d = base_canvas("展陈与营销物料设计", "Campaign")
    for i, x in enumerate([170, 410, 650]):
        d.rounded_rectangle((x, 360, x + 170, 760), radius=16, fill=(255, 255, 255), outline=(18, 33, 31, 38), width=2)
        d.rectangle((x + 24, 410, x + 146, 610), fill=(0, 141, 126, 36 + i * 18))
        d.line((x + 30, 660, x + 140, 660), fill=(18, 33, 31, 80), width=4)
    d.rounded_rectangle((960, 360, 1420, 760), radius=24, fill=(233, 244, 241), outline=(18, 33, 31, 38), width=2)
    for y in [430, 500, 570, 640]:
        d.line((1010, y, 1370, y), fill=(0, 141, 126, 88), width=8)
    d.text((150, 825), "海报 / 展板 / 线下活动物料", fill=MUTED, font=font(34))
    img.save(ASSETS / "project-exhibition.png", quality=94)


if __name__ == "__main__":
    ASSETS.mkdir(parents=True, exist_ok=True)
    save_avatar()
    hero_poster()
    brand_vi()
    commerce()
    packaging()
    exhibition()
    print("assets generated")
