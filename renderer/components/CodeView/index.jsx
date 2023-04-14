import { getProjectID, updateProject,getCode } from '../../features/projectsSlice'
import { setCodeModal,codeModal } from '../../features/navBarSlice';

import { Container, Title, Tab, MyIcon } from './CodeView.styled';
import { useDispatch, useSelector } from "react-redux";

import { loader } from "@monaco-editor/react";
import text from '../../assets/img/array.png'
import Editor from "@monaco-editor/react";
import { Fs_base } from '../../styles'
import Image from 'next/image';
import React from 'react'


const CodeView = () => {
   loader.config({ paths: { vs: './vs' } });
   const projectID = useSelector(getProjectID);
   const show = useSelector(codeModal);
   const code = useSelector(getCode);
   const dispatch = useDispatch();

   const handleEditorChange = (value) => {
      dispatch(updateProject({
         id: projectID,
         code: value
      }))
   }

   return (
      <Container show={show}>
         <Tab>
            <Title>
               <Image src={text} alt="" />
               <Fs_base color='blue_hover'>Arduino Code</Fs_base>
            </Title>
            <MyIcon size={32} onClick={() => dispatch(setCodeModal(false))} />
         </Tab>

         <Editor
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