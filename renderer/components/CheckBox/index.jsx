import React, { useEffect, useState } from 'react'
import { CheckInput } from './checkbox.styled';
import useIsFirstRender from '../../utils/useIsFirstRender'

const CheckBox = (p) => {
    const isFirstRender = useIsFirstRender()
    const [isChecked, setIsChecked] = useState(p.value);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (!isFirstRender) {
            if (isChecked !== undefined) {
                p.callback(isChecked)
            }
        }
    }, [isFirstRender, isChecked])

    return (
        <>
            <CheckInput
                type="checkbox"
                value={isChecked}
                onChange={() => handleOnChange()}
                checked={isChecked}
            />
        </>
    )
}

export default CheckBox