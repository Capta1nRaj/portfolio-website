import Image from 'next/image'
import React from 'react'

const SkillsImage = ({ imageAndAltName, imageName }: { imageAndAltName: string, imageName: string }) => {
    return (
        <>
            <div className='w-28'>
                <Image className='m-auto' width={80} height={80} src={`/assets/images/SkillSectionImages/${imageAndAltName}.png`} alt={imageAndAltName} />
                <div className='mt-4'>{imageName}</div>
            </div>
        </>
    )
}

export default SkillsImage