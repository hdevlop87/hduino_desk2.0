import React from 'react'
import Button from '.'
import styled, { keyframes } from 'styled-components';

const load_button = ({ canAnim, children,...rest }:any) => {

    return (
        <Button {...rest}>
            {!canAnim && children}
            {canAnim && <Lds_ring/>}
        </Button>
    )
}

export default load_button

const anim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg); 
  }
`;

const Lds_ring = styled.div`
    position: relative;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
        margin: 0px;
        border-radius: 80%;
        border: 3px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: ${anim} 1.2s linear infinite;
    }

`;







// box - sizing: border - box;
// display: block;
// position: relative;
// width: 64px;
// height: 64px;
// margin: 8px;
// border: 8px solid #fff;
// border - radius: 50 %;
// animation: ${ anim } 1.2s cubic - bezier(0.5, 0, 0.5, 1) infinite;
// border - color: #fff transparent transparent transparent;