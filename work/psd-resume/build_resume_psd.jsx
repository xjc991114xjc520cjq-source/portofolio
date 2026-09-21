#target photoshop

app.displayDialogs = DialogModes.NO;

var OUTPUT_DIR = "E:/ChatGPT-LocalCoding/Project/个人站/output/psd";
var CUTOUT = "E:/ChatGPT-LocalCoding/Project/个人站/public/assets/profile-person-green-cutout.png";
var QR = "E:/ChatGPT-LocalCoding/Project/个人站/work/psd-resume/email-qr.png";
var PSD = OUTPUT_DIR + "/xie-jingchun-editable-resume.psd";
var PREVIEW = OUTPUT_DIR + "/xie-jingchun-editable-resume-preview.jpg";

var W = 736, H = 1024;
var RED = "ef111b", WHITE = "f4f2ee", BODY = "d8d5d1", MUTED = "aaa7a3";
var DARK = "080807", PANEL = "11100f", LINE = "581115";
var FONT_REG = "Montserrat-Regular";
var FONT_MED = "Montserrat-Medium";
var FONT_SEMI = "Montserrat-SemiBold";
var FONT_BOLD = "Montserrat-Bold";
var FONT_SCRIPT = "GreatVibes-Regular";

function rgb(hex) {
  var c = new SolidColor();
  c.rgb.red = parseInt(hex.substr(0, 2), 16);
  c.rgb.green = parseInt(hex.substr(2, 2), 16);
  c.rgb.blue = parseInt(hex.substr(4, 2), 16);
  return c;
}

function group(doc, name) {
  var g = doc.layerSets.add();
  g.name = name;
  return g;
}

