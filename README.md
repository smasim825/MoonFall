# 🌕 MoonFall - Lunar Surface Mission Trainer

**Team Name:** Chandrapath  
**Event:** NASA Space Apps Challenge  
**Setting:** Shackleton Rim Outpost, Lunar South Pole (Year 2017 / Artemis Framework)  
**Live Deployment:** [Vercel Deployment](https://moon-fall.vercel.app/)

---

## 🚀 Executive Summary

**MoonFall** is an interactive, browser-based Lunar Outpost Survival Simulator and Junior Astronaut Mission Trainer. Set at the Moon's South Pole (Shackleton Crater Rim), players step into the role of Outpost Commander during an intense **18-hour Solar Particle Event (SPE)**. 

To keep the four-astronaut crew alive, players must manage real aerospace trade-offs across 7 critical resource streams—balancing **Oxygen**, **Water**, **Power**, **Food**, **Crew Health**, **Greenhouse Hydroponics**, and **Surface Equipment**—across 8 interconnected mission checkpoints.

---

## 🎮 Core Game Modules & Architecture

The simulator is built with native web technologies (HTML5, TailwindCSS, JavaScript ES6+, Web Audio API) structured around modular astronaut training simulations:

```
MoonFall/
├── index.html / mainbase.html     # Shackleton Rim Command Hub & Habitat Navigation
├── 1.1_power_mission.html         # Power Distribution & Stirling Generator Management
├── 2.1_daily_meal.html            # Crew Caloric Requirements & Nutrition Rationing
├── 2.2_Hydroponics.html           # Hydroponic Crop Cycles (Wheat & Spirulina)
├── 5.1_Radiation_mission.html     # Lunar Regolith Shielding & Space Weather Science
├── final_mission.html             # 18-Hour Solar Storm Campaign (8 Strategic Missions)
├── mission_progress_visual_flowchart.html # Interactive 3-Row S-Curve Campaign Architecture
├── moon_fall_1296_simulation_v4.json      # Complete 1,296-Path Monte Carlo Decision Space
└── astrobee/                      # Autonomous Free-Flying Robotic Assistant & Knowledge Base
```

---

## ⚡ The 18-Hour Solar Storm Campaign (8 Missions)

The centerpiece of the mission trainer is the 8-stage crisis progression:

| Mission | Timeline | Crisis Event | Strategic Dilemma |
| :---: | :---: | :--- | :--- |
| **M1** | `05:30` | **30-Minute Warning** | Evacuate crew immediately vs. Secure exposed rover hardware |
| **M2** | `06:00` | **The Shelter Problem** | Deep lava-tube shelter vs. Regolith wall piling vs. Water bladder shields |
| **M3** | `08:00` | **Inverter Blackout** | Cut greenhouse lighting vs. Fire backup generator vs. Habitat brownout |
| **M4** | `11:00` | **Oxygen Countdown** | Bleed emergency bottled $O_2$ vs. Run power-intensive water electrolysis |
| **M5** | `13:00` | **The Water Trap** | Tap emergency potable stores vs. Melt crater cold-trap ice vs. Ration water |
| **M6** | `16:00` | **The Last Harvest** | Flush heated nutrient brine to save crops vs. Drain loop to save power |
| **M7** | `20:00` | **The Critical Failure** | Isolate bus module 4 vs. Manual high-voltage EVA repair vs. Reroute lines |
| **M8** | `00:00` | **The Final Decision** | Remain in lockdown bunker vs. Initiate controlled base power recovery |

---

## 🔬 Mathematical Engine & Combinatorics

The campaign's decision engine is completely modeled and precomputed across the entire decision space:

$$\text{M1}(2) \times \text{M2}(3) \times \text{M3}(3) \times \text{M4}(2) \times \text{M5}(3) \times \text{M6}(2) \times \text{M7}(3) \times \text{M8}(2) = \mathbf{1,296} \text{ Total Trajectories}$$

### Outcome Distribution
All 1,296 possible playthroughs are verified against realistic physical constraints:

* ⭐⭐⭐ **3 Stars (Outstanding):** **36 combinations** ($2.78\%$) — $\text{Score} \ge 66.0$. Best run: `68.43` (`A-A-A-B-B-A-B-A`).
* ⭐⭐ **2 Stars (Resilience):** **199 combinations** ($15.35\%$) — $60.0 \le \text{Score} < 66.0$.
* ⭐ **1 Star (Marginal Survival):** **157 combinations** ($12.11\%$) — $50.0 \le \text{Score} < 60.0$.
* 💀 **Critical Failures:** **904 combinations** ($69.75\%$) — Any resource gate breached.

### Failure Gates (Survival Thresholds)
At every checkpoint, the outpost must maintain safety margins:
$$\mathbf{R}_k[\text{Oxygen}] \ge 20\%, \quad \mathbf{R}_k[\text{Water}] \ge 20\%, \quad \text{LSI}_k = \frac{\text{O}_2 + \text{H}_2\text{O}}{2} \ge 50\%$$
$$\mathbf{R}_k[\text{Crew Health}] \ge 50\%, \quad \mathbf{R}_k[\text{Equipment}] \ge 50\%, \quad \mathbf{R}_k[\text{Power}] > 0\%$$

---

## 🧠 Real-Time Failure & Risk Prediction Algorithm

MoonFall implements a high-performance **Trie-based Prefix Matching Algorithm** that monitors player decisions in real-time ($O(1)$ lookup per decision):

$$\mathcal{F}(P_k, \mathbf{R}_k) = \begin{cases}
\mathbf{100\%}, & \text{if } \Phi(\mathbf{R}_k) = \text{FAIL} \quad \text{(Threshold Breached)} \\
\mathbf{100\%}, & \text{if } N_{\text{survive}}(P_k) = 0 \quad \text{(Inevitable Doom: 0 Winning Branches Remain)} \\
\mathbf{0\%}, & \text{if } N_3(P_k) > 0 \quad \text{(Optimal 3-Star Trajectory Maintained)} \\
\mathbf{35\%} + 25\% \times \left(\frac{N_{\text{fail}}}{N_{\text{total}}}\right), & \text{if } N_2(P_k) > 0 \quad \text{(2-Star Resilience Path)} \\
\mathbf{65\%} + 30\% \times \left(\frac{N_{\text{fail}}}{N_{\text{total}}}\right), & \text{if } N_1(P_k) > 0 \quad \text{(1-Star Marginal Path)}
\end{cases}$$

* **Early Doom Warning:** Can detect inevitable outpost collapse up to **2 missions in advance** before physical reserves hit 0.
* **Optimal Reinforcement:** As long as players follow high-efficiency science practices, their risk bar stays at **`0%`**.

---

## 🛠️ Getting Started / Local Setup

### Prerequisites
* Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
* No compilation or complex toolchains required—runs completely client-side.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/smasim825/MoonFall.git
   cd MoonFall
   ```
2. Serve the directory with any local static HTTP server (required to fetch the simulation JSON database):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
   Or using Node.js:
   ```bash
   npx serve .
   ```
3. Open your browser and navigate to:
   - **Mission Hub:** `http://localhost:8000/index.html`
   - **Solar Storm Campaign:** `http://localhost:8000/final_mission.html`
   - **Interactive Flowchart:** `http://localhost:8000/mission_progress_visual_flowchart.html`

---

## 📚 Real-World NASA / Artemis Science References

* **Lunar Regolith Radiation Shielding:** In-situ resource utilization (ISRU) using lunar dust as bulk mass attenuation against galactic cosmic rays (GCRs) and solar energetic particles (SEPs).
* **Permanently Shadowed Regions (PSRs):** Cold traps at the lunar south pole holding volatile water ice ($H_2O$) critical for drinking, hydroponics, and $O_2 / H_2$ electrolysis.
* **Closed-Loop Life Support:** NASA Environmental Control and Life Support System (ECLSS) principles modeled directly into the game's Life Support Index (LSI).
* **NASA Astrobee Robotics:** Autonomous free-flying robots aiding astronaut maintenance tasks inside human habitats.

---

## 👥 Credits

* **Team:** Chandrapath  
* **NASA Space Apps Challenge 2026**
