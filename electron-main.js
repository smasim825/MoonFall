const { app, BrowserWindow, Menu, shell, globalShortcut } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    backgroundColor: '#040814',
    title: 'MoonFall: Lunar Outpost Survival Simulator',
    icon: path.join(__dirname, 'assets/icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      webSecurity: true
    }
  });

  // Remove default menu bar for clean game UI
  Menu.setApplicationMenu(null);

  // Load the main game entry point
  mainWindow.loadFile('index.html');

  // Show window smoothly when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle external links (open in user's default browser, not in the game window)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Prevent navigation to external URLs inside the app
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Keyboard shortcuts for full immersion
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // F11: Toggle Fullscreen
    if (input.key === 'F11' && input.type === 'keyDown') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    }
    // Escape: Exit Fullscreen
    if (input.key === 'Escape' && input.type === 'keyDown' && mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
      event.preventDefault();
    }
    // F12: Toggle Developer Tools
    if (input.key === 'F12' && input.type === 'keyDown') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
    // Ctrl+R or Cmd+R: Reload
    if (
      (input.control || input.meta) &&
      input.key.toLowerCase() === 'r' &&
      input.type === 'keyDown'
    ) {
      mainWindow.reload();
      event.preventDefault();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ensure single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
