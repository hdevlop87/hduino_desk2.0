import { createSlice } from '@reduxjs/toolkit';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer || false;


export const asyncEmit = async (eventName, data) => {
 
	return new Promise((resolve, reject) => {
		ipcRenderer.once(eventName, (event, response) => {
			if (response && response.type && response.type === 'error') {
				reject(response);
			} else {
				resolve(response);
			}
		});
		ipcRenderer.send(eventName, data);
	});
};

export const ipcSlice = createSlice({
	name: 'ipc',
	initialState: {},
	reducers: {
		send: (state, action) => {
			ipcRenderer.send(action.payload.event, action.payload.data);
		},
		on: (state, action) => {
			ipcRenderer.on(action.payload.event, action.payload.handler);
		},
		off: (state, action) => {
			ipcRenderer.off(action.payload.event, action.payload.handler);
		},
	},
});

export const { send, on, off } = ipcSlice.actions;

export default ipcSlice.reducer;