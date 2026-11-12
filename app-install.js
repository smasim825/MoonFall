// =============================================================================
// MOONFALL: APP INSTALLATION & PWA CONTROLLER
// =============================================================================

let deferredInstallPrompt = null;

// Register Service Worker for PWA compliance and offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js?v=20261112b')
      .then((reg) => {
        console.log('[PWA] Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
  });
}

// Capture Chrome / Edge / Android native installation prompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  console.log('[PWA] beforeinstallprompt captured!');
  updateInstallButtonState(true);
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  updateInstallButtonState(false);
  console.log('[PWA] MoonFall was successfully installed on device!');
  const statusBadge = document.getElementById('appInstallStatusBadge');
  if (statusBadge) {
    statusBadge.innerHTML = '✅ APP INSTALLED';
    statusBadge.style.color = '#4ade80';
  }
});

function updateInstallButtonState(ready) {
  const ctaBtn = document.getElementById('primaryInstallActionBtn');
  const statusBadge = document.getElementById('appInstallStatusBadge');
  if (ctaBtn) {
    if (ready) {
      ctaBtn.classList.add('glow-pulse');
      ctaBtn.innerHTML = '<span>⚡</span> <span>CLICK HERE TO INSTALL ON THIS DEVICE</span>';
    }
  }
  if (statusBadge && ready) {
    statusBadge.innerHTML = '🟢 READY TO INSTALL';
    statusBadge.style.color = '#38bdf8';
  }
}

// Auto-detect user device OS
function detectUserOS() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'ios';
  }
  if (/android/i.test(ua)) {
    return 'android';
  }
  return 'pc';
}

function openAppInstallModal() {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();
  const modal = document.getElementById('modalAppInstall');
  if (modal) {
    modal.classList.remove('hidden');
    // Auto-select tab matching user's device if first open
    const currentOS = detectUserOS();
    switchAppInstallTab(currentOS, false);
    if (deferredInstallPrompt) {
      updateInstallButtonState(true);
    }
  }
}

function closeAppInstallModal() {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();
  const modal = document.getElementById('modalAppInstall');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function switchAppInstallTab(targetTab, playSound = true) {
  if (playSound && window.sound && window.sound.clickSound) window.sound.clickSound();
  
  const tabs = ['pc', 'android', 'ios'];
  tabs.forEach(t => {
    const btn = document.getElementById('appTabBtn_' + t);
    const content = document.getElementById('appTabContent_' + t);
    if (btn) btn.classList.remove('active');
    if (content) content.style.display = 'none';
  });

  const activeBtn = document.getElementById('appTabBtn_' + targetTab);
  const activeContent = document.getElementById('appTabContent_' + targetTab);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.style.display = 'block';
}

function triggerDirectInstall() {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();

  if (deferredInstallPrompt) {
    // Chrome / Edge / Android native 1-click install prompt!
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the MoonFall install prompt');
        closeAppInstallModal();
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      deferredInstallPrompt = null;
      updateInstallButtonState(false);
    });
    return;
  }

  // If on iOS Safari: Apple does NOT allow JavaScript to trigger install; must use Share -> Add to Home Screen
  const os = detectUserOS();
  if (os === 'ios') {
    switchAppInstallTab('ios');
    alert('On iPhone / iPad:\n1. Tap the Share button at the bottom (square with arrow up ⎋)\n2. Tap "Add to Home Screen" ⊞');
    return;
  }

  // If on Android but prompt hasn't fired yet:
  if (os === 'android') {
    switchAppInstallTab('android');
    alert('In your Android browser:\n1. Tap the three dots menu (⋮) at top right\n2. Tap "Install app" or "Add to Home screen"');
    return;
  }

  // On PC / Mac desktop browser:
  switchAppInstallTab('pc');
  alert('To install on your PC/Mac:\nLook at the right side of your Chrome/Edge address bar for the [Install App] icon (next to the bookmark star), or click the browser 3 dots menu ⋮ -> Save and share -> Install MoonFall.');
}
