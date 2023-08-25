import React from 'react'
import Logo1 from '../../images/Logos/Logo1'
import HamburgerMenuIconAnimated from '../../components/NavBarComponents/HamburgerMenu'
import NavBarContents from '../../components/NavBarComponents/NavBarContents'


const NavBar = () => {

    const navBarContents = NavBarContents();

    return (
        <div className='bg-lightblack text-white'>
            {/* For Desktop & Tablet */}
            <div className="lg:block hidden nav-bar-layout" id="/">
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
            <div className="lg:hidden flex py-4 mx-4 justify-between" id="/">
                <div className="logo z-50">
                    <Logo1 />
                </div>
                <div className="">
                    <HamburgerMenuIconAnimated />
                </div>
            </div>
        </div>
    )
}

export default NavBar