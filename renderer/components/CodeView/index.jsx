import { getProjectID, updateProject, getCode } from '../../features/projectsSlice'
import { setCodeModal, codeModal } from '../../features/navBarSlice';

import { Container, Title, Tab, MyIcon, ButtonCopy } from './CodeView.styled';
import { useDispatch, useSelector } from "react-redux";

import { loader } from "@monaco-editor/react";
import text from '../../assets/img/array.png'
import Editor from "@monaco-editor/react";
import { Fs_base } from '../../styles'
import Image from 'next/image';
import React, { useRef } from 'react'


const CodeView = () => {
   loader.config({ paths: { vs: './vs' } });
   const projectID = useSelector(getProjectID);
   const show = useSelector(codeModal);
   const code = useSelector(getCode);
   const dispatch = useDispatch();
   const editorRef = useRef(null);


   const handleEditorChange = (value) => {
      dispatch(updateProject({
         id: projectID,
         code: value
      }))
   }

   const handleEditorDidMount = (editor, monaco) => {
      editorRef.current = editor;
   }

   const handleCopyClick = () => {
      const textToCopy = editorRef.current.getValue();
      navigator.clipboard.writeText(textToCopy);
   }



   return (
      <Container show={show}>
         <Tab>
            <Title>
               <Image src={text} alt="" />
               <Fs_base color='blue_hover'>Arduino Code</Fs_base>
            </Title>
            <ButtonCopy onClick={() => handleCopyClick()}>
               <Fs_base color='blue_hover'>Copy</Fs_base>
            </ButtonCopy>

            <MyIcon size={32} onClick={() => dispatch(setCodeModal(false))} />
         </Tab>

         <Editor
            onMount={handleEditorDidMount}
            theme='vs-dark'
            onChange={handleEditorChange}
            height="calc(93%)"
            defaultLanguage="cpp"
            defaultValue="// some comment"
            value={code}
         />
      </Container>
   )
}

export default CodeView