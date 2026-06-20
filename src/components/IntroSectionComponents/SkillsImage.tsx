import Image from 'next/image'
import React from 'react'

const SkillsImage = ({ imageAndAltName, imageName, ext = 'png' }: { imageAndAltName: string, imageName: string, ext?: string }) => {
    return (
        <>
            <div className='w-28'>
                <div className='flex items-center justify-center h-20'>
                    <Image className='object-contain' width={80} height={80} src={`/assets/images/SkillSectionImages/${imageAndAltName}.${ext}`} alt={imageAndAltName} style={{ maxWidth: '80px', maxHeight: '80px' }} />
                </div>
                <div className='mt-4'>{imageName}</div>
            </div>
        </>
    )
}

export default SkillsImage