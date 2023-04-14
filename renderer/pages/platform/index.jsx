import { useEffectOnce } from '../../utils/useEffectOnce'
import Prompt from '../../components/Dialog/Prompt'
import Editor from '../../Blockly/Editor';
import React, { useRef } from 'react';
import Footer from '../../Blockly/Footer';
import NavBarPlatform from '../../components/NavBar/NavBarPlatform';
import SelectBoard from '../../components/SelectBoard'
import CodeView from '../../components/CodeView'
import SerialPort from '../../components/SerialPort';
import Compiler from '../../components/Compiler';

const Platform = () => {

    const blocklyDiv = useRef(null);

    useEffectOnce(() => {
        if (blocklyDiv.current) {
            const editor = new Editor()
            editor.init()
        }
    });

    return (
        <>
            <SerialPort />
            <Compiler />
            <CodeView />
            <SelectBoard />
            <NavBarPlatform />
            <Prompt />
            <div ref={blocklyDiv} id="blocklyDiv" />
            <Footer />
        </>
    )
}


export default Platform