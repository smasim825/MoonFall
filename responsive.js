(() => {
  const syncVisualViewportVars = () => {
    const vv = window.visualViewport;
    const docEl = document.documentElement;
    const w = Math.min(
      window.innerWidth || Infinity,
      vv ? vv.width : Infinity,
      docEl.clientWidth || Infinity
    );
    const h = Math.min(
      window.innerHeight || Infinity,
      vv ? vv.height : Infinity,
      docEl.clientHeight || Infinity
    );
    const offsetTop = vv ? vv.offsetTop : 0;
    const offsetLeft = vv ? vv.offsetLeft : 0;
    if (Number.isFinite(w) && w > 0) {
      docEl.style.setProperty('--vv-w', `${Math.round(w)}px`);
      docEl.style.setProperty('--vv-left', `${Math.round(offsetLeft)}px`);
      docEl.style.setProperty('--vv-center-x', `${Math.round(offsetLeft + w / 2)}px`);
    }
    if (Number.isFinite(h) && h > 0) {
      docEl.style.setProperty('--vv-h', `${Math.round(h)}px`);
      docEl.style.setProperty('--vv-top', `${Math.round(offsetTop)}px`);
      docEl.style.setProperty('--vv-center-y', `${Math.round(offsetTop + h / 2)}px`);
    }
  };

  syncVisualViewportVars();
  window.addEventListener('resize', syncVisualViewportVars, { passive: true });
  window.addEventListener('scroll', syncVisualViewportVars, { passive: true });
  window.addEventListener('orientationchange', () => {
    syncVisualViewportVars();
    setTimeout(syncVisualViewportVars, 120);
    setTimeout(syncVisualViewportVars, 350);
  }, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', syncVisualViewportVars, { passive: true });
    window.visualViewport.addEventListener('scroll', syncVisualViewportVars, { passive: true });
  }

  window.toggleMobileMenu = () => {
    const hud = document.getElementById('gameTopHud');
    const toggle = document.getElementById('mobileMenuToggle');
    if (!hud || !toggle) return;
    const isOpen = hud.classList.toggle('mobile-menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    const span = toggle.querySelector('span');
    if (span) span.textContent = isOpen ? '✕' : '☰';
  };

  window.closeMobileMenu = () => {
    const hud = document.getElementById('gameTopHud');
    const toggle = document.getElementById('mobileMenuToggle');
    if (hud) hud.classList.remove('mobile-menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      const span = toggle.querySelector('span');
      if (span) span.textContent = '☰';
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const hud = document.getElementById('gameTopHud');
    const menu = document.getElementById('mobileNavMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    if (!hud || !hud.classList.contains('mobile-menu-open')) return;
    if (menu && !menu.contains(event.target) && toggle && !toggle.contains(event.target)) {
      window.closeMobileMenu();
    }
  });

  const TOOLBAR_TIP_STORAGE_KEY = 'moonfall_toolbar_tip_dismissed';

  const isMobileDevice = () => {
    const smallViewport = window.innerWidth <= 1024 && window.innerHeight <= 600;
    const portraitPhone = window.innerWidth <= 600;
    const touchCapable = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    return (smallViewport || portraitPhone) && (touchCapable || window.innerWidth <= 900);
  };

  const isCurrentlyLandscape = () => {
    return window.matchMedia('(orientation: landscape)').matches ||
      document.body.classList.contains('force-horizontal');
  };

  const isAlreadyFullscreen = () => {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      window.navigator.standalone ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: standalone)').matches
    );
  };

  const ensureToolbarGuideModal = () => {
    let modal = document.getElementById('toolbarGuideOverlay');
    if (modal) return modal;

    modal = document.createElement('aside');
    modal.id = 'toolbarGuideOverlay';
    modal.className = 'toolbar-guide-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Hide browser toolbar tip');
    modal.innerHTML = `
      <div class="toolbar-guide-card" onclick="event.stopPropagation()">
        <div class="toolbar-guide-header">
          <span class="toolbar-guide-badge">📱 STEP 2 // DISPLAY TIP</span>
        </div>
        <h3 class="toolbar-guide-title">HIDE TOOLBAR FOR FULLSCREEN VIEW</h3>
        <p class="toolbar-guide-sub">For the best widescreen lunar mission experience, hide your browser's address bar:</p>
        <div class="toolbar-guide-steps">
          <div class="toolbar-step-box">
            <div class="toolbar-step-label">🍎 Safari (iPhone)</div>
            <div class="toolbar-step-desc">Tap <strong>AA</strong> or <strong>⊞</strong> in the address bar and select <strong>"Hide Toolbar"</strong>.</div>
          </div>
          <div class="toolbar-step-box">
            <div class="toolbar-step-label">🤖 Chrome / Android</div>
            <div class="toolbar-step-desc">Tap <strong>Full Screen</strong> below or open browser menu <strong>⋮ → Full screen</strong>.</div>
          </div>
        </div>
        <div class="toolbar-guide-actions">
          <button type="button" class="toolbar-btn-primary" onclick="acceptToolbarGuideFullscreen()">
            ⛶ FULL SCREEN
          </button>
          <button type="button" class="toolbar-btn-secondary" onclick="dismissToolbarGuide()">
            GOT IT ✓
          </button>
        </div>
      </div>
    `;
    modal.addEventListener('click', () => window.dismissToolbarGuide());
    document.body.appendChild(modal);
    return modal;
  };

  window.showToolbarGuideIfNeeded = () => {
    try {
      if (new URLSearchParams(window.location.search).has('notip')) return;
      if (sessionStorage.getItem(TOOLBAR_TIP_STORAGE_KEY) === 'true') return;
    } catch (e) {}
    if (!isMobileDevice() || !isCurrentlyLandscape() || isAlreadyFullscreen()) return;

    const modal = ensureToolbarGuideModal();
    modal.classList.add('active');
  };

  window.dismissToolbarGuide = () => {
    try {
      sessionStorage.setItem(TOOLBAR_TIP_STORAGE_KEY, 'true');
    } catch (e) {}
    const modal = document.getElementById('toolbarGuideOverlay');
    if (modal) modal.classList.remove('active');
    window.scrollTo(0, 1);
  };

  window.acceptToolbarGuideFullscreen = async () => {
    try {
      sessionStorage.setItem(TOOLBAR_TIP_STORAGE_KEY, 'true');
    } catch (e) {}
    const modal = document.getElementById('toolbarGuideOverlay');
    if (modal) modal.classList.remove('active');
    await window.toggleFullScreen();
  };

  const FORCE_HORIZONTAL_STORAGE_KEY = 'moonfall_force_horizontal';

  const setForceHorizontal = (enabled) => {
    // Force-horizontal CSS rotation disabled per user request: rotate phone physically
    document.body.classList.remove('force-horizontal');
    try {
      sessionStorage.removeItem(FORCE_HORIZONTAL_STORAGE_KEY);
    } catch (e) {}
  };

  window.requestLandscape = async () => {
    // Force rotation removed; users rotate device physically
    setForceHorizontal(false);
  };

  window.toggleForceHorizontal = () => {
    setForceHorizontal(false);
  };

  let toastTimer = null;
  window.showIOSFullscreenTip = () => {
    // Disabled: fullscreen hints removed per user request
    return;
  };

  window.dismissIosFullscreenToast = () => {
    const toast = document.getElementById('iosFullscreenToast');
    if (toast) toast.style.display = 'none';
    if (toastTimer) clearTimeout(toastTimer);
  };

  window.toggleFullScreen = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // 1. Standard / Webkit Fullscreen API (Android, PC, Mac, iPad)
    const el = document.documentElement;
    let fullscreenEntered = false;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) {
        try {
          await el.requestFullscreen();
          fullscreenEntered = true;
        } catch (e) {}
      } else if (el.webkitRequestFullscreen) {
        try {
          el.webkitRequestFullscreen();
          fullscreenEntered = true;
        } catch (e) {}
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }

    // 2. Lock screen orientation to landscape
    if (screen.orientation?.lock) {
      try {
        await screen.orientation.lock('landscape').catch(() => {});
      } catch (e) {}
    }

    // 3. Safari Minimal-UI Collapse Trigger (collapses Safari top/bottom bars)
    window.scrollTo(0, 1);
    setTimeout(() => window.scrollTo(0, 1), 80);
    setTimeout(() => window.scrollTo(0, 1), 250);

    // 4. On iOS where Apple restricts native DOM requestFullscreen, show friendly Home Screen tip
    if (isIOS && !window.navigator.standalone) {
      window.showIOSFullscreenTip();
    }
  };

  window.startMissionWithFullscreen = async () => {
    await window.toggleFullScreen();
    if (typeof window.startMissionWithAudio === 'function') {
      window.startMissionWithAudio();
    } else if (typeof window.handleIntroClick === 'function') {
      window.handleIntroClick();
    }
  };

  window.addEventListener('orientationchange', () => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      setForceHorizontal(false);
      setTimeout(() => window.showToolbarGuideIfNeeded(), 260);
    }
  });

  screen.orientation?.addEventListener?.('change', () => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      setForceHorizontal(false);
      setTimeout(() => window.showToolbarGuideIfNeeded(), 260);
    }
  });

  window.addEventListener('resize', () => {
    if (isCurrentlyLandscape()) {
      setTimeout(() => window.showToolbarGuideIfNeeded(), 200);
    }
  });

  const restoreForceHorizontalIfNeeded = () => {
    try {
      sessionStorage.removeItem(FORCE_HORIZONTAL_STORAGE_KEY);
      document.body.classList.remove('force-horizontal');
    } catch (e) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      restoreForceHorizontalIfNeeded();
      setTimeout(() => window.showToolbarGuideIfNeeded(), 300);
    });
  } else {
    restoreForceHorizontalIfNeeded();
    setTimeout(() => window.showToolbarGuideIfNeeded(), 300);
  }
})();
