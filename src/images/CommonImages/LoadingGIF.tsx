import Image from 'next/image'
import React from 'react'

const LoadingGIF = () => {
    return (
        <>
            <Image width={25} height={25} src="/assets/images/CommonImages/loding-gif.gif" alt="loading-gif" />
        </>
    )
}

export default LoadingGIF