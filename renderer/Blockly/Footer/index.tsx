import React from 'react'
import { NavigationControls } from './footer.styled';
import Hduino from '../Hduino';

import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { BiUndo, BiRedo, BiMove } from 'react-icons/bi';

const Footer = () => {

   const undo = () => {
      Hduino.undo()
   }

   const redo = () => {
      Hduino.redo()
   }

   const focus = () => {
      Hduino.zoom(0)
   }

   const zoomIn = () => {
      Hduino.zoom(1);
   }

   const zoomOut = () => {
      Hduino.zoom(-1);
   }

   return (
      <NavigationControls>

         <button onClick={() => focus()}>
            <BiMove/>
         </button>
         <button onClick={() => zoomIn()}>
            <BsZoomIn/>
         </button>
         <button onClick={() => zoomOut()}>
            <BsZoomOut/>
         </button>

         <div className="separator"></div>

         <button onClick={() => undo()} >
            <BiUndo/>
         </button>
         <button onClick={() => redo()} >
            <BiRedo />
         </button>

      </NavigationControls>
   )
}

export default Footer