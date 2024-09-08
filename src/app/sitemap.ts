import { client } from "@/lib/sanity";
import { MetadataRoute } from "next";

// Define the type for the blog data you're fetching
interface BlogPost {
    currentSlug: string;
}

// Fetch the blog data from Sanity
async function getData(): Promise<BlogPost[]> {
    const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      "currentSlug": slug.current,
    }
  `;
    return await client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch blog posts data
    const postsList = await getData();

    // Get the current date once
    const currentDate = new Date();

    // Map over the posts and create sitemap entries
    const postEntries: MetadataRoute.Sitemap = postsList.map(({ currentSlug }) => ({
        url: `https://priyalraj.com/article/${currentSlug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0,  // Adjusted to reflect importance relative to homepage
    }));

    // Return the static homepage + dynamic blog posts in the sitemap
    return [
        {
            url: `https://priyalraj.com`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,  // Highest priority for the homepage
        },
        ...postEntries
    ];
}