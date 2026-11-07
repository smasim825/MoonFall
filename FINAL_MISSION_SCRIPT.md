# MoonFall: Final Mission — Script, Storyline & Mission Flow

## Overview & Personnel Structure
You are **Commander Rookie**, the newly appointed Commander of **MoonFall Outpost**, stationed on the elevated rim of Shackleton Crater near the Lunar South Pole. 
- **Commander (Player)**: Stationed in the Main Base Central Command Module. Every final decision rests on you.
- **AstroBee**: AI Companion Drone providing telemetry, urgent alerts, and operational guidance.
- **The 4 Specialists** (Provide technical reports, domain knowledge, and conflicting operational trade-offs, but never make the final decision):
  1. **Rakesh Sharma**: Crew Health & Radiation Shelter Specialist
  2. **Dr. Chiaki Mukai**: Power & Energy Lead
  3. **Sunita Williams**: Hydroponics & Nutrition Lead
  4. **Guion Bluford**: ISRU & Oxygen Extraction Specialist

---

## Prologue
**AstroBee**:  
> *"Hello Rookie! You are the newly appointed commander of MoonFall Outpost, located on the elevated rim of Shackleton Crater near the lunar south pole. You’re responsible for every final decision. The four crew members provide technical knowledge, report problems, and assist with tasks, but they never make the final decision."*

---

## Mission 1: The 30-Minute Warning (05:30)

### Scene 1
*The Commander is inside the Central Command Module reviewing the outpost's morning telemetry. Outside on the lunar surface, two crew members are conducting a water-ice inspection near the crater rim. AstroBee suddenly interrupts with flashing red alert indicators.*

* **AstroBee**:  
  > *"Good morning, Commander. I have detected an unusual solar event. Our solar observatory has identified a major Solar Particle Event. High-energy particles are approaching the Moon. Estimated arrival: 30 minutes. We must immediately activate the emergency protocol."*
* **Rakesh Sharma**:  
  > *"Commander, radiation levels are expected to increase rapidly. Anyone working outside must return to the protected habitat immediately."*
* **Dr. Chiaki Mukai**:  
  > *"Some external power equipment is still operating. If we disconnect everything without preparation, we could lose valuable infrastructure."*
* **Rakesh Sharma**:  
  > *"What is your recommendation?"*

### M1 Interactive Decision: Surface Protocol Trade-Off
The Commander must choose between crew safety or critical infrastructure preservation:
* **Option A: Evacuate** (`image 2.png`)
  * Immediate crew recall to storm shelter.
  * *Impact*: Crew Health +10, Equipment -15 (external gear unshielded).
* **Option B: Secure Equip** (`Rover.png`, `tower.png`, `Solar_Powered_Rover.png`)
  * Secure critical power towers and rovers before sealing airlock.
  * *Impact*: Power -5, Health -12, Equipment +10.
*(10-second window popup and interactive drag-and-drop rescue mini-game removed)*

---

## Mission 2: The Shelter Problem (06:00)

### Scene 2
*The rescue operation succeeds and all five crew members are safely sealed inside the habitat as the storm hits the lunar surface.*

* **AstroBee**:  
  > *"Commander! The radiation monitoring system has detected a weakness in our habitat shielding. Our standard habitat walls cannot provide sufficient protection against the incoming solar particle event. We need to reinforce the crew shelter before the radiation reaches dangerous levels."*
* **Rakesh Sharma**:  
  > *"Commander, we need additional shielding. The deepest protected section of our habitat offers better protection. We can also use regolith or water barriers to reduce radiation exposure."*
* **Sunita Williams**:  
  > *"Remember that our stored water is essential for drinking and our greenhouse. If we use too much for shielding, we could create another problem."*
* **Rakesh Sharma**:  
  > *"What is your recommendation?"*

### M2 Interactive Decision & Challenge
1. **Supply Placement**:  
   > *AstroBee: "Commander, we have loose supplies near the shelter entrance. Pick up the water container, emergency food box, and medical kit. Place each one in its matching wall bracket. We need clear pathways before lockdown!"*
