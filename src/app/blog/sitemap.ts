import BlogPostViewsModel from '@/models/BlogPostViewsModel';
import { connect2MongoDB } from 'connect2mongodb';
import type { MetadataRoute } from 'next';

// Revalidate every 1 week (604800 seconds)
export const revalidate = 604800;

export async function generateSitemaps(): Promise<{ id: number }[]> {
    try {
        await connect2MongoDB();

        // Fetch the total number of jobs
        const totalBlogsPostCount = await BlogPostViewsModel.countDocuments();

        // Calculate the total number of sitemaps needed
        const sitemapCount = Math.ceil(totalBlogsPostCount / 50000);

        // Generate sitemap IDs dynamically
        return Array.from({ length: sitemapCount }, (_, index) => ({ id: index }));
    } catch (error) {
        console.error("Error generating blogs post sitemap count:", error);
        return [];
    }
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    try {
        // Google's limit is 50,000 URLs per sitemap
        const start = id * 50000;
        const limit = 50000;

        await connect2MongoDB();

        // Fetch job posts
        const blogData = await BlogPostViewsModel
            .find({})
            .select('_id blogID createdAt')
            .skip(start)
            .limit(limit)
            .lean(); // Use lean for better performance

        // Validate and map job post data
        const list: MetadataRoute.Sitemap = blogData
            .filter(blog => blog && blog.createdAt) // Ensure `createdAt` exists
            .map(blog => ({
                url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/article/${blog.blogID}`,
                lastModified: blog.createdAt,
                changeFrequency: 'weekly',
                priority: 0.9,
            }));

        // Return an empty array if no valid data
        return list.length > 0 ? list : [];
    } catch (error) {
        console.error("Error generating job sitemap:", error);

        // Return an empty sitemap in case of errors
        return [];
    }
}