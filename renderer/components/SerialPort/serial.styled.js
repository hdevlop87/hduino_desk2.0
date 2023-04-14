import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    z-index:100;
    width:100%;
    height:100%;
    background: #000000ba;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Card = styled.div`
    width: 400px;
    background-color: ${({ theme }) => theme.colors.background.body};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Title = styled.div`
    border-radius:10px 10px 0 0;
    width:100%;
    background-color: ${({ theme }) => theme.colors.background.paper};
    display: flex;
    align-items: center;
    position: relative;
    padding:8px;
    gap:8px;
    padding-left:16px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding:16px;
    gap:16px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap:16px;
    justify-content:end;
`;