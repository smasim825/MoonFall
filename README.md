# 🌕 MoonFall: Lunar Outpost Survival Simulator
### NASA International Space Apps Challenge 2025

[![Live Demo](https://img.shields.io/badge/Demo-Play%20Online-00c853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://moonfall-blush.vercel.app/)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA%20%7C%20PC%20%7C%20Mobile-00b0ff?style=for-the-badge)](https://moonfall-blush.vercel.app/)
[![NASA Open Data](https://img.shields.io/badge/NASA%20Data-CCMC%20%7C%20OSDR%20%7C%20LSII-ff6d00?style=for-the-badge)](JUDGING_CRITERIA.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📖 Project Overview
**MoonFall** is an interactive, browser-based lunar outpost survival simulator developed for the **NASA International Space Apps Challenge**. 

Situated on the rim of the Moon's South Pole **Shackleton Crater**, players assume the role of Artemis Base Commander. When an unexpected 18-hour lunar eclipse cuts off primary solar arrays and communications with Earth, players must apply real thermodynamic and life-support flight rules to balance power, oxygen, water extraction, and radiation shielding to keep the 5-person crew alive.

---

## 🎮 Game Interface & Visual Tour

### 1. Base Operations & Mission Control
Explore the Artemis Base Camp on the Shackleton Crater rim, manage infrastructure, and choose your mission progression path.

| 🛰️ Shackleton Crater Command Center | 🚀 2-Tier Mission Selection Hub |
|:---:|:---:|
| <img src="assets/screenshots/02_lunar_base_command_center.png" width="100%" alt="Lunar Base Command Center"/> | <img src="assets/screenshots/03_mission_selection_hub.png" width="100%" alt="Mission Selection Hub"/> |
| *Real-time telemetry HUD, 4 primary base modules, and Earth uplink* | *Choose between Phase 1: Cadet Training and Phase 2: MoonFall Last Light* |

---

### 2. Cadet Training & Historical Astronaut Mentorship
Learn lunar survival systems through the guidance of real historical space pioneers representing international collaboration across NASA, JAXA, and ISRO.

| 👨‍🚀 Phase 1 Cadet Training Roster | 💬 Interactive Dialogue & Onboarding |
|:---:|:---:|
| <img src="assets/screenshots/04_cadet_missions_grid.png" width="100%" alt="Cadet Missions Grid"/> | <img src="assets/screenshots/06_character_intro_dialogue.png" width="100%" alt="Character Dialogue"/> |
| *Guides: Dr. Chiaki Mukai, Sunita Williams, Guion Bluford & Rakesh Sharma* | *Character-driven narrative introducing critical lunar outpost subsystems* |

| 📋 Astronaut Crew Manifest | 🤖 AstroBee AI Mission Copilot |
|:---:|:---:|
| <img src="assets/screenshots/05_astronaut_mentors_crew.png" width="100%" alt="Astronaut Crew Manifest"/> | <img src="assets/screenshots/14_astrobee_ai_copilot.png" width="100%" alt="AstroBee AI Copilot"/> |
| *Biographies, flight records, and contributions of each astronaut guide* | *In-game AI assistant providing real-time telemetry advice & NASA facts* |

---

### 3. Interactive STEM Engineering Missions
Every mission models authentic engineering trade-offs and thermodynamic equations rather than simple multiple-choice quizzes.

| ⚡ Power Generation & Kilopower (M1) | 🍃 Space Food System & Nutrition (M2.1) |
|:---:|:---:|
| <img src="assets/screenshots/07_power_mission_engineering.png" width="100%" alt="Power Mission"/> | <img src="assets/screenshots/08_food_nutrition_mission.png" width="100%" alt="Food Nutrition Mission"/> |
| *Solar arrays vs. Kilopower nuclear reactor power distribution* | *Balanced 2,500 kcal daily caloric intake, macro & micronutrients* |

| 🌱 Hydroponic Greenhouses & LEDs (M2.2) | 💧 ISRU Regolith Ice Extraction (M3) |
|:---:|:---:|
| <img src="assets/screenshots/09_hydroponics_growth_loop.png" width="100%" alt="Hydroponics Simulation"/> | <img src="assets/screenshots/10_isru_water_extraction.png" width="100%" alt="ISRU Water Extraction"/> |
| *Bioloop nutrient dosing, LED wavelengths, and oxygen generation* | *Thermal sublimation heating ($120^\circ\text{C}$) and cold-trap condensing* |

| 🛡️ Radiation Shielding & Regolith (M4) | 📚 NASA Open Science Research Sidebar |
|:---:|:---:|
| <img src="assets/screenshots/11_radiation_shielding_mission.png" width="100%" alt="Radiation Shielding"/> | <img src="assets/screenshots/13_nasa_scientific_dossier.png" width="100%" alt="NASA Scientific Dossier"/> |
| *Solar Particle Event mitigation and regolith barrier depth* | *Live in-game research dossier citing NASA CCMC, OSDR, and LSII data* |

---

### 4. Phase 2: MoonFall Last Light (18-Hour Emergency)
The ultimate survival trial: face 6 cascading crisis decisions during a prolonged lunar night.

| 🚨 Emergency Crisis Command Center | ❌ Threshold Breach / Outpost Failure |
|:---:|:---:|
| <img src="assets/screenshots/12_final_mission_18hr_crisis.png" width="100%" alt="18-Hour Crisis Operations"/> | <img src="assets/screenshots/18_result_critical_failure.png" width="100%" alt="Critical Mission Failure"/> |
| *18-hour countdown, cascading electrical faults, and life-support limits* | *Flight Rule gate breach triggering automated outpost evacuation* |

---

### 5. Multi-Tier Mission Results & Star Ratings
Mission outcomes dynamically grade your command performance based on resource preservation and crew health.

| ⭐⭐⭐ 3-Star Result (Outstanding) | ⭐⭐✩ 2-Star Result (Resilient) |
|:---:|:---:|
| <img src="assets/screenshots/15_result_3star_accomplished.png" width="100%" alt="3 Stars Perfect Score"/> | <img src="assets/screenshots/16_result_2star_resilient.png" width="100%" alt="2 Stars Qualified"/> |
| *Score $\ge 66.0$: All safety gates passed, pristine margins* | *Score $\ge 60.0$: Resilient crisis management, minor resource draw* |

| ⭐✩✩ 1-Star Result (Marginal) | ❌ Critical Outpost Failure |
|:---:|:---:|
| <img src="assets/screenshots/17_result_1star_marginal.png" width="100%" alt="1 Star Marginal"/> | <img src="assets/screenshots/18_result_critical_failure.png" width="100%" alt="Mission Failed Result"/> |
| *Score $\ge 50.0$: Marginal survival, immediate Earth resupply required* | *Score $< 50.0$ or Gate Breached: Outpost integrity collapsed* |

---

## 🌟 Key Features
- **Authentic Scientific Formulas**: Sublimation thermodynamics, Kilopower fission decay curves, and regolith radiation absorption.
- **Zero-Dependency Web Stack**: Built using pure HTML5, vanilla CSS3, and JavaScript running at a steady 60 FPS.
- **Progressive Web App (PWA)**: Installable directly on Windows, macOS, Android, and iOS for distraction-free landscape play with offline caching.
- **Bilingual AstroBee Assistant**: Built-in AI copilot supporting English and Bengali (বাংলা) for inclusive STEM education worldwide.

---

## 🔬 NASA Open Data Grounding
- **NASA LSII (Lunar Surface Innovation Initiative)**: Regolith water sublimation and extraction thermodynamics.
- **NASA CCMC / DONKI**: Real-world Coronal Mass Ejection (CME) and Solar Particle Event (SPE) modeling.
- **NASA OSDR (Open Science Data Repository)**: Space radiation biodosimetry and crew physiological limits (NASA-STD-3001).

For a detailed analysis of our scientific mapping and rubric alignment, please see **[JUDGING_CRITERIA.md](JUDGING_CRITERIA.md)**.

---

## 🚀 Play Online
Launch the simulation directly in your browser:
👉 **[https://moonfall-blush.vercel.app/](https://moonfall-blush.vercel.app/)**

---

## 📄 License
This project is open-source under the **[MIT License](LICENSE)**.
