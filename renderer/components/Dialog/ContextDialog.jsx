import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Container, Content, MyIcon, MyButton, Items } from './Prompt.styled'
import { removeProject } from '../../features/projectsSlice';
import { Fs_base,H5 } from '../../styles'
import { clearContext } from '../../features/contextSlice'
import { setDialog } from '../../features/dialogSlice'
import { BsFillTrash3Fill ,BsPencilSquare,BsFolderSymlinkFill} from 'react-icons/bs';

const Context= () => {

   const dispatch = useDispatch();
   const showContext = useSelector((state) => state.context.show);

   const title = useSelector((state) => state.context.title);
   const id = useSelector((state) => state.context.id);

   const Delete = () => {
      dispatch(removeProject(id));
      dispatch(clearContext())
   }

   const Rename = () => {
      dispatch(setDialog({
         title: 'Rename Project',
         type: 'renameProject',
         data: id
      }))
      dispatch(clearContext())
   }

   const Export = () => {

   }

   return (
      <Container show={showContext}>
         <Content>
            <MyIcon icon='mdi:close-circle' width={36} onClick={() => dispatch(clearContext())} />

            <H5 bold={true}>{title}</H5>

            <Items>
               <MyButton onClick={() => Delete()}>
                  <BsFillTrash3Fill size={70}/>
                  <Fs_base>Delete</Fs_base>
               </MyButton>

               <MyButton onClick={() => Rename()}>
                  <BsPencilSquare size={70} />
                  <Fs_base>Rename</Fs_base>
               </MyButton>

               <MyButton onClick={() => Export()}>
                  <BsFolderSymlinkFill size={70} />
                  <Fs_base>Move</Fs_base>
               </MyButton>
            </Items>
         </Content>
      </Container>
   )
}

export default Context