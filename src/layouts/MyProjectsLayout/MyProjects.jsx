import Headings from '../../../src/components/Headings'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectListBox from '@/src/components/MyProjectsComponents/ProjectListBox'

const MyProjects = () => {

    const ProjectList = [
        {
            title: 'e-comm admin panel',
            description: 'A seamless E-Comm admin panel crafted with Next.js. In this project, I implemented custom authentication using bcrypt.js, along with an inbuilt API for effortless user and product management, and more.',
            link: '',
            skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Chart.js', 'Custom Auth'],
            image: '/assets/images/MyProjectsSectionImages/ecomm-admin-panel.png',
            gitHubLink: ""
        },
        {
            title: 'mail passify',
            description: 'Custom email and password authentication with two-step verification via SendGrid.',
            link: 'https://www.npmjs.com/package/mail-passify',
            skills: ['Express.js', 'Crypto', 'MongoDB', 'Mongoose', 'Sendgrid'],
            image: '/assets/images/MyProjectsSectionImages/mail-passify.png',
            gitHubLink: "https://github.com/Capta1nRaj/mail-passify"
        },
        {
            title: 'Connect2Mongodb',
            description: 'My first ever npm module is a lightweight and easy-to-use library that allows you to connect to MongoDB with both dynamic and fixed databases.',
            link: 'https://www.npmjs.com/package/connect2mongodb',
            skills: ['TypeScript', 'Express.js', 'MongoDB', 'Mongoose'],
            image: '/assets/images/MyProjectsSectionImages/connect2mongodb.png',
            gitHubLink: "https://github.com/Capta1nRaj/connect2mongodb"
        },
        {
            title: 'loop card',
            description: 'Loop Card is a contact sharing project based on NFC, crafted by me and my team at Alphamint Labs. I took charge of developing the complete reminder feature, which involves a lot of intricate logic.',
            link: 'https://www.loopcard.club',
            skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'NextAuth.js'],
            image: '/assets/images/MyProjectsSectionImages/loopcard.png',
            gitHubLink: ""
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
                                image={item.image}
                                gitHubLink={item.gitHubLink} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyProjects