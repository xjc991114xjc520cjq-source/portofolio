from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "assets"
SRC = ROOT / "src" / "assets"

INK = (242, 247, 245)
MUTED = (141, 155, 152)
ACCENT = (34, 209, 189)
ACCENT_DEEP = (16, 173, 157)
BG = (7, 9, 13)
PANEL = (17, 22, 26)
LINE = (222, 241, 237, 42)


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


def add_grid(draw, w, h, step=80):
    for x in range(0, w, step):
        draw.line((x, 0, x, h), fill=(34, 209, 189, 18), width=1)
    for y in range(0, h, step):
        draw.line((0, y, w, y), fill=(34, 209, 189, 14), width=1)


def glow_layer(w, h, centers):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    for cx, cy, r, alpha in centers:
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(34, 209, 189, alpha))
    return layer.filter(ImageFilter.GaussianBlur(90))


def save_both(img, name):
    for folder in (PUBLIC, SRC):
        folder.mkdir(parents=True, exist_ok=True)
        img.save(folder / name, quality=94)


def base_canvas(title, label):
    w, h = 1600, 1000
    img = Image.new("RGB", (w, h), BG)
    img = Image.alpha_composite(img.convert("RGBA"), glow_layer(w, h, [(1260, 260, 320, 42), (260, 780, 260, 26)]))
    d = ImageDraw.Draw(img, "RGBA")
    add_grid(d, w, h)
    d.rounded_rectangle((70, 70, 1530, 930), radius=34, fill=(17, 22, 26, 212), outline=LINE, width=2)
    d.text((130, 126), label, fill=ACCENT, font=font(34, True))
    d.text((130, 178), title, fill=INK, font=font(70, True))
    d.line((130, 280, 1470, 280), fill=(222, 241, 237, 50), width=2)
    return img, d


def hero_poster():
    w, h = 1920, 1080
    img = Image.new("RGB", (w, h), BG)
    img = Image.alpha_composite(img.convert("RGBA"), glow_layer(w, h, [(1460, 340, 430, 48), (340, 820, 360, 24)]))
    d = ImageDraw.Draw(img, "RGBA")
    add_grid(d, w, h, step=76)
    for i in range(30):
        x = int((i * 151) % w)
        y = int(210 + math.sin(i * 0.68) * 150 + i * 15)
        d.line((x - 260, y, x + 560, y - 210), fill=(34, 209, 189, 30), width=3)
        d.ellipse((x + 540, y - 223, x + 566, y - 197), fill=(34, 209, 189, 92))
    d.rounded_rectangle((1160, 230, 1760, 790), radius=36, fill=(17, 22, 26, 178), outline=(222, 241, 237, 44), width=2)
    d.text((1240, 320), "XJC", fill=INK, font=font(96, True))
    d.text((1240, 440), "VISUAL SYSTEMS", fill=ACCENT, font=font(36, True))
    d.text((1240, 510), "Brand / Commerce / Campaign", fill=MUTED, font=font(30))
    save_both(img.convert("RGB"), "hero-poster.png")


def brand_vi():
    img, d = base_canvas("品牌 VI 升级系统", "Brand Identity")
    palette = [(242, 247, 245), (34, 209, 189), (54, 67, 72), (7, 9, 13)]
    for i, color in enumerate(palette):
        d.rounded_rectangle((132 + i * 150, 340, 252 + i * 150, 460), radius=18, fill=color)
    d.rounded_rectangle((930, 330, 1410, 720), radius=28, fill=(9, 14, 16, 230), outline=(222, 241, 237, 52), width=2)
    d.text((1016, 446), "XJC", fill=INK, font=font(104, True))
    d.text((1016, 570), "Visual System", fill=ACCENT, font=font(34, True))
    for y in [550, 616, 682, 748]:
        d.rounded_rectangle((130, y, 710, y + 38), radius=19, fill=(34, 209, 189, 36))
    save_both(img.convert("RGB"), "project-brand-vi.png")


def commerce():
    img, d = base_canvas("电商小程序视觉美化", "Digital Commerce")
    d.rounded_rectangle((1010, 300, 1320, 830), radius=42, fill=(242, 247, 245, 235), outline=(222, 241, 237, 72), width=2)
    d.rounded_rectangle((1035, 332, 1295, 802), radius=28, fill=(10, 15, 17))
    d.rounded_rectangle((1065, 372, 1265, 488), radius=18, fill=(34, 209, 189, 58))
    for i in range(6):
        x = 1065 + (i % 2) * 104
        y = 530 + (i // 2) * 82
        d.rounded_rectangle((x, y, x + 84, y + 56), radius=14, fill=(22, 30, 34), outline=(222, 241, 237, 35), width=1)
    for x in [150, 310, 470, 630]:
        d.rounded_rectangle((x, 384, x + 110, 700), radius=24, fill=(23, 34, 37), outline=(34, 209, 189, 54), width=2)
    d.text((150, 765), "节日页面 / 促销活动 / 商品管理", fill=MUTED, font=font(34))
    save_both(img.convert("RGB"), "project-commerce.png")


def packaging():
    img, d = base_canvas("产品礼盒包装设计", "Packaging")
    d.polygon([(880, 410), (1180, 300), (1450, 430), (1140, 560)], fill=(39, 57, 61), outline=(222, 241, 237, 55))
    d.polygon([(880, 410), (1140, 560), (1140, 820), (880, 650)], fill=(22, 34, 37), outline=(222, 241, 237, 55))
    d.polygon([(1140, 560), (1450, 430), (1450, 680), (1140, 820)], fill=(13, 20, 23), outline=(222, 241, 237, 55))
    d.text((965, 610), "FRESH", fill=ACCENT, font=font(46, True))
    for i in range(7):
        cx = 230 + i * 72
        cy = 470 + int(math.sin(i) * 32)
        d.ellipse((cx, cy, cx + 58, cy + 58), fill=(34, 209, 189, 92), outline=(34, 209, 189, 150))
    d.text((150, 680), "礼盒结构 / 包装风格 / 货架识别", fill=MUTED, font=font(34))
    save_both(img.convert("RGB"), "project-packaging.png")


def exhibition():
    img, d = base_canvas("展陈与营销物料设计", "Campaign")
    for i, x in enumerate([170, 410, 650]):
        d.rounded_rectangle((x, 360, x + 170, 760), radius=16, fill=(10, 15, 17), outline=(222, 241, 237, 45), width=2)
        d.rectangle((x + 24, 410, x + 146, 610), fill=(34, 209, 189, 42 + i * 18))
        d.line((x + 30, 660, x + 140, 660), fill=(222, 241, 237, 92), width=4)
    d.rounded_rectangle((960, 360, 1420, 760), radius=24, fill=(22, 34, 37), outline=(222, 241, 237, 45), width=2)
    for y in [430, 500, 570, 640]:
        d.line((1010, y, 1370, y), fill=(34, 209, 189, 118), width=8)
    d.text((150, 825), "海报 / 展板 / 线下活动物料", fill=MUTED, font=font(34))
    save_both(img.convert("RGB"), "project-exhibition.png")


if __name__ == "__main__":
    hero_poster()
    brand_vi()
    commerce()
    packaging()
    exhibition()
    print("dark assets generated")
