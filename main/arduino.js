import fs from 'fs';
import path from 'path';
import { app, dialog, ipcMain,clipboard  } from 'electron';
import exec from 'await-exec';
import SerialPort from './SerialPort';
import os from 'os';

 
export default class arduino { 
    constructor() {
        this.isSaved = null;
        this.registerEventHandlers();
    }

    registerEventHandlers() {
        const eventHandlers = [
            { eventName: 'saveExternal', handler: this.saveProject.bind(this) },
            { eventName: 'loadProject', handler: this.loadProject.bind(this) },
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

    async execCommand(cmd) {
        try {
            let pathCompiler = this.getAbsolutePath().replace('\\resources\\app.asar', '');
            const { stdout, stderr } = await exec(cmd, { cwd: `${pathCompiler}\\compiler` });
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        } catch (error) {
            const { stderr } = error;
            throw new Error(stderr);
        }
    }

    createTempFolder() {
        const tempFolderPath = path.join(os.tmpdir(), `arduino-temp`);
        fs.mkdirSync(tempFolderPath, { recursive: true }); 
        return tempFolderPath;
    }

    async prepareAndExecuteCommand(data, commandType) {
        let { filePath, compilerFlag } = data;

        if (!this.isFoder(filePath)) {
            filePath = this.createTempFolder();
            data.title = 'arduino-temp';
        }
        this.writeDataToFile(filePath, data);
        let cmd
        if (commandType === 'verify') {
            cmd = `arduino-cli.exe compile --fqbn ${compilerFlag} ${filePath} --output-dir ${filePath}`;
        }
        else if (commandType === 'upload') {
            cmd = `arduino-cli upload --verbose -p ${data.port} --fqbn ${compilerFlag} ${filePath}`;
        } 
        else {
            throw new Error('Invalid command type');
        }

        return await this.execCommand(cmd);
    }

    async verifyCode(data) {
        return await this.prepareAndExecuteCommand(data, 'verify');

    }

    async uploadCode(data) {
        return await this.prepareAndExecuteCommand(data, 'upload');
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

        const defaultPath = app.getPath('documents') ;
    
        const options = {
            title: 'Save folder',
            defaultPath: defaultPath,
            buttonLabel: 'Save Arduino Project',
            properties: ['openDirectory', 'createDirectory']
        };
    
        const result = await dialog.showOpenDialog(options);
        return result.filePaths.length > 0 ? result.filePaths[0] : null;
    }

    async writeDataToFile(folder, data) {
        const fileName = data.title
        const filePathPrj = path.join(folder, fileName + '.hd');
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

    async loadProject() {
        const filePath = await this.showOpenDialog();
        if (filePath) {
            const fileContent = await this.readFileContent(filePath);
            const projectData = JSON.parse(fileContent);
            return projectData;
        }
        throw new Error('Load canceled');
    }

    async showOpenDialog() {
        const options = {
            title: 'Open Arduino Project',
            defaultPath: app.getPath('documents'),
            buttonLabel: 'Open Project',
            filters: [
                { name: 'Arduino Project', extensions: ['hd'] },
            ],
            properties: ['openFile']
        };

        const result = await dialog.showOpenDialog(options);
        return result.filePaths.length > 0 ? result.filePaths[0] : null;
    }

    async readFileContent(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}