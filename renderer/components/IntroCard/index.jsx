import React from 'react'
import { Container } from './IntroCard.styled';
import Image from 'next/image'
import montage from '../../assets/montage.png';
import joystick from '../../assets/joystick.png';
import software from '../../assets/software.png';
import Button from '../Buttons';
import { useRouter } from 'next/router'


const IntroCard = ({ type, bg, route }) => {

  const router = useRouter()

  const Type = {
    Codage: software,
    Control: joystick,
    Video: montage
  }

  return (
    <Container bg={bg}>
      <Image
        src={Type[type]}
        alt="logo"
        width={200} />

      <Button
        size='md'
        bg={`${bg}_dark`}
        onClick={() => router.push('/' + route)}
      >
        {type}
      </Button>
    </Container>
  )
}

export default IntroCard