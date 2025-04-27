'use client'

import React, { useState } from 'react';
import Headings from '@/components/Headings';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBriefcase, FaUser } from 'react-icons/fa';

// Projects list
const projectData = [
    {
        title: 'ShaveLinks',
        description:
            'ShaveLinks is a comprehensive URL shortener tool offering custom link creation, detailed analytics, and secure link management – a must-have for digital marketing.',
        link: 'https://shavelinks.com',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/shavelinks.png',
        imageAlt: 'ShaveLinks Project',
        category: 'personal'
    },
    {
        title: 'Modaro Health',
        description:
            'Modaro Health simplifies medical tourism by connecting patients with accredited hospitals abroad, offering cost-effective healthcare solutions and seamless planning.',
        link: 'https://modarohealth.com',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/modarohealth.png',
        imageAlt: 'Modaro Health Project',
        category: 'client'
    },
    {
        title: 'Bravas Digital',
        description:
            'A full-service digital marketing agency delivering data-driven strategies and creative campaigns that boost brand presence and maximize ROI.',
        link: 'https://www.bravasdigital.com',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/bravasdigital.png',
        imageAlt: 'Bravas Digital Project',
        category: 'client'
    },
    {
        title: 'BLYT',
        description:
            'A unique e-commerce platform in Singapore blending shopping with a loyalty program, empowering brands and consumers alike.',
        link: 'https://www.blyt.world',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/blyt.png',
        imageAlt: 'BLYT Project',
        category: 'client'
    },
    {
        title: 'Loop Card',
        description:
            'Loop Card revolutionizes networking with NFC-enabled business cards that instantly share your digital profile – a modern twist on the classic business card.',
        link: 'https://loopcard.vercel.app',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/loopcard.png',
        imageAlt: 'Loop Card Project',
        category: 'client'
    },
    {
        title: 'Email Armor Docs',
        description:
            'Explore the documentation for Email Armor, detailing authentication methods, usage guidelines, and API references. Learn how to integrate secure email solutions.',
        link: 'https://email-armor-docs.vercel.app/docs',
        gitHubLink: 'https://github.com/Capta1nRaj/email-armor',
        image: '/assets/images/MyProjectsSectionImages/email-armor.png',
        imageAlt: 'Email Armor Docs',
        category: 'personal'
    },
    {
        title: 'Consulting Website',
        description: 'A modern, professional platform designed for consulting firms, featuring a clean, responsive layout, intuitive navigation, and engaging visuals that effectively showcase services and success stories to attract potential clients.',
        link: 'https://consulting-website-nine.vercel.app',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/consultingWebsite.png',
        imageAlt: 'Consulting Website',
        category: 'personal'
    },
    {
        title: 'Cake Shop Website',
        description: 'A modern, professional platform designed for cake shops, featuring a clean, responsive layout, intuitive navigation, and engaging visuals that effectively showcase services and success stories to attract potential clients.',
        link: 'https://cake-website-template.vercel.app',
        gitHubLink: '',
        image: '/assets/images/MyProjectsSectionImages/cakeShopWebsite.png',
        imageAlt: 'Cake Shop Website',
        category: 'personal'
    }
];

// Define your custom order by project title (or unique identifier)
const customOrder = [
    'Modaro Health',
    'Bravas Digital',
    'Consulting Website',
    'ShaveLinks',
    'Email Armor Docs',
    'BLYT',
    'Loop Card',
    'Cake Shop Website'
];

export default function MyProjects() {
    // State to toggle the projects filter
    const [filter, setFilter] = useState('all');

    // Filter projects as per type
    const filteredProjects = projectData.filter(project => { if (filter === 'all') return true; return project.category === filter; });

    // Sort projects based on their index in customOrder
    const sortedProjects = [...filteredProjects].sort((a, b) => { return customOrder.indexOf(a.title) - customOrder.indexOf(b.title); });

    return (
        <section id="projects" className="bg-black text-white py-12 px-4 md:px-8 lg:px-16 xl:px-24">
            <div className="max-w-screen-xl mx-auto">
                <Headings title="projects" subHeading="Global Standards in Project Excellence" />

                {/* Filter Buttons */}
                <div className="flex justify-center space-x-4 mt-8 teeny:text-base text-[10px]">
                    {[
                        { id: 'all', label: 'All', icon: <FaSearch /> },
                        { id: 'client', label: 'Client Projects', icon: <FaBriefcase /> },
                        { id: 'personal', label: 'Personal Projects', icon: <FaUser /> }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full defaultTransitionCSS font-medium border-2
                            ${filter === btn.id ? 'bg-reddish text-black shadow-[0_0_10px_2px_rgba(255,0,0,0.6)] border-reddish' : 'bg-black border-white text-white hover:bg-gray-900'}`}>
                            <span>{btn.icon}</span>
                            <span>{btn.label}</span>
                        </button>
                    ))}
                </div>

                {/* Project Cards */}
                <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
                    {sortedProjects.map((project, idx) => (
                        <div key={idx} className="bg-[#111111] border-2 border-white rounded-xl overflow-hidden shadow-lg defaultTransitionCSS hover:scale-105 hover:border-reddish flex flex-col">
                            {/* Project Image */}
                            <div className="relative h-[200px] w-full">
                                <Image src={project.image} alt={project.imageAlt || project.title} width={600} height={200} quality={100} className={`defaultTransitionCSS h-[200px] object-cover ${project.title === "Email Armor Docs" ? "" : "object-top"}`} />
                            </div>
                            {/* Project Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="space-y-3 flex-grow">
                                    <h3 className="text-xl font-bold text-reddish">{project.title}</h3>
                                    <p className="text-sm text-gray-300">{project.description}</p>
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4">
                                        {project.link && (
                                            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group bg-black border border-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors duration-300 hover:bg-white hover:text-black">
                                                <span>Visit Site</span>
                                                <Image width={12} height={12} src="/assets/images/MyProjectsSectionImages/pop-up-icon.png" alt="pop-up-icon" className="group-hover:rotate-45 group-hover:invert-0 invert defaultTransitionCSS" />
                                            </Link>
                                        )}
                                        {project.gitHubLink && (
                                            <Link href={project.gitHubLink} target="_blank" rel="noopener noreferrer" className="group bg-black border border-white px-3 py-1 rounded-full text-xs font-bold hover:bg-white hover:text-black defaultTransitionCSS flex items-center gap-1">
                                                <span>Open Source</span>
                                                <Image width={14} height={14} src="https://img.icons8.com/fluency/48/000000/github.png" alt="GitHub" className="group-hover:invert-0 invert defaultTransitionCSS" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}