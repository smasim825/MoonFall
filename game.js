/**
 * Lunar Mission: Multi-Scene & Space Radiation Alert Engine
 * Vanilla JavaScript (No external libraries)
 */

(function () {
  'use strict';

  // Instant Background Asset Preloader (eliminates pop-in / render delays)
  const PRELOAD_ASSETS = [
    'assets/scene 8/image 128.webp',
    'assets/after game.webp',
    'assets/Main Base-2 1.webp',
    'assets/scene 4/space_radiation.webp',
    'assets/Earth_protection.webp',
    'assets/crossSec.webp',
    'assets/scene 8/Rakesh_Sharma_Idle.png',
    'assets/scene 8/Neil_Armstrong_Idle.png'
  ];
  PRELOAD_ASSETS.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // =========================================================================
  // Web Audio Synthesizer
  // =========================================================================
  class SoundManager {
    constructor() { this.ctx = null; }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }

    playTypewriter() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(680 + Math.random() * 140, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.035);
      } catch (e) { }
    }

    playSkipBlip() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
      } catch (e) { }
    }

    playDropBlip() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch (e) { }
    }

    playSuccessFanfare() {
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = this.ctx.currentTime + idx * 0.09;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.18, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.32);
        });
      } catch (e) { }
    }

    playEmergencyAlarm() {
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [520, 780, 520, 780].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.08, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.1);
        });
      } catch (e) { }
    }
  }

  const sound = new SoundManager();

  // =========================================================================
  // Scene Definitions
  // =========================================================================
  const SCENES = [
    {
      id: 1,
      name: "Rakesh Sharma Briefing",
      text: "Let's check the greenhouse power before heading back.",
      boxId: "dialogueBoxScene1",
      textId: "dialogueTextScene1",
      redAlarm: false,
      radiationBg: false
    },
    {
      id: 2,
      name: "Astro Bee Emergency Warning",
      text: "WARNING! Solar radiation level is rising!",
      boxId: "dialogueBoxScene2",
      textId: "dialogueTextScene2",
      redAlarm: true,
      radiationBg: false
    },
    {
      id: 3,
      name: "Rakesh Sharma Radiation Shelter Alert",
      text: "A solar storm is approaching! Unlike Earth, the Moon has no natural protection against radiation. Quick, let's get inside the radiation shelter!",
      boxId: "dialogueBoxScene3",
      textId: "dialogueTextScene3",
      redAlarm: true,
      radiationBg: false
    },
    {
      id: 4,
      name: "Space Radiation Telemetry",
      text: "Space radiation consists of tiny, energetic particles that can harm astronauts, even though we can't see them. There are two main types: Solar Particle Events (SPEs) and Galactic Cosmic Rays (GCRs).",
      boxId: "dialogueBoxScene4",
      textId: "dialogueTextScene4",
      redAlarm: true,
      radiationCard: true
    },
    {
      id: 5,
      name: "SPEs Explanation",
      text: "SPEs come from the Sun and can cause sudden radiation spikes during solar storms. That's why we must act quickly when a warning appears.",
      boxId: "dialogueBoxScene5",
      textId: "dialogueTextScene5",
      redAlarm: true,
      radiationCard: true
    },
    {
      id: 6,
      name: "GCRs Explanation",
      text: "GCRs come from beyond our Solar System. They're always present and difficult to block, even when the Sun is calm.",
      boxId: "dialogueBoxScene6",
      textId: "dialogueTextScene6",
      redAlarm: true,
      radiationCard: true
    },
    {
      id: 7,
      name: "Earth Protection",
      text: "Earth's magnetic field deflects many charged particles, and the atmosphere absorbs and deflects those particles. But the Moon lacks these natural shields, so we must build our own protection.",
      boxId: "dialogueBoxScene7",
      textId: "dialogueTextScene7",
      redAlarm: true,
      radiationCard: false,
      earthCard: true
    },
    {
      id: 8,
      name: "Radiation Shelter Briefing",
      text: "Now that we're safe inside the shelter, let's protect our shelter from radiation! Placing materials between the radiation and the crew reduces exposure.",
      boxId: "dialogueBoxScene8",
      textId: "dialogueTextScene8",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true
    },
    {
      id: 9,
      name: "Arrange Supplies",
      text: "We already have water containers, food, and other supplies. Let’s arrange them around the crew to strengthen our shield!",
      boxId: "dialogueBoxScene9",
      textId: "dialogueTextScene9",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true
    },
    {
      id: 10,
      name: "Shelter Interior Empty",
      text: "",
      boxId: null,
      textId: null,
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true,
      hideCharacters: true,
      dimShelter: true,
      autoAdvanceDelay: 750
    },
    {
      id: 11,
      name: "Shelter Mini Game",
      text: "",
      boxId: null,
      textId: null,
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true,
      hideCharacters: true,
      miniGame: true
    },
    {
      id: 12,
      name: "After Mini Game Briefing",
      text: "Excellent work, Cadet! You’ve arranged our supplies to improve the shelter’s radiation shielding. But we can do even more.",
      boxId: "dialogueBoxScene12",
      textId: "dialogueTextScene12",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true,
      shelterBg: 'assets/after game.webp',
      hideCharacters: false
    },
    {
      id: 13,
      name: "Main Base Habitat Resource Briefing",
      text: "Look outside—there’s a resource all around us that could help protect our permanent habitat. Our crew isn’t the only thing we need to protect.",
      boxId: "dialogueBoxScene13",
      textId: "dialogueTextScene13",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      shelterScene: true,
      shelterBg: 'assets/Main Base-2 1.webp',
      hasRedLayer: true,
      hideCharacters: false
    },
    {
      id: 14,
      name: "Regolith Shielding Introduction",
      text: "The Moon is covered in a loose material called lunar regolith, which we can use to provide additional radiation shielding around and over parts of our habitat.",
      boxId: "dialogueBoxScene14",
      textId: "dialogueTextScene14",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      regolithCard: true,
      regolithScene: true,
      hideCharacters: false
    },
    {
      id: 15,
      name: "Smart Engineering With Regolith",
      text: "Using regolith means we won’t have to transport every kilogram of shielding material from Earth. Remember, smart engineering is about the best use of the resources available to us!",
      boxId: "dialogueBoxScene15",
      textId: "dialogueTextScene15",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      regolithCard: true,
      regolithScene: true,
      hideCharacters: false
    },
    {
      id: 16,
      name: "Mission Complete",
      text: "Mission accomplished! Outstanding work, Cadet! Our crew and lunar habitat are safe from space radiation.",
      boxId: "dialogueBoxScene16",
      textId: "dialogueTextScene16",
      redAlarm: false,
      radiationCard: false,
      earthCard: false,
      regolithCard: false,
      regolithScene: false,
      missionComplete: true,
      hideCharacters: true
    }
  ];

  // =========================================================================
  // DOM References
  // =========================================================================
  let currentSceneIndex = 0;
  let isTyping = false;
  let typewriterTimer = null;
  let sceneAutoTimer = null;

  const redAlarmLayer = document.getElementById('redAlarmLayer');
  const radiationCardOverlay = document.getElementById('radiationCardOverlay');
  const earthCardOverlay = document.getElementById('earthCardOverlay');
  const regolithCardOverlay = document.getElementById('regolithCardOverlay');
  const missionCompleteOverlay = document.getElementById('missionCompleteOverlay');
  const btnTryAgain = document.getElementById('btnTryAgain');
  const btnHome = document.getElementById('btnHome');
  const btnNext = document.getElementById('btnNext');
  const miniGameOverlay = document.getElementById('miniGameOverlay');
  const layerBackground = document.getElementById('layerBackground');
  const layerRover = document.getElementById('layerRover');
  const layerShelter = document.getElementById('layerShelter');
  const layerBaseRed = document.getElementById('layerBaseRed');
  const shelterCharacters = document.getElementById('shelterCharacters');

  const allBoxIds = ['dialogueBoxScene1', 'dialogueBoxScene2', 'dialogueBoxScene3', 'dialogueBoxScene4', 'dialogueBoxScene5', 'dialogueBoxScene6', 'dialogueBoxScene7', 'dialogueBoxScene8', 'dialogueBoxScene9', 'dialogueBoxScene12', 'dialogueBoxScene13', 'dialogueBoxScene14', 'dialogueBoxScene15', 'dialogueBoxScene16'];
  const boxes = allBoxIds.map(id => document.getElementById(id));

  const skipBtnIds = ['skipBtn', 'skipBtnScene2', 'skipBtnScene3', 'skipBtnScene4', 'skipBtnScene5', 'skipBtnScene6', 'skipBtnScene7', 'skipBtnScene8', 'skipBtnScene9', 'skipBtnScene12', 'skipBtnScene13', 'skipBtnScene14', 'skipBtnScene15', 'skipBtnScene16'];
  const skipBtns = skipBtnIds.map(id => document.getElementById(id));

  // =========================================================================
  // Scene Switching
  // =========================================================================
  function setScene(sceneIdx) {
    if (typewriterTimer) clearInterval(typewriterTimer);
    if (sceneAutoTimer) {
      clearTimeout(sceneAutoTimer);
      sceneAutoTimer = null;
    }

    currentSceneIndex = sceneIdx;
    const scene = SCENES[sceneIdx];

    // Red alarm blink overlay (scenes 2, 3 & 4)
    if (scene.redAlarm) {
      redAlarmLayer.classList.remove('hidden');
      if (sceneIdx === 1) sound.playEmergencyAlarm();
    } else {
      redAlarmLayer.classList.add('hidden');
    }

    // Card overlays — hide both first, then show the correct one
    radiationCardOverlay.classList.add('hidden');
    earthCardOverlay.classList.add('hidden');
    if (scene.radiationCard) {
      radiationCardOverlay.classList.remove('hidden');
    } else if (scene.earthCard) {
      earthCardOverlay.classList.remove('hidden');
    }

    // Regolith Cross Section Card Overlay (Scenes 14 & 15)
    if (scene.regolithCard) {
      if (regolithCardOverlay) regolithCardOverlay.classList.remove('hidden');
    } else {
      if (regolithCardOverlay) regolithCardOverlay.classList.add('hidden');
    }

    // Mission Complete Overlay (Scene 16)
    if (scene.missionComplete) {
      if (missionCompleteOverlay) missionCompleteOverlay.classList.remove('hidden');
      layerBackground.style.opacity = '1';
      layerBackground.style.filter  = 'brightness(0.5) contrast(1.1)';
      layerRover.style.opacity      = '0';
      layerShelter.classList.add('hidden');
      if (layerBaseRed) layerBaseRed.classList.add('hidden');
      shelterCharacters.classList.add('hidden');
    } else {
      layerBackground.style.filter  = 'none';
      if (missionCompleteOverlay) missionCompleteOverlay.classList.add('hidden');
    }

    // Scene 14 & 15: Regolith lunar surface with characters and card
    if (scene.regolithScene) {
      layerBackground.style.opacity = '1';
      layerRover.style.opacity      = '0';
      layerShelter.classList.add('hidden');
      if (layerBaseRed) layerBaseRed.classList.add('hidden');
      shelterCharacters.classList.remove('hidden');
    } else if (scene.missionComplete) {
      // already handled in missionComplete branch above
    } else if (scene.shelterScene) {
      layerBackground.style.opacity = '0';
      layerRover.style.opacity      = '0';
      layerShelter.classList.remove('hidden');
      if (scene.shelterBg) {
        layerShelter.style.backgroundImage = `url('${scene.shelterBg}')`;
      } else {
        layerShelter.style.backgroundImage = "url('assets/scene 8/image 128.webp')";
      }
      if (scene.dimShelter) {
        layerShelter.style.filter = 'brightness(0.65)';
        layerShelter.style.transition = 'filter 0.5s ease';
      } else {
        layerShelter.style.filter = 'none';
      }
      if (scene.hideCharacters) {
        shelterCharacters.classList.add('hidden');
      } else {
        shelterCharacters.classList.remove('hidden');
      }

      // Scene 13: Red layer overlay over Main Base
      if (scene.hasRedLayer) {
        if (layerBaseRed) layerBaseRed.classList.remove('hidden');
      } else {
        if (layerBaseRed) layerBaseRed.classList.add('hidden');
      }
    } else {
      layerBackground.style.opacity = '1';
      layerRover.style.opacity      = '1';
      layerShelter.classList.add('hidden');
      layerShelter.style.backgroundImage = "url('assets/scene 8/image 128.webp')";
      layerShelter.style.filter = 'none';
      if (layerBaseRed) layerBaseRed.classList.add('hidden');
      shelterCharacters.classList.add('hidden');
    }

    // Scene 11: Mini Game Popup
    if (scene.miniGame) {
      if (miniGameOverlay) miniGameOverlay.classList.remove('hidden');
      setupMiniGame();
    } else {
      if (miniGameOverlay) miniGameOverlay.classList.add('hidden');
    }

    // Hide all boxes, show active one if present
    boxes.forEach(b => b && b.classList.add('hidden'));
    if (scene.boxId) {
      const activeBox = document.getElementById(scene.boxId);
      const activeTextEl = document.getElementById(scene.textId);
      if (activeBox) activeBox.classList.remove('hidden');
      if (activeTextEl) typewriterEffect(activeTextEl, scene.text);
    }

    // Auto advance if configured (e.g. Scene 10 pauses briefly, dims room, then opens mini game)
    if (scene.autoAdvanceDelay) {
      sceneAutoTimer = setTimeout(() => {
        handleSkipBtnClick();
      }, scene.autoAdvanceDelay);
    }
  }

  // =========================================================================
  // Typewriter Effect
  // =========================================================================
  function typewriterEffect(element, fullText) {
    element.textContent = '';
    isTyping = true;
    let charIndex = 0;

    typewriterTimer = setInterval(() => {
      if (charIndex < fullText.length) {
        element.textContent += fullText[charIndex];
        if (fullText[charIndex] !== ' ' && charIndex % 2 === 0) {
          sound.playTypewriter();
        }
        charIndex++;
      } else {
        clearInterval(typewriterTimer);
        isTyping = false;
      }
    }, 24);
  }

  function completeTypingInstantly() {
    if (!isTyping) return;
    clearInterval(typewriterTimer);
    const scene = SCENES[currentSceneIndex];
    if (scene && scene.textId) {
      const el = document.getElementById(scene.textId);
      if (el) el.textContent = scene.text;
    }
    isTyping = false;
  }

  // =========================================================================
  // Navigation
  // =========================================================================
  function handleSkipBtnClick() {
    sound.playSkipBlip();
    if (typewriterTimer) clearInterval(typewriterTimer);
    if (sceneAutoTimer) {
      clearTimeout(sceneAutoTimer);
      sceneAutoTimer = null;
    }
    isTyping = false;

    // Scene 4 → restart from Scene 1
    if (currentSceneIndex >= SCENES.length - 1) {
      setScene(0);
    } else {
      setScene(currentSceneIndex + 1);
    }
  }

  function handleDialogueBoxClick() {
    if (isTyping) {
      completeTypingInstantly();
    } else {
      handleSkipBtnClick();
    }
  }

  // =========================================================================
  // Scene 11: Mini Game Controller (Drag & Drop + Click-to-Place)
  // =========================================================================
  let miniGameInitialized = false;
  let selectedTraySlot = null;

  function setupMiniGame() {
    const gridCells = document.querySelectorAll('.grid-cell');
    const traySlots = document.querySelectorAll('.tray-slot');
    const readyBtn = document.getElementById('shelterReadyBtn');

    // Reset grid
    gridCells.forEach(cell => {
      cell.innerHTML = '';
      cell.classList.remove('drag-over', 'filled');
      delete cell.dataset.sourceSlot;
      delete cell.dataset.itemType;
    });

    // Reset tray
    traySlots.forEach(slot => {
      const item = slot.querySelector('.draggable-item');
      if (item) {
        item.classList.remove('used', 'selected', 'dragging');
      }
    });
    selectedTraySlot = null;

    // Reset color bars: 1, 2, 3 active, 4-12 inactive
    updateColorBars(3);

    // Hide ready button
    if (readyBtn) readyBtn.classList.add('hidden');

    if (miniGameInitialized) return;
    miniGameInitialized = true;

    // --- Drag and Drop Logic (Desktop HTML5 Drag + Mobile Touch Drag & Tap-to-Place) ---
    let draggedData = null;
    let touchGhost = null;
    let activeTouchData = null;

    traySlots.forEach(slot => {
      const item = slot.querySelector('.draggable-item');
      if (!item) return;

      // 1. Desktop HTML5 Drag Start
      item.addEventListener('dragstart', (e) => {
        if (item.classList.contains('used')) {
          e.preventDefault();
          return;
        }
        const imgEl = item.querySelector('img');
        const itemSrc = (imgEl && imgEl.getAttribute('src')) || item.dataset.src;
        draggedData = {
          slotIndex: slot.dataset.slot,
          type: item.dataset.type,
          src: itemSrc
        };
        e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
        e.dataTransfer.effectAllowed = 'copyMove';
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      // 2. Mobile Touch Drag and Tap-to-Select
      item.addEventListener('touchstart', (e) => {
        if (item.classList.contains('used')) return;
        const touch = e.touches[0];
        const imgEl = item.querySelector('img');
        const itemSrc = (imgEl && imgEl.getAttribute('src')) || item.dataset.src;

        activeTouchData = {
          slotIndex: slot.dataset.slot,
          type: item.dataset.type,
          src: itemSrc,
          startX: touch.clientX,
          startY: touch.clientY,
          hasMoved: false
        };

        if (touchGhost) { touchGhost.remove(); touchGhost = null; }
        touchGhost = item.cloneNode(true);
        touchGhost.classList.add('touch-drag-ghost');
        touchGhost.style.width = (item.offsetWidth || 50) + 'px';
        touchGhost.style.height = (item.offsetHeight || 50) + 'px';
        touchGhost.style.left = touch.clientX + 'px';
        touchGhost.style.top = touch.clientY + 'px';
        document.body.appendChild(touchGhost);
      }, { passive: true });

      item.addEventListener('touchmove', (e) => {
        if (!activeTouchData || !touchGhost) return;
        const touch = e.touches[0];
        const dx = touch.clientX - activeTouchData.startX;
        const dy = touch.clientY - activeTouchData.startY;
        if (Math.hypot(dx, dy) > 8) {
          activeTouchData.hasMoved = true;
        }

        touchGhost.style.left = touch.clientX + 'px';
        touchGhost.style.top = touch.clientY + 'px';

        const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
        const cellUnder = elUnder ? elUnder.closest('.grid-cell') : null;
        gridCells.forEach(c => c.classList.remove('drag-over'));
        if (cellUnder && !cellUnder.classList.contains('filled')) {
          cellUnder.classList.add('drag-over');
        }
      }, { passive: true });

      item.addEventListener('touchend', (e) => {
        if (!activeTouchData) return;
        const touch = e.changedTouches[0];

        if (touchGhost) {
          touchGhost.remove();
          touchGhost = null;
        }
        gridCells.forEach(c => c.classList.remove('drag-over'));

        if (!activeTouchData.hasMoved) {
          // Fast tap -> toggle selection for tap-to-place
          if (selectedTraySlot === slot.dataset.slot) {
            item.classList.remove('selected');
            selectedTraySlot = null;
          } else {
            document.querySelectorAll('.draggable-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            selectedTraySlot = slot.dataset.slot;
            sound.playSkipBlip();
          }
          activeTouchData = null;
          return;
        }

        // Drag ended -> check cell beneath finger
        const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
        const cellUnder = elUnder ? elUnder.closest('.grid-cell') : null;
        if (cellUnder && !cellUnder.classList.contains('filled')) {
          placeItemInCell(cellUnder, activeTouchData.slotIndex, activeTouchData.type, activeTouchData.src);
        }
        activeTouchData = null;
      });

      // 3. Desktop Click-to-Select
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.classList.contains('used')) return;

        if (selectedTraySlot === slot.dataset.slot) {
          item.classList.remove('selected');
          selectedTraySlot = null;
        } else {
          document.querySelectorAll('.draggable-item').forEach(el => el.classList.remove('selected'));
          item.classList.add('selected');
          selectedTraySlot = slot.dataset.slot;
          sound.playSkipBlip();
        }
      });
    });

    gridCells.forEach(cell => {
      cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (!cell.classList.contains('filled')) {
          cell.classList.add('drag-over');
        }
      });

      cell.addEventListener('dragleave', () => {
        cell.classList.remove('drag-over');
      });

      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        cell.classList.remove('drag-over');
        if (cell.classList.contains('filled')) return;

        let data = draggedData;
        try {
          const raw = e.dataTransfer.getData('text/plain');
          if (raw) data = JSON.parse(raw);
        } catch (_) {}

        if (data && data.src) {
          placeItemInCell(cell, data.slotIndex, data.type, data.src);
        }
      });

      // Tap / Click cell to place selected item or remove filled item
      const handleCellInteract = (e) => {
        e.stopPropagation();
        if (cell.classList.contains('filled')) {
          removeItemFromCell(cell);
        } else if (selectedTraySlot !== null) {
          const slot = document.querySelector(`.tray-slot[data-slot="${selectedTraySlot}"]`);
          if (slot) {
            const item = slot.querySelector('.draggable-item');
            if (item && !item.classList.contains('used')) {
              const imgEl = item.querySelector('img');
              const itemSrc = (imgEl && imgEl.getAttribute('src')) || item.dataset.src;
              placeItemInCell(cell, selectedTraySlot, item.dataset.type, itemSrc);
              item.classList.remove('selected');
              selectedTraySlot = null;
            }
          }
        }
      };

      cell.addEventListener('click', handleCellInteract);
      cell.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleCellInteract(e);
      });
    });

    if (readyBtn) {
      readyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playSuccessFanfare();
        setTimeout(() => {
          handleSkipBtnClick();
        }, 500);
      });
    }
  }

  function placeItemInCell(cell, slotIndex, type, src) {
    const slot = document.querySelector(`.tray-slot[data-slot="${slotIndex}"]`);
    if (slot) {
      const item = slot.querySelector('.draggable-item');
      if (item) item.classList.add('used');
    }

    cell.classList.add('filled');
    cell.dataset.sourceSlot = slotIndex;
    cell.dataset.itemType = type;

    const img = document.createElement('img');
    img.src = src;
    img.alt = type;
    img.className = 'placed-item';
    cell.innerHTML = '';
    cell.appendChild(img);

    sound.playDropBlip();
    checkProgress();
  }

  function removeItemFromCell(cell) {
    const slotIndex = cell.dataset.sourceSlot;
    if (slotIndex !== undefined) {
      const slot = document.querySelector(`.tray-slot[data-slot="${slotIndex}"]`);
      if (slot) {
        const item = slot.querySelector('.draggable-item');
        if (item) item.classList.remove('used');
      }
    }
    cell.classList.remove('filled');
    delete cell.dataset.sourceSlot;
    delete cell.dataset.itemType;
    cell.innerHTML = '';

    sound.playSkipBlip();
    checkProgress();
  }

  function checkProgress() {
    const filledCells = document.querySelectorAll('.grid-cell.filled').length;
    const activeBarCount = 3 + filledCells;
    updateColorBars(activeBarCount);

    const readyBtn = document.getElementById('shelterReadyBtn');
    if (readyBtn) {
      if (filledCells >= 9) {
        readyBtn.classList.remove('hidden');
        sound.playSuccessFanfare();
      } else {
        readyBtn.classList.add('hidden');
      }
    }
  }

  function updateColorBars(count) {
    const colorBars = document.querySelectorAll('.color-bar');
    colorBars.forEach(bar => {
      const barNum = parseInt(bar.dataset.bar, 10);
      if (barNum <= count) {
        bar.classList.add('active');
      } else {
        bar.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // Initialization
  // =========================================================================
  function init() {
    // Wire skip buttons
    skipBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSkipBtnClick();
        });
      }
    });

    // Dialogue box click (body area — not skip btn)
    boxes.forEach(box => {
      if (box) {
        box.addEventListener('click', (e) => {
          if (e.target.closest('.skip-btn')) return;
          handleDialogueBoxClick();
        });
      }
    });

    // Mission complete navigation buttons
    if (btnTryAgain) {
      btnTryAgain.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sound.playBeep();
        setScene(0);
      });
    }
    if (btnHome) {
      btnHome.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sound.playBeep();
        window.location.href = 'index.html';
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sound.playBeep();
        setScene(0);
      });
    }

    // Screen click for scenes with no dialogue box (e.g. Scene 10)
    const stage = document.querySelector('.scene-stage');
    if (stage) {
      stage.addEventListener('click', (e) => {
        if (e.target.closest('.dialogue-box') || e.target.closest('.skip-btn') || e.target.closest('.mini-game-board')) return;
        const scene = SCENES[currentSceneIndex];
        if (!scene || (!scene.boxId && !scene.miniGame)) {
          handleSkipBtnClick();
        }
      });
    }

    // Keyboard
    window.addEventListener('keydown', (e) => {
      const scene = SCENES[currentSceneIndex];
      if (scene && scene.miniGame) return; // Don't skip during mini game
      if ([' ', 'Enter', 'ArrowRight', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        handleSkipBtnClick();
      } else if (e.key === 'ArrowLeft') {
        if (currentSceneIndex > 0) setScene(currentSceneIndex - 1);
      } else if (e.key >= '1' && e.key <= '4') {
        setScene(parseInt(e.key, 10) - 1);
      }
    });

    // Hash-based deep linking
    const hash = window.location.hash;
    if (hash === '#scene4') setScene(3);
    else if (hash === '#scene3') setScene(2);
    else if (hash === '#scene2') setScene(1);
    else setScene(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // =========================================================================
  // Mobile Orientation & Force Horizontal Handlers
  // =========================================================================
  window.toggleForceHorizontal = function () {
    document.body.classList.toggle('force-horizontal');
    document.body.classList.add('dismiss-orient');
    const banner = document.getElementById('orientationBanner');
    if (banner) banner.style.display = 'none';
  };

  window.dismissOrientationBanner = function () {
    document.body.classList.add('dismiss-orient');
    const banner = document.getElementById('orientationBanner');
    if (banner) banner.style.display = 'none';
  };

  window.addEventListener('orientationchange', () => {
    if (window.orientation === 90 || window.orientation === -90) {
      document.body.classList.remove('force-horizontal');
      const banner = document.getElementById('orientationBanner');
      if (banner) banner.style.display = 'none';
    }
  });

})();
