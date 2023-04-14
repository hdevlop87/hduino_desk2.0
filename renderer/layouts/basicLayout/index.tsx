import React from 'react'
import NavBarIntro from '../../components/NavBar/NavBarIntro'

const BasicLayout = ({ children }: any) => {
    return (
        <>
            <NavBarIntro />
            { children }
        </>
    )
}

export default BasicLayout