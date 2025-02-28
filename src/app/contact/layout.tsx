import FooterLayout from "@/layouts/FooterLayout";
import NavBar from "@/layouts/NavBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact - Collaborate on Your Project",
    description: "Reach out to Priyal Raj, a full-stack web developer, for project inquiries, collaborations, or to say hello. Let’s bring your ideas to life together!",
    keywords: "full-stack web developer, web development portfolio, responsive web design, javascript developer, react.js development, mongodb, coding, tech blog, programming tips, developer tools",
    twitter: { card: "summary_large_image" },
    openGraph: { images: "https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/PriyalRajOpenGraphImage.png", },
    alternates: { canonical: "/contact" },
};

export default function ContactPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
            <FooterLayout />
        </>
    )
}