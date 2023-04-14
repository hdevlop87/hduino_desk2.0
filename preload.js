import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppPath: () => ipcRenderer.sendSync('get-app-path'),
});