import React from 'react'

const FooterLayout = () => {

    const year = new Date().getFullYear()

    return (
        <>
            <div className='bg-black text-center text-white py-2 underline drop-shadow-[0px_-3px_5px_#000000]'>
                ©️ {year} | Made with ❤️ by Priyal Raj.
            </div>
        </>
    )
}

export default FooterLayout