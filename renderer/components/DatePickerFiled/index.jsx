import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputContainer } from './DatePickerFiled.styled'

const MyDatePicker = (p) => {

    const onDateChange = (value) => {
        p.onChange(value.toLocaleDateString("en-US"))
    };

    return (
        <InputContainer {...p} >
            <DatePicker
                selected={Date.parse(p.value) || new Date()}
                onChange={(date) => onDateChange(date)} />
        </InputContainer>
    )
}

export default MyDatePicker