function rect(doc, parent, name, x, y, w, h, color, opacity) {
  var l = parent.artLayers.add();
  l.name = name;
  doc.activeLayer = l;
  doc.selection.select([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
  doc.selection.fill(rgb(color));
  doc.selection.deselect();
  l.opacity = opacity === undefined ? 100 : opacity;
  return l;
}

function line(doc, parent, name, x, y, w, color, opacity) {
  return rect(doc, parent, name, x, y, w, 1, color, opacity === undefined ? 70 : opacity);
}

function text(parent, name, value, x, y, size, color, font, width, leading, align) {
  var l = parent.artLayers.add();
  l.kind = LayerKind.TEXT;
  l.name = name;
  var t = l.textItem;
  t.contents = value;
  t.position = [x, y];
  t.size = size;
  t.color = rgb(color);
  t.font = font || FONT_REG;
  t.antiAliasMethod = AntiAlias.STRONG;
  if (leading) { t.useAutoLeading = false; t.leading = leading; }
  if (width) {
    t.kind = TextType.PARAGRAPHTEXT;
    t.position = [x, y - size];
    t.width = width;
    t.height = 150;
  }
  if (align === "center") t.justification = Justification.CENTER;
  if (align === "right") t.justification = Justification.RIGHT;
  return l;
}

function label(doc, parent, name, value, x, y, w) {
  rect(doc, parent, name + " - red bar", x, y, w, 27, RED, 100);
  text(parent, name + " - title", value, x + 12, y + 19, 10, WHITE, FONT_BOLD);
}

function bullet(parent, name, value, x, y, width) {
  text(parent, name + " - bullet", "*", x, y, 12, RED, FONT_BOLD);
  text(parent, name, value, x + 17, y, 8.3, BODY, FONT_REG, width - 17, 11);
}

function pill(doc, parent, name, value, x, y, w, inverse) {
  rect(doc, parent, name + " - fill", x, y, w, 27, inverse ? WHITE : DARK, 100);
  var border = rect(doc, parent, name + " - red border", x, y, w, 2, RED, 100);
  rect(doc, parent, name + " - border bottom", x, y + 25, w, 2, RED, 100);
  rect(doc, parent, name + " - border left", x, y, 2, 27, RED, 100);
  rect(doc, parent, name + " - border right", x + w - 2, y, 2, 27, RED, 100);
  text(parent, name + " - text", value, x, y + 18, 8.3, inverse ? DARK : WHITE, FONT_BOLD, w, 10, "center");
}

function placePixel(doc, parent, path, name, targetX, targetY, targetW) {
  var src = app.open(new File(path));
  src.resizeImage(UnitValue(targetW, "px"), undefined, 72, ResampleMethod.BICUBICSHARPER);
  src.selection.selectAll();
  src.selection.copy(false);
  src.close(SaveOptions.DONOTSAVECHANGES);
  app.activeDocument = doc;
  var l = doc.paste();
  l.move(parent, ElementPlacement.INSIDE);
  l.name = name;
  var b = l.bounds;
  l.translate(targetX - b[0].as("px"), targetY - b[1].as("px"));
  return l;
}

function software(doc, parent, abbr, name, x, y) {
  rect(doc, parent, "Software " + name + " - tile", x, y, 42, 42, "251013", 100);
  text(parent, "Software " + name + " - icon", abbr, x, y + 29, 20, RED, FONT_SEMI, 42, 22, "center");
  text(parent, "Software " + name + " - level", "•••••", x, y + 54, 8, WHITE, FONT_BOLD, 42, 9, "center");
}

var outFolder = new Folder(OUTPUT_DIR);
if (!outFolder.exists) outFolder.create();

var doc = app.documents.add(W, H, 72, "谢敬淳 - Editable Resume", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

var bg = group(doc, "01 BACKGROUND - editable texture");
rect(doc, bg, "Deep black base", 0, 0, W, H, DARK, 100);
var grain = rect(doc, bg, "Film grain", 0, 0, W, H, "29221f", 100);
grain.applyAddNoise(18, NoiseDistribution.GAUSSIAN, true);
grain.blendMode = BlendMode.SOFTLIGHT;
grain.opacity = 42;
var vignette = rect(doc, bg, "Warm red wash", 0, 0, W, H, "250507", 100);
vignette.blendMode = BlendMode.SOFTLIGHT;
vignette.opacity = 18;

var decor = group(doc, "02 DECORATION - editable lines and marks");
for (var i = 0; i < 17; i++) {
  line(doc, decor, "Texture scratch " + (i+1), 8 + (i*47)%720, 35 + (i*73)%940, 18 + (i%4)*17, i%3===0 ? RED : "463c37", i%3===0 ? 16 : 10);
}
line(doc, decor, "Column divider", 360, 41, 1, "3a2523", 45);

var portrait = group(doc, "03 PORTRAIT - transparent green-screen cutout");
rect(doc, portrait, "Portrait frame shade", 55, 45, 258, 302, PANEL, 60);
placePixel(doc, portrait, CUTOUT, "Portrait cutout - replaceable pixels", 19, 49, 330);
line(doc, portrait, "Frame top", 55, 45, 258, "b8aaa2", 43);
line(doc, portrait, "Frame bottom", 55, 347, 258, "b8aaa2", 43);
rect(doc, portrait, "Frame left", 55, 45, 1, 303, "b8aaa2", 43);
rect(doc, portrait, "Frame right", 312, 45, 1, 303, "b8aaa2", 43);
var corners = [[52,42],[309,42],[52,344],[309,344]];
for (var cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
  var corner = corners[cornerIndex];
  rect(doc, portrait, "Red corner " + (cornerIndex + 1), corner[0], corner[1], 8, 8, RED, 100);
}

var left = group(doc, "04 LEFT COLUMN - editable text");
text(left, "Greeting", "Hello,", 50, 389, 21, WHITE, FONT_REG);
text(left, "Name prefix", "I’m", 50, 438, 31, WHITE, FONT_BOLD);
text(left, "Script name Xie", "Xie", 116, 443, 44, RED, FONT_SCRIPT);
text(left, "Name remainder", "Jingchun", 184, 438, 27, WHITE, FONT_BOLD);
text(left, "Role", "AI Commerce Visual Designer", 161, 469, 10.5, WHITE, FONT_REG);

label(doc, left, "About", "ABOUT ME", 50, 482, 93);
text(left, "About paragraph 1", "Art and design graduate with 4 years of visual and ecommerce design experience.", 50, 526, 9.2, BODY, FONT_REG, 285, 12);
text(left, "About paragraph 2", "I translate brands, products and selling points into controlled, repeatable visual systems for commerce, campaigns and content.", 50, 568, 9.2, BODY, FONT_REG, 285, 12);

label(doc, left, "Education", "EDUCATION", 50, 706, 105);
text(left, "Education school", "FUJIAN BUSINESS UNIVERSITY", 50, 759, 12, WHITE, FONT_BOLD);
text(left, "Education degree", "B.A. in Art & Design", 50, 782, 8.7, BODY, FONT_REG);
text(left, "Education dates", "2018 – 2022", 50, 801, 8.7, BODY, FONT_REG);

label(doc, left, "Contact", "CONTACT", 50, 870, 79);
text(left, "Contact email icon", "@", 50, 918, 13, RED, FONT_BOLD);
text(left, "Contact email", "1498224542@qq.com", 72, 917, 8, BODY, FONT_REG);
text(left, "Contact location icon", "*", 51, 944, 12, RED, FONT_BOLD);
text(left, "Contact location", "Fuzhou · Remote collaboration", 72, 943, 8, BODY, FONT_REG);
placePixel(doc, left, QR, "Email QR code", 261, 906, 70);
text(left, "QR label", "EMAIL", 261, 991, 8, WHITE, FONT_BOLD, 70, 9, "center");

var exp = group(doc, "05 WORK EXPERIENCE - editable text");
label(doc, exp, "Work experience", "WORK EXPERIENCE", 385, 102, 176);
text(exp, "Job 1 title", "Graphic Designer  (2023 – Now)", 385, 160, 12, WHITE, FONT_BOLD);
text(exp, "Job 1 company", "Fuzhou Qingmenglu Cultural Creative Co., Ltd.", 385, 184, 8.5, BODY, FONT_MED, 300, 11);
text(exp, "Job 1 body", "Brand and marketing materials, brochures, posters, packaging and exhibition visuals. Cross-team delivery for social, web and digital campaigns.", 385, 211, 8.3, BODY, FONT_REG, 300, 10.5);
text(exp, "Job 2 title", "Senior Graphic Designer  (2022 – 2023)", 385, 268, 12, WHITE, FONT_BOLD);
text(exp, "Job 2 company", "Nanping Guoyizhan Brand Management Co., Ltd.", 385, 292, 8.5, BODY, FONT_MED, 300, 11);
text(exp, "Job 2 body", "Brand VI, ecommerce design, campaigns, mini-program operations and retail materials, from system design to production rollout.", 385, 319, 8.3, BODY, FONT_REG, 300, 10.5);
text(exp, "Job 3 title", "Graphic Designer  (2021 – 2022)", 385, 367, 12, WHITE, FONT_BOLD);
text(exp, "Job 3 company", "Xiamen Debo Information Technology Co., Ltd.", 385, 391, 8.5, BODY, FONT_MED, 300, 11);
text(exp, "Job 3 body", "Online campaigns, new-product visual proposals and retail environment graphics across digital and offline touchpoints.", 385, 418, 8.3, BODY, FONT_REG, 300, 10.5);

var skills = group(doc, "06 SKILLS - editable text and shapes");
line(doc, skills, "Skills divider 1", 385, 462, 300, LINE, 90);
label(doc, skills, "Soft skills", "SOFT SKILLS", 385, 481, 103);
bullet(skills, "Soft skill 1", "Aesthetic judgment & execution", 385, 531, 300);
bullet(skills, "Soft skill 2", "Fast learning & adaptability", 385, 552, 300);
bullet(skills, "Soft skill 3", "Product-detail awareness", 385, 573, 300);
bullet(skills, "Soft skill 4", "Cross-team communication", 385, 594, 300);
line(doc, skills, "Skills divider 2", 385, 619, 300, LINE, 90);
label(doc, skills, "Technical skills", "TECHNICAL SKILLS", 385, 640, 137);
pill(doc, skills, "Technical skill 1", "BRAND VISUAL", 385, 684, 109, false);
pill(doc, skills, "Technical skill 2", "PRODUCT VISUAL", 509, 684, 176, true);
pill(doc, skills, "Technical skill 3", "AI VISUAL CONTROL", 385, 724, 169, true);
pill(doc, skills, "Technical skill 4", "MULTI-TOUCHPOINT", 570, 724, 115, false);
line(doc, skills, "Skills divider 3", 385, 768, 300, LINE, 90);

var softwareGroup = group(doc, "07 SOFTWARE - editable tiles");
label(doc, softwareGroup, "Software", "SOFTWARES", 385, 788, 102);
software(doc, softwareGroup, "Ps", "Photoshop", 386, 835);
software(doc, softwareGroup, "Ai", "Illustrator", 454, 835);
software(doc, softwareGroup, "Ae", "After Effects", 522, 835);
software(doc, softwareGroup, "3D", "3ds Max", 590, 835);
line(doc, softwareGroup, "Software divider", 385, 907, 300, LINE, 90);

var focus = group(doc, "08 PROJECT FOCUS - editable text");
label(doc, focus, "Project focus", "PROJECT FOCUS", 385, 928, 126);
bullet(focus, "Focus 1", "Brand systems", 385, 980, 130);
bullet(focus, "Focus 2", "Ecommerce content", 385, 1001, 145);
bullet(focus, "Focus 3", "Campaign visuals", 535, 980, 145);
bullet(focus, "Focus 4", "Generative production", 535, 1001, 150);

// Save the layered master and a flattened visual proof.
var psdOpts = new PhotoshopSaveOptions();
psdOpts.layers = true;
psdOpts.embedColorProfile = true;
psdOpts.maximizeCompatibility = true;
doc.saveAs(new File(PSD), psdOpts, true, Extension.LOWERCASE);

var jpgOpts = new JPEGSaveOptions();
jpgOpts.quality = 11;
jpgOpts.embedColorProfile = true;
doc.saveAs(new File(PREVIEW), jpgOpts, true, Extension.LOWERCASE);

var report = new File(OUTPUT_DIR + "/build-report.txt");
report.encoding = "UTF8";
report.open("w");
report.writeln("PSD=" + PSD);
report.writeln("PREVIEW=" + PREVIEW);
report.writeln("SIZE=" + W + "x" + H);
report.writeln("GROUPS=" + doc.layerSets.length);
report.writeln("TOP_LEVEL_LAYERS=" + doc.layers.length);
report.close();

doc.close(SaveOptions.DONOTSAVECHANGES);
