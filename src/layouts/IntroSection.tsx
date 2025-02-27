import Image from 'next/image'
import React from 'react'
import LocationIcon from '../images/IntroSectionIcons/LocationIcon'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'

const buttonProperties = `px-4 py-2 uppercase border border-reddish text-xl transition-all duration-500 ease-in-out hover:bg-reddish font-medium hover:drop-shadow-[2px_2px_4px_#ffffff]`

export default function IntroSection() {
    return (
        <div className="bg-[url('/assets/images/IntroSectionImages/background-image.jpg')] bg-cover bg-center bg-no-repeat h-full text-white py-20">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse lg:flex-row gap-10 items-center">

                <div className="flex-1 space-y-6 lg:pr-8 text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Hi, I’m <span className="text-reddish">Priyal Raj</span>
                    </h1>
                    <p className="text-sm sm:text-base max-w-lg">
                        I’m a Full Stack Web Developer skilled in Next.js, Express.js, and MongoDB.
                        My focus is building robust, scalable web apps with clean, efficient code.
                        I love transforming complex ideas into practical, user-friendly solutions
                        that deliver real value. Let’s bring your vision to life!
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <div className="flex items-center">
                            <LocationIcon />
                            <span className="ml-2">Patna, Bihar</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block ml-3 mr-2"></span>
                            <span>Available For New Projects</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <Link
                            href="https://drive.google.com/file/d/14LOvlVKr707ntHYhGn3x7SJPxOpmKH8m/view?usp=sharing"
                            target="_blank"
                        >
                            <button className={buttonProperties}>Resume</button>
                        </Link>
                        <Link href="/contact">
                            <button className={buttonProperties}>Get in touch</button>
                        </Link>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Link href="https://twitter.com/Capta1nCodes" className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish" target="_blank">
                            <FaTwitter />
                        </Link>
                        <Link href="https://www.linkedin.com/in/priyalraj99" className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish" target="_blank">
                            <FaLinkedin />
                        </Link>
                        <Link href="https://www.instagram.com/capta1n_raj" className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish" target="_blank">
                            <FaInstagram />
                        </Link>
                        <Link href="https://github.com/Capta1nCodes" className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish" target="_blank">
                            <FaGithub />
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end">
                    <Image
                        src="/assets/images/IntroSectionImages/profile-pic.jpg"
                        alt="Priyal Raj"
                        width={450}
                        height={450}
                        className="drop-shadow-[4px_4px_4px_#ff3258] w-[300px] sm:w-[400px] lg:w-[450px]"
                    />
                </div>
            </div>
        </div>
    );
}

