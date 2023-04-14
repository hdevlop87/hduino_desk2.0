import styled from 'styled-components';
import is from '../utils/isStyled'

type props = {
    Col?: boolean,
    gap8?: boolean, 
    gap16?: boolean, 

    nowrap?: boolean,
    wrap?: boolean,
    wrapReverse?: boolean,
    
    full?: boolean,
    center?: boolean,

    jsStart?: boolean,
    jsCenter?: boolean,
    jsBetween?: boolean,
    jsAround?: boolean,
    jsEnd?: boolean,

    mt8?: boolean,
    mt16?: boolean,
    mt24?: boolean,
    mt48?: boolean,
    mt56?: boolean,
 };

export const Flex = styled.div<props>`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 0;
    justify-content: flex-start;
    align-content: stretch;
    gap: 4px;

    ${is('Col')`
        flex-direction: column;
    `};

    ${is('gap8')`
        gap: 8px;
    `};

    ${is('gap16')`
        gap: 16px;
    `};


    ${is('nowrap')`
        flex-wrap: nowrap; 
    `};
    ${is('wrap')`
        flex-wrap: wrap;
    `};
    ${is('wrapReverse')`
        flex-wrap: wrap-reverse;
    `};


    ${is('full')`
        width: 100%;
    `};

    ${is('center')`
        align-items: center;
        justify-content: center;
    `};

    ${is('jsStart')`
        justify-content: flex-start; 
    `};
    ${is('jsEnd')`
        justify-content: flex-end;
    `};
    ${is('jsCenter')`
        justify-content: center;
    `};
    ${is('jsBetween')`
        justify-content: space-between;
    `};
    ${is('jsAround')`
        justify-content: space-around;
    `};


    ${is('mt8')`
        margin-top: 8px;
    `};

    ${is('mt16')`
        margin-top: 16px;
    `};

    ${is('mt24')`
        margin-top: 24px;
    `};

    ${is('mt48')`
        margin-top: 48px;
    `};

    ${is('mt56')`
        margin-top: 56px;
    `};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 32px;
    gap: 30px;
    width:100%;
    height:500px;
    align-items: center;
    color:${({ theme }) => theme.colors.text.primary};
`;