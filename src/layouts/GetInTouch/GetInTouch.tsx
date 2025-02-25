'use client'

import { FormatNumber } from '@/utils/FormatNumber';
import Headings from '@/components/Headings';
import LoadingGIF from '@/images/CommonImages/LoadingGIF';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { IncrementViewsAction } from './IncrementViewsAction';

const GetInTouch = () => {

    let isFunctionCalled = false;
    const [views, setviews] = useState(null)
    const [isCalled, setIsCalled] = useState(false);

    async function updateViewsCount() {
        if (typeof window !== 'undefined' && !isCalled) {

            setIsCalled(true);

            let shouldIncrement = false;


            if (!isFunctionCalled) {
                const sessionValue = sessionStorage.getItem('deleteOnSessionClose');


                if (sessionValue === null) {
                    sessionStorage.setItem('deleteOnSessionClose', 'I-will-delete-myself-when-you-leave-the-session.');
                    isFunctionCalled = true;
                    shouldIncrement = true;
                }
            }

            try {
                IncrementViewsAction(shouldIncrement)
                    .then(({ viewsCount }) => { setviews(viewsCount); })
                    .catch((error) => { console.error("Error incrementing views:", error); });
            } catch (error) {
                console.error("Failed to update views count, if possible, please raise a PR to notify me, thanks ♥.");
            }
        }
    }

    updateViewsCount();

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
                    <div className="social-media font-light flex flex-col gap-2 mt-8 text-center">
                        <div className="social-media-icons flex justify-center gap-5">
                            <Link href={'https://www.instagram.com/capta1n_raj'} target='_blank'>
                                <Image width={50} height={50} src="https://img.icons8.com/?size=50&id=32323&format=png&color=000000" alt="" />
                            </Link>

                            <Link href={'https://www.linkedin.com/in/priyalraj99'} target='_blank'>
                                <Image width={50} height={50} src="https://img.icons8.com/?size=50&id=13930&format=png&color=000000" alt="" />
                            </Link>

                            <Link href={'https://twitter.com/capta1n_raj'} target='_blank'>
                                <Image className='invert' width={50} height={50} src="https://img.icons8.com/?size=50&id=phOKFKYpe00C&format=png&color=000000" alt="" />
                            </Link>

                            <Link href={'https://github.com/Capta1nRaj'} target='_blank'>
                                <Image width={50} height={50} src="https://img.icons8.com/?size=100&id=106562&format=png&color=FFFFFF" alt="" />
                            </Link>
                        </div>
                        <div className='text-base'>You can also drop me your details on these platforms.</div>
                    </div>

                    <div className='text-base capitalize font-bold text-center flex items-center justify-center gap-2'>
                        <Image width={30} height={30} className='invert' src="/assets/images/MyProjectsSectionImages/eye-icon.png" alt="eye-icon" />
                        website views:- {!views ? <LoadingGIF /> : `${FormatNumber(views)}+`}
                        {/* {views} */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GetInTouch