import React from "react";
import Headings from "@/components/Headings";
import Link from "next/link";
import Image from "next/image";
import { TestimonialsConstants } from "@/constants/TestimonialsConstants";
import { GetSocialIconFromUrl } from "@/utils/GetSocialIconFromUrl";

export default function TestimonialsLayout({ slice, showButton = true }: { slice?: number, showButton?: boolean }) {

    // Show only the first 3 testimonials for now.
    const displayedTestimonials = TestimonialsConstants.slice(0, slice ? slice : 9999);

    return (
        <section className="bg-black text-white sm:py-20 py-10" id="testimonials">
            <div className="mx-auto max-w-7xl px-4">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <Headings title="What Clients Say" subHeading="Stories of impact and outcomes" />
                </div>
                {/* 3-Column Grid */}
                <div className="mt-10 grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
                    {displayedTestimonials.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-[#111111] to-gray-800 border-2 border-white rounded-2xl p-4 drop-shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:border-reddish"
                        >
                            {/* Social Icon from Client URL at Top-Right */}
                            <div className="absolute top-4 right-4">
                                <Link href={item.clientUrl || "#"} target="_blank">
                                    {GetSocialIconFromUrl(item.clientUrl)}
                                </Link>
                            </div>
                            {/* Client Image, Name & Company as one link */}
                            <Link href={item.clientUrl || "#"} target="_blank" className="block">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image width={96} height={96} src={item.imageUrl} alt={item.author} className="object-cover w-full h-full" />
                                </div>
                                <div className="text-lg font-bold text-reddish">{item.author}</div>
                                <div className="text-gray-400 text-sm">
                                    {item.position && (<span>{item.position} of </span>)}
                                    <span>{item.company}</span>
                                </div>
                            </Link>
                            <blockquote className="testimonials-item-body mb-4 italic text-base text-[#F2F2F2] h-48 px-4">
                                “{item.body}”
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
                {/* "View More" Button */}
                {showButton && TestimonialsConstants.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/testimonials"
                            className="text-xl inline-block border-2 border-reddish text-white px-8 py-3 rounded-full defaultTransitionCSS hover:bg-reddish shadow-lg font-medium"
                        >
                            Hear from Our Clients
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
