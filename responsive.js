(() => {
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

  const setForceHorizontal = (enabled) => {
    document.body.classList.toggle('force-horizontal', enabled);
    if (typeof window.checkAndStartIntro === 'function') {
      window.checkAndStartIntro();
    }
  };

  window.requestLandscape = async () => {
    if (document.body.classList.contains('force-horizontal')) {
      setForceHorizontal(false);
      const returnToggle = document.querySelector('.quick-rotate-toggle');
      if (returnToggle) {
        returnToggle.innerHTML = '↻';
        returnToggle.setAttribute('aria-label', 'Rotate game view');
        returnToggle.title = 'Rotate game view';
      }
      return;
    }

    if (typeof screen.orientation?.lock === 'function') {
      try {
        const appRoot = document.documentElement;
        if (!document.fullscreenElement && appRoot.requestFullscreen) {
          await appRoot.requestFullscreen();
        }
        await screen.orientation.lock('landscape');
        return;
      } catch {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen().catch(() => {});
        }
      }
    }

    setForceHorizontal(true);
    const banner = document.querySelector('.orientation-banner');
    if (banner) banner.style.display = 'none';

    const toggle = document.querySelector('.quick-rotate-toggle');
    if (toggle) {
      toggle.innerHTML = '↶';
      toggle.setAttribute('aria-label', 'Return to portrait view');
      toggle.title = 'Return to portrait view';
    }
  };

  window.toggleForceHorizontal = () => {
    setForceHorizontal(!document.body.classList.contains('force-horizontal'));
    const toggle = document.querySelector('.quick-rotate-toggle');
    if (toggle) {
      const isRotated = document.body.classList.contains('force-horizontal');
      toggle.innerHTML = isRotated ? '↶' : '↻';
      toggle.setAttribute('aria-label', isRotated ? 'Return to portrait view' : 'Rotate game view');
      toggle.title = isRotated ? 'Return to portrait view' : 'Rotate game view';
    }
  };

  window.addEventListener('orientationchange', () => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      setForceHorizontal(false);
    }
  });

  screen.orientation?.addEventListener?.('change', () => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      setForceHorizontal(false);
    }
  });
})();
