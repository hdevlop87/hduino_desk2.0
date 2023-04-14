import React from 'react'
import { Container, Content, IconContainer } from './input.styled'
import { Fs_base, Fs_sm } from '../../styles'
import { Icon } from '@iconify/react';
import TextFiled from '../TextFiled'
import SelectFiled from '../SelectFiled'
import DatePickerFiled from '../DatePickerFiled'
import CheckBox from '../CheckBox';


const Input= ({ 
   type = 'text',
   LabelPos = 'up',
   label,
   icon = null,
   error = false,
   options,
   ...rest }) => {

   const isCheckbox = type === 'checkbox'

   return (
      <Container LabelPos={LabelPos} >
         {!isCheckbox && <Fs_base bold={true}>{label}</Fs_base>}

         <Content isCheckbox={isCheckbox} >
            {icon && <IconContainer>
               <Icon icon={icon} width={24} height={24} />
            </IconContainer>
            }

            {(() => {
               switch (type) {
                  case 'text':
                     return <TextFiled outlined={!isCheckbox} isError={error} {...rest} />
                  case 'select':
                     return <SelectFiled  options={options} label={label} {...rest} />
                  case 'date':
                     return <DatePickerFiled {...rest} />
                  case 'checkbox':
                     return <CheckBox {...rest} />
                  default:
                     return null
               }
            })()}
         </Content>

         {isCheckbox && <Fs_base bold={true}>{label}</Fs_base>}
      </Container>
   )
}

export default Input