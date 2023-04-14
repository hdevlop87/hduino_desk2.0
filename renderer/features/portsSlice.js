import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { asyncEmit } from './ipcSlice';

//====================== get All Ports =============================//
export const getPorts = createAsyncThunk("getPorts",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState, dispatch } = thunkAPI;

        try {
            let { message } = dispatch(await asyncEmit('getPorts', null));
            return message.map(device => `${device.path} (${device.friendlyName.split('(')[0]})`);

        } catch ({ message }) {
            return rejectWithValue(message);
        }

    });
//===============================================================//

const portSlice = createSlice({
    name: "Ports",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getPorts.fulfilled]: (state, { payload }) => {
            return payload
        },
        //====================================================//
    }

});

export const getListPorts = state => state.ports;

const { reducer, actions } = portSlice;

export const { } = actions
export default reducer;

