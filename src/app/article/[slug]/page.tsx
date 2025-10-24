import { client, urlFor } from "@/lib/sanity";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { redirect } from "next/navigation";
import CustomCode from "./CustomCode";
import FooterLayout from "@/layouts/FooterLayout";
import NavBar from "@/layouts/NavBar";
import { IncrementArticleViewsAction } from "./IncrementArticleViewsAction";

export const revalidate = 86400000;

// ✅ SECURITY FIX: Sanitize slug parameter
function sanitizeSlug(slug: string): string {
    // Remove any characters that aren't alphanumeric, hyphens, or underscores
    const sanitized = slug.replace(/[^a-zA-Z0-9\-_]/g, '');

    // Limit length to prevent DoS
    if (sanitized.length > 200) {
        throw new Error('Invalid slug length');
    }

    return sanitized;
}

async function getData(slug: string) {
    // ✅ SECURITY FIX: Sanitize input before using in query
    const sanitizedSlug = sanitizeSlug(slug);

    // ✅ SECURITY FIX: Use parameterized query with Sanity's query API
    const query = `*[_type == 'blog' && slug.current == $slug] {
        "currentSlug": slug.current,
        title,
        coverImage,
        content,
        excerpt
    }[0]`;

    return await client.fetch(query, { slug: sanitizedSlug });
}


function blocksToPlainText(blocks: any[]) {
    if (!Array.isArray(blocks)) {
        return '';
    }

    return blocks
        .map((block: { _type: string; children: any[]; }) => {
            if (block._type !== 'block' || !block.children) {
                return '';
            }
            return block.children
                .filter((child: any) => child && child.text)
                .map((child: { text: any; }) => child.text)
                .join('');
        })
        .join('\n\n');
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const slug = params.slug;
        const data = await getData(slug);

        if (!data) {
            return {
                title: "Post Not Found",
                description: "The requested blog post could not be found."
            };
        }

        let title = data?.title || "No Post Found";
        let content = blocksToPlainText(data?.excerpt) || "No Post Found";

        let coverImage = "https://priyalraj.com/favicon.ico";
        try {
            if (data?.coverImage) {
                coverImage = urlFor(data.coverImage).url();
            }
        } catch (error) {
            console.error('Error generating cover image URL:', error);
            coverImage = "https://priyalraj.com/favicon.ico";
        }

        //! When length gets 50, remove the last word for better title
        if (title.length > 50) {
            let words = title.split(' ');

            let shortenedTitle = '';
            for (let i = 0; i < words.length; i++) {
                if ((shortenedTitle + words[i]).length <= 50) {
                    shortenedTitle += words[i];
                    if (i < words.length - 1) {
                        shortenedTitle += ' ';
                    }
                } else {
                    break;
                }
            }

            title = shortenedTitle;
        }

        //! Slice after 1st full stop (.)
        if (content.length > 150) {
            let shortenedDescription = content.slice(0, 150);
            let lastIndex = shortenedDescription.lastIndexOf('.');
            if (lastIndex !== -1) {
                content = shortenedDescription.slice(0, lastIndex + 1) + "...";
            } else {
                content = shortenedDescription + "...";
            }
        } else {
            content += '...';
        }

        return {
            title: title,
            description: content,
            openGraph: {
                url: `https://priyalraj.com/article/${slug}`,
                type: 'article',
                title: data?.title,
                description: content,
                images: coverImage
            },
            twitter: {
                card: "summary_large_image",
                title: data?.title,
                description: content,
                images: coverImage
            },
        };
    } catch (error) {
        console.error('Error generating metadata');
        return {
            title: "Error",
            description: "An error occurred while loading the post."
        };
    }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
    try {
        const data = await getData(params.slug);

        if (!data) {
            redirect('/blog');
        }

        // Generate cover image URL with error handling
        let coverImage = "https://priyalraj.com/favicon.ico";
        try {
            if (data?.coverImage) {
                coverImage = urlFor(data.coverImage).url();
            }
        } catch (error) {
            console.error('Error generating cover image URL:', error);
            coverImage = "https://priyalraj.com/favicon.ico";
        }

        // ✅ SECURITY FIX: Pass sanitized slug
        IncrementArticleViewsAction(sanitizeSlug(params.slug))
            .then(() => { })
            .catch(() => { });

        const components = {
            types: {
                customCode: CustomCode,
                customImage: ({ value }: any) => {
                    if (!value || !value.asset) {
                        return <p>Image not available</p>;
                    }

                    let imageUrl = "";
                    try {
                        imageUrl = urlFor(value.asset).url();
                    } catch (error) {
                        console.error('Error generating image URL:', error);
                        return <p>Image not available</p>;
                    }

                    if (!imageUrl) {
                        return <p>Image not available</p>;
                    }

                    return (
                        <Image
                            src={imageUrl}
                            alt={value.alt || 'Blog image'}
                            width={1497}
                            height={765}
                            layout="responsive"
                        />
                    );
                },
            },
        };

        return (
            <>
                <NavBar />

                <section className={`max-w-screen-md mx-auto prose prose-invert prose-lg px-4 pb-10 py-10`}>
                    <h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                        {data.title}
                    </h1>
                    {data.coverImage && (
                        <Image
                            className="mt-4 mb-4 drop-shadow rounded-md object-cover w-full"
                            src={coverImage}
                            alt={data.title}
                            width={500}
                            height={500}
                            priority
                        />
                    )}
                    <PortableText value={data.content} components={components} />
                </section>

                <FooterLayout />
            </>
        );
    } catch (error) {
        console.error('Error rendering blog page');
        redirect('/blog');
    }
}