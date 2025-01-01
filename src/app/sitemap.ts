import { client } from "@/lib/sanity";
import BlogPostViewsModel from "@/models/BlogPostViewsModel";
import { MetadataRoute } from "next";

// Define the type for the blog data you're fetching
interface BlogPost {
    currentSlug: string;
    publishedAt: string;
}

// Fetch the blog data from Sanity
async function getData(): Promise<BlogPost[]> {
    const query = `
    *[_type == 'blog'] | order(publishedAt desc) {
      "currentSlug": slug.current,
      publishedAt
    }`;

    return await client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch blog posts data
    const postsList = await getData();

    // Map over the posts and create sitemap entries with updated data
    const postEntries: MetadataRoute.Sitemap = postsList.map(({ currentSlug, publishedAt }) => ({
        url: `https://priyalraj.com/article/${currentSlug}`,
        lastModified: new Date(publishedAt),
        changeFrequency: 'weekly',
        priority: 1.0,
    }));

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
        ...postEntries,
        ...blogsPostListSitemapEntries
    ];
}

async function generateBlogsPostListSitemapEntries(): Promise<MetadataRoute.Sitemap> {
    try {
        const blogsPostListCount = await BlogPostViewsModel.countDocuments();

        // Return empty array if no jobs exist
        if (blogsPostListCount === 0) return [];

        const totalSitemaps = Math.ceil(blogsPostListCount / 50000);
        return Array.from({ length: totalSitemaps }, (_, index) => ({
            url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/article/sitemap/${index}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }));
    } catch (error) {
        console.error("Error generating jobs sitemap entries:", error);
        return []; // Return empty array in case of an error
    }
}