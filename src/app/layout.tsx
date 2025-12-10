import './globals.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from "sonner";
import { MontserratFont } from '@/utils/Fonts';

export const metadata: Metadata = {
  metadataBase: new URL(`https://priyalraj.com`),
  title: { default: "Priyal Raj", template: "%s | Priyal Raj" },
  description: "My name is Priyal Raj, I am a Full Stack Web Dev. Welcome To My Portfolio Website.",
  keywords: "full-stack web developer, web development portfolio, priyal raj portfolio, responsive web design, front-end development, back-end development, javascript developer, html5/css3, ui/ux design, web application developer, node.js developer, react.js development, mongodb, express.js, restful apis, mobile-first design, cross-browser compatibility, git version control, portfolio projects, code samples",
  twitter: { card: "summary_large_image" },
  openGraph: { images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/PriyalRajOpenGraphImage.png', },
  alternates: { canonical: './', },
  icons: {
    icon: [
      //! Android Icons
      { rel: "icon", type: "image/png", sizes: "36x36", url: "/favicon/android-icon-36x36.png", },
      { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon/android-icon-48x48.png", },
      { rel: "icon", type: "image/png", sizes: "72x72", url: "/favicon/android-icon-72x72.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/android-icon-96x96.png", },
      { rel: "icon", type: "image/png", sizes: "144x144", url: "/favicon/android-icon-144x144.png", },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png", },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/favicon/android-icon-512x512.png", },

      //! Apple Icons
      { rel: "apple-touch-icon", type: "image/ico", url: "/favicon/apple-icon.png", },
      { rel: "apple-touch-icon", sizes: "57x57", url: "/favicon/apple-icon-57x57.png", },
      { rel: "apple-touch-icon", sizes: "60x60", url: "/favicon/apple-icon-60x60.png", },
      { rel: "apple-touch-icon", sizes: "72x72", url: "/favicon/apple-icon-72x72.png", },
      { rel: "apple-touch-icon", sizes: "76x76", url: "/favicon/apple-icon-76x76.png", },
      { rel: "apple-touch-icon", sizes: "114x114", url: "/favicon/apple-icon-114x114.png", },
      { rel: "apple-touch-icon", sizes: "120x120", url: "/favicon/apple-icon-120x120.png", },
      { rel: "apple-touch-icon", sizes: "144x144", url: "/favicon/apple-icon-144x144.png", },
      { rel: "apple-touch-icon", sizes: "152x152", url: "/favicon/apple-icon-152x152.png", },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-icon-180x180.png", },

      //! Favion Icons
      { rel: "icon", type: "image/ico", url: "/favicon/favicon.ico", },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png", },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png", },
    ],

    //! Other Icons
    other: [{ rel: 'apple-touch-icon-precomposed', url: '/favicon/apple-icon-precomposed.png', },],
  },
  manifest: '/favicon/manifest.json',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priyal Raj",
    url: "https://priyalraj.com",
    jobTitle: "Full Stack Web Developer",
    description: "I’m a Full Stack Web Developer skilled in Next.js, Express.js, and MongoDB. I build robust, scalable web apps and transform ideas into user-friendly solutions.",
    sameAs: [
      "https://twitter.com/Capta1nCodes",
      "https://www.linkedin.com/in/priyalraj99",
      "https://github.com/Capta1nCodes"
    ]
  };
  return (
    <html lang="en">
      <body className={MontserratFont.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Toaster position="top-right" expand={true} richColors duration={4000} />
        {children}
        <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}`} />
      </body>
    </html>
  )
}