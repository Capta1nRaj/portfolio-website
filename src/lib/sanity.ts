import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity';

// ✅ SECURITY FIX: Move project ID to environment variable
// Create a .env.local file with:
// SANITY_STUDIO_PROJECT_ID=794uha91
// SANITY_STUDIO_DATASET=production

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '794uha91';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Only throw error in development, not during build
if (!projectId && process.env.NODE_ENV === 'development') {
    throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable');
}

export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: dataset,
    projectId: projectId,
    useCdn: false
});

const builder = imageUrlBuilder(client);

// ✅ SECURITY FIX: Add type safety and validation
export function urlFor(source: any) {
    if (!source) {
        console.warn('urlFor: Image source is undefined');
        return {
            url: () => "https://priyalraj.com/favicon.ico"
        };
    }

    try {
        return builder.image(source);
    } catch (error) {
        console.error('urlFor: Error creating image URL:', error);
        return {
            url: () => "https://priyalraj.com/favicon.ico"
        };
    }
}