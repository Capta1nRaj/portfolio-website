import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Logo1 = () => {
    return (
        <Link href={'/'}>
            <Image className='w-auto h-auto' width={30} height={30} src="/assets/images/Logo/logo-1.png" alt="priyal raj logo 1" />
        </Link>
    )
}

export default Logo1