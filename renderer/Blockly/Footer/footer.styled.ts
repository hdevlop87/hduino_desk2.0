import styled from 'styled-components';

export const NavigationControls = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 1px;
    left: 30%;
    display: flex;

  & button{
    cursor:pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 2.8rem;
    height: 2.8rem;
    padding: 0;
    color: white;
    background-color: var(--tinkerblocks-color-button);
    margin: 5px;
    border-radius:50%;

    &:active {
        transform: scale(0.9);
        color: rgb(115, 255, 0);
    }

    svg {
        font-size: 25px;
    }
  }
`;





