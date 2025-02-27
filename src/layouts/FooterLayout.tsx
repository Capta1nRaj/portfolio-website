'use client'

import React, { useState } from 'react'
import { IncrementViewsAction } from '../actions/IncrementViewsAction'

const FooterLayout = () => {

    let isFunctionCalled = false;
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
                IncrementViewsAction(shouldIncrement).then()
            } catch (error) {
                console.error("Failed to update views count, if possible, please raise a PR to notify me, thanks ♥.");
            }
        }
    }

    updateViewsCount();

    return (
        <section className='flex justify-center bg-[#111111] text-white py-1'>
            <div className='py-2 underline'>
                Made with ❤️ by Priyal Raj
            </div>
        </section>
    )
}

export default FooterLayout