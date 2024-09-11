import { client } from "@/lib/sanity";
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
        ...postEntries
    ];
}