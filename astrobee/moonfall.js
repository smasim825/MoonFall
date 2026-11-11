/*
 * MoonFall (HTML game) -> Astro Bee context adapter. Plain JS, no build step.
 *
 * Reads where the player is from the game's own DOM (which building is zoomed, which scene box is showing)
 * so the game files need only the two <script>/<link> tags, not code changes.
 * Load after astrobee.js:  <script src="astrobee/moonfall.js" defer></script>
 * If the game renames an element, this falls back to mission-level context and never throws.
 */
(function () {
  "use strict";
  if (!window.AstroBee) return;
  const AB = window.AstroBee;
  const $ = (id) => document.getElementById(id);
  const shown = (n) => !!n && !n.classList.contains("hidden");
  let last = "";

  function send(ctx) {
    const key = JSON.stringify(ctx);
    if (key === last) return;
    last = key;
    AB.setContext(ctx);
  }

  // ---------- Main base (index.html / mainbase.html) ----------
  const BUILDING_MISSION = {
    bldPower: "power",
    bldPlant: "food",
    bldIsru: "ice",
    bldShelter: "solar_storm",
    bldMain: "final", // Main Base dome opens the Final Mission: 18-Hour Crisis Protocol
  };

  function baseContext() {
    const zoomed = document.querySelector(".building-layer.is-zoomed");
    const missionId = zoomed ? BUILDING_MISSION[zoomed.id] || "" : "";
    const active = zoomed ? document.querySelector("#missionsWrapper .subtask-btn.active-task .subtask-label") : null;
    const ctx = {};
    if (missionId) ctx.missionId = missionId;
    if (missionId && active) ctx.subLevel = active.textContent.trim();
    return ctx;
  }

  // ---------- Radiation mission (5.1_Radiation_mission.html + game.js) ----------
  // Scene number -> knowledge-base step of the solar_storm mission card
  const SCENE_STEP = [
    [[1, 2, 3], "solar_storm.storm_alert.1"],
    [[4, 5, 6], "solar_storm.radiation_basics.1"],
    [[7], "solar_storm.radiation_basics.2"],
    [[8, 9, 10, 11, 12], "solar_storm.build_shield.1"],
    [[13, 14, 15], "solar_storm.build_shield.2"],
  ];

  function currentScene() {
    if (shown($("missionCompleteOverlay"))) return 16;
    if (shown($("miniGameOverlay"))) return 11;
    for (let n = 1; n <= 16; n++) if (shown($("dialogueBoxScene" + n))) return n;
    if (shown($("layerShelter"))) return 10; // empty shelter screen has no dialogue box
    return 0;
  }

  function missionContext() {
    const n = currentScene();
    const ctx = { missionId: "solar_storm" };
    for (const [scenes, step] of SCENE_STEP) if (scenes.includes(n)) ctx.step = step;
    return ctx;
  }

  // ---------- Power mission (1.1_power_mission.html) ----------
  // No debrief here: the power debrief scores load-shedding choices, which this page does not have yet.
  // The diagram on screen says what is being taught: solar array, battery, day/night, fission, PDU.
  function powerContext() {
    const ctx = { missionId: "power", subLevel: "Power System" };
    if (shown($("missionEndModal"))) return ctx;
    const card = shown($("diagramCardContainer")) && $("diagramCardImg") ? $("diagramCardImg").getAttribute("src") || "" : "";
    if (/fission|nuclear/i.test(card)) ctx.step = "power.balance_the_grid.2";
    else if (card) ctx.step = "power.power_system.2";
    else ctx.step = "power.power_system.1";
    return ctx;
  }

  // ---------- Final Mission (final_mission.html): 18-hour solar storm crisis ----------
  // Reads the page's own top-level state (classic-script globals: DIALOGUES, currentStep, outpostResources,
  // activeMiniTaskId) and sessionStorage choices. Any rename falls back to DOM checks and never throws.
  const FINAL_TASK_STEP = { m2_lockdown: 3, m3_pdu: 3, m4_electrolysis: 3, m5_watertrap: 3, m6_hydroponics: 3, m8_finale: 3 };
  const BAR_KEYS = ["O2", "Water", "Power", "Food", "Health", "Equip", "Greenhouse"];
  /* global DIALOGUES, currentStep, outpostResources, activeMiniTaskId, decisionHistory */
  const gameVar = (read) => { try { return read(); } catch (e) { return undefined; } };

  function finalChoices() {
    const out = {};
    let hist = null;
    try { hist = JSON.parse(sessionStorage.getItem("moonfall_decision_history") || "null"); } catch (e) { /* none */ }
    const live = gameVar(() => decisionHistory);
    for (let i = 1; i <= 8; i++) {
      const k = "m" + i;
      let v = null;
      try { v = sessionStorage.getItem(`moonfall_${k}_decision`); } catch (e) { /* storage blocked */ }
      v = v || (live && live[k]) || (hist && hist[k]);
      if (v) out[k] = String(v);
    }
    return out;
  }

  function finalBars() {
    const r = gameVar(() => outpostResources);
    if (!r || typeof r !== "object") return null;
    const b = {};
    for (const k of BAR_KEYS) {
      if (typeof r[k] !== "number") return null;
      b[k] = r[k];
    }
    return b;
  }

  function finalContext() {
    const ctx = { missionId: "final" };
    const f = { choices: finalChoices() };
    const bars = finalBars();
    if (bars) f.bars = bars;
    const dl = gameVar(() => DIALOGUES);
    const n = gameVar(() => currentStep);
    const d = Array.isArray(dl) && typeof n === "number" ? dl[n] : null;
    const m = d && /^M[1-8]$/.test(d.mission) ? "m" + d.mission.slice(1) : null;
    if (m) f.m = m;
    if (d && d.title) ctx.subLevel = String(d.title).slice(0, 80);
    const task = gameVar(() => activeMiniTaskId);

    if (shown($("missionFailureModal"))) {
      f.stage = "failed";
      ctx.step = "final.ending.2";
    } else if (shown($("finalDebriefModal"))) {
      f.stage = "debrief";
      ctx.step = "final.ending.1";
    } else if (!d || (d.mission === "M1" && d.scene === 0)) {
      // Start of the mission: the Mission Dossier opens on load and the first two lines are the briefing
      f.stage = "briefing";
      ctx.step = "final.briefing.1";
    } else if (shown($("crisisMiniTaskOverlay")) || shown($("earthUplinkTransmissionModal"))) {
      f.stage = "minitask";
      if (typeof task === "string") f.task = task;
      const tm = typeof task === "string" ? task.slice(0, 2) : m;
      if (tm && FINAL_TASK_STEP[task]) ctx.step = `final.${tm}.${FINAL_TASK_STEP[task]}`;
      else if (shown($("earthUplinkTransmissionModal"))) ctx.step = "final.m8.3";
    } else if (shown($("decisionConsequenceModal"))) {
      f.stage = "consequence";
      if (m) ctx.step = `final.${m}.2`;
    } else if (d && d.type === "decision") {
      f.stage = "decision";
      ctx.step = `final.${m}.2`;
    } else if (d && d.type === "minitask") {
      f.stage = "minitask";
      ctx.step = `final.${m}.3`;
    } else if (d && d.type === "final_debrief") {
      f.stage = "debrief";
      ctx.step = "final.ending.1";
    } else if (m) {
      f.stage = f.choices[m] ? "summary" : "advice";
      ctx.step = `final.${m}.1`;
    }
    ctx.final = f;
    return ctx;
  }

  let finalDebriefSent = "";
  function finalCheckEnd() {
    const failed = shown($("missionFailureModal"));
    const done = shown($("finalDebriefModal"));
    if (!failed && !done) {
      if (gameVar(() => currentStep) === 0) finalDebriefSent = ""; // RESTART starts a new run
      return;
    }
    const log = { choices: finalChoices() };
    const bars = finalBars();
    if (bars) log.bars = bars;
    const key = (failed ? "fail:" : "done:") + JSON.stringify(log);
    if (key === finalDebriefSent) return;
    finalDebriefSent = key;
    AB.debrief({ missionId: "final", log }, { silent: true });
  }

  let debriefed = false;
  function checkComplete() {
    const done = shown($("missionCompleteOverlay"));
    if (done && !debriefed) {
      debriefed = true;
      const cells = document.querySelectorAll("#minigameGrid .grid-cell.filled").length;
      AB.debrief({ missionId: "solar_storm", log: { shield_cells_filled: cells } }, { silent: true });
    } else if (!done && debriefed && currentScene() === 1) {
      debriefed = false; // "Try again" restarts the mission
    }
  }

  // ---------- wiring ----------
  function start() {
    let update = null;
    let watch = null;
    if ($("baseViewport")) {
      update = () => send(baseContext());
      watch = $("baseViewport");
    } else if ($("crisisMiniTaskOverlay") && $("dialogueBoxAstroBee")) {
      // Final Mission first: its page also contains a #powerStage element
      update = () => {
        send(finalContext());
        finalCheckEnd();
      };
      watch = document.body;
      setInterval(() => { try { update(); } catch (e) { /* keep the game running */ } }, 2000); // bars animate without class changes
    } else if ($("powerStage")) {
      update = () => send(powerContext());
      watch = $("powerStage");
    } else if ($("gameViewport") && $("dialogueBoxScene1")) {
      update = () => {
        send(missionContext());
        checkComplete();
      };
      watch = $("gameViewport");
    }
    if (!update) return;
    let queued = false;
    const run = () => {
      queued = false;
      try { update(); } catch (e) { /* keep the game running */ }
    };
    new MutationObserver(() => {
      if (!queued) {
        queued = true;
        setTimeout(run, 60); // not requestAnimationFrame: it pauses in hidden tabs
      }
    }).observe(watch, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] }); // childList: mainbase re-renders the mission buttons
    run();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
