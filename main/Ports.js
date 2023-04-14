import SerialPort from './SerialPort.js';

class Ports  {
    constructor(mainWindow) {
        this.ports = [];
        this.window = mainWindow;
    }

    async createPort(options) {
        const found = this.ports.some(p => p.path === options.path)
        if (!found) {
            let port = new SerialPort(options);
            try {
                await port.open();
                this.ports.push(port);
                this.success("openPort", `${options.path} OPENED`)

            } catch (error) {
                this.error("openPort", error.message) 
            } 
        }
        this.success("openPort", `${options.path} OPENED`)
    }

    async deletePort(path) {
        this.ports = this.ports.filter(p => {
            if (p.path === path) {
                p.close()
                this.error("closePort", `${path} CLOSED`)
            }
            return p.path !== path;
        });

    } 

    getStatePort(path) {
        const found = this.ports.some(p => p.path === path)
        const state = found ?
            this.success("statePort", `${path} OPENED`) :
            this.error("statePort", `${path} CLOSED`)
    }

    success(target, msg) {
        this.window.send(target, {
            type: "success",
            label: msg
        });
    }

    error(target, msg) {
        this.window.send(target, {
            type: "error",
            label: msg
        });
    }
}

export default Ports