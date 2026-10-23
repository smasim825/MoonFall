/*
 * Astro Bee chat widget for ChandraPath (MoonFall). Plain JS, no build step.
 *
 * Add to the Unity WebGL index.html (see unity/INTEGRATION.md):
 *   <link rel="stylesheet" href="astrobee/astrobee.css">
 *   <script src="astrobee/astrobee.js" data-api="https://astro-bee.<you>.workers.dev" defer></script>
 *
 * API used by the Unity bridge (AstroBee.jslib) or any page:
 *   AstroBee.setContext({missionId, subLevel, step, resources:{power,water,food,oxygen}, lastChoice})  (object or JSON string)
 *   AstroBee.open() / AstroBee.close() / AstroBee.toggle()
 *   AstroBee.ask("question")
 *   AstroBee.debrief({missionId, log}, {silent})   silent: don't open, mark the launcher           (object or JSON string)
 *
 * Optional script attributes: data-mount (CSS selector of the game stage to live in), data-avatar, data-badge (image paths).
 * MoonFall HTML game: see moonfall.js for how the page tells Astro Bee where the player is.
 *   AstroBee.onClose = () => {}   (default: tells Unity via SendMessage("AstroBeeBridge","OnChatClosed",""))
 */
(function () {
  "use strict";
  if (window.AstroBee && window.AstroBee._loaded) return;

  const script = document.currentScript;
  const BASE = script ? script.src.replace(/[^/]*$/, "") : "astrobee/";
  const apiAttr = (script && script.dataset.api) || "http://localhost:8787";
  const ds = (script && script.dataset) || {};
  const CFG = {
    // data-api="self": the page is served by the Astro Bee Worker itself (public demo page)
    api: (apiAttr === "self" ? location.origin : apiAttr).replace(/\/$/, ""),
    timeoutMs: 20000,
    // data-mount="#baseViewport, #gameViewport": live inside the game's 16:9 stage instead of the page corner
    mount: ds.mount || "",
    avatar: ds.avatar || BASE + "astrobee.png",
    badge: ds.badge || "",
  };

  // Names as shown in the MoonFall base menu
  const MISSIONS = {
    _base: "Main Base",
    power: "Mission 1: Power and Energy",
    food: "Mission 2: Food and Production",
    crop: "Mission 2: Food and Production",
    ice: "Mission 3: Water Production",
    solar_storm: "Mission 5: Radiation Protection",
    waste: "Waste",
  };

  const T = {
    en: {
      launch: "Ask Astro Bee",
      launchShort: "ASK",
      placeholder: "Ask me anything about your mission…",
      send: "Send",
      hello: (m) => `Hi, Junior Astronaut! I'm Astro Bee. Ask me anything about ${m}, the Moon, or what to do next.`,
      offline: "Offline answer",
      offlineNone: "I can't reach Mission Control right now and I don't have a saved answer for that. Try again in a moment!",
      error: "Hmm, my antenna glitched. Please try again.",
      busy: "Too many questions at once. Wait a minute, rookie!",
      note: "Astro Bee is an AI helper. Facts come from NASA sources; game values are made up for play.",
      live: "LIVE SUN",
      snapshot: "saved data from",
      storm: "Radiation storm",
      flare: "Latest flare",
      now: "Flare in progress",
      source: "Source",
      close: "Close chat",
      lang: "বাংলা",
    },
    bn: {
      launch: "অ্যাস্ট্রো বি-কে জিজ্ঞেস করো",
      launchShort: "প্রশ্ন",
      placeholder: "তোমার মিশন নিয়ে যেকোনো প্রশ্ন করো…",
      send: "পাঠাও",
      hello: (m) => `হ্যালো, জুনিয়র অ্যাস্ট্রোনট! আমি অ্যাস্ট্রো বি। ${m}, চাঁদ বা এরপর কী করবে, যেকোনো প্রশ্ন করো।`,
      offline: "অফলাইন উত্তর",
      offlineNone: "এখন মিশন কন্ট্রোলের সাথে যোগাযোগ হচ্ছে না, আর এই প্রশ্নের সংরক্ষিত উত্তরও নেই। একটু পরে আবার চেষ্টা করো!",
      error: "আমার অ্যান্টেনায় একটু সমস্যা হলো। আবার চেষ্টা করো।",
      busy: "একসাথে অনেক প্রশ্ন! এক মিনিট অপেক্ষা করো, রুকি!",
      note: "অ্যাস্ট্রো বি একটি এআই সহকারী। তথ্য নাসার উৎস থেকে; গেমের সংখ্যাগুলো খেলার জন্য বানানো।",
      live: "সরাসরি সূর্য",
      snapshot: "সংরক্ষিত তথ্য",
      storm: "বিকিরণ ঝড়",
      flare: "সর্বশেষ সৌর শিখা",
      now: "চলমান সৌর শিখা",
      source: "উৎস",
      close: "চ্যাট বন্ধ করো",
      lang: "English",
    },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  const state = {
    ctx: {},
    lang: store.get("astrobee.lang") === "bn" ? "bn" : "en",
    history: [],
    busy: false,
    open: false,
    mini: null,
    sugg: null,
    live: null,
    liveAt: 0,
    greeted: false,
  };

  // ---------- DOM ----------
  const el = (tag, cls, attrs) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const root = el("div", "ab-root", { id: "astrobee" });
  const launch = el("button", "ab-launch", { type: "button", "aria-label": "Open Astro Bee chat" });
  const launchImg = el("img", "", { src: CFG.avatar, alt: "" });
  const launchTxt = el("span", "ab-launch-long");
  const launchShort = el("span", "ab-launch-short");
  const alertDot = el("span", "ab-alert-dot", { "aria-hidden": "true" });
  alertDot.textContent = "!";
  launch.append(launchImg, launchTxt, launchShort, alertDot);

  const panel = el("section", "ab-panel", { role: "dialog", "aria-label": "Astro Bee chat" });
  const head = el("div", "ab-head");
  const avatar = el("img", "ab-avatar", { src: CFG.avatar, alt: "Astro Bee" });
  const title = el("div", "ab-title");
  const name = el("div", CFG.badge ? "ab-name ab-name-img" : "ab-name");
  if (CFG.badge) name.append(el("img", "", { src: CFG.badge, alt: "Astro Bee" }));
  else name.textContent = "Astro Bee";
  const sub = el("div", "ab-sub");
  title.append(name, sub);
  const langBtn = el("button", "ab-btn", { type: "button" });
  const closeBtn = el("button", "ab-btn", { type: "button" });
  closeBtn.textContent = "×";
  head.append(avatar, title, langBtn, closeBtn);

  const live = el("div", "ab-live", { "aria-live": "polite" });
  const log = el("div", "ab-log", { "aria-live": "polite" });
  const chips = el("div", "ab-chips");
  const form = el("form", "ab-form");
  const input = el("input", "ab-input", { type: "text", maxlength: "500", autocomplete: "off", "aria-label": "Your question" });
  const send = el("button", "ab-btn ab-send", { type: "submit" });
  form.append(input, send);
  const note = el("div", "ab-note");
  panel.append(head, live, log, chips, form, note);
  root.append(launch, panel);

  function applyLang() {
    const t = T[state.lang];
    launchTxt.textContent = t.launch;
    launchShort.textContent = t.launchShort;
    input.placeholder = t.placeholder;
    send.textContent = "➤";
    send.setAttribute("aria-label", t.send);
    closeBtn.setAttribute("aria-label", t.close);
    langBtn.textContent = t.lang;
    langBtn.setAttribute("aria-label", state.lang === "en" ? "Switch to Bangla" : "Switch to English");
    note.textContent = t.note;
    root.lang = state.lang === "bn" ? "bn" : "en";
  }

  // Unity WebGL listens for keys on the whole page; keep typing inside the chat box.
  ["keydown", "keyup", "keypress"].forEach((ev) => input.addEventListener(ev, (e) => {
    if (ev === "keydown" && e.key === "Escape") close(); // the panel's handler never sees it once stopped here
    e.stopPropagation();
  }));
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    e.stopPropagation();
  });
  // The HTML game also uses Space/Enter/S/arrows to skip scenes; a focused launcher must not trigger that.
  launch.addEventListener("keydown", (e) => e.stopPropagation());

  // ---------- rendering ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const stripCites = (s) => String(s || "").replace(/\s*\[\[[^\]]+\]\]/g, "").trim();

  function scroll() {
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(who, text, opts = {}) {
    const m = el("div", `ab-msg ${who === "user" ? "ab-user" : "ab-bot"}${opts.debrief ? " ab-debrief" : ""}`);
    if (opts.badge) {
      const b = el("span", "ab-badge");
      b.textContent = opts.badge;
      m.append(b, document.createElement("br"));
    }
    const body = el("span");
    m.append(body);
    log.append(m);
    const clean = stripCites(text);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (who === "user" || reduce || opts.instant) {
      body.innerHTML = escapeHtml(clean);
      addSources(m, opts.citations);
      scroll();
      return Promise.resolve(m);
    }
    return new Promise((resolve) => {
      let i = 0;
      const step = Math.max(2, Math.ceil(clean.length / 120));
      const tick = () => {
        i = Math.min(clean.length, i + step);
        body.textContent = clean.slice(0, i);
        scroll();
        if (i < clean.length) setTimeout(tick, 14);
        else {
          addSources(m, opts.citations);
          scroll();
          resolve(m);
        }
      };
      tick();
    });
  }

  function addSources(m, citations) {
    if (!citations || !citations.length) return;
    const wrap = el("div", "ab-srcs");
    for (const c of citations) {
      if (!c || !c.url) continue;
      const a = el("a", "ab-src", { href: c.url, target: "_blank", rel: "noopener noreferrer", title: c.title || c.url });
      a.textContent = `📄 ${c.publisher || "Source"}: ${c.title || c.id}`;
      wrap.append(a);
    }
    if (wrap.childNodes.length) m.append(wrap);
  }

  function thinking(on) {
    root.classList.toggle("ab-thinking", on);
    let d = log.querySelector(".ab-dots");
    if (on && !d) {
      d = el("div", "ab-msg ab-bot ab-dots", { "aria-label": "Astro Bee is thinking" });
      d.innerHTML = "<span></span><span></span><span></span>";
      log.append(d);
      scroll();
    } else if (!on && d) d.remove();
  }

  function renderChips() {
    chips.innerHTML = "";
    if (!state.sugg) return;
    const qs = (state.ctx.step && state.sugg.steps[state.ctx.step]) || state.sugg.missions[state.ctx.missionId || "_base"] || state.sugg.missions._base || [];
    for (const q of qs.slice(0, 3)) {
      const c = el("button", "ab-chip", { type: "button" });
      c.textContent = q;
      c.addEventListener("click", () => ask(q));
      chips.append(c);
    }
  }

  function renderHeader() {
    sub.textContent = MISSIONS[state.ctx.missionId] || MISSIONS._base;
  }

  // ---------- data ----------
  async function loadJson(path) {
    try {
      const r = await fetch(BASE + path, { cache: "no-store" }); // always fresh after a redeploy
      return r.ok ? await r.json() : null;
    } catch (e) {
      return null;
    }
  }

  async function ensureData() {
    if (!state.sugg) state.sugg = await loadJson("data/suggestions.json");
    if (!state.mini) state.mini = await loadJson("data/kb.min.json");
    renderChips();
  }

  async function fetchJson(path, body) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), CFG.timeoutMs);
    try {
      const r = await fetch(CFG.api + path, {
        method: body ? "POST" : "GET",
        headers: body ? { "content-type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: ctrl.signal,
      });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, data };
    } finally {
      clearTimeout(t);
    }
  }

  // Offline: keyword match against approved FAQ + fact explanations shipped with the page.
  function offlineAnswer(q) {
    if (!state.mini) return null;
    const words = (s) => new Set(String(s).toLowerCase().split(/[^a-z0-9ঀ-৿]+/).filter((w) => w.length > 2));
    const qw = words(q);
    if (!qw.size) return null;
    let best = null;
    const consider = (text, answer, src, boost) => {
      const w = words(text);
      let hit = 0;
      qw.forEach((x) => { if (w.has(x)) hit++; });
      const score = (hit / qw.size) * boost;
      if (!best || score > best.score) best = { score, answer, src };
    };
    for (const f of state.mini.faq || []) {
      if ((f.reveals || []).includes(state.ctx.step)) continue;
      consider(f.q.join(" "), f.a, null, 1.2);
    }
    for (const f of state.mini.facts || []) consider(f.id.replace(/-/g, " ") + " " + f.kid, f.kid, f.source, 1);
    return best && best.score >= 0.5 ? best : null;
  }

  // ---------- actions ----------
  async function ask(text) {
    const q = String(text || "").trim();
    if (!q || state.busy) return;
    open();
    state.busy = true;
    send.disabled = true;
    input.value = "";
    await addMsg("user", q);
    thinking(true);
    const body = { message: q, context: state.ctx, history: state.history.slice(-6), lang: state.lang };
    let answer = null;
    let opts = {};
    try {
      const { status, data } = await fetchJson("/chat", body);
      if (status === 429) answer = T[state.lang].busy;
      else if (status === 200 && data.answer) {
        answer = data.answer;
        opts = { citations: data.citations };
      } else throw new Error("bad response " + status);
    } catch (e) {
      const off = offlineAnswer(q);
      if (off) {
        answer = off.answer;
        opts = { badge: T[state.lang].offline, citations: off.src ? [off.src] : [] };
      } else answer = T[state.lang].offlineNone;
    }
    thinking(false);
    await addMsg("bot", answer, opts);
    state.history.push({ role: "user", content: q }, { role: "assistant", content: stripCites(answer) });
    state.history = state.history.slice(-6);
    state.busy = false;
    send.disabled = false;
    if (state.open) input.focus();
  }

  // opts.silent: load the debrief without opening the chat; the launcher shows a "!" until the player opens it.
  async function debrief(payload, dopts) {
    let p = payload;
    if (typeof p === "string") {
      try { p = JSON.parse(p); } catch (e) { return; }
    }
    if (!p || !p.missionId) return;
    const silent = !!(dopts && dopts.silent) && !state.open;
    if (silent) {
      ensureData();
      greet();
      root.classList.add("ab-alert");
    } else open();
    thinking(true);
    let text;
    let opts = { debrief: true };
    try {
      const { status, data } = await fetchJson("/debrief", { missionId: p.missionId, log: p.log || {}, lang: state.lang });
      if (status !== 200) throw new Error(String(status));
      text = data.debrief;
      opts.citations = data.citations;
    } catch (e) {
      text = state.lang === "bn" ? "মিশন সম্পন্ন! দারুণ কাজ, জুনিয়র অ্যাস্ট্রোনট!" : "Mission complete! Great work, Junior Astronaut!";
    }
    thinking(false);
    await addMsg("bot", text, opts);
  }

  async function refreshLive() {
    if (state.ctx.missionId !== "solar_storm") {
      live.classList.remove("ab-show");
      return;
    }
    if (!state.live || Date.now() - state.liveAt > 10 * 60 * 1000) {
      try {
        const { status, data } = await fetchJson("/spaceweather");
        if (status === 200) {
          state.live = data;
          state.liveAt = Date.now();
        }
      } catch (e) { /* keep old */ }
    }
    const d = state.live;
    if (!d || (!d.latestFlare && !d.radiationStormScale)) {
      live.classList.remove("ab-show");
      return;
    }
    const t = T[state.lang];
    const parts = [];
    if (d.latestFlare) parts.push(`${t.flare}: ${escapeHtml(d.latestFlare.class)} (${escapeHtml(String(d.latestFlare.peak).replace("T", " ").slice(0, 16))} UTC)`);
    if (d.ongoingFlare) parts.push(`${t.now}: ${escapeHtml(d.ongoingFlare.class)}`);
    if (d.radiationStormScale) parts.push(`${t.storm}: ${escapeHtml(d.radiationStormScale.scale)} (${escapeHtml(d.radiationStormScale.text)})`);
    const snap = /snapshot/.test(d.source) ? ` · ${t.snapshot} ${escapeHtml(String(d.fetched).slice(0, 10))}` : "";
    live.innerHTML = `<b>☀ ${t.live}</b>${parts.join(" · ")} · ${t.source}: <a href="${escapeHtml(d.sourceUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(d.source.replace(" (saved snapshot)", ""))}</a>${snap}`;
    live.classList.add("ab-show");
  }

  function greet() {
    if (state.greeted) return;
    state.greeted = true;
    addMsg("bot", T[state.lang].hello(MISSIONS[state.ctx.missionId] || "the outpost"), { instant: true });
  }

  function open() {
    if (!state.open) {
      state.open = true;
      root.classList.add("ab-open");
      root.classList.remove("ab-alert");
      ensureData();
      renderHeader();
      greet();
      refreshLive();
      setTimeout(() => input.focus(), 50);
    }
  }

  function close() {
    if (!state.open) return;
    state.open = false;
    root.classList.remove("ab-open");
    // Inside the game, give the keyboard back to the game (Space/Enter skip scenes) instead of the launcher.
    if (root.classList.contains("ab-in-stage")) {
      if (document.activeElement && root.contains(document.activeElement)) document.activeElement.blur();
    } else launch.focus();
    try {
      if (typeof api.onClose === "function") api.onClose();
    } catch (e) { /* ignore */ }
  }

  function setContext(c) {
    let ctx = c;
    if (typeof ctx === "string") {
      try { ctx = JSON.parse(ctx); } catch (e) { return; }
    }
    if (!ctx || typeof ctx !== "object") return;
    const prevMission = state.ctx.missionId;
    state.ctx = Object.assign({}, ctx);
    for (const k of ["missionId", "step", "subLevel", "lastChoice"]) if (!state.ctx[k]) delete state.ctx[k]; // Unity sends "" for empty
    if (state.ctx.resources) {
      const r = {};
      for (const k in state.ctx.resources) if (state.ctx.resources[k] >= 0) r[k] = state.ctx.resources[k]; // -1 = unknown
      state.ctx.resources = r;
    }
    if (prevMission !== state.ctx.missionId) state.history = [];
    renderHeader();
    renderChips();
    if (state.open) refreshLive();
  }

  // ---------- wiring ----------
  launch.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  langBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "bn" : "en";
    store.set("astrobee.lang", state.lang);
    applyLang();
    refreshLive();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ask(input.value);
  });

  const api = {
    _loaded: true,
    config: CFG,
    setContext,
    open,
    close,
    toggle: () => (state.open ? close() : open()),
    ask,
    debrief,
    onClose: () => {
      try {
        if (window.unityInstance) window.unityInstance.SendMessage("AstroBeeBridge", "OnChatClosed", "");
      } catch (e) { /* Unity not ready */ }
    },
  };
  window.AstroBee = api;

  function mount() {
    applyLang();
    if (window.__astroBeeContext) setContext(window.__astroBeeContext); // sent by Unity before we loaded
    renderHeader();
    let host = null;
    try { host = CFG.mount ? document.querySelector(CFG.mount) : null; } catch (e) { /* bad selector */ }
    if (host) root.classList.add("ab-in-stage");
    (host || document.body).appendChild(root);
    ensureData();
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
