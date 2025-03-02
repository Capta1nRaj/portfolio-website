import { Image } from "next-sanity/image";

export const GetSocialIconFromUrl = (url?: string) => {
    if (!url) {
        return (
            <Image
                width={24}
                height={24}
                src="https://img.icons8.com/fluency/48/000000/share.png"
                alt="Social Media"
                className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
            />
        );
    }
    if (url.includes("linkedin")) {
        return (
            <Image
                width={24}
                height={24}
                src="https://img.icons8.com/fluency/48/000000/linkedin.png"
                alt="LinkedIn"
                className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
            />
        );
    }
    if (url.includes("twitter")) {
        return (
            <Image
                width={24}
                height={24}
                src="https://img.icons8.com/fluency/48/000000/twitter.png"
                alt="Twitter"
                className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
            />
        );
    }
    if (url.includes("upwork")) {
        return (
            <Image
                width={24}
                height={24}
                src="https://img.icons8.com/?size=100&id=whwDjQbvJcmB&format=png&color=000000"
                alt="Upwork"
                className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
            />
        );
    }
    // Fallback icon
    return (
        <Image
            width={24}
            height={24}
            src="https://img.icons8.com/fluency/48/000000/share.png"
            alt="Social Media"
            className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
        />
    );
};