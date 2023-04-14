import { createSelector, createSlice } from '@reduxjs/toolkit';


const initialState = {
   boardModal: false,
   portModal: false,
   codeModal: false,
   compilerModal: {
      show: false,
      loading: false
   }
}

const navbarSlice = createSlice({
   name: 'navbar',
   initialState,
   reducers: {
      setBoardModal: (state, action) => {
         state.boardModal = action.payload;
      },
      setPortModal: (state, action) => {
         state.portModal = action.payload;
      },
      setCodeModal: (state, action) => {
         state.codeModal = action.payload;
      },
      setCompilerModal: (state, action) => {
         const { ...changes } = action.payload;
         state.compilerModal = {
            ...state.compilerModal,
            ...changes,
         };
      },
   },
});

export const compilerLoading = (state) => state.navBar.compilerModal.loading;
export const compilerModal = (state) => state.navBar.compilerModal.show;
export const compilerState = (state) => state.navBar.compilerModal;

export const boardModal = (state) => state.navBar.boardModal;
export const portModal = (state) => state.navBar.portModal;
export const codeModal = (state) => state.navBar.codeModal;


export const compilerShowMessage = createSelector(
   [compilerState],
   compiler => compiler.message ? compiler.message.show : null
);

export const compilerMessage = createSelector(
   [compilerState],
   compiler => compiler.message ? compiler.message.label : null
);

export const compilerType = createSelector(
   [compilerState],
   compiler => compiler.message ? compiler.message.type : null
);


const { reducer, actions } = navbarSlice;
export const { setBoardModal, setPortModal, setCodeModal, setCompilerModal } = actions
export default reducer;