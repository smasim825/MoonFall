# 🚀 MoonFall: Main Branch Architecture & Feature Overview

**Project Name:** MoonFall - Lunar Surface Mission  
**Team Name:** Chandrapath  
**Target Event:** NASA Space Apps Challenge 2026  
**Repository Branch:** `main` (Production Branch)  
**Deployment Target:** Vercel (`moon-fall.vercel.app`)

---

## 📌 1. Overview of the `main` Branch

The `main` branch of the MoonFall repository contains the fully integrated, production-ready **Junior Astronaut Mission Trainer**. It delivers an interactive space educational experience that combines cinematic storytelling, real historical NASA astronauts, modular engineering training simulations, and an AI-driven robotics assistant.

All applications run client-side in standard web browsers using vanilla HTML5, CSS3/TailwindCSS, JavaScript ES6+, Web Audio API, and pre-indexed JSON knowledge graphs without external server dependencies.

---

## 🏛️ 2. Core Modules Implemented on `main`

### A. Main Outpost Command Center (`index.html` / `mainbase.html`)
The central entry point and interactive exploration hub representing the **Shackleton Rim Outpost**:
* **Audio-Safe Boot Flow ("TAP TO START"):** An interactive splash overlay that complies with modern browser autoplay policies, guaranteeing unmuted audio playback upon launching the simulation.
* **Cinematic Mission Intro (`moon_journey.mp4` & `moon_journey.mp3`):** High-definition launch and translunar injection video with synchronized ambient soundtrack.
* **Interactive Outpost Tour:** A guided visual tour highlighting the functional segments of the base:
  1. *Command & Control Module*
  2. *Primary Power & Stirling Generator Array*
  3. *Hydroponics & Food Production Bay*
  4. *Habitation Quarters & Medical Bay*
  5. *Airlock & EVA Surface Equipment Depots*
* **"Meet the Crew" Modal:** Detailed biographical and role dossiers for real-world aerospace pioneers:
  * **Neil Armstrong** — Outpost Commander (Mission Lead, EVA & Radiation Safety)
  * **Dr. Chiaki Mukai** — Medical & Power Systems Specialist (First Japanese female astronaut, cardiovascular physiologist)
  * **Sunita Williams** — ECLSS & Life Support Lead (Long-duration spaceflight veteran, hydroponics and nutrition)
  * **Pragyan / Shiv Shakti** — Lunar Rover AI & Telemetry Specialist (Inspired by ISRO Chandrayaan-3)
* **2-Phase Mission Selector:** Modular interface directing players into foundational training modules or crisis simulations.

---

### B. Specialized Training Sub-Missions

#### 1. Power Distribution Mission (`1.1_power_mission.html`)
* **Instructor:** Dr. Chiaki Mukai
* **Educational Objectives:** Managing lunar day/night power cycles, balancing solar array output with nuclear Stirling generators and battery storage units (BESS).
* **Key Mechanics:** Real-time load shedding, distribution priority toggles, and avoiding habitat brownouts.
* **Assets:** Custom vector diagrams of Power Distribution Units (PDU), fission reactors, and battery arrays located in `1.1_power_mission_assest/`.

#### 2. Astronaut Daily Meal & Nutrition (`2.1_daily_meal.html`)
* **Instructor:** Sunita Williams
* **Educational Objectives:** Calculating metabolic baselines, caloric requirements, and clean water rationing during high-stress lunar EVAs.
* **Key Mechanics:** Balancing carbohydrates, proteins, fats, and hydration bladders to maintain crew physical stamina without draining habitat stores.
* **Assets:** Food trays, hydration reservoirs, and UI gauges located in `2.1_Daily_Meal/`.

#### 3. Hydroponic Greenhouse Bay (`2.2_Hydroponics.html`)
* **Instructor:** Sunita Williams
* **Educational Objectives:** Closed-loop bioproduction on the Moon using dwarf wheat crops and spirulina algae.
* **Key Mechanics:** Regulating LED photosynthetically active radiation (PAR), adjusting nutrient fluid flow, filtering toxic salts, and predicting harvest yields.
* **Assets:** Multi-stage crop growth sprites, nutrient loop schematics, and lab analysis reports located in `2.2_Hydroponics/`.

#### 4. Lunar Radiation Shielding (`5.1_Radiation_mission.html`)
* **Instructor:** Neil Armstrong
* **Educational Objectives:** Understanding the physics of Solar Energetic Particles (SEPs) and Galactic Cosmic Rays (GCRs).
* **Key Mechanics:** Evaluating mass attenuation coefficients of lunar regolith soil versus hydrogen-rich water bladders, and preparing the habitat before solar flare shockwaves arrive.

---

### C. Astrobee Autonomous Robotics Assistant (`astrobee/`)
* **Interactive Lunar Chatbot:** A fully functional terminal HUD representing NASA's free-flying Astrobee robot.
* **Search & Knowledge Base (`astrobee/data/kb.min.json`):** Pre-compiled offline knowledge graph containing hundreds of aerospace concepts, lunar geology terms, and Artemis mission protocols.
* **Smart Suggestion Engine (`astrobee/data/suggestions.json`):** Dynamic question prompts for students exploring life support, rocket staging, or orbital mechanics.

---

### D. 3D Unity WebGL Prototype Archive (`prev_idea/`)
* Contains the initial Unity WebGL build and asset pipeline, preserved as a sandbox reference for 3D physics experiments and asset compression benchmarks.

---

## 📁 3. File & Asset Inventory on `main`

```
MoonFall/ (Branch: main)
│
├── index.html                     # Primary production landing hub
├── mainbase.html                  # Core habitat exploration interface
├── 1.1_power_mission.html         # Power systems interactive module
├── 2.1_daily_meal.html            # Crew nutrition & caloric balancer
├── 2.2_Hydroponics.html           # Hydroponic greenhouse laboratory
├── 5.1_Radiation_mission.html     # Radiation shielding & storm warning
│
├── astrobee/                      # Autonomous robot assistant
│   ├── index.html                 # Astrobee standalone terminal
│   └── data/
│       ├── kb.min.json            # Compressed aerospace knowledge base
│       └── suggestions.json       # Interactive query prompts
│
├── 1.1_power_mission_assest/      # Power mission UI, poses & equipment sprites
├── 2.1_Daily_Meal/                # Food trays, water meters & character dialogue
├── 2.2_Hydroponics/               # Crop growth cycles, plant labs & filters
├── assets/                        # Shared UI icons, badges & audio clips
│
├── moon_journey.mp4               # High-definition lunar launch video
├── moon_journey.mp3               # Synchronized cinematic background audio
├── style.css                      # Global design system & theme definitions
├── vercel.json                    # Routing, MIME types & deployment config
└── prev_idea/                     # Unity WebGL build artifacts & configs
```

---

## ⚙️ 4. Technical Stack & Deployment Configuration

* **Frontend:** HTML5, Modern CSS (TailwindCSS utility classes + Custom Cyber-Lunar UI), Vanilla JavaScript ES6+.
* **Audio/Visual:** HTML5 `<video>` and `<audio>` with custom DOM event listeners to bypass strict browser autoplay restrictions.
* **Asset Optimization:** Comprehensive `.png` to `.webp` compression pass across all character poses and background plates.
* **Hosting:** Vercel with single-page rewrite rules configured in `vercel.json`.

