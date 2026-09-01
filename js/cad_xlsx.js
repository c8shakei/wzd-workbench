// ============================================================
// CAD 字段对照表 → 带状态配色的 .xlsx（手写 OOXML，依赖 JSZip）
// 之所以不依赖 SheetJS：npm 版 xlsx 社区构建写入时不带单元格填充颜色，
// 无法保证离线导出配色。这里用 JSZip 直接拼标准 SpreadsheetML，颜色完全可控。
// 暴露：window.CAD_XLSX = { buildZip, buildBlob, download }
// ============================================================
(function (global) {
  "use strict";

  function esc(s) {
    return (s == null ? "" : String(s))
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // 0-based 列号 -> A,B,...,Z,AA
  function colLetter(n) {
    var s = ""; n++;
    while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
    return s;
  }

  // 状态 -> cellXfs 索引（见 styleXml 中的定义）
  var XF = {
    "header": 1,
    "已溯源": 2, "条件命中": 2,
    "默认值": 3, "推导值": 3,
    "用户填写": 4,
    "CAD自动": 5,
    "不用管": 6,
    "需澄清": 7
  };

  function styleXml() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="2">' +
      '<font><sz val="11"/><name val="Calibri"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>' +
      '</fonts>' +
      '<fills count="9">' +
      '<fill><patternFill patternType="none"/></fill>' +
      '<fill><patternFill patternType="gray125"/></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FF305496"/></patternFill></fill>' +   // 2 header
      '<fill><patternFill patternType="solid"><fgColor rgb="FFC6EFCE"/></patternFill></fill>' +   // 3 已溯源
      '<fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/></patternFill></fill>' +   // 4 默认值
      '<fill><patternFill patternType="solid"><fgColor rgb="FFFFE699"/></patternFill></fill>' +   // 5 用户填写
      '<fill><patternFill patternType="solid"><fgColor rgb="FFBDD7EE"/></patternFill></fill>' +   // 6 CAD自动
      '<fill><patternFill patternType="solid"><fgColor rgb="FFF2F2F2"/></patternFill></fill>' +   // 7 不用管
      '<fill><patternFill patternType="solid"><fgColor rgb="FFFFC7CE"/></patternFill></fill>' +   // 8 需澄清
      '</fills>' +
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="8">' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="7" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '</cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
      '</styleSheet>';
  }

  function sheetXml(rows) {
    var cols = '<cols>' +
      '<col min="1" max="1" width="6"/>' +
      '<col min="2" max="2" width="12"/>' +
      '<col min="3" max="3" width="22"/>' +
      '<col min="4" max="4" width="14"/>' +
      '<col min="5" max="5" width="32"/>' +
      '<col min="6" max="6" width="32"/>' +
      '<col min="7" max="7" width="12"/>' +
      '<col min="8" max="8" width="42"/>' +
      '</cols>';
    var body = '<sheetData>';
    for (var r = 0; r < rows.length; r++) {
      var rowNum = r + 1;
      var status = (r === 0) ? "header" : (rows[r][6] || "");
      var sIdx = (XF[status] != null) ? XF[status] : 0;
      body += '<row r="' + rowNum + '">';
      for (var c = 0; c < rows[r].length; c++) {
        var ref = colLetter(c) + rowNum;
        body += '<c r="' + ref + '" s="' + sIdx + '" t="inlineStr"><is><t xml:space="preserve">' + esc(rows[r][c]) + '</t></is></c>';
      }
      body += '</row>';
    }
    body += '</sheetData>';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
      cols + body + '</worksheet>';
  }

  function buildZip(rows, sheetName) {
    var zip = new JSZip();
    var sn = (sheetName || "CAD字段对照表").replace(/[\\*?:/\[\]]/g, "").slice(0, 31);
    zip.file("[Content_Types].xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      '</Types>');
    zip.file("_rels/.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      '</Relationships>');
    zip.file("xl/workbook.xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<sheets><sheet name="' + esc(sn) + '" sheetId="1" r:id="rId1"/></sheets></workbook>');
    zip.file("xl/_rels/workbook.xml.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '</Relationships>');
    zip.file("xl/styles.xml", styleXml());
    zip.file("xl/worksheets/sheet1.xml", sheetXml(rows));
    return zip;
  }

  function buildBlob(rows, sheetName) {
    return buildZip(rows, sheetName).generateAsync({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
  }

  function download(rows, filename) {
    buildBlob(rows, filename.replace(/\.xlsx$/i, "")).then(function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });
  }

  global.CAD_XLSX = { buildZip: buildZip, buildBlob: buildBlob, download: download, sheetXml: sheetXml, styleXml: styleXml };
})(window);
