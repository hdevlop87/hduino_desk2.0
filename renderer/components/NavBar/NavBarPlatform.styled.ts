import styled from 'styled-components';
import Image from 'next/image'

export const Container = styled.div`
    width:calc(100% - 186px);
    height:60px;
    position:absolute;
    top:0;
    z-index:50;
    left:186px;
    display:flex;
    justify-content:space-between;
    padding:0 16px;
    align-items: center;
`;

export const HomeButton = styled.div`
    display:flex;
    gap:16px;
    width: 100%;
    align-items:center;
`;


export const ArduinoButton = styled.div`
    display:flex;
    gap:16px;
    width: 100%;
`;

export const EditorControl = styled.div`
    display:flex;
    gap:16px;
`;

export const MyImage = styled.div`
    cursor:pointer;
    background-color:black;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 48px;
    height: 48px;

    &:active {
        transform: scale(0.9);
    }
`;

export const TitleContainer = styled.div`
    background-color:black;
    border-radius:15px;
    min-width:130px;
    height:40px;
    display:flex;
    gap:8px;
    padding: 8px ;
    align-items:center;
    color:white;
    justify-content:space-between;

    & label{
        font-size: 16px;
        margin-left:5px;
        min-width: 20px !important;
    }

    & svg{
        cursor:pointer
    }

`;