(function () {
  "use strict";
  var P = window.PORTFOLIO;
  if (!P) return;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- text content ---------- */
  document.title = P.name + " | " + P.roles[0];
  if (P.photo) {
    $("#avatar").innerHTML = '<img src="' + esc(P.photo) + '" alt="Portrait of ' + esc(P.name) + '" width="280" height="280">';
  } else {
    $("#avatar").textContent = P.initials;
  }
  $("#name").textContent = P.name;
  $("#type").textContent = P.roles[0];
  $("#summary").textContent = P.summary;
  $("#copyright").textContent = "© " + new Date().getFullYear() + " " + P.name + ". Based in " + P.location + ".";
  $("#looking").innerHTML = esc(P.lookingFor) + ' Browse the code on <a href="' + esc(P.links.github) + '">my GitHub</a>.';

  /* ---------- social icons ---------- */
  var gh = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.08-1.88 3.76-3.66 3.96.29.25.54.74.54 1.49v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z"/></svg>';
  var mail = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.6 7H19.4L12 12.2zM4 9.1V17h16V9.1l-8 5.6-8-5.6z"/></svg>';
  var insta = '<svg class="stroke" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var icons =
    '<a href="' + esc(P.links.github) + '" aria-label="GitHub">' + gh + "</a>" +
    '<a href="' + esc(P.links.linkedin) + '" aria-label="LinkedIn">in</a>' +
    '<a href="' + esc(P.links.instagram) + '" aria-label="Instagram">' + insta + "</a>" +
    '<a href="mailto:' + esc(P.links.email) + '" aria-label="Email">' + mail + "</a>";
  $("#social-top").innerHTML = icons;
  $("#social-bottom").innerHTML = icons;
  var handle = P.links.instagram.replace(/\/+$/, "").split("/").pop();
  $("#contact-list").innerHTML =
    '<li><span>Email</span><a href="mailto:' + esc(P.links.email) + '">' + esc(P.links.email) + "</a></li>" +
    '<li><span>LinkedIn</span><a href="' + esc(P.links.linkedin) + '">Syed Madad Ali</a></li>' +
    '<li><span>Instagram</span><a href="' + esc(P.links.instagram) + '">@' + esc(handle) + "</a></li>" +
    '<li><span>GitHub</span><a href="' + esc(P.links.github) + '">' + esc(P.links.github.replace("https://", "")) + "</a></li>";

  /* ---------- about me + skills ---------- */
  var A = P.about;
  $("#about-text").innerHTML = A.paragraphs.map(function (t, i) { return '<p class="rv" style="--i:' + i + '">' + esc(t).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>") + "</p>"; }).join("");
  var stats = A.stats.map(function (s) {
    var v = s.of === "projects" ? P.projects.length : s.of === "experience" ? P.experience.length : s.value;
    return '<div class="stat"><b class="count" data-to="' + v + '">' + v + "</b><span>" + esc(s.label) + "</span></div>";
  }).join("");
  var facts = A.facts.map(function (f) { return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>"; }).join("");
  $("#about-facts").innerHTML = '<div class="stats-row">' + stats + "</div><dl>" + facts + "</dl>";
  $("#skills-lede").textContent = P.skillsIntro;
  $("#skill-grid").innerHTML = P.skills.map(function (s, i) {
    var chips = s.items.map(function (t, j) { return '<span class="chip" style="--j:' + j + '">' + esc(t) + "</span>"; }).join("");
    return '<div class="skill rv" style="--i:' + (i % 3) + '"><div class="top"><div class="badge">' + esc(s.icon) + "</div><div><h3>" + esc(s.title) + "</h3><p>" + esc(s.blurb) + '</p></div></div><div class="chips">' + chips + "</div></div>";
  }).join("");

  /* ---------- experience cards: 3D flip that also resizes the card ---------- */
  $("#cards").innerHTML = P.experience.map(function (e) {
    var chips = (e.tags || []).map(function (t, i) { return '<span class="chip" style="--i:' + i + '">' + esc(t) + "</span>"; }).join("");
    var items = (e.details || []).map(function (d, i) { return '<li style="--i:' + i + '">' + esc(d) + "</li>"; }).join("");
    var who = '<div class="head"><div class="badge">' + esc(e.badge) + "</div><div><h3>" + esc(e.title) + "</h3><p>" + esc(e.org) + "</p></div></div>";
    return '<div class="slot" tabindex="0"><div class="card"><div class="flipper">' +
      '<div class="face front"><div class="in">' + who +
        '<div class="peek">' + chips + "</div></div></div>" +
      '<div class="face back"><div class="in">' + who + "<ul>" + items + '</ul><div class="chips">' + chips + "</div></div></div>" +
      "</div></div></div>";
  }).join("");

  var slots = Array.prototype.slice.call(document.querySelectorAll(".slot"));
  /* the card's height animates between the height of its front and the height of its back */
  function measure() {
    slots.forEach(function (s) {
      s._h = [s.querySelector(".front .in").offsetHeight, s.querySelector(".back .in").offsetHeight];
      s.classList.add("nomotion");
      s.style.perspective = Math.round(s.offsetWidth * 7) + "px";   /* a flatter turn for wider cards, so the edge never swings over a neighbour */
      s.style.height = s._h[s.classList.contains("open") ? 1 : 0] + "px";
      void s.offsetHeight;
      s.classList.remove("nomotion");
    });
  }
  /* each card owns its space: when it grows, the row below slides down to make room, so cards never cover each other */
  function setOpen(s, on) {
    if (on) slots.forEach(function (o) { if (o !== s && o.classList.contains("open")) setOpen(o, false); });
    s.classList.add("flipping");
    clearTimeout(s._ft);
    s._ft = setTimeout(function () { s.classList.remove("flipping"); }, 1000);
    s.classList.toggle("open", on);
    s.setAttribute("aria-expanded", on ? "true" : "false");
    if (s._h) s.style.height = s._h[on ? 1 : 0] + "px";
  }
  var scrolling = false, scrollT;
  window.addEventListener("scroll", function () {
    scrolling = true; clearTimeout(scrollT);
    scrollT = setTimeout(function () { scrolling = false; }, 140);
  }, { passive: true });
  slots.forEach(function (s) {
    s.setAttribute("role", "button");
    s.setAttribute("aria-expanded", "false");
    function toggle() { setOpen(s, !s.classList.contains("open")); }
    /* mouse: the card flips while the cursor is on it and flips back when the cursor leaves */
    function hoverIn(e) {
      if (e.pointerType !== "mouse" || scrolling) return;
      clearTimeout(s._c);
      if (!s.classList.contains("open") && !s._o) s._o = setTimeout(function () { s._o = 0; setOpen(s, true); }, 60);
    }
    s.addEventListener("pointerenter", hoverIn);
    s.addEventListener("pointermove", hoverIn);
    s.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      clearTimeout(s._o); s._o = 0;
      s._c = setTimeout(function () { setOpen(s, false); }, 90);
    });
    /* touch and pen have no hover, so a tap flips the card and the next tap flips it back */
    s.addEventListener("pointerdown", function (e) { s._pt = e.pointerType; });
    s.addEventListener("click", function () { if (s._pt && s._pt !== "mouse") toggle(); });
    /* keyboard: Enter or Space flips, Escape closes */
    s.addEventListener("keydown", function (e) {
      s._pt = undefined;
      if (e.key === "Escape") setOpen(s, false);
      else if ((e.key === "Enter" || e.key === " ") && e.target === s) { e.preventDefault(); toggle(); }
    });
    s.addEventListener("focusout", function (e) { if (!s.contains(e.relatedTarget) && s._pt === undefined) setOpen(s, false); });
  });
  document.addEventListener("click", function (e) {
    slots.forEach(function (s) { if (s.classList.contains("open") && !s.contains(e.target)) setOpen(s, false); });
  });
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  var rz, relayoutHook = null;
  window.addEventListener("resize", function () {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(function () { measure(); if (relayoutHook) relayoutHook(); });
  });

  /* ---------- project previews (drawn illustrations) ---------- */
  var previews = {
    bars: '<svg viewBox="0 0 400 220" role="img" aria-label="Illustration of a bar chart"><g fill="#8B5CF6"><rect x="40" y="110" width="40" height="80" rx="4"/><rect x="100" y="70" width="40" height="120" rx="4" fill="#C084FC"/><rect x="160" y="130" width="40" height="60" rx="4"/><rect x="220" y="50" width="40" height="140" rx="4" fill="#E879F9"/><rect x="280" y="90" width="40" height="100" rx="4"/></g><path d="M30 190H350" stroke="#3A1D75"/></svg>',
    line: '<svg viewBox="0 0 400 220" role="img" aria-label="Illustration of a line chart"><path d="M30 170C80 150 110 60 170 90S260 150 300 70 350 50 370 40" fill="none" stroke="#C084FC" stroke-width="4" stroke-linecap="round"/><path d="M30 190H370" stroke="#3A1D75"/><g fill="#E879F9"><circle cx="170" cy="90" r="6"/><circle cx="300" cy="70" r="6"/></g></svg>',
    scatter: '<svg viewBox="0 0 400 220" role="img" aria-label="Illustration of a scatter plot"><g fill="#8B5CF6"><circle cx="80" cy="140" r="7"/><circle cx="100" cy="160" r="7"/><circle cx="70" cy="170" r="7"/><circle cx="95" cy="130" r="7"/></g><g fill="#C084FC"><circle cx="200" cy="70" r="7"/><circle cx="225" cy="90" r="7"/><circle cx="190" cy="95" r="7"/><circle cx="215" cy="55" r="7"/></g><g fill="#E879F9"><circle cx="310" cy="150" r="7"/><circle cx="330" cy="130" r="7"/><circle cx="300" cy="125" r="7"/><circle cx="325" cy="165" r="7"/></g></svg>',
    layout: '<svg viewBox="0 0 400 220" role="img" aria-label="Illustration of a web page layout"><rect x="30" y="20" width="340" height="30" rx="6" fill="#3A1D75"/><g fill="#1B0C38" stroke="#3A1D75"><rect x="30" y="70" width="104" height="120" rx="8"/><rect x="148" y="70" width="104" height="120" rx="8"/><rect x="266" y="70" width="104" height="120" rx="8"/></g><g fill="#8B5CF6"><rect x="44" y="84" width="76" height="46" rx="6"/><rect x="162" y="84" width="76" height="46" rx="6" fill="#C084FC"/><rect x="280" y="84" width="76" height="46" rx="6" fill="#E879F9"/></g></svg>'
  };

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  $("#project-list").innerHTML = P.projects.map(function (p, i) {
    var visual = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' preview" loading="lazy" decoding="async">'
      : previews[p.preview] || previews.layout;
    var tags = p.tags.map(function (t, j) { return '<span style="--i:' + j + '">' + esc(t) + "</span>"; }).join("");
    var links = p.links.map(function (l) { return '<a class="go" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' <span class="arr">&rarr;</span></a>'; }).join("");
    return '<article class="proj' + (i % 2 ? " flip" : "") + '">' +
      '<div class="info"><span class="num">' + pad(i + 1) + "</span><h3>" + esc(p.title) + "</h3><p>" + esc(p.description) + '</p><div class="tags">' + tags + '</div><div class="links">' + links + "</div></div>" +
      '<div class="shot-wrap"><div class="float"><a class="shot" href="' + esc(p.links[0].url) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(p.title) + ': ' + esc(p.links[0].label) + '"><header><i></i><i></i><i></i><span class="open-ico" aria-hidden="true">&#8599;</span></header>' + visual + '<span class="glare"></span></a></div></div></article>';
  }).join("");

  /* ---------- projects fly in as they scroll into view ---------- */
  function countUp(el) {
    var to = +el.getAttribute("data-to"), t0 = null;
    el.textContent = "0";
    (function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min((t - t0) / 1100, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var rows = Array.prototype.slice.call(document.querySelectorAll(".proj, .rv"));
  if (!reduce && "IntersectionObserver" in window) {
    rows.forEach(function (r) { r.classList.add("pre"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.remove("pre");
        en.target.classList.add("in-view");
        en.target.querySelectorAll(".count").forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.2 });
    rows.forEach(function (r) { io.observe(r); });
  }

  $("#more").innerHTML = '<span class="muted">More on GitHub:</span>' +
    P.more.map(function (m) { return '<a href="' + esc(m.url) + '">' + esc(m.label) + "</a>"; }).join("");

  /* ---------- typewriter for the role line ---------- */
  var el = $("#type"), w = 0, c = P.roles[0].length, deleting = true;
  if (!reduce && P.roles.length > 1) {
    setTimeout(function tick() {
      if (deleting) {
        c--;
        if (c <= 0) { deleting = false; w = (w + 1) % P.roles.length; c = 0; }
      } else {
        c++;
        if (c >= P.roles[w].length) {
          deleting = true; el.textContent = P.roles[w];
          return setTimeout(tick, 1800);
        }
      }
      el.textContent = P.roles[w].slice(0, c);
      setTimeout(tick, deleting ? 45 : 85);
    }, 3500); /* "Data Scientist" stays on screen first */
  }

  /* ---------- smooth motion engine: values glide toward their target every frame ---------- */
  function follower(cur, tgt, k, apply) {
    var running = false;
    function frame() {
      var moving = false;
      for (var key in tgt) {
        var d = tgt[key] - cur[key];
        if (Math.abs(d) > 0.005) { cur[key] += d * k; moving = true; } else { cur[key] = tgt[key]; }
      }
      apply(cur);
      if (moving) requestAnimationFrame(frame); else running = false;
    }
    return function kick() { if (!running) { running = true; requestAnimationFrame(frame); } };
  }

  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    /* eased 3D tilt, gliding spotlight and lift on cards and previews */
    document.querySelectorAll(".slot, .shot, .skill").forEach(function (n) {
      var max = n.classList.contains("slot") ? 0 : 10;   /* experience cards keep the glow but no tilt, so a turning card never swings into its neighbour */
      var lift = n.classList.contains("skill") ? -6 : 0;
      var cur = { rx: 0, ry: 0, mx: 50, my: 50, lift: 0 }, tgt = { rx: 0, ry: 0, mx: 50, my: 50, lift: 0 }, over = false;
      var kick = follower(cur, tgt, 0.13, function (c) {
        if (!over && Math.abs(c.rx) + Math.abs(c.ry) + Math.abs(c.lift) < 0.4) n.classList.remove("tilt-on");
        n.style.setProperty("--rx", c.rx.toFixed(2) + "deg");
        n.style.setProperty("--ry", c.ry.toFixed(2) + "deg");
        n.style.setProperty("--mx", c.mx.toFixed(1) + "%");
        n.style.setProperty("--my", c.my.toFixed(1) + "%");
        n.style.setProperty("--lift", c.lift.toFixed(2) + "px");
      });
      n.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { over = true; n.classList.add("tilt-on"); } });
      n.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = n.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        var still = n.classList.contains("slot") && n.classList.contains("open");
        tgt.ry = still ? 0 : x * max * 2; tgt.rx = still ? 0 : -y * max * 2; tgt.mx = (x + 0.5) * 100; tgt.my = (y + 0.5) * 100; tgt.lift = lift;
        kick();
      });
      n.addEventListener("pointerleave", function () { over = false; tgt.rx = 0; tgt.ry = 0; tgt.lift = 0; kick(); });
      if (n.classList.contains("slot")) n.addEventListener("click", function () { tgt.rx = 0; tgt.ry = 0; kick(); });
    });

    /* magnetic social icons */
    document.querySelectorAll(".icons a").forEach(function (a) {
      var cur = { x: 0, y: 0 }, tgt = { x: 0, y: 0 };
      var kick = follower(cur, tgt, 0.18, function (c) { a.style.transform = "translate(" + c.x.toFixed(2) + "px," + c.y.toFixed(2) + "px)"; });
      a.addEventListener("pointermove", function (e) {
        var r = a.getBoundingClientRect();
        tgt.x = (e.clientX - (r.left + r.width / 2)) * 0.35; tgt.y = (e.clientY - (r.top + r.height / 2)) * 0.35; kick();
      });
      a.addEventListener("pointerleave", function () { tgt.x = 0; tgt.y = 0; kick(); });
    });

    /* soft light that trails the cursor across the page */
    var aura = document.createElement("div");
    aura.className = "aura"; aura.setAttribute("aria-hidden", "true");
    document.body.appendChild(aura);
    var ac = { x: innerWidth / 2, y: innerHeight / 3 }, at = { x: ac.x, y: ac.y };
    var akick = follower(ac, at, 0.07, function (c) { aura.style.transform = "translate3d(" + c.x.toFixed(1) + "px," + c.y.toFixed(1) + "px,0)"; });
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      at.x = e.clientX; at.y = e.clientY; aura.classList.add("on"); akick();
    }, { passive: true });
  }

  /* ---------- scroll progress bar, glass menu and active section link ---------- */
  var bar = document.createElement("div");
  bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var nav = $("nav"), ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ")";
      nav.classList.toggle("scrolled", scrollY > 24);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- menu: full links on tablets, a three-line button on phones ---------- */
  var menuBtn = $("#menu-btn"), panel = $("#nav-links");
  function setMenu(on) {
    nav.classList.toggle("menu-open", on);
    menuBtn.setAttribute("aria-expanded", on ? "true" : "false");
    menuBtn.setAttribute("aria-label", on ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("menu-open")); });
  panel.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("click", function (e) { if (!nav.contains(e.target)) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  var phoneMQ = window.matchMedia("(max-width: 40rem)");
  function swapNav() {
    /* runs before the browser re-styles, so the links switch cleanly while the button pops in */
    nav.classList.add("swap");
    clearTimeout(nav._t);
    nav._t = setTimeout(function () { nav.classList.remove("swap"); }, 800);
  }
  phoneMQ.addEventListener("change", function () { setMenu(false); if (!reduce) swapNav(); });

  /* ---------- smooth re-layout when the screen size changes (FLIP: remember where things were, glide them to where they are now) ---------- */
  var layoutMQs = [phoneMQ, window.matchMedia("(max-width: 46rem)")];
  var trackSel = ".intro,.role,.sub,.about-text p,.skill,.slot,.looking,#social-top,.cluster-frame,.proj .info,.proj .shot-wrap,.more,.contact-list,#social-bottom,.form,h2.sec";
  function colCount(sel) { var e = document.querySelector(sel); return e ? getComputedStyle(e).gridTemplateColumns.split(" ").length : 0; }
  function layoutSig() { return layoutMQs.map(function (q) { return q.matches ? 1 : 0; }).join("") + "-" + colCount(".skills") + colCount(".cards") + colCount(".about"); }
  function pagePos(el) { var x = 0, y = 0, n = el; while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y }; }
  var snapPos = new Map(), snapW = innerWidth, snapSig = layoutSig();
  function snap() {
    snapPos = new Map();
    document.querySelectorAll(trackSel).forEach(function (el) { snapPos.set(el, pagePos(el)); });
    snapW = innerWidth; snapSig = layoutSig();
  }
  var snapT;
  function snapSoon(ms) { clearTimeout(snapT); snapT = setTimeout(snap, ms || 200); }
  snapSoon(400);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { snapSoon(150); });
  document.addEventListener("transitionend", function (e) { if (e.target.classList && e.target.classList.contains("slot")) snapSoon(150); });
  var softSel = ".about-text p,.role,.sub,.looking,.intro,.proj .info,.more,.contact-list,h2.sec";
  function clampPx(v) { return Math.max(-320, Math.min(320, v)); }
  relayoutHook = function () {
    var sig = layoutSig(), changed = sig !== snapSig, jump = Math.abs(innerWidth - snapW) >= 120;
    if (!reduce && (changed || jump) && snapPos.size && document.documentElement.animate) {
      var top = scrollY - 250, bottom = scrollY + innerHeight + 450, i = 0;
      snapPos.forEach(function (old, el) {
        if (!el.isConnected || el.offsetParent === null || el.closest(".pre")) return;
        var now = pagePos(el), dx = old.x - now.x, dy = old.y - now.y;
        var near = function (y) { return y > top && y < bottom; };
        if (!near(now.y) && !near(old.y)) return;
        if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
        /* text re-wraps at the new width, so it rises in softly; cards and previews glide from where they were */
        var frames = el.matches(softSel)
          ? [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "none" }]
          : [{ transform: "translate(" + clampPx(dx) + "px," + clampPx(dy) + "px)", opacity: 0.2 }, { transform: "translate(0,0)", opacity: 1 }];
        el.animate(frames, { duration: 800, delay: Math.min(i++ * 24, 320), easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
      });
      var factsEl = $("#about-facts");
      if (changed && factsEl) factsEl.animate([{ opacity: 0.2, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: 120, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
    }
    snap();
  };
  var navLinks = {};
  document.querySelectorAll("nav .links a").forEach(function (a) { navLinks[a.getAttribute("href")] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(navLinks).forEach(function (h) { navLinks[h].classList.toggle("active", h === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["about", "skills", "experience", "projects", "contact"].forEach(function (id) {
      var el = document.getElementById(id); if (el) spy.observe(el);
    });
  }

  /* ---------- contact form: checks the fields, then sends (or opens the visitor's email app) ---------- */
  var form = $("#contact-form");
  if (form) {
    var statusEl = $("#form-status"), sendBtn = form.querySelector(".send"), sendLabel = sendBtn.querySelector("span");
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
      phone: function (v) { var d = v.replace(/\D/g, ""); return /^[0-9+()\-\s]+$/.test(v.trim()) && d.length >= 7 && d.length <= 15 ? "" : "Please enter a valid contact number (7 to 15 digits)."; }
    };
    var fields = Array.prototype.slice.call(form.querySelectorAll("input")).filter(function (i) { return rules[i.name]; });
    function check(input) {
      var msg = rules[input.name](input.value), box = input.closest(".field");
      box.classList.toggle("invalid", !!msg);
      box.querySelector(".err").textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    }
    function setStatus(text, kind) { statusEl.textContent = text; statusEl.className = "status" + (kind ? " " + kind : ""); }
    fields.forEach(function (i) {
      i.addEventListener("blur", function () { if (i.value) check(i); });
      i.addEventListener("input", function () { if (i.closest(".field").classList.contains("invalid")) check(i); });
    });
    function finish(data, how) {
      form.reset();
      fields.forEach(function (i) { i.closest(".field").classList.remove("invalid"); i.closest(".field").querySelector(".err").textContent = ""; });
      sendBtn.disabled = false; sendBtn.classList.remove("loading");
      sendLabel.textContent = "Sent";
      setTimeout(function () { sendLabel.textContent = "Send"; }, 3500);
      setStatus(how === "mail"
        ? "Thanks, " + data.name + "! Your email app should open with your details ready. Press send there to finish. If nothing opened, write to " + P.links.email + "."
        : "Thank you, " + data.name + "! Your details were sent and I will get back to you soon.", "ok");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var results = fields.map(check);
      if (results.indexOf(false) !== -1) {
        setStatus("Please fix the highlighted fields.", "error");
        fields[results.indexOf(false)].focus();
        return;
      }
      if (form.elements.website && form.elements.website.value) return;
      var data = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), phone: form.elements.phone.value.trim() };
      var cfg = P.form || {};
      if (cfg.endpoint) {
        sendBtn.disabled = true; sendBtn.classList.add("loading"); sendLabel.textContent = "Sending";
        setStatus("");
        fetch(cfg.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); finish(data, "sent"); })
          .catch(function () {
            sendBtn.disabled = false; sendBtn.classList.remove("loading"); sendLabel.textContent = "Send";
            setStatus("Sorry, that did not send. Please try again, or email me at " + P.links.email + ".", "error");
          });
      } else {
        var subject = (cfg.subject || "Portfolio message from {name}").replace("{name}", data.name);
        var body = "Name: " + data.name + "\nEmail: " + data.email + "\nContact number: " + data.phone;
        var a = document.createElement("a");
        a.href = "mailto:" + P.links.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        document.body.appendChild(a); a.click(); a.remove();
        finish(data, "mail");
      }
    });
  }
})();
