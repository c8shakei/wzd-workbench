// ============================================================
// 浏览器端 CAD 提取引擎（复刻 cad_extract_engine.py 的 resolve_field / apply_transform）
// 规则来自 js/cad_rules.js（CAD_RULES，由 cad_rules.py 单一来源生成）
// 暴露：window.CAD_ENGINE = { runExtraction }
// 返回：{ error?, liftId, cfgCount, rows:[{g,f,cv,src,rv,st,h,note,ans}] }
//   st/h 已映射到 app 的 6 种处理方式（已溯源/默认值/我来填/需澄清/不用管/CAD自动）
// ============================================================
(function (global) {
  "use strict";

  function normName(name) {
    var s = (name || "").trim();
    s = s.replace(/【】/g, "");
    s = s.replace(/（.*?）/g, "");
    s = s.replace(/\(.*?\)/g, "");
    return s.trim();
  }

  // 配置名查找：精确 -> 规范化 -> 双向包含兜底
  function lookupCfg(cfg, cfgNorm, key) {
    if (Object.prototype.hasOwnProperty.call(cfg, key)) return [cfg[key], key];
    var nk = normName(key);
    if (Object.prototype.hasOwnProperty.call(cfgNorm, nk)) return [cfgNorm[nk], nk];
    var ks = Object.keys(cfg);
    for (var i = 0; i < ks.length; i++) {
      var k = ks[i];
      if (key.indexOf(k) >= 0 || k.indexOf(key) >= 0) return [cfg[k], k];
    }
    return [null, null];
  }

  // transform 链
  function applyTransform(value, transforms) {
    if (value == null) return "";
    value = String(value);
    transforms = transforms || [{ kind: "none" }];
    for (var i = 0; i < transforms.length; i++) {
      var t = transforms[i];
      var kind = t.kind;
      if (kind === "const") {
        return t.value != null ? t.value : "";
      } else if (kind === "digits") {
        var m = value.replace(/,/g, "").match(/^\d+/);
        value = m ? m[0] : value;
      } else if (kind === "first_token") {
        value = value.split(/[\s=/=（(]/)[0].trim();
      } else if (kind === "code") {
        var m2 = value.match(/[A-Za-z0-9]+/);
        value = m2 ? m2[0] : value;
      } else if (kind === "before_sep") {
        var seps = t.seps || ["/", " -", "（"];
        var idx = value.length;
        for (var j = 0; j < seps.length; j++) {
          var p = value.indexOf(seps[j]);
          if (p >= 0) idx = Math.min(idx, p);
        }
        value = value.slice(0, idx).trim();
      } else if (kind === "mul1000") {
        try { value = String(Math.round(parseFloat(value) * 1000)); } catch (e) {}
      } else if (kind === "map") {
        var mp = t.map || {};
        if (Object.prototype.hasOwnProperty.call(mp, value)) {
          value = mp[value];
        } else {
          var keys = Object.keys(mp);
          for (var m = 0; m < keys.length; m++) {
            if (value.indexOf(keys[m]) >= 0) { value = mp[keys[m]]; break; }
          }
        }
      }
    }
    return value;
  }

  // 引擎内部状态 -> app 的 {st, h}
  function mapStatus(engineStatus) {
    switch (engineStatus) {
      case "已溯源": return { st: "已溯源", h: "已溯源" };
      case "条件命中": return { st: "已溯源", h: "已溯源" };
      case "默认值": return { st: "报告未提及", h: "默认值" };
      case "推导值": return { st: "已溯源", h: "已溯源" };
      case "用户填写": return { st: "报告未提及", h: "我来填" };
      case "CAD自动": return { st: "报告未提及", h: "CAD自动" };
      case "忽略": return { st: "忽略(无CAD字段)", h: "不用管" };
      case "需澄清": return { st: "需澄清", h: "需澄清" };
      default: return { st: "需澄清", h: "需澄清" };
    }
  }

  function typeLabel(t) {
    return ({
      report_value: "报告值映射",
      fixed_default: "固定默认值",
      conditional: "条件判断",
      frd_conditional: "消防关联",
      derive: "文件名推导",
      cad_auto: "CAD自动生成",
      user_fill: "用户填写",
      ignore: "忽略"
    })[t] || t;
  }

  function resolveField(page, field, rule, cfg, cfgNorm, ctx) {
    var t = rule.type;

    function mk(cv, src, status, note) {
      var ms = mapStatus(status);
      var rv = (src && src.indexOf(" = ") > 0) ? src.split(" = ")[1] : "";
      return {
        g: page, f: field, cv: cv, src: src, rv: rv,
        st: ms.st, h: ms.h, note: note || "", ans: rule.note || typeLabel(t)
      };
    }

    if (t === "ignore") return mk("", "—", "忽略", rule.note || "");
    if (t === "user_fill") return mk("", "—", "用户填写", rule.note || "");
    if (t === "cad_auto") return mk("", "—", "CAD自动", rule.note || "");
    if (t === "fixed_default") return mk(rule.value, "—", "默认值", rule.note || "");

    if (t === "derive") {
      var code = ctx.cscCode;
      if (!code) return mk("", "文件名", "需澄清", "未能从文件名提取 CSC 数字代码");
      return mk(rule.prefix + code, "文件名CSC" + code, "推导值", rule.note || "");
    }

    if (t === "report_value") {
      var lr = lookupCfg(cfg, cfgNorm, rule.lookup);
      var raw = lr[0], matched = lr[1];
      if (raw == null) return mk("", "<" + rule.lookup + ">", "需澄清", "报告未找到配置项『" + rule.lookup + "』，请确认");
      var val = applyTransform(raw, rule.transform);
      return mk(val, matched + " = " + raw, "已溯源", rule.note || "");
    }

    if (t === "conditional") {
      var lr2 = lookupCfg(cfg, cfgNorm, rule.lookup);
      var raw2 = lr2[0], matched2 = lr2[1];
      if (raw2 == null) return mk("", "<" + rule.lookup + ">", "需澄清", "报告未找到配置项『" + rule.lookup + "』，无法判断");
      var conds = rule.conditions || [];
      for (var i = 0; i < conds.length; i++) {
        var c = conds[i];
        if (c.if_equals != null && raw2.trim() === c.if_equals)
          return mk(c.value, matched2 + " = " + raw2, "条件命中", rule.note || "");
        if (c.if_contains) {
          var hit = c.if_contains.some(function (s) { return raw2.indexOf(s) >= 0; });
          if (hit) return mk(c.value, matched2 + " = " + raw2, "条件命中", rule.note || "");
        }
      }
      return mk(raw2, matched2 + " = " + raw2, rule.else_status || "需澄清", rule.else_note || "条件未命中，交用户判断");
    }

    if (t === "frd_conditional") {
      var dep = rule.depends_on;
      var dv = ctx.resolved[dep[0] + "\u0000" + dep[1]];
      if (dv === "FRD") return mk(rule.value_when, "消防开关类型=FRD", "默认值", rule.note || "");
      return mk(rule.else_value || "", "消防开关类型≠FRD", "默认值", "非 FRD，无需填写");
    }

    return mk("", "—", "需澄清", "未知规则类型");
  }

  // 主流程：tables -> rows（与 cad_extract_engine.run 等价，只是把输出转为 app 字段结构）
  function runExtraction(tables, lift, cscCode) {
    if (!global.CAD_RULES) return { error: "CAD_RULES 未加载" };
    var sel = global.CAD_DOCX.selectLiftTable(tables, lift);
    var liftId = sel[0], table = sel[1];
    if (!table || !table.length) return { error: "未从报告中解析到配置表" };
    var cd = global.CAD_DOCX.buildConfigDict(table);
    var cfg = cd[0], cfgNorm = cd[1];
    var ctx = { cscCode: cscCode, resolved: {} };
    var rows = [];
    for (var i = 0; i < global.CAD_RULES.length; i++) {
      var pg = global.CAD_RULES[i][0], fd = global.CAD_RULES[i][1], rule = global.CAD_RULES[i][2];
      var r = resolveField(pg, fd, rule, cfg, cfgNorm, ctx);
      ctx.resolved[pg + "\u0000" + fd] = r.cv;
      rows.push(r);
    }
    return { liftId: liftId, cfgCount: Object.keys(cfg).length, rows: rows };
  }

  // 主流程变体：直接吃预构建的配置字典（PDF 适配器产出的 config dict）
  // rawCfg: { "参数名": "值", ... }（键名与引擎 lookup 键一致，含括号原名亦可，靠 normName 兜底）
  function runFromConfig(rawCfg, cscCode, liftId) {
    if (!global.CAD_RULES) return { error: "CAD_RULES 未加载" };
    if (!rawCfg || !Object.keys(rawCfg).length) return { error: "配置字典为空" };
    var cfg = {}, cfgNorm = {};
    Object.keys(rawCfg).forEach(function (k) {
      var v = rawCfg[k];
      if (v == null) return;
      cfg[k] = v;
      cfgNorm[normName(k)] = v;
    });
    var ctx = { cscCode: cscCode, resolved: {} };
    var rows = [];
    for (var i = 0; i < global.CAD_RULES.length; i++) {
      var pg = global.CAD_RULES[i][0], fd = global.CAD_RULES[i][1], rule = global.CAD_RULES[i][2];
      var r = resolveField(pg, fd, rule, cfg, cfgNorm, ctx);
      ctx.resolved[pg + "\u0000" + fd] = r.cv;
      rows.push(r);
    }
    return { liftId: liftId || "", cfgCount: Object.keys(cfg).length, rows: rows };
  }

  global.CAD_ENGINE = {
    runExtraction: runExtraction,
    runFromConfig: runFromConfig,
    applyTransform: applyTransform,
    resolveField: resolveField
  };
})(window);
