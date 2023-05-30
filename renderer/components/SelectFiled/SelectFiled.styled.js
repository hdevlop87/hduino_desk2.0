import styled from 'styled-components';
import { Fs_base } from '../../styles'
import is from '../../utils/isStyled'


export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  width:100%;
`;

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;
    height: 100%;
    border-radius:0 6px 6px 0;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    gap: 8px;

    ${is('outlined')`
    padding: 0px 8px;
   border: 1.4px solid ${({ theme }) => theme.colors.text.desactived};
   border-radius:0 6px 6px 0;
`};
`;

export const SelectContainer = styled.div`
    display: ${({ show }) => show ? "flex" : "none"};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    align-items: center;
    flex-direction: column;
    width: 100%;
    position: absolute;
    transform: translate(0px, 40px);
    inset: 0px auto auto 0px;
    float: none;
    background-color: ${({ theme }) => theme.colors.background.paper};
    border-radius:0 0 8px 8px  ;
    z-index: 1000;
    cursor: pointer;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 8px;
    &:hover{
        background-color: ${({ theme }) => theme.colors.background_light};
    }
    cursor: pointer;
`;

export const PlaceHolder = styled(Fs_base)`
    color:${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;
`;