import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Content, MyInput, MyIcon, ButtonContainer } from './Prompt.styled'
import Button from '../Buttons'
import { setAlert } from '../../features/alertSlice';
import { BsCheck } from 'react-icons/bs';

import { setDialogData, clearDialog } from '../../features/dialogSlice';
import { addProject, updateProject,getProjects } from '../../features/projectsSlice';



const Prompt= () => {

   const dispatch = useDispatch();
   const showDialog = useSelector((state) => state.dialog.show);
   const type = useSelector((state) => state.dialog.type);
   const title = useSelector((state) => state.dialog.title);
   const data = useSelector((state) => state.dialog.data);
   const projects = useSelector(getProjects);
   let [input, setResp] = useState(data);
   const isProjectExist = projects.find((project) => project.title === input);

   const checkProject = () => {
      if (isProjectExist) {
         dispatch(setAlert({
            message: 'Project Already Exist', 
            type: 'error'
         }))
         return false;
      }
      return true;
   }

   const confirm = () => {

      if (input === '') {
         dispatch(setAlert({
            message: 'Oops! Please enter a file project name',
            type: 'error'
         }))
         return false;
      }

      input = input.replace(/\s/g, '_')

      switch (type) {
         case 'addProject':
            if (checkProject()) {
               dispatch(addProject(input));
            }
            break;
         case 'renameProject':
            if (checkProject()) {
               dispatch(updateProject({
                  id: data,
                  title: input
               }));
            }
            break;
         default:
            break;
      }
      dispatch(setDialogData({
         data: input,
         show: false
      }))

      //dispatch(clearDialog()) 
      setResp('')
   }

   return (
      <Container show={showDialog}>
         <Content >
            <MyIcon onClick={() => dispatch(clearDialog())} />

            <MyInput
               value={input}
               label={title}
               callback={e => setResp(e)}
            />

            <ButtonContainer>

               <Button
                  rounded
                  Licon={<BsCheck color='white' size={28} />}
                  size='md'
                  bg='green_normal' onClick={() => confirm()}>Confirm</Button>
            </ButtonContainer>


         </Content>

      </Container>
   )
}

export default Prompt