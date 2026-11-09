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
  }

  // Sidebar HTML Template
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

      <!-- SECTION 1: POWER -->
      <div class="sidebar-section-header sec-power" id="sec_power">
        <span>⚡ Power Station &amp; Lunar Energy</span>
        <span class="section-header-tag">MISSION 1</span>
      </div>

      <!-- POWER: VIDEO CARD -->
      <article class="sidebar-card card-power">
        <div class="card-title-row">
          <h4 class="card-title">⚡ Power Station</h4>
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
          Deploying a 40-kilowatt nuclear fission reactor and vertical bifacial solar array masts to deliver uninterrupted baseload electrical power through the 14-day freezing lunar night.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=TbVIMSVuEFU" target="_blank" rel="noopener noreferrer">
            <span>Watch Power Tech on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER: WHAT POWERS A SPACECRAFT -->
      <article class="sidebar-card card-power">
        <div class="card-title-row">
          <h4 class="card-title">🚀 What Powers a Spacecraft?</h4>
          <span class="card-badge">SPACE PLACE</span>
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
            <span>Read on NASA Space Place website</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- POWER: NTRS TECHNICAL REPORT (PDF) -->
      <article class="sidebar-card card-power">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Power &amp; Energy for Lunar Surface</h4>
          <span class="card-badge">NASA PDF</span>
        </div>
        <a class="card-banner-wrap" href="https://ntrs.nasa.gov/api/citations/20220005893/downloads/Power%20and%20Energy%20for%20the%20Lunar%20Surface.pdf" target="_blank" rel="noopener noreferrer" title="Download NASA Technical PDF Report">
          <img class="card-banner-img" src="assets/power/lunar_power_report.jpg" alt="NASA Power and Energy for the Lunar Surface Briefing Cover" loading="lazy">
          <span class="card-banner-tag">NASA NTRS // TECHNICAL REPORT</span>
          <span class="card-banner-badge-rt"><img src="assets/nasa_logo.svg" alt="NASA" style="width:12px; height:12px; vertical-align:middle; margin-right:3px; border-radius:50%;">PDF ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/api/citations/20220005893/downloads/Power%20and%20Energy%20for%20the%20Lunar%20Surface.pdf" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Official NASA technical documentation analyzing fission surface power (FSP), vertical bifacial solar arrays, and regenerative fuel cells for South Pole lunar survival.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://ntrs.nasa.gov/api/citations/20220005893/downloads/Power%20and%20Energy%20for%20the%20Lunar%20Surface.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download NASA Technical Report (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPower', 'badgePower')" title="Zoom to Power Station">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- SECTION 2: DAILY MEAL -->
      <div class="sidebar-section-header sec-meal" id="sec_dailymeal">
        <span>🍱 Daily Meal &amp; Astronaut Nutrition</span>
        <span class="section-header-tag">MISSION 2.1</span>
      </div>

      <!-- DAILY MEAL: SPACE FOOD SYSTEMS -->
      <article class="sidebar-card card-meal">
        <div class="card-title-row">
          <h4 class="card-title">🍱 Space Food Systems &amp; Daily Meals</h4>
          <span class="card-badge">FOOD SYSTEMS</span>
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
          Planning daily astronaut rations with rehydratable pouches, thermostabilized foods, and macronutrient targets while carefully rationing water volume and electrical heating power.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/humans-in-space/space-food-systems/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA Space Food Systems</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- DAILY MEAL: GRAVITY ASSIST PODCAST -->
      <article class="sidebar-card card-meal">
        <div class="card-title-row">
          <h4 class="card-title">🎙️ Gravity Assist: Food on the Moon</h4>
          <span class="card-badge">NASA PODCAST</span>
        </div>
        <a class="card-banner-wrap" href="https://www.nasa.gov/podcasts/gravity-assist/gravity-assist-how-to-grow-food-on-the-moon/" target="_blank" rel="noopener noreferrer" title="Listen to NASA Gravity Assist Podcast: How to Grow Food on the Moon">
          <img class="card-banner-img" src="assets/hydroponics/gravity_assist_food_moon.jpg" alt="NASA Gravity Assist Food on the Moon Seedling Sample" loading="lazy">
          <span class="card-banner-tag">NASA PODCAST // LUNAR CROPS</span>
          <span class="card-banner-badge-rt">LISTEN ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/podcasts/gravity-assist/gravity-assist-how-to-grow-food-on-the-moon/" target="_blank" rel="noopener noreferrer">NASA Podcasts</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Chief Scientist Dr. Jim Green discusses the science of lunar farming, nutrient chemistry, and growing fresh produce for long-duration Artemis missions.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/podcasts/gravity-assist/gravity-assist-how-to-grow-food-on-the-moon/" target="_blank" rel="noopener noreferrer">
            <span>Listen to Gravity Assist Podcast (NASA)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- DAILY MEAL: NASA FOOD & NUTRITION BRIEF -->
      <article class="sidebar-card card-meal">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> NASA Food &amp; Nutrition Brief</h4>
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
          NASA Office of the Chief Health and Medical Officer technical guidance on spaceflight dietary stability, nutrient shelf-life, and hydroponic bio-regenerative counter-measures.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/wp-content/uploads/2023/03/food-and-nutrition-technical-brief-ochmo.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download NASA Food &amp; Nutrition Technical Brief (PDF)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Daily Meal on Map</span>
          </button>
        </div>
      </article>

      <!-- SECTION 3: HYDROPONICS -->
      <div class="sidebar-section-header sec-hydro" id="sec_hydroponics">
        <span>🌱 Plant Growth &amp; Hydroponics Lab</span>
        <span class="section-header-tag">MISSION 2.2</span>
      </div>

      <!-- HYDROPONICS: SPACE CROP VIDEO -->
      <article class="sidebar-card card-plant">
        <div class="card-title-row">
          <h4 class="card-title">🌱 Plant Growth &amp; Space Agriculture</h4>
          <span class="card-badge">HYDROPONICS</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer" title="Watch NASA Space Crop &amp; Plant Production on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/W5OzSeTHouU/hqdefault.jpg" alt="NASA Space Crop &amp; Plant Production Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Cultivating fresh microgreens, Arabidopsis, and dwarf crops using automated nutrient solution cycles and LED spectrum recipes to sustain long-duration astronaut nutrition.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=W5OzSeTHouU" target="_blank" rel="noopener noreferrer">
            <span>Watch Space Plant &amp; Crop Production on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View on Base Map</span>
          </button>
        </div>
      </article>

      <!-- HYDROPONICS: SCIENTISTS GROW PLANTS IN LUNAR SOIL -->
      <article class="sidebar-card card-plant">
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
          For the first time, University of Florida and NASA researchers successfully sprouted and cultivated Arabidopsis plants in real Apollo 11, 12, and 17 lunar regolith.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.nasa.gov/humans-in-space/scientists-grow-plants-in-lunar-soil/" target="_blank" rel="noopener noreferrer">
            <span>Read Scientists Grow Plants in Lunar Soil (NASA Feature)</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Plant Growth Lab on Map</span>
          </button>
        </div>
      </article>

      <!-- HYDROPONICS: PLANT HEALTH & SPACE BIOLOGY -->
      <article class="sidebar-card card-plant">
        <div class="card-title-row">
          <h4 class="card-title">🔬 Lunar Plant Health &amp; Diagnostics</h4>
          <span class="card-badge">SPACE BIOLOGY</span>
        </div>
        <a class="card-banner-wrap" href="https://science.nasa.gov/biological-physical/space-biology/" target="_blank" rel="noopener noreferrer" title="Explore NASA Space Biology Research">
          <img class="card-banner-img" src="assets/hydroponics/Astronaut Tending Hydroponic Garden.webp" alt="Astronaut Tending Space Garden" loading="lazy">
          <span class="card-banner-tag">NASA SCIENCE // SPACE BIOLOGY</span>
          <span class="card-banner-badge-rt">EXPLORE ↗</span>
        </a>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://science.nasa.gov/biological-physical/space-biology/" target="_blank" rel="noopener noreferrer">NASA Biological &amp; Physical Sciences</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Investigating microbiological plant health, hydroponic root zone aeration, and automated pathogen diagnostics inside closed lunar greenhouses.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://science.nasa.gov/biological-physical/space-biology/" target="_blank" rel="noopener noreferrer">
            <span>Explore NASA Space Biology Program</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldPlant', 'badgePlant')" title="Zoom to Plant Growth Lab">
            <span>🔍 View Plant Growth Lab on Map</span>
          </button>
        </div>
      </article>

      <!-- SECTION 4: WATER & OXYGEN -->
      <div class="sidebar-section-header sec-water" id="sec_wateroxygen">
        <span>💧 Water &amp; Oxygen In-Situ Extraction</span>
        <span class="section-header-tag">MISSIONS 3 &amp; 4</span>
      </div>

      <!-- NASA's LRO: Lunar Ice Deposits are Widespread -->
      <article class="sidebar-card card-isru">
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

      <!-- Water on the Moon, NASA Goddard (video) -->
      <article class="sidebar-card card-isru">
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

      <!-- The Moon's South Pole & Permanent Shadows, NASA Goddard SVS -->
      <article class="sidebar-card card-isru">
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

      <!-- Is There Water on the Moon? We Asked a NASA Scientist (Episode 27) -->
      <article class="sidebar-card card-isru">
        <div class="card-title-row">
          <h4 class="card-title">🎥 Is There Water on the Moon?</h4>
          <span class="card-badge">NASA VIDEO // EP. 27</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/general/is-there-water-on-the-moon-we-asked-a-nasa-scientist-episode-27" target="_blank" rel="noopener noreferrer">NASA We Asked a Scientist</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Planetary scientists explain how lunar ice survived for billions of years inside ultra-cold polar traps and how Artemis astronauts will harvest it for water and breathable air.
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

      <!-- Apollo to Artemis: Drilling on the Moon, NASA -->
      <article class="sidebar-card card-isru">
        <div class="card-title-row">
          <h4 class="card-title">💧 Apollo to Artemis: Drilling on the Moon</h4>
          <span class="card-badge">NASA KSC</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/centers-and-facilities/kennedy/apollo-to-artemis-drilling-on-the-moon/" target="_blank" rel="noopener noreferrer">NASA Kennedy Space Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Tracing the evolutionary lineage of lunar drilling technology from Apollo astronauts manually hammering core tubes to autonomous rotary percussive drills engineered for Artemis.
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

      <!-- PRIME-1 Science & Technology (TRIDENT and MSolo), NASA Science -->
      <article class="sidebar-card card-isru">
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

      <!-- NASA's Lunar Drill Technology Passes Tests on the Moon, NASA -->
      <article class="sidebar-card card-isru">
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

      <!-- PRIME-1 video, NASA -->
      <article class="sidebar-card card-isru">
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

      <!-- Overview: In-Situ Resource Utilization, NASA -->
      <article class="sidebar-card card-isru">
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
          NASA's foundational blueprint for living off the land on the Moon: finding, extracting, and refining local lunar resources into water, oxygen, and liquid rocket propellant.
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

      <!-- NASA Glenn Excavation Laboratory -->
      <article class="sidebar-card card-isru">
        <div class="card-title-row">
          <h4 class="card-title">💧 Glenn Excavation Laboratory</h4>
          <span class="card-badge">NASA GLENN</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.nasa.gov/?p=38643" target="_blank" rel="noopener noreferrer">NASA Glenn Research Center</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Robotic excavation facility developing drum bucket excavators, pneumatic conveyance, and autonomous rover traction systems operating inside granular lunar regolith simulant testbeds.
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

      <!-- Integration of ISRU Into Lunar/Mars Exploration Through Field Analogs (PDF) -->
      <article class="sidebar-card card-isru">
        <div class="card-title-row">
          <h4 class="card-title"><img class="card-nasa-icon" src="assets/nasa_logo.svg" alt="NASA Logo"> Integration of ISRU Field Analogs</h4>
          <span class="card-badge">NASA PDF</span>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100021362.pdf" target="_blank" rel="noopener noreferrer">NASA NTRS</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          NASA Technical Report detailing end-to-end field testing of robotic excavation, sealed pressurized reactor subsystems, and carbothermal reduction delivering high-purity water and O₂.
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

      <!-- Low Pressure Frost Formation for Lunar Polar Water Capture -->
      <article class="sidebar-card card-isru">
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

      <!-- Microwave Extraction of Water from Lunar Regolith Simulant (PDF) -->
      <article class="sidebar-card card-isru">
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

      <!-- How Will We Extract Water on the Moon? We Asked a NASA Technologist (Episode 47) -->
      <article class="sidebar-card card-isru">
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

      <!-- Environmental Control and Life Support Systems (ECLSS), NASA -->
      <article class="sidebar-card card-isru">
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

      <!-- Electrochemical Solutions for Advanced Life Support (ISS OGA electrolysis) -->
      <article class="sidebar-card card-isru">
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

      <!-- ISS Environmental Control and Life Support System fact sheet (PDF) -->
      <article class="sidebar-card card-isru">
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

      <!-- SECTION 5: RADIATION -->
      <div class="sidebar-section-header sec-rad" id="sec_radiation">
        <span>🛡️ Radiation Shielding &amp; Space Weather</span>
        <span class="section-header-tag">MISSION 5</span>
      </div>

      <!-- RADIATION: SPACE RADIATION SHIELDING -->
      <article class="sidebar-card card-shelter">
        <div class="card-title-row">
          <h4 class="card-title">🛡️ Space Radiation Shielding</h4>
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
          Engineered subterranean habitats with sintered regolith berms and dual-layer water walls designed to shield expedition crews from Solar Particle Events (SPE) and cosmic rays.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=vpNa4u997xA" target="_blank" rel="noopener noreferrer">
            <span>Watch Space Radiation Shielding on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RADIATION: LUNAR RADIATION DEFENSE -->
      <article class="sidebar-card card-shelter">
        <div class="card-title-row">
          <h4 class="card-title">🛡️ Lunar Radiation Defense</h4>
          <span class="card-badge">RESEARCH // VIDEO</span>
        </div>
        <div class="card-video-wrap">
          <a class="card-video-thumb-link" href="https://www.youtube.com/watch?v=mn60n3jdI_8" target="_blank" rel="noopener noreferrer" title="Watch Lunar Radiation Defense on YouTube">
            <img class="card-video-thumb-img" src="https://img.youtube.com/vi/mn60n3jdI_8/hqdefault.jpg" alt="Lunar Radiation Defense Video Thumbnail" loading="lazy">
            <div class="card-video-play-btn"></div>
          </a>
        </div>
        <div class="card-source-row">
          <span>Source: <a class="card-source-link" href="https://www.youtube.com/watch?v=mn60n3jdI_8" target="_blank" rel="noopener noreferrer">NASA Video</a></span>
          <span class="card-source-dots">● ● ●</span>
        </div>
        <p class="card-desc">
          Analyzing deep space ionizing radiation, galactic cosmic rays, and passive shielding materials essential for long-duration astronaut survival on the Moon.
        </p>
        <div class="card-links-col">
          <a class="card-text-link" href="https://www.youtube.com/watch?v=mn60n3jdI_8" target="_blank" rel="noopener noreferrer">
            <span>Watch Lunar Radiation Defense on YouTube</span>
          </a>
        </div>
        <div style="margin-top: 6px;">
          <button class="card-inspect-btn" type="button" onclick="handleMapInspect('bldShelter', 'badgeShelter')" title="Zoom to Radiation Shelter">
            <span>🔍 View Radiation Shelter on Map</span>
          </button>
        </div>
      </article>

      <!-- RADIATION: NASA SPACE WEATHER -->
      <article class="sidebar-card card-shelter">
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

    </div>
  `;

  // 2. Initialize and Mount
  function initSidebar() {
    let sidebar = document.getElementById('baseResourceSidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.className = 'base-resource-sidebar sidebar-collapsed';
      sidebar.id = 'baseResourceSidebar';
      sidebar.setAttribute('aria-label', 'Lunar Mission Explore Resources');
      sidebar.innerHTML = SIDEBAR_HTML;
      document.body.appendChild(sidebar);
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
