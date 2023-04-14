import {
  screen,
  BrowserWindow,
} from 'electron';
import Store from 'electron-store';

export default function createWindow(windowName, options) {

  let win;


  win = new BrowserWindow({
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  });



  return win;
};
