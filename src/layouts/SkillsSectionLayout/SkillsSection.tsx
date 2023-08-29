import Headings from '../../../src/components/Headings'
import React from 'react'
import SkillsImage from '../../../src/components/IntroSectionComponents/SkillsImage'

const SkillsSection = () => {
    return (
        <div className="skills-section-layout py-8 bg-lightblack text-white" id='skills'>
            <div className="max-width">
                <Headings
                    title="skills"
                />
                <div className="grid lg:grid-cols-6 teeny:grid-cols-4 grid-cols-3 justify-items-center max-w-screen-xl m-auto text-center gap-y-10 font-semibold">
                    <SkillsImage
                        imageAndAltName='html'
                        imageName='HTML'
                    />

                    <SkillsImage
                        imageAndAltName='css'
                        imageName='CSS'
                    />

                    <SkillsImage
                        imageAndAltName='js'
                        imageName='JavaScript'
                    />

                    <SkillsImage
                        imageAndAltName='reactjs'
                        imageName='ReactJS'
                    />

                    <SkillsImage
                        imageAndAltName='tailwindcss'
                        imageName='Tailwind CSS'
                    />

                    <SkillsImage
                        imageAndAltName='nextjs'
                        imageName='Next.js'
                    />

                    <SkillsImage
                        imageAndAltName='mongodb'
                        imageName='MongoDB'
                    />

                    <SkillsImage
                        imageAndAltName='nodejs'
                        imageName='Node.js'
                    />

                    <SkillsImage
                        imageAndAltName='expressjs'
                        imageName='Express.js'
                    />

                    <SkillsImage
                        imageAndAltName='mongoose'
                        imageName='Mongoose'
                    />

                    <SkillsImage
                        imageAndAltName='git'
                        imageName='Git'
                    />

                    <SkillsImage
                        imageAndAltName='figma'
                        imageName='Figma'
                    />
                </div>
            </div>
        </div>
    )
}

export default SkillsSection