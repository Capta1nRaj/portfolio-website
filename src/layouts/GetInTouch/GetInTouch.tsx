import Headings from '@/src/components/Headings'
import HoverImage from '@/src/components/NavBarComponents/HoverImage'
import Image from 'next/image'
import React from 'react'

const GetInTouch = () => {
    return (
        <div className="contact-section-layout py-8 lg:px-8 px-2 bg-lightblack text-white" id='contact'>
            <div className="max-width max-w-screen-xl m-auto">
                <Headings
                    title="get in touch"
                />
                <div className='contact-details teeny:text-2xl text-base flex flex-col items-center gap-2'>
                    <div className="email-id flex gap-2 items-center">
                        <Image className='invert' width={24} height={18} src="/assets/images/GetInTouchSectionImages/mainIcon.png" alt="" />
                        priyalrajwork@gmail.com
                    </div>
                    <div className="contact-number flex gap-2 items-center">
                        <Image width={24} height={24} src="/assets/images/GetInTouchSectionImages/callIcon.png" alt="" />
                        +91 8709688090
                    </div>
                    <div className="social-media font-light flex flex-col gap-2 mt-8 text-center">
                        <div className="social-media-icons flex justify-center gap-5">
                            <HoverImage
                                imageSrc={"instagram"}
                                imageAlt={"instagram"}
                                imageLink={"https://www.instagram.com/capta1n_raj"}
                            />
                            <HoverImage
                                imageSrc={"linkedin"}
                                imageAlt={"linkedin"}
                                imageLink={"https://www.linkedin.com/in/priyalraj99"}
                            />
                            <HoverImage
                                imageSrc={"twitter"}
                                imageAlt={"twitter"}
                                imageLink={"https://twitter.com/capta1n_raj"}
                            />
                        </div>
                        <div className='text-base'>You can also drop me your details on these platforms.</div>
                    </div>

                    <div className='text-base capitalize font-bold text-center flex items-center justify-center gap-2'>
                        <Image width={30} height={30} className='invert' src="/assets/images/MyProjectsSectionImages/eye-icon.png" alt="eye-icon" />
                        website views:- 100
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GetInTouch