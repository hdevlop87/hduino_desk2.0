import React from 'react'
import { Container, LogoContainer,Title } from './NavBarIntro.styled'
import Image from 'next/image'
import miniLogo from '../../assets/img/miniLogo.png';


const NavBarIntro = () => {
    return (
        <Container>
            <LogoContainer>
                <Image src={miniLogo} alt="logo" />
                <Title>HDUINO</Title>
            </LogoContainer>
        </Container>
    )
}

export default NavBarIntro