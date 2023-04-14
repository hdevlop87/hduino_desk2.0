import styled from 'styled-components';
import { Colors } from '../../styles'
import is from '../../utils/isStyled'


export const Container = styled.div`
    display: flex;
    flex-direction: ${({ LabelPos }) => LabelPos == 'left' ? "row" : "column"};
    justify-content: start;
    width: 100%;
    color:${({ theme }) => theme.colors.text.primary};
    gap:16px;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    height:40px;
    position: relative;
    justify-content: start;

    ${is('isCheckbox')`
        background-color: transparent;
        width:16px;
    `};

    ${is('outlined')`
         padding: 0px 8px;
        border: 1.4px solid ${({ theme }) => theme.colors.text.desactived};
        border-radius:0 6px 6px 0;
    `};

    ${is('isError')`
        border: 1.4px solid ${Colors.red_normal};
    `};


`;

export const IconContainer = styled.div`
    display: flex;
    padding: 8px;
    gap: 8px;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.background_light};
    color: ${({ theme }) => theme.colors.background_pressed}; 
`;






