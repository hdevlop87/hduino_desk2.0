import styled from 'styled-components';

import Image from 'next/image';

export const Container = styled.div`
    position: absolute;
    z-index:2000;
    width:100%;
    height:100%;
    background: #000000ba;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Card = styled.div`
    width: 500px;
    height: 580px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
    position: relative;
`;

export const StyledImage = styled(Image)`
    width: 350px;
    height: 400px;
`;
