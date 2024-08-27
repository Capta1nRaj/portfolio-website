import { client } from "@/lib/sanity";
import { MetadataRoute } from "next";

async function getData() {
    const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
        "currentSlug": slug.current,
      }
    `

    return await client.fetch(query);
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postsList = await getData();

    const postEntries: MetadataRoute.Sitemap = postsList.map(({ currentSlug }: { currentSlug: string }) => ({
        url: `https://priyalraj.com/article/${currentSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [
        {
            url: `https://priyalraj.com`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...postEntries
    ]
}