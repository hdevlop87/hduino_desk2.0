import styled from 'styled-components';
import { Colors } from '../../styles'
import is from '../../utils/isStyled';


export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 16px;
    padding: 0px 16px;
    gap: 16px;
    height: 40px;
    border-radius:0 6px 6px 0;

    ${is('outlined')`
        border: 1.4px solid ${({ theme }) => theme.colors.text.desactived};
    `};

    ${is('isError')`
        border: 1.4px solid ${Colors.red_normal};
    `};

    input{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background-color:transparent;
        color:${({ theme }) => theme.colors.text.primary};
        font-size: 16px;
        ::placeholder {
            background-color:transparent;
        }

        &:focus{
            border: none;
        }

        &:active {
            border: none;
        }
        }

`;
