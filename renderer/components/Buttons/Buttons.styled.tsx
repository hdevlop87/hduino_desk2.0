import { log } from 'console';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles'
import is from '../../utils/isStyled'

type container = {
    size: string,
    bg: string,
    rounded?:boolean
};


export const Container = styled.div<container>`
    z-index:100;
    cursor:pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 10px rgba(76, 78, 100, 0.22);
    border-radius: 8px;
    color:white;
    gap: 8px;
    background: ${({ bg })  => Colors[bg]};
    font-weight: 600;
    width: fit-content;

    &:hover{
       background: ${({ bg }) => Colors[`${bg}_hover`]};
    }

    &:active{
       background: ${({ bg }) => Colors[`${bg}_pressed`]};
        transform: scale(0.98);
    }

    ${({ size }) => {
        switch (size) {
            case "sm":
                return css`
                    gap: 4px;
                    height: 30px;
                    font-size: 13px;
                    padding: 4px 16px;
                    svg{
                        width: 16px;
                        height: 16px;
                    }
                `
            case "lg":
                return css`
                font-size: 22px;
                padding: 16px 24px;
                svg{
                    width: 24px;
                    height: 24px;
                }
                p{
                    margin-bottom: 2px;
                }
                `
            default:
                return css`
                        height: 42px;
                        font-size: 16px;
                        padding: 16px 24px;

                        svg{
                            width: 22px;
                            height: 22px;
                        }


                    `
        }
    }}

    ${is('rounded')`
      padding:24px;
      border-radius:50px;
   `};

`;








