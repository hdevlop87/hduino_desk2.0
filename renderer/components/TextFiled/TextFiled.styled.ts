import styled from 'styled-components';
import is from '../../utils/isStyled'
import { Colors } from '../../styles'

type content = {
    outlined?: boolean, 
    isError?: boolean, 
};

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;
    gap: 16px;
    height: 100%;
    overflow: hidden;
`;


export const TextInput = styled.input<content>`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color:transparent;
    color:${({ theme }) => theme.colors.text.primary};
    font-size: 14px;
    padding-left: 8px;

    ::placeholder {
        font-family: 'Roboto Slab', serif;
        font-size: 14px;
        font-weight: 400;
        color:${({ theme }) => theme.colors.text.secondary};
        background-color:transparent; 
        opacity: 1;
        padding-left: 8px;
    }

    &:focus{
        border: 1px solid ${Colors.primary_normal};
        border-radius:0 6px 6px 0;
    }
    
    &:active {
        border: 1px solid ${Colors.primary_normal};
        border-radius:0 6px 6px 0;
    }
    overflow: hidden;
    
    border-radius:0 6px 6px 0;

    ${is('outlined')`
        border: 2px solid #30334E;
    `};

    ${is('isError')`
        border: 2px solid ${Colors.red_normal};
    `};

`;