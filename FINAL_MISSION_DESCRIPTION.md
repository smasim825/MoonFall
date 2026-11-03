# 🌑 MoonFall: Final Mission — 18-Hour Solar Storm Survival Campaign

**Setting:** Shackleton Rim Outpost (Year 2017 / Artemis Framework)  
**Scenario:** 18-Hour Solar Particle Event (SPE) Crisis Progression  
**Companion Visual:** [`mission_progress_visual_flowchart.html`](file:///Users/smasim/Desktop/MoonFall/mission_progress_visual_flowchart.html)  
**Simulation Dataset:** [`moon_fall_1296_simulation_v4.json`](file:///Users/smasim/Desktop/MoonFall/moon_fall_1296_simulation_v4.json)

---

## 🎯 1. Overview & Visual Architecture

The **Final Mission** is an 8-stage crisis progression where the Outpost Commander must navigate a massive coronal mass ejection / solar storm striking the Lunar South Pole. 

In [`mission_progress_visual_flowchart.html`](file:///Users/smasim/Desktop/MoonFall/mission_progress_visual_flowchart.html), this entire mission is laid out in a **3-Row S-Curve (Snake / Boustrophedon) Flowchart**:

```
[START: 2017] ➔ [M1: Warning] ➔ [GATE 1] ➔ [M2: Shelter] ➔ [GATE 2] ➔ [M3: Blackout] ➔ [GATE 3]
                                                                                            │ (U-Turn 1)
[GATE 6] 🠔 [M6: Harvest] 🠔 [GATE 5] 🠔 [M5: Water] 🠔 [GATE 4] 🠔 [M4: Oxygen] 🠔────────────┘
   │ (U-Turn 2)
   └──────────➔ [M7: Bus Fault] ➔ [GATE 7] ➔ [M8: Finale] ➔ [FINAL SCORE] ➔ [STAR RATINGS]
```

* **Row 1 (Left ➔ Right):** Mission 1 to Mission 3.
* **U-Turn 1 (Right):** Smooth curved connector from Gate 3 down to Mission 4.
* **Row 2 (Right ➔ Left):** Mission 4 to Mission 6.
* **U-Turn 2 (Left):** Smooth curved connector from Gate 6 down to Mission 7.
* **Row 3 (Left ➔ Right):** Mission 7, Mission 8, Final Score Evaluator, and Star Rating Tiers.

---

## 📊 2. Initial Outpost State (Shackleton Rim 2017)

At time $T = 05:00$ (30 minutes prior to storm impact), the outpost operates with the following baseline resources:

| Resource Stream | Initial Level | Unit | Critical Threshold |
| :--- | :---: | :---: | :---: |
| **Oxygen ($O_2$)** | **75%** | Percentage | Must remain $\ge 20\%$ |
| **Water ($H_2O$)** | **65%** | Percentage | Must remain $\ge 20\%$ |
| **Power** | **75%** | Percentage | Must remain $> 0\%$ |
| **Food Stores** | **90%** | Percentage | Non-depleting reserve buffer |
| **Crew Health** | **65%** | Percentage | Must remain $\ge 50\%$ |
| **Greenhouse Hydroponics** | **90%** | Percentage | Crop health buffer |
| **Surface Equipment** | **90%** | Percentage | Must remain $\ge 50\%$ |

**Composite Metric — Life Support Index (LSI):**
$$\text{LSI} = \frac{\text{Oxygen} + \text{Water}}{2} \ge 50\%$$

---

## 🛰️ 3. Complete Mission-by-Mission Breakdown (M1 to M8)

> **Key:** The optimal choice that preserves the highest-scoring **3-Star Outstanding Path** is highlighted with **`[🩵 BEST PATH]`**.

---

### 🕒 ROW 1: MISSIONS 1 - 3 (FLOW: LEFT ➔ RIGHT)

#### Mission 1: The 30-Minute Warning
* **Timestamp:** `05:30`
* **Lead / Support:** Neil Armstrong (P1) & Pragyan AI (P4)
* **Narrative:** Earth Mission Control detects an extreme coronal mass ejection. Protons will strike Shackleton Rim in 30 minutes. Surface crews must immediately decide whether to secure equipment or seek shelter.
* **Choices:**
  * **Option A: Evacuate Immediately `[🩵 BEST PATH]`**
    * *Resource Impact:* **Crew Health +10**, **Equipment -15**
    * *Rationale:* Prioritizes human life; crew enters hardened bunker before the radiation front arrives.
  * **Option B: Secure Critical Equipment First**
    * *Resource Impact:* **Power -5**, **Crew Health -12**, **Equipment +10**
    * *Rationale:* Crew spends 20 minutes outside bolting down rovers and arrays, taking radiation exposure.
* **⚠️ FAILURE GATE 1:** Checks all survival invariants ($O_2 \ge 20\%$, $H_2O \ge 20\%$, $\text{LSI} \ge 50\%$, $\text{Health} \ge 50\%$, $\text{Power} > 0\%$, $\text{Equip} \ge 50\%$).
  * *Critical Failure Outcome:* **Evacuation Lost** (Crew radiation casualty before reaching shelter).

---

#### Mission 2: The Shelter Problem
* **Timestamp:** `06:00`
* **Lead / Support:** Neil Armstrong (P1) & Pragyan AI (P4)
* **Narrative:** The storm front hits. Radiation meters in the habitat scream as secondary neutrons penetrate the thin sunward module wall.
* **Choices:**
  * **Option A: Move to Deepest Shelter `[🩵 BEST PATH]`**
    * *Resource Impact:* **Power -3**, **Crew Health +18**, **Equipment -5**
    * *Rationale:* Crowds the crew into the deep lava-tube annex under natural lunar basalt rock.
  * **Option B: Pile Regolith on the Weak Wall**
    * *Resource Impact:* **Power -8**, **Crew Health +12**, **Equipment +5**
    * *Rationale:* Deploys the electric rover scoop to heap moon soil against the wall. Drains battery power.
  * **Option C: Use Water Containers as Shielding**
    * *Resource Impact:* **Water -15**, **Crew Health +20**
    * *Rationale:* Stacks greywater bladders on the ceiling. Hydrogen atoms absorb protons, but bladders may leak or contaminate.
* **⚠️ FAILURE GATE 2:** Checks survival invariants.
  * *Critical Failure Outcome:* **Bunker Compromised** (Shielding failure breaches crew health threshold).

---

#### Mission 3: Blackout
* **Timestamp:** `08:00`
* **Lead / Support:** Pragyan AI (P4) & Sunita Williams (P2)
* **Narrative:** Magnetic induction surges trip the primary DC/AC inverter. Solar arrays are disconnected during the storm; the base runs on emergency batteries.
* **Choices:**
  * **Option A: Shut Down Greenhouse Operations `[🩵 BEST PATH]`**
    * *Resource Impact:* **Power +15**, **Greenhouse -20**
    * *Rationale:* Cuts high-intensity LED grow lights to preserve essential battery kilowatt-hours for oxygen scrubbers.
  * **Option B: Activate Backup Stirling Generator**
    * *Resource Impact:* **Power -18**, **Greenhouse +5**, **Equipment +8**
    * *Rationale:* Cranks emergency secondary generator; saves greenhouse but burns critical auxiliary fuel.
  * **Option C: Reduce Power Outpost-Wide (Brownout)**
    * *Resource Impact:* **Power -5**, **Greenhouse -5**
    * *Rationale:* Dims habitat lighting and throttles air pumps by 40%.
* **⚠️ FAILURE GATE 3:** Checks survival invariants.
  * *Critical Failure Outcome:* **Blackout Crash** (Complete habitat power collapse).

---

### 🕒 ROW 2: MISSIONS 4 - 6 (FLOW: RIGHT ➔ LEFT)

#### Mission 4: Oxygen Countdown
* **Timestamp:** `11:00`
* **Lead / Support:** Sunita Williams (P2) & Pragyan AI (P4)
* **Narrative:** Atmospheric scrubbers report cabin oxygen dropping faster than forecast due to elevated crew respiration.
* **Choices:**
  * **Option A: Bleed Stored Emergency Oxygen**
    * *Resource Impact:* **Oxygen -10** (consumes non-renewable reserves)
    * *Rationale:* Taps high-pressure tanks. Zero power needed, but permanently burns finite emergency stores.
  * **Option B: Run Water Electrolysis `[🩵 BEST PATH]`**
    * *Resource Impact:* **Oxygen +20**, **Water -15**, **Power -20**
    * *Rationale:* Splits water into fresh $O_2$. Demands massive voltage and water, but generates fresh air.
* **⚠️ FAILURE GATE 4:** Checks survival invariants.
  * *Critical Failure Outcome:* **Asphyxiation** (Cabin $O_2 < 20\%$ or $\text{LSI} < 50\%$).
  * *Design Note:* Over **23.9% of all 1,296 paths fail right here** if players chose stored $O_2$ without adequate reserves.

---

#### Mission 5: The Water Trap
* **Timestamp:** `13:00`
* **Lead / Support:** Sunita Williams (P2) & Dr. Chiaki Mukai (P3)
* **Narrative:** Lunar dust and sediment foul recycling filter #2, cutting clean water output by half.
* **Choices:**
  * **Option A: Use Stored Purified Water**
    * *Resource Impact:* **Water -15**, **Equipment +5**
    * *Rationale:* Drains potable reserve bladders. Protects pumps but exhausts pure reserves.
  * **Option B: Melt Ice from Shadowed Crater Pocket `[🩵 BEST PATH]`**
    * *Resource Impact:* **Water +18**, **Power -15**, **Equipment -5**
    * *Rationale:* Dispatches thermal probe to permanently shadowed cold trap. Harvests clean water ice using power.
  * **Option C: Prioritize Drinking Water (Rationing)**
    * *Resource Impact:* **Water -5**, **Power +3**, **Greenhouse -10**
    * *Rationale:* Cuts irrigation to greenhouse trays to prioritize crew hydration.
* **⚠️ FAILURE GATE 5:** Checks survival invariants.
  * *Critical Failure Outcome:* **Dehydration Fatal** (Water reserves plunge below $20\%$).

---

#### Mission 6: The Last Harvest
* **Timestamp:** `16:00`
* **Lead / Support:** Dr. Chiaki Mukai (P3) & Sunita Williams (P2)
* **Narrative:** Dwarf wheat crops and spirulina algae begin wilting under unheated water and dim light.
* **Choices:**
  * **Option A: Restore Nutrient Loop Circulation `[🩵 BEST PATH]`**
    * *Resource Impact:* **Water -10**, **Power -12**, **Food +10**, **Greenhouse +20**
    * *Rationale:* Flushes hydroponics with heated brine, saving the food cycle at the cost of water and power.
  * **Option B: Abandon Greenhouse Operations**
    * *Resource Impact:* **Water +5**, **Power +12**, **Greenhouse -35**
    * *Rationale:* Drains crop loop back into base tanks to recover energy and water, completely sacrificing crops.
* **⚠️ FAILURE GATE 6:** Checks survival invariants.
  * *Critical Failure Outcome:* **Food Chain Lost** (Water reaches $<20\%$ or Power collapses to $0\%$).

---

### 🕒 ROW 3: MISSIONS 7 - 8 & FINALE (FLOW: LEFT ➔ RIGHT)

#### Mission 7: The Critical Failure
* **Timestamp:** `20:00`
* **Lead / Support:** Pragyan AI (P4) & Neil Armstrong (P1)
* **Narrative:** An explosive arc fault in Power Bus Junction 4 ruptures hardware. High-voltage lines spark uncontrollably near human compartments.
* **Choices:**
  * **Option A: Manual EVA Splice Repair `[🩵 BEST PATH]`**
    * *Resource Impact:* **Power -12**, **Crew Health -5**, **Equipment +15**
    * *Rationale:* Commander performs an emergency high-voltage splice in radiation conditions, restoring critical equipment (+15%) at the cost of power and health.
  * **Option B: Isolate Damaged Bus Module**
    * *Resource Impact:* **Power -8**, **Equipment -5**
    * *Rationale:* Cuts off module 4 from the power grid. Stabilizes baseline circuits while cutting power to damaged feeds (-8% Power, -5% Equipment).
  * **Option C: Reroute Power Through Greenhouse Lines**
    * *Resource Impact:* **Power -10**, **Greenhouse -8**
    * *Rationale:* Bypasses fault by overloading greenhouse substation, burning out grow circuits.
* **⚠️ FAILURE GATE 7:** Checks survival invariants.
  * *Critical Failure Outcome:* **Bus Explosion** (Power reaches $0\%$ or Equipment drops below $50\%$).

---

#### Mission 8: The Final Decision (Finale)
* **Timestamp:** `00:00` (18 Hours Elapsed)
* **Lead / Support:** Neil Armstrong (P1) & Sunita Williams (P2)
* **Narrative:** Space weather monitors show the radiation shockwave has passed Shackleton Rim. Battery levels are low, electronics are cold-soaked, and the crew is exhausted.
* **Choices:**
  * **Option A: Remain Sheltered in Bunker `[🩵 BEST PATH]`**
    * *Resource Impact:* **Water -2**, **Power -5**, **Crew Health +8**
    * *Rationale:* Safe lockdown until Earth confirms baseline ambient conditions. Restores crew health.
  * **Option B: Begin Controlled Base Recovery**
    * *Resource Impact:* **Water -3**, **Power -12**, **Crew Health -10**, **Equipment +10**
    * *Rationale:* Spends remaining kilowatt-hours to unfreeze external valves and reboot surface communication arrays.

---

## 🏆 4. Final Scoring & Star Rating Tiers

Once the outpost successfully survives all 8 missions, the **Outpost Survivability Score** is computed as the arithmetic mean of all 7 vital resources:

$$\text{Final Score} = \frac{\text{Oxygen} + \text{Water} + \text{Power} + \text{Food} + \text{Crew Health} + \text{Greenhouse} + \text{Equipment}}{7}$$

### Rating Tiers

```
┌────────────────────────────────────────────────────────────────────────┐
│  ⭐⭐⭐ 3 STARS — OUTSTANDING SURVIVAL (Score ≥ 66.0)                   │
│  Highest Possible: 68.43 // Optimal Sequence: A-A-A-B-B-A-B-A          │
├────────────────────────────────────────────────────────────────────────┤
│  ⭐⭐ 2 STARS — RESILIENT SURVIVAL (60.0 ≤ Score < 66.0)                │
│  Outpost stable with minor resource stress // e.g., A-A-B-A-C-A-B      │
├────────────────────────────────────────────────────────────────────────┤
│  ⭐ 1 STAR — MARGINAL SURVIVAL (50.0 ≤ Score < 60.0)                   │
│  Severe resource depletion, critical recovery needed // e.g., A-B-A-A-B│
├────────────────────────────────────────────────────────────────────────┤
│  ❌ FAILED RUN — OUTPOST LOST (Score < 50.0 OR Any Gate Breached)      │
│  Base uninhabitable, crew evacuation or life support collapse          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎲 5. Simulation Combinatorics & Probability Space

Across all $2 \times 3 \times 3 \times 2 \times 3 \times 2 \times 3 \times 2 = \mathbf{1,296}$ permutations:

| Outcome Tier | Count | % of All Paths | Gameplay Interpretation |
| :--- | :---: | :---: | :--- |
| ⭐⭐⭐ **3 Stars** | **22** | **1.70%** | Elite mastery; near-perfect aerospace resource management. |
| ⭐⭐ **2 Stars** | **172** | **13.27%** | Solid engineering trade-offs; outpost fully intact. |
| ⭐ **1 Star** | **177** | **13.66%** | Survived by a razor-thin margin. |
| 💀 **Critical Failures** | **925** | **71.37%** | Life support or power breached safety thresholds. |
| **TOTAL** | **1,296** | **100.0%** | **Win Rate: 28.63% // Failure Rate: 71.37%** |

### Where Runs Fail
* **M1–M3:** 0 failures (Initial buffers are sufficient).
* **M4 (Oxygen):** 216 failures ($23.4\%$ of all game overs).
* **M5 (Water):** 240 failures ($25.9\%$ of all game overs).
* **M6 (Greenhouse):** 216 failures ($23.4\%$ of all game overs).
* **M7 (Bus Fault):** 76 failures ($8.2\%$ of all game overs).
* **M8 (Final Decision):** 177 failures ($19.1\%$ of all game overs).
* **M8 (Finale):** 174 failures ($19.2\%$ of all game overs).

