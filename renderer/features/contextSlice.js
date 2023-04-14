import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    show:false,
    title:null,
    id:null
};

const contextSlice = createSlice({ 
    name: "context",
    initialState,
    reducers: {
        setContext: (state, action) => {
            state.show = true;
            state.title = action.payload.title
            state.id = action.payload.id
        },
        clearContext: (state) => {
            state.show = false;
            state.title = ""
            state.id = ""
        }
    },
});

const { reducer, actions } = contextSlice;

export const { setContext, clearContext } = actions
export default reducer;
