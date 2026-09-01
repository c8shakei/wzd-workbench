// ============================================================
// 浏览器端 .docx 解析（复刻 cad_extract_engine.py）
// 依赖：JSZip（全局 JSZip，js/lib/jszip.min.js）
// 暴露：window.CAD_DOCX = { extractAllTables, selectLiftTable, buildConfigDict, getCscCode, normName }
// 注：extractAllTables 返回 Promise（JSZip 异步加载）
// ============================================================
(function (global) {
  "use strict";

  var W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

  // 从一段 document.xml 字符串解析出所有表格：list[ list[ list[str] ] ]
  function extractTablesFromXml(xmlStr) {
    var doc;
    if (typeof DOMParser !== "undefined") {
      doc = new DOMParser().parseFromString(xmlStr, "application/xml");
    } else {
      return [];
    }
    if (!doc || doc.getElementsByTagNameNS("parsererror", "*").length) {
      // 解析失败，退回空
      return [];
    }
    var tbls = doc.getElementsByTagNameNS(W, "tbl");
    var out = [];
    for (var i = 0; i < tbls.length; i++) {
      var rows = tbls[i].getElementsByTagNameNS(W, "tr");
      var trows = [];
      for (var r = 0; r < rows.length; r++) {
        var cells = rows[r].getElementsByTagNameNS(W, "tc");
        var rcells = [];
        for (var c = 0; c < cells.length; c++) {
          var txt = "";
          var ts = cells[c].getElementsByTagNameNS(W, "t");
          for (var t = 0; t < ts.length; t++) {
            txt += (ts[t].textContent || "");
          }
          rcells.push(txt.trim());
        }
        trows.push(rcells);
      }
      if (trows.length) out.push(trows);
    }
    return out;
  }

  // 从 .docx（ArrayBuffer）递归提取所有表格（含 afchunk 嵌套子文档）
  function extractAllTables(arrayBuffer) {
    if (typeof JSZip === "undefined") {
      return Promise.reject(new Error("JSZip 未加载"));
    }
    return JSZip.loadAsync(arrayBuffer).then(function (zip) {
      var promises = [];
      var names = Object.keys(zip.files);
      names.forEach(function (n) {
        var f = zip.files[n];
        if (f.dir) return;
        var lower = n.toLowerCase();
        if (lower.indexOf("document.xml") >= 0 && lower.endsWith(".xml")) {
          promises.push(f.async("string").then(function (s) {
            return extractTablesFromXml(s);
          }));
        } else if (lower.endsWith(".docx") || lower.indexOf("afchunk") >= 0) {
          promises.push(f.async("arraybuffer").then(function (ab) {
            return extractAllTables(ab);
          }));
        }
      });
      return Promise.all(promises).then(function (arrs) {
        var all = [];
        arrs.forEach(function (a) { if (a && a.length) all = all.concat(a); });
        return all;
      });
    });
  }

  // 按「梯号」选择对应表格；无匹配时退化取第一张含【配置名称】的表，或第一张表
  function selectLiftTable(tables, lift) {
    var cand = [];
    tables.forEach(function (t) {
      var liftId = null;
      for (var i = 0; i < t.length; i++) {
        if (t[i].length >= 2 && t[i][0].indexOf("梯号") >= 0) {
          liftId = t[i][1];
          break;
        }
      }
      if (liftId != null) cand.push([liftId, t]);
    });
    if (!cand.length) {
      for (var i = 0; i < tables.length; i++) {
        for (var j = 0; j < tables[i].length; j++) {
          if (tables[i][j].length >= 2 &&
            (tables[i][j][0] === "【配置名称】" || tables[i][j][0] === "配置名称")) {
            return [null, tables[i]];
          }
        }
      }
      return [null, (tables[0] || [])];
    }
    if (lift) {
      for (var k = 0; k < cand.length; k++) {
        if (cand[k][0] === lift) return cand[k];
      }
    }
    return cand[0];
  }

  function normName(name) {
    var s = (name || "").trim();
    s = s.replace(/【】/g, "");
    s = s.replace(/（.*?）/g, "");
    s = s.replace(/\(.*?\)/g, "");
    return s.trim();
  }

  // 从选定表格构建 配置名->值，返回 [cfg, cfgNorm]
  function buildConfigDict(table) {
    var d = {}, dn = {};
    (table || []).forEach(function (row) {
      if (row.length < 2) return;
      var name = row[0], value = row[1];
      if (!name) return;
      if (name.indexOf("----") === 0) return;
      if (name === "【配置名称】" || name === "配置名称") return;
      d[name] = value;
      dn[normName(name)] = value;
    });
    return [d, dn];
  }

  // 从文件名提取 CSC 后数字代码：CSC05253236-... -> 05253236
  function getCscCode(filename) {
    var m = (filename || "").match(/CSC(\d+)/i);
    return m ? m[1] : null;
  }

  global.CAD_DOCX = {
    extractAllTables: extractAllTables,
    selectLiftTable: selectLiftTable,
    buildConfigDict: buildConfigDict,
    getCscCode: getCscCode,
    normName: normName
  };
})(window);
