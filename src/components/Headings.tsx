import React from 'react'

const Headings = ({ title }: { title: string }) => {
    return (
        <>
            <div className="text-center mb-8">
                <h2 className="heading text-4xl teeny:text-6xl uppercase font-bold drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">{title}</h2>
                <div className="mt-1 mb-2 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.50)]"><hr className="border-t-4 border-reddish w-20 m-auto" /></div>
            </div>
        </>
    )
}

export default Headings