import React, { useState } from 'react';
import { InputContainer, TextInput } from './TextFiled.styled'


const TextFiled = (p) => {

    return (
        <>
            <InputContainer {...p} >
                <TextInput
                    {...p}
                    value={p.value}
                    type="text"
                    placeholder={p.placeholder}
                    onChange={(e) => p.callback(e.target.value)}
                    
                />
            </InputContainer>
            {p.Ricon}
        </>
    )
}

export default TextFiled