#target photoshop

var REPORT = "E:/ChatGPT-LocalCoding/Project/个人站/output/psd/photoshop-fonts.txt";
var report = new File(REPORT);
report.encoding = "UTF8";
report.open("w");
for (var i = 0; i < app.fonts.length; i++) {
  var font = app.fonts[i];
  var probe = (font.family + " " + font.name + " " + font.postScriptName).toLowerCase();
  if (probe.indexOf("montserrat") >= 0 || probe.indexOf("great vibes") >= 0 || probe.indexOf("greatvibes") >= 0) {
    report.writeln(font.family + " | " + font.name + " | " + font.postScriptName);
  }
}
report.close();
