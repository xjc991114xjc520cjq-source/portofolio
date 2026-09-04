"""Export reviewed skirt artwork at native ratios; never edit source artwork."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps

# Frozen review order. Keys identify exactly one original, never directory order.
KEYS = '''17eaad4c 17f230d9 1990297d 2ab92b8b 2c59d394 2d64e7c6 3074cfab 568a7ce8 6b79de2a 79480419 794f18b1 837f3319 84285071 8740de30 887e4fa9 888793ec 8ae89c88 8e3bf04d 90ff019e 94ea3976 9849896d 98a576db a5bf9273 ba653d61 badb6946 be5c6490 c024447f cf83c198 d178e11f d232d812 e1f9b631 e89fe914 f595b623 f7228c72 fd55b380 185104_68e01b80 185312_21bbb42c 191647_9b80658d 191804_36cd349f 191913_2e1fd5f9 192034_e85e6bf6 192317_c7aaa7a4 090251_e25de4e8 091411_b67fce84 091517_28f7c8d9 092817_87fd8f0c 092927_179166a3 093355_312e2101 093529_7638cbcb 094739_e5ed69bf 101458_35677792 104653_f8c06d99'''.split()
LABELS = '''步步有型|层次从腰间开始|蓝色斜肩上衣与台阶蹲姿|今晚随自己的节拍|白衬衫通勤|银色垂领上衣与沙发侧躺|紫色抹胸与黄色扶手椅坐姿|一眼有层次弧面主视觉|有轮廓也有余地横幅|酒红抹胸与腰线表达|从日常到重要场合|职场也有风格|穿出更多可能|一裙多场景|尖头鞋与踝靴搭配|镜面试衣与正背轮廓|皮面柔软细节|台阶蹲姿与层次裙摆|一眼有层次动态主视觉|一眼有层次静态主视觉|柔软皮纹与叠层包边|绿色垂领上衣与休息区坐姿|不止一面从容切换|腰线自有主张|橙色短外套雨天穿搭|背影也有层次|蓝色短西装与姜黄内搭|雨天换季穿搭|米色垂领衬衫与酒店场景|精致不费力|有轮廓也有余地简洁横幅|交叠腰线与弧形覆片|蓝色斜肩上衣正背搭配|金色上衣与舞池转身|每一步都有层次|黑色鱼尾皮裙正面版型|黑色鱼尾皮裙背面版型|交叠腰头与覆片近景|行走时的裙摆|台阶坐姿与踝靴|办公室通勤穿搭|酒红上衣晚间穿搭|建筑长廊行走横幅|城市广场穿搭|建筑台阶休息|露台傍晚穿搭|美术馆参观|晚宴入场|晚宴背面穿搭|双人舞会|夜店群舞|高级餐厅约会'''.split('|')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    files = [p for p in args.source.iterdir() if p.suffix.lower() in ('.jpg', '.png')]
    matches = [[p for p in files if key in p.name] for key in KEYS]
    if len(KEYS) != len(LABELS) or any(len(m) != 1 for m in matches):
        parser.error('Each reviewed image must resolve exactly once.')
    output = Path('public/assets/projects/fishtail-skirt')
    output.mkdir(parents=True, exist_ok=True)
    manifest = []
    for i, (match, label) in enumerate(zip(matches, LABELS), 1):
        with Image.open(match[0]) as original:
            picture = ImageOps.exif_transpose(original).convert('RGB')
            picture.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            target = output / f'skirt-{i:02}.webp'
            picture.save(target, 'WEBP', quality=92, method=6)
            manifest.append(dict(id=i, src=f'/assets/projects/fishtail-skirt/{target.name}', alt=label,
                                 width=picture.width, height=picture.height, source=match[0].name,
                                 collection='commerce' if i <= 35 else 'editorial'))
    Path('src/fishtail-assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    print(f'Exported {len(manifest)} images; {sum(p.stat().st_size for p in output.glob("*.webp")):,} bytes')

if __name__ == '__main__':
    main()
