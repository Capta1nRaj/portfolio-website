import React, { Suspense } from 'react';
import { Metadata } from 'next';
import AllPostListPageContent from './AllPostListPageContent';

export const metadata: Metadata = {
    title: "Explore Coding, Extensions, and More: Your Go-To Blog",
    description: "Explore Priyal Raj's blog for coding insights, Chrome & VS Code extensions, tech tips, and a dash of off-topic fun like gaming and food adventures",
    keywords: "coding, Chrome extensions, VS Code extensions, tech blog, Priyal Raj, programming tips, developer tools, gaming, food",
    twitter: { card: "summary_large_image" },
    openGraph: { images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/PriyalRajOpenGraphImage.png', },
    alternates: { canonical: '/blog', }
};

const SignInPage = () => (
    <Suspense>
        <AllPostListPageContent />
    </Suspense>
);

export default SignInPage;
