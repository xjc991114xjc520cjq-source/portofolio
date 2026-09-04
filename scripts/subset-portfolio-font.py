"""Rebuild the portfolio font subset after changing Chinese copy or asset captions."""
from pathlib import Path
import argparse
from fontTools import subset

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, default=Path('/mnt/c/Windows/Fonts/NotoSansSC-VF.ttf'))
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
characters = {chr(codepoint) for codepoint in range(32,127)}
for pattern in ('src/**/*.ts','src/**/*.tsx','src/**/*.css','src/**/*.json','*.html'):
    for path in root.glob(pattern):
        characters.update(path.read_text(encoding='utf-8'))
options = subset.Options()
options.layout_features = ['*']
options.name_IDs = ['*']
options.name_languages = ['*']
options.name_legacy = True
options.recommended_glyphs = True
options.notdef_glyph = True
options.notdef_outline = True
options.glyph_names = True
font = subset.load_font(str(args.source), options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=''.join(characters))
subsetter.subset(font)
target = root/'public/assets/fonts/noto-sans-sc-portfolio.ttf'
subset.save_font(font, str(target), options)
print(f'{len(characters)} characters; {target.stat().st_size} bytes')
