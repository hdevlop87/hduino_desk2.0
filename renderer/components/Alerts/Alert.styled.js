import styled from 'styled-components';
import { Colors } from '../../styles'
import is, { match } from 'styled-is';
import { Icon } from '@iconify/react';

export const Container = styled.div`
    width: 400px;
    height: 40px;
    border-radius: 8px;
    
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    ${p => p.open ? "display:flex;" : "display:none;"};

    ${match("type", 'error')`
        background-color: ${Colors.red_light};
        color: ${Colors.red_pressed};
    `};

    ${match("type", 'warning')`
        background-color: ${Colors.orange_light};
        color: ${Colors.orange_pressed};
    `};

    ${match("type", 'success')`
        background-color: ${Colors.green_light};
        color: ${Colors.green_pressed};
    `};
`;


export const CloseButton = styled.div`
    cursor:pointer
`;

const listIcons = {
    success: "clarity:success-standard-solid",
    warning: "akar-icons:triangle-alert-fill",
    error: "fluent:error-circle-12-filled",
}

export const MyIcon = styled(Icon).attrs(props => ({
    icon: listIcons[props.type]
}))`
    font-size: 22px;
    margin-right: 8px; 
`;





