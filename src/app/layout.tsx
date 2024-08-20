import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Priyal Raj',
  description: 'My name is Priyal Raj, I am a Full Stack Web Dev. Welcome To My Portfolio Website.',
  keywords: 'full-stack web developer, web development portfolio, priyal raj portfolio, responsive web design, front-end development, back-end development, javascript developer, html5/css3, ui/ux design, web application developer, node.js developer, react.js development, mongodb, express.js, restful apis, mobile-first design, cross-browser compatibility, git version control, portfolio projects, code samples',
  robots: "index, follow, nocache",
  category: 'Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}`} />
      </body>
    </html>
  )
}