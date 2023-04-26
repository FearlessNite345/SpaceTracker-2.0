// Import the required modules
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Create a new window and load the index.html file
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('home.html');
}

// Initialize the app and create the window when the app is ready
app.whenReady().then(() => {
  createWindow();

  // Quit the app when all windows are closed
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});

// Activate the app when no windows are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
