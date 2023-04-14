import styled, { css } from 'styled-components';
import { Colors } from '../../styles'

export const Container = styled.div`
    position:absolute;
   z-index:2000;
   width:100%;
   height:100%;
   background: #000000ba;
   visibility:${({ show }) => show ? 'visible' : 'hidden'};
`;
