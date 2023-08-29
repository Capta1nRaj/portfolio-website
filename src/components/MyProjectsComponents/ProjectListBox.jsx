import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProjectListBox = ({ customFlexCSS, title, description, skills, link, image }) => {

    console.log(customFlexCSS)

    return (
        <div className={`project flex ${customFlexCSS} bg-lightblack  drop-shadow-[4px_4px_3px_#ff3258] rounded-3xl`}>
            <div className="left-side capitalize flex flex-col sm:gap-8 gap-4 sm:p-5 p-3 m-auto">
                <div className="heading sm:text-4xl text-3xl font-bold text-reddish underline underline-offset-4 uppercase">
                    {title}
                </div>
                <div className="title normal-case sm:text-base text-sm">
                    {description}
                </div>
                <div className="tech-stack-used flex flex-wrap gap-2 font-bold sm:text-base text-xs">
                    {skills.map((skill, index) => (
                        <span key={index} className='bg-gray-500 sm:px-3 px-2 sm:py-2 py-1 rounded-3xl'>
                            {skill}
                        </span>
                    ))}
                </div>
                <Link href={link} rel="noopener noreferrer" target="_blank" className="visit-site flex gap-2 items-center bg-black px-3 py-2 rounded-3xl w-fit cursor-pointer group font-bold sm:text-base text-xs">
                    <div className="group-hover:text-blue-500 transition-all duration-500">visit site</div>
                    <Image className='group-hover:rotate-45 transition-all duration-500 invert' width={12} height={12} src="/assets/images/MyProjectsSectionImages/pop-up-icon.png" alt="" />
                </Link>
            </div>
            <div className="right-side min-w-[50%] m-auto sm:p-5 p-3">
                <Image className='xl:w-[800px] w-full rounded-3xl' width={1000} height={1000} src={image} alt="" />
            </div>
        </div>
    );
};

export default ProjectListBox;
