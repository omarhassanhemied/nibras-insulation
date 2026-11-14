/* main.js — منطق الصفحة. لا يحتاج تعديل؛ كل البيانات من config.js */
(function () {
  "use strict";
  var C = window.NIBRAS_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  document.documentElement.classList.add("js");

  /* ---------- أرقام الهاتف ---------- */
  function intl(num) {
    var d = String(num || "").replace(/\D/g, "");
    if (!d) return "";
    if (d.indexOf("00966") === 0) d = d.slice(2);
    if (d.indexOf("966") === 0) return d;
    if (d.charAt(0) === "0") d = d.slice(1);
    return "966" + d;
  }
  function pretty(d) { // 966556387273 -> +966 55 638 7273
    var m = d.match(/^966(\d{2})(\d{3})(\d{4})$/);
    return m ? "+966 " + m[1] + " " + m[2] + " " + m[3] : "+" + d;
  }
  var P = intl(C.phones && C.phones.primary);
  var WA = "https://wa.me/" + P;
  function waLink(text) { return WA + (text ? "?text=" + encodeURIComponent(text) : ""); }

  /* ---------- رسائل واتساب ---------- */
  var W = C.whatsapp || {};
  function buildMsg(o) {
    var L = [W.greeting || "السلام عليكم"];
    if (o.service) L.push("الخدمة المطلوبة: " + o.service);
    if (o.name) L.push("الاسم: " + o.name);
    if (o.city) L.push("المدينة/الحي: " + o.city);
    if (o.signs && o.signs.length) L.push("ألاحظ التالي:\n- " + o.signs.join("\n- "));
    if (o.details) L.push("وصف المشكلة: " + o.details);
    if (W.source) L.push(W.source);
    return L.join("\n");
  }
  function openWA(text) {
    var url = waLink(text);
    var w = window.open(url, "_blank"); // بدون noopener لأنه يُرجع null دائماً
    if (w) { try { w.opener = null; } catch (e) {} } else { window.location.href = url; }
  }

  /* ---------- تطبيق الكونفيج على الصفحة ---------- */
  var simple = W.greetingSimple || "";
  $$("[data-wa]").forEach(function (a) { a.href = waLink(simple); });
  $$("[data-call]").forEach(function (a) { a.href = "tel:+" + P; });
  $$("[data-phone-intl]").forEach(function (s) { s.textContent = pretty(P); });
  $$("[data-tagline]").forEach(function (s) { if (C.company && C.company.tagline) s.textContent = C.company.tagline; });
  $$("[data-wa-service]").forEach(function (a) {
    a.href = waLink(buildMsg({ service: a.getAttribute("data-wa-service") }));
  });
  $("#yr").textContent = new Date().getFullYear();

  // قوائم الخدمات في الفورم
  $$("select[data-services]").forEach(function (sel) {
    (C.services || []).forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.name; o.textContent = s.name; sel.appendChild(o);
    });
  });

  // المدن (تظهر فقط إن كُتبت)
  if (C.cities && C.cities.length) {
    var cl = $("#citiesLine");
    cl.textContent = "نخدم: " + C.cities.join("، ");
    cl.hidden = false;
  }
  // العنوان (فقط إن كُتب)
  if (C.address) { var fa = $("#footAddress"); fa.textContent = C.address; fa.hidden = false; }
  // الإيميل (مخفي حتى showEmail = true)
  if (C.email && C.showEmail) {
    var fe = $("#footEmail"), ea = document.createElement("a");
    ea.href = "mailto:" + C.email; ea.textContent = C.email; ea.setAttribute("dir", "ltr");
    fe.appendChild(ea); fe.hidden = false;
  }
  // السوشيال (فقط ما كُتب)
  var socialNames = { instagram: "إنستجرام", x: "X", tiktok: "تيك توك", snapchat: "سناب شات" };
  var sb = $("#socials");
  Object.keys(socialNames).forEach(function (k) {
    var u = C.social && C.social[k];
    if (!u) return;
    var a = document.createElement("a");
    a.href = u; a.target = "_blank"; a.rel = "noopener"; a.textContent = socialNames[k];
    sb.appendChild(a);
  });

  /* ---------- التتبع (يُحمَّل فقط لو المعرّف موجود) ---------- */
  var T = C.tracking || {};
  window.dataLayer = window.dataLayer || [];
  function addScript(src) { var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); }
  if (T.gtm) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    addScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(T.gtm));
  }
  if (T.ga4) {
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(T.ga4));
    window.gtag("js", new Date()); window.gtag("config", T.ga4);
  }
  if (T.metaPixel) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", T.metaPixel); window.fbq("track", "PageView");
  }
  if (T.tiktokPixel) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e; };
      ttq.load = function (e, n) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = i; ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var o = document.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = i + "?sdkid=" + e + "&lib=" + t;
        var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a);
      };
      ttq.load(T.tiktokPixel); ttq.page();
    }(window, document, "ttq");
  }
  function track(kind) {
    var map = { call: ["click_call", "Contact", "Contact"], whatsapp: ["click_whatsapp", "Contact", "Contact"], lead: ["generate_lead", "Lead", "SubmitForm"] };
    var m = map[kind]; if (!m) return;
    window.dataLayer.push({ event: m[0] });
    try { if (window.gtag && T.ga4) window.gtag("event", m[0]); } catch (e) {}
    try { if (window.fbq) window.fbq("track", m[1]); } catch (e) {}
    try { if (window.ttq) window.ttq.track(m[2]); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-track]") : null;
    if (el) track(el.getAttribute("data-track"));
  });

  /* ---------- الفورم ---------- */
  $$("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = (f.name.value || "").trim();
      var field = f.name.closest(".field"), err = $(".err", field);
      if (name.length < 2) {
        field.classList.add("bad"); err.textContent = "من فضلك اكتب اسمك"; f.name.focus(); return;
      }
      field.classList.remove("bad"); err.textContent = "";
      var msg = buildMsg({
        name: name,
        service: f.service && f.service.value,
        city: f.city && f.city.value.trim(),
        details: f.details && f.details.value.trim()
      });
      track("lead");
      openWA(msg);
    });
    form.elements.name.addEventListener("input", function () {
      var field = this.closest(".field"); field.classList.remove("bad"); $(".err", field).textContent = "";
    });
  });

  /* ---------- علامات التسرب ---------- */
  var chips = $$("#signChips .chip");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });
  $("#signSend").addEventListener("click", function () {
    var signs = chips.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; }).map(function (c) { return c.textContent.trim(); });
    openWA(buildMsg({ signs: signs }));
  });

  /* ---------- المعرض (حقيقي فقط) ---------- */
  var items = (C.gallery || []).filter(function (it) { return it.src; });
  var visible = items.slice(), cur = 0;
  var grid = $("#galGrid"), fbox = $("#galFilters");
  function media(it) { return '<img src="' + it.src + '" alt="' + it.title + '" loading="lazy">'; }
  if (items.length) {
    $("#gallery").hidden = false; $("#navGallery").hidden = false;
    items.forEach(function (it, idx) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "g-tile"; b.setAttribute("data-cat", it.cat); b.setAttribute("data-i", idx);
      b.setAttribute("aria-label", "عرض: " + it.title);
      b.innerHTML = '<div class="g-media">' + media(it) + '</div>' + (it.real ? "" : '<span class="g-badge">توضيحي</span>') + '<span class="g-cap">' + it.title + "</span>";
      grid.appendChild(b);
    });
    (C.galleryFilters || []).forEach(function (f, n) {
      if (f.id !== "all" && !items.some(function (it) { return it.cat === f.id; })) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "filter"; b.textContent = f.name; b.setAttribute("data-f", f.id);
      b.setAttribute("aria-pressed", n === 0 ? "true" : "false");
      fbox.appendChild(b);
    });
  }
  fbox.addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    $$(".filter", fbox).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    var f = b.getAttribute("data-f");
    visible = [];
    $$(".g-tile", grid).forEach(function (t) {
      var show = f === "all" || t.getAttribute("data-cat") === f;
      t.classList.toggle("hide", !show);
      if (show) visible.push(items[+t.getAttribute("data-i")]);
    });
  });

  var lb = $("#lb");
  function showLb(it) {
    var st = $("#lbStage");
    st.innerHTML = media(it);
    $("#lbTitle").textContent = it.title; $("#lbBadge").hidden = !!it.real;
    $("#lbWa").href = waLink(buildMsg({ details: "أرغب في عمل مشابه لـ: " + it.title }));
  }
  grid.addEventListener("click", function (e) {
    var t = e.target.closest(".g-tile"); if (!t) return;
    var it = items[+t.getAttribute("data-i")]; cur = visible.indexOf(it); if (cur < 0) cur = 0;
    showLb(it);
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  });
  function step(d) { if (!visible.length) return; cur = (cur + d + visible.length) % visible.length; showLb(visible[cur]); }
  $("#lbNext").addEventListener("click", function () { step(1); });
  $("#lbPrev").addEventListener("click", function () { step(-1); });
  $("#lbClose").addEventListener("click", function () { lb.close ? lb.close() : lb.removeAttribute("open"); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(1);   // RTL: السهم الأيسر = التالي
    if (e.key === "ArrowRight") step(-1);
  });

  /* ---------- آراء العملاء ---------- */
  var tg = $("#testiGrid"), tList = C.testimonials || [];
  if (tList.length) {
    $("#reviews").hidden = false;
    tList.forEach(function (t) {
      var d = document.createElement("div"); d.className = "t-card real";
      var p = document.createElement("p"); p.textContent = t.text;
      var s = document.createElement("strong"); s.textContent = t.name || "";
      d.appendChild(p); d.appendChild(s); tg.appendChild(d);
    });
  }

  /* ---------- الأسئلة (أكورديون) ---------- */
  var btns = $$(".acc-btn");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      btns.forEach(function (x) {
        x.setAttribute("aria-expanded", "false");
        $("#" + x.getAttribute("aria-controls")).classList.remove("open");
      });
      if (!open) {
        b.setAttribute("aria-expanded", "true");
        $("#" + b.getAttribute("aria-controls")).classList.add("open");
      }
    });
  });

  /* ---------- ظهور تدريجي ---------- */
  var rv = $$(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add("in"); }); }
})();
