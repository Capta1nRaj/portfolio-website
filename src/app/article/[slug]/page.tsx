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

async function getData(slug: string) {

    const query = `
    *[_type == 'blog' && slug.current == "${slug}"] {
        "currentSlug": slug.current,
        title,
        coverImage,
        content,
        excerpt
    }[0]
    `
    return await client.fetch(query);
}


function blocksToPlainText(blocks: any[]) {
    return blocks
        .map((block: { _type: string; children: any[]; }) => {
            if (block._type !== 'block' || !block.children) {
                return '';
            }
            return block.children.map((child: { text: any; }) => child.text).join('');
        })
        .join('\n\n');
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

    const slug = params.slug;
    const data = await getData(slug);

    let title = data?.title || "No Post Found";
    let content = blocksToPlainText(data?.excerpt) || "No Post Found";
    const coverImage = urlFor(data.coverImage).url() || "https://priyalraj.com/favicon.ico";

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
    }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {

    const data = await getData(params.slug);

    if (!data) { redirect('/blog'); }

    IncrementArticleViewsAction(params.slug).then(() => { }).catch(() => { });

    const components = {
        types: {
            customCode: CustomCode, // Matches the block type defined in the Sanity schema
            customImage: ({ value }: any) => {
                const imageUrl = urlFor(value.asset).url();

                if (!imageUrl) {
                    return <p>Image not available</p>;
                }

                return (
                    <Image
                        src={imageUrl}
                        alt={value.alt || 'No description available'}
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
                <h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl"> {data.title} </h1>
                <Image className="mt-4 mb-4 drop-shadow rounded-md object-cover w-full" src={urlFor(data.coverImage).url()} alt={data.title} width={500} height={500} priority />
                <PortableText value={data.content} components={components} />
            </section>

            <FooterLayout />
        </>
    )
}