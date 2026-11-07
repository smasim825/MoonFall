# MoonFall Final Mission: decision values

Made 2026-11-07 for the 8 finalized missions and their options (flowchart + "MoonFall: Final Mission story" doc).
Missions, options and story are unchanged. Only the numbers were set.

Files: `values_final.json` (numbers + reasons, for the developer), `check_values.py` (tests all 1,296 paths),
`check_output.txt` (latest test result), `build_sheet.py` (makes the JSON and these tables).

## 1. How to read the numbers

- Each number is how much a bar goes up or down in that mission because of the choice.
  The cost of the crisis itself is already inside the number, so most numbers are negative.
  A storm is a damage-control game: you choose what to protect and what to give up.
- Every option protects something the others don't and costs something the others don't (checked by script).
- Bars stay between 0 and 100. After every mission the failure gate is checked.

## 2. What 1 point means in real life

Five crew: Rookie, Rakesh Sharma, Chiaki Mukai, Sunita Williams, O₂ Commando.

| Bar | Start | 100 points = | 1 point = | Source of the scale |
|---|---|---|---|---|
| O₂ | 75 | 13.5 kg of O₂ = 3 days of air for 5 crew | 0.135 kg ≈ 43 min of air for 5 crew | 0.895 kg O₂ per person per day (NASA BVAD) |
| Water | 65 | 500 kg of clean water | 5 kg | 2.5 kg per person per day for drinking + food (NASA OCHMO-TB-027), so 5 crew use 2.5 points a day |
| Power | 75 | 100 kWh battery | 1 kWh | CO₂ scrubber 1.0 kW, water recycler 0.74 kW, oxygen maker ~5 kWh per kg O₂ |
| Food | 90 | 30 days of food for 5 crew (~360 kg) | ~3.6 kg | 2.39 kg per person per day as shipped to ISS (NASA BVAD) |
| Health | 65 | fully healthy crew | ~10 mSv of radiation (or the same amount of harm from cold, burns or tiredness) | NASA designs storm shelters to keep the crew under 250 mSv per storm (NASA-STD-3001 Vol 1) |
| Equip | 90 | all outpost hardware in working order | 1% of hardware condition | game value |
| Greenhouse | 80 | 20 m² of healthy crops | 1% of crop condition | game value; crop light and water from NASA BVAD |

**Greenhouse start (80) is new.** The flowchart's start box shows 6 bars, but the final score divides by 7.

## 3. Failure gates (unchanged)

After every mission: O₂ ≥ 20, Water ≥ 20, LSI ≥ 50, Health ≥ 50, Power > 0, Equip ≥ 50.

**LSI (Life Support Index) = (O₂ + Water + Food) ÷ 3.** The flowchart did not define it, so this is our definition.

## 4. The values, mission by mission

### M1: The 30-Minute Warning (05:30)

*Protons reach the Moon within tens of minutes of the flare; one astronaut is outside and external power gear is still switched on.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Evacuate** | Health -1, Equip -12 | Crew is inside before the storm (only a short rover drive, ~10 mSv). | Outside power gear is left switched on and gets damaged (-12). | Spacecraft are put in safe mode during radiation storms; in the Oct 2003 storms Mars Odyssey and Genesis went into safe mode. |
| **B Secure Equip** | Power -4, Health -5, Equip -2 | Outside gear is shut down safely (only -2). | Two crew stay out ~20 min longer in suits (-5 = ~50 mSv); rover and shutdown use 4 kWh. | A suit (~0.4 g/cm²) lets through about 2.5x the dose of habitat walls (Townsend 1988: 311 vs 125 rem behind 1 vs 5 g/cm²). |

### M2: The Shelter Problem (06:00)

