import Headings from '../components/Headings'
import React from 'react'
import SkillsImage from '../components/IntroSectionComponents/SkillsImage'

const SkillsSection = () => {
    return (
        <div className="skills-section-layout py-8 bg-lightblack text-white" id='skills'>
            <div className="max-width">
                <Headings title="skills" subHeading="Cutting Edge Technical Expertise" />
                <div className="grid lg:grid-cols-6 teeny:grid-cols-4 grid-cols-3 justify-items-center max-w-screen-xl m-auto text-center gap-y-10 font-semibold">
                    <SkillsImage imageAndAltName='html' imageName='HTML' />
                    <SkillsImage imageAndAltName='css' imageName='CSS' />
                    <SkillsImage imageAndAltName='js' imageName='JavaScript' />
                    <SkillsImage imageAndAltName='reactjs' imageName='ReactJS' />
                    <SkillsImage imageAndAltName='tailwindcss' imageName='Tailwind CSS' />
                    <SkillsImage imageAndAltName='nextjs' imageName='Next.js' />
                    <SkillsImage imageAndAltName='mongodb' imageName='MongoDB' />
                    <SkillsImage imageAndAltName='mongoose' imageName='Mongoose' />
                    <SkillsImage imageAndAltName='nodejs' imageName='Node.js' />
                    <SkillsImage imageAndAltName='expressjs' imageName='Express.js' />
                    <SkillsImage imageAndAltName='redis' imageName='Redis' />
                    <SkillsImage imageAndAltName='git' imageName='Git' />
                    <SkillsImage imageAndAltName='figma' imageName='Figma' />
                    <SkillsImage imageAndAltName='chartjs' imageName='Chart.js' />
                    <SkillsImage imageAndAltName='typescript' imageName='Typescript' />
                    <SkillsImage imageAndAltName='zustand' imageName='Zustand' />
                    <SkillsImage imageAndAltName='sanity' imageName='Sanity CMS' />
                    <SkillsImage imageAndAltName='fumadocs' imageName='Fumadocs' />
                </div>
            </div>
        </div>
    )
}

export default SkillsSection