2. **Hatch Lockdown**:  
   > *AstroBee: "Now secure the shelter hatch: rotate it 4 times and place on a 75-degree angle."*
3. **Environmental Verification**: Check Oxygen supply, cabin circulation, and CO₂ scrubbers.

---

## Mission 3: Blackout (08:00)

### Scene 3
*Normal operations control panel. The camera sweeps outside to the solar array field. One inverter status indicator switches from green to flashing red. The second inverter disconnects completely. Outpost power generation crashes. A blaring warning sounds: `SOLAR ARRAY POWER LOST`.*

* **AstroBee**:  
  > *"Commander! Emergency alert! Our solar-array inverters have disconnected. The outpost is now running on emergency battery power. It's not safe to go outside and fix the solar array. We must manage our remaining electricity before the reserves run too low!"*
* **Dr. Chiaki Mukai**:  
  > *"The main power supply is offline. Our emergency batteries can keep essential systems running, but we cannot operate everything. We need to make a decision quickly."*
* **Sunita Williams**:  
  > *"The greenhouse depends on electricity for its grow lights and environmental controls. If we reduce its power for too long, our crops could suffer. But crew survival comes first."*
* **Dr. Chiaki Mukai**:  
  > *"What is your recommendation?"*

### M3 Interactive Decision & Challenge
**Power Distribution Grid Routing**:
- Connect `Emergency Battery` → `PDU (Power Distribution Unit)`.
- Connect `PDU` → `Oxygen Circulation`.
- Connect `PDU` → `Habitat Heating`.
- Connect `PDU` → `Emergency Communications`.
- **CRITICAL**: Leave `Decorative Lighting` completely disconnected.

---

## Mission 4: Oxygen Countdown (11:00)

### Scene 4
*Inside the radiation shelter's life-support station. The primary oxygen reserve gauge begins dropping rapidly. Master alarm: `OXYGEN RESERVE LOW`. The crew gathers around the life-support telemetry screen.*

* **AstroBee**:  
  > *"Commander! Oxygen reserve is falling. Our current supply won't be enough unless we restore oxygen production or activate an alternative supply. We need to act quickly!"*
* **Guion Bluford**:  
  > *"We can use our emergency oxygen cylinders, produce fresh oxygen through water electrolysis, or isolate unused habitat modules to reduce unnecessary oxygen loss. But each option has a cost."*
* **Dr. Chiaki Mukai**:  
  > *"Remember, Commander. Electrolysis needs electricity. Our emergency power is already limited, so watch the power reserve."*
* **Guion Bluford**:  
  > *"What is your recommendation?"*

### M4 Interactive Decision & Challenge
**Electrolysis Plumbing Flow**:
> *AstroBee: "Careful, Commander! Electrolysis produces both oxygen and hydrogen. Never connect the hydrogen outlet to the breathable-air supply."*
- Connect `Water Storage` → `Electrolysis Unit`.
- Connect `Electrolysis Unit` → `Oxygen Separator`.
- Connect `Oxygen Separator` → `Oxygen Storage Tank`.
- Connect `Oxygen Storage Tank` → `Shelter Air Supply`.
- Connect the `Hydrogen Outlet` to its separate designated venting/handling line. (Safety check: Never hook hydrogen to oxygen lines!).

---

## Mission 5: The Water Trap (13:00)

### Scene 5
*The water purification system is running degraded at 50% capacity. The potable drinking water reservoir is declining, and the ISRU ice-processing melter requires immediate intervention.*

* **AstroBee**:  
  > *"Commander! Our clean-water production has dropped to 50%. We must secure enough water to keep the crew and greenhouse operating."*
* **Guion Bluford**:  
  > *"We have three possible strategies. Each one has a different impact on our resources."*
* **Guion Bluford**:  
  > *"What is your recommendation?"*

