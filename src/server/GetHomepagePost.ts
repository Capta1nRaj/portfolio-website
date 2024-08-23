import { client } from "@/lib/sanity";

export const revalidate = 86400000;

export async function GetHomepagePost(start: number, limit: number) {
  const query = `
      *[_type == 'blog'] | order(publishedAt desc) [${start}...${start + limit}] {
          title,
          excerpt,
          "currentSlug": slug.current,
          coverImage,
          readTimeOfTheBlog,
          publishedAt
        }
    `
  return await client.fetch(query);
}