// =============================================================================
// MOONFALL: APP INSTALLATION & PWA CONTROLLER
// =============================================================================

let deferredInstallPrompt = null;

// Listen for browser native PWA install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const directBtn = document.getElementById('directInstallActionBtn');
  if (directBtn) directBtn.style.display = 'inline-flex';
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const directBtn = document.getElementById('directInstallActionBtn');
  if (directBtn) directBtn.style.display = 'none';
  console.log('MoonFall was installed successfully!');
});

function openAppInstallModal() {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();
  const modal = document.getElementById('modalAppInstall');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeAppInstallModal() {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();
  const modal = document.getElementById('modalAppInstall');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function switchAppInstallTab(targetTab) {
  if (window.sound && window.sound.clickSound) window.sound.clickSound();
  
  // Tab buttons
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

function triggerNativePwaInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the MoonFall install prompt');
      }
      deferredInstallPrompt = null;
    });
  } else {
    // If not supported directly, stay in the modal and highlight the steps
    alert('Please follow the steps below for your browser to add MoonFall to your home screen or desktop.');
  }
}
