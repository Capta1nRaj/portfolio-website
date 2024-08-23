import React from 'react'
import Logo1 from '../../images/Logos/Logo1'
import NavBarContents from '../../components/NavBarComponents/NavBarContents'

const NavBar = () => {

    const navBarContents = NavBarContents();

    return (
        <>
            <div className='bg-lightblack text-white drop-shadow-[0px_3px_5px_#000000]'>
                {/* For Desktop & Tablet */}
                <div className="block nav-bar-layout" id="/">
                    <div className="max-width flex justify-between items-center max-w-screen-xl m-auto px-4 py-2">

                        <div className="nav-bar-left-side cursor-pointer">
                            <Logo1 />
                        </div>

                        <div className="nav-bar-right-side flex gap-4">
                            {navBarContents}
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:hidden block bg-lightblack text-white'>
                {/* For Mobile */}
                {/* <div className="flex py-4 mx-4 justify-between" id="/">
                    <div className="logo z-50">
                        <Logo1 />
                    </div>
                    <div className="">
                        <HamburgerMenuIconAnimated />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default NavBar