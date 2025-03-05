import React from "react";
import { TestimonialsConstants } from "@/constants/TestimonialsConstants";
import { Metadata } from "next";
import NavBar from "@/layouts/NavBar";
import FooterLayout from "@/layouts/FooterLayout";
import ContactUsLayout from "@/layouts/ContactUsLayout";
import TestimonialsLayout from "@/layouts/TestimonialsLayout";

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
            <TestimonialsLayout showButton={false} />
            <ContactUsLayout />
            <FooterLayout />
        </>
    );
}