import styled, { css } from 'styled-components';
import { Colors } from '../../styles'



export const Container = styled.div`
    height:50px;
    width:100%;
    display:flex;
    align-items: center;
    padding-left: 16px;
    padding-top: 8px;
`;

export const LogoContainer = styled.div`
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