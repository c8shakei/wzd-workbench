
(function(){
  "use strict";
  var KEY_T="wb_intern_desk_tasks", KEY_P="wb_intern_desk_policies", KEY_PR="wb_intern_desk_projects", KEY_SEED="wb_intern_desk_seeded", KEY_CAD="wb_intern_desk_cad", KEY_SEED_CAD="wb_intern_desk_seeded_cad", KEY_WB="wb_intern_desk_wordbank", KEY_CI="wb_intern_desk_checkin", KEY_GRAMMAR="wb_intern_desk_grammar", KEY_DICT="wb_intern_desk_dictcache";
  var $ = function(s){return document.querySelector(s);};
  var $$ = function(s){return Array.prototype.slice.call(document.querySelectorAll(s));};

  function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
  function todayStr(){ var d=new Date(); return fmt(d); }
  function fmt(d){ return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
  function pad(n){ return n<10?"0"+n:""+n; }
  function addDays(n){ var d=new Date(); d.setDate(d.getDate()+n); return d; }

  // ---- Seed preset data (dates relative to first open) ----
  function seed(){
    if(localStorage.getItem(KEY_SEED)) return;
    var t=[
      {id:uid(),seeded:true,title:"提交玉岱美庐补贴对账表",project:"玉岱美庐 5",priority:"P0",due:fmt(addDays(-2)),status:"todo",note:"补贴20万档口径确认",createdAt:Date.now(),updatedAt:Date.now()},
      {id:uid(),seeded:true,title:"研读武汉 2026 加装电梯补贴细则",project:"政策研究",priority:"P1",due:fmt(addDays(0)),status:"todo",note:"重点比对中央口径",createdAt:Date.now(),updatedAt:Date.now()},
      {id:uid(),seeded:true,title:"跟进 1#L1-2 CAD 成图",project:"玉岱美庐 5",priority:"P1",due:fmt(addDays(3)),status:"doing",note:"字段映射终版已出",createdAt:Date.now(),updatedAt:Date.now()},
      {id:uid(),seeded:true,title:"归档旧版工勘报告",project:"工勘",priority:"P2",due:fmt(addDays(6)),status:"todo",note:"",createdAt:Date.now(),updatedAt:Date.now()}
    ];
    var p=[
      {id:uid(),seeded:true,name:"超长期特别国债支持老旧电梯更新（中央）",level:"中央",category:"国债",status:"研读中",conflict:"no",source:"",note:"中央资金用于设备更新；地方补贴为同一政策的分档执行",createdAt:Date.now(),updatedAt:Date.now()},
      {id:uid(),seeded:true,name:"武汉市既有住宅加装电梯财政补贴办法",level:"武汉地方",category:"补贴",status:"待复核",conflict:"no",source:"",note:"补贴为单档政策，分 10/15/20 万三档，与中央国债口径一致",createdAt:Date.now(),updatedAt:Date.now()}
    ];
    var pr=[
      {id:uid(),seeded:true,name:"玉岱美庐 5",csc:"CSC05253236",liftNo:"1#L1-2",stage:"CAD",owner:"wzd",subsidy:200000,note:"国债更新改造，单档补贴 20 万",updatedAt:Date.now()}
    ];
    lsSet(KEY_T,t); lsSet(KEY_P,p); lsSet(KEY_PR,pr);
    localStorage.setItem(KEY_SEED,"1");
  }
  function seedCad(){
    if(localStorage.getItem(KEY_SEED_CAD)) return;
    var c=[
      {id:uid(),seeded:true,report:"玉岱美庐需求报告",liftNo:"1#L1-2",csc:"CSC05253236",status:"终版",total:136,sourced:54,def:39,clarify:0,user:21,path:"CAD字段映射终版_玉岱美庐.xlsx",note:"样例 1#L1-2 Nmono，已出终版",updatedAt:Date.now()}
    ];
    lsSet(KEY_CAD,c);
    localStorage.setItem(KEY_SEED_CAD,"1");
  }
  function lsGet(k){ try{return JSON.parse(localStorage.getItem(k))||[];}catch(e){return [];} }
  function lsSet(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

  var tasks=lsGet(KEY_T), policies=lsGet(KEY_P), projects=lsGet(KEY_PR), cad=lsGet(KEY_CAD), wordBank=lsGet(KEY_WB), checkins=lsGet(KEY_CI), grammar=lsGet(KEY_GRAMMAR);
  var curWords=[];
  seed(); seedCad();
  tasks=lsGet(KEY_T); policies=lsGet(KEY_P); projects=lsGet(KEY_PR); cad=lsGet(KEY_CAD); wordBank=lsGet(KEY_WB); checkins=lsGet(KEY_CI); grammar=lsGet(KEY_GRAMMAR);

  // ===== GitHub 云同步 =====
  var KEY_GH_OWNER="wb_gh_owner", KEY_GH_REPO="wb_gh_repo", KEY_GH_BRANCH="wb_gh_branch", KEY_GH_TOKEN="wb_gh_token", KEY_GH_AUTO="wb_gh_auto", KEY_GH_DIRTY="wb_gh_dirty", KEY_GH_LAST="wb_gh_last";
  var ghOwner=localStorage.getItem(KEY_GH_OWNER)||"", ghRepo=localStorage.getItem(KEY_GH_REPO)||"", ghBranch=localStorage.getItem(KEY_GH_BRANCH)||"main", ghToken=localStorage.getItem(KEY_GH_TOKEN)||"";
  var ghAutoOn=localStorage.getItem(KEY_GH_AUTO); ghAutoOn=(ghAutoOn===null)?"1":ghAutoOn;
  var ghAuto=ghAutoOn==="1";
  var ghDirty=(localStorage.getItem(KEY_GH_DIRTY)==="1");
  var ghLastSync=localStorage.getItem(KEY_GH_LAST)||"";
  var ghPushTimer=null, ghBusy=false;
  function ghUrl(){ return "https://api.github.com/repos/"+encodeURIComponent(ghOwner)+"/"+encodeURIComponent(ghRepo)+"/contents/wzd-desk-data.json?ref="+encodeURIComponent(ghBranch); }
  function ghAll(){ return {v:1,tasks:tasks,policies:policies,projects:projects,cad:cad,wordBank:wordBank,checkins:checkins,grammar:grammar,savedAt:Date.now()}; }
  function ghApply(d){ if(!d) return; if(d.tasks)tasks=d.tasks; if(d.policies)policies=d.policies; if(d.projects)projects=d.projects; if(d.cad)cad=d.cad; if(d.wordBank)wordBank=d.wordBank; if(d.checkins)checkins=d.checkins; if(d.grammar)grammar=d.grammar; }
  function b64e(s){ return btoa(unescape(encodeURIComponent(s))); }
  function b64d(b){ return decodeURIComponent(escape(atob(b))); }
  function ghStatus(t,c){ var el=$("#gh-status"); if(el){ el.textContent=t; el.className="sync-status"+(c?(" "+c):""); } }
  function ghSaveCfg(){
    ghOwner=$("#gh-owner").value.trim(); ghRepo=$("#gh-repo").value.trim(); ghBranch=$("#gh-branch").value.trim()||"main"; ghToken=$("#gh-token").value.trim();
    ghAuto=$("#gh-auto").checked;
    localStorage.setItem(KEY_GH_OWNER,ghOwner); localStorage.setItem(KEY_GH_REPO,ghRepo); localStorage.setItem(KEY_GH_BRANCH,ghBranch); localStorage.setItem(KEY_GH_TOKEN,ghToken); localStorage.setItem(KEY_GH_AUTO, ghAuto?"1":"0");
    ghStatus("配置已保存","ok");
    if(ghOwner&&ghRepo&&ghToken) ghPull(true);
  }
  function ghPull(silent){
    if(!ghOwner||!ghRepo||!ghToken){ if(!silent) ghStatus("请先保存配置","err"); return; }
    if(ghBusy) return; ghBusy=true; ghStatus("同步中…","sync");
    fetch(ghUrl(),{headers:{"Authorization":"Bearer "+ghToken,"Accept":"application/vnd.github+json"}})
      .then(function(r){ if(r.status===404){ ghBusy=false; ghStatus("云端暂无数据，可点推送上传","ok"); return null; } if(!r.ok) throw new Error("HTTP "+r.status); return r.json(); })
      .then(function(j){ if(!j) return;
        try{ var d=JSON.parse(b64d(j.content)); ghApply(d); if(ghPushTimer) clearTimeout(ghPushTimer); save(); renderAll(); ghDirty=false; localStorage.setItem(KEY_GH_DIRTY,"0"); ghLastSync=Date.now(); localStorage.setItem(KEY_GH_LAST,""+ghLastSync); ghBusy=false; ghStatus("已拉取 ✓ "+new Date().toLocaleTimeString(),"ok"); }
        catch(e){ ghBusy=false; ghStatus("拉取解析失败","err"); }
      })
      .catch(function(e){ ghBusy=false; ghStatus("拉取失败:"+e.message,"err"); });
  }
  function ghPush(){
    if(!ghOwner||!ghRepo||!ghToken){ ghStatus("请先保存配置","err"); return; }
    if(ghBusy) return; ghBusy=true; ghStatus("同步中…","sync");
    fetch(ghUrl(),{headers:{"Authorization":"Bearer "+ghToken,"Accept":"application/vnd.github+json"}})
      .then(function(r){ if(r.status===404) return null; if(!r.ok) throw new Error("HTTP "+r.status); return r.json(); })
      .then(function(j){ var sha=j?j.sha:null; var body={message:"sync wzd-desk "+new Date().toISOString(),content:b64e(JSON.stringify(ghAll()))}; if(sha) body.sha=sha;
        return fetch(ghUrl(),{method:"PUT",headers:{"Authorization":"Bearer "+ghToken,"Content-Type":"application/json","Accept":"application/vnd.github+json"},body:JSON.stringify(body)});
      })
      .then(function(r){ if(!r||!r.ok) throw new Error("HTTP "+(r?r.status:"?")); return r.json(); })
      .then(function(){ ghLastSync=Date.now(); localStorage.setItem(KEY_GH_LAST,""+ghLastSync); ghDirty=false; localStorage.setItem(KEY_GH_DIRTY,"0"); ghBusy=false; ghStatus("已推送 ✓ "+new Date().toLocaleTimeString(),"ok"); })
      .catch(function(e){ ghBusy=false; ghStatus("推送失败:"+e.message,"err"); });
  }
  function ghSchedulePush(){ if(!ghAuto||!ghOwner||!ghRepo||!ghToken) return; if(ghPushTimer) clearTimeout(ghPushTimer); ghPushTimer=setTimeout(ghPush,1500); }
  // ===== /GitHub 云同步 =====

  function save(){ lsSet(KEY_T,tasks); lsSet(KEY_P,policies); lsSet(KEY_PR,projects); lsSet(KEY_CAD,cad); lsSet(KEY_WB,wordBank); lsSet(KEY_CI,checkins); lsSet(KEY_GRAMMAR,grammar); ghDirty=true; localStorage.setItem(KEY_GH_DIRTY,"1"); ghSchedulePush(); }

  // ---- Tab switching ----
  var TITLES={tasks:["今日待办","逾期与临近任务一目了然"],policies:["政策研究","中央/地方政策追踪与冲突标注"],projects:["项目台账","电梯更新改造进度与补贴对账"],cad:["CAD 字段映射","需求报告→成图字段的提取台账"],english:["🐟 充电角","趁闲时，攒几个词"]};
  function switchTab(tab){
    $$(".nav-item").forEach(function(n){ n.classList.toggle("active", n.getAttribute("data-tab")===tab); });
    ["tasks","policies","projects","cad","english"].forEach(function(s){ $("#sec-"+s).style.display = (s===tab)?"block":"none"; });
    $("#pageTitle").textContent=TITLES[tab][0];
    $("#pageDesc").textContent=TITLES[tab][1];
  }
  $$(".nav-item").forEach(function(n){ n.addEventListener("click",function(){ switchTab(n.getAttribute("data-tab")); }); });

  // ---- Today board ----
  function dayDiff(due){ var a=new Date(due), b=new Date(todayStr()); return Math.round((a-b)/86400000); }
  function renderToday(){
    var list=tasks.filter(function(t){return t.status!=="done";});
    var arr=list.map(function(t){
      var diff=dayDiff(t.due); var kind = diff<0?"overdue":(diff===0?"today":"soon");
      return {t:t,diff:diff,kind:kind};
    }).sort(function(a,b){ if(a.kind!==b.kind) return a.kind==="overdue"?-1:(b.kind==="overdue"?1:(a.kind==="today"?-1:1)); return a.diff-b.diff; });
    var box=$("#todayList");
    if(!arr.length){ box.innerHTML='<div class="empty">🎉 没有逾期或临近的任务，保持住！</div>'; return; }
    box.innerHTML="";
    arr.forEach(function(o){
      var t=o.t; var lbl = o.kind==="overdue"?('<span class="tag tag-overdue">逾期 '+Math.abs(o.diff)+' 天</span>'):(o.kind==="today"?'<span class="tag tag-today">今天到期</span>':'<span class="tag tag-soon">'+o.diff+' 天后</span>');
      var pri = t.priority==="P0"?'<span class="tag tag-p0">P0</span>':(t.priority==="P1"?'<span class="tag tag-p1">P1</span>':'<span class="tag tag-p2">P2</span>');
      var div=document.createElement("div"); div.className="today-item";
      div.innerHTML='<div class="t-main"><div class="t-title">'+esc(t.title)+'</div><div class="t-meta">'+pri+lbl+(t.project?(' · '+esc(t.project)):'')+'</div></div>';
      var btn=document.createElement("button"); btn.className="btn-mini"; btn.textContent="完成";
      btn.onclick=function(){ t.status="done"; t.updatedAt=Date.now(); save(); renderTasks(); renderToday(); };
      div.appendChild(btn);
      box.appendChild(div);
    });
  }

  // ---- Tasks list ----
  var taskF="all";
  function renderTasks(){
    var box=$("#taskList");
    var list=tasks.filter(function(t){ return taskF==="all"||t.status===taskF; });
    if(!list.length){ box.innerHTML='<div class="empty">暂无任务，上面添加一条吧</div>'; return; }
    box.innerHTML="";
    list.forEach(function(t){
      var pri = t.priority==="P0"?'<span class="tag tag-p0">P0</span>':(t.priority==="P1"?'<span class="tag tag-p1">P1</span>':'<span class="tag tag-p2">P2</span>');
      var st = t.status==="todo"?"待办":(t.status==="doing"?"进行中":"已完成");
      var div=document.createElement("div"); div.className="item"+(t.status==="done"?" done":"");
      var chk=document.createElement("div"); chk.className="chk"+(t.status==="done"?" on":"");
      chk.innerHTML='<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
      chk.onclick=function(){ t.status = t.status==="done"?"todo":"done"; t.updatedAt=Date.now(); save(); renderTasks(); renderToday(); };
      var body=document.createElement("div"); body.className="body";
      body.innerHTML='<div class="row1"><span class="name">'+esc(t.title)+'</span>'+pri+'<span class="badge">'+st+'</span></div>'+
        '<div class="meta">'+(t.project?('项目：'+esc(t.project)+' · '):'')+'截止：'+esc(t.due||'—')+(t.note?(' · '+esc(t.note)):'')+'</div>';
      var actions=document.createElement("div"); actions.className="item-actions";
      var cy=document.createElement("button"); cy.className="btn-mini"; cy.style.minHeight="36px"; cy.style.padding="6px 10px"; cy.textContent="进行中";
      cy.onclick=function(){ t.status = t.status==="doing"?"todo":"doing"; t.updatedAt=Date.now(); save(); renderTasks(); renderToday(); };
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("确认删除该任务？")){ tasks=tasks.filter(function(x){return x.id!==t.id;}); save(); renderTasks(); renderToday(); } };
      actions.appendChild(cy); actions.appendChild(del);
      div.appendChild(chk); div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
  }
  $$("#taskFilter .chip").forEach(function(c){ c.onclick=function(){ $$("#taskFilter .chip").forEach(function(x){x.classList.remove("on");}); c.classList.add("on"); taskF=c.getAttribute("data-f"); renderTasks(); }; });

  $("#addTask").onclick=function(){
    var title=$("#t-title").value.trim(); if(!title){ alert("请填写任务名"); return; }
    tasks.push({id:uid(),title:title,project:$("#t-project").value.trim(),priority:$("#t-priority").value,due:$("#t-due").value||todayStr(),status:"todo",note:"",createdAt:Date.now(),updatedAt:Date.now()});
    save(); $("#t-title").value=""; $("#t-project").value=""; $("#t-due").value=""; renderTasks(); renderToday();
  };

  // ---- Policies ----
  var polF="all";
  function renderPolicies(){
    var box=$("#policyList");
    var list=policies.filter(function(p){
      if(polF==="all") return true;
      if(polF==="conflict") return p.conflict==="yes";
      return p.level===polF;
    });
    if(!list.length){ box.innerHTML='<div class="empty">暂无政策条目</div>'; return; }
    box.innerHTML="";
    list.forEach(function(p){
      var div=document.createElement("div"); div.className="item";
      var body=document.createElement("div"); body.className="body";
      var conf = p.conflict==="yes"?'<span class="badge badge-conflict">⚠ 冲突待裁定</span>':'';
      body.innerHTML='<div class="row1"><span class="name">'+esc(p.name)+'</span>'+conf+'</div>'+
        '<div class="meta"><span class="badge">'+esc(p.level)+'</span><span class="badge">'+esc(p.category)+'</span><span class="badge">'+esc(p.status)+'</span>'+(p.source?(' · <a href="'+esc(p.source)+'" target="_blank" rel="noopener">来源</a>'):'')+'</div>'+
        (p.note?'<div class="meta">'+esc(p.note)+'</div>':'');
      var actions=document.createElement("div"); actions.className="item-actions";
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("确认删除该政策条目？")){ policies=policies.filter(function(x){return x.id!==p.id;}); save(); renderPolicies(); } };
      actions.appendChild(del);
      div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
  }
  $$("#policyFilter .chip").forEach(function(c){ c.onclick=function(){ $$("#policyFilter .chip").forEach(function(x){x.classList.remove("on");}); c.classList.add("on"); polF=c.getAttribute("data-f"); renderPolicies(); }; });

  $("#addPolicy").onclick=function(){
    var name=$("#p-name").value.trim(); if(!name){ alert("请填写政策名"); return; }
    policies.push({id:uid(),name:name,level:$("#p-level").value,category:$("#p-category").value,status:$("#p-status").value,conflict:$("#p-conflict").value,source:$("#p-source").value.trim(),note:$("#p-note").value.trim(),createdAt:Date.now(),updatedAt:Date.now()});
    save();
    $("#p-name").value=""; $("#p-source").value=""; $("#p-note").value="";
    renderPolicies();
  };

  // ---- Projects ----
  function renderProjects(){
    var box=$("#projectList");
    if(!projects.length){ box.innerHTML='<div class="empty">暂无项目</div>'; renderChart(); return; }
    box.innerHTML="";
    projects.forEach(function(p){
      var div=document.createElement("div"); div.className="item";
      var body=document.createElement("div"); body.className="body";
      body.innerHTML='<div class="row1"><span class="name">'+esc(p.name)+'</span><span class="badge">'+esc(p.stage)+'</span>'+(p.liftNo?'<span class="badge">'+esc(p.liftNo)+'</span>':'')+'</div>'+
        '<div class="meta">CSC：'+(esc(p.csc)||'—')+' · 负责人：'+(esc(p.owner)||'—')+'</div>'+
        '<div class="meta">补贴档位 <b>¥'+(Number(p.subsidy)||0).toLocaleString()+'</b> <span class="badge">'+tierLabel(p.subsidy)+'</span></div>'+
        (p.note?'<div class="meta">'+esc(p.note)+'</div>':'');
      var actions=document.createElement("div"); actions.className="item-actions";
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("确认删除该项目？")){ projects=projects.filter(function(x){return x.id!==p.id;}); save(); renderProjects(); } };
      actions.appendChild(del);
      div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
    renderChart();
  }
  function tierLabel(v){
    v=Number(v)||0;
    if(v===100000) return "10 万档";
    if(v===150000) return "15 万档";
    if(v===200000) return "20 万档";
    return "未定档";
  }
  function renderChart(){
    var wrap=$("#projChart");
    if(!projects.length){ wrap.innerHTML='<div class="empty">暂无项目数据</div>'; return; }
    var tiers=[{v:100000,l:"10 万"},{v:150000,l:"15 万"},{v:200000,l:"20 万"}];
    var counts={}; tiers.forEach(function(t){ counts[t.v]=0; });
    projects.forEach(function(p){ var s=Number(p.subsidy)||0; if(counts[s]!=null) counts[s]++; });
    var max=Math.max(1, tiers[0]&&0, Math.max(counts[100000],counts[150000],counts[200000]));
    var html='<div style="display:flex;gap:14px;flex-wrap:wrap">';
    tiers.forEach(function(t){
      var n=counts[t.v]; var pct=Math.round(n/max*100);
      html+='<div style="flex:1;min-width:150px;background:var(--bg);border-radius:12px;padding:14px 16px">'+
        '<div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-weight:700;font-size:15px">'+t.l+' 档</span><span style="font-weight:800;color:var(--primary-dark);font-size:20px">'+n+'</span></div>'+
        '<div style="height:8px;background:var(--card);border-radius:6px;margin-top:10px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:var(--primary);border-radius:6px;transition:.3s"></div></div>'+
        '<div style="font-size:12px;color:var(--muted);margin-top:7px">'+(n?('¥'+(t.v*n).toLocaleString()+' 累计'):'暂无项目')+'</div>'+
      '</div>';
    });
    html+='</div>';
    wrap.innerHTML=html;
  }
  $("#addProject").onclick=function(){
    var name=$("#pr-name").value.trim(); if(!name){ alert("请填写项目名"); return; }
    projects.push({id:uid(),name:name,csc:$("#pr-csc").value.trim(),liftNo:$("#pr-lift").value.trim(),stage:$("#pr-stage").value,owner:$("#pr-owner").value.trim(),subsidy:Number($("#pr-subsidy").value)||0,note:$("#pr-note").value.trim(),updatedAt:Date.now()});
    save();
    $("#pr-name").value=""; $("#pr-csc").value=""; $("#pr-lift").value=""; $("#pr-owner").value=""; $("#pr-note").value="";
    renderProjects();
  };

  // ---- CAD field mapping ledger ----
  var cadF="all";
  function renderCad(){
    var box=$("#cadList");
    var list=cad.filter(function(c){
      if(cadF==="all") return true;
      if(cadF==="clarify") return (Number(c.clarify)||0)>0;
      if(cadF==="final") return c.status==="终版";
      return true;
    });
    if(!list.length){ box.innerHTML='<div class="empty">暂无 CAD 字段映射记录</div>'; return; }
    box.innerHTML="";
    list.forEach(function(c){
      var clarify=(Number(c.clarify)||0);
      var div=document.createElement("div"); div.className="item";
      var body=document.createElement("div"); body.className="body";
      var clTag = clarify>0?'<span class="badge badge-conflict">⚠ 需澄清 '+clarify+' 项</span>':'';
      body.innerHTML='<div class="row1"><span class="name">'+esc(c.report)+'</span><span class="badge">'+esc(c.status)+'</span>'+clTag+'</div>'+
        '<div class="meta">'+(c.liftNo?('梯号：'+esc(c.liftNo)+' · '):'')+'CSC：'+(esc(c.csc)||'—')+'</div>'+
        '<div class="meta">字段总数 <b>'+(Number(c.total)||0)+'</b> ｜ <span class="diff-pos">已溯源 '+(Number(c.sourced)||0)+'</span> ｜ 默认值 '+(Number(c.def)||0)+' ｜ <span class="'+(clarify>0?'diff-neg':'diff-zero')+'">需澄清 '+clarify+'</span> ｜ 用户填写 '+(Number(c.user)||0)+'</div>'+
        (c.path?'<div class="meta">终版：'+esc(c.path)+'</div>':'')+
        (c.note?'<div class="meta">'+esc(c.note)+'</div>':'');
      var actions=document.createElement("div"); actions.className="item-actions";
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("确认删除该 CAD 映射记录？")){ cad=cad.filter(function(x){return x.id!==c.id;}); save(); renderCad(); } };
      actions.appendChild(del);
      div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
  }
  $$("#cadFilter .chip").forEach(function(ch){ ch.onclick=function(){ $$("#cadFilter .chip").forEach(function(x){x.classList.remove("on");}); ch.classList.add("on"); cadF=ch.getAttribute("data-f"); renderCad(); }; });
  $("#addCad").onclick=function(){
    var report=$("#c-report").value.trim(); if(!report){ alert("请填写报告名"); return; }
    cad.push({id:uid(),seeded:false,report:report,liftNo:$("#c-lift").value.trim(),csc:$("#c-csc").value.trim(),status:$("#c-status").value,total:Number($("#c-total").value)||0,sourced:Number($("#c-sourced").value)||0,def:Number($("#c-default").value)||0,clarify:Number($("#c-clarify").value)||0,user:Number($("#c-user").value)||0,path:$("#c-path").value.trim(),note:$("#c-note").value.trim(),updatedAt:Date.now()});
    save();
    ["c-report","c-lift","c-csc","c-total","c-sourced","c-default","c-clarify","c-user","c-path","c-note"].forEach(function(id){ $("#"+id).value=""; });
    renderCad();
  };

  // ---- 🐟 充电角 (English learning / 摸鱼区) ----
// == WORDS 已迁移至 js/data.js ==
// == WORDS_EXTRA 已迁移至 js/data.js ==
// == CAT 已迁移至 js/data.js ==
// == OFFLINE_EXTRA 已迁移至 js/data.js ==
  // 离线词库池：内置办公/专业词汇 + 六级词库 + 精选CET4核心词，全部本地，无需联网
  /* ===== 六级词汇知识库（今日一词数据源，离线）===== */
// == CET6_WORDS 已迁移至 js/data.js ==
// == CAT_LABEL 已迁移至 js/data.js ==
// == WORD_BATCH 已迁移至 js/data.js ==
  function catOf(w){ return w.cat||CAT[w.word]||"office"; }
  function speak(text){ try{ if(!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=0.92; window.speechSynthesis.speak(u); }catch(e){} }
  function wordPool(){ return CET6_WORDS; }
  function sampleArr(arr, n, exclude){
    exclude=exclude||[];
    var avail=arr.filter(function(x){
      return !exclude.some(function(e){
        if(e.word!==undefined) return e.word===x.word;
        if(e.topic!==undefined) return e.topic===x.topic;
        return false;
      });
    });
    avail=avail.slice();
    for(var i=avail.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=avail[i]; avail[i]=avail[j]; avail[j]=t; }
    return avail.slice(0, Math.min(n, avail.length));
  }
  function pickWord(){ curWords=sampleArr(CET6_WORDS, WORD_BATCH, curWords); renderWordOfDay(); }
  function renderWordOfDay(){
    var box=$("#wordCard");
    if(!curWords.length){ box.innerHTML='<div class="empty">词库为空</div>'; return; }
    box.innerHTML=curWords.map(function(w,i){
      return '<div class="wb-item">'+
        '<div class="wb-row1"><span class="wb-word">'+esc(w.word)+'</span><span class="badge">'+esc(w.pos)+'</span><span class="wb-cat">六级</span></div>'+
        '<div class="wb-ipa">'+esc(w.ipa)+' <span class="w-ipa" data-i="'+i+'" style="cursor:pointer">🔊</span></div>'+
        '<div class="wb-mean">'+esc(w.meaning)+'</div>'+
        (w.example?'<div class="wb-ex">'+esc(w.example)+'<br><span style="color:var(--muted)">'+esc(w.exampleZh||"")+'</span></div>':'')+
        '<div class="wb-acts">'+
          '<button class="mini-edit" data-act="speak" data-i="'+i+'">🔊 朗读</button>'+
          '<button class="mini-edit" data-act="fav" data-i="'+i+'">★ 收藏</button>'+
        '</div></div>';
    }).join("");
    bindWordCard();
  }
  function bindWordCard(){
    $$("#wordCard [data-act]").forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute("data-i"); var w=curWords[i]; if(!w) return;
        if(b.getAttribute("data-act")==="speak") speak(w.word);
        else if(b.getAttribute("data-act")==="fav") favWord(w,b);
      };
    });
    $$("#wordCard .w-ipa").forEach(function(s){
      s.onclick=function(){ var i=+s.getAttribute("data-i"); if(curWords[i]) speak(curWords[i].word); };
    });
  }
  function favWord(w,btn){
    if(wordBank.some(function(x){return x.word===w.word;})){ if(btn) btn.textContent="✓ 已收藏"; return; }
    wordBank.push({word:w.word,ipa:w.ipa,pos:w.pos,meaning:w.meaning,cat:"cet6"});
    save(); renderWordBank(); updateFishStats();
    if(btn) btn.textContent="✓ 已收藏";
  }
  function renderWordBank(){
    var box=$("#wordBank");
    $("#wbCount").textContent=wordBank.length;
    if(!wordBank.length){ box.innerHTML='<div class="empty">还没有收藏的单词，点上面的 ★ 收藏吧 🐟</div>'; return; }
    box.innerHTML="";
    wordBank.forEach(function(w){
      var div=document.createElement("div"); div.className="item";
      var body=document.createElement("div"); body.className="body";
      var cat=w.cat||"office";
      body.innerHTML='<div class="row1"><span class="name">'+esc(w.word)+'</span><span class="badge">'+esc(w.pos)+'</span><span class="wb-cat">'+CAT_LABEL[cat]+'</span></div>'+
        '<div class="meta">'+esc(w.ipa)+' · '+esc(w.meaning)+' <span class="w-ipa" style="margin-left:4px">🔊</span></div>';
      var actions=document.createElement("div"); actions.className="item-actions";
      var spk=document.createElement("button"); spk.className="mini-del"; spk.title="朗读"; spk.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13 3a4 4 0 0 0-2-3.5v7A4 4 0 0 0 16 12z"/></svg>';
      spk.onclick=function(){ speak(w.word); };
      var rev=document.createElement("button"); rev.className="mini-del"; rev.title="复习"; rev.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>';
      rev.onclick=function(){ srOne(w); };
      var edt=document.createElement("button"); edt.className="mini-del"; edt.title="编辑"; edt.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
      edt.onclick=function(){ openWbEdit(w); };
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("删除单词「"+w.word+"」？")){ wordBank=wordBank.filter(function(x){return x.word!==w.word;}); save(); renderWordBank(); updateFishStats(); } };
      actions.appendChild(spk); actions.appendChild(rev); actions.appendChild(edt); actions.appendChild(del);
      div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
  }
  // ---- Grammar (🐟 充电角 · 语法板块) ----
  var GRAMMAR=[
    {topic:"一般过去时 vs 现在完成时",cat:"tense",rule:"过去时强调动作发生在明确的过去时间；现在完成时强调动作与现在的关联或持续到现在。",right:"I finished the report yesterday. / I have finished the report.",wrong:"I have finished the report yesterday. （完成时不能与具体过去时间连用）",tip:"见 <b>yesterday / last week / in 2023</b> 用过去时；见 <b>ever / never / just / already / since</b> 用完成时。"},
    {topic:"完成时与 for / since",cat:"tense",rule:"for + 时间段（for two weeks 两周）；since + 时间点（since Monday 从周一起）。",right:"We have worked here for two years. / We have worked here since 2024.",wrong:"We have worked here since two years. （since 后接时间点，不接时间段）",tip:"<b>for</b> = 多久；<b>since</b> = 从何时起。"},
    {topic:"定语从句 who / which / that",cat:"clause",rule:"指人用 who / that，指物用 which / that；限定性从句缺宾语时 that 可省。",right:"The engineer who designed it is here. / The file which you need is on the desk.",wrong:"The engineer which designed it is here. （指人不用 which）",tip:"非限定性从句（逗号隔开）不能用 that，且关系代词不能省。"},
    {topic:"名词性从句用陈述语序",cat:"clause",rule:"wh- 引导的从句用陈述语序（主+谓），不倒装。",right:"I don't know where the meeting is. / Please tell me what you need.",wrong:"I don't know where is the meeting. （从句不可倒装）",tip:"疑问词后直接跟主语，如 where the meeting is。"},
    {topic:"条件句 if 时态",cat:"clause",rule:"真实条件：if + 现在时，主句将来时（if 从句不用 will）。非真实与现在相反：if + 过去时，主句 would。",right:"If it rains, we will cancel. / If I had time, I would help.",wrong:"If it will rain, we will cancel. （条件句 if 不用 will）",tip:"真实条件 if 用一般现在表将来；虚拟退一格时态。"},
    {topic:"与现在相反的虚拟语气",cat:"mood",rule:"if + 过去时（be 用 were），主句 would + 动词原形。",right:"If I were the project lead, I would change the plan.",wrong:"If I am the project lead... （虚拟语气 if 不用现在时）",tip:"虚拟≠事实，if 从句退一格时态，be 用 were。"},
    {topic:"与过去相反的虚拟语气",cat:"mood",rule:"if + had done，主句 would have done。",right:"If we had checked the hoistway, the error would have been avoided.",wrong:"If we checked it, it would avoid. （与过去事实相反要用 had done）",tip:"后悔或假设过去，用 had + 过去分词。"},
    {topic:"时间介词 in / on / at",cat:"prep",rule:"at + 时刻（at 9am）；on + 具体某天（on Friday / on Aug 26）；in + 月/年/年代（in 2026 / in August）。",right:"The meeting is at 9. / on Friday. / in August.",wrong:"in Friday / at August （点用 at、天用 on、段用 in）",tip:"点 at、天 on、段 in。"},
    {topic:"方位/楼层介词 in / on / at",cat:"prep",rule:"at 表小地点（at the site）；in 表大范围（in Wuhan）；on 表街道/楼层（on Floor 3）。",right:"She is at the site. / in Wuhan. / on the third floor.",wrong:"in the third floor （楼层用 on）",tip:"点 at、面/层 on、区 in。"},
    {topic:"冠词 a / an / the",cat:"prep",rule:"a / an 表'一个'（泛指，元音音素开头用 an）；the 表特指（双方已知或上文提过）。",right:"We need an elevator. The elevator is in the pit.",wrong:"We need a elevator. （元音音素开头用 an）/ The elevator is in pit. （特指缺 the）",tip:"看发音而非字母：an hour（h 不发音）但 a unit。"},
    {topic:"被动语态 be + 过去分词",cat:"voice",rule:"受动者作主语：be + 过去分词；by + 动作发出者（可省）。",right:"The contract was signed yesterday. / The parts are delivered by the supplier.",wrong:"The contract signed yesterday. （缺 be 动词，不是被动）",tip:"被动强调'被怎样'，不关心谁做的。"},
    {topic:"使役/感官后接原形",cat:"voice",rule:"make / let / have / see / hear 后接 宾语 + 动词原形（非 to do）。",right:"The manager let me leave early. / I saw him enter the hoistway.",wrong:"The manager let me to leave early. （使役后不接 to）",tip:"主动表'让/看'用原形；变被动才补 to：be made to do。"},
    {topic:"比较级与 than",cat:"word",rule:"比较级 + than；多音节词用 more，不可叠加（more safer ✗）。",right:"This model is safer than that one. / The earlier, the better.",wrong:"more safer （safer 已是比较级，不叠 more）/ This is more cheap",tip:"单/双音节加 -er；多音节用 more；the+比较级, the+比较级 表'越…越'。"},
    {topic:"a/the number of 主谓一致",cat:"word",rule:"a number of + 复数（许多，谓语复数）；the number of + 复数（…的数量，谓语单数）。",right:"A number of interns are here. / The number of projects is growing.",wrong:"The number of projects are growing. （the number 作主语用单数）",tip:"看核心词：a number 是'许多'，the number 是'数量'。"},
    {topic:"情态动词表推测 must / can't",cat:"word",rule:"must 表肯定推测'一定'；can't 表否定推测'不可能'（非能力时）。",right:"He must be the supervisor. / This can't be correct.",wrong:"He mustn't be the supervisor. （mustn't 是'禁止'，不是'不可能'）",tip:"推测用 must / can't；'禁止'才用 mustn't。"},
    {topic:"建议/要求后从句用原形",cat:"word",rule:"suggest / require / demand / insist 后 that 从句用 (should) + 动词原形。",right:"We suggest that he (should) attend the meeting.",wrong:"We suggest that he attends the meeting. （此处用原形）",tip:"虚拟语气在'建议/要求/命令'后，美式常省 should 直接用原形。"}
  ];
// == CET6_GRAMMAR 已迁移至 js/data.js ==
// == GRAMMAR_CAT 已迁移至 js/data.js ==
// == GRAM_BATCH 已迁移至 js/data.js ==
  var curGrams=[];
  function firstSentence(s){ return (s||"").split(" / ")[0]; }
  function gramPool(){ return CET6_GRAMMAR; }
  function pickGram(){ curGrams=sampleArr(CET6_GRAMMAR, GRAM_BATCH, curGrams); renderGram(); }
  function renderGram(){
    var box=$("#gramCard");
    if(!curGrams.length){ box.innerHTML='<div class="empty">语法库为空</div>'; return; }
    box.innerHTML=curGrams.map(function(g,i){
      return '<div class="wb-item">'+
        '<div class="wb-row1"><span class="wb-word" style="font-size:18px">'+esc(g.topic)+'</span><span class="wb-cat">'+GRAMMAR_CAT[g.cat]+'</span></div>'+
        '<div class="gram-rule">'+esc(g.rule)+'</div>'+
        '<div class="gram-cmp">'+
          '<div class="gram-col gram-ok"><span class="gram-tag" style="color:var(--primary-dark)">✓ 正确</span>'+esc(g.right)+'</div>'+
          (g.wrong?'<div class="gram-col gram-bad"><span class="gram-tag" style="color:var(--red)">✗ 常见错误</span>'+esc(g.wrong)+'</div>':'')+
        '</div>'+
        '<div class="gram-tip">💡 '+g.tip+'</div>'+
        '<div class="wb-acts">'+
          '<button class="mini-edit" data-act="speak" data-i="'+i+'">🔊 朗读</button>'+
          '<button class="mini-edit" data-act="fav" data-i="'+i+'">★ 收藏</button>'+
        '</div></div>';
    }).join("");
    bindGramCard();
  }
  function bindGramCard(){
    $$("#gramCard [data-act]").forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute("data-i"); var g=curGrams[i]; if(!g) return;
        if(b.getAttribute("data-act")==="speak") speak(firstSentence(g.right));
        else if(b.getAttribute("data-act")==="fav") favGram(g,b);
      };
    });
  }
  function favGram(g,btn){
    if(grammar.some(function(x){return x.topic===g.topic;})){ if(btn) btn.textContent="✓ 已收藏"; return; }
    grammar.push({topic:g.topic,cat:g.cat,rule:g.rule,right:g.right,wrong:g.wrong,tip:g.tip});
    save(); renderGramBank();
    if(btn) btn.textContent="✓ 已收藏";
  }
  function renderGramBank(){
    var box=$("#gramBank");
    $("#gramCount").textContent=grammar.length;
    if(!grammar.length){ box.innerHTML='<div class="empty">还没有收藏的语法点，点上面的 ★ 收藏吧 🐟</div>'; return; }
    box.innerHTML="";
    grammar.forEach(function(g){
      var div=document.createElement("div"); div.className="item";
      var body=document.createElement("div"); body.className="body";
      var r=esc(g.rule); body.innerHTML='<div class="row1"><span class="name">'+esc(g.topic)+'</span><span class="wb-cat">'+GRAMMAR_CAT[g.cat]+'</span></div>'+
        '<div class="meta">'+(r.length>70?r.slice(0,70)+"…":r)+'</div>';
      var actions=document.createElement("div"); actions.className="item-actions";
      var spk=document.createElement("button"); spk.className="mini-del"; spk.title="朗读正确例句"; spk.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13 3a4 4 0 0 0-2-3.5v7A4 4 0 0 0 16 12z"/></svg>';
      spk.onclick=function(){ speak(firstSentence(g.right)); };
      var edt=document.createElement("button"); edt.className="mini-del"; edt.title="编辑"; edt.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
      edt.onclick=function(){ openGramEdit(g); };
      var del=document.createElement("button"); del.className="mini-del"; del.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>';
      del.onclick=function(){ if(confirm("删除语法点「"+g.topic+"」？")){ grammar=grammar.filter(function(x){return x.topic!==g.topic;}); save(); renderGramBank(); } };
      actions.appendChild(spk); actions.appendChild(edt); actions.appendChild(del);
      div.appendChild(body); div.appendChild(actions);
      box.appendChild(div);
    });
  }
  function todayKey(){ var d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
  function curStreak(){ var s=0; var d=new Date(); for(;;){ var k=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); if(checkins.indexOf(k)>=0){ s++; d.setDate(d.getDate()-1);} else break; } return s; }
  function doCheckin(){ var t=todayKey(); if(checkins.indexOf(t)<0){ checkins.push(t); lsSet(KEY_CI,checkins);} renderCheckin(); updateFishStats(); }
  function renderCheckin(){
    var done=checkins.indexOf(todayKey())>=0;
    var streak=curStreak();
    var dots="";
    for(var i=6;i>=0;i--){ var d=new Date(); d.setDate(d.getDate()-i); var k=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); dots+='<span class="ci-dot'+(checkins.indexOf(k)>=0?" on":"")+'"></span>'; }
    $("#checkinBox").innerHTML=
      '<div class="ci-wrap"><div><div style="font-size:26px;font-weight:800;color:var(--primary-dark)">连续 '+streak+' 天</div>'+
      '<div style="color:var(--muted);margin-top:2px">最近 7 天打卡</div><div class="ci-dots">'+dots+'</div></div>'+
      '<button class="btn-primary" id="ciBtn">'+(done?"今天已打卡 ✓":"今天打卡 🐟")+'</button></div>';
    $("#ciBtn").onclick=doCheckin;
  }
  var quizCorrect=0, quizTotal=0, quizDone=false, quizAns="";
  function renderQuiz(){
    quizDone=false;
    var pool=wordPool();
    if(pool.length<4){ $("#quizBox").innerHTML='<div class="empty">该分类词太少，先去「全部」练练～</div>'; return; }
    var ans=pool[Math.floor(Math.random()*pool.length)];
    quizAns=ans.word;
    var opts=[ans];
    while(opts.length<4){ var c=pool[Math.floor(Math.random()*pool.length)]; if(opts.indexOf(c)<0) opts.push(c); }
    opts=opts.sort(function(){return Math.random()-0.5;});
    var html='<div style="margin-bottom:11px;font-size:16px;font-weight:600">「'+esc(ans.meaning)+'」 是哪个词？</div><div id="quizOpts">';
    opts.forEach(function(o){ html+='<button class="quiz-opt" data-w="'+esc(o.word)+'">'+esc(o.word)+'</button>'; });
    html+='</div><div id="quizFeedback" style="margin-top:12px;min-height:18px"></div>';
    $("#quizBox").innerHTML=html;
    $$("#quizOpts .quiz-opt").forEach(function(b){
      b.onclick=function(){
        if(quizDone) return; quizDone=true; quizTotal++;
        var ok=b.getAttribute("data-w")===quizAns;
        if(ok) quizCorrect++;
        $$("#quizOpts .quiz-opt").forEach(function(x){ if(x.getAttribute("data-w")===quizAns) x.classList.add("correct"); });
        if(!ok) b.classList.add("wrong");
        var fb=$("#quizFeedback");
        fb.innerHTML=(ok?'✅ 答对啦！':'❌ 正确答案：')+' <b>'+esc(quizAns)+'</b> '+esc(ans.ipa)+'<br><span style="color:var(--muted)">'+esc(ans.example)+'</span>';
        updateFishStats();
        var nb=document.createElement("button"); nb.className="btn-ghost"; nb.textContent="下一题 →"; nb.style.marginTop="10px"; nb.onclick=renderQuiz;
        $("#quizBox").appendChild(nb);
      };
    });
  }
  function updateFishStats(){ $("#fsWords").textContent=wordBank.length; $("#fsStreak").textContent=curStreak(); $("#fsQuiz").textContent= quizTotal? Math.round(quizCorrect/quizTotal*100)+"%" : "—"; $("#fsReview").textContent=dueCount(); if($("#reviewStat")) $("#reviewStat").textContent=dueCount(); }
  $("#nextWord").onclick=function(){ pickWord(); };
  pickWord();
  // ---- Grammar events ----
  $("#nextGram").onclick=function(){ pickGram(); };
  pickGram();

  // ===== 🐟 联网查词 + 可编辑词库/语法本 + 间隔复习 =====
  var curDictWord=null;
  function playAudio(url){ try{ var a=new Audio(url); a.play().catch(function(){ if(curDictWord) speak(curDictWord.word); }); }catch(e){ if(curDictWord) speak(curDictWord.word); } }
  // 在线渲染器已移除：查词改为离线内置词库（见 searchDict）
  function renderDictBuiltin(w){
    curDictWord={word:w.word, ipa:w.ipa, pos:w.pos, meaning:w.meaning, cat:catOf(w), example:w.example||"", exampleZh:w.exampleZh||""};
    $("#dictResult").innerHTML='<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><div style="font-size:30px;font-weight:800;color:var(--primary-dark);letter-spacing:.5px">'+esc(w.word)+'</div><span class="w-ipa">'+esc(w.ipa)+'</span> <span class="badge">'+esc(w.pos)+'</span></div>'+
      '<div style="font-size:16px;font-weight:600;margin-top:13px">'+esc(w.meaning)+'</div>'+
      (w.example?'<div style="margin-top:11px;padding:13px 15px;background:var(--bg);border-radius:11px;line-height:1.75">'+esc(w.example)+'<br><span style="color:var(--muted)">'+(w.exampleZh||"")+'</span></div>':'')+
      '<div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn-ghost" id="dictFav">★ 收藏到词库</button><span class="badge">离线内置词库</span></div>';
    $("#dictNet").textContent="📴 离线";
  }
  // buildProxyUrl 已移除（离线方案无需代理）
  // fetchJson 已移除（离线方案无需联网）
  // BUILTIN_PROXIES 已移除（离线方案）
  // dictFinalFallback 已移除（离线方案）
  function searchDict(){
    var word=$("#dictInput").value.trim().toLowerCase();
    if(!word){ alert("请输入要查的单词"); return; }
    var pool=WORDS.concat(WORDS_EXTRA, CET6_WORDS, OFFLINE_EXTRA);
    var hit=pool.filter(function(w){ return w.word.toLowerCase()===word; })[0];
    if(hit){ renderDictBuiltin(hit); return; }
    var n=pool.length;
    $("#dictNet").textContent="📴 离线";
    $("#dictResult").innerHTML='<div class="empty">「'+esc(word)+'」未收录于内置 CET 离线词库（精选核心词，共 '+n+' 条）。<br>你可以把它加入「我的词库」自己补充释义：</div>'+
      '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><input id="dictAddWord" value="'+esc(word)+'" style="flex:1;min-width:120px"><button class="btn-primary" id="dictAddBtn">＋ 加入我的词库</button></div>';
  }
  function dictAddRaw(){
    var w=($("#dictAddWord").value||"").trim();
    if(!w){ alert("请输入单词"); return; }
    if(wordBank.some(function(x){ return x.word.toLowerCase()===w.toLowerCase(); })){ alert("「"+w+"」已经在词库里啦"); return; }
    wordBank.push({word:w, ipa:"", pos:"", cat:"cet6", meaning:"（待补充释义）", example:"", due:0, rep:0, ef:2.5, ivl:0});
    save(); renderWordBank(); updateFishStats();
    $("#dictResult").innerHTML='<div style="color:var(--primary-dark);font-weight:600">已把「'+esc(w)+'」加入我的词库，去「我的词库」补全释义即可 📚</div>';
  }
  // dictTryChain 已移除（离线方案）
  function favDictWord(){
    if(!curDictWord||!curDictWord.word) return;
    if(wordBank.some(function(x){return x.word===curDictWord.word;})){ alert("「"+curDictWord.word+"」已经在词库里啦"); return; }
    wordBank.push({word:curDictWord.word,ipa:curDictWord.ipa||"",pos:curDictWord.pos||"",meaning:curDictWord.meaning,cat:curDictWord.cat||"office",example:curDictWord.example||"",exampleZh:curDictWord.exampleZh||"",due:0,rep:0,ef:2.5,ivl:0});
    save(); renderWordBank(); updateFishStats();
  }
  $("#dictResult").addEventListener("click", function(e){
    if(e.target.id==="dictAddBtn"){ dictAddRaw(); return; }
    var a=e.target.closest("[data-audio]");
    if(a){ playAudio(a.getAttribute("data-audio")); return; }
    if(e.target.id==="dictFav"){ favDictWord(); }
  });
  $("#dictSearch").onclick=searchDict;
  $("#dictInput").addEventListener("keydown", function(e){ if(e.key==="Enter") searchDict(); });

  // 词典代理设置已移除（离线方案，无需代理）

  // ---- 词库可编辑 ----
  var wbEditId=null;
  function openWbEdit(w){
    wbEditId=w.word;
    $("#wb-word").value=w.word||""; $("#wb-ipa").value=w.ipa||""; $("#wb-pos").value=w.pos||""; $("#wb-cat").value=w.cat||"office"; $("#wb-meaning").value=w.meaning||""; $("#wb-example").value=w.example||"";
    $("#wbForm").style.display="block"; $("#wbSave").textContent="保存修改";
  }
  function saveWb(){
    var word=$("#wb-word").value.trim(); if(!word){ alert("请填写单词"); return; }
    var obj={word:word,ipa:$("#wb-ipa").value.trim(),pos:$("#wb-pos").value.trim(),cat:$("#wb-cat").value,meaning:$("#wb-meaning").value.trim(),example:$("#wb-example").value.trim()};
    if(wbEditId){
      var idx=-1; for(var i=0;i<wordBank.length;i++){ if(wordBank[i].word===wbEditId){ idx=i; break; } }
      if(idx>=0){ for(var k in obj){ wordBank[idx][k]=obj[k]; } }
    } else {
      if(wordBank.some(function(x){return x.word===word;})){ alert("「"+word+"」已存在词库"); return; }
      wordBank.push({word:obj.word,ipa:obj.ipa,pos:obj.pos,cat:obj.cat,meaning:obj.meaning,example:obj.example,due:0,rep:0,ef:2.5,ivl:0});
    }
    wbEditId=null; $("#wbForm").style.display="none"; $("#wbSave").textContent="保存";
    save(); renderWordBank(); updateFishStats();
  }
  $("#wbAddBtn").onclick=function(){ wbEditId=null; ["wb-word","wb-ipa","wb-pos","wb-meaning","wb-example"].forEach(function(id){ $("#"+id).value=""; }); $("#wb-cat").value="office"; $("#wbForm").style.display="block"; $("#wbSave").textContent="保存"; $("#wb-word").focus(); };
  $("#wbCancel").onclick=function(){ wbEditId=null; $("#wbForm").style.display="none"; };
  $("#wbSave").onclick=saveWb;

  // ---- 语法本可编辑 ----
  var gramEditId=null;
  function openGramEdit(g){
    gramEditId=g.topic;
    $("#gram-topic").value=g.topic||""; $("#gram-cat").value=g.cat||"tense"; $("#gram-rule").value=g.rule||""; $("#gram-right").value=g.right||""; $("#gram-wrong").value=g.wrong||""; $("#gram-tip").value=(g.tip||"").replace(/^💡\s*/,"").replace(/<[^>]+>/g,"");
    $("#gramForm").style.display="block"; $("#gramSave").textContent="保存修改";
  }
  function saveGram(){
    var topic=$("#gram-topic").value.trim(); if(!topic){ alert("请填写主题"); return; }
    var tipRaw=$("#gram-tip").value.trim();
    var obj={topic:topic,cat:$("#gram-cat").value,rule:$("#gram-rule").value.trim(),right:$("#gram-right").value.trim(),wrong:$("#gram-wrong").value.trim(),tip:tipRaw};
    if(gramEditId){
      var idx=-1; for(var i=0;i<grammar.length;i++){ if(grammar[i].topic===gramEditId){ idx=i; break; } }
      if(idx>=0){ for(var k in obj){ grammar[idx][k]=obj[k]; } }
    } else {
      if(grammar.some(function(x){return x.topic===topic;})){ alert("「"+topic+"」已存在语法本"); return; }
      grammar.push(obj);
    }
    gramEditId=null; $("#gramForm").style.display="none"; $("#gramSave").textContent="保存";
    save(); renderGramBank();
  }
  $("#gramAddBtn").onclick=function(){ gramEditId=null; ["gram-topic","gram-rule","gram-right","gram-wrong","gram-tip"].forEach(function(id){ $("#"+id).value=""; }); $("#gram-cat").value="tense"; $("#gramForm").style.display="block"; $("#gramSave").textContent="保存"; $("#gram-topic").focus(); };
  $("#gramCancel").onclick=function(){ gramEditId=null; $("#gramForm").style.display="none"; };
  $("#gramSave").onclick=saveGram;

  // ---- 间隔复习 (SM-2 轻量实现) ----
  function srReview(w,q){
    if(w.ef==null) w.ef=2.5; if(w.rep==null) w.rep=0; if(w.ivl==null) w.ivl=0;
    if(q<3){ w.rep=0; w.ivl=1; }
    else {
      if(w.rep===0) w.ivl=1;
      else if(w.rep===1) w.ivl=6;
      else { w.ef=w.ef+(0.1-(5-q)*(0.08+(5-q)*0.02)); w.ef=Math.max(1.3,w.ef); w.ivl=Math.round(w.ivl*w.ef); }
      w.rep=w.rep+1;
    }
    w.due=Date.now()+w.ivl*86400000;
  }
  function dueCount(){ var n=0,now=Date.now(); wordBank.forEach(function(w){ if((w.due||0)<=now) n++; }); return n; }
  function renderReviewBox(){
    if($("#reviewStat")) $("#reviewStat").textContent=dueCount();
    var box=$("#reviewBox"); if(!box) return;
    box.innerHTML='<div style="color:var(--muted);font-size:13px;margin-bottom:12px">按遗忘曲线安排：点「开始复习」回忆单词释义并自评，越熟练下次间隔越长。</div><button class="btn-primary" id="srStart">开始复习（'+dueCount()+'）</button>';
    $("#srStart").onclick=srStart;
  }
  function srFrontHtml(w, prog, total){
    return '<div style="margin-bottom:10px;color:var(--muted);font-size:13px">进度 '+(prog+1)+' / '+total+'</div><div class="sr-front">'+esc(w.word)+'</div>';
  }
  function srRate(w, after){
    var box=$("#reviewBox");
    box.innerHTML=srFrontHtml(w, after.idx, after.total)+
      '<div style="font-size:15px;font-weight:600;margin-top:10px">'+esc(w.meaning)+'</div>'+
      (w.example?'<div style="margin-top:8px;padding:9px 12px;background:var(--bg);border-radius:9px;line-height:1.7">'+esc(w.example)+'</div>':'')+
      '<div style="margin-top:14px"><button class="sr-opt" data-q="1">😵 忘了</button><button class="sr-opt" data-q="3">🤔 模糊</button><button class="sr-opt" data-q="5">😎 记得</button></div>';
    $$("#reviewBox .sr-opt").forEach(function(b){
      b.onclick=function(){
        srReview(w, parseInt(b.getAttribute("data-q"),10)); save(); after.idx++; updateFishStats();
        if(after.idx>=after.total){ $("#reviewBox").innerHTML='<div class="sr-summary">✅ 本轮复习完成，共 '+after.total+' 个词。<br>明天再来巩固，间隔会更长～</div>'; }
        else { srShow(after); }
      };
    });
  }
  function srShow(after){
    var w=after.list[after.idx]; var box=$("#reviewBox");
    box.innerHTML=srFrontHtml(w, after.idx, after.total)+
      '<div style="margin:10px 0 14px"><button class="btn-ghost" id="srSp" style="min-height:38px;padding:7px 12px">🔊 朗读</button></div>'+
      '<button class="sr-opt" id="srRev">👀 显示释义</button>';
    $("#srSp").onclick=function(){ speak(w.word); };
    $("#srRev").onclick=function(){ srRate(w, after); };
  }
  function srStart(){
    var now=Date.now();
    var list=wordBank.filter(function(w){return (w.due||0)<=now;}).slice(0,20);
    if(!list.length){ $("#reviewBox").innerHTML='<div class="empty">🎉 暂时没有待复习的单词，去查词或添加新词吧！</div>'; return; }
    srShow({list:list, idx:0, total:list.length});
  }
  function srOne(w){
    var box=$("#reviewBox");
    box.innerHTML=srFrontHtml(w,0,1)+
      '<div style="margin:10px 0 14px"><button class="btn-ghost" id="srSp2" style="min-height:38px;padding:7px 12px">🔊 朗读</button></div>'+
      '<button class="sr-opt" id="srRev2">👀 显示释义</button>';
    $("#srSp2").onclick=function(){ speak(w.word); };
    $("#srRev2").onclick=function(){
      box.innerHTML=srFrontHtml(w,0,1)+
        '<div style="font-size:15px;font-weight:600;margin-top:10px">'+esc(w.meaning)+'</div>'+
        (w.example?'<div style="margin-top:8px;padding:9px 12px;background:var(--bg);border-radius:9px;line-height:1.7">'+esc(w.example)+'</div>':'')+
        '<div style="margin-top:14px"><button class="sr-opt" data-q="1">😵 忘了</button><button class="sr-opt" data-q="3">🤔 模糊</button><button class="sr-opt" data-q="5">😎 记得</button></div>';
      $$("#reviewBox .sr-opt").forEach(function(b){
        b.onclick=function(){
          srReview(w, parseInt(b.getAttribute("data-q"),10)); save(); updateFishStats(); renderWordBank(); renderReviewBox();
          $("#reviewBox").insertAdjacentHTML("beforeend",'<div class="sr-summary" style="margin-top:12px">已记录「'+esc(w.word)+'」，下次间隔约 '+w.ivl+' 天。</div>');
        };
      });
    };
  }
  // ===== /🐟 =====

  // ---- Utils ----
  function esc(s){ return (s==null?"":""+s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }

  // ---- Drawer ----
  function openDrawer(){ $("#drawer").classList.add("show"); $("#overlay").classList.add("show"); }
  function closeDrawer(){ $("#drawer").classList.remove("show"); $("#overlay").classList.remove("show"); }
  $("#openDrawer").onclick=openDrawer;
  $("#closeDrawer").onclick=closeDrawer;
  $("#overlay").onclick=closeDrawer;

  $("#exportBtn").onclick=function(){
    var data={tasks:tasks,policies:policies,projects:projects,cad:cad,wordBank:wordBank,checkins:checkins,grammar:grammar,exportedAt:Date.now()};
    var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    var a=document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download="wzd-desk-backup-"+todayStr()+".json"; a.click();
    URL.revokeObjectURL(a.href);
  };
  $("#importBtn").onclick=function(){ $("#importFile").click(); };
  $("#importFile").onchange=function(e){
    var f=e.target.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      try{
        var d=JSON.parse(r.result);
        if(!confirm("导入将覆盖当前数据，确定继续？")) return;
        tasks=d.tasks||[]; policies=d.policies||[]; projects=d.projects||[]; cad=d.cad||[]; wordBank=d.wordBank||[]; checkins=d.checkins||[]; grammar=d.grammar||[];
        save(); renderAll(); alert("导入成功，共 "+tasks.length+" 任务 / "+policies.length+" 政策 / "+projects.length+" 项目 / "+cad.length+" CAD映射 / "+wordBank.length+" 单词 / 打卡"+checkins.length+"天 / 语法"+grammar.length+"条");
      }catch(err){ alert("文件解析失败，请确认是有效的备份 JSON"); }
    };
    r.readAsText(f);
  };
  $("#clearSampleBtn").onclick=function(){
    if(!confirm("仅清空预置的示例数据，你自行添加的内容会保留。确定？")) return;
    tasks=tasks.filter(function(t){return !t.seeded;});
    policies=policies.filter(function(p){return !p.seeded;});
    projects=projects.filter(function(p){return !p.seeded;});
    cad=cad.filter(function(c){return !c.seeded;});
    localStorage.removeItem(KEY_SEED);
    save(); renderAll();
    alert("已清空示例数据，你的数据保留");
  };
  $("#clearAllBtn").onclick=function(){
    if(!confirm("⚠️ 将永久清空全部任务/政策/项目数据，且无法恢复！确定？")) return;
    if(!confirm("再确认一次：所有数据将被删除。")) return;
    localStorage.removeItem(KEY_T); localStorage.removeItem(KEY_P); localStorage.removeItem(KEY_PR); localStorage.removeItem(KEY_CAD); localStorage.removeItem(KEY_WB); localStorage.removeItem(KEY_CI); localStorage.removeItem(KEY_GRAMMAR); localStorage.removeItem(KEY_SEED); localStorage.removeItem(KEY_SEED_CAD);
    tasks=[]; policies=[]; projects=[]; cad=[]; wordBank=[]; checkins=[]; grammar=[];
    save(); renderAll();
  };

  function renderAll(){ renderToday(); renderTasks(); renderPolicies(); renderProjects(); renderCad(); renderWordOfDay(); renderWordBank(); renderCheckin(); renderQuiz(); renderGram(); renderGramBank(); renderReviewBox(); updateFishStats(); }
  renderAll();
  // ===== GitHub 云同步 事件 =====
  if($("#gh-owner")){
    $("#gh-owner").value=ghOwner||"c8shakei";
    $("#gh-repo").value=ghRepo||"wzd-desk-sync";
    $("#gh-branch").value=ghBranch||"main";
    $("#gh-auto").checked=ghAuto;
  }
  $("#gh-save-cfg").onclick=ghSaveCfg;
  $("#gh-pull").onclick=function(){ ghPull(false); };
  $("#gh-push").onclick=function(){ ghPush(); };
  if(ghLastSync){ ghStatus("上次同步 "+new Date(parseInt(ghLastSync,10)).toLocaleString(),""); }
  if(ghOwner&&ghRepo&&ghToken&&ghAuto&&!ghDirty){ ghPull(true); }
  // ===== /GitHub 云同步 事件 =====
})();
