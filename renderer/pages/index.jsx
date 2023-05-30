import React from 'react'
import basicLayout from '../layouts/basicLayout'
import styled from 'styled-components';
import { H3, H6 } from '../styles';
import Button from '../components/Buttons'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Image from 'next/image'
import robot from '../assets/img/robots/robot2.png'
import { FaChevronDown, FaFileImport, FaFileMedical } from 'react-icons/fa';

import { setDialog } from '../features/dialogSlice'
import { setContext } from '../features/contextSlice';
import { selectProject, getProjects, loadProject } from '../features/projectsSlice';

import miniLogo from '../assets/img/miniLogo.png';


const Projects = () => {
   const router = useRouter()
   const dispatch = useDispatch();
   const projects = useSelector(getProjects);

   const showContext = (msg, id) => {
      dispatch(setContext({
         title: msg,
         id: id
      }))
   }

   const MyItem = ({ id, title }) => {
      return (
         <Item >
            <LeftContent onClick={() => startProg(id)}>
               <Image src={robot} alt="logo" width={32} />
               <H6 >{title}</H6>
            </LeftContent>
            <RightIcon color='white' width={24} onClick={() => showContext(title, id)} />
         </Item>
      )
   }

   const addProject = () => {
      dispatch(setDialog({
         title: 'New Project',
         type: 'addProject'
      }))
   }


   const startProg = (id) => {
      router.push({ pathname: '/platform' });
      dispatch(selectProject(id))
   }


   return (
      <>
         <LogoContainer>
            <Image src={miniLogo} alt="logo" />
            <Title>HDUINO</Title>
         </LogoContainer>

         <Container>
            <H3 bold>My Projects</H3>
            <List>
               {
                  projects.map((e) => {
                     return (
                        <MyItem key={e.id} id={e.id} title={e.title} />
                     )
                  })
               }
            </List>

            <ButtonContainer>
               <Button
                  onClick={() => dispatch(loadProject())}
                  rounded
                  Licon={<FaFileImport />}
                  size='md'
                  bg='purple_normal'>Import project</Button>

               <Button
                  onClick={addProject}
                  rounded
                  Licon={<FaFileMedical />}
                  size='md'
                  bg='orange_normal'>New Project</Button>
            </ButtonContainer>

         </Container>
      </>
   )
}

Projects.layout = basicLayout;

export default Projects

export const LogoContainer = styled.div`
      padding:8px 16px;
    display:flex;
    align-items: center;
    gap:8px;
`;

export const Title = styled.p`
    font-family: 'LuckiestGuy';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 0;
    color: #7366FF;
    padding-top: 4px;
    -webkit-text-stroke: 1.5px #FFFFFF;
`;


const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap: 24px;
    color:white;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    gap: 24px;
    width: 500px;
    height: 450px;
    background: ${({ theme }) => theme.colors.background.paper};
    border-radius: 16px;
    overflow: overlay;

    @media screen and (max-height: 767px) {
      height: 340px;
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    gap: 16px;

    width: 100%;
    height: 62px;

    background: #201F1F;
    border-radius: 16px;

    cursor:pointer;

    :hover{
      background: #7366FF;
    }
`;

const LeftContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const ButtonContainer = styled.div`
    width: 500px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:24px;
    
`;

const RightIcon = styled(FaChevronDown)`
  &:hover {
   cursor: pointer;
}
color:white;
`;