*The storm arrives. Behind standard walls (~5 g/cm²) the crew would get ~150 mSv. Each option shows the dose that still gets through.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Deep Shelter** | Power -1, Health -6 | Cheapest option: only the shelter fans (-1); no outside work, no hardware wear, no water. | Weakest protection: ~60 mSv gets through (-6). | Inner module is about 10 g/cm² of shielding; dose-vs-shielding curve from Townsend 1988 (NASA TM-100620). |
| **B Pile Regolith** | Power -8, Health -1, Equip -8 | Best protection: only ~15 mSv gets through (-1). | Rover pushes regolith bags into place (8 kWh); abrasive dust wears seals and filters (-8). | 10 cm of regolith (1.5 g/cm³) adds 15 g/cm². Apollo dust clogged, scratched and broke seals (Gaier 2005, NASA TM-2005-213610). |
| **C Water Shield** | Water -20, Power -2, Health -3 | Good protection (~30 mSv, -3) with no hardware wear. | 100 kg of water is pumped into soft bags (2 kWh) and must be re-treated before drinking (-20). | NASA-STD-3001 Vol 1: storm shelter of 10 g/cm² water-equivalent; 10 cm of water = 100 kg per m², about one layer over the crew's torsos. |

### M3: Blackout (08:00)

*Inverters fail and the base runs on battery. Life support needs ~3 kW, the greenhouse another ~3 kW.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Greenhouse Off** | Power -10, Green -20 | Lowest battery use (-10): only life support runs. | Crops get no light or heat (-20). | Lettuce needs 16 h of light a day; each lost light hour costs about 1.5 h of growth (NASA BVAD). |
| **B Backup Power** | Power -15, Equip -8 | Everything stays on; crops are not hurt. | Uses the most energy (-15) and drains the emergency battery bank too deep (-8). | NASA battery sizing caps discharge at 80%; deeper use shortens battery life (Kleinhenz & Paz 2021). CO₂ scrubber 1.0 kW, water recycler 0.74 kW. |
| **C Brownout All** | Power -13, Health -2, Green -8 | Middle path: crops keep half their light (only -8). | Still a big battery draw (-13); cabin cools to ~18 °C and the crew sleeps badly (-2). | NASA's comfort zone is 20-25 °C. On Apollo 13 the powered-down cabin got so cold that sleep was hard. |

### M4: Oxygen Countdown (11:00)

*The oxygen reserve is falling: 5 crew breathe about 4.5 kg of O₂ a day.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Bottled O2** | O₂ -3, Equip -8 | No power or water used; O₂ almost holds (-3). | The emergency cylinders are used up, so nothing is left for the next emergency (-8). | Each kg of O₂ in high-pressure tanks needs about 1.45 kg of tank (NASA BVAD). |
| **B Electrolysis** | O₂ +5, Water -1, Power -14 | Makes ~2.7 kg of fresh O₂, so the bar rises (+5). | Splitting water needs ~5 kWh per kg of O₂ (-14). The water cost is small: 3 kg (-1). | ISS oxygen generator makes up to 9.2 kg O₂/day; 1.13 kg water per kg O₂; 4.7-5.5 kWh per kg O₂ (Colozza 2020). Hydrogen comes out too and must never enter the air line. |

### M5: The Water Trap (13:00)

*Water cleaning runs at 50% because sediment clogged the filter.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Stored Potable** | Water -10, Equip +3 | No power used; the filter is cleaned properly while it rests (+3). | Uses 50 kg of stored water, 4 days of drinking for 5 crew (-10). | Each astronaut needs at least 2.5 L of water a day for drinking and food (NASA OCHMO-TB-027). |
| **B Melt Crater Ice** | Water +10, Power -15, Equip -5 | The only option that adds water (+10, ~80 kg melted). | Melting very cold ice takes ~0.19 kWh per kg (-15); sediment hits the filter again (-5). | Warm ice from about -170 °C, melt it (334 kJ/kg), warm to 20 °C: about 0.19 kWh per kg (our calculation). |
| **C Drink Priority** | Water -3, Green -10 | Crew water is safe at almost no cost (-3). | Crops get no water for the day (-10). | Lettuce uses about 2.1 kg of water per m² per day (NASA BVAD), so 20 m² needs ~42 kg a day. |

