import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { setCompilerModal } from './navBarSlice';
import { asyncEmit } from './ipcSlice';
import { setAlert } from '../features/alertSlice'
//==================================================================//
//====================== save Projects =============================//
export const saveProject = createAsyncThunk("project/saveProject",
   async (_, thunkAPI) => {
      const { rejectWithValue, getState, dispatch } = thunkAPI
      try {
         let project = getProject(getState());
         let projectID = getProjectID(getState());
         let { message } = dispatch(await asyncEmit('saveExternal', project));

         dispatch(updateProject({
            id: projectID,
            filePath: message
         }));

         dispatch(setAlert({
            message: 'Data Saved To ' + message,
            type: 'success'
         }));

         return message

      } catch ({ message }) {
         dispatch(setAlert({
            message: message,
            type: 'error'
         }))
         return rejectWithValue(message);
      }
   });
//===============================================================//
//====================== verifyCode =============================//
export const verifyCode = createAsyncThunk("project/verifyCode",
   async (_, thunkAPI) => {
      const { rejectWithValue, getState, dispatch } = thunkAPI;
      let project = getProject(getState());

      dispatch(setCompilerModal({
         show: true,
         loading: true,
      }));

      try {
         let { message } = dispatch(await asyncEmit('verifyCode', project));

         message = message.match(/.*(?=\[92mUsed platform)/s)[0].trim()

         dispatch(setCompilerModal({
            show: true,
            loading: false,
            message: {
               show: true,
               label: message,
               type: 'success'
            }
         }));

         return message
      }
      catch ({ message }) {

         dispatch(setCompilerModal({
            show: true,
            loading: false,
            message: {
               show: true,
               label: message,
               type: 'error'
            }
         }));
         return rejectWithValue(message);
      }
   });

   //===============================================================//
//====================== verifyCode =============================//
export const uploadCode = createAsyncThunk("project/uploadCode",
async (_, thunkAPI) => {
   const { rejectWithValue, getState, dispatch } = thunkAPI;
   let project = getProject(getState());

   dispatch(setCompilerModal({
      show: true,
      loading: true,
   }));

   try {
      let { message } = dispatch(await asyncEmit('uploadCode', project));

      dispatch(setCompilerModal({
         show: true,
         loading: false,
         message: {
            show: true,
            label: message,
            type: 'warning'
         }
      }));

      return message
   }
   catch ({ message }) {

      dispatch(setCompilerModal({
         show: true,
         loading: false,
         message: {
            show: true,
            label: message,
            type: 'error'
         }
      }));
      return rejectWithValue(message);
   }
});
//==================================================================//
//==================================================================//

const initialState = {
   list: [],
   selectedProject: null,
}

const projectsSlice = createSlice({
   name: 'projects',
   initialState,
   reducers: {
      addProject(state, action) {
         const newProject = {
            id: uuidv4(),
            title: action.payload,
            boardName: 'Arduino Uno',
            compilerFlag: 'arduino:avr:uno',
            port: 'COM1',
            baudRate: 115200,
            code: null,
            xml: null,
            filePath: null
         };
         state.list.push(newProject);
      },

      removeProject(state, action) {
         state.list = state.list.filter((project) => project.id !== action.payload);
      },

      updateProject(state, action) {
         const { id, ...changes } = action.payload;
         const index = state.list.findIndex((project) => project.id === id);
         if (index !== -1) {
            state.list[index] = {
               ...state.list[index],
               ...changes,
            };
         }
      },

      selectProject(state, action) {
         state.selectedProject = action.payload;
      },
   },
});

const getProjectsState = state => state.projects;

export const getProjects = createSelector(
   [getProjectsState],
   projects => projects.list
);

export const getProjectID = createSelector(
   [getProjectsState],
   projects => projects.selectedProject
);

export const getProject = createSelector(
   [getProjects, getProjectID],
   (projects, selectedProject) =>
      selectedProject ? projects.find(project => project.id === selectedProject) : null
);

export const getCode = createSelector(
   [getProject],
   project => project ? project.code : null 
);

export const getTitle = createSelector(
   [getProject],
   project => project ? project.title : null 
);

export const { addProject, removeProject, updateProject, selectProject } = projectsSlice.actions;
export default projectsSlice.reducer;