"use client";

import React from "react";
import Headings from "@/components/Headings";
import Link from "next/link";
import Image from "next/image";

interface Project {
    name: string;
    url?: string;
}

interface Testimonial {
    body: string;
    author: string;
    company: string;
    position?: string;
    imageUrl: string;
    clientUrl?: string;
    projects?: Project[];
}

const testimonials: Testimonial[] = [
    {
        body: "Your work on Modaro Health was outstanding! Skilled, fast, and reliable—you delivered on time and at a fair price. Truly appreciate your execution. Highly recommend you! Looking forward to working again.",
        author: "Ankur Morbale",
        company: "Modaro Health",
        position: "Founder & CEO",
        imageUrl: "/images/TestimonialsImagefs/AnkurMorbale1.jpeg",
        clientUrl: "https://www.linkedin.com/in/ankurmorbale",
        projects: [{ name: "Modaro Health", url: "https://modarohealth.com" }],
    },
    // {
    //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    //     author: "Siddharth Nair",
    //     company: "Bravas Digital",
    //     position: "CEO",
    //     imageUrl: "/images/TestimonialsImagefs/SiddharthNair1.jpeg",
    //     clientUrl: "https://www.linkedin.com/in/siddharth-nair-b30a3413b/",
    //     projects: [{ name: "Bravas Digital", url: "https://www.bravasdigital.com" }],
    // },
    {
        body: "Raj was a great help at setting up my Wiki-IMDB pages. He’s incredibly responsive and professional. Highly recommend his services for anything relating to website and profile design. ",
        author: "Tanishq Kaura",
        company: "Boys Played Well",
        position: "Founder",
        imageUrl: "/images/TestimonialsImagefs/TanishqKaura1.jpeg",
        clientUrl: "https://in.linkedin.com/in/tanishq-kaura-ab3358268",
        projects: [
            { name: "Boys Played Well", url: "https://boysplayedwell.in" },
            { name: "IMDb page", url: "https://www.imdb.com/name/nm7858569" }
        ],
    },
    {
        body: "The project was completed in the given time with proper and friendly support.",
        author: "Parth Panjwani",
        company: "",
        position: "",
        imageUrl: "/images/TestimonialsImagefs/ParthPanjwani1.jpeg",
        clientUrl: "https://www.linkedin.com/in/parth-panjwani",
        projects: [{ name: "Pet Welfare App", url: "https://pet-guard.vercel.app" }],
    },
];

const getSocialIconFromUrl = (url?: string) => {
    if (!url) { return (<Image width={24} height={24} src="https://img.icons8.com/fluency/48/000000/share.png" alt="Social Media" className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300" />); }
    if (url.includes("linkedin")) { return (<Image width={24} height={24} src="https://img.icons8.com/fluency/48/000000/linkedin.png" alt="LinkedIn" className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300" />); }
    if (url.includes("twitter")) { return (<Image width={24} height={24} src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="Twitter" className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300" />); }
    if (url.includes("upwork")) { return (<Image width={24} height={24} src="https://img.icons8.com/?size=100&id=whwDjQbvJcmB&format=png&color=000000" alt="Upwork" className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300" />); }
    // Fallback icon
    return (<Image width={24} height={24} src="https://img.icons8.com/fluency/48/000000/share.png" alt="Social Media" className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300" />);
};

const truncateText = (text: string) =>
    text.length > 1200 ? text.substring(0, 1200) + "…" : text;

export default function TestimonialSectionMerged() {
    // Show only the first 3 testimonials for now.
    const displayedTestimonials = testimonials.slice(0, 13);

    return (
        <section className="bg-black text-white py-12" id="testimonials">
            <div className="mx-auto max-w-7xl px-4">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <Headings title="testimonials" subHeading="Client Experiences & Success Stories" />
                </div>
                {/* 3-Column Grid */}
                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {displayedTestimonials.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-[#111111] to-gray-800 border-2 border-white rounded-2xl p-6 drop-shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:border-reddish"
                        >
                            {/* Social Icon from Client URL at Top-Right */}
                            <div className="absolute top-4 right-4">
                                <Link href={item.clientUrl || "#"} target="_blank">
                                    {getSocialIconFromUrl(item.clientUrl)}
                                </Link>                            </div>                            {/* Client Image, Name & Company as one link */}
                            <Link href={item.clientUrl || "#"} target="_blank" className="block">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">                                    <Image width={96} height={96} src={item.imageUrl} alt={item.author} className="object-cover w-full h-full" />                                </div>
                                <div className="text-lg font-bold text-reddish">{item.author}</div>
                                <div className="text-gray-400 text-sm">
                                    {item.position && (<span>{item.position} of </span>)}
                                    <span>{item.company}</span>
                                </div>
                            </Link>
                            <blockquote className="mb-4 italic text-xl text-[#F2F2F2]">
                                “{truncateText(item.body)}”
                            </blockquote>
                            {/* Projects Section */}
                            {item.projects && item.projects.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-xs uppercase text-gray-400 mb-1">
                                        {item.projects.length === 1 ? "Project:" : "Projects:"}
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {item.projects.map((proj, idx) => (
                                            <Link
                                                key={idx}
                                                href={proj.url || "#"}
                                                target="_blank"
                                                className="bg-gray-500 hover:bg-gray-400 px-2 py-1 text-xs rounded-full transition-transform duration-300 hover:scale-105"
                                            >
                                                {proj.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}