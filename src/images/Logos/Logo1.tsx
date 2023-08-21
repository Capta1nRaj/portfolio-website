'use client'

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const Logo1 = () => {

    const router = useRouter()

    return (
        <>
            <Image onClick={() => router.push('/')} width={30} height={30} src="/assets/images/Logo/logo-1.png" alt="priyal raj logo 1" />
        </>
    )
}

export default Logo1