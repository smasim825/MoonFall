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
    bldMain: "",
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
