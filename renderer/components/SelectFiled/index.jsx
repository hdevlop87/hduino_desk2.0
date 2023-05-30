import React, { useRef } from 'react';
import { InputContainer, SelectContainer, Item, PlaceHolder, DropdownWrapper } from './SelectFiled.styled'
import { Fs_base } from '../../styles'
import { useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { FaChevronDown } from 'react-icons/fa';


const SelectFiled = (p) => {

   const dropdownRef = useRef();
   const [selectedOption, setSelectedOption] = useState(p.value);
   const [showDropdown, setShowDropdown] = useState(false);

   const onOptionClicked = (event, value) => {
       event.stopPropagation();
       setSelectedOption(value);
       setShowDropdown(false);
       p.callback(value)
   };

   useOnClickOutside(dropdownRef, () => setShowDropdown(false));

   const handleClick = () => {
      setShowDropdown(!showDropdown);
      if (p.onClick) {
          p.onClick();
      }
  }

   return (
       <DropdownWrapper ref={dropdownRef}>
           <InputContainer {...p} ref={dropdownRef}
               onClick={handleClick}
               >
               {
                   !selectedOption ?
                       <PlaceHolder full>{p.placeholder}</PlaceHolder> :
                       <Fs_base pointer full>{selectedOption}</Fs_base>
               }
               <FaChevronDown size={13} />
           </InputContainer>

           <SelectContainer show={showDropdown}>
               {
                   p.options.map((e, i) =>
                       <Item key={i} onClick={(event) => onOptionClicked(event, e)}>
                           <Fs_base pointer full>{e}</Fs_base>
                       </Item>
                   )
               }
           </SelectContainer>

       </DropdownWrapper>
   )
}

export default SelectFiled
