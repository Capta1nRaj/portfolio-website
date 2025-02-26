import React from 'react'
import Headings from '../components/Headings'
import Image from 'next/image'
import Link from 'next/link'

const buttonProperties = `px-4 py-2 uppercase border border-reddish text-xl transition-all duration-500 ease-in-out hover:bg-reddish font-medium hover:drop-shadow-[2px_2px_4px_#ffffff]`

const AboutMe = () => {
    return (
        <>
            <div className="about-me-layout py-8 bg-black text-white" id='about-me'>

                <Headings
                    title="about me"
                />

                <div className="max-wdith max-w-screen-xl m-auto flex lg:flex-row flex-col justify-between px-2 lg:gap-0 gap-6">

                    <div className="left-side">
                        <div className="profile-pic drop-shadow-[4px_4px_4px_#ff3258]">
                            <Image className='m-auto lg:w-[450px] sm:w-96 w-72' width={450} height={450} src="/assets/images/IntroSectionImages/profile-pic-2.jpg" alt="" />
                        </div>
                    </div>

                    <div className="right-side max-w-lg flex flex-col justify-center lg:items-start items-center lg:gap-14 gap-4 lg:m-0 m-auto lg:text-left text-center lg:text-lg text-base lg:font-medium font-normal">
                        <div className="title uppercase text-4xl font-bold">who am i?</div>
                        <div className="description">
                            I am a seasoned full stack web developer, seamlessly merging my passion for gaming with my coding expertise. A website developer enthusiast since the age of 13, I`ve honed my skills to craft captivating and functional websites. With a dual identity of a coder and gamer, I navigate pixels and code with equal fervor.
                        </div>

                        <div className="my-skills-and-project-section flex lg:justify-normal justify-center gap-2">
                            <Link href="#skills"><div className={`${buttonProperties}`}>my skills</div></Link>
                            <Link href="#projects"><div className={`${buttonProperties}`}>my projects</div></Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AboutMe