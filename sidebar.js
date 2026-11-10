/**
 * MoonFall / ChandraPath Modular Knowledge & Explore Sidebar
 * Usable on any mission page with:
 *   <link rel="stylesheet" href="sidebar.css">
 *   <script src="sidebar.js" defer></script>
 *
 * Optional: specify default section for that mission:
 *   <script src="sidebar.js" data-section="power" defer></script>
 * Available sections: 'all', 'power', 'dailymeal', 'hydroponics', 'wateroxygen', 'radiation'
 */

(function () {
  'use strict';

  // 1. Auto-inject CSS stylesheet if not present
  if (!document.querySelector('link[href*="sidebar.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'sidebar.css';
    document.head.appendChild(link);
  }

  // Detect configured default section from script attribute or URL
  const currentScript = document.currentScript;
  let targetSection = (currentScript && currentScript.dataset && currentScript.dataset.section) || '';

  if (!targetSection) {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('power')) targetSection = 'power';
    else if (path.includes('meal')) targetSection = 'dailymeal';
    else if (path.includes('hydro')) targetSection = 'hydroponics';
    else if (path.includes('isru')) targetSection = 'wateroxygen';
    else if (path.includes('radiat')) targetSection = 'radiation';
    else if (path.includes('final')) targetSection = 'final';
  }

  // Sidebar HTML Template with full NASA References matching "Copy of mission dialouges.pdf"
  const SIDEBAR_HTML = `
    <!-- Left Edge Floating Pull-Tab Toggle Button -->
    <button class="sidebar-pull-tab" id="sidebarPullTab" onclick="toggleResourceSidebar()" title="Open Explore Sidebar" aria-label="Open Explore Sidebar" aria-expanded="false">
      <span class="sidebar-tab-icon" id="sidebarTabIcon">◀</span>
      <span class="sidebar-tab-label">EXPLORE</span>
      <span class="sidebar-tab-dot"></span>
    </button>

    <!-- Sidebar Top Navigation Tabs -->
    <div class="sidebar-top-nav">
      <div class="sidebar-nav-links">
        <button class="sidebar-nav-tab active" type="button" onclick="filterSidebarSection('all', this)">All</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('power', this)">Power</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('dailymeal', this)">Daily Meal</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('hydroponics', this)">Hydroponics</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('wateroxygen', this)">Water &amp; Oxygen</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('radiation', this)">Radiation</button>
        <button class="sidebar-nav-tab" type="button" onclick="filterSidebarSection('final', this)">Crisis Protocol</button>
      </div>
      <button class="sidebar-start-journey-btn" type="button" onclick="handleStartJourneyClick()">Start Journey</button>
    </div>

    <!-- Sidebar Subheader (📖 Know More ⚡ | 🗗 Split View ✕) -->
    <div class="sidebar-header">
      <button class="sidebar-know-more-btn" type="button" onclick="exploreMainPageAction()" title="Know More about Lunar Base &amp; Space Weather">
        <span>📖</span>
        <span>Know More</span>
        <span style="color: #facc15;">⚡</span>
      </button>

      <div class="sidebar-header-controls">
        <button class="sidebar-split-btn" type="button" onclick="exploreMainPageAction()" title="Split View Mode">
          <span>🗗</span>
          <span>Split View</span>
        </button>
        <button class="sidebar-icon-btn" type="button" onclick="toggleResourceSidebar(false)" title="Close Sidebar" aria-label="Close Sidebar">✕</button>
      </div>
    </div>

    <!-- Scrollable Resource Cards Feed with YouTube Videos and NASA Resources -->
    <div class="sidebar-feed" id="sidebarFeed">

      <!-- =========================================================================
           SECTION 1: POWER (MISSION 1.1)
           ========================================================================= -->
      <div class="sidebar-section-header sec-power" id="sec_power">
        <span>⚡ Power Station &amp; Lunar Energy</span>
        <span class="section-header-tag">MISSION 1</span>
      </div>

      <!-- POWER [1]: WHAT POWERS A SPACECRAFT -->
      <article class="sidebar-card card-power" id="card-power-1">
        <div class="card-title-row">
          <h4 class="card-title">🚀 What Powers a Spacecraft?</h4>
          <span class="card-badge">NASA SPACE PLACE</span>
        </div>
        <a class="card-banner-wrap" href="https://spaceplace.nasa.gov/what-powers-a-spacecraft/en/" target="_blank" rel="noopener noreferrer" title="Read on NASA Space Place">
          <img class="card-banner-img" src="assets/solarPower.webp" alt="NASA Spacecraft Power Tech" loading="lazy">
          <span class="card-banner-tag">NASA SPACE PLACE // ARTICLE</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://spaceplace.nasa.gov/what-powers-a-spacecraft/en/" target="_blank" rel="noopener noreferrer">NASA Space Place</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Learn how solar panels, RTG nuclear batteries, and fuel cell generators provide vital electricity to rovers, probes, and lunar stations in deep space.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://spaceplace.nasa.gov/what-powers-a-spacecraft/en/" target="_blank" rel="noopener noreferrer">
            <span>Read What Powers a Spacecraft (NASA Space Place)</span>
          </a>
          <a class="card-text-link" href="https://www.nasa.gov/learning-resources/nasas-picture-dictionary-s/" target="_blank" rel="noopener noreferrer">
            <span>NASA Picture Dictionary: Solar Energy &amp; Sunlight</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [2]: 3.0 POWER SUBSYSTEMS -->
      <article class="sidebar-card card-power" id="card-power-2">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> 3.0 Power Subsystems</h4>
          <span class="card-badge">NASA SMALLSAT</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/power-subsystems/" target="_blank" rel="noopener noreferrer">NASA SmallSat Institute</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Technical breakdown of photovoltaic solar cells, gallium arsenide (GaAs) multi-junction arrays, and bus voltage regulation for deep-space applications.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/power-subsystems/" target="_blank" rel="noopener noreferrer">
            <span>Explore 3.0 Power Subsystems (NASA SOA)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [3]: VERTICAL SOLAR ARRAY TECHNOLOGY (VSAT) -->
      <article class="sidebar-card card-power" id="card-power-3">
        <div class="card-title-row">
          <h4 class="card-title">☀️ Vertical Solar Array Technology (VSAT)</h4>
          <span class="card-badge">NASA ARTEMIS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/missions/artemis/clps/nasa-industry-to-mature-vertical-solar-array-technologies-for-lunar-surface/" target="_blank" rel="noopener noreferrer">NASA Artemis CLPS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA contracts industry to build tall, deployable vertical solar array masts that rise 30+ feet above lunar crater rims to capture continuous grazing sunlight.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/missions/artemis/clps/nasa-industry-to-mature-vertical-solar-array-technologies-for-lunar-surface/" target="_blank" rel="noopener noreferrer">
            <span>Read NASA, Industry to Mature Vertical Solar Arrays</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [4]: SOUTH POLE SHADOWS & SHACKLETON CRATER -->
      <article class="sidebar-card card-power" id="card-power-4">
        <div class="card-title-row">
          <h4 class="card-title">🌑 South Pole Shadows &amp; Shackleton Rim</h4>
          <span class="card-badge">NASA SCIENCE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/solar-system/moon/shadows-near-the-moons-south-pole/" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          High-resolution lunar topography showcasing the illuminated peaks of eternal light on Shackleton Crater's rim where solar masts harvest continuous energy.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/solar-system/moon/shadows-near-the-moons-south-pole/" target="_blank" rel="noopener noreferrer">
            <span>Read Shadows near the Moon's South Pole</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [5]: INTEGRATED LUNAR POWER & BATTERIES -->
      <article class="sidebar-card card-power" id="card-power-5">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Lunar Power Strategy &amp; Batteries</h4>
          <span class="card-badge">NASA NTRS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20220017550" target="_blank" rel="noopener noreferrer">NASA NTRS Citations</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Integrated lunar surface power strategies analyzing lithium-ion battery units and fuel cells to sustain critical life support during darkness and shadowing.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20220017550" target="_blank" rel="noopener noreferrer">
            <span>Explore Integrated Lunar Power Strategy (NTRS 20220017550)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [6] & [7]: LUNAR DAY/NIGHT CYCLE (14 DAYS) -->
      <article class="sidebar-card card-power" id="card-power-6">
        <div class="card-title-row">
          <h4 class="card-title">🌓 Lunar Day/Night Cycle (14 Earth Days)</h4>
          <span class="card-badge">NASA JSC</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ares.jsc.nasa.gov/interaction/lmdp/documents/TotheMoon_back.pdf" target="_blank" rel="noopener noreferrer">NASA Johnson Space Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Explains the extreme lunar environment: 14 days of blinding sunlight followed by 14 days of freezing night, necessitating resilient power storage.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ares.jsc.nasa.gov/interaction/lmdp/documents/TotheMoon_back.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download To the Moon &amp; Back (NASA JSC PDF)</span>
          </a>
          <a class="card-text-link" href="https://www.lpi.usra.edu/lunar/strategies/resources/M2M%20ADD_ESDMD-001_NASA-TP-20230002706.pdf" target="_blank" rel="noopener noreferrer">
            <span>Moon to Mars Architecture Definition Document (M2M ADD)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [8]: NIGHTFALL POWER CONSERVATION -->
      <article class="sidebar-card card-power" id="card-power-8">
        <div class="card-title-row">
          <h4 class="card-title">🔋 Nightfall Power Conservation</h4>
          <span class="card-badge">LUNAR TECH</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20220017550" target="_blank" rel="noopener noreferrer">NASA Technical Reports</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Techniques for load-shedding and conserving limited battery reserves when lunar night falls and solar arrays are cut off from sunlight.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20220017550" target="_blank" rel="noopener noreferrer">
            <span>Read Lunar Surface Technology &amp; Conservation</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [9], [10], [11]: FISSION SURFACE POWER -->
      <article class="sidebar-card card-power" id="card-power-9">
        <div class="card-title-row">
          <h4 class="card-title">⚛️ Fission Surface Power (FSP)</h4>
          <span class="card-badge">NASA STMD</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/technology/power-propulsion/nasas-fission-surface-power-project-energizes-lunar-exploration/" target="_blank" rel="noopener noreferrer">NASA Space Technology</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA’s Fission Surface Power project develops a 40-kilowatt nuclear fission reactor to provide safe, reliable, continuous baseload power completely independent of sunlight.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/technology/power-propulsion/nasas-fission-surface-power-project-energizes-lunar-exploration/" target="_blank" rel="noopener noreferrer">
            <span>NASA’s Fission Surface Power Project Energizes Lunar Exploration</span>
          </a>
          <a class="card-text-link" href="https://www.nasa.gov/tdm/fission-surface-power/" target="_blank" rel="noopener noreferrer">
            <span>Explore Fission Surface Power Technology (NASA TDM)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [12]: POWER DISTRIBUTION UNIT (PDU) -->
      <article class="sidebar-card card-power" id="card-power-12">
        <div class="card-title-row">
          <h4 class="card-title">🎛️ Power Distribution Unit (PDU)</h4>
          <span class="card-badge">GRID ROUTING</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/power-subsystems/" target="_blank" rel="noopener noreferrer">NASA SmallSat Institute</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          How the central Power Distribution Unit manages smart micro-grid routing, stepping down voltages and delivering power to life support, science labs, and habitats.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/power-subsystems/" target="_blank" rel="noopener noreferrer">
            <span>Read Electric Power on the Moon &amp; Grid Routing</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [13] & [15]: POWERING THE MOON USING VSAT (VIDEO) -->
      <article class="sidebar-card card-power" id="card-power-13">
        <div class="card-title-row">
          <h4 class="card-title">⚡ Power Station Tech (VSAT Video)</h4>
          <span class="card-badge">ENERGY &amp; VIDEO</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=TbVIMSVuEFU" target="_blank" rel="noopener noreferrer" title="Watch NASA Spacecraft &amp; Lunar Surface Power on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/TbVIMSVuEFU/hqdefault.jpg" alt="NASA Power Tech Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=TbVIMSVuEFU" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Deploying vertical bifacial solar arrays and nuclear fission reactors to deliver uninterrupted baseload electrical power through the freezing lunar night.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=TbVIMSVuEFU" target="_blank" rel="noopener noreferrer">
            <span>Watch Powering the Moon Using Vertical Solar Arrays</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER [14]: AMES BATTERY STANDARD -->
      <article class="sidebar-card card-power" id="card-power-14">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Lithium-ion Battery Safety Standard</h4>
          <span class="card-badge">AMES STANDARD</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20090023858" target="_blank" rel="noopener noreferrer">NASA Ames / NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Ames Technical Standard and guidelines on lithium-ion battery discharge margins, thermal runaway mitigation, and cell balancing in space environments.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20090023858" target="_blank" rel="noopener noreferrer">
            <span>Guidelines on Lithium-ion Battery Use in Space (NTRS)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- =========================================================================
           SECTION 2: DAILY MEAL & FOOD STORAGE (MISSION 2.1)
           ========================================================================= -->
      <div class="sidebar-section-header sec-meal" id="sec_dailymeal">
        <span>🍱 Daily Meal &amp; Astronaut Nutrition</span>
        <span class="section-header-tag">MISSION 2.1</span>
      </div>

      <!-- MEAL [1] & [6]: 7.0 HABITABILITY FUNCTIONS -->
      <article class="sidebar-card card-meal" id="card-meal-1">
        <div class="card-title-row">
          <h4 class="card-title">🍱 7.0 Habitability Functions</h4>
          <span class="card-badge">NASA SOA</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/habitability-functions/" target="_blank" rel="noopener noreferrer">NASA SmallSat Institute</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Comprehensive guide to crew living volume, galley food storage systems, nutrition logging, and metabolic energy balances (average ~3,035 kcal/day).
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/smallsat-institute/sst-soa/habitability-functions/" target="_blank" rel="noopener noreferrer">
            <span>Explore 7.0 Habitability Functions - NASA</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- MEAL [2]: MULTILAYER POUCH PACKAGING -->
      <article class="sidebar-card card-meal" id="card-meal-2">
        <div class="card-title-row">
          <h4 class="card-title">🥡 Multilayer Pouch Packaging</h4>
          <span class="card-badge">FOOD PACKAGING</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">NASA OCHMO</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Space food packaging engineered with multilayer PET, aluminum foil, and polyethylene (PE) films to create an impermeable barrier blocking moisture and oxygen.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Space Food Packaging Facts (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- MEAL [3]: NITROGEN FLUSHING & ATMOSPHERE -->
      <article class="sidebar-card card-meal" id="card-meal-3">
        <div class="card-title-row">
          <h4 class="card-title">💨 Nitrogen Flushing Preservation</h4>
          <span class="card-badge">PRESERVATION</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">NASA Food Lab</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Nitrogen gas flushing during sealing drops pouch oxygen levels below 0.5%, preventing lipid oxidation and protecting food nutritional shelf-life for years.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">
            <span>Read Space Food Preservation Techniques</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- MEAL [4]: SPACE FOOD SYSTEMS (THREE TYPES) -->
      <article class="sidebar-card card-meal" id="card-meal-4">
        <div class="card-title-row">
          <h4 class="card-title">🍱 Space Food Systems (Three Types)</h4>
          <span class="card-badge">NASA JSC</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer" title="Explore NASA Space Food Systems">
          <img class="card-banner-img" src="assets/astronautsReal.webp" alt="Astronaut Daily Meals and Rations" loading="lazy">
          <span class="card-banner-tag">NASA JSC // FOOD LAB</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer">NASA Space Food Systems Laboratory</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Space foods categorized into three operational forms: Ready-to-Eat (nuts, bars), Rehydratable (soups, curries), and Food Warmerable (thermostabilized pouches).
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer">
            <span>Explore Space Food Systems &amp; Daily Rations</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- MEAL [5]: REHYDRATABLES & WATER DISPENSER -->
      <article class="sidebar-card card-meal" id="card-meal-5">
        <div class="card-title-row">
          <h4 class="card-title">💧 Rehydratable Meals &amp; Water Dispenser</h4>
          <span class="card-badge">CREW SYSTEMS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer">NASA Crew Systems</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Connecting lyophilized meal pouches to the potable water dispenser, injecting precise water volumes (50ml–200ml) to rehydrate astronaut food packs.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer">
            <span>NASA Space Food Formulations: Rehydratables</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- MEAL [7]: NASA FOOD & NUTRITION BRIEF (OCHMO) -->
      <article class="sidebar-card card-meal" id="card-meal-7">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> NASA Food &amp; Nutrition Technical Brief</h4>
          <span class="card-badge">NASA OCHMO</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer" title="Download NASA Food and Nutrition Technical Brief">
          <img class="card-banner-img" src="assets/spacefoodsystem.webp" alt="NASA Food and Nutrition Technical Brief" loading="lazy">
          <span class="card-banner-tag">NASA OCHMO // NUTRITION BRIEF</span>
          <span class="card-banner-badge-rt"><img src="assets/nasa_logo.svg" alt="NASA" style="width:12px; height:12px; vertical-align:middle; margin-right:3px; border-radius:50%;">PDF ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">NASA OCHMO</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Technical specifications for long-duration spaceflight nutrition: macro-nutrient distribution, vitamin degradation rates, and bio-regenerative counter-measures.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download NASA Food &amp; Nutrition Brief (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- =========================================================================
           SECTION 3: HYDROPONICS & LUNAR PLANT GROWTH (MISSION 2.2)
           ========================================================================= -->
      <div class="sidebar-section-header sec-hydro" id="sec_hydroponics">
        <span>🌱 Plant Growth &amp; Hydroponics Lab</span>
        <span class="section-header-tag">MISSION 2.2</span>
      </div>

      <!-- HYDRO [1]: SCIENTISTS GROW PLANTS IN LUNAR SOIL -->
      <article class="sidebar-card card-plant" id="card-hydro-1">
        <div class="card-title-row">
          <h4 class="card-title">🌱 Scientists Grow Plants in Lunar Soil</h4>
          <span class="card-badge">NASA FEATURE</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/humans-in-space/scientists-grow-plants-in-lunar-soil/" target="_blank" rel="noopener noreferrer" title="Read on NASA.gov: Scientists Grow Plants in Lunar Soil">
          <img class="card-banner-img" src="assets/hydroponics/lunar_soil_plants.jpg" alt="NASA Scientists Grow Plants in Lunar Soil" loading="lazy">
          <span class="card-banner-tag">NASA RESEARCH // LUNAR BIOLOGY</span>
          <span class="card-banner-badge-rt">READ ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/humans-in-space/scientists-grow-plants-in-lunar-soil/" target="_blank" rel="noopener noreferrer">NASA.gov</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          University of Florida and NASA researchers successfully sprouted and cultivated Arabidopsis in real Apollo 11, 12, and 17 lunar regolith samples.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/humans-in-space/scientists-grow-plants-in-lunar-soil/" target="_blank" rel="noopener noreferrer">
            <span>Read Scientists Grow Plants in Lunar Soil (NASA Feature)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [2]: SPACE HYDROPONICS & NUTRIENT DELIVERY -->
      <article class="sidebar-card card-plant" id="card-hydro-2">
        <div class="card-title-row">
          <h4 class="card-title">💧 Space Hydroponics &amp; Nutrient Delivery</h4>
          <span class="card-badge">NASA SCIENCE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/biological-physical/investigations/xroots/" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA's XROOTS (eXposed Root On-Orbit Test System) and Plant Water Management investigations test soilless hydroponic and aeroponic techniques, delivering precise mineral nutrient solutions directly to roots without soil.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/investigations/xroots/" target="_blank" rel="noopener noreferrer">
            <span>Explore XROOTS Hydroponic System (NASA Science)</span>
          </a>
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/investigations/pwm/" target="_blank" rel="noopener noreferrer">
            <span>Plant Water &amp; Nutrient Management (NASA Science)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [2B]: EARTH SOIL VS LUNAR REGOLITH -->
      <article class="sidebar-card card-plant" id="card-hydro-regolith">
        <div class="card-title-row">
          <h4 class="card-title">🌑 Earth Soil vs Lunar Regolith: What's the Difference?</h4>
          <span class="card-badge">NASA SCIENCE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/biological-physical/earth-soil-vs-lunar-regolith-whats-the-difference/" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          The Moon's surface is covered with fragmented, abrasive regolith formed by meteorite impacts and solar radiation. Unlike Earth's organic-rich soil, lunar regolith lacks organic nutrients, requiring treatment and supplemental nutrition to support plant growth.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/earth-soil-vs-lunar-regolith-whats-the-difference/" target="_blank" rel="noopener noreferrer">
            <span>Explore Earth Soil vs Lunar Regolith (NASA Science)</span>
          </a>
          <a class="card-text-link" href="https://science.nasa.gov/moon/moon-dust/" target="_blank" rel="noopener noreferrer">
            <span>Moon Dust Characteristics (NASA Science)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [3] & [4]: REGOLITH HAZARDS & INHALATION -->
      <article class="sidebar-card card-plant" id="card-hydro-3">
        <div class="card-title-row">
          <h4 class="card-title">⚠️ Regolith Hazards &amp; Inhalation Danger</h4>
          <span class="card-badge">CREW SAFETY</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/biological-physical/what-hazards-are-caused-by-lunar-regolith/" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Because there is no wind or water erosion on the Moon, regolith grains remain razor-sharp, abrasive, and dangerous to human lungs and seals if inhaled.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/what-hazards-are-caused-by-lunar-regolith/" target="_blank" rel="noopener noreferrer">
            <span>What Hazards Are Caused by Lunar Regolith?</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [5] & [6]: REGOLITH SIMULANT GUIDE & DUST CHALLENGE -->
      <article class="sidebar-card card-plant" id="card-hydro-5">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Lunar Regolith Simulant User's Guide</h4>
          <span class="card-badge">NASA NTRS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20060051772" target="_blank" rel="noopener noreferrer">NASA NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Chemical properties, mineral compositions (plagioclase, pyroxene, ilmenite), and handling procedures for testing biological growth in regolith simulants.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20060051772" target="_blank" rel="noopener noreferrer">
            <span>Download Regolith Simulant User's Guide (NTRS)</span>
          </a>
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20220008062" target="_blank" rel="noopener noreferrer">
            <span>The Challenge of Lunar Dust - NASA NTRS</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [7] & [8]: DAY 5 GROWTH & REDDISH PIGMENTATION -->
      <article class="sidebar-card card-plant" id="card-hydro-7">
        <div class="card-title-row">
          <h4 class="card-title">🔬 Plant Stress &amp; Reddish Pigmentation</h4>
          <span class="card-badge">SPACE BIOLOGY</span>
        </div>
        <a class="card-banner-wrap" href="https://science.nasa.gov/biological-physical/programs/space-biology/" target="_blank" rel="noopener noreferrer" title="Explore NASA Space Biology Research">
          <img class="card-banner-img" src="assets/hydroponics/Astronaut Tending Hydroponic Garden.webp" alt="Astronaut Tending Space Garden" loading="lazy">
          <span class="card-banner-tag">NASA SCIENCE // SPACE BIOLOGY</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/biological-physical/programs/space-biology/" target="_blank" rel="noopener noreferrer">NASA Space Biology</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Compared to Earth soil, plants grown in lunar soil exhibited smaller sizes, slower development, and reddish-purple pigmentation (anthocyanins) caused by substrate stress.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/programs/space-biology/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA Space Biology Program</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [9]: NASA OPEN SCIENCE DATA REPOSITORY (OSD-476) -->
      <article class="sidebar-card card-plant" id="card-hydro-9">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> NASA OSDR Study OSD-476</h4>
          <span class="card-badge">GENOMIC DATA</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://osdr.nasa.gov/bio/repo/data/study/OSD-476" target="_blank" rel="noopener noreferrer">NASA Open Science Data Repository</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Genomic microarray and RNA sequencing data measuring differential stress gene expression in Arabidopsis thaliana cultivated in Apollo lunar regolith.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://osdr.nasa.gov/bio/repo/data/study/OSD-476" target="_blank" rel="noopener noreferrer">
            <span>View Study OSD-476 (NASA OSDR)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDRO [10]: SCIENTISTS GREW PLANTS IN MOON SOIL (VIDEO) -->
      <article class="sidebar-card card-plant" id="card-hydro-10">
        <div class="card-title-row">
          <h4 class="card-title">🌱 Space Crop &amp; Plant Production Video</h4>
          <span class="card-badge">HYDROPONICS</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer" title="Watch NASA Space Crop &amp; Plant Production on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/W5OzSeTHouU/hqdefault.jpg" alt="NASA Space Crop Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Scientists explain what happened after sprouting plants in lunar soil and how future bio-regenerative life support systems will support Moon base crews.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer">
            <span>Watch Scientists Grew Plants in Moon Soil (NASA Video)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- =========================================================================
           SECTION 4: WATER & OXYGEN (MISSIONS 3 & 4)
           ========================================================================= -->
      <div class="sidebar-section-header sec-water" id="sec_wateroxygen">
        <span>💧 Water &amp; Oxygen In-Situ Extraction</span>
        <span class="section-header-tag">MISSIONS 3 &amp; 4</span>
      </div>

      <!-- ISRU [1]: LRO POLAR ICE -->
      <article class="sidebar-card card-isru" id="card-isru-1">
        <div class="card-title-row">
          <h4 class="card-title">💧 Lunar Ice Deposits are Widespread</h4>
          <span class="card-badge">NASA SCIENCE</span>
        </div>
        <a class="card-banner-wrap" href="https://science.nasa.gov/solar-system/moon/nasas-lro-lunar-ice-deposits-are-widespread/" target="_blank" rel="noopener noreferrer" title="Read on NASA Science: Lunar Ice Deposits are Widespread">
          <img class="card-banner-img" src="assets/isru/bg/bg_of_water.webp" alt="NASA LRO Lunar Polar Ice Deposits" loading="lazy">
          <span class="card-banner-tag">NASA LRO // POLAR ICE DEPOSITS</span>
          <span class="card-banner-badge-rt">READ ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/solar-system/moon/nasas-lro-lunar-ice-deposits-are-widespread/" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA's Lunar Reconnaissance Orbiter (LRO) data confirms widespread water ice deposits across permanently shadowed regions (PSRs) at the Moon's South Pole.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/solar-system/moon/nasas-lro-lunar-ice-deposits-are-widespread/" target="_blank" rel="noopener noreferrer">
            <span>Read NASA's LRO Lunar Ice Deposits Report</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [2]: WATER ON THE MOON (VIDEO) -->
      <article class="sidebar-card card-isru" id="card-isru-2">
        <div class="card-title-row">
          <h4 class="card-title">🎥 Water on the Moon</h4>
          <span class="card-badge">NASA GODDARD SVS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://svs.gsfc.nasa.gov/11756" target="_blank" rel="noopener noreferrer">NASA Goddard SVS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Goddard Scientific Visualization Studio exploration of volatile distribution, molecular hydration signatures, and subsurface ice storage.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://svs.gsfc.nasa.gov/11756" target="_blank" rel="noopener noreferrer">
            <span>Watch Water on the Moon (NASA Goddard SVS #11756)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [3]: PERMANENT SHADOWS -->
      <article class="sidebar-card card-isru" id="card-isru-3">
        <div class="card-title-row">
          <h4 class="card-title">🎥 South Pole &amp; Permanent Shadows</h4>
          <span class="card-badge">NASA SVS GALLERY</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://svs.gsfc.nasa.gov/gallery/moonpole" target="_blank" rel="noopener noreferrer">NASA SVS Moonpole Gallery</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Comprehensive NASA Goddard visualization gallery documenting extreme low-angle grazing sunlight, pitch-black crater floors, and cryogenic permanently shadowed regions.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://svs.gsfc.nasa.gov/gallery/moonpole" target="_blank" rel="noopener noreferrer">
            <span>Explore SVS Moon South Pole &amp; Permanent Shadows Gallery</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [4]: IS THERE WATER ON THE MOON? -->
      <article class="sidebar-card card-isru" id="card-isru-4">
        <div class="card-title-row">
          <h4 class="card-title">🎥 Is There Water on the Moon?</h4>
          <span class="card-badge">NASA VIDEO // EP. 27</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/general/is-there-water-on-the-moon-we-asked-a-nasa-scientist-episode-27" target="_blank" rel="noopener noreferrer">NASA We Asked a Scientist</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Planetary scientists explain how lunar ice survived for billions of years inside ultra-cold polar traps and how Artemis astronauts will harvest it.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/general/is-there-water-on-the-moon-we-asked-a-nasa-scientist-episode-27" target="_blank" rel="noopener noreferrer">
            <span>Watch We Asked a NASA Scientist (Episode 27)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [5]: APOLLO TO ARTEMIS DRILLING -->
      <article class="sidebar-card card-isru" id="card-isru-5">
        <div class="card-title-row">
          <h4 class="card-title">💧 Apollo to Artemis: Drilling on the Moon</h4>
          <span class="card-badge">NASA KSC</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/centers-and-facilities/kennedy/apollo-to-artemis-drilling-on-the-moon/" target="_blank" rel="noopener noreferrer">NASA Kennedy Space Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Tracing lunar drilling technology from Apollo astronauts manually hammering core tubes to autonomous rotary percussive drills engineered for Artemis.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/centers-and-facilities/kennedy/apollo-to-artemis-drilling-on-the-moon/" target="_blank" rel="noopener noreferrer">
            <span>Read Apollo to Artemis: Drilling on the Moon</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [6]: PRIME-1 TRIDENT DRILL & MSOLO -->
      <article class="sidebar-card card-isru" id="card-isru-6">
        <div class="card-title-row">
          <h4 class="card-title">💧 PRIME-1: TRIDENT Drill &amp; MSolo</h4>
          <span class="card-badge">NASA CLPS</span>
        </div>
        <a class="card-banner-wrap" href="https://science.nasa.gov/lunar-science/clps-deliveries/prime-1aiintuitive-machines/" target="_blank" rel="noopener noreferrer" title="Explore NASA PRIME-1 Science & Technology">
          <img class="card-banner-img" src="assets/isru/equipments/drill.webp" alt="NASA PRIME-1 TRIDENT Drill and MSolo Mass Spectrometer" style="object-fit: contain; background: #0b1120; padding: 10px;" loading="lazy">
          <span class="card-banner-tag">NASA CLPS // PRIME-1 INSTRUMENTS</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/lunar-science/clps-deliveries/prime-1aiintuitive-machines/" target="_blank" rel="noopener noreferrer">NASA Science CLPS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Polar Resources Ice Mining Experiment-1 deploying the TRIDENT ice drill and MSolo mass spectrometer to prospect and analyze volatile gases directly on the Moon.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/lunar-science/clps-deliveries/prime-1aiintuitive-machines/" target="_blank" rel="noopener noreferrer">
            <span>Explore PRIME-1 Science &amp; Technology (TRIDENT &amp; MSolo)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [7]: LUNAR DRILL PASSES TESTS -->
      <article class="sidebar-card card-isru" id="card-isru-7">
        <div class="card-title-row">
          <h4 class="card-title">💧 NASA Lunar Drill Passes Tests on Moon</h4>
          <span class="card-badge">NASA ARTEMIS</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/missions/artemis/clps/nasas-lunar-drill-technology-passes-tests-on-the-moon/" target="_blank" rel="noopener noreferrer" title="Read NASA's Lunar Drill Technology Passes Tests">
          <img class="card-banner-img" src="assets/prime.webp" alt="NASA Lunar Drill and PRIME-1 Testing on the Moon" loading="lazy">
          <span class="card-banner-tag">NASA ARTEMIS // LUNAR DRILL</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/missions/artemis/clps/nasas-lunar-drill-technology-passes-tests-on-the-moon/" target="_blank" rel="noopener noreferrer">NASA Artemis CLPS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Rigorous environmental and vacuum chamber test results validating robotic deep-coring mechanisms designed to penetrate cryogenic frozen lunar soil.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/missions/artemis/clps/nasas-lunar-drill-technology-passes-tests-on-the-moon/" target="_blank" rel="noopener noreferrer">
            <span>Read NASA's Lunar Drill Technology Passes Tests</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [8]: PRIME-1 VIDEO -->
      <article class="sidebar-card card-isru" id="card-isru-8">
        <div class="card-title-row">
          <h4 class="card-title">🎥 PRIME-1 Mission Video</h4>
          <span class="card-badge">NASA VIDEO</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/video-detail/prime-1-2025-updated-video/" target="_blank" rel="noopener noreferrer">NASA Video Detail</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Official mission preview showing how the PRIME-1 payload touches down near Shackleton Crater, penetrates 1 meter deep with TRIDENT, and vaporizes ice samples for mass spectrometry.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/video-detail/prime-1-2025-updated-video/" target="_blank" rel="noopener noreferrer">
            <span>Watch PRIME-1 2025 Updated Video (NASA)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [9]: OVERVIEW ISRU -->
      <article class="sidebar-card card-isru" id="card-isru-9">
        <div class="card-title-row">
          <h4 class="card-title">💧 Overview: In-Situ Resource Utilization</h4>
          <span class="card-badge">NASA STMD</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/overview-in-situ-resource-utilization/" target="_blank" rel="noopener noreferrer" title="Read NASA Overview: In-Situ Resource Utilization">
          <img class="card-banner-img" src="assets/isru/lunar_surface_innovation_rassor.jpg" alt="NASA In-Situ Resource Utilization Architecture" loading="lazy">
          <span class="card-banner-tag">NASA STMD // ISRU ARCHITECTURE</span>
          <span class="card-banner-badge-rt">OVERVIEW ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/overview-in-situ-resource-utilization/" target="_blank" rel="noopener noreferrer">NASA.gov</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA's foundational blueprint for living off the land on the Moon: finding, extracting, and refining local lunar resources into water, oxygen, and rocket propellant.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/overview-in-situ-resource-utilization/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA Overview: In-Situ Resource Utilization</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [10]: GLENN EXCAVATION LAB -->
      <article class="sidebar-card card-isru" id="card-isru-10">
        <div class="card-title-row">
          <h4 class="card-title">💧 Glenn Excavation Laboratory</h4>
          <span class="card-badge">NASA GLENN</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/?p=38643" target="_blank" rel="noopener noreferrer">NASA Glenn Research Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Robotic excavation facility developing drum bucket excavators, pneumatic conveyance, and autonomous rover traction systems operating inside lunar regolith simulant.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/?p=38643" target="_blank" rel="noopener noreferrer">
            <span>Visit NASA Glenn Excavation Laboratory</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [11]: INTEGRATION OF ISRU FIELD ANALOGS -->
      <article class="sidebar-card card-isru" id="card-isru-11">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Integration of ISRU Field Analogs</h4>
          <span class="card-badge">NASA PDF</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100021362.pdf" target="_blank" rel="noopener noreferrer">NASA NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Technical Report detailing end-to-end field testing of robotic excavation, sealed pressurized reactor subsystems, and carbothermal reduction delivering water and O₂.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100021362.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Integration of ISRU Through Field Analogs (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [12]: LOW PRESSURE FROST FORMATION -->
      <article class="sidebar-card card-isru" id="card-isru-12">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Low Pressure Frost Formation Study</h4>
          <span class="card-badge">NASA NTRS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20230010063" target="_blank" rel="noopener noreferrer">NASA NTRS Citations</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Experimental investigation into low pressure vapor frost kinetics, cold trap condensation efficiency, and sublimation capture mechanisms for volatile lunar mining.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20230010063" target="_blank" rel="noopener noreferrer">
            <span>View Study on Low Pressure Frost Formation (NTRS 20230010063)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [13]: MICROWAVE EXTRACTION OF WATER -->
      <article class="sidebar-card card-isru" id="card-isru-13">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Microwave Water Extraction Study</h4>
          <span class="card-badge">NASA PDF</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20070018802/downloads/20070018802.pdf" target="_blank" rel="noopener noreferrer">NASA NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Technical Report demonstrating rapid microwave dielectric heating at 2.45 GHz to sublimate and capture water ice bound within simulated lunar regolith without digging.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20070018802/downloads/20070018802.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Microwave Extraction of Water Report (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [14]: HOW WILL WE EXTRACT WATER ON MOON? -->
      <article class="sidebar-card card-isru" id="card-isru-14">
        <div class="card-title-row">
          <h4 class="card-title">🎥 How Will We Extract Water on Moon?</h4>
          <span class="card-badge">NASA VIDEO // EP. 47</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/general/how-will-we-extract-water-on-the-moon-we-asked-a-nasa-technologist-episode-47" target="_blank" rel="noopener noreferrer">NASA We Asked a Technologist</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA technologists discuss the real engineering of thermal mining domes, in-situ borehole sublimation rods, and condensation tanks to supply future lunar outposts.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/general/how-will-we-extract-water-on-the-moon-we-asked-a-nasa-technologist-episode-47" target="_blank" rel="noopener noreferrer">
            <span>Watch We Asked a NASA Technologist (Episode 47)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [15]: ECLSS LIFE SUPPORT -->
      <article class="sidebar-card card-isru" id="card-isru-15">
        <div class="card-title-row">
          <h4 class="card-title">💧 ECLSS Life Support Systems</h4>
          <span class="card-badge">NASA ECLSS</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss" target="_blank" rel="noopener noreferrer" title="Read NASA ECLSS Overview">
          <img class="card-banner-img" src="assets/isru/bg/bg_of_oxy.webp" alt="NASA Environmental Control and Life Support Systems" loading="lazy">
          <span class="card-banner-tag">NASA ECLSS // WATER &amp; OXYGEN RECOVERY</span>
          <span class="card-banner-badge-rt">OVERVIEW ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss" target="_blank" rel="noopener noreferrer">NASA Reference</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Architectural reference for life support systems: catalytic oxidation, trace contaminant control, carbon dioxide scrubbing, and regenerative water recycling.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss" target="_blank" rel="noopener noreferrer">
            <span>Read Environmental Control &amp; Life Support Systems (ECLSS)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [16]: ELECTROCHEMICAL SOLUTIONS (OGA) -->
      <article class="sidebar-card card-isru" id="card-isru-16">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Electrochemical Solutions (OGA)</h4>
          <span class="card-badge">NASA NTRS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20200002346" target="_blank" rel="noopener noreferrer">NASA NTRS Citations</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NTRS engineering publication on Proton Exchange Membrane (PEM) water electrolysis in the Oxygen Generation Assembly (OGA), splitting reclaimed H₂O into breathable O₂.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20200002346" target="_blank" rel="noopener noreferrer">
            <span>Explore Electrochemical Solutions for Advanced Life Support (NTRS)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- ISRU [17]: ISS ECLSS FACT SHEET -->
      <article class="sidebar-card card-isru" id="card-isru-17">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> ISS ECLSS Fact Sheet</h4>
          <span class="card-badge">NASA PDF</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/sites/default/files/atoms/files/g-281237_eclss_0.pdf" target="_blank" rel="noopener noreferrer">NASA Marshall (MSFC)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Official NASA Marshall Space Flight Center technical fact sheet breaking down closed-loop life support architectures that recycle over 98% of crew water on orbit.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/sites/default/files/atoms/files/g-281237_eclss_0.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download ISS ECLSS Technical Fact Sheet (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldIsru', 'badgeIsru')" title="Zoom to ISRU Facility">
            <span>🔍 View ISRU Facility on Map</span>
          </button>
        </div>
      </article>

      <!-- =========================================================================
           SECTION 5: RADIATION SHIELDING & SPACE WEATHER (MISSION 5.1)
           ========================================================================= -->
      <div class="sidebar-section-header sec-rad" id="sec_radiation">
        <span>🛡️ Radiation Shielding &amp; Space Weather</span>
        <span class="section-header-tag">MISSION 5</span>
      </div>

      <!-- RAD [1], [5], [8]: DESIGN FOR IONIZING RADIATION PROTECTION -->
      <article class="sidebar-card card-shelter" id="card-rad-1">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Design for Ionizing Radiation Protection</h4>
          <span class="card-badge">NASA OCHMO</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/ochmo-tb-020-radiation-protection.pdf" target="_blank" rel="noopener noreferrer">NASA OCHMO (TB-020)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Office of the Chief Health and Medical Officer technical standards for mitigating acute Solar Particle Event (SPE) exposure and astronaut cumulative dose thresholds.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/ochmo-tb-020-radiation-protection.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Ionizing Radiation Protection (OCHMO-TB-020 PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [2]: EFFECTS OF SPACE RADIATION (PODCAST) -->
      <article class="sidebar-card card-shelter" id="card-rad-2">
        <div class="card-title-row">
          <h4 class="card-title">🎙️ Effects of Space Radiation (Podcast)</h4>
          <span class="card-badge">NASA PODCAST</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/podcasts/small-steps-giant-leaps/episode-90-effects-of-space-radiation/" target="_blank" rel="noopener noreferrer">NASA Small Steps, Giant Leaps</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA experts discuss space radiation risks on the Moon, cell DNA ionization, and how passive shielding protects astronauts outside Earth's protective magnetic field.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/podcasts/small-steps-giant-leaps/episode-90-effects-of-space-radiation/" target="_blank" rel="noopener noreferrer">
            <span>Listen to Small Steps, Giant Leaps (Episode 90)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [3] & [6]: GLENN SYMPOSIUM ENERGETIC PARTICLES & GCRs -->
      <article class="sidebar-card card-shelter" id="card-rad-3">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Energetic Particles &amp; Cosmic Rays (GCRs)</h4>
          <span class="card-badge">GLENN SYMPOSIUM</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20210018122/downloads/Glenn%20Symposium%20Panel%20charts_2021%20-%20Jonathan%20Ransom.pdf" target="_blank" rel="noopener noreferrer">NASA Glenn Symposium</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Comprehensive panel presentation analyzing high-energy galactic cosmic ray ions (HZE nuclei), solar particle storms, and biological damage mechanisms.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20210018122/downloads/Glenn%20Symposium%20Panel%20charts_2021%20-%20Jonathan%20Ransom.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Glenn Symposium Panel Charts (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [4]: PROTECTING ASTRONAUTS ON LUNAR SURFACE -->
      <article class="sidebar-card card-shelter" id="card-rad-4">
        <div class="card-title-row">
          <h4 class="card-title">🛡️ Protecting Astronauts from Radiation</h4>
          <span class="card-badge">NASA TECH</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/technology/protecting-astronauts-from-space-radiation/" target="_blank" rel="noopener noreferrer">NASA Technology</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Engineering storm shelters and long-duration safe havens to protect Artemis expedition crews and electronic equipment during solar particle events.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/technology/protecting-astronauts-from-space-radiation/" target="_blank" rel="noopener noreferrer">
            <span>Protecting Astronauts from Space Radiation on the Moon</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [7]: EARTH VS MOON NATURAL SHIELDING -->
      <article class="sidebar-card card-shelter" id="card-rad-7">
        <div class="card-title-row">
          <h4 class="card-title">🌍 Earth vs. Moon Natural Shielding</h4>
          <span class="card-badge">MATERIALS TECH</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20180002826" target="_blank" rel="noopener noreferrer">NASA NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Earth’s magnetic field and thick atmosphere deflect charged ions. Because the Moon lacks an intrinsic magnetosphere, engineered habitat shielding is mandatory.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20180002826" target="_blank" rel="noopener noreferrer">
            <span>Integration of Advanced Structures &amp; Materials for Lunar Habitat</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [9]: SUPPLIES REARRANGEMENT & WATER SHIELDING -->
      <article class="sidebar-card card-shelter" id="card-rad-9">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Supplies Rearrangement &amp; Water Walls</h4>
          <span class="card-badge">HYDROGEN SHIELD</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20160006051/downloads/20160006051.pdf" target="_blank" rel="noopener noreferrer">NASA Technical Reports</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Hydrogen-rich materials (water containers, food packs, and polyethylene) are superior radiation absorbers. Arranging them around crew bunks cuts exposure by up to 40%.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20160006051/downloads/20160006051.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Polyethylene &amp; Water Shielding Study (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RAD [10] & [11]: LUNAR REGOLITH SHIELDING & ISRU -->
      <article class="sidebar-card card-shelter" id="card-rad-10">
        <div class="card-title-row">
          <h4 class="card-title">🛡️ Lunar Regolith Shielding &amp; ISRU</h4>
          <span class="card-badge">DEFENSE // VIDEO</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=vpNa4u997xA" target="_blank" rel="noopener noreferrer" title="Watch NASA Space Radiation Shielding on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/vpNa4u997xA/hqdefault.jpg" alt="NASA Space Radiation Shielding Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=vpNa4u997xA" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Building sintered regolith berms and burying permanent habitats under 1–3 meters of local lunar soil creates complete passive shielding without hauling heavy mass from Earth.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=vpNa4u997xA" target="_blank" rel="noopener noreferrer">
            <span>Watch Space Radiation Shielding on YouTube</span>
          </a>
          <a class="card-text-link" href="https://science.nasa.gov/moon/what-is-lunar-regolith/" target="_blank" rel="noopener noreferrer">
            <span>What Is Lunar Regolith? The Moon’s Surface Explained</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RADIATION: NASA SPACE WEATHER -->
      <article class="sidebar-card card-shelter" id="card-rad-weather">
        <div class="card-title-row">
          <h4 class="card-title">☀️ NASA Space Weather Research</h4>
          <span class="card-badge">HELIOPHYSICS</span>
        </div>
        <a class="card-banner-wrap" href="https://science.nasa.gov/heliophysics/focus-areas/space-weather/" target="_blank" rel="noopener noreferrer" title="Explore NASA Space Weather Focus Area">
          <img class="card-banner-img" src="assets/space_weather_solar_flare.jpg" alt="NASA Space Weather Solar Flare and CME Eruption" loading="lazy">
          <span class="card-banner-tag">NASA SCIENCE // HELIOPHYSICS</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/heliophysics/focus-areas/space-weather/" target="_blank" rel="noopener noreferrer">NASA Heliophysics</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Conditions in space caused by the Sun's activity, solar flares, and coronal mass ejections that affect lunar surface systems, communications, and astronaut safety.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/heliophysics/focus-areas/space-weather/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA Space Weather Focus Area</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- =========================================================================
           CRISIS PROTOCOL // FINAL MISSION (18 NASA SCIENTIFIC REFERENCES)
           ========================================================================= -->
      <div class="sidebar-section-header sec-final" id="sec_final">
        <span>🚨 Crisis Protocol // Final Mission</span>
        <span class="section-header-tag">MISSION 8</span>
      </div>

      <!-- FINAL [1]: HOW NASA WILL PROTECT ASTRONAUTS FROM SPACE RADIATION -->
      <article class="sidebar-card card-crisis" id="card-final-1">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> How NASA Will Protect Astronauts From Space Radiation</h4>
          <span class="card-badge">HELIOPHYSICS // SPE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/science-research/heliophysics/how-nasa-will-protect-astronauts-from-space-radiation-at-the-moon" target="_blank" rel="noopener noreferrer">NASA Science</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Heliophysics overview on monitoring Solar Particle Events (SPEs), coronal mass ejections, and utilizing space weather forecasting and bio-shielding for lunar Artemis surface crews.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/science-research/heliophysics/how-nasa-will-protect-astronauts-from-space-radiation-at-the-moon" target="_blank" rel="noopener noreferrer">
            <span>Explore Radiation Protection at the Moon (NASA Science)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 Zoom to Radiation Shelter</span>
          </button>
        </div>
      </article>

      <!-- FINAL [2]: SHACKLETON CRATER: ELEVATED RIM & SHADOWED INTERIOR -->
      <article class="sidebar-card card-crisis" id="card-final-2">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Shackleton Crater: Elevated Rim & Shadowed Interior</h4>
          <span class="card-badge">LUNAR SOUTH POLE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/" target="_blank" rel="noopener noreferrer">NASA Science / LRO</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Lunar Reconnaissance Orbiter (LRO) and ShadowCam imagery of Shackleton Crater's elevated rim receiving near-constant solar illumination alongside cryogenic shadowed craters.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/" target="_blank" rel="noopener noreferrer">
            <span>View Shackleton Crater Rim Mosaic (NASA Science)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldMain', 'badgeCommand')" title="Zoom to Command Module">
            <span>🔍 Zoom to Command Module</span>
          </button>
        </div>
      </article>

      <!-- FINAL [3]: PROTECTING ASTRONAUTS FROM SPACE RADIATION ON LUNAR SURFACE -->
      <article class="sidebar-card card-crisis" id="card-final-3">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Protecting Astronauts from Space Radiation on Lunar Surface</h4>
          <span class="card-badge">NASA LANGLEY // STORM SHELTER</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20210009760/downloads/Clowdsley_Lunar_Radiation_Talk_v2.pdf" target="_blank" rel="noopener noreferrer">NASA Langley Research Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Langley engineering research detailing storm shelter construction, regolith overburden, and hydrogen-rich water wall barriers to protect crew during peak solar radiation events.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20210009760/downloads/Clowdsley_Lunar_Radiation_Talk_v2.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Lunar Surface Radiation Protection (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 Zoom to Radiation Shelter</span>
          </button>
        </div>
      </article>

      <!-- FINAL [4]: PASSIVE RADIATION SHIELDING: MULTILAYER & WATER WALLS -->
      <article class="sidebar-card card-crisis" id="card-final-4">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Passive Radiation Shielding: Multilayer & Water Walls</h4>
          <span class="card-badge">NASA STMD // WATER WALLS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/directorates/stmd/space-tech-research-grants/passive-radiation-shielding-integrating-multilayer-and-multipurpose-materials-into-space-habitat-design/" target="_blank" rel="noopener noreferrer">NASA Space Tech Research Grants</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Space Technology Mission Directorate research on integrating dual-use water walls and modular hydrogenous composites into habitat architectural pressure shells.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/directorates/stmd/space-tech-research-grants/passive-radiation-shielding-integrating-multilayer-and-multipurpose-materials-into-space-habitat-design/" target="_blank" rel="noopener noreferrer">
            <span>Explore Passive Radiation Shielding (NASA STMD)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 Zoom to Radiation Shelter</span>
          </button>
        </div>
      </article>

      <!-- FINAL [5]: AUTONOMOUS POWER CONTROLLER & LUNAR SURFACE POWER -->
      <article class="sidebar-card card-crisis" id="card-final-5">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Autonomous Power Controller & Lunar Surface Power</h4>
          <span class="card-badge">NASA NTRS // POWER ARCHITECTURE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20230011902/downloads/Carbone_CP_APC_EnergyMob_Cleveland_11902.pdf" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Glenn Research Center architecture for autonomous fault isolation, solid-state circuit breaker protection, and microgrid power distribution during lunar surface anomalies.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20230011902/downloads/Carbone_CP_APC_EnergyMob_Cleveland_11902.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Autonomous Power Controller Paper (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 Zoom to Power Station</span>
          </button>
        </div>
      </article>

      <!-- FINAL [6]: MODULAR POWER SYSTEMS: LOAD SHEDDING & BUS SWITCHING -->
      <article class="sidebar-card card-crisis" id="card-final-6">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Modular Power Systems: Load Shedding & Bus Switching</h4>
          <span class="card-badge">NASA NTRS // LOAD SHEDDING</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20200000015/downloads/20200000015.pdf" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA engineering guidelines for emergency battery bus switching units, staged load-shedding schedules, and non-critical circuit isolation during blackout contingencies.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20200000015/downloads/20200000015.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Modular Power Systems Study (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 Zoom to Power Station</span>
          </button>
        </div>
      </article>

      <!-- FINAL [7]: ECLSS FACT SHEET: WATER RECOVERY & CLOSED LOOPS -->
      <article class="sidebar-card card-crisis" id="card-final-7">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> ECLSS Fact Sheet: Water Recovery & Closed Loops</h4>
          <span class="card-badge">NASA MARSHALL // ECLSS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/wp-content/uploads/2025/08/g-657270-59-hp-environmental-control-and-life-support-system-eclss.pdf" target="_blank" rel="noopener noreferrer">NASA Marshall Space Flight Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Marshall Space Flight Center details on advanced closed-loop life support, achieving ~98% water recovery via distillation, filtration loops, and oxygen generation via electrolysis.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2025/08/g-657270-59-hp-environmental-control-and-life-support-system-eclss.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download ECLSS Fact Sheet (NASA PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [8]: ENVIRONMENTAL CONTROL & LIFE SUPPORT SYSTEMS (ECLSS) -->
      <article class="sidebar-card card-crisis" id="card-final-8">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Environmental Control & Life Support Systems (ECLSS)</h4>
          <span class="card-badge">NASA ECLSS // ATMOSPHERE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss" target="_blank" rel="noopener noreferrer">NASA Reference Guide</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA exploration architecture for oxygen regeneration, carbon dioxide removal, cabin air pressurization, and emergency bottled gas reserves for extraterrestrial habitats.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA ECLSS Reference Guide</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [9]: ELECTROCHEMICAL SOLUTIONS FOR ADVANCED LIFE SUPPORT (ELECTROLYSIS) -->
      <article class="sidebar-card card-crisis" id="card-final-9">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Electrochemical Solutions for Advanced Life Support (Electrolysis)</h4>
          <span class="card-badge">NASA NTRS // ELECTROLYSIS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20200002346" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA evaluation of proton-exchange membrane (PEM) water electrolysis cells splitting purified water into breathable O₂ and H₂ gas for surface habitat life support.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20200002346" target="_blank" rel="noopener noreferrer">
            <span>View Electrochemical Oxygen Generation (NTRS)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [10]: OVERVIEW: IN-SITU RESOURCE UTILIZATION (ISRU) -->
      <article class="sidebar-card card-crisis" id="card-final-10">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Overview: In-Situ Resource Utilization (ISRU)</h4>
          <span class="card-badge">NASA ISRU // OVERVIEW</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/overview-in-situ-resource-utilization/" target="_blank" rel="noopener noreferrer">NASA STMD ISRU</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Harnessing local extraterrestrial resources—processing lunar regolith, mining volatiles, and extracting water and oxygen to enable self-sustaining human outposts.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/overview-in-situ-resource-utilization/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA ISRU Overview</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to ISRU Extraction Facility">
            <span>🔍 Zoom to ISRU Extraction Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [11]: THE CHALLENGE OF LUNAR DUST: SEALS, FILTERS & MECHANISMS -->
      <article class="sidebar-card card-crisis" id="card-final-11">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> The Challenge of Lunar Dust: Seals, Filters & Mechanisms</h4>
          <span class="card-badge">NASA NTRS // LUNAR DUST</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20220008062/downloads/The%20Challenge%20of%20Lunar%20Dust%20-%20v4.pdf" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA analysis of sharp, electrostatically charged abrasive regolith fines causing filter clogging, seal degradation, and abrasive wear on life support fluid loops.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20220008062/downloads/The%20Challenge%20of%20Lunar%20Dust%20-%20v4.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download The Challenge of Lunar Dust (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to ISRU Extraction Facility">
            <span>🔍 Zoom to ISRU Extraction Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [12]: MICROWAVE EXTRACTION OF WATER FROM LUNAR REGOLITH -->
      <article class="sidebar-card card-crisis" id="card-final-12">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Microwave Extraction of Water from Lunar Regolith</h4>
          <span class="card-badge">NASA NTRS // THERMAL EXTRACTION</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20070018802/downloads/20070018802.pdf" target="_blank" rel="noopener noreferrer">NASA Marshall (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Marshall Research on dielectric heating and 2.45 GHz microwave thermal extraction of bound water from lunar regolith simulant under deep vacuum.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20070018802/downloads/20070018802.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download Microwave Water Extraction Study (NTRS PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [13]: LOW PRESSURE FROST FORMATION FOR LUNAR POLAR WATER CAPTURE -->
      <article class="sidebar-card card-crisis" id="card-final-13">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Low Pressure Frost Formation for Lunar Polar Water Capture</h4>
          <span class="card-badge">NASA NTRS // COLD TRAPS</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/citations/20230010063" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server (NTRS)</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Experimental investigation of volatile vapor transport, low-pressure condensation, and cryogenic cold-trap deposition for capturing lunar polar water.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/citations/20230010063" target="_blank" rel="noopener noreferrer">
            <span>View Low Pressure Frost Formation Study (NTRS)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [14]: SPACE FARMING: VEGGIE SYSTEM & TARGETED LED LIGHTING -->
      <article class="sidebar-card card-crisis" id="card-final-14">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Space Farming: Veggie System & Targeted LED Lighting</h4>
          <span class="card-badge">NASA SPINOFF // VEGGIE</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/technology/tech-transfer-spinoffs/space-farming-yields-a-crop-of-benefits-for-earth" target="_blank" rel="noopener noreferrer">NASA Spinoffs & Tech Transfer</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Kennedy Space Center development of the Veggie hydroponic plant growth chambers, targeted spectrum LED grow lights, and automated nutrient delivery.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/technology/tech-transfer-spinoffs/space-farming-yields-a-crop-of-benefits-for-earth" target="_blank" rel="noopener noreferrer">
            <span>Read Space Farming Yields Benefits (NASA Spinoff)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldGreenhouse', 'badgeGreenhouse')" title="Zoom to Greenhouse">
            <span>🔍 Zoom to Greenhouse</span>
          </button>
        </div>
      </article>

      <!-- FINAL [15]: LRO FINDS LUNAR WATER MORE WIDESPREAD THAN PREVIOUSLY THOUGHT -->
      <article class="sidebar-card card-crisis" id="card-final-15">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> LRO Finds Lunar Water More Widespread Than Previously Thought</h4>
          <span class="card-badge">NASA GODDARD // LRO</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/centers-and-facilities/goddard/nasas-lro-finds-lunar-water-more-widespread-than-previously-thought/" target="_blank" rel="noopener noreferrer">NASA Goddard Space Flight Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Lunar Reconnaissance Orbiter (LRO) Lyman-Alpha Mapping Project confirming extensive ice deposits and mobile water molecules within permanently shadowed lunar craters.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/centers-and-facilities/goddard/nasas-lro-finds-lunar-water-more-widespread-than-previously-thought/" target="_blank" rel="noopener noreferrer">
            <span>Read NASA LRO Lunar Water Discovery</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [16]: SHACKLETON CRATER: PERSISTENT SUNLIGHT & DEEP COLD TRAPS -->
      <article class="sidebar-card card-crisis" id="card-final-16">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Shackleton Crater: Persistent Sunlight & Deep Cold Traps</h4>
          <span class="card-badge">NASA SCIENCE // POLAR RIM</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/" target="_blank" rel="noopener noreferrer">NASA Science / Solar System</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Topography and illumination dynamics of Shackleton Crater's rim providing quasi-continuous solar power alongside shadowed cryogenic interior traps.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/" target="_blank" rel="noopener noreferrer">
            <span>Explore Shackleton Rim & Interior Resource</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 Zoom to Power Station</span>
          </button>
        </div>
      </article>

      <!-- FINAL [17]: WATER ON THE MOON (NASA SCIENCE VIDEO) -->
      <article class="sidebar-card card-crisis" id="card-final-17">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Water on the Moon (NASA Science Video)</h4>
          <span class="card-badge">NASA VIDEO // WATER ICE</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=qYW4rTrAA5I" target="_blank" rel="noopener noreferrer" title="Watch Water on the Moon on YouTube on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/qYW4rTrAA5I/hqdefault.jpg" alt="Water on the Moon (NASA Science Video) Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=qYW4rTrAA5I" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Official NASA exploration video exploring how water exists on the lunar surface, bound within minerals and locked as subsurface ice inside deep polar impact craters.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=qYW4rTrAA5I" target="_blank" rel="noopener noreferrer">
            <span>Watch Water on the Moon on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

      <!-- FINAL [18]: MINING WATER ON THE MOON (NASA SCIENCE VIDEO) -->
      <article class="sidebar-card card-crisis" id="card-final-18">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> How Will We Extract Water on the Moon? (NASA)</h4>
          <span class="card-badge">NASA VIDEO // POLAR MINING</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=e_EaXO-9iVE" target="_blank" rel="noopener noreferrer" title="Watch Extracting Water on the Moon on YouTube on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/e_EaXO-9iVE/hqdefault.jpg" alt="How Will We Extract Water on the Moon? (NASA) Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=e_EaXO-9iVE" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA engineering concepts for autonomous drills, thermal sublimation domes, and vapor cold traps to extract life-sustaining water at the lunar South Pole.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=e_EaXO-9iVE" target="_blank" rel="noopener noreferrer">
            <span>Watch Extracting Water on the Moon on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldISRU', 'badgeWater')" title="Zoom to Water & Oxygen Facility">
            <span>🔍 Zoom to Water & Oxygen Facility</span>
          </button>
        </div>
      </article>

    </div>
  `;

  // 2. Helper to find appropriate viewport stage to mount into so it rotates with stage
  function getSidebarMount() {
    return document.getElementById('baseViewport') ||
           document.getElementById('gameViewport') ||
           document.querySelector('.base-viewport') ||
           document.querySelector('.game-viewport') ||
           document.querySelector('.meal-game-viewport') ||
           document.querySelector('.power-game-viewport') ||
           document.querySelector('.isru-game-viewport') ||
           document.body;
  }

  // 3. Initialize and Mount
  function initSidebar() {
    const mountPoint = getSidebarMount();
    let sidebar = document.getElementById('baseResourceSidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.className = 'base-resource-sidebar sidebar-collapsed';
      sidebar.id = 'baseResourceSidebar';
      sidebar.setAttribute('aria-label', 'Lunar Mission Explore Resources');
      sidebar.innerHTML = SIDEBAR_HTML;
      mountPoint.appendChild(sidebar);
    } else if (sidebar.parentElement !== mountPoint) {
      mountPoint.appendChild(sidebar);
    }

    // Pre-activate targeted section tab if specified
    if (targetSection) {
      const tabBtn = sidebar.querySelector(`.sidebar-nav-tab[onclick*="'${targetSection}'"]`);
      if (tabBtn) {
        sidebar.querySelectorAll('.sidebar-nav-tab').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
      }
    }

    // Support URL param ?sidebar=open for testing or direct linking
    if (new URLSearchParams(window.location.search).get('sidebar') === 'open') {
      setTimeout(() => {
        window.toggleResourceSidebar(true);
      }, 250);
    }

    // Support URL param ?highlight_card=card-id to test card opening and glow
    const highlightCard = new URLSearchParams(window.location.search).get('highlight_card');
    if (highlightCard) {
      setTimeout(() => {
        window.openSidebarCard(highlightCard);
      }, 350);
    }
  }

  // Handlers
  window.toggleResourceSidebar = function (forceState) {
    if (typeof sound !== 'undefined' && sound && sound.clickSound) {
      try { sound.clickSound(); } catch (e) {}
    }
    const sidebar = document.getElementById('baseResourceSidebar');
    const pullTab = document.getElementById('sidebarPullTab');
    const tabIcon = document.getElementById('sidebarTabIcon');
    if (!sidebar) return;

    const currentlyCollapsed = sidebar.classList.contains('sidebar-collapsed');
    const willOpen = (typeof forceState === 'boolean') ? forceState : currentlyCollapsed;

    sidebar.classList.toggle('sidebar-collapsed', !willOpen);

    if (tabIcon) {
      tabIcon.textContent = willOpen ? '▶' : '◀';
    }
    if (pullTab) {
      pullTab.setAttribute('title', willOpen ? 'Hide Sidebar' : 'Open Explore Sidebar');
      pullTab.setAttribute('aria-expanded', willOpen);
    }

    // If opening for the first time on a mission page, scroll to its section
    if (willOpen && targetSection && !sidebar.dataset.userHasScrolled) {
      sidebar.dataset.userHasScrolled = 'true';
      window.filterSidebarSection(targetSection);
    }

    // Dismiss onboarding if active on mainbase
    if (willOpen && typeof onboardingStep !== 'undefined' && onboardingStep === 4) {
      if (typeof dismissOnboardingGuide === 'function') dismissOnboardingGuide();
    }
  };

  window.filterSidebarSection = function (sectionKey, btn) {
    if (typeof sound !== 'undefined' && sound && sound.clickSound) {
      try { sound.clickSound(); } catch (e) {}
    }
    const sidebar = document.getElementById('baseResourceSidebar');
    if (!sidebar) return;

    sidebar.querySelectorAll('.sidebar-nav-tab').forEach(b => b.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      const matchBtn = sidebar.querySelector(`.sidebar-nav-tab[onclick*="'${sectionKey}'"]`);
      if (matchBtn) matchBtn.classList.add('active');
    }

    const feed = document.getElementById('sidebarFeed');
    if (!feed) return;

    if (sectionKey === 'all') {
      feed.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById('sec_' + sectionKey);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open sidebar, switch to the right tab, scroll directly to the card and pulse glow
  window.openSidebarCard = function (cardId) {
    if (typeof sound !== 'undefined' && sound && sound.clickSound) {
      try { sound.clickSound(); } catch (e) {}
    }
    const sidebar = document.getElementById('baseResourceSidebar');
    if (!sidebar) return;

    // Open sidebar if collapsed
    if (sidebar.classList.contains('sidebar-collapsed')) {
      window.toggleResourceSidebar(true);
    }

    // Aliases to guarantee finding the card
    const ALIASES = {
      'card-power-7': 'card-power-9',
      'card-power-10': 'card-power-13',
      'card-power-11': 'card-power-13',
      'card-power-15': 'card-power-13',
      'card-meal-6': 'card-meal-7',
      'card-hydro-4': 'card-hydro-3',
      'card-hydro-6': 'card-hydro-5',
      'card-hydro-8': 'card-hydro-7',
      'card-rad-5': 'card-rad-4',
      'card-rad-6': 'card-rad-4',
      'card-rad-8': 'card-rad-7',
      'card-rad-11': 'card-rad-10',
    };
    const targetId = ALIASES[cardId] || cardId;
    const cardEl = document.getElementById(targetId) || document.getElementById(cardId);
    if (!cardEl) return;

    // Detect section category
    let secKey = 'all';
    if (targetId.startsWith('card-power')) secKey = 'power';
    else if (targetId.startsWith('card-meal')) secKey = 'dailymeal';
    else if (targetId.startsWith('card-hydro')) secKey = 'hydroponics';
    else if (targetId.startsWith('card-isru')) secKey = 'wateroxygen';
    else if (targetId.startsWith('card-rad')) secKey = 'radiation';
    else if (targetId.startsWith('card-final')) secKey = 'final';

    const tabBtn = sidebar.querySelector(`.sidebar-nav-tab[onclick*="'${secKey}'"]`);
    sidebar.querySelectorAll('.sidebar-nav-tab').forEach(b => b.classList.remove('active'));
    if (tabBtn) {
      tabBtn.classList.add('active');
      if (typeof tabBtn.scrollIntoView === 'function') {
        tabBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    // Scroll card into center view
    setTimeout(() => {
      const feed = document.getElementById('sidebarFeed');
      if (feed && Math.abs(feed.scrollTop - cardEl.offsetTop) > 1500) {
        feed.scrollTop = cardEl.offsetTop - (feed.clientHeight / 2);
      }
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Trigger vibrant glow animation for ~1.6 seconds
      cardEl.classList.remove('card-highlight-glow');
      void cardEl.offsetWidth; // Force CSS reflow
      cardEl.classList.add('card-highlight-glow');

      setTimeout(() => {
        cardEl.classList.remove('card-highlight-glow');
      }, 1650);
    }, 180);
  };

  window.handleMapInspect = function (bldId, badgeId) {
    window.toggleResourceSidebar(false);
    if (typeof zoomBuilding === 'function') {
      zoomBuilding(bldId, badgeId);
    } else {
      // If outside main base, navigate to mainbase focusing on that building
      window.location.href = `mainbase.html?zoom=${encodeURIComponent(bldId)}`;
    }
  };

  window.handleStartJourneyClick = function () {
    window.toggleResourceSidebar(false);
    if (typeof launchGame === 'function') {
      launchGame();
    } else {
      window.location.href = 'mainbase.html';
    }
  };

  window.exploreMainPageAction = function () {
    if (typeof sound !== 'undefined' && sound && sound.warpSound) {
      try { sound.warpSound(); } catch (e) {}
    }
    window.toggleResourceSidebar(false);

    if (typeof closeActiveTacticalModal === 'function') closeActiveTacticalModal();
    document.querySelectorAll('.tactical-modal').forEach(m => m.classList.add('hidden'));
    if (typeof closePhaseDashboard === 'function') closePhaseDashboard();
    if (typeof unzoomBuilding === 'function') unzoomBuilding();

    const mainBld = document.getElementById('bldMain');
    if (mainBld && typeof mainBld.scrollIntoView === 'function') {
      mainBld.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
