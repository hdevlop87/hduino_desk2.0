import React from 'react'
import { Container } from './Buttons.styled';

const Buttons = ({
   children,
   size = 'sm',
   bg = 'blue',
   Licon,
   Ricon,
   onClick,
   ...rest
}) => {

   return (
      <Container size={size} bg={bg} onClick={onClick} {...rest}>
         {Licon && Licon}
         {children}
         {Ricon && Ricon}
      </Container>
   )
}

export default Buttons