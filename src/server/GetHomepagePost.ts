import { client } from "@/lib/sanity";

export const revalidate = 86400000;

// ✅ SECURITY FIX: Validate pagination parameters
function validatePaginationParams(start: number, limit: number): { start: number; limit: number } | { error: string } {
  // Ensure parameters are actually numbers
  if (typeof start !== 'number' || typeof limit !== 'number') {
    return { error: 'Invalid parameter types' };
  }

  // Check for NaN
  if (isNaN(start) || isNaN(limit)) {
    return { error: 'Parameters must be valid numbers' };
  }

  // Validate range
  if (start < 0 || limit < 0) {
    return { error: 'Parameters must be non-negative' };
  }

  // Limit maximum page size to prevent DoS
  const MAX_LIMIT = 100;
  const sanitizedLimit = Math.min(limit, MAX_LIMIT);

  // Ensure start is an integer
  const sanitizedStart = Math.floor(start);

  return { start: sanitizedStart, limit: sanitizedLimit };
}

export async function GetHomepagePost(start: number, limit: number) {
  // ✅ SECURITY FIX: Validate parameters
  const validated = validatePaginationParams(start, limit);

  if ('error' in validated) {
    console.error('Invalid pagination parameters');
    return [];
  }

  const { start: validStart, limit: validLimit } = validated;

  // ✅ SECURITY FIX: Use parameterized query
  const query = `
        *[_type == 'blog'] | order(publishedAt desc) [$start...$end] {
            title,
            excerpt,
            "currentSlug": slug.current,
            coverImage,
            readTimeOfTheBlog,
            publishedAt
        }
    `;

  try {
    return await client.fetch(query, {
      start: validStart,
      end: validStart + validLimit
    });
  } catch (error) {
    console.error('Error fetching blog posts');
    return [];
  }
}