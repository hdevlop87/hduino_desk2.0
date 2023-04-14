import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { Flex, Fs_sm } from '../../styles'
import { Icon } from '@iconify/react';
import { match } from '../../utils/isStyled'
import { Colors } from '../../styles'
import { clearAlert } from '../../features/alertSlice';
import { RiCloseCircleFill } from 'react-icons/ri';

const Alert = () => {

    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);

    const Close = () => {
        dispatch(clearAlert());
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            Close();
        }, 3000);

        return () => {
            clearTimeout(timeout);
        }
    }, [alert.show]);


    return (
        <Container type={alert.type} show={alert.show}>
            <Flex center>
                <MyIcon type={alert.type} />
                <Fs_sm color='dark_Text_Primary'>{alert.message}</Fs_sm>
            </Flex>

            <CloseButton>
                <RiCloseCircleFill color='white' size={24} onClick={() => Close()} />
            </CloseButton>
        </Container>
    );
};

export default Alert;

const Container = styled.div`
    width: 400px;
    height: 40px;
    border-radius: 8px;

    position: fixed;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    right: 0;
    z-index: 9999;

    
    justify-content: space-between;
    align-items: center;
    padding:16px;

    display: ${props => props.show ? 'flex' : 'none'};

    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    ${match("type", 'error')`
        background-color: ${Colors.red_normal};
    `};

    ${match("type", 'warning')`
        background-color: ${Colors.orange_normal};
    `};

    ${match("type", 'success')`
        background-color: ${Colors.green_normal};
    `};
`;
const CloseButton = styled.div`
    cursor:pointer;
`;

const listIcons = {
    success: "clarity:success-standard-solid",
    warning: "akar-icons:triangle-alert-fill",
    error: "fluent:error-circle-12-filled",
}

const MyIcon = styled(Icon).attrs(props => ({
    icon: listIcons[props.type]
}))`
    font-size: 22px;
    margin-right: 8px; 
    cursor:pointer;
`;