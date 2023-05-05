const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
  loadAPIData: () => ipcRenderer.invoke('api:loadAPIData')
})