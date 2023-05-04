// Import the required modules
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios')

// Create a new window and load the index.html file
async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1250,
    height: 703,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('home.html');
}

async function loadAPIData() {
  const res = await axios.get("https://fdo.rocketlaunch.live/json/launches/next/5")
  const result = res.data
  return result
}

// Initialize the app and create the window when the app is ready
app.whenReady().then(async () => {
  ipcMain.handle('api:loadData', loadAPIData)

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
