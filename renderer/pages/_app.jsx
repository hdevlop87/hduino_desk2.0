import styled, { ThemeProvider } from "styled-components";
import { dark } from '../styles/theme.styled'
import '../styles/globals.css'
import '../Blockly/Blockly.scss'
import React, { useEffect } from 'react'
import Prompt from '../components/Dialog/Prompt';
import ContextDialog from '../components/Dialog/ContextDialog';
import Alert from '../components/Alerts';
import { Provider } from "react-redux";
import { wrapper, store, persistor } from '../features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { loader } from "@monaco-editor/react";


function App({ Component, pageProps: { session, ...pageProps } }) {


   useEffect(() => {
      loader.config({ paths: { vs: './vs'} });
   }, []);

   return (
      <Provider store={store}>
         <ThemeProvider theme={dark}>
            <PersistGate loading={null} persistor={persistor}>
               <AppContainer >
                  {/* <Layout> */}
                  <ContextDialog />
                  <Alert />
                  <Component {...pageProps} />
                  <Prompt />
                  {/* </Layout> */}
               </AppContainer>
            </PersistGate>
         </ThemeProvider>
      </Provider>
   )
}


export default wrapper.withRedux(App);














const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background:red;
    background-color: ${({ theme }) => theme.colors.background.body};
    position: relative;
    overflow: hidden;
`;