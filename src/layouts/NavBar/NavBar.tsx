import React from 'react'
import Logo1 from '../../images/Logos/Logo1'
import HamburgerMenuIconAnimated from '../../components/NavBarComponents/HamburgerMenu'
import NavBarContents from '../../../src/components/NavBarComponents/NavBarContents'


const NavBar = () => {

    const navBarContents = NavBarContents();

    return (
        <>
            {/* For Desktop & Tablet */}
            <div className="md:block hidden nav-bar-layout bg-[#111111] fixed top-0 left-0 right-0" id="/">
                <div className="max-width flex justify-between items-center max-w-screen-xl m-auto px-4 py-2">

                    <div className="nav-bar-left-side cursor-pointer">
                        <Logo1 />
                    </div>

                    <div className="nav-bar-right-side flex gap-4">
                        {navBarContents}
                    </div>
                </div>
            </div>

            {/* For Mobile */}
            <div className="md:hidden block" id="/">
                <div className="logo fixed top-4 left-4 z-50">
                    <Logo1 />
                </div>
                <div className="">
                    <HamburgerMenuIconAnimated />
                </div>
            </div>
        </>
    )
}

export default NavBar