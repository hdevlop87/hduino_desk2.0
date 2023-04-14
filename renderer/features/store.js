import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from 'redux'

import dialogReducer from './dialogSlice';
import alertReducer from './alertSlice';
import contextReducer from './contextSlice';
import portsReducer from './portsSlice';
import ipcReducer from './ipcSlice';
import projectsReducer from './projectsSlice';
import navBarReducer from './navBarSlice';


import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
   navBar:navBarReducer,
   projects: projectsReducer,
   context: contextReducer,
   alert: alertReducer,
   ports:portsReducer,
   dialog: dialogReducer,
   ipc:ipcReducer,
})

const persistConfig = {
   key: 'root',
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      })
})

export const persistor = persistStore(store)

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

