import styled, { css } from 'styled-components';
import { Colors } from '../../styles'
import Input from '../Input'


import { RiCloseCircleFill } from 'react-icons/ri';

type props = {
   show?: boolean
};

export const Container = styled.div<props>`
   position: absolute;
   z-index:2000;
   width:100%;
   height:100%;
   background: #000000ba;
   display: ${props => props.show ? 'flex' : 'none'};
`;

export const Content = styled.div`
   position:absolute;
   width:500px;
   height:200px;
   background: ${({ theme }) => theme.colors.background.paper};
   left:50%;
   top:50%;
   transform:translate(-50%,-50%);
   border-radius:20px;
   padding:16px;
   display:flex;
   flex-direction:column;
   gap:16px;
   align-items: center;
   & button{
      color:black;
   }

   & label{
      align-items:center 
      font-size:16px ;
   }

   justify-content: center;

   
`;

export const ButtonContainer = styled.div`
   width: 100%;
   display: flex;
   align-items:end;
   justify-content: right;

   & svg{
      width: 28px;
      height: 28px;
   }
`;

export const MyInput = styled(Input)`
   background: #18191B;
   border-radius:0 6px 6px 0;
   font-weight:600;
`;

export const MyIcon = styled(RiCloseCircleFill)`
   position: absolute;
   top: -16px;
   right: -16px;
   color:red;
   background: white;
   border-radius:50%;
   cursor:pointer;
   width:30px;
   height:30px
`;

export const MyButton = styled.div`
   display: flex;
   justify-content:center;
   flex-direction:column;
   align-items:center;
   gap:6px;
   cursor:pointer;
   color:white;
   & label{
      justify-content:center !important;
      align-items:center !important;
   }

   :hover{
      color: #7366FF;

      & label{
         color: #7366FF;
      }
    }
`;

export const Items = styled.div`
  display: flex;
   width: 100%;
   height: 100%;
   justify-content:space-around;
   align-items:center;
   padding:0 16px 16px 0;
`;


