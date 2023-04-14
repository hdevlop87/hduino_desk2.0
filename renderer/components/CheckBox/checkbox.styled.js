import styled from 'styled-components';

export const CheckInput = styled.input`
    border: none;
    outline: none;
    background-color:transparent;
    color:${({ theme }) => theme.colors.text.primary};
    font-size: 14px;
`;

