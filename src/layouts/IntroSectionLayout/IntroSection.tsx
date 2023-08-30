import Image from 'next/image'
import React from 'react'
import LocationIcon from '../../images/IntroSectionIcons/LocationIcon'
import HoverImage from '../../components/NavBarComponents/HoverImage'
import Link from 'next/link'

const buttonProperties = `px-4 py-2 uppercase border border-reddish text-xl transition-all duration-500 ease-in-out hover:bg-reddish font-medium hover:drop-shadow-[2px_2px_4px_#ffffff]`

const IntroSection = () => {
    return (
        <>
            <div className="intro-section-layout bg-[url('/assets/images/IntroSectionImages/background-image.jpg')] h-full bg-no-repeat bg-cover flex bg-center text-white py-16">
                <div className="max-width max-w-screen-xl w-full m-auto flex lg:flex-row flex-col-reverse justify-between lg:pl-4 lg:pr-10 lg:px-8 px-2 lg:text-left text-center lg:gap-0 gap-10">
                    <div className="left-side lg:my-auto lg:mx-0 m-auto xl:max-w-2xl lg:max-w-[35rem] max-w-2xl lg:space-y-5 space-y-3">

                        <div className="my-name sm:text-6xl text-3xl font-bold">
                            <span className='drop-shadow-[1px_1px_3px_#ffffff]'>Hi, I`m</span> <span className='text-reddish drop-shadow-[1px_1px_3px_#ff3258]'>Priyal Raj</span>
                        </div>

                        <div className="about-me sm:text-xl text-sm font-semibold">
                            A year-long journey mastering Next.js and Node.js as a Full Stack Web Developer by day, and embracing gaming excitement by night. Let`s unite coding excellence and gaming passion in this unique tech odyssey.
                        </div>

                        <div className="line-3 lg:block flex lg:justify-normal justify-center lg:space-y-3 space-y-0 teeny:text-base text-sm">
                            <div className="location font-bold flex items-center">
                                <LocationIcon /> <span className='teeny:ml-1 ml-0'>Patna, Bihar</span>
                            </div>
                            <div className="online-offline font-bold ml-[10px] flex gap-2 items-center">
                                <span className='w-2 h-2 bg-green-500 rounded-full inline-block'></span> <span className='teeny:ml-1 ml-0'>Available For New Projects</span>
                            </div>
                        </div>

                        <div className="resume-get-in-touch flex lg:justify-normal justify-center gap-2">
                            <Link rel="noopener noreferrer" target="_blank" href={'https://flowcv.com/resume/ehet59nqt6'}><button className={`${buttonProperties}`}>resume</button></Link>
                            <button className={`${buttonProperties}`}>get in touch</button>
                        </div>

                        <div className="social-media flex lg:justify-normal justify-center gap-5">
                            <HoverImage
                                imageSrc={"instagram"}
                                imageAlt={"instagram"}
                            />
                            <HoverImage
                                imageSrc={"linkedin"}
                                imageAlt={"linkedin"}
                            />
                            <HoverImage
                                imageSrc={"twitter"}
                                imageAlt={"twitter"}
                            />
                            <HoverImage
                                imageSrc={"github"}
                                imageAlt={"github"}
                            />
                        </div>

                    </div>

                    <div className="right-side">
                        <div className="profile-pic drop-shadow-[4px_4px_4px_#ff3258]">
                            <Image className='m-auto lg:w-[450px] sm:w-96 w-72' width={450} height={450} src="/assets/images/IntroSectionImages/profile-pic.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntroSection