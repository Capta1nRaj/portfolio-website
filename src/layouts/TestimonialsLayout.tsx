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
    imageUrl: string;
    clientUrl?: string;
    reference?: {
        type: "icon" | "text";
        platform?: "linkedin" | "twitter" | "fiverr" | "upwork";
        url?: string;
        value?: string;
    } | null;
    projects?: Project[];
}

const testimonials: Testimonial[] = [
    {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil.",
        author: "Ankur Morbale",
        company: "Modaro Health",
        imageUrl: "/images/TestimonialsImagefs/AnkurMorbale1.jpeg",
        clientUrl: "https://www.linkedin.com/in/ankurmorbale",
        reference: { type: "icon", platform: "linkedin", url: "https://www.linkedin.com/in/ankurmorbale" },
        projects: [{ name: "Modaro Health", url: "https://modarohealth.com" }],
    },
    {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        author: "Siddharth Nair",
        company: "Bravas Digital",
        imageUrl: "/images/TestimonialsImagefs/SiddharthNair1.jpeg",
        clientUrl: "https://www.linkedin.com/in/siddharth-nair-b30a3413b/",
        reference: { type: "icon", platform: "linkedin", url: "https://www.linkedin.com/in/siddharth-nair-b30a3413b" },
        projects: [{ name: "Bravas Digital", url: "https://www.bravasdigital.com" }],
    },
    {
        body: "The project was completed in the given time with proper and friendly support.",
        author: "Parth Panjwani",
        company: "",
        imageUrl: "/images/TestimonialsImagefs/ParthPanjwani1.jpeg",
        clientUrl: "https://www.linkedin.com/in/parth-panjwani",
        reference: { type: "icon", platform: "upwork", url: "https://www.upwork.com/freelancers/~01e349c2dc9ce7f40d" },
        projects: [],
    },
];

const getReferenceIcon = (platform?: string) => {
    switch (platform) {
        case "linkedin":
            return (
                <Image
                    width={24}
                    height={24}
                    src="https://img.icons8.com/fluency/48/000000/linkedin.png"
                    alt="LinkedIn"
                    className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
                />
            );
        case "twitter":
            return (
                <Image
                    width={24}
                    height={24}
                    src="https://img.icons8.com/fluency/48/000000/twitter.png"
                    alt="Twitter"
                    className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
                />
            );
        case "fiverr":
            return (
                <Image
                    width={24}
                    height={24}
                    src="https://img.icons8.com/fluency/48/000000/fiverr.png"
                    alt="Fiverr"
                    className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
                />
            );
        case "upwork":
            return (
                <Image
                    width={24}
                    height={24}
                    src="https://img.icons8.com/?size=100&id=whwDjQbvJcmB&format=png&color=000000"
                    alt="Upwork"
                    className="h-6 w-6 scale-100 hover:scale-150 transition-transform duration-300"
                />
            );
        default:
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
};

const truncateText = (text: string) =>
    text.length > 120 ? text.substring(0, 120) + "…" : text;

export default function TestimonialSectionMerged() {
    // Show only the first 3 testimonials for now.
    const displayedTestimonials = testimonials.slice(0, 3);

    return (
        <section className="bg-black text-white py-12" id="testimonials">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <Headings title="testimonials" />
                </div>
                {/* 3-Column Grid */}
                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {displayedTestimonials.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-[#111111] to-gray-800 border-2 border-white rounded-2xl p-6 drop-shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:border-reddish"
                        >
                            {/* Reference Icon at Top-Right */}
                            <div className="absolute top-4 right-4">
                                <Link href={item.reference?.url || item.clientUrl || "#"} target="_blank">
                                    {getReferenceIcon(item.reference?.platform)}
                                </Link>
                            </div>
                            {/* Client Image, Name & Company as one link */}
                            <div className="block">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image width={96} height={96} src={item.imageUrl} alt={item.author} className="object-cover w-full h-full" />
                                </div>
                                <Link href={item.clientUrl || "#"} target="_blank" className="text-lg font-bold text-reddish">{item.author}</Link>
                                <div className="text-gray-400 text-sm">{item.company}</div>
                            </div>
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
                                                className="bg-gray-500 hover:bg-black px-2 py-1 text-xs rounded-full text-white hover:text-reddish font-medium hover:scale-105 defaultTransitionCSS"
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
