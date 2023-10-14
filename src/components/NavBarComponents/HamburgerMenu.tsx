'use client'

import React, { useState } from 'react'
import NavBarContents from './NavBarContents';

const hamburgerLine = `h-1 w-8 my-1 rounded-full bg-white transition ease transform duration-300 `;
const transition = `transition-all duration-500`

const contents = NavBarContents();

export default function HamburgerMenuIconAnimated() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setshowMenu] = useState('right-[-100%]')

    function enableDisableHamburgerMenu() {
        if (isOpen) {
            setIsOpen(!isOpen)
            setshowMenu('right-[-100%]')
        } else {
            setIsOpen(!isOpen)
            setshowMenu('right-0')
        }
    }

    return (
        <>
            <div
                className="flex flex-col rounded justify-center items-center group cursor-pointer fixed top-2 right-4 z-20 bg-lightblack p-2 rounded-xd"
                onClick={() => enableDisableHamburgerMenu()}>
                <div className={`${hamburgerLine} ${isOpen ? `rotate-45 translate-y-3 ${transition}` : `ml-4 ${transition}`}`} />
                <div className={`${hamburgerLine} ${isOpen ? `opacity-0 ${transition}` : `mr-0 ${transition}`}`} />
                <div className={`${hamburgerLine} ${isOpen ? `-rotate-45 -translate-y-3 ${transition}` : `mr-4 ${transition}`}`} />
            </div>
            <div className={`flex flex-col items-center fixed top-0 ${showMenu} bottom-0 justify-evenly bg-[#111111] px-16 ${transition} z-10`} onClick={enableDisableHamburgerMenu}>
                {contents}
            </div>
        </>
    )
}
