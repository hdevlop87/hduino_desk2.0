import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    type:"",
    title:"",
    data:"",
    show:false
};

const dialogSlice = createSlice({  
    name: "dialog",
    initialState,
    reducers: {
        setDialog: (state, action) => {
            state.title = action.payload.title
            state.type = action.payload.type
            state.data = action.payload.data
            state.show = true
        },
        clearDialog: (state) => {
            state.type = ""
            state.title = ""
            state.data = "";
            state.show = false
        },
        setDialogData: (state, action) => {
            state.data = action.payload.data;
            state.show = false;
        },
    },
});

const { reducer, actions } = dialogSlice;

export const { setDialog, clearDialog,setDialogData } = actions
export default reducer;
