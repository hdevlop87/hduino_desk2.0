import { EventEmitter } from 'events'
import { BrowserWindow} from 'electron'


class MainWindow extends EventEmitter {
    constructor(isProd) {
        super();
        this.port = process.argv[2];
        this.name = 'MainWindow';
        this.url = `http://localhost:${this.port}`;
        this.properties = {
            width: 800,
            height: 800,
            autoHideMenuBar: true,
            backgroundColor: '#2E3138',
            darkTheme: true,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                backgroundThrottling: false,
                contextIsolation: false,
            }
        };
        this.isProd = isProd

        this.initialize() 
    }

    async initialize() {
        this.window = new BrowserWindow(this.properties); 
        this.window.webContents.on('did-finish-load', async () => {
            
            this.isReady = true;
            this.emit('ready');
          });
          await (this.isProd
            ? this.window.loadURL('app://./')
            : this.window.loadURL(this.url));
    }

    reload(force) {
        ipcMain.handle('proceed-with-reload', async () => {
            this.emit('reload');

            await this.onClose();

            force
                ? this.window.webContents.reloadIgnoringCache()
                : this.window.webContents.reload();

            this.emit('reloaded');
        });

        this.emit('reload-requested');
    }

    show() {
        this.window.setMenuBarVisibility(false);
        this.window.show(); 
        this.window.maximize();
    }

    close() {
        this.emit('close');
        this.window.removeAllListeners();
        this.window.close();
        this.emit('closed');
    }

    send(channel, payload) {
        this.window?.webContents.send(channel, payload);
    }
}

export default MainWindow