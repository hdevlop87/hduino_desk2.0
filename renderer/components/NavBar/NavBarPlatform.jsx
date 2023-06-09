import React from 'react'
import Image from 'next/image'
import house from '../../assets/img/house.png'
import play from '../../assets/img/play.png'
import vga from '../../assets/img/vga.png'
import laptop from '../../assets/img/laptop.png'
import chip from '../../assets/img/chip.png'
import save from '../../assets/img/save.png'
import tickmark from '../../assets/img/tick-mark.png'
import { useRouter } from 'next/router'
import { Container, HomeButton, ArduinoButton, EditorControl, MyImage, TitleContainer } from './NavBarPlatform.styled';
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Fs_base } from '../../styles'

import { verifyCode, uploadCode, saveProject, getTitle, getProjectID } from '../../features/projectsSlice'
import { setBoardModal, setCodeModal, setPortModal } from '../../features/navBarSlice'
import { setContext } from '../../features/contextSlice';
import {getPorts} from '../../features/portsSlice'

const NavBarPlatform = () => {
   const router = useRouter();
   const dispatch = useDispatch();

   const title = useSelector(getTitle);
   const ID = useSelector(getProjectID);

   return (
      <Container>

         <HomeButton>
            <MyImage onClick={() => router.push({ pathname: '/' })} >
               <Image src={house} alt="logo" width={32} />
            </MyImage>
            <TitleContainer>
               <Fs_base>{title}</Fs_base>
               <BiDotsVerticalRounded size={22} onClick={() => dispatch(setContext({
                  title: title,
                  id: ID
               }))}
               />
            </TitleContainer>
         </HomeButton>

         <ArduinoButton>
            <MyImage onClick={() => dispatch(verifyCode())}>
               <Image src={tickmark} alt="logo" width={32} />
            </MyImage>
            <MyImage onClick={() => dispatch(uploadCode())}>
               <Image src={play} alt="logo" width={32} />
            </MyImage>
         </ArduinoButton>

         <EditorControl>
            <MyImage onClick={() => {dispatch(setPortModal(true));dispatch(getPorts());}}>
               <Image src={vga} alt="logo" width={32} />
            </MyImage>

            <MyImage onClick={() => dispatch(setCodeModal(true))}>
               <Image src={laptop} alt="logo" width={32} />
            </MyImage>

            <MyImage onClick={() => dispatch(setBoardModal(true))}>
               <Image src={chip} alt="logo" width={32} />
            </MyImage>

            <MyImage onClick={() => dispatch(saveProject())}>
               <Image src={save} alt="logo" width={32} />
            </MyImage>
         </EditorControl>

      </Container>
   )
}

export default NavBarPlatform