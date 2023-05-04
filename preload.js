const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
  loadData: () => ipcRenderer.invoke('api:loadData'),
  timerUpdate: () => ipcRenderer.invoke(`countdownUpdate`)
})