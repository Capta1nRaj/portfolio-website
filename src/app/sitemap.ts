import BlogPostViewsModel from "@/models/BlogPostViewsModel";
import { connect2MongoDB } from "connect2mongodb";
import { MetadataRoute } from "next";

// Revalidate every 1 week (604800 seconds)
export const revalidate = 604800;

// Define the type for the blog data you're fetching
interface BlogPost {
    currentSlug: string;
    publishedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get the current date once
    const currentDate = new Date();

    // Generate jobs list sitemap entries
    const blogsPostListSitemapEntries = await generateBlogsPostListSitemapEntries();

    // Return the static homepage + dynamic blog posts in the sitemap
    return [
        {
            url: `https://priyalraj.com`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `https://priyalraj.com/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        ...blogsPostListSitemapEntries
    ];
}

async function generateBlogsPostListSitemapEntries(): Promise<MetadataRoute.Sitemap> {
    try {
        await connect2MongoDB();
        const blogsPostListCount = await BlogPostViewsModel.countDocuments();

        // Return empty array if no jobs exist
        if (blogsPostListCount === 0) return [];

        const totalSitemaps = Math.ceil(blogsPostListCount / 50000);
        return Array.from({ length: totalSitemaps }, (_, index) => ({
            url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/blog/sitemap/${index}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }));
    } catch (error) {
        console.error("Error generating jobs sitemap entries:", error);
        return []; // Return empty array in case of an error
    }
}