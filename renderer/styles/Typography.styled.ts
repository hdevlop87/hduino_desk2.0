import styled, { css } from 'styled-components';
const fontSize = [40, 33, 28, 23, 18, 16, 14, 12, 10]
import is from '../utils/isStyled'
import { Colors } from '.'

type props = {
   bold?: boolean,
   color?: boolean, 
   pointer?: boolean, 
   full?: boolean,
};

const P = styled.label<props>`
   text-overflow: clip;
   font-family: 'Roboto Slab', serif;
   font-weight: 400;
   line-height: 1.2;
   color:white;
   ${({ bold }) => bold && css`font-weight: 600;`};
   ${({ color }) => color && css`color: ${Colors[color]};`};
   ${({ pointer }) => pointer && css`cursor:pointer;`};
   
   ${is('full')`
      width: 100%;
   `};
   ${is('pointer')`
      cursor: pointer;
   `};

   display:flex;
   align-items:center;
   min-width:80px;
   overflow: hidden;
   min-height:20px;
   white-space: pre-line;
   justify-content:start ;
`;


export const H1 = styled(P)`
   font-size: ${fontSize[0]}px;
`;

export const H2 = styled(P)`
   font-size: ${fontSize[1]}px;
`;

export const H3 = styled(P)`
   font-size: ${fontSize[2]}px;
`;

export const H4 = styled(P)`
   font-size: ${fontSize[3]}px;
`;

export const H5 = styled(P)`
   font-size: ${fontSize[4]}px;
`;

export const H6 = styled(P)`
   font-size: ${fontSize[5]}px;
`;

export const Fs_base = styled(P)`
   font-size: ${fontSize[6]}px;
`;

export const Fs_sm = styled(P)`
   font-size: ${fontSize[7]}px;
`;

export const Fs_xs = styled(P)`
   font-size: ${fontSize[8]}px;
`;
