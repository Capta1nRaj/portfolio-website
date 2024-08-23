import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: ["Applebot", "Bingbot", "Googlebot", "Slurp", "DuckDuckBot", "Baiduspider", "Yandex"],
            allow: ["/"],
            disallow: ["/api/"],
        },
        sitemap: `https://priyalraj.com/sitemap.xml`,
    }
}