import fs from 'fs';
import path from 'path';
import { app, dialog, ipcMain,clipboard  } from 'electron';
import exec from 'await-exec';
import SerialPort from './SerialPort';


export default class arduino {
    constructor() {
        this.isSaved = null;
        this.registerEventHandlers();
    }


    registerEventHandlers() {
        const eventHandlers = [
            { eventName: 'saveExternal', handler: this.saveProject.bind(this) },
            { eventName: 'verifyCode', handler: this.verifyCode.bind(this) },
            { eventName: 'uploadCode', handler: this.uploadCode.bind(this) },
            { eventName: 'getPorts', handler: this.getPorts.bind(this) },

        ];

        eventHandlers.forEach(({ eventName, handler }) => {
            ipcMain.on(eventName, async (event, data) => {
                try {
                    const responseData = await handler(data);
                    event.reply(eventName, { type: 'success', message: responseData });
                } catch (error) {
                    event.reply(eventName, { type: 'error', message: error.message });
                }
            });
        });
    } 

    //===================================================================================================//
    getAbsolutePath() {
        return path.join(app.getAppPath());  
    }

    async getPorts() {
        return await SerialPort.listPorts(); 
    }
    //===================================================================================================//

    async verifyCode(data) {
        const { filePath, compilerFlag } = data;

        if (!this.isFoder(filePath)) {
            throw new Error("project dont exist save First");
        }

        this.writeDataToFile(filePath, data);

        let pathCompiler = this.getAbsolutePath().replace('\\resources\\app.asar', '');

        if (filePath) {
            try {
                const cmd = `arduino-cli.exe compile --fqbn ${compilerFlag} ${filePath} --output-dir ${filePath}`;
                const { stdout } = await exec(cmd, { cwd: `${pathCompiler}\\compiler` });
                return stdout
            } catch (error) {
                const { stderr } = error;
                throw new Error(stderr)
            }
        }
    }

    async uploadCode(data) {
        const { filePath, compilerFlag } = data;

        if (!this.isFoder(filePath)) {
            throw new Error("project dont exist save First");
        }

        this.writeDataToFile(filePath, data);

        let pathCompiler = this.getAbsolutePath().replace('\\resources\\app.asar', '');

        if (filePath) {
            try {
                let cmd = `arduino-cli upload --verbose -p ${data.port} --fqbn ${compilerFlag} ${filePath}`;
                const { stderr } = await exec(cmd, { cwd: `${pathCompiler}\\compiler ` });
                console.log(stderr);
                return stderr
            } catch (error) {
                const { stderr } = error;
                throw new Error(stderr)
            }
        }

    }

    //===================================================================================================//

    isFoder(folder) {
        return fs.existsSync(folder);
    }

    async saveProject(data) {
        const fileName = data.title
        const folderPath = await this.showSaveDialog();
        if (folderPath) {
            const folder = path.join(folderPath, fileName);

            if (!this.isFoder(folder)) {
                fs.mkdir(folder, { recursive: true }, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            return await this.writeDataToFile(folder, data);
        }
        throw new Error('save canceled')
    }

    async showSaveDialog() {
        const options = {
            title: 'Save folder',
            defaultPath: app.getPath('documents'),
            buttonLabel: 'Save Arduino Project',
            properties: ['openDirectory', 'createDirectory']
        };

        const result = await dialog.showOpenDialog(options);
        return result.filePaths.length > 0 ? result.filePaths[0] : null;
    }

    async writeDataToFile(folder, data) {
        const fileName = data.title
        const filePathPrj = path.join(folder, fileName + '.json');
        const filePathINO = path.join(folder, fileName + '.ino');
        const filePathHex = path.join(folder, fileName + '.ino.hex');
        const jsonData = JSON.stringify(data, null, 2);
        const inoData = data.code;

        clipboard.writeText(filePathHex);

        fs.writeFile(filePathPrj, jsonData, (err) => {
            if (err) throw err;
        });

        fs.writeFile(filePathINO, inoData, (err) => {
            if (err) throw err;
        });

        return folder;
    }
}