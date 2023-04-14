import styled, { css } from 'styled-components';
import { Colors } from '../../styles'



export const Container = styled.div<{ bg: string }>`
    position: relative;
    display:flex;
    width: 280px;
    height: 400px;
    background: ${({ bg })  => Colors[`${bg}_normal`]};
    box-shadow: 0px 2px 10px rgba(20, 21, 33, 0.18);
    border-radius: 12px;
    align-items:center;
    flex-direction:column;
    padding: 24px 16px;
    gap:24px;
    justify-content: space-between;
`;