### M6: The Last Harvest (16:00)

*The nutrient pump has failed and the crops are wilting.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Restore Loop** | Water -6, Power -12, Food +6, Green +10 | Crops recover (+10) and the next harvest is saved (+6 food). | Pumps and lights need ~12 kWh; the loop needs 30 kg of water (-6). | Grow lights for 20 m² of lettuce are about 3 kW (LED, ~0.15 kW/m², from NASA BVAD values). |
| **B Abandon Crops** | Power +8, Food -8, Green -35 | Frees the greenhouse power for the night (+8). | Crops die (-35) and the next harvest is lost (-8 food). | 20 m² of lettuce gives about 73 kg of fresh food per 28-day cycle (NASA BVAD yield). |

### M7: The Critical Failure (20:00)

*Power Bus Junction 4 is overheating and arcing.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Isolate Bus** | Power -3, Equip -12 | Fastest and safest; little power lost (-3). | Module 4 stays dead until a later repair (-12). | In 2012 a failed ISS power box (MBSU-1) cut 2 of 8 power channels; the station ran on about 75% power until it was fixed. |
| **B Manual Repair** | Power -10, Health -4, Equip +10 | The junction is fixed; hardware improves (+10). | Test and repair use 10 kWh; crew works near hot, smoking parts (-4). | Sunita Williams and Akihiko Hoshide replaced that ISS power box on two spacewalks in Aug-Sep 2012, after a stuck bolt. |
| **C Reroute Bus** | Power -8, Equip -3, Green -8 | Module 4 keeps working; little hardware loss (-3). | The other junction is overloaded and wastes power (-8); the greenhouse is cut first (-8). | Real power systems shed the least important loads first to keep life support running. |

### M8: The Final Decision (after the storm)

*The storm is passing, but proton levels can stay high for hours.*

| Option | Values (for the flowchart) | What you gain | What it costs | Real-world basis |
|---|---|---|---|---|
| **A Hold Shelter** | Water -2, Power -6, Health +3 | Crew rests and avoids the storm's tail (+3). | Shelter life support keeps running on battery (-6) and uses water (-2). | NOAA: a solar radiation storm can last from hours to days. |
| **B Controlled Recovery** | Power +15, Health -5, Equip +6 | Crew resets the inverters: solar power comes back (+15) and systems are repaired (+6). | Crew gets some leftover radiation while working outside (-5). | Same NOAA fact: leaving early means some extra dose. |
## 5. Final score and stars (thresholds unchanged)

Final score = (O₂ + Water + Power + Food + Health + Equip + Greenhouse) ÷ 7. The starting average is 77.1.

| Result | Rule | Share of all 1,296 paths | Example path (M1→M8) |
|---|---|---|---|
| ⭐⭐⭐ 3 stars | score ≥ 66 | 10.4% | B-B-A-A-C-A-B-B = 66.9 |
| ⭐⭐ 2 stars | score ≥ 60 | 49.6% | A-C-C-A-A-A-A-A = 62.7 |
| ⭐ 1 star | score ≥ 50 | 19.3% | B-B-A-B-A-B-A-A = 58.6 |
| ❌ Failed run | score < 50 or any gate breached | 20.7% | most failures: Health below 50 at M7–M8 |

- **Best possible run: B-B-B-B-A-A-B-B = 68.9.** It finishes with Health at exactly 50, right on the gate.
  Update the 3-star box: it says "Best: 68.4 (A-A-A-B-A-B-A)". That number does not come out of the current flowchart values.
- **Greedy play fails.** Taking the option with the biggest total each time (B-A-B-B-A-A-B-B) breaks the Health gate at M8.
  The player must watch the bars, which is the lesson the game is meant to teach.
- Health is the tightest bar (65 at the start, 50 at the gate). Many choices trade Health against Power or Equip.
- Abandon Crops (M6) never appears in a 3-star run. It is the emergency choice for when Power is about to hit zero.

