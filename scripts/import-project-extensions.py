"""Import reviewed extension artwork as native-ratio WebP; leave originals untouched.

Usage: python3 scripts/import-project-extensions.py /mnt/f/谢敬淳/工作项目
The JSON printed to stdout is the frontend manifest; sources stay in scripts/.
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(sys.argv[1])
selections = json.loads(Path('scripts/extension-assets.sources.json').read_text())
manifest = {}
for record in selections:
    target = Path('public') / record['target'].lstrip('/')
    if not record['existing']:
        source = root / record['source']
        with Image.open(source) as original:
            im = ImageOps.exif_transpose(original).convert('RGB')
            im.thumbnail((2400,2400), Image.Resampling.LANCZOS)
            target.parent.mkdir(parents=True,exist_ok=True)
            im.save(target,'WEBP',quality=91,method=6)
    with Image.open(target) as im:
        width,height=im.size
    manifest.setdefault(record['project'],[]).append({
        'src':record['target'], 'alt':record['alt'], 'caption':record['caption'],
        'group':record['group'], 'width':width, 'height':height,
    })
print(json.dumps(manifest,ensure_ascii=False,indent=2))
