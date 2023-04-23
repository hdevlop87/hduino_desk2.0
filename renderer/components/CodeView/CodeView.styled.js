import styled from 'styled-components';
import { RiCloseCircleFill } from 'react-icons/ri';

export const Container = styled.div`
    display: ${props => props.show ? 'flex' : 'none'}; 
    top: 80px;
    right: 20px;
    height: 85%;
    width: 500px;
    background-color: rgb(30, 30, 30);
    position: absolute;
    border: 2px solid blanchedalmond;
    border-radius: 10px;
    z-index:1000;
    flex-direction:column;
    gap:4px;
`;

export const ButtonCopy = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border:2px solid #7c7f97;
    border-radius:8px;
    padding:4px;
    margin-right:16px;
    width:80px;
    cursor:pointer;

    & label{
        cursor:pointer;
        min-width:0
    }

    :hover{
        border:2px solid #323232;
    }

    :active{
        transform:scale(0.95)
    }
`;

export const Tab = styled.div`
    height: 38px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-color: blanchedalmond;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding-left:8px;
    
`;

export const Title = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    gap:8px;
`;

export const MyIcon = styled(RiCloseCircleFill)`
   position: absolute;
   top: -16px;
   right: -16px;
   color:red;
   background: white;
   border-radius:50%;
   cursor:pointer;
`;