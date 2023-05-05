// Import the required modules
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios')
require('dotenv').config({
  path: `${__dirname}/dev.env`
})

// Create a new window and load the index.html file
async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1338,
    height: 753,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('./src/frontend/home.html');
}

async function loadAPIData() {
  const res = await axios.get("https://fdo.rocketlaunch.live/json/launches",
    {
      headers: { "Authorization": `Bearer ${process.env.token}` }
    })
  const result = res.data
  return result
}

// Initialize the app and create the window when the app is ready
app.whenReady().then(async () => {
  ipcMain.handle('api:loadAPIData', loadAPIData)

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
