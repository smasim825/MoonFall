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
    let missionId = zoomed ? BUILDING_MISSION[zoomed.id] || "" : "";
    const active = zoomed ? document.querySelector("#missionsWrapper .subtask-btn.active-task .subtask-label") : null;
    // The Plant building holds two tasks: 2.1 Plan Daily Meal (food) and 2.2 Hydroponics (crop)
    if (missionId === "food" && active && /hydropon/i.test(active.textContent)) missionId = "crop";
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

  // ---------- Mission 2.1 Plan Daily Meal, 2.2 Hydroponics, 3 ISRU (story pages with a scene list) ----------
  // Each page keeps its place in a top-level scene index; read it and map it to the knowledge-base step.
  /* global SCENES, scenes, currentSceneIndex, currentSceneIdx, currentMcqIndex, selectedMealId, MEAL_DATA */

  // 2.1_daily_meal.html: index into SCENES (12 scenes), then 5 quiz questions (currentMcqIndex 0-4)
  const FOOD_STEP_BY_INDEX = [
    "food.storage.1", "food.storage.2", "food.storage.2", "food.choose.1", "food.prepare.1", "food.prepare.1",
    "food.prepare.2", "food.prepare.2", "food.prepare.2", "food.eat.1", "food.eat.1", "food.quiz.q1",
  ];
  function foodContext() {
    const ctx = { missionId: "food", subLevel: "Plan Daily Meal" };
    const meal = gameVar(() => selectedMealId);
    const md = gameVar(() => MEAL_DATA);
    if (meal && md && md[meal] && md[meal].title) ctx.lastChoice = `Chose ${String(md[meal].title).replace(/\s+/g, " ")}`;
    if (shown($("missionCompleteOverlay"))) {
      ctx.step = "food.complete.1";
      return ctx;
    }
    const q = gameVar(() => currentMcqIndex);
    if (typeof q === "number" && q >= 0) {
      ctx.step = `food.quiz.q${Math.min(q, 4) + 1}`;
      return ctx;
    }
    const i = gameVar(() => currentSceneIndex);
    if (typeof i === "number" && FOOD_STEP_BY_INDEX[i]) ctx.step = FOOD_STEP_BY_INDEX[i];
    return ctx;
  }

  // 2.2_Hydroponics.html: scene ids 1-21 (id 11 is the Day 0-5 timelapse and has no scene object)
  const CROP_STEP_BY_ID = {
    1: "crop.intro.1", 2: "crop.intro.1", 3: "crop.intro.1",
    4: "crop.safety.1", 5: "crop.safety.1", 6: "crop.safety.1", 7: "crop.safety.1",
    8: "crop.grow.1", 9: "crop.grow.1", 10: "crop.grow.1",
    12: "crop.observe.day5", 13: "crop.observe.size", 14: "crop.observe.day15", 15: "crop.observe.color",
    16: "crop.observe.day23", 17: "crop.observe.stress", 18: "crop.report.study", 19: "crop.report.study",
    20: "crop.observe.growth", 21: "crop.report.end",
  };
  function cropContext() {
    const ctx = { missionId: "crop", subLevel: "Hydroponics" };
    if (shown($("missionCompleteOverlay"))) {
      ctx.step = "crop.report.end";
      return ctx;
    }
    const list = gameVar(() => scenes);
    const i = gameVar(() => currentSceneIndex);
    const sc = Array.isArray(list) && typeof i === "number" ? list[i] : null;
    if (sc && CROP_STEP_BY_ID[sc.id]) ctx.step = CROP_STEP_BY_ID[sc.id];
    return ctx;
  }

  // isru_mission.html: scene ids 1-18, plus mini-game overlays
  const ICE_STEP_BY_ID = {
    1: "ice.find_ice.1", 2: "ice.find_ice.2", 3: "ice.find_ice.2", 4: "ice.find_ice.3", 5: "ice.find_ice.3",
    6: "ice.drill.1", 7: "ice.drill.1", 8: "ice.drill.2", 9: "ice.analyze.1", 10: "ice.analyze.1", 11: "ice.analyze.1",
    12: "ice.extract.1", 13: "ice.extract.1", 14: "ice.extract.2", 15: "ice.oxygen.1", 16: "ice.oxygen.1",
    17: "ice.oxygen.2", 18: "ice.oxygen.3",
  };
  function iceContext() {
    const ctx = { missionId: "ice", subLevel: "ISRU Water & Oxygen" };
    if (shown($("missionCompleteOverlay"))) ctx.step = "ice.oxygen.3";
    else if (shown($("labPromptBackdrop"))) ctx.step = "ice.extract.1";
    else if (shown($("labSimOverlay"))) ctx.step = "ice.extract.2";
    else if (shown($("drillSimOverlay"))) ctx.step = "ice.drill.2";
    else if (shown($("siteSelectOverlay"))) ctx.step = "ice.drill.1";
    else {
      const list = gameVar(() => SCENES);
      const i = gameVar(() => currentSceneIdx);
      const sc = Array.isArray(list) && typeof i === "number" ? list[i] : null;
      if (sc && ICE_STEP_BY_ID[sc.id]) ctx.step = ICE_STEP_BY_ID[sc.id];
    }
    return ctx;
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
    let poll = false; // story pages change their scene index without always changing a class
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
    } else if ($("labSimOverlay") && $("drillSimOverlay")) {
      update = () => send(iceContext()); // Mission 3 ISRU
      watch = document.body;
      poll = true;
    } else if ($("mcqBox") && $("scene4Container")) {
      update = () => send(foodContext()); // Mission 2.1 Plan Daily Meal
      watch = document.body;
      poll = true;
    } else if ($("timelapseOverlay") && $("questionWrapper")) {
      update = () => send(cropContext()); // Mission 2.2 Hydroponics
      watch = document.body;
      poll = true;
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
    if (poll) setInterval(() => { try { update(); } catch (e) { /* keep the game running */ } }, 1500);
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
