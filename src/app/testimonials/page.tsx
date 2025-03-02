import React from "react";
import Headings from "@/components/Headings";
import Link from "next/link";
import Image from "next/image";
import { TestimonialsConstants } from "@/constants/TestimonialsConstants";
import { GetSocialIconFromUrl } from "@/utils/GetSocialIconFromUrl";
import { Metadata } from "next";
import NavBar from "@/layouts/NavBar";
import FooterLayout from "@/layouts/FooterLayout";
import ContactUsLayout from "@/layouts/ContactUsLayout";

export const metadata: Metadata = {
    title: "Testimonials - Hear from Our Clients",
    description: "Discover success stories and testimonials from our satisfied clients. Learn how our expertise has transformed projects and forged lasting partnerships.",
    keywords: "testimonials, client success, reviews, feedback, experience, trust, reliability, service, excellence, partnerships",
    twitter: { card: "summary_large_image" },
    openGraph: { images: "https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/PriyalRajOpenGraphImage.png" },
    alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
    // Render all testimonials from the constants
    const allTestimonials = TestimonialsConstants;

    return (
        <>
            <NavBar />
            <section className="bg-black text-white py-12" id="testimonials">
                <div className="mx-auto max-w-7xl px-4">
                    {/* Page Heading */}
                    <div className="mx-auto max-w-2xl text-center">
                        <Headings
                            title="testimonials"
                            subHeading="Client Experiences & Success Stories"
                        />
                    </div>

                    {/* Testimonials Grid */}
                    <div className="mt-10 grid gap-8 md:grid-cols-3 sm:grid-cols-1">
                        {allTestimonials.map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-gradient-to-br from-[#111111] to-gray-800 border-2 border-white rounded-2xl p-6 drop-shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:border-reddish"
                            >
                                {/* Social Icon from Client URL */}
                                <div className="absolute top-4 right-4">
                                    <Link href={item.clientUrl || "#"} target="_blank">
                                        {GetSocialIconFromUrl(item.clientUrl)}
                                    </Link>
                                </div>
                                {/* Client Image, Name & Company */}
                                <Link href={item.clientUrl || "#"} target="_blank" className="block">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                        <Image
                                            width={96}
                                            height={96}
                                            src={item.imageUrl}
                                            alt={item.author}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="text-lg font-bold text-reddish">{item.author}</div>
                                    <div className="text-gray-400 text-sm">
                                        {item.position && <span>{item.position} of </span>}
                                        <span>{item.company}</span>
                                    </div>
                                </Link>
                                {/* Testimonial Body */}
                                <blockquote className="mb-4 italic text-xl text-[#F2F2F2]">
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
                </div>
            </section>

            <ContactUsLayout />
            <FooterLayout />
        </>
    );
}