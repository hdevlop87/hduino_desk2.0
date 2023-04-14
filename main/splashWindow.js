import { BrowserWindow,app } from 'electron'
import { EventEmitter } from 'events'
import path from 'path';

class SplashWindow extends EventEmitter {
    constructor() {
        super();

        this.name = 'SplashWindow';
        this.url = null

        this.properties = {
            width: 440,
            height: 340,
            backgroundColor: '#2E3138', 
            resizable: false,
            minimizable: false,
            focusable: false,
            frame: false,
            darkTheme: true,
            show: false,
            frame: false,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
            }
        };

        this.initialize()
    }

    getAbsolutePath() {
        return path.join(app.getAppPath());
    }

    initialize() {
        this.url = this.getAbsolutePath().replace('\\resources\\app.asar', '');
        this.window = new BrowserWindow(this.properties)
        this.window.setMenuBarVisibility(false);
        this.window.webContents.on('did-finish-load', () => {
            this.emit('ready');
        });

        this.window.loadFile(path.join(this.url, '\\splashScreen\\splashscreen.html'))
    }

    show() {
        this.window?.show();
    }

    close() {
        this.emit('close');
        this.window.removeAllListeners();
        this.window.close();
        this.emit('closed');
    }
}

export default SplashWindow 