### M5 Interactive Decision & Challenge
**Resource Sorting Sequence**:
- Order the purification recovery stages in the correct procedural priority sequence to balance drinking reserves, thermal coolant loops, and greenhouse hydration.

---

## Mission 6: The Last Harvest (16:00)

### Scene 6
*Inside the Plant Growth Lab. The nutrient circulation pump stutters and trips. Moisture and mineral solution stops reaching the aeroponic roots. Plant vitals drop into the yellow zone.*

* **AstroBee**:  
  > *"Commander! We have a serious problem in the Plant Growth Lab. The nutrient circulation system has stopped working correctly. Our crops are beginning to deteriorate!"*
* **Sunita Williams**:  
  > *"The plants need water, nutrients, light, and controlled temperature. If we don't stabilize the greenhouse soon, we could lose a major part of our future food supply."*
* **Dr. Chiaki Mukai**:  
  > *"Power is still limited after the blackout. We must choose carefully how much energy to give the greenhouse."*
* **Sunita Williams**:  
  > *"What is your recommendation?"*

### M6 Interactive Decision & Challenge
**Photoperiod Calibration**:
> *AstroBee: "Greenhouse Light-Dark mode is broken. We need a 16-hour light / 8-hour dark consecutive cycle per day."*
- Calibrate the light timer sliders to configure 16 hours active grow light and 8 hours dark resting period.

---

## Mission 7: Critical Failure (20:00)

### Scene 7
*A high-current electrical fault erupts at Power Bus Junction 4. Arcing sparks flash on the circuit monitor; temperatures surge past critical limits. The primary habitat grid threatens total cascade collapse.*

* **AstroBee**:  
  > *"Commander! Emergency alert! Power Bus Junction 4 is experiencing an electrical fault. The temperature is rising rapidly, and the power distribution network is becoming unstable!"*
* **Dr. Chiaki Mukai**:  
  > *"We must isolate the damaged junction before the fault spreads. But be careful: disconnecting the wrong bus could shut down essential life-support systems."*
* **Guion Bluford**:  
  > *"Our oxygen circulation and environmental systems depend on stable electrical power. We cannot afford to lose those circuits."*
* **Dr. Chiaki Mukai**:  
  > *"What is your recommendation?"*

### M7 Interactive Decision & Challenge
**Circuit Breaker Isolation**:
- Isolate the faulty Power Bus Junction 4 branch without interrupting life-support and oxygen circulation loops.

---

## Mission 8: The Last Signal (23:30)

### Scene 8
*The 18-hour solar storm has finally subsided. Radiation sensors drop into the green zone. The crew emerges from the bunker into the main control room, but the base is running on emergency margins.*

* **AstroBee**:  
  > *"Commander, the solar storm has passed. Radiation levels are decreasing, but our outpost systems are still recovering."*
* **Rakesh Sharma**:  
  > *"The crew is safe, but we cannot assume the outpost is ready for normal operations. We need a complete system assessment."*
* **Dr. Chiaki Mukai**:  
  > *"Our communication antenna is operational. We can finally send Mission Control our recovery report."*
* **AstroBee**:  
  > *"Remember, Commander. Radio signals travel at the speed of light, but Earth cannot respond instantly. A message takes approximately 1.3 seconds to reach Earth, and another 1.3 seconds for a reply to return."*

### Physics Calculation & Telemetry
- Average Earth–Moon Distance ($d$): $\approx 384,400\text{ km}$
- Speed of Light ($c$): $\approx 299,792\text{ km/s}$
- One-way Time ($t_1$): $384,400 / 299,792 \approx 1.282\text{ s} \approx 1.3\text{ s}$
- Two-way Round-trip Time ($t_{\text{RTT}}$): $\approx 2.56\text{ s}$

### M8 Interactive Decision & Challenge
**Earth Transmission Chatbox & Mission Debrief**:
- Transmit the final status report to Earth Mission Control via the tactical comms terminal with realistic signal delay (2.56s RTT round-trip).
- Receive final debrief rating and survival star assessment.

