import { setCompilerModal,compilerModal,compilerLoading,compilerShowMessage,compilerMessage,compilerType } from '../../features/navBarSlice'
import { Container, VerifDiv, Label } from './VerifUpload.styled'
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from 'react'
import LoadingBar from './LoadingBar';

import { useOnClickOutside } from 'usehooks-ts';

const index = () => {
    const pRef = useRef(null);
    const showModal = useSelector(compilerModal);
    const showLoader = useSelector(compilerLoading);
    const showMessage = useSelector(compilerShowMessage);
    const message = useSelector(compilerMessage);
    const type = useSelector(compilerType);
    const dispatch = useDispatch();

    const handleClickOutside = () => {
        dispatch(setCompilerModal({
            show:false,
            loading:false,
            message:{
                show:false,
                label:'',
                type:null
            }
        }));
    };



    useOnClickOutside(pRef, handleClickOutside);

    return (
        <Container show={showModal} >
            {showLoader && <LoadingBar />}
            {showMessage &&
                <VerifDiv ref={pRef} onClick={handleClickOutside}>
                    <Label  type={type}>{message}</Label>
                </VerifDiv>}
        </Container>
    )
}

export default index