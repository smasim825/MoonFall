(() => {
  const gameHud = document.getElementById('gameTopHud');
  const gameHudHome = gameHud?.parentNode;
  const gameHudMarker = gameHud ? document.createComment('gameTopHud home') : null;

  if (gameHud && gameHudHome && gameHudMarker) {
    gameHudHome.insertBefore(gameHudMarker, gameHud);
  }

  const setForceHorizontal = (enabled) => {
    document.body.classList.toggle('force-horizontal', enabled);

    if (!gameHud || !gameHudMarker) return;
    if (enabled && gameHud.parentNode !== document.body) {
      document.body.appendChild(gameHud);
      gameHud.classList.add('mobile-floating-hud');
    } else if (!enabled && gameHud.parentNode === document.body && gameHudMarker.parentNode) {
      gameHud.classList.remove('mobile-floating-hud');
      gameHudMarker.parentNode.insertBefore(gameHud, gameHudMarker.nextSibling);
    }
  };

  window.requestLandscape = async () => {
    if (document.body.classList.contains('force-horizontal')) {
      setForceHorizontal(false);
      const returnToggle = document.querySelector('.quick-rotate-toggle');
      if (returnToggle) {
        returnToggle.textContent = '↻ Screen';
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
      toggle.textContent = '↶ Screen';
      toggle.setAttribute('aria-label', 'Return to portrait view');
      toggle.title = 'Return to portrait view';
    }
  };

  window.toggleForceHorizontal = () => {
    setForceHorizontal(!document.body.classList.contains('force-horizontal'));
    const toggle = document.querySelector('.quick-rotate-toggle');
    if (toggle) {
      const isRotated = document.body.classList.contains('force-horizontal');
      toggle.textContent = isRotated ? '↶ Screen' : '↻ Screen';
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