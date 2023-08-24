import Image from 'next/image';
import React from 'react';

const HoverImage = ({ imageSrc, imageAlt }: { imageSrc: string, imageAlt: string }) => {
    return (
        <div className="group inline-block relative cursor-pointer">
            <Image
                width={50}
                height={50}
                src={`/assets/images/SocialMediaIcons/${imageSrc}-b&w.png`}
                alt={imageAlt}
                className="transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            />
            <Image
                width={50}
                height={50}
                src={`/assets/images/SocialMediaIcons/${imageSrc}-color.png`}
                alt={imageAlt}
                className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            />
        </div>
    );
};

export default HoverImage;