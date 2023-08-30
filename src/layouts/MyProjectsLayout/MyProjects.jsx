import Headings from '../../../src/components/Headings'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectListBox from '@/src/components/MyProjectsComponents/ProjectListBox'

const MyProjects = () => {

    const ProjectList = [
        {
            title: 'karafuru clone',
            description: 'When I began learning website development, a friend suggested I clone this because it`s quite challenging for a fresher. So, here`s a simple karafuru.io website clone.',
            link: 'https://capta1nraj.github.io/karafuru-clone/home-page/home-page.html',
            skills: ['HTML', 'CSS', 'JavaScript'],
            image: '/assets/images/MyProjectsSectionImages/karafuru.png'
        },
        {
            title: 'loop card',
            description: 'Loop Card is a contact sharing project based on NFC, crafted by me and my team at Alphamint Labs. I took charge of developing the complete reminder feature, which involves a lot of intricate logic.',
            link: 'https://www.loopcard.club',
            skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'NextAuth.js'],
            image: '/assets/images/MyProjectsSectionImages/loopcard.png'
        }
        ,
        {
            title: 'e-comm admin panel',
            description: 'A seamless E-Comm admin panel crafted with Next.js. In this project, I implemented custom authentication using bcrypt.js, along with an inbuilt API for effortless user and product management, and more.',
            link: 'https://ecommerce-admin-dev-branch.vercel.app',
            skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Chart.js', 'Custom Auth'],
            image: '/assets/images/MyProjectsSectionImages/ecomm-admin-panel.png'
        }
    ]

    return (
        <div className="skills-section-layout py-8 lg:px-8 px-2 bg-black text-white" id='projects'>
            <div className="max-width max-w-screen-xl m-auto">
                <Headings
                    title="projects"
                />
                <div className="projects-list space-y-5">
                    {ProjectList.map((item, index) => {
                        return (
                            <ProjectListBox
                                key={index}
                                customFlexCSS={index % 2 === 0 ? "lg:flex-row flex-col-reverse" : "lg:flex-row-reverse flex-col-reverse"}
                                title={item.title}
                                description={item.description}
                                skills={item.skills}
                                link={item.link}
                                image={item.image} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyProjects