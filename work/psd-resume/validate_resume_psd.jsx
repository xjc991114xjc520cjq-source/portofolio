#target photoshop

app.displayDialogs = DialogModes.NO;

var PSD = "E:/ChatGPT-LocalCoding/Project/个人站/output/psd/xie-jingchun-editable-resume.psd";
var REPORT = "E:/ChatGPT-LocalCoding/Project/个人站/output/psd/validation-report.txt";
var doc = app.open(new File(PSD));
var stats = { groups: 0, text: 0, pixel: 0, other: 0 };
var usedFonts = [];
var fallbackLayers = [];

function rememberFont(fontName) {
  for (var j = 0; j < usedFonts.length; j++) {
    if (usedFonts[j] === fontName) return;
  }
  usedFonts.push(fontName);
}

function walk(container) {
  for (var i = 0; i < container.layers.length; i++) {
    var layer = container.layers[i];
    if (layer.typename === "LayerSet") {
      stats.groups++;
      walk(layer);
    } else if (layer.kind === LayerKind.TEXT) {
      stats.text++;
      rememberFont(layer.textItem.font);
      if (layer.textItem.font === "AdobeHeitiStd-Regular") fallbackLayers.push(layer.name);
    } else if (layer.kind === LayerKind.NORMAL) {
      stats.pixel++;
    } else {
      stats.other++;
    }
  }
}

walk(doc);
var report = new File(REPORT);
report.encoding = "UTF8";
report.open("w");
report.writeln("OPEN_OK=true");
report.writeln("WIDTH=" + doc.width.as("px"));
report.writeln("HEIGHT=" + doc.height.as("px"));
report.writeln("GROUPS=" + stats.groups);
report.writeln("TEXT_LAYERS=" + stats.text);
report.writeln("PIXEL_LAYERS=" + stats.pixel);
report.writeln("OTHER_LAYERS=" + stats.other);
report.writeln("FONTS=");
for (var fontIndex = 0; fontIndex < usedFonts.length; fontIndex++) {
  report.writeln("- " + usedFonts[fontIndex]);
}
report.writeln("FALLBACK_LAYERS=");
for (var fallbackIndex = 0; fallbackIndex < fallbackLayers.length; fallbackIndex++) {
  report.writeln("- " + fallbackLayers[fallbackIndex]);
}
report.close();
doc.close(SaveOptions.DONOTSAVECHANGES);
