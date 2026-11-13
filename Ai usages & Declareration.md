# 🤖 MoonFall: AI Usages & Declarations
### NASA International Space Apps Challenge 2026 • Team ChandraPath

---

## 📋 Executive Statement on AI Usage

In strict alignment with the rules of the **NASA International Space Apps Challenge** and global standards for ethical, transparent artificial intelligence in education, this document provides a comprehensive disclosure of all AI technologies, Large Language Models (LLMs), retrieval pipelines, and generative tools utilized during the conception, development, and runtime operations of **MoonFall: Lunar Outpost Survival Simulator**.

> [!IMPORTANT]
> **Human-in-the-Loop Scientific Integrity Principle:**  
> All core game mechanics, thermodynamic simulation formulas, life-support flight rules, failure gates, and mission structures were designed, authored, and verified by human team members. AI technologies were employed exclusively as **development accelerators**, **pedagogical assistants**, and as an **in-game educational companion (AstroBee)** operating within strictly sandboxed, fact-checked boundaries. No generative model controls the underlying game physics or simulation state space.

---

## 🛠️ Summary Matrix of AI Tools & Implementations

| AI Tool / Model | Implementation Layer | Operational Domain | Human-in-the-Loop Oversight & Validation |
| :--- | :--- | :--- | :--- |
| **AstroBee AI Copilot**<br>*(Qwen 3.8 27B, GPT-OSS 120B/20B, Llama 3.1 8B)* | In-Game Runtime<br>*(Cloudflare Workers Edge)* | Context-aware bilingual (EN/BN) STEM assistant; hints, debriefs & space weather | Grounded with **RAG + BM25** over 56 verified fact cards & 85 NASA/NOAA citations; hardcoded anti-leak filters |
| **Google Antigravity** | Engineering & Development | Code authoring, refactoring, canvas HUD optimization, and 1,296-path simulation engine | Every function reviewed, tested with unit scripts, and verified against NASA flight rules |
| **ChatGPT (OpenAI)** | Concept & Content Design | Brainstorming, educational framing for ages 7–12, astronaut dialogue drafting | All technical dialogue and numbers fact-checked against NASA BVAD and NASA-STD-3001 |
| **Google Gemini Veo** | Visual Media Production | Generative video scene synthesis for cinematic prescreening materials | Curated and edited into video sequences; reviewed for thematic accuracy |

---

## 🐝 1. In-Game Runtime AI: Ask AstroBee Mission Copilot

**Ask AstroBee** is MoonFall’s interactive, bilingual mission assistant inspired by NASA's free-flying robotic Astrobee on the International Space Station. It assists students (ages 7–12) with real-time aerospace inquiries, mission hints, and post-crisis debriefs without spoiling gameplay.

### A. Technical Architecture & Retrieval Pipeline
* **Deployment Infrastructure:** Serverless edge execution deployed via **Cloudflare Workers**, communicating with the front-end interface hosted on **Vercel**.
* **Hybrid Retrieval-Augmented Generation (RAG):**
  * **Verified Knowledge Base:** 56 scientific fact cards, 139 structured Q&A pairs, and 85 peer-reviewed NASA, NOAA, and ESA citations.
  * **BM25 Search & Re-Ranking:** Ensures astronomical facts are retrieved verbatim from official NASA documentation rather than generated from ungrounded parametric memory.
* **Multi-Model Fallback Cascade:**
  To guarantee 100% high availability, low latency, and global accessibility, AstroBee implements a 4-tier fallback architecture:
  1. **Primary Model:** `Qwen 3.8 27B` — Selected for superior bilingual comprehension and natural English/Bangla (বাংলা) translation.
  2. **Secondary Fallback:** `GPT-OSS 120B` — Deep aerospace explanation and comprehensive scientific reasoning.
  3. **Tertiary Fallback:** `GPT-OSS 20B` — Low-latency lightweight conversational failover.
  4. **Quaternary Edge Fallback:** `Llama 3.1 8B` — Rapid localized emergency fallback.

### B. Educational Guardrails & Integrity Controls
* **Anti-Quiz Leakage Filters:** Programmed with strict system boundaries preventing AstroBee from revealing direct answers to cadet training quizzes or optimal decision choices in the 18-Hour Crisis.
* **Code-Based Calculation Engine:** When players ask about physics conversions (e.g., water-to-oxygen electrolysis or regolith shield mass), queries are computed via deterministic mathematical functions rather than LLM token prediction.
* **Live Space Weather Data Integration:** Live solar storm telemetry is queried from the **NASA DONKI API** (`api.nasa.gov`) and **NOAA SWPC**, grounding AstroBee's warnings in real-world heliophysics.

