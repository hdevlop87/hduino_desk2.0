import styled from 'styled-components';
import { H6 } from '../../styles'
import is, { match } from '../../utils/isStyled'
import { Colors } from '../../styles/Colors.styled'

export const Container = styled.div`
    position: absolute;
    z-index:10000;
    width:100%;
    height:100%;
    background: #000000d6;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;


export const VerifDiv = styled.div`
    width: 82%;
    height: 30%;
    border: 5px rgb(0, 117, 102) solid;
    background-color: black;
    border-radius: 20px;
    overflow: auto;
    padding: 14px;
`;

export const Label = styled(H6)`

    ${match('type', 'error')`
        color: ${Colors.secondary_hover};
    `};

    ${match('type', 'warning')`
        color: ${Colors.orange_hover};
    `};
`;



