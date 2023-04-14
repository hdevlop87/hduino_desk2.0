import { app } from 'electron'
import os from 'os'

let Os = {
    get name() {
        if (Os.isMacOs) return 'macOS';
        if (Os.isWindows) return 'Windows';
        if (Os.isLinux) return 'Linux';

        return 'Unknown';
    }
}

Os.isMacOs = process.platform === 'darwin';
Os.isWindows = process.platform === 'win32';
Os.isLinux = process.platform === 'linux';

Os.environmentPath = {
    app: app.getAppPath(),
    get appResources() {
        let appPath;

        if (Os.isMacOs) {
            appPath = app.getAppPath();
        }
        else {
            if (app.isPackaged) {
                appPath = path.dirname(app.getPath('exe'));
            }
            else {
                appPath = app.getAppPath();
            }
        }

        return path.join(appPath, 'resources');
    },
    userData: app.getPath('userData'),
    desktop: app.getPath('desktop'),
    macOsAppResources: Os.isMacOs ? path.join(app.getAppPath(), '..') : null
}

export default Os 