### C. Verification & Quality Benchmarks
* **94% Retrieval Accuracy** across specialized lunar and aerospace terminology.
* **98% Development Checks Passed** during extensive testing across device resolutions.
* **0% Quiz Leakage Rate** verified across adversarial prompt-injection tests.
* **38/38 Automated Backend Unit Tests** passed on the Cloudflare Workers endpoint.

---

## 💻 2. AI in Software Development & Engineering

### Google Antigravity
* **Role:** Primary development assistant for frontend architecture, responsive styling, and simulation code.
* **Specific Applications:**
  * Authoring and optimizing modular HTML5/CSS3/JavaScript components across 12 distinct simulation interfaces.
  * Refactoring complex responsive layouts for cross-device support (desktop, tablet, and mobile PWA landscape).
  * Engineering the zero-dependency **1,296-branch Monte Carlo verification engine** ([`verify_simulation.py`](verify_simulation.py)), proving the mathematical equilibrium of the crisis simulation.
  * Building automated headless visual verification test scripts using Chrome DevTools.
* **Human Validation:** All code was compiled, reviewed, syntax-checked, and tested locally by team engineers before committing to version control.

---

## 🎨 3. AI in Concept Design, Writing & Media Creation

### ChatGPT (OpenAI)
* **Role:** Pedagogical framing assistant and dialogue co-writer.
* **Specific Applications:**
  * Synthesizing complex NASA technical standards into engaging, age-appropriate prose for cadets aged 7–12.
  * Assisting in drafting character scripts and introductory dialogues for historical astronaut mentors:
    * **Dr. Chiaki Mukai (JAXA)** — Power systems & baseload fission reactors.
    * **Guion Bluford (NASA)** — ISRU water sublimation and electrolysis.
    * **Rakesh Sharma (ISRO)** — Hydroponic regolith agriculture and bioloops.
    * **Sunita Williams (NASA)** — Solar particle events and radiation shelters.
  * Generating prompt descriptors for custom pixel-art assets and UI visual styling.
* **Human Validation:** All character dialogues and educational explanations were cross-referenced with official NASA biographical archives and human-system manuals.

### Google Gemini Veo
* **Role:** Generative cinematic video accelerator.
* **Specific Applications:**
  * Generating visual transition elements and cinematic environmental backdrops (lunar surface flyovers, approaching solar storms) used in the 240-second project presentation video.
* **Human Validation:** Video outputs were curated, color-graded, and assembled in Adobe Premiere Pro alongside authentic NASA open-source footage and live gameplay recordings.

---

## 🔬 4. NASA Data Grounding vs. AI Generation Boundary

To maintain complete scientific honesty, MoonFall enforces a strict distinction between **empirical NASA data** and **generative AI**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   DETERMINISTIC & EMPIRICALLY GROUNDED                 │
│                      (100% Human & NASA Grounded)                      │
├────────────────────────────────────────────────────────────────────────┤
│ • NASA BVAD Rev 2: 0.895 kg O2/day, 2.5 L H2O/day                      │
│ • NASA-STD-3001: 250 mSv storm dose ceiling, 500 mSv survival floor   │
│ • Townsend (1988) BRYNTRN: Radiation attenuation through regolith      │
│ • Colozza (2020): 4.7–5.5 kWh/kg O2 electrolysis power scaling         │
│ • 1,296 Discrete Permutation Logic & Final Resilience Equation J       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        AI ASSISTIVE LAYER                              │
│                    (Human-in-the-Loop Acceleration)                    │
├────────────────────────────────────────────────────────────────────────┤
│ • AstroBee Bilingual Explanation & Conversational Guidance             │
│ • Code Refactoring, Canvas Drawing & Responsive UI Logic               │
│ • Age-Appropriate Storytelling Adaptation (Ages 7–12)                  │
│ • Live Data Query Formatting (NASA DONKI / NOAA SWPC API)              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📜 5. Ethical Compliance Declaration

We, the members of **Team ChandraPath**, certify that:
1. All AI tools were used ethically, transparently, and in full compliance with the NASA Space Apps Challenge Universal Rules.
2. No proprietary, confidential, or copyrighted source material was ingested into third-party AI models without proper authorization.
3. Every scientific fact presented to players is grounded in verified NASA publications and international aerospace research.
4. MoonFall’s game architecture represents our team’s original creative and engineering work.

**Signed by Team ChandraPath:**
* **Kazi Miftahul Hoque**
* **Sayed Mohammed Asim**
* **Israt Anjum Taspia**
* **Rafiur Rahman**
* **Mohammed Asaduzzaman Asad**
* **Miftahul Jannat Tanha**
