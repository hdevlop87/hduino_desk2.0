import React from 'react'
import basicLayout from '../../layouts/basicLayout'
import IntroCard from '../../components/IntroCard';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    gap:64px;
    justify-content:center;
    align-items:center;
`;

const Intro = () => {
    return (
        <Container>
            <IntroCard type='Codage'  bg='secondary' route='projects'/>
            <IntroCard type='Control' bg='orange' route='controls'/>
            <IntroCard type='Video'   bg='primary' route='video'/>
        </Container>
    )
}

Intro.layout = basicLayout;

export default Intro