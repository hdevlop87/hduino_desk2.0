import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    message: "",
    type: "",
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.show = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearAlert: (state) => {
            state.show = false;
            state.message = ""; 
            state.type = "";
        },
    },
});

const { reducer, actions } = alertSlice;

export const { setAlert, clearAlert } = actions;
export default reducer;