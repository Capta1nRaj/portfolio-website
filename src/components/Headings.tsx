import React from 'react'

interface HeadingsProps {
    title: string;
    subHeading?: string;
}

const Headings: React.FC<HeadingsProps> = ({ title, subHeading }) => {
    return (
        <div className="text-center mb-8">
            <h2 className="heading text-4xl teeny:text-6xl uppercase font-bold drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
                {title}
            </h2>
            <div className="my-2 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.50)]">
                <hr className="border-t-4 border-reddish w-20 m-auto" />
            </div>
            {subHeading && (
                <p className="sub-heading text-lg teeny:text-2xl text-gray-300">
                    {subHeading}
                </p>
            )}
        </div>
    )
}

export default Headings