## 6. What changed from the flowchart numbers, and why

I ran the flowchart's own numbers through the same test (`check_output_flowchart_original.txt`):

1. **83% of all paths got 3 stars**, so stars meant nothing. Now it is 10%.
2. **The greedy path was also the best path**, so there was no real decision. Now greedy play fails.
3. **Bottled O₂ lowered O₂ (-10)** and had no benefit. Now it holds O₂ steady and uses up the emergency cylinders.
4. **Electrolysis cost 15 water.** Real electrolysis needs only ~3 kg of water for 2.7 kg of O₂; its real cost is power. Now it is Water -1, Power -14.
5. **Shelter options gave Health +12 to +20 in the middle of a storm.** Now each shows the dose that still gets through.
   Regolith gives the best protection and Deep Shelter the least, following the shielding physics.
6. **Controlled Recovery cost power.** Going out after the storm is how the inverters get reset, so now it brings power back (+15) at a Health cost.
7. The missing Greenhouse start value (80) and the LSI definition were added.

## 7. Notes for the team

- **Mini-game penalties.** The story doc says the M1 rescue mini-game costs "Health -10" if the player is slow.
  Health has only 15 points of room, so -10 would make about 92% of runs fail.
  Make a mini-game slip cost time or score, not Health.
  (Even a -2 Health penalty raises failed runs from 21% to 30%.)
- **M8 name.** The flowchart calls M8 "The Final Decision" (Hold Shelter / Controlled Recovery).
  The story doc calls it "The Last Signal" (23:30). The values above follow the flowchart options.
- **Labels.** Values marked "game value" are our design choices, not measured facts. "Our calculation" means arithmetic from the cited numbers.
- **Fun fact for M7.** Sunita Williams, one of the game's crew, really did fix a broken ISS power box on spacewalks in 2012.

## 8. Sources

- NASA BVAD Rev 2 (Baseline Values and Assumptions Document), NASA/TP-2015-218570/REV2: O₂ use, food, crop light/water/yield, tank mass. https://ntrs.nasa.gov/citations/20210024855
- NASA OCHMO-TB-027 Water (Rev C): ≥2.5 L water per person per day.
- NASA-STD-3001 Vol 2 Rev F: comfort zone 20–25 °C.
- NASA-STD-3001 Vol 1 Rev C: storm shelter of 10 g/cm² water-equivalent on a planetary surface (Table 4.8-4); design storm kept under 250 mSv ([V1 4031]).
- Townsend, Nealy & Wilson 1988, NASA TM-100620: storm dose behind different shielding thicknesses. https://ntrs.nasa.gov/citations/19880016043
- Colozza 2020, NASA/CR-2020-220368: electrolysis energy. https://ntrs.nasa.gov/citations/20200001622
- Takada et al. 2019, ICES-2019-107: ISS oxygen generator up to 9.2 kg/day. https://ntrs.nasa.gov/citations/20190030425
- Kleinhenz & Paz 2021: maximum battery discharge 80%. https://ntrs.nasa.gov/citations/20210016820
- Gaier 2005, NASA/TM-2005-213610: Apollo lunar dust effects (clogging, abrasion, seal failures). https://ntrs.nasa.gov/citations/20050160460
- NOAA SWPC, Solar Radiation Storm: protons arrive "in just 10's of minutes or less"; storms last "hours to days". https://www.spaceweather.gov/phenomena/solar-radiation-storm
- NASA History, Apollo 13: cold cabin made sleep difficult. https://www.nasa.gov/history/apollo-13-crew-returns-safely-to-earth/
- 2012 ISS power box (MBSU-1) repair by Williams and Hoshide: https://spaceflightnow.com/news/n1208/30mbsu/ and https://www.nasaspaceflight.com/2012/09/iss-astronauts-second-eva-install-mbsu-1/
- Oct 2003 storms, spacecraft safe modes: https://en.wikipedia.org/wiki/2003_Halloween_solar_storms (secondary; the NOAA service assessment is the